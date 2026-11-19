"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { quoteSchema, supportSchema, formToObject, zodErrors, MAX_PHOTO, PROVINCES, SYSTEMS, type FieldErrors } from "@/lib/forms";
import { SERVICES } from "@/content/services";
import { LEGAL_SLUGS } from "@/content/legal";
import { tr } from "@/lib/i18n-text";
import { Icon } from "./Icon";

const PROV_LABEL: Record<string, { fr: string; en: string }> = {
  QC: { fr: "Québec", en: "Quebec" }, ON: { fr: "Ontario", en: "Ontario" }, NY: { fr: "New York", en: "New York" }, VT: { fr: "Vermont", en: "Vermont" }, other: { fr: "Autre", en: "Other" },
};
const ctl = "w-full rounded-ctl border-[1.5px] border-line bg-white px-3.5 py-3 text-[16px] text-navy outline-none transition-colors placeholder:text-ink-soft focus:border-navy aria-[invalid=true]:border-[#B42318]";

function Field({ id, label, required, error, hint, children }: { id: string; label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode }) {
  const t = useTranslations("form");
  return (
    <div className="grid content-start gap-1.5">
      <label htmlFor={id} className="text-[14.5px] font-medium text-navy">
        {label} {!required && <span className="font-normal text-ink-soft">({t("optional")})</span>}
      </label>
      {children}
      {hint && <p id={`${id}-hint`} className="text-[13px] text-ink-soft">{hint}</p>}
      {error && <p id={`${id}-err`} className="text-[13.5px] font-medium text-[#B42318]">{error}</p>}
    </div>
  );
}

function Turnstile() {
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  useEffect(() => {
    if (!key || !ref.current) return;
    const render = () => (window as unknown as { turnstile?: { render: (el: HTMLElement, o: object) => void } }).turnstile?.render(ref.current!, { sitekey: key, language: locale === "fr" ? "fr" : "en", appearance: "interaction-only" });
    if (document.querySelector("#cf-turnstile")) { render(); return; }
    const s = document.createElement("script");
    s.id = "cf-turnstile"; s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; s.async = true; s.onload = render;
    document.head.appendChild(s);
  }, [key, locale]);
  return key ? <div ref={ref} /> : null;
}

function useSubmit(type: "quote" | "support") {
  const t = useTranslations("form");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const msg = (code?: string) => (!code ? undefined : code === "email" ? t("errEmail") : code === "consent" ? t("errConsent") : code === "file" ? t("errFile") : t("errRequired"));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const schema = type === "quote" ? quoteSchema : supportSchema;
    const parsed = schema.safeParse(formToObject(fd));
    const errs: FieldErrors = parsed.success ? {} : zodErrors(parsed.error);
    const photo = fd.get("photo");
    if (photo instanceof File && photo.size && (photo.size > MAX_PHOTO || !/^image\/(jpeg|png|webp)$/.test(photo.type))) errs.photo = "file";
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => { summaryRef.current?.focus(); (form.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus(); });
      return;
    }
    setState("sending");
    try {
      const r = await fetch(`/api/forms/${type}`, { method: "POST", body: fd });
      const j = await r.json();
      if (j.ok) { setState("ok"); form.reset(); }
      else { if (j.errors) setErrors(j.errors); setState("error"); }
    } catch { setState("error"); }
  }
  return { errors, state, onSubmit, msg, summaryRef };
}

function Consent({ error }: { error?: string }) {
  const t = useTranslations("form");
  const locale = useLocale();
  const slug = tr(LEGAL_SLUGS.find((l) => l.id === "privacy")!.slug, locale);
  return (
    <div className="grid gap-1.5">
      <div className="flex items-start gap-3">
        <input id="consent" name="consent" type="checkbox" className="mt-1 size-[18px] shrink-0 accent-[var(--color-navy)]" aria-invalid={!!error} aria-describedby={error ? "consent-err" : undefined} />
        <label htmlFor="consent" className="text-[14.5px]">
          {t("consent")} <Link className="link" href={{ pathname: "/legal/[slug]", params: { slug } }}>{t("privacy")}</Link>.
        </label>
      </div>
      {error && <p id="consent-err" className="text-[13.5px] font-medium text-[#B42318]">{error}</p>}
    </div>
  );
}

