import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/Blocks";
import { SupportForm } from "@/components/Forms";
import { SetAlternates } from "@/components/Alternates";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/site";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "support" });
  return pageMeta({ locale, alt: altPaths("/support"), title: t("h"), description: t("p") });
}

export default async function SupportPage({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <>
      <SetAlternates alt={altPaths("/support")} />
      <PageHero title={t("support.h")} lead={t("support.p")} crumbs={[{ label: t("nav.home"), href: "/", url: altPaths("/")[locale] }, { label: t("nav.support") }]} />
      <section className="wrap grid gap-10 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14 lg:py-24">
        <div className="rounded-media border border-line p-6 sm:p-8"><SupportForm /></div>
        <aside className="grid content-start gap-4">
          <div className="rounded-media bg-navy p-6 text-on-navy">
            <h2 className="text-[19px] font-semibold text-white">{t("support.contactH")}</h2>
            <a href={SITE.phoneHref} className="mt-4 flex items-center gap-3 text-[20px] font-semibold text-white no-underline"><Icon name="phone" className="size-5 text-teal-light" />{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="mt-2 flex items-center gap-3 text-teal-light no-underline hover:underline"><Icon name="mail" className="size-5" />{SITE.email}</a>
          </div>
          <div className="rounded-media bg-grey p-6"><h2 className="text-[17px] font-semibold">{t("support.hoursH")}</h2><p className="mt-1 text-[15px]">{SITE.hours ?? t("common.toConfirm")}</p></div>
          <div className="rounded-media bg-grey p-6"><h2 className="text-[17px] font-semibold">{t("support.emergencyH")}</h2><p className="mt-1 text-[15px]">{t("support.emergency")}</p></div>
        </aside>
      </section>
    </>
  );
}
