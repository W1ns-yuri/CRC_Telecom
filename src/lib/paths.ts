import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import type { L } from "@/lib/i18n-text";

export type Alt = Record<Locale, string>;

/** Полные пути страницы на обоих языках (для hreflang и переключателя языка). */
export function altPaths(key: AppPathname, slug?: L): Alt {
  const out = {} as Alt;
  for (const locale of routing.locales) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const href: any = slug ? { pathname: key, params: { slug: slug[locale] } } : key;
    out[locale] = getPathname({ locale, href });
  }
  return out;
}