function Status({ state }: { state: string }) {
  const t = useTranslations("form");
  if (state === "ok") return (
    <div role="status" className="flex gap-3 rounded-ctl border border-teal bg-teal/10 p-4 text-navy">
      <Icon name="check" className="size-6 shrink-0 text-teal" strokeWidth={2.2} />
      <div><p className="font-semibold">{t("okTitle")}</p><p className="text-[15px]">{t("okText")}</p></div>
    </div>
  );
  if (state === "error") return <p role="alert" className="rounded-ctl border border-[#B42318]/30 bg-[#FEF3F2] p-4 text-[15px] text-[#7A271A]">{t("error")}</p>;
  return null;
}

const Honeypot = () => (
  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
    <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
  </div>
);

export function QuoteForm({ preselect }: { preselect?: string[] }) {
  const t = useTranslations("form");
  const locale = useLocale() as "fr" | "en";
  const { errors, state, onSubmit, msg, summaryRef } = useSubmit("quote");
  const uid = useId();
  const a = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const has = Object.keys(errors).length > 0;

  if (state === "ok") return <Status state="ok" />;
  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-5" aria-describedby={has ? `${uid}-sum` : undefined}>
      <input type="hidden" name="locale" value={locale} />
      <Honeypot />
      {has && <div ref={summaryRef} tabIndex={-1} id={`${uid}-sum`} role="alert" className="rounded-ctl bg-[#FEF3F2] p-3 text-[14.5px] text-[#7A271A]">{t("fixErrors")}</div>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t("name")} required error={msg(errors.name)}><input id="name" name="name" autoComplete="name" className={ctl} {...a("name")} /></Field>
        <Field id="company" label={t("company")} required error={msg(errors.company)}><input id="company" name="company" autoComplete="organization" className={ctl} {...a("company")} /></Field>
        <Field id="title" label={t("title")}><input id="title" name="title" autoComplete="organization-title" className={ctl} /></Field>
        <Field id="email" label={t("email")} required error={msg(errors.email)}><input id="email" name="email" type="email" autoComplete="email" className={ctl} {...a("email")} /></Field>
        <Field id="phone" label={t("phone")} required error={msg(errors.phone)}><input id="phone" name="phone" type="tel" autoComplete="tel" className={ctl} {...a("phone")} /></Field>
        <Field id="province" label={t("province")} required error={msg(errors.province)}>
          <select id="province" name="province" defaultValue="" className={ctl} {...a("province")}>
            <option value="" disabled>{t("choose")}</option>
            {PROVINCES.map((p) => <option key={p} value={p}>{PROV_LABEL[p][locale]}</option>)}
          </select>
        </Field>
        <Field id="city" label={t("city")} required error={msg(errors.city)}><input id="city" name="city" autoComplete="address-level2" className={ctl} {...a("city")} /></Field>
        <Field id="sites" label={t("sites")}><input id="sites" name="sites" inputMode="numeric" className={ctl} /></Field>
      </div>
      <fieldset className="grid gap-2">
        <legend className="mb-2 text-[14.5px] font-medium text-navy">{t("services")}</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <label key={s.id} className="flex cursor-pointer items-center gap-3 rounded-ctl border-[1.5px] border-line px-3 py-2.5 text-[14.5px] text-navy has-[:checked]:border-navy has-[:checked]:bg-grey">
              <input type="checkbox" name="services" value={s.id} defaultChecked={preselect?.includes(s.id)} className="size-4 accent-[var(--color-navy)]" />
              {tr(s.name, locale)}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-[14.5px] font-medium text-navy">{t("contactPref")}</legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-[15px]"><input type="radio" name="contactPref" value="email" defaultChecked className="accent-[var(--color-navy)]" />{t("prefEmail")}</label>
          <label className="flex items-center gap-2 text-[15px]"><input type="radio" name="contactPref" value="phone" className="accent-[var(--color-navy)]" />{t("prefPhone")}</label>
        </div>
      </fieldset>
      <Field id="message" label={t("message")}><textarea id="message" name="message" rows={5} className={ctl} /></Field>
      <Consent error={msg(errors.consent)} />
      <Turnstile />
      <Status state={state} />
      <button type="submit" disabled={state === "sending"} className="btn btn-navy justify-self-start disabled:opacity-60">
        {state === "sending" ? t("sending") : t("submitQuote")}<Icon name="arrow" strokeWidth={2} />
      </button>
    </form>
  );
}

