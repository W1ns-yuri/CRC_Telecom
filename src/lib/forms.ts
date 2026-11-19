import { z } from "zod";

export const PROVINCES = ["QC", "ON", "NY", "VT", "other"] as const;
export const SYSTEMS = ["phones", "radios", "wifi", "cabling", "cams", "access", "sat", "uc", "fleet", "other"] as const;
export const MAX_PHOTO = 5 * 1024 * 1024;

const req = z.string().trim().min(1, "required").max(500);
const opt = z.string().trim().max(500).optional().default("");

export const quoteSchema = z.object({
  name: req, company: req, title: opt,
  email: z.string().trim().email("email"),
  phone: req, province: z.enum(PROVINCES, { message: "required" }), city: req,
  services: z.array(z.enum(SYSTEMS)).default([]),
  sites: opt,
  contactPref: z.enum(["email", "phone"]).default("email"),
  message: z.string().trim().max(5000).optional().default(""),
  consent: z.literal("on", { message: "consent" }),
  locale: z.enum(["fr", "en"]).default("fr"),
});

export const supportSchema = z.object({
  name: req, company: req,
  phone: req, email: z.string().trim().email("email"),
  siteAddress: req, system: z.enum(SYSTEMS, { message: "required" }),
  urgency: z.enum(["low", "medium", "high"], { message: "required" }),
  description: z.string().trim().min(1, "required").max(5000),
  consent: z.literal("on", { message: "consent" }),
  locale: z.enum(["fr", "en"]).default("fr"),
});

export type FieldErrors = Record<string, string>;

export function formToObject(fd: FormData) {
  const obj: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) {
    if (v instanceof File) continue;
    if (k === "services") (obj.services = (obj.services as string[] | undefined) ?? []), (obj.services as string[]).push(String(v));
    else obj[k] = String(v);
  }
  return obj;
}

export function zodErrors(err: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const i of err.issues) {
    const k = String(i.path[0]);
    if (!out[k]) out[k] = i.message === "email" || i.message === "consent" ? i.message : "required";
  }
  return out;
}
