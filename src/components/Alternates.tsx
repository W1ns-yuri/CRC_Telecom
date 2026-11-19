"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { Alt } from "@/lib/paths";

const Ctx = createContext<{ alt: Alt | null; set: (a: Alt) => void }>({ alt: null, set: () => {} });

export function AlternatesProvider({ children }: { children: React.ReactNode }) {
  const [alt, set] = useState<Alt | null>(null);
  return <Ctx.Provider value={{ alt, set }}>{children}</Ctx.Provider>;
}

/** Страница сообщает шапке свои адреса на обоих языках (у услуг разные slug в FR и EN). */
export function SetAlternates({ alt }: { alt: Alt }) {
  const { set } = useContext(Ctx);
  useEffect(() => set(alt), [alt.fr, alt.en]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export const useAlternates = () => useContext(Ctx).alt;
