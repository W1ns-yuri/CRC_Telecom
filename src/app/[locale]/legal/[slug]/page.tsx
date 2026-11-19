import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/Blocks";
import { SetAlternates } from "@/components/Alternates";
import { LEGAL, LEGAL_SLUGS, legalBySlug } from "@/content/legal";
import { tr } from "@/lib/i18n-text";
import { altPaths } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

type P = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => LEGAL_SLUGS.map((s) => ({ locale, slug: s.slug[locale] })));
}

export async function generateMetadata({ params }: P) {
  const { locale, slug } = await params;
  const l = legalBySlug(slug);
  if (!l) return {};
  const t = await getTranslations({ locale, namespace: "legal" });
  return { ...pageMeta({ locale, alt: altPaths("/legal/[slug]", l.slug), title: t(l.id), description: t(l.id) }), robots: { index: true, follow: true } };
}

export default async function LegalPage({ params }: P) {
  const { locale, slug } = await params;
  const l = legalBySlug(slug);
  if (!l || l.slug[locale] !== slug) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <>
      <SetAlternates alt={altPaths("/legal/[slug]", l.slug)} />
      <PageHero title={t(`legal.${l.id}`)} crumbs={[{ label: t("nav.home"), href: "/", url: altPaths("/")[locale] }, { label: t(`legal.${l.id}`) }]} />
      <article className="wrap prose-legal py-16 lg:py-20">
        <p className="mb-8 rounded-ctl border border-[#F5C76B] bg-[#FFF8E6] p-4 text-[14.5px] text-[#6B4E00]">{t("legal.draft")}</p>
        {tr(LEGAL[l.id], locale).map((b, i) => (
          <section key={i}>
            {b.h && <h2>{b.h}</h2>}
            {b.p?.map((p) => <p key={p}>{p}</p>)}
            {b.ul && <ul>{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>}
          </section>
        ))}
      </article>
    </>
  );
}
