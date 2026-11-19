"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LEGAL_SLUGS } from "@/content/legal";
import { tr } from "@/lib/i18n-text";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; at: string; v: number };
const KEY = "crc_consent";
const VERSION = 1;
const EVT = "crc:open-consent";

function read(): Consent | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${KEY}=([^;]*)`));
    if (!m) return null;
    const c = JSON.parse(decodeURIComponent(m[1])) as Consent;
    return c.v === VERSION ? c : null;
  } catch { return null; }
}

function write(c: Consent, locale: string) {
  document.cookie = `${KEY}=${encodeURIComponent(JSON.stringify(c))}; Max-Age=${60 * 60 * 24 * 180}; Path=/; SameSite=Lax; Secure`;
  // Loi 25: choix enregistré côté serveur (journal de consentement)
  fetch("/api/consent", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...c, locale }), keepalive: true }).catch(() => {});
}

export function CookieConsent() {
  const t = useTranslations("cookie");
  const locale = useLocale();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = read();
    setConsent(c);
    if (!c) setOpen(true);
    const reopen = () => { const cur = read(); setAnalytics(!!cur?.analytics); setMarketing(!!cur?.marketing); setDetails(true); setOpen(true); };
    window.addEventListener(EVT, reopen);
    return () => window.removeEventListener(EVT, reopen);
  }, []);

  const save = (a: boolean, m: boolean) => {
    const c: Consent = { necessary: true, analytics: a, marketing: m, at: new Date().toISOString(), v: VERSION };
    write(c, locale);
    setConsent(c);
    setOpen(false);
    setDetails(false);
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const cookieSlug = tr(LEGAL_SLUGS.find((l) => l.id === "cookies")!.slug, locale);

  return (
    <>
      {gaId && consent?.analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {open && (
        <div role="dialog" aria-labelledby="ck-title" aria-live="polite" className="fixed inset-x-4 bottom-4 z-[70] max-w-[440px] rounded-media border border-line bg-white p-5 text-[14px] text-slate shadow-[0_30px_60px_-30px_rgba(11,37,69,.5)] sm:left-auto sm:right-6 sm:bottom-6">
          <h2 id="ck-title" className="text-[16px] font-semibold">{t("title")}</h2>
          <p className="mt-1.5">{t("text")} <Link className="link" href={{ pathname: "/legal/[slug]", params: { slug: cookieSlug } }}>{t("policy")}</Link>.</p>
          {details && (
            <fieldset className="mt-4 grid gap-3 border-t border-line pt-4">
              <legend className="sr-only">{t("choose")}</legend>
              <Row id="ck-n" label={t("necessary")} desc={t("necessaryD")} checked disabled />
              <Row id="ck-a" label={t("analytics")} desc={t("analyticsD")} checked={analytics} onChange={setAnalytics} />
              <Row id="ck-m" label={t("marketing")} desc={t("marketingD")} checked={marketing} onChange={setMarketing} />
            </fieldset>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {details ? (
              <button type="button" className="btn btn-navy !px-4 !py-2.5 !text-[13.5px]" onClick={() => save(analytics, marketing)}>{t("save")}</button>
            ) : (
              <>
                <button type="button" className="btn btn-navy !px-4 !py-2.5 !text-[13.5px]" onClick={() => save(true, true)}>{t("accept")}</button>
                <button type="button" className="btn btn-outline !px-4 !py-2.5 !text-[13.5px]" onClick={() => save(false, false)}>{t("refuse")}</button>
                <button type="button" className="px-2 text-[13.5px] font-semibold text-navy underline underline-offset-4" onClick={() => setDetails(true)}>{t("choose")}</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Row({ id, label, desc, checked, disabled, onChange }: { id: string; label: string; desc: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <div className="flex items-start gap-3">
      <input id={id} type="checkbox" className="mt-1 size-4 accent-[var(--color-navy)]" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} />
      <label htmlFor={id}><span className="font-semibold text-navy">{label}</span><span className="block text-[13px]">{desc}</span></label>
    </div>
  );
}

export function CookieManageLink({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(EVT))} className="text-on-navy-soft underline-offset-4 hover:text-white hover:underline">
      {label}
    </button>
  );
}
