import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, CtaBand } from "@/components/Blocks";
import { SetAlternates } from "@/components/Alternates";
import { Icon } from "@/components/Icon";
import { AREAS, areaBySlug } from "@/content/areas";
import { serviceById } from "@/content/services";
import { tr } from "@/lib/i18n-text";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

type P = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => AREAS.map((s) => ({ locale, slug: s.slug[locale] })));
}

export async function generateMetadata({ params }: P) {
  const { locale, slug } = await params;
  const a = areaBySlug(slug);
  if (!a) return {};
  return pageMeta({ locale, alt: altPaths("/areas/[slug]", a.slug), title: tr(a.name, locale), description: tr(a.body, locale)[0] });
}

export default async function AreaPage({ params }: P) {
  const { locale, slug } = await params;
  const a = areaBySlug(slug);
  if (!a || a.slug[locale] !== slug) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <>
      <SetAlternates alt={altPaths("/areas/[slug]", a.slug)} />
      <PageHero eyebrow={t("nav.areas")} title={tr(a.name, locale)} lead={tr(a.tagline, locale)}
        crumbs={[{ label: t("nav.home"), href: "/", url: altPaths("/")[locale] }, { label: t("nav.areas"), href: "/areas", url: altPaths("/areas")[locale] }, { label: tr(a.name, locale) }]} />
      <section className="wrap grid gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
        <div className="grid gap-5 text-[18px]" data-reveal>
          {tr(a.body, locale).map((p) => <p key={p} className="max-w-[62ch]">{p}</p>)}
        </div>
        <aside className="grid content-start gap-6" data-reveal>
          <div className="rounded-media bg-grey p-6">
            <h2 className="text-[18px] font-semibold">{t("areas.placesH")}</h2>
            <ul className="mt-3 grid gap-1.5">{tr(a.places, locale).map((p) => <li key={p}>{p}</li>)}</ul>
            <p className="mt-4 text-[14px]"><b className="text-navy">{t("areas.langs")} :</b> {a.languages}</p>
          </div>
        </aside>
      </section>
      <section className="bg-grey">
        <div className="wrap py-20 lg:py-24">
          <h2 className="h-section">{t("areas.servicesH")}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.focus.map((id) => {
              const s = serviceById(id);
              return (
                <li key={id} data-reveal>
                  <Link href={{ pathname: "/services/[slug]", params: { slug: tr(s.slug, locale) } }} className="group flex h-full flex-col gap-3 rounded-media bg-white p-6 no-underline transition-colors hover:bg-navy">
                    <span className="grid size-11 place-items-center rounded-ctl bg-grey text-navy group-hover:bg-teal"><Icon name={s.icon} /></span>
                    <h3 className="text-[18px] font-semibold group-hover:text-white">{tr(s.name, locale)}</h3>
                    <p className="text-[15px] group-hover:text-on-navy">{tr(s.short, locale)}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CtaBand title={t("areas.ctaH")} />
    </>
  );
}
