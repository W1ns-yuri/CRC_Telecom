import type { L } from "@/lib/i18n-text";

export type Area = {
  id: "qc" | "on" | "ny" | "vt";
  slug: L;
  name: L;
  languages: string;
  tagline: L;
  body: L<string[]>;
  places: L<string[]>;
  focus: string[];
};

// Тексты уникальны для каждого региона (требование брифа). Список городов — примеры из брифа,
// CRC Telecom должен подтвердить окончательный список.
export const AREAS: Area[] = [
  {
    id: "qc",
    slug: { fr: "quebec", en: "quebec" },
    name: { fr: "Québec", en: "Quebec" },
    languages: "FR · EN",
    tagline: { fr: "Notre port d'attache, depuis Mont-Royal.", en: "Our home base, from Mont-Royal." },
    body: {
      fr: [
        "Notre siège social est au 5590 av Royalmount, à Mont-Royal. Nos techniciens interviennent chaque jour dans le Grand Montréal et partent de là vers les régions.",
        "Bureaux, commerces, organismes publics : nous servons nos clients du Québec en français, avec des soumissions, des formations et des documents en français.",
      ],
      en: [
        "Our head office is at 5590 av Royalmount in Mont-Royal. Our technicians work across Greater Montreal every day and head out to the regions from there.",
        "Offices, retail, public bodies: we serve Quebec clients in French, with quotes, training and documents in French.",
      ],
    },
    places: { fr: ["Montréal et le Grand Montréal", "Autres villes à confirmer"], en: ["Montreal and Greater Montreal", "Other cities to be confirmed"] },
    focus: ["phones", "cams", "access", "cabling"],
  },
  {
    id: "on",
    slug: { fr: "nord-ouest-ontario", en: "northwestern-ontario" },
    name: { fr: "Nord-Ouest de l'Ontario", en: "Northwestern Ontario" },
    languages: "FR · EN",
    tagline: { fr: "Grandes distances, sites éloignés, hivers longs.", en: "Long distances, remote sites, long winters." },
    body: {
      fr: [
        "Dans le Nord-Ouest de l'Ontario, les sites sont souvent à des heures de route les uns des autres et le réseau cellulaire s'arrête vite. C'est là que les radios, les répéteurs et le satellite font la différence.",
        "Nous équipons les entreprises, les camps et les communautés de la région de Thunder Bay et de Kenora avec des systèmes pensés pour le froid et l'isolement.",
      ],
      en: [
        "In Northwestern Ontario, sites are often hours apart and cell coverage ends quickly. That's where radios, repeaters and satellite make the difference.",
        "We equip businesses, camps and communities in the Thunder Bay and Kenora region with systems built for cold and isolation.",
      ],
    },
    places: { fr: ["Région de Thunder Bay", "Région de Kenora", "Autres secteurs à confirmer"], en: ["Thunder Bay region", "Kenora region", "Other areas to be confirmed"] },
    focus: ["radios", "sat", "fleet", "wifi"],
  },
  {
    id: "ny",
    slug: { fr: "new-york", en: "new-york" },
    name: { fr: "État de New York", en: "New York" },
    languages: "EN",
    tagline: { fr: "Le même partenaire, de l'autre côté de la frontière.", en: "The same partner, across the border." },
    body: {
      fr: [
        "Pour nos clients de l'État de New York, nous offrons le même modèle : un seul partenaire pour la téléphonie, la radio, le réseau, la sécurité et la flotte.",
        "Le service y est offert en anglais. Les entreprises qui ont des sites des deux côtés de la frontière gardent un seul interlocuteur.",
      ],
      en: [
        "For our New York clients, we offer the same model: one partner for phones, radio, network, security and fleet.",
        "Service is provided in English. Businesses with sites on both sides of the border keep a single point of contact.",
      ],
    },
    places: { fr: ["Villes desservies à confirmer"], en: ["Cities served to be confirmed"] },
    focus: ["fleet", "cams", "access", "radios"],
  },
  {
    id: "vt",
    slug: { fr: "vermont", en: "vermont" },
    name: { fr: "Vermont", en: "Vermont" },
    languages: "EN",
    tagline: { fr: "Petites villes, grands territoires.", en: "Small towns, big territory." },
    body: {
      fr: [
        "Au Vermont, beaucoup d'organisations sont réparties dans de petites villes et des zones rurales. Nos radios bidirectionnelles et nos solutions satellites gardent les équipes reliées entre elles.",
        "Nous installons aussi caméras, contrôle d'accès et Wi-Fi pour les commerces, les écoles et les bâtiments municipaux. Service en anglais.",
      ],
      en: [
        "In Vermont, many organizations are spread across small towns and rural areas. Our two-way radios and satellite solutions keep crews connected.",
        "We also install cameras, access control and Wi-Fi for businesses, schools and municipal buildings. Service in English.",
      ],
    },
    places: { fr: ["Villes desservies à confirmer"], en: ["Cities served to be confirmed"] },
    focus: ["radios", "sat", "cams", "wifi"],
  },
];

export const areaBySlug = (slug: string) => AREAS.find((a) => a.slug.fr === slug || a.slug.en === slug);