export function SupportForm() {
  const t = useTranslations("form");
  const locale = useLocale() as "fr" | "en";
  const { errors, state, onSubmit, msg, summaryRef } = useSubmit("support");
  const a = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const has = Object.keys(errors).length > 0;

  if (state === "ok") return <Status state="ok" />;
  return (
    <form noValidate onSubmit={onSubmit} encType="multipart/form-data" className="relative grid gap-5">
      <input type="hidden" name="locale" value={locale} />
      <Honeypot />
      {has && <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-ctl bg-[#FEF3F2] p-3 text-[14.5px] text-[#7A271A]">{t("fixErrors")}</div>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="s-name" label={t("name")} required error={msg(errors.name)}><input id="s-name" name="name" autoComplete="name" className={ctl} {...a("name")} aria-describedby={errors.name ? "s-name-err" : undefined} /></Field>
        <Field id="s-company" label={t("company")} required error={msg(errors.company)}><input id="s-company" name="company" autoComplete="organization" className={ctl} {...a("company")} aria-describedby={errors.company ? "s-company-err" : undefined} /></Field>
        <Field id="s-phone" label={t("phone")} required error={msg(errors.phone)}><input id="s-phone" name="phone" type="tel" autoComplete="tel" className={ctl} {...a("phone")} aria-describedby={errors.phone ? "s-phone-err" : undefined} /></Field>
        <Field id="s-email" label={t("email")} required error={msg(errors.email)}><input id="s-email" name="email" type="email" autoComplete="email" className={ctl} {...a("email")} aria-describedby={errors.email ? "s-email-err" : undefined} /></Field>
      </div>
      <Field id="s-site" label={t("siteAddress")} required error={msg(errors.siteAddress)}><input id="s-site" name="siteAddress" autoComplete="street-address" className={ctl} {...a("siteAddress")} aria-describedby={errors.siteAddress ? "s-site-err" : undefined} /></Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="s-system" label={t("system")} required error={msg(errors.system)}>
          <select id="s-system" name="system" defaultValue="" className={ctl} {...a("system")} aria-describedby={errors.system ? "s-system-err" : undefined}>
            <option value="" disabled>{t("choose")}</option>
            {SYSTEMS.map((s) => <option key={s} value={s}>{s === "other" ? PROV_LABEL.other[locale] : tr(SERVICES.find((x) => x.id === s)!.name, locale)}</option>)}
          </select>
        </Field>
        <Field id="s-urg" label={t("urgency")} required error={msg(errors.urgency)}>
          <select id="s-urg" name="urgency" defaultValue="" className={ctl} {...a("urgency")} aria-describedby={errors.urgency ? "s-urg-err" : undefined}>
            <option value="" disabled>{t("choose")}</option>
            <option value="low">{t("urgLow")}</option><option value="medium">{t("urgMed")}</option><option value="high">{t("urgHigh")}</option>
          </select>
        </Field>
      </div>
      <Field id="s-desc" label={t("description")} required error={msg(errors.description)}><textarea id="s-desc" name="description" rows={5} className={ctl} {...a("description")} aria-describedby={errors.description ? "s-desc-err" : undefined} /></Field>
      <Field id="s-photo" label={t("photo")} hint={t("photoHint")} error={msg(errors.photo)}>
        <input id="s-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" className="text-[14.5px] file:mr-3 file:rounded-ctl file:border-0 file:bg-grey file:px-4 file:py-2.5 file:font-semibold file:text-navy" aria-describedby="s-photo-hint" />
      </Field>
      <Consent error={msg(errors.consent)} />
      <Turnstile />
      <Status state={state} />
      <button type="submit" disabled={state === "sending"} className="btn btn-navy justify-self-start disabled:opacity-60">
        {state === "sending" ? t("sending") : t("submitSupport")}<Icon name="arrow" strokeWidth={2} />
      </button>
    </form>
  );
}
