import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, CtaBand, Placeholder } from "@/components/Blocks";
import { SetAlternates } from "@/components/Alternates";
import { Icon } from "@/components/Icon";
import { INDUSTRIES, industryBySlug } from "@/content/industries";
import { serviceById } from "@/content/services";
import { tr } from "@/lib/i18n-text";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

type P = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => INDUSTRIES.map((s) => ({ locale, slug: s.slug[locale] })));
}

export async function generateMetadata({ params }: P) {
  const { locale, slug } = await params;
  const ind = industryBySlug(slug);
  if (!ind) return {};
  return pageMeta({ locale, alt: altPaths("/industries/[slug]", ind.slug), title: tr(ind.name, locale), description: tr(ind.intro, locale) });
}

export default async function IndustryPage({ params }: P) {
  const { locale, slug } = await params;
  const ind = industryBySlug(slug);
  if (!ind || ind.slug[locale] !== slug) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <>
      <SetAlternates alt={altPaths("/industries/[slug]", ind.slug)} />
      <PageHero eyebrow={t("nav.industries")} title={tr(ind.name, locale)} lead={tr(ind.intro, locale)}
        crumbs={[{ label: t("nav.home"), href: "/", url: altPaths("/")[locale] }, { label: t("nav.industries"), href: "/industries", url: altPaths("/industries")[locale] }, { label: tr(ind.name, locale) }]} />
      <section className="wrap grid gap-14 py-20 lg:grid-cols-2 lg:py-28">
        <div data-reveal>
          <h2 className="h-section">{t("industries.challengesH")}</h2>
          <ul className="mt-8 grid gap-3">
            {tr(ind.challenges, locale).map((c) => (
              <li key={c} className="flex gap-3 border-b border-line pb-4 text-[17px] text-navy"><span className="mt-2.5 size-2 shrink-0 rounded-full bg-teal" aria-hidden="true" />{c}</li>
            ))}
          </ul>
          {ind.extra && (
            <div className="mt-10 rounded-media bg-grey p-6">
              <h3 className="text-[20px] font-semibold">{t("industries.govH")}</h3>
              <ul className="mt-4 grid gap-2">{tr(ind.extra, locale).map((e) => <li key={e} className="flex gap-3 text-[15.5px]"><Icon name="check" className="mt-0.5 size-5 shrink-0 text-teal" strokeWidth={2.2} />{e}</li>)}</ul>
            </div>
          )}
        </div>
        <div data-reveal>
          <h2 className="h-section">{t("industries.solveH")}</h2>
          <ul className="mt-8 grid gap-2">
            {ind.services.map((id) => {
              const s = serviceById(id);
              return (
                <li key={id}>
                  <Link href={{ pathname: "/services/[slug]", params: { slug: tr(s.slug, locale) } }} className="group flex items-center gap-4 rounded-ctl border border-line p-4 no-underline hover:border-navy">
                    <span className="grid size-11 shrink-0 place-items-center rounded-ctl bg-grey text-navy group-hover:bg-teal"><Icon name={s.icon} /></span>
                    <span><b className="block font-display text-[17px] font-semibold text-navy">{tr(s.name, locale)}</b><span className="text-[14.5px]">{tr(s.short, locale)}</span></span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <h3 className="mt-10 text-[20px] font-semibold">{t("industries.projectH")}</h3>
          <Placeholder className="mt-4 h-28">{t("industries.projectP")}</Placeholder>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
