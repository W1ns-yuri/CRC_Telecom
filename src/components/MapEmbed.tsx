"use client";
import { useState } from "react";
import { SITE } from "@/lib/site";

/** Карта Google грузится только по клику: без согласия не ставим сторонние cookie (Loi 25). */
export function MapEmbed({ button, note, open }: { button: string; note: string; open: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="overflow-hidden rounded-media border border-line">
      {show ? (
        <iframe title="Google Maps · CRC Telecom" src={SITE.mapsEmbed} className="block aspect-square w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="grid aspect-square place-items-center bg-grey p-6 text-center">
          <div>
            <button type="button" onClick={() => setShow(true)} className="btn btn-navy">{button}</button>
            <p className="mt-3 text-[13px] text-ink-soft">{note}</p>
          </div>
        </div>
      )}
      <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="block border-t border-line px-4 py-3 text-[14px] font-semibold text-navy no-underline hover:bg-grey">{open} ↗</a>
    </div>
  );
}
