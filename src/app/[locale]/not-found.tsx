import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="wrap py-28">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-[clamp(34px,5vw,60px)] font-semibold">{t("h")}</h1>
      <p className="mt-4">{t("p")}</p>
      <Link href="/" className="btn btn-navy mt-8">{t("back")}</Link>
    </section>
  );
}
