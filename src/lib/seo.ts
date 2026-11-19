import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import type { Alt } from "@/lib/paths";
import type { Locale } from "@/i18n/routing";

export function pageMeta(opts: { locale: Locale; alt: Alt; title: string; description: string }): Metadata {
  const { locale, alt, title, description } = opts;
  const url = SITE.url + alt[locale];
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "fr-CA": SITE.url + alt.fr, "en-CA": SITE.url + alt.en, "x-default": SITE.url + alt.fr },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      type: "website",
      images: [{ url: SITE.url + "/brand/crc-telecom-logo-white-on-navy.png", width: 704, height: 280, alt: SITE.name }],
    },
  };
}
