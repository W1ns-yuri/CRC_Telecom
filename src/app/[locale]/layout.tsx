import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { Motion } from "@/components/Motion";
import { AlternatesProvider } from "@/components/Alternates";
import { JsonLd } from "@/components/JsonLd";
import { AREAS } from "@/content/areas";
import { SITE } from "@/lib/site";
import "../globals.css";

const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["500", "600", "700"], variable: "--font-poppins", display: "swap" });
const inter = Inter({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = { themeColor: "#0B2545", width: "device-width", initialScale: 1 };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { metadataBase: new URL(SITE.url), title: { default: t("title"), template: "%s | CRC Telecom" }, description: t("description") };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "a11y" });

  const org = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE.url + "/#business",
    name: SITE.name,
    url: SITE.url,
    logo: SITE.url + "/brand/crc-telecom-logo-color.png",
    image: SITE.url + "/brand/crc-telecom-logo-color.png",
    email: SITE.email,
    telephone: SITE.phoneE164,
    address: { "@type": "PostalAddress", streetAddress: SITE.address.street, addressLocality: SITE.address.city, addressRegion: SITE.address.region, postalCode: SITE.address.postal, addressCountry: SITE.address.country },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: AREAS.map((a) => ({ "@type": "AdministrativeArea", name: a.name.en })),
    knowsLanguage: ["fr-CA", "en-CA"],
  };

  return (
    <html lang={locale === "fr" ? "fr-CA" : "en-CA"} className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider>
          <AlternatesProvider>
            <a href="#main" className="sr-only z-[100] rounded-ctl bg-navy px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">{t("skip")}</a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <CookieConsent />
            <Motion />
          </AlternatesProvider>
        </NextIntlClientProvider>
        <JsonLd data={org} />
      </body>
    </html>
  );
}
