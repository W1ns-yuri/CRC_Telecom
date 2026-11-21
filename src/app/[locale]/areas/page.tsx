import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero, CtaBand } from "@/components/Blocks";
import { CoverageMap } from "@/components/CoverageMap";
import { SetAlternates } from "@/components/Alternates";
import { AREAS } from "@/content/areas";
import { tr } from "@/lib/i18n-text";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "areas" });
  return pageMeta({ locale, alt: altPaths("/areas"), title: t("h"), description: t("p") });
}

export default async function AreasPage({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <>
      <SetAlternates alt={altPaths("/areas")} />
      <PageHero title={t("areas.h")} lead={t("areas.p")} crumbs={[{ label: t("nav.home"), href: "/", url: altPaths("/")[locale] }, { label: t("nav.areas") }]} />
      <section className="wrap py-16 lg:py-24">
        <CoverageMap hqLabel={t("common.headOffice")} label={t("home.mapLabel")} note={t("home.mapNote")}
          regions={AREAS.map((a) => ({ id: a.id, name: tr(a.name, locale), sub: tr(a.tagline, locale), languages: a.languages, slug: tr(a.slug, locale) }))} />
      </section>
      <CtaBand />
    </>
  );
}
