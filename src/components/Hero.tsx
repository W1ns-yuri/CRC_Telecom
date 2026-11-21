import { Fragment } from "react";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { HeroCanvas } from "./HeroCanvas";
import { Icon } from "./Icon";
import { Marquee } from "./Marquee";
import { SITE } from "@/lib/site";

/**
 * Хиро главной (бриф: фото техника/машины во всю ширину + тёмная подложка,
 * заголовок из брифа, кнопки «Soumission» и «Nos services»).
 *
 * Фото: положи файл в public/hero/hero.jpg — он подхватится сам.
 * Пока файла нет, вместо фото рисуются волны сигнала (HeroCanvas).
 */
const PHOTO = "/hero/hero.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));

type Props = {
  eyebrow: string;
  h1a: string;
  h1b: string;
  sub: string;
  quote: string;
  services: string;
  call: string;
  photoAlt: string;
  marquee: string[];
  marqueeLabel: string;
  pauseLabel: string;
  playLabel: string;
};

/** Разбиваем заголовок на слова для анимации появления. Текст остаётся цельным для скринридеров и SEO. */
function Words({ text, from, className }: { text: string; from: number; className?: string }) {
  return text.split(" ").map((w, i) => (
    <Fragment key={i}>
      <span className="hero-word" aria-hidden="true">
        <span className={className} style={{ animationDelay: `${120 + (from + i) * 45}ms` }}>{w}</span>
      </span>{" "}
    </Fragment>
  ));
}

export function Hero({ eyebrow, h1a, h1b, sub, quote, services, call, photoAlt, marquee, marqueeLabel, pauseLabel, playLabel }: Props) {
  const nA = h1a.split(" ").length;
  return (
    <section
      className="on-dark relative isolate flex min-h-[min(calc(100svh-104px),780px)] flex-col overflow-hidden bg-navy text-on-navy lg:min-h-[min(calc(100svh-120px),860px)]"
      aria-labelledby="h1"
    >
      {hasPhoto ? (
        <div className="absolute inset-0 -z-10">
          <Image src={PHOTO} alt={photoAlt} fill priority sizes="100vw" className="hero-photo object-cover" />
          {/* Подложка: слева темнее под текстом, справа видно фото. Держит контраст белого текста > 4.5:1. */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,37,69,.94)_0%,rgba(11,37,69,.86)_55%,rgba(11,37,69,.6)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
        </div>
      ) : (
        <HeroCanvas />
      )}

      <div className="wrap flex flex-1 flex-col justify-start sm:justify-center pt-9 pb-10 lg:pt-16 lg:pb-14">
        <p className="eyebrow hero-fade !text-[11.5px] sm:!text-[12.5px]" style={{ animationDelay: "0ms" }}>{eyebrow}</p>
        <h1 id="h1" className="mt-4 sm:mt-5 max-w-[1180px] text-[clamp(29px,4.6vw,68px)] text-balance font-semibold leading-[1.02] tracking-[-0.03em] text-white lg:mt-7">
          <span className="sr-only">{h1a} {h1b}</span>
          <Words text={h1a} from={0} />
          <Words text={h1b} from={nA} className="text-teal-light" />
        </h1>
        <p className="hero-fade order-last mt-6 max-w-[62ch] text-[15px] leading-relaxed text-on-navy sm:order-none sm:mt-5 sm:text-[clamp(16px,1.3vw,19px)] lg:mt-7" style={{ animationDelay: "520ms" }}>
          {sub}
        </p>
        <div className="hero-fade mt-6 flex flex-wrap gap-3 sm:mt-7 lg:mt-10" style={{ animationDelay: "620ms" }}>
          <Link href="/contact" className="btn btn-teal" data-magnetic>{quote}<Icon name="arrow" strokeWidth={2} /></Link>
          <Link href="/services" className="btn btn-ghost" data-magnetic>{services}</Link>
          <a href={SITE.phoneHref} className="btn btn-ghost sm:hidden" aria-label={`${call} ${SITE.phone}`}>
            <Icon name="phone" strokeWidth={1.9} />{SITE.phone}
          </a>
        </div>
      </div>

      {/* Нижняя полоса: бегущая строка с услугами (телефон и почта уже есть в шапке) */}
      <div className="hero-fade" style={{ animationDelay: "760ms" }}>
        <Marquee items={marquee} label={marqueeLabel} pause={pauseLabel} play={playLabel} />
      </div>
    </section>
  );
}
