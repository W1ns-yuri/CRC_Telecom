import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

// Бриф: французский по умолчанию для посетителей из Квебека.
// На Vercel регион приходит в заголовке x-vercel-ip-country-region.
export default function middleware(req: NextRequest) {
  const isRoot = req.nextUrl.pathname === "/";
  const chosen = req.cookies.get("NEXT_LOCALE")?.value;
  const region = req.headers.get("x-vercel-ip-country-region");
  const country = req.headers.get("x-vercel-ip-country");
  if (isRoot && !chosen && country === "CA" && region === "QC") {
    return NextResponse.redirect(new URL("/fr", req.url));
  }
  return intl(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
