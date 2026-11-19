import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ analytics: z.boolean(), marketing: z.boolean(), at: z.string(), v: z.number(), locale: z.string().max(5) });

/** Журнал согласий на cookie (Loi 25: «Consent choices are recorded»). Без персональных данных. */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const id = process.env.SANITY_PROJECT_ID, token = process.env.SANITY_WRITE_TOKEN, ds = process.env.SANITY_DATASET || "production";
  if (id && token) {
    await fetch(`https://${id}.api.sanity.io/v2024-01-01/data/mutate/${ds}`, {
      method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ mutations: [{ create: { _type: "consentRecord", ...parsed.data } }] }),
    }).catch(() => {});
  } else {
    console.info("[consent]", parsed.data);
  }
  return NextResponse.json({ ok: true });
}
