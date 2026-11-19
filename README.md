# CRC Telecom — website

Bilingual (Canadian French / English) website for CRC Telecom, a communications and security integrator serving Quebec, Northwestern Ontario, New York and Vermont.

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · next-intl · GSAP + Lenis · Zod · Sanity (CMS, planned) · Vercel.
Rationale and answers to the brief: [`docs/STACK.md`](docs/STACK.md). Code walkthrough in Russian: [`docs/GUIDE_RU.md`](docs/GUIDE_RU.md).

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: keys for Turnstile, Resend, Sanity, GA4
npm run dev                  # http://localhost:3000 → /fr
```

## What's built

- **Pages (FR + EN, localized URLs):** Home, Services overview + 9 service pages from one template, Industries + 5 pages, Service Areas + 4 pages (unique text each), About, Support, Contact / Request a Quote, Privacy, Cookies, Terms, Accessibility.
- **Home:** signal-wave hero (canvas), trust bar, filterable 9-service grid, pinned "Why CRC" section, industries (Government first), interactive dot-matrix service-area map, CTA band.
- **Service template:** hero, what we offer, benefits, use cases, brands, 5-step process, FAQ, quote form pre-filled with the service, related services.
- **Forms:** quote (9 service checkboxes, pre-selection from service pages and `?service=`), support (urgency, photo upload). Zod validation client + server, honeypot, Cloudflare Turnstile, email to office@ and confirmation in the visitor's language (Resend), storage in Sanity.
- **Law 25 cookie banner:** accept / refuse / choose by category, reopen from footer, choices logged via `/api/consent`; GA4 loads only after consent; Google Map on Contact loads only on click.
- **SEO:** per-page title/description, canonical, hreflang fr-CA / en-CA / x-default, LocalBusiness, Service, FAQPage and BreadcrumbList JSON-LD, sitemap.xml, robots.txt.
- **Accessibility:** skip link, one H1 per page, keyboard-operable menus, visible focus, labelled fields with error messages, reduced-motion support.
- **Brand:** logo files used as supplied (`public/brand/`), brand palette and Poppins + Inter.

`concept/index.html` is the original single-file design prototype, kept for reference.

## Content still to come from CRC Telecom

Business hours, support/emergency info, company history, certifications, partner logos, project photos and testimonials, city lists per region, privacy officer name, social links. These spots are marked "à confirmer / to be confirmed".

## Deploy

Import this repository in Vercel (framework is detected automatically), add the variables from `.env.example`, deploy.
