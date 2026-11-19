import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/services/[slug]": "/services/[slug]",
    "/industries": { fr: "/secteurs", en: "/industries" },
    "/industries/[slug]": { fr: "/secteurs/[slug]", en: "/industries/[slug]" },
    "/areas": { fr: "/regions", en: "/service-areas" },
    "/areas/[slug]": { fr: "/regions/[slug]", en: "/service-areas/[slug]" },
    "/about": { fr: "/a-propos", en: "/about" },
    "/support": { fr: "/soutien", en: "/support" },
    "/contact": "/contact",
    "/legal/[slug]": { fr: "/juridique/[slug]", en: "/legal/[slug]" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
