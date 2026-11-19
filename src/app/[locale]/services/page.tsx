import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero, CtaBand } from "@/components/Blocks";
import { ServicesGrid } from "@/components/ServicesGrid";
import { SetAlternates } from "@/components/Alternates";
import { SERVICES, GROUPS } from "@/content/services";
import { tr } from "@/lib/i18n-text";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "service" });
  return pageMeta({ locale, alt: altPaths("/services"), title: t("allH"), description: t("allP") });
}

export default async function ServicesPage({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const alt = altPaths("/services");
  return (
    <>
      <SetAlternates alt={alt} />
      <PageHero title={t("service.allH")} lead={t("home.servicesP")} crumbs={[{ label: t("nav.home"), href: "/", url: altPaths("/")[locale] }, { label: t("nav.services") }]} />
      <section className="wrap py-16 lg:py-24">
        <ServicesGrid
          allLabel={t("home.filterAll")} more={t("common.learnMore")} filterLabel={t("nav.services")}
          groups={(Object.keys(GROUPS) as (keyof typeof GROUPS)[]).map((g) => ({ id: g, label: tr(GROUPS[g], locale) }))}
          items={SERVICES.map((s) => ({ id: s.id, slug: tr(s.slug, locale), icon: s.icon, group: s.group, groupLabel: tr(GROUPS[s.group], locale), name: tr(s.name, locale), short: tr(s.short, locale), offers: tr(s.offers, locale) }))}
        />
      </section>
      <CtaBand />
    </>
  );
}
