import { NextResponse } from "next/server";
import { quoteSchema, supportSchema, formToObject, zodErrors, MAX_PHOTO } from "@/lib/forms";
import { SERVICES } from "@/content/services";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const label = (id: string, locale: "fr" | "en") => SERVICES.find((s) => s.id === id)?.name[locale] ?? id;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

async function verifyTurnstile(token: string | null, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // не настроено (локальная разработка)
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) });
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const j = (await r.json()) as { success: boolean };
  return j.success;
}

async function sendMail(to: string, subject: string, html: string, replyTo?: string, attachments?: { filename: string; content: string }[]) {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.info("[forms] RESEND_API_KEY not set, email skipped:", subject); return; }
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.MAIL_FROM || "CRC Telecom <no-reply@crc-telecom.ca>", to, subject, html, reply_to: replyTo, attachments }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
}

async function store(type: string, data: Record<string, unknown>, photo?: File | null) {
  const id = process.env.SANITY_PROJECT_ID, token = process.env.SANITY_WRITE_TOKEN, ds = process.env.SANITY_DATASET || "production";
  if (!id || !token) { console.info("[forms] Sanity not configured, submission:", type, data); return; }
  let photoRef: unknown;
  if (photo && photo.size) {
    const up = await fetch(`https://${id}.api.sanity.io/v2024-01-01/assets/images/${ds}?filename=${encodeURIComponent(photo.name)}`, {
      method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": photo.type }, body: Buffer.from(await photo.arrayBuffer()),
    });
    if (up.ok) photoRef = { _type: "image", asset: { _type: "reference", _ref: ((await up.json()) as { document: { _id: string } }).document._id } };
  }
  await fetch(`https://${id}.api.sanity.io/v2024-01-01/data/mutate/${ds}`, {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ create: { _type: "submission", kind: type, submittedAt: new Date().toISOString(), ...data, ...(photoRef ? { photo: photoRef } : {}) } }] }),
  });
}

const table = (rows: [string, string][]) =>
  `<table cellpadding="6" style="border-collapse:collapse;font:14px Arial,sans-serif">${rows.map(([k, v]) => `<tr><td style="color:#475569;vertical-align:top"><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`;

export async function POST(req: Request, ctx: { params: Promise<{ type: string }> }) {
  const { type } = await ctx.params;
  if (type !== "quote" && type !== "support") return NextResponse.json({ ok: false }, { status: 404 });

  const fd = await req.formData();
  if (String(fd.get("website") || "")) return NextResponse.json({ ok: true }); // honeypot
  const ok = await verifyTurnstile(fd.get("cf-turnstile-response") as string | null, req.headers.get("x-forwarded-for"));
  if (!ok) return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });

  const raw = formToObject(fd);
  const parsed = type === "quote" ? quoteSchema.safeParse(raw) : supportSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ ok: false, errors: zodErrors(parsed.error) }, { status: 422 });
  const d = parsed.data as Record<string, string | string[]>;
  const locale = (d.locale as "fr" | "en") ?? "fr";

  let photo: File | null = null;
  if (type === "support") {
    const f = fd.get("photo");
    if (f instanceof File && f.size) {
      if (f.size > MAX_PHOTO || !/^image\/(jpeg|png|webp)$/.test(f.type)) return NextResponse.json({ ok: false, errors: { photo: "file" } }, { status: 422 });
      photo = f;
    }
  }

  const rows: [string, string][] = Object.entries(d)
    .filter(([k]) => !["consent", "locale"].includes(k))
    .map(([k, v]) => [k, Array.isArray(v) ? v.map((x) => label(x, "fr")).join(", ") : k === "system" ? label(String(v), "fr") : String(v)]);
  rows.push(["Langue / Language", locale.toUpperCase()]);

  try {
    await store(type, d, photo);
    const attachments = photo ? [{ filename: photo.name, content: Buffer.from(await photo.arrayBuffer()).toString("base64") }] : undefined;
    const kind = type === "quote" ? "Demande de soumission" : "Demande de service";
    await sendMail(process.env.MAIL_TO || SITE.email, `${kind} : ${d.company} (${d.name})`, `<h2>${kind}</h2>${table(rows)}`, String(d.email), attachments);

    const confirm = locale === "fr"
      ? { s: "Nous avons bien reçu votre demande | CRC Telecom", h: `<p>Bonjour ${esc(String(d.name))},</p><p>Merci d'avoir communiqué avec CRC Telecom. Nous avons bien reçu votre demande et nous vous répondrons rapidement.</p><p>Pour toute question : ${SITE.phone} · ${SITE.email}</p><p>L'équipe CRC Telecom</p>` }
      : { s: "We received your request | CRC Telecom", h: `<p>Hello ${esc(String(d.name))},</p><p>Thank you for contacting CRC Telecom. We received your request and will get back to you shortly.</p><p>Questions: ${SITE.phone} · ${SITE.email}</p><p>The CRC Telecom team</p>` };
    await sendMail(String(d.email), confirm.s, confirm.h);
  } catch (e) {
    console.error("[forms]", e);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
