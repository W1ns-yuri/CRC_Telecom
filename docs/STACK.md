# CRC Telecom website: platform proposal and stack rationale

The brief asks the builder to "propose and justify" a platform (WordPress, Webflow or similar). This document answers that, and the other questions listed at the end of section 10 of the brief.

## Recommendation

**Next.js (React) + Sanity CMS, hosted on Vercel.**

| Brief requirement | How this stack covers it |
|---|---|
| Staff edit text, photos, projects and news without a developer | Sanity Studio: a visual editor at `crc-telecom.ca/studio` (or `crc.sanity.studio`), with French and English fields side by side. |
| Full French version, at least as complete as English (Bill 96) | Every page exists at `/fr/...` and `/en/...` with localized URLs (`/fr/secteurs`, `/en/industries`). French is the default, and Quebec visitors are sent to French automatically. No machine-translation widget. |
| Forms with spam protection, email to office@, confirmation to visitor in their language, stored in back-end | Built in: Cloudflare Turnstile, emails via Resend, submissions stored in Sanity. |
| Cookie banner with categories, consent recorded (Law 25) | Built in: accept / refuse / choose by category, change later from the footer, each choice logged. GA4 loads only after consent. |
| WCAG 2.1 AA | Semantic HTML, keyboard navigation, visible focus, labelled fields, 4.5:1 contrast, "reduce motion" respected. |
| SEO: unique titles and descriptions, hreflang, schema, sitemap | Generated per page: `hreflang` fr-CA / en-CA, LocalBusiness, Service, FAQPage and BreadcrumbList schema, `sitemap.xml`, `robots.txt`. |
| Core Web Vitals "good" on mobile | Pages are pre-rendered as static HTML and served from a CDN. Images are converted to WebP/AVIF automatically. |
| SSL, backups, security updates, uptime | Vercel: automatic HTTPS, no server to patch. Sanity keeps full content history. Uptime monitoring via a free service (e.g. Better Stack). |
| Accounts in CRC Telecom's name | Vercel, Sanity, Resend, Cloudflare, Google accounts are all created under CRC Telecom's email, with the builder invited as a member. |

### Why not WordPress or Webflow

- **WordPress + WPML** works, but needs plugin updates, a PHP host and security patching. The animated design would have to be built inside a theme builder, which usually costs performance.
- **Webflow Localization** is good for simple sites, but form storage, email confirmations in the visitor's language, consent logging and custom animation need paid add-ons or workarounds, and the localization plan is billed per locale.
- **Next.js + Sanity** gives full control over design, performance and accessibility, with no plugins to maintain, while staff still get a simple editor.

The trade-off: content edits do not need a developer, but **new page types or layout changes do**. That is covered by the maintenance plan.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 with CRC brand tokens (Navy, Signal Teal, Light Teal, Slate, Light Grey; Poppins + Inter) |
| Bilingual | next-intl: `/fr` (fr-CA, default) and `/en` (en-CA), localized URLs |
| Motion | GSAP + ScrollTrigger, Lenis smooth scroll; disabled for visitors who choose "reduce motion" |
| Forms | Zod validation (same rules in browser and server), Cloudflare Turnstile, Resend for email |
| CMS / storage | Sanity (content, form submissions, consent log) |
| Hosting | Vercel (Canada/US edge network) |
| Analytics | Google Analytics 4, loaded only after consent |

## Data stored outside Quebec (for the Law 25 privacy assessment)

| Tool | Data | Location |
|---|---|---|
| Vercel | Website hosting, server logs | United States |
| Resend | Form emails in transit | United States |
| Sanity | Form submissions, consent log, site content | United States / EU (region selectable) |
| Cloudflare Turnstile | Anti-spam check (no personal profile) | Global |
| Google Analytics 4 | Usage data, only with consent | United States |

## Answers to the brief's questions

| Question | Answer |
|---|---|
| Platform recommended | Next.js + Sanity on Vercel (see above). |
| Total price | _To be filled in by the builder._ |
| What is included in translation | All pages, forms, emails, error messages, cookie banner and legal pages in French and English. Draft copy is written in Quebec French; a professional Quebec translator should review it before launch. |
| Revision rounds | _To be filled in by the builder (suggested: 2 rounds on mock-ups, 1 round on the built site)._ |
| Hosting cost per year | Approximate, check current pricing: Vercel Pro ~US$20/month; Sanity free tier is enough at launch; Resend free tier covers 3,000 emails/month; Turnstile free. About US$240/year plus the domain. |
| Maintenance plan | _To be filled in by the builder._ Suggested scope: dependency updates, monthly checks of forms and backups, small content changes. |
| Who owns the site after launch | CRC Telecom: the code repository, all accounts and all content are transferred to and registered in CRC Telecom's name. |

## Items still needed from CRC Telecom

Business hours, support/emergency number, year founded and company story, certifications/licences/insurance, partner brands and logo permissions, project photos and testimonials with written permission, cities served per region, name of the person in charge of personal information, social media links. Every place waiting for this content is marked "à confirmer / to be confirmed" on the site.
