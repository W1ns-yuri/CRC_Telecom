import type { Locale } from "@/i18n/routing";

export type L<T = string> = { fr: T; en: T };
export const tr = <T,>(v: L<T>, locale: Locale | string): T => (locale === "en" ? v.en : v.fr);
