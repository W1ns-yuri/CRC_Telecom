import type { MetadataRoute } from "next";
import { altPaths } from "@/lib/paths";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { AREAS } from "@/content/areas";
import { LEGAL_SLUGS } from "@/content/legal";
import type { AppPathname } from "@/i18n/routing";
import type { L } from "@/lib/i18n-text";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [AppPathname, L?][] = [
    ["/"], ["/services"], ["/industries"], ["/areas"], ["/about"], ["/support"], ["/contact"],
    ...SERVICES.map((s) => ["/services/[slug]", s.slug] as [AppPathname, L]),
    ...INDUSTRIES.map((s) => ["/industries/[slug]", s.slug] as [AppPathname, L]),
    ...AREAS.map((s) => ["/areas/[slug]", s.slug] as [AppPathname, L]),
    ...LEGAL_SLUGS.map((s) => ["/legal/[slug]", s.slug] as [AppPathname, L]),
  ];
  return pages.flatMap(([key, slug]) => {
    const alt = altPaths(key, slug);
    const languages = { "fr-CA": SITE.url + alt.fr, "en-CA": SITE.url + alt.en };
    return (["fr", "en"] as const).map((l) => ({ url: SITE.url + alt[l], lastModified: new Date(), alternates: { languages } }));
  });
}
