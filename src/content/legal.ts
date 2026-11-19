import type { L } from "@/lib/i18n-text";

export type LegalId = "privacy" | "cookies" | "terms" | "accessibility";
export type Block = { h?: string; p?: string[]; ul?: string[] };

export const LEGAL_SLUGS: { id: LegalId; slug: L }[] = [
  { id: "privacy", slug: { fr: "politique-de-confidentialite", en: "privacy-policy" } },
  { id: "cookies", slug: { fr: "politique-sur-les-temoins", en: "cookie-policy" } },
  { id: "terms", slug: { fr: "conditions-d-utilisation", en: "terms-of-use" } },
  { id: "accessibility", slug: { fr: "declaration-d-accessibilite", en: "accessibility-statement" } },
];

export const legalBySlug = (slug: string) => LEGAL_SLUGS.find((l) => l.slug.fr === slug || l.slug.en === slug);

// Черновики. Бриф: окончательные формулировки утверждает юрист CRC Telecom.
export const LEGAL: Record<LegalId, L<Block[]>> = {
  privacy: {
    fr: [
      { p: ["CRC Telecom respecte votre vie privée et protège vos renseignements personnels conformément à la Loi sur la protection des renseignements personnels dans le secteur privé du Québec (Loi 25) et aux lois canadiennes et américaines applicables."] },
      { h: "Renseignements recueillis", ul: ["Les renseignements que vous saisissez dans nos formulaires : nom, entreprise, fonction, courriel, téléphone, adresse du site, description de votre besoin et, si vous la joignez, une photo.", "Avec votre consentement seulement : des données d'utilisation du site (témoins d'analyse)."] },
      { h: "Pourquoi nous les utilisons", ul: ["Répondre à vos demandes de soumission, de service ou d'information.", "Vous envoyer une confirmation de votre demande.", "Améliorer le site, si vous acceptez les témoins d'analyse."] },
      { h: "Durée de conservation", p: ["Les demandes sont conservées le temps nécessaire pour y répondre et assurer le suivi commercial, puis au maximum [durée à confirmer par CRC Telecom]."] },
      { h: "Communication à des tiers", p: ["Nous ne vendons pas vos renseignements. Ils sont traités par les fournisseurs suivants, dont certains hébergent des données à l'extérieur du Québec (une évaluation des facteurs relatifs à la vie privée doit être réalisée par CRC Telecom) :"], ul: ["Vercel Inc. (hébergement du site, États-Unis)", "Resend (envoi des courriels, États-Unis)", "Sanity (stockage des demandes, États-Unis / UE)", "Cloudflare Turnstile (protection contre le pourriel)", "Google Analytics 4 (seulement si vous y consentez)"] },
      { h: "Vos droits", p: ["Vous pouvez demander l'accès à vos renseignements, leur rectification, leur suppression, ou retirer votre consentement en tout temps."] },
      { h: "Responsable de la protection des renseignements personnels", p: ["Nom et coordonnées : [à fournir par CRC Telecom]", "Adresse : 5590 av Royalmount, Mont-Royal, QC H4P 1H7 · office@crc-telecom.ca · 647-367-1022"] },
    ],
    en: [
      { p: ["CRC Telecom respects your privacy and protects your personal information in accordance with Quebec's Act respecting the protection of personal information in the private sector (Law 25) and applicable Canadian and US laws."] },
      { h: "Information we collect", ul: ["Information you enter in our forms: name, company, job title, email, phone, site address, a description of your needs and, if you attach one, a photo.", "Only with your consent: site usage data (analytics cookies)."] },
      { h: "Why we use it", ul: ["To respond to your quote, service or information requests.", "To send you a confirmation of your request.", "To improve the site, if you accept analytics cookies."] },
      { h: "How long we keep it", p: ["Requests are kept as long as needed to respond and follow up, then for no more than [period to be confirmed by CRC Telecom]."] },
      { h: "Sharing with third parties", p: ["We do not sell your information. It is processed by the following providers, some of which store data outside Quebec (a privacy impact assessment must be completed by CRC Telecom):"], ul: ["Vercel Inc. (website hosting, United States)", "Resend (email delivery, United States)", "Sanity (request storage, United States / EU)", "Cloudflare Turnstile (spam protection)", "Google Analytics 4 (only if you consent)"] },
      { h: "Your rights", p: ["You may request access to your information, its correction or deletion, or withdraw your consent at any time."] },
      { h: "Person in charge of the protection of personal information", p: ["Name and contact details: [to be supplied by CRC Telecom]", "Address: 5590 av Royalmount, Mont-Royal, QC H4P 1H7 · office@crc-telecom.ca · 647-367-1022"] },
    ],
  },
  cookies: {
    fr: [
      { p: ["Un témoin (cookie) est un petit fichier enregistré par votre navigateur. Les témoins non essentiels restent désactivés tant que vous ne les acceptez pas. Vous pouvez modifier votre choix en tout temps avec le lien « Gérer les témoins » au bas de chaque page."] },
      { h: "Témoins essentiels (toujours actifs)", ul: ["NEXT_LOCALE : mémorise la langue choisie.", "crc_consent : mémorise vos choix de témoins pendant 6 mois."] },
      { h: "Témoins d'analyse (avec consentement)", ul: ["Google Analytics 4 (_ga, _ga_*) : mesure de la fréquentation et des demandes envoyées."] },
      { h: "Témoins de publicité (avec consentement)", ul: ["Aucun pour le moment. Cette catégorie servira si des campagnes publicitaires sont mesurées."] },
    ],
    en: [
      { p: ["A cookie is a small file stored by your browser. Non-essential cookies stay off until you accept them. You can change your choice at any time with the “Manage cookies” link at the bottom of every page."] },
      { h: "Essential cookies (always on)", ul: ["NEXT_LOCALE: remembers your chosen language.", "crc_consent: remembers your cookie choices for 6 months."] },
      { h: "Analytics cookies (with consent)", ul: ["Google Analytics 4 (_ga, _ga_*): measures traffic and submitted requests."] },
      { h: "Advertising cookies (with consent)", ul: ["None at the moment. This category will be used if advertising campaigns are measured."] },
    ],
  },
  terms: {
    fr: [
      { p: ["En utilisant le site crc-telecom.ca, vous acceptez les présentes conditions."] },
      { h: "Contenu", p: ["Les renseignements publiés sont fournis à titre indicatif. Les prix et les solutions sont confirmés uniquement dans une soumission écrite."] },
      { h: "Propriété intellectuelle", p: ["Le contenu, le logo et les images du site appartiennent à CRC Telecom ou à leurs propriétaires respectifs."] },
      { h: "Droit applicable", p: ["Les présentes conditions sont régies par les lois du Québec et du Canada."] },
    ],
    en: [
      { p: ["By using the crc-telecom.ca website, you agree to these terms."] },
      { h: "Content", p: ["Information published is for general guidance. Prices and solutions are confirmed only in a written quote."] },
      { h: "Intellectual property", p: ["The site's content, logo and images belong to CRC Telecom or their respective owners."] },
      { h: "Governing law", p: ["These terms are governed by the laws of Quebec and Canada."] },
    ],
  },
  accessibility: {
    fr: [
      { p: ["CRC Telecom veut que son site soit utilisable par tous. Le site vise la conformité aux Règles pour l'accessibilité des contenus Web (WCAG) 2.1, niveau AA, ce qui couvre aussi les exigences de la LAPHO en Ontario."] },
      { h: "Mesures prises", ul: ["Navigation complète au clavier et focus visible", "Contrastes de couleurs d'au moins 4,5:1", "Textes de remplacement sur les images", "Champs de formulaire étiquetés et messages d'erreur explicites", "Respect du réglage « réduire les animations » du système"] },
      { h: "Nous joindre", p: ["Si vous rencontrez un obstacle sur le site, écrivez à office@crc-telecom.ca ou appelez le 647-367-1022. Nous vous répondrons et vous fournirons l'information dans un autre format au besoin."] },
    ],
    en: [
      { p: ["CRC Telecom wants its website to be usable by everyone. The site aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, level AA, which also covers Ontario AODA requirements."] },
      { h: "Measures taken", ul: ["Full keyboard navigation and visible focus", "Colour contrast of at least 4.5:1", "Alternative text on images", "Labelled form fields and clear error messages", "Respect for the system “reduce motion” setting"] },
      { h: "Contact us", p: ["If you encounter a barrier on the site, email office@crc-telecom.ca or call 647-367-1022. We will respond and provide the information in another format if needed."] },
    ],
  },
};
