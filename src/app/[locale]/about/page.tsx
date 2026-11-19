import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero, CtaBand, Placeholder } from "@/components/Blocks";
import { SetAlternates } from "@/components/Alternates";
import { SITE } from "@/lib/site";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMeta({ locale, alt: altPaths("/about"), title: t("h"), description: t("lead") });
}

export default async function AboutPage({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const values = t.raw("about.values") as { t: string; d: string }[];
  return (
    <>
      <SetAlternates alt={altPaths("/about")} />
      <PageHero title={t("about.h")} lead={t("about.lead")} crumbs={[{ label: t("nav.home"), href: "/", url: altPaths("/")[locale] }, { label: t("nav.about") }]} />
      <section className="wrap grid gap-14 py-20 lg:grid-cols-2 lg:py-28">
        <div data-reveal>
          <h2 className="h-section">{t("about.missionH")}</h2>
          <p className="mt-5 text-[clamp(19px,1.8vw,24px)] leading-snug text-navy">{t("about.mission")}</p>
          <h2 className="mt-14 text-[26px] font-semibold">{t("about.storyH")}</h2>
          <Placeholder className="mt-4 h-24">{t("about.story")}</Placeholder>
        </div>
        <div data-reveal>
          <h2 className="h-section">{t("about.valuesH")}</h2>
          <ul className="mt-8 border-t border-line">
            {values.map((v) => (
              <li key={v.t} className="border-b border-line py-5"><h3 className="text-[20px] font-semibold">{v.t}</h3><p className="mt-1">{v.d}</p></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-grey">
        <div className="wrap grid gap-10 py-20 md:grid-cols-3 lg:py-24">
          <div data-reveal><h2 className="text-[22px] font-semibold">{t("about.teamH")}</h2><Placeholder className="mt-4 aspect-[4/3]">{t("about.team")}</Placeholder></div>
          <div data-reveal><h2 className="text-[22px] font-semibold">{t("about.credsH")}</h2><Placeholder className="mt-4 aspect-[4/3]">{t("about.creds")}</Placeholder></div>
          <div data-reveal><h2 className="text-[22px] font-semibold">{t("about.partnersH")}</h2><Placeholder className="mt-4 aspect-[4/3]">{t("about.partners")}</Placeholder></div>
        </div>
      </section>
      <section className="wrap py-20" data-reveal>
        <h2 className="text-[26px] font-semibold">{t("common.headOffice")}</h2>
        <p className="mt-3 text-[18px] text-navy">{SITE.address.full}, Canada</p>
      </section>
      <CtaBand />
    </>
  );
}
