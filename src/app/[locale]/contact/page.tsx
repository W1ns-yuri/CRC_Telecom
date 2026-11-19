import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/Blocks";
import { QuoteForm } from "@/components/Forms";
import { MapEmbed } from "@/components/MapEmbed";
import { SetAlternates } from "@/components/Alternates";
import { Icon } from "@/components/Icon";
import { serviceBySlug, SERVICES } from "@/content/services";
import { SITE } from "@/lib/site";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

type P = { params: Promise<{ locale: Locale }>; searchParams: Promise<{ service?: string }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMeta({ locale, alt: altPaths("/contact"), title: t("h"), description: t("p") });
}

export default async function ContactPage({ params, searchParams }: P) {
  const { locale } = await params;
  const { service } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const pre = service ? (serviceBySlug(service) ?? SERVICES.find((s) => s.id === service))?.id : undefined;
  return (
    <>
      <SetAlternates alt={altPaths("/contact")} />
      <PageHero title={t("contact.h")} lead={t("contact.p")} crumbs={[{ label: t("nav.home"), href: "/", url: altPaths("/")[locale] }, { label: t("nav.contact") }]} />
      <section className="wrap grid gap-10 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14 lg:py-24">
        <div className="rounded-media border border-line p-6 sm:p-8"><QuoteForm preselect={pre ? [pre] : undefined} /></div>
        <aside className="grid content-start gap-4">
          <div className="rounded-media bg-navy p-6 text-on-navy">
            <h2 className="text-[19px] font-semibold text-white">{t("common.headOffice")}</h2>
            <p className="mt-3 flex items-start gap-3"><Icon name="pin" className="size-5 shrink-0 text-teal-light" />{SITE.address.full}</p>
            <a href={SITE.phoneHref} className="mt-3 flex items-center gap-3 text-[20px] font-semibold text-white no-underline"><Icon name="phone" className="size-5 text-teal-light" />{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="mt-2 flex items-center gap-3 text-teal-light no-underline hover:underline"><Icon name="mail" className="size-5" />{SITE.email}</a>
            <p className="mt-4 text-[14px]">{t("common.hours")} : {SITE.hours ?? t("common.toConfirm")}</p>
          </div>
          <MapEmbed button={t("contact.mapBtn")} note={t("contact.mapNote")} open={t("contact.openMaps")} />
        </aside>
      </section>
    </>
  );
}
