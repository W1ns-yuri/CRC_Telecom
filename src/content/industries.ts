import type { L } from "@/lib/i18n-text";

export type Industry = {
  id: string;
  slug: L;
  name: L;
  intro: L;
  challenges: L<string[]>;
  services: string[];
  extra?: L<string[]>;
};

export const INDUSTRIES: Industry[] = [
  {
    id: "gov",
    slug: { fr: "gouvernement-secteur-public", en: "government-public-sector" },
    name: { fr: "Gouvernement et secteur public", en: "Government & Public Sector" },
    intro: {
      fr: "Municipalités, commissions scolaires, communautés des Premières Nations, organismes provinciaux et d'État, services de sécurité publique.",
      en: "Municipalities, school boards, First Nations communities, provincial and state agencies, public-safety services.",
    },
    challenges: {
      fr: [
        "Des bâtiments publics à sécuriser sans compliquer l'accès des citoyens",
        "Des équipes de travaux publics et d'urgence qui doivent rester en contact",
        "Des processus d'appels d'offres et des exigences de conformité stricts",
      ],
      en: [
        "Public buildings to secure without making access harder for citizens",
        "Public-works and emergency crews that must stay in touch",
        "Strict tender processes and compliance requirements",
      ],
    },
    services: ["radios", "access", "cams", "phones", "fleet"],
    extra: {
      fr: [
        "Réponse aux appels d'offres publics : documentation technique, fiches produits et plans fournis",
        "Documents de conformité et attestations sur demande",
        "Habilitations de sécurité : à confirmer par CRC Telecom",
      ],
      en: [
        "Public tender responses: technical documentation, product sheets and drawings provided",
        "Compliance documents and certificates on request",
        "Security clearances: to be confirmed by CRC Telecom",
      ],
    },
  },
  {
    id: "commercial",
    slug: { fr: "commerce-et-detail", en: "commercial-retail" },
    name: { fr: "Commerce et détail", en: "Commercial & Retail" },
    intro: {
      fr: "Bureaux, magasins, hôtels et restaurants qui ont besoin d'un réseau fiable et de locaux sécurisés.",
      en: "Offices, stores, hotels and restaurants that need a reliable network and secure premises.",
    },
    challenges: {
      fr: ["Des pertes et des vols à réduire", "Un Wi-Fi invité qui ne met pas le réseau interne à risque", "Des appels clients à ne jamais manquer"],
      en: ["Shrinkage and theft to reduce", "Guest Wi-Fi that doesn't put the internal network at risk", "Customer calls you can't afford to miss"],
    },
    services: ["cams", "wifi", "phones", "access", "cabling"],
  },
  {
    id: "industrial",
    slug: { fr: "industrie-mines-foresterie", en: "industrial-mining-forestry" },
    name: { fr: "Industrie, mines et foresterie", en: "Industrial, Mining & Forestry" },
    intro: {
      fr: "Équipes sur le terrain, sites isolés et conditions difficiles, souvent loin de tout réseau cellulaire.",
      en: "Field crews, isolated sites and tough conditions, often far from any cell network.",
    },
    challenges: {
      fr: ["Des équipes dispersées sur de grands territoires", "Pas de réseau cellulaire sur plusieurs sites", "La sécurité des travailleurs isolés"],
      en: ["Crews spread over large territories", "No cell coverage at many sites", "Lone worker safety"],
    },
    services: ["radios", "sat", "fleet", "wifi", "cams"],
  },
  {
    id: "transport",
    slug: { fr: "transport-et-logistique", en: "transport-logistics" },
    name: { fr: "Transport et logistique", en: "Transport & Logistics" },
    intro: {
      fr: "Transporteurs, centres de distribution et entreprises de livraison qui doivent savoir où sont leurs véhicules.",
      en: "Carriers, distribution centres and delivery companies that need to know where their vehicles are.",
    },
    challenges: {
      fr: ["Suivre les véhicules et l'équipement en temps réel", "Couvrir de grands entrepôts en Wi-Fi", "Garder les chauffeurs en contact avec la répartition"],
      en: ["Tracking vehicles and equipment in real time", "Covering large warehouses with Wi-Fi", "Keeping drivers in touch with dispatch"],
    },
    services: ["fleet", "radios", "wifi", "cams", "access"],
  },
  {
    id: "health-edu",
    slug: { fr: "sante-et-education", en: "healthcare-education" },
    name: { fr: "Santé et éducation", en: "Healthcare & Education" },
    intro: {
      fr: "Hôpitaux, cliniques, écoles et cégeps où la sécurité et la communication ne peuvent pas flancher.",
      en: "Hospitals, clinics, schools and colleges where safety and communication can't fail.",
    },
    challenges: {
      fr: ["Contrôler l'accès aux zones sensibles", "Joindre rapidement le personnel en cas d'urgence", "Offrir un Wi-Fi fiable à des centaines d'utilisateurs"],
      en: ["Controlling access to sensitive areas", "Reaching staff quickly in an emergency", "Reliable Wi-Fi for hundreds of users"],
    },
    services: ["access", "cams", "uc", "wifi", "cabling"],
  },
];

export const industryBySlug = (slug: string) =>
  INDUSTRIES.find((i) => i.slug.fr === slug || i.slug.en === slug);
