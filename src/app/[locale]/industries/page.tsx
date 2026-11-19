import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, CtaBand } from "@/components/Blocks";
import { SetAlternates } from "@/components/Alternates";
import { Icon } from "@/components/Icon";
import { INDUSTRIES } from "@/content/industries";
import { serviceById } from "@/content/services";
import { tr } from "@/lib/i18n-text";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  return pageMeta({ locale, alt: altPaths("/industries"), title: t("h"), description: t("p") });
}

export default async function IndustriesPage({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <>
      <SetAlternates alt={altPaths("/industries")} />
      <PageHero title={t("industries.h")} lead={t("industries.p")} crumbs={[{ label: t("nav.home"), href: "/", url: altPaths("/")[locale] }, { label: t("nav.industries") }]} />
      <section className="wrap py-16 lg:py-24">
        <ul className="grid gap-4 md:grid-cols-2">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.id} className={i === 0 ? "md:col-span-2" : ""} data-reveal>
              <Link href={{ pathname: "/industries/[slug]", params: { slug: tr(ind.slug, locale) } }} className={`group flex h-full flex-col gap-4 rounded-media border p-7 no-underline transition-colors duration-300 lg:p-9 ${i === 0 ? "border-navy bg-navy" : "border-line hover:border-navy"}`}>
                <h2 className={`text-[clamp(24px,2.6vw,34px)] font-semibold ${i === 0 ? "text-white" : ""}`}>{tr(ind.name, locale)}</h2>
                <p className={`max-w-[62ch] ${i === 0 ? "text-on-navy" : ""}`}>{tr(ind.intro, locale)}</p>
                <div className="flex flex-wrap gap-1.5">{ind.services.map((id) => <span key={id} className="chip">{tr(serviceById(id).name, locale)}</span>)}</div>
                <span className={`mt-auto inline-flex items-center gap-2 pt-2 text-[14px] font-semibold ${i === 0 ? "text-teal-light" : "text-navy"}`}>{t("common.learnMore")}<Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
