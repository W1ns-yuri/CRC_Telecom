import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { SERVICES } from "@/content/services";
import { SITE } from "@/lib/site";
import { tr } from "@/lib/i18n-text";
import { CookieManageLink } from "./CookieConsent";
import { LEGAL_SLUGS } from "@/content/legal";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations();
  return (
    <footer className="on-dark bg-navy text-[15px] text-on-navy-soft">
      <div className="wrap grid gap-10 pt-16 pb-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="block w-[200px]" aria-label="CRC Telecom"><Logo variant="white" className="h-auto w-full" /></Link>
          <address className="mt-6 not-italic leading-7">
            {SITE.address.street}<br />{SITE.address.city}, {SITE.address.region} {SITE.address.postal}, Canada<br />
            <a className="text-teal-light no-underline hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
            <a className="text-teal-light no-underline hover:underline" href={SITE.phoneHref}>{SITE.phone}</a>
          </address>
          <p className="mt-3 text-[13.5px]">{t("common.hours")} : {SITE.hours ?? t("common.toConfirm")}</p>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white">{t("nav.services")}</h2>
          <ul className="grid gap-2.5">
            {SERVICES.map((s) => (
              <li key={s.id}><Link className="text-on-navy no-underline hover:text-teal-light" href={{ pathname: "/services/[slug]", params: { slug: tr(s.slug, locale) } }}>{tr(s.name, locale)}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white">{t("footer.company")}</h2>
          <ul className="grid gap-2.5">
            <li><Link className="text-on-navy no-underline hover:text-teal-light" href="/industries">{t("nav.industries")}</Link></li>
            <li><Link className="text-on-navy no-underline hover:text-teal-light" href="/areas">{t("nav.areas")}</Link></li>
            <li><Link className="text-on-navy no-underline hover:text-teal-light" href="/about">{t("nav.about")}</Link></li>
            <li><Link className="text-on-navy no-underline hover:text-teal-light" href="/support">{t("nav.support")}</Link></li>
            <li><Link className="text-on-navy no-underline hover:text-teal-light" href="/contact">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white">{t("footer.follow")}</h2>
          <ul className="grid gap-2.5">
            <li>LinkedIn <span className="text-[13px]">({t("common.toConfirm")})</span></li>
            <li>Facebook <span className="text-[13px]">({t("common.toConfirm")})</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5 text-[13.5px]">
          <span>© {new Date().getFullYear()} CRC Telecom. {t("footer.rights")}</span>
          <nav aria-label={t("footer.legal")} className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_SLUGS.map((l) => (
              <Link key={l.id} className="text-on-navy-soft no-underline hover:text-white" href={{ pathname: "/legal/[slug]", params: { slug: tr(l.slug, locale) } }}>{t(`legal.${l.id}`)}</Link>
            ))}
            <CookieManageLink label={t("cookie.manage")} />
          </nav>
        </div>
      </div>
    </footer>
  );
}
