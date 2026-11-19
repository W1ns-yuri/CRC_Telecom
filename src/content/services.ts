import type { L } from "@/lib/i18n-text";

export type IconName =
  | "phone" | "radio" | "wifi" | "cable" | "camera" | "lock" | "sat" | "uc" | "fleet";
export type ServiceGroup = "voice" | "network" | "security" | "fleet";

export type Service = {
  id: string;
  slug: L;
  icon: IconName;
  group: ServiceGroup;
  name: L;
  short: L;
  summary: L;
  meta: L;
  offers: L<string[]>;
  benefits: L<{ title: string; text: string }[]>;
  useCases: L<string[]>;
  faq: L<{ q: string; a: string }[]>;
  related: string[];
};

export const GROUPS: Record<ServiceGroup, L> = {
  voice: { fr: "Voix", en: "Voice" },
  network: { fr: "Réseau", en: "Network" },
  security: { fr: "Sécurité", en: "Security" },
  fleet: { fr: "Flotte", en: "Fleet" },
};

export const SERVICES: Service[] = [
  {
    id: "phones",
    slug: { fr: "systemes-telephoniques-affaires", en: "business-phone-systems" },
    icon: "phone",
    group: "voice",
    name: { fr: "Systèmes téléphoniques d'affaires", en: "Business Phone Systems" },
    short: {
      fr: "Infonuagique (VoIP) ou sur place, avec migration de vos anciennes lignes.",
      en: "Cloud (VoIP) or on-premise, with migration from your old lines.",
    },
    summary: {
      fr: "Un système téléphonique infonuagique ou sur place, choisi pour votre façon de travailler, installé et configuré par nos techniciens.",
      en: "A cloud or on-premise phone system chosen for the way you work, installed and configured by our technicians.",
    },
    meta: {
      fr: "Système téléphonique d'affaires à Montréal et au Québec : VoIP infonuagique, postes de bureau, réceptionniste automatique et migration de lignes.",
      en: "Business phone systems in Quebec, Ontario, New York and Vermont: cloud VoIP, desk phones, auto-attendant and line migration.",
    },
    offers: {
      fr: [
        "Systèmes infonuagiques (VoIP) et sur place",
        "Postes de bureau, sans fil et conférence",
        "Réceptionniste automatique et files d'attente",
        "Enregistrement des appels",
        "Migration de vos anciennes lignes sans interruption",
        "Entretien, réparation et mises à jour",
      ],
      en: [
        "Cloud (VoIP) and on-premise systems",
        "Desk, cordless and conference phones",
        "Auto-attendant and call queues",
        "Call recording",
        "Migration from old lines without downtime",
        "Maintenance, repair and updates",
      ],
    },
    benefits: {
      fr: [
        { title: "Moins de frais fixes", text: "Le passage à la VoIP réduit souvent le coût des lignes et des interurbains." },
        { title: "Aucun appel perdu", text: "Réceptionniste automatique, renvois et messagerie vers courriel." },
        { title: "Un seul fournisseur", text: "Le même technicien installe le câblage, les postes et le réseau." },
      ],
      en: [
        { title: "Lower fixed costs", text: "Moving to VoIP often lowers line and long-distance costs." },
        { title: "No missed calls", text: "Auto-attendant, call forwarding and voicemail to email." },
        { title: "One provider", text: "The same technician installs the cabling, phones and network." },
      ],
    },
    useCases: {
      fr: ["Bureaux et sièges sociaux", "Municipalités et organismes publics", "Cliniques et écoles", "Commerces multisites"],
      en: ["Offices and head offices", "Municipalities and public agencies", "Clinics and schools", "Multi-site retail"],
    },
    faq: {
      fr: [
        { q: "Puis-je garder mes numéros actuels?", a: "Oui. Nous transférons vos numéros existants vers le nouveau système et planifions la bascule pour éviter toute interruption." },
        { q: "Infonuagique ou sur place : que choisir?", a: "L'infonuagique convient à la plupart des entreprises qui veulent peu d'équipement sur place. Un système sur place reste pertinent pour les sites avec une connexion Internet limitée. Nous vous conseillons après l'évaluation de site." },
        { q: "Les téléphones fonctionnent-ils avec Microsoft Teams?", a: "Oui, nous pouvons intégrer votre téléphonie à Microsoft Teams. Voir aussi nos communications unifiées." },
      ],
      en: [
        { q: "Can I keep my current numbers?", a: "Yes. We port your existing numbers to the new system and schedule the switch to avoid downtime." },
        { q: "Cloud or on-premise: which should I choose?", a: "Cloud suits most businesses that want little equipment on site. On-premise still makes sense for sites with limited internet. We advise you after the site assessment." },
        { q: "Do the phones work with Microsoft Teams?", a: "Yes, we can integrate your phone system with Microsoft Teams. See also our unified communications." },
      ],
    },
    related: ["uc", "cabling", "wifi"],
  },
  {
    id: "radios",
    slug: { fr: "radios-bidirectionnelles", en: "two-way-radios" },
    icon: "radio",
    group: "voice",
    name: { fr: "Radios bidirectionnelles", en: "Two-Way Radios" },
    short: {
      fr: "Radios portatives et mobiles, répéteurs et aide aux licences.",
      en: "Portable and mobile radios, repeaters and licensing help.",
    },
    summary: {
      fr: "Des radios portatives et mobiles qui gardent vos équipes en contact sur le chantier, dans l'entrepôt ou en forêt.",
      en: "Portable and mobile radios that keep your crews in touch on the job site, in the warehouse or in the bush.",
    },
    meta: {
      fr: "Radios bidirectionnelles au Québec et dans le Nord-Ouest de l'Ontario : radios portatives et mobiles, répéteurs, licences, location et PTT cellulaire.",
      en: "Two-way radio dealer for Quebec, Ontario, New York and Vermont: portable and mobile radios, repeaters, licensing, rentals and push-to-talk over cellular.",
    },
    offers: {
      fr: [
        "Radios portatives et mobiles (véhicules)",
        "Répéteurs et extension de couverture",
        "Aide aux demandes de licences",
        "Location pour événements et projets",
        "PTT cellulaire (push-to-talk)",
        "Programmation, entretien et réparation",
      ],
      en: [
        "Portable and mobile (vehicle) radios",
        "Repeaters and coverage extension",
        "Licensing assistance",
        "Rentals for events and projects",
        "Push-to-talk over cellular",
        "Programming, maintenance and repair",
      ],
    },
    benefits: {
      fr: [
        { title: "Contact instantané", text: "Une touche suffit pour joindre toute l'équipe, sans composer de numéro." },
        { title: "Fiable là où le cellulaire ne passe pas", text: "Les répéteurs couvrent les sites éloignés et les grands bâtiments." },
        { title: "Licences simplifiées", text: "Nous préparons les demandes de fréquences avec vous." },
      ],
      en: [
        { title: "Instant contact", text: "One button reaches the whole crew, no dialing." },
        { title: "Works where cell service doesn't", text: "Repeaters cover remote sites and large buildings." },
        { title: "Licensing made simple", text: "We prepare frequency applications with you." },
      ],
    },
    useCases: {
      fr: ["Chantiers de construction", "Mines et foresterie", "Sécurité publique et travaux publics", "Événements et sites temporaires"],
      en: ["Construction sites", "Mining and forestry", "Public safety and public works", "Events and temporary sites"],
    },
    faq: {
      fr: [
        { q: "Ai-je besoin d'une licence pour utiliser des radios?", a: "La plupart des radios professionnelles exigent une licence d'Innovation, Sciences et Développement économique Canada (ou de la FCC aux États-Unis). Nous vous aidons à la demander." },
        { q: "Louez-vous des radios pour un projet court?", a: "Oui, nous offrons la location pour des événements et des projets temporaires." },
        { q: "Quelle est la différence avec le PTT cellulaire?", a: "Le PTT cellulaire utilise le réseau cellulaire pour une portée illimitée là où il y a du signal. Les radios classiques fonctionnent sans réseau. Plusieurs clients combinent les deux." },
      ],
      en: [
        { q: "Do I need a licence to use radios?", a: "Most business radios require a licence from Innovation, Science and Economic Development Canada (or the FCC in the US). We help you apply." },
        { q: "Do you rent radios for short projects?", a: "Yes, we offer rentals for events and temporary projects." },
        { q: "How is push-to-talk over cellular different?", a: "Push-to-talk over cellular uses the cell network for unlimited range wherever there is signal. Traditional radios work without a network. Many clients combine both." },
      ],
    },
    related: ["fleet", "sat", "uc"],
  },
  {
    id: "wifi",
    slug: { fr: "wi-fi-reseaux-sans-fil", en: "wifi-wireless-networks" },
    icon: "wifi",
    group: "network",
    name: { fr: "Wi-Fi et réseaux sans fil", en: "Wi-Fi & Wireless Networks" },
    short: {
      fr: "Une couverture fiable, du bureau à l'entrepôt, dedans comme dehors.",
      en: "Reliable coverage from office to warehouse, indoors and out.",
    },
    summary: {
      fr: "Un réseau sans fil conçu à partir d'un relevé de site, pour une couverture stable partout où vos équipes en ont besoin.",
      en: "A wireless network designed from a site survey, for stable coverage everywhere your teams need it.",
    },
    meta: {
      fr: "Installation Wi-Fi d'entreprise : relevé de site, points d'accès, réseau invité, couverture extérieure et d'entrepôt, surveillance.",
      en: "Enterprise Wi-Fi installation: site surveys, access points, guest networks, outdoor and warehouse coverage, monitoring.",
    },
    offers: {
      fr: [
        "Relevé de site et plan de couverture",
        "Points d'accès de niveau entreprise",
        "Réseau invité séparé et sécurisé",
        "Couverture extérieure et d'entrepôt",
        "Surveillance et alertes",
      ],
      en: [
        "Site survey and coverage plan",
        "Enterprise-grade access points",
        "Separate, secure guest network",
        "Outdoor and warehouse coverage",
        "Monitoring and alerts",
      ],
    },
    benefits: {
      fr: [
        { title: "Plus de zones mortes", text: "Les points d'accès sont placés selon des mesures réelles, pas au hasard." },
        { title: "Invités séparés", text: "Vos visiteurs n'ont jamais accès à votre réseau interne." },
        { title: "Problèmes détectés tôt", text: "La surveillance nous alerte avant que vos utilisateurs ne le remarquent." },
      ],
      en: [
        { title: "No more dead zones", text: "Access points are placed from real measurements, not guesswork." },
        { title: "Guests kept separate", text: "Visitors never reach your internal network." },
        { title: "Issues caught early", text: "Monitoring alerts us before your users notice." },
      ],
    },
    useCases: {
      fr: ["Entrepôts et centres de distribution", "Hôtels et commerces", "Écoles et campus", "Bureaux multiétages"],
      en: ["Warehouses and distribution centres", "Hotels and retail", "Schools and campuses", "Multi-floor offices"],
    },
    faq: {
      fr: [
        { q: "Pourquoi faire un relevé de site?", a: "Les murs, les étagères et le métal bloquent le signal. Le relevé mesure la couverture réelle pour placer le bon nombre de points d'accès." },
        { q: "Pouvez-vous couvrir une cour extérieure ou un stationnement?", a: "Oui, avec des points d'accès conçus pour l'extérieur et le froid." },
        { q: "Mon réseau actuel peut-il être conservé?", a: "Souvent, oui. Nous évaluons votre équipement et remplaçons seulement ce qui est nécessaire." },
      ],
      en: [
        { q: "Why do a site survey?", a: "Walls, shelving and metal block the signal. The survey measures real coverage so we install the right number of access points." },
        { q: "Can you cover an outdoor yard or parking lot?", a: "Yes, with access points built for outdoor use and cold weather." },
        { q: "Can I keep my current network?", a: "Often, yes. We assess your equipment and replace only what's needed." },
      ],
    },
    related: ["cabling", "cams", "uc"],
  },
  {
    id: "cabling",
    slug: { fr: "cablage-structure", en: "data-cabling" },
    icon: "cable",
    group: "network",
    name: { fr: "Câblage réseau structuré", en: "Data Cabling" },
    short: {
      fr: "Cat6/Cat6A et fibre optique, testés, certifiés et documentés.",
      en: "Cat6/Cat6A and fibre optic, tested, certified and documented.",
    },
    summary: {
      fr: "Un câblage structuré propre, testé et documenté : la base de votre téléphonie, de votre Wi-Fi et de vos caméras.",
      en: "Clean, tested and documented structured cabling: the foundation for your phones, Wi-Fi and cameras.",
    },
    meta: {
      fr: "Câblage réseau structuré au Québec : Cat6, Cat6A, fibre optique, baies réseau, tests de certification, étiquetage et documentation.",
      en: "Structured data cabling: Cat6, Cat6A, fibre optic, network racks, certification testing, labelling and documentation.",
    },
    offers: {
      fr: [
        "Câblage Cat6 et Cat6A",
        "Fibre optique entre bâtiments et étages",
        "Baies et armoires réseau",
        "Tests et certification de chaque lien",
        "Étiquetage et plans à jour",
      ],
      en: [
        "Cat6 and Cat6A cabling",
        "Fibre optic between buildings and floors",
        "Network racks and cabinets",
        "Testing and certification of every link",
        "Labelling and up-to-date drawings",
      ],
    },
    benefits: {
      fr: [
        { title: "Chaque lien certifié", text: "Vous recevez les résultats de test de chaque câble installé." },
        { title: "Facile à entretenir", text: "Étiquettes et plans permettent de retrouver chaque prise en quelques secondes." },
        { title: "Prêt pour l'avenir", text: "Le Cat6A et la fibre supportent les débits des prochaines années." },
      ],
      en: [
        { title: "Every link certified", text: "You receive test results for every cable installed." },
        { title: "Easy to maintain", text: "Labels and drawings let you find any jack in seconds." },
        { title: "Ready for what's next", text: "Cat6A and fibre support the speeds of the coming years." },
      ],
    },
    useCases: {
      fr: ["Nouveaux bureaux et rénovations", "Salles de serveurs", "Bâtiments publics", "Entrepôts et usines"],
      en: ["New offices and renovations", "Server rooms", "Public buildings", "Warehouses and plants"],
    },
    faq: {
      fr: [
        { q: "Cat6 ou Cat6A?", a: "Le Cat6 suffit pour la plupart des bureaux. Le Cat6A est recommandé pour les points d'accès Wi-Fi récents et les longues distances à haut débit." },
        { q: "Que contient la documentation remise?", a: "Les plans des prises, l'étiquetage de chaque lien et les rapports de test de certification." },
        { q: "Pouvez-vous reprendre un câblage existant désordonné?", a: "Oui. Nous faisons l'inventaire, retirons les câbles inutiles et réorganisons les baies." },
      ],
      en: [
        { q: "Cat6 or Cat6A?", a: "Cat6 is enough for most offices. Cat6A is recommended for newer Wi-Fi access points and long high-speed runs." },
        { q: "What documentation do I receive?", a: "Jack location drawings, labelling for every link and certification test reports." },
        { q: "Can you clean up messy existing cabling?", a: "Yes. We inventory it, remove dead cables and reorganize the racks." },
      ],
    },
    related: ["wifi", "cams", "access"],
  },
  {
    id: "cams",
    slug: { fr: "cameras-de-securite", en: "security-cameras" },
    icon: "camera",
    group: "security",
    name: { fr: "Caméras de sécurité", en: "Security Cameras" },
    short: {
      fr: "Caméras IP et enregistreurs, visibles à distance sur votre téléphone.",
      en: "IP cameras and recorders you can view remotely on your phone.",
    },
    summary: {
      fr: "Des caméras IP haute définition et des enregistreurs fiables, que vous consultez à distance sur votre téléphone, pour un ou plusieurs sites.",
      en: "High-definition IP cameras and reliable recorders you can view remotely on your phone, for one site or many.",
    },
    meta: {
      fr: "Caméras de sécurité commerciales : caméras IP, enregistreurs, visionnement à distance sur téléphone, analytique vidéo et systèmes multisites.",
      en: "Commercial security cameras: IP cameras, recorders, remote viewing on your phone, video analytics and multi-site systems.",
    },
    offers: {
      fr: [
        "Caméras IP intérieures et extérieures",
        "Enregistreurs et stockage",
        "Visionnement à distance sur téléphone",
        "Analytique vidéo (lignes, intrusions, plaques)",
        "Systèmes multisites centralisés",
        "Entretien et remplacement",
      ],
      en: [
        "Indoor and outdoor IP cameras",
        "Recorders and storage",
        "Remote viewing on your phone",
        "Video analytics (line crossing, intrusion, plates)",
        "Centralized multi-site systems",
        "Maintenance and replacement",
      ],
    },
    benefits: {
      fr: [
        { title: "Voir ce qui se passe, partout", text: "Toutes vos caméras dans une seule application." },
        { title: "Trouver vite une séquence", text: "L'analytique repère les événements sans visionner des heures d'images." },
        { title: "Lié à vos portes", text: "Intégration avec le contrôle d'accès pour associer images et entrées." },
      ],
      en: [
        { title: "See what's happening, anywhere", text: "All your cameras in one app." },
        { title: "Find footage fast", text: "Analytics flag events so you don't scroll through hours of video." },
        { title: "Linked to your doors", text: "Integration with access control ties video to door events." },
      ],
    },
    useCases: {
      fr: ["Commerces et entrepôts", "Bâtiments municipaux", "Écoles", "Chantiers et cours extérieures"],
      en: ["Retail and warehouses", "Municipal buildings", "Schools", "Job sites and outdoor yards"],
    },
    faq: {
      fr: [
        { q: "Combien de temps les images sont-elles conservées?", a: "Cela dépend du nombre de caméras et du stockage choisi. Nous dimensionnons l'enregistreur selon la durée dont vous avez besoin." },
        { q: "Les caméras fonctionnent-elles par grand froid?", a: "Oui, nous installons des caméras extérieures conçues pour les hivers du Québec et du nord de l'Ontario." },
        { q: "Puis-je donner l'accès à plusieurs personnes?", a: "Oui, chaque utilisateur peut avoir ses propres droits d'accès." },
      ],
      en: [
        { q: "How long is footage kept?", a: "It depends on the number of cameras and storage chosen. We size the recorder for the retention period you need." },
        { q: "Do the cameras work in extreme cold?", a: "Yes, we install outdoor cameras built for Quebec and Northern Ontario winters." },
        { q: "Can several people have access?", a: "Yes, each user can have their own access rights." },
      ],
    },
    related: ["access", "cabling", "wifi"],
  },
  {
    id: "access",
    slug: { fr: "controle-d-acces", en: "access-control" },
    icon: "lock",
    group: "security",
    name: { fr: "Contrôle d'accès", en: "Access Control" },
    short: {
      fr: "Cartes, porte-clés et identifiants mobiles, liés à vos caméras.",
      en: "Card, fob and mobile credentials, linked to your cameras.",
    },
    summary: {
      fr: "Décidez qui entre, où et quand, avec des cartes, des porte-clés ou un téléphone, et gardez une trace de chaque accès.",
      en: "Decide who goes where and when, with cards, fobs or a phone, and keep a record of every entry.",
    },
    meta: {
      fr: "Installation de contrôle d'accès : cartes, porte-clés, identifiants mobiles, quincaillerie de porte, interphones, intégration caméras et gestion des visiteurs.",
      en: "Access control installer: cards, fobs, mobile credentials, door hardware, intercoms, camera integration and visitor management.",
    },
    offers: {
      fr: [
        "Cartes, porte-clés et identifiants mobiles",
        "Quincaillerie de porte et serrures électriques",
        "Interphones audio et vidéo",
        "Intégration avec les caméras",
        "Gestion des visiteurs",
      ],
      en: [
        "Card, fob and mobile credentials",
        "Door hardware and electric locks",
        "Audio and video intercoms",
        "Integration with cameras",
        "Visitor management",
      ],
    },
    benefits: {
      fr: [
        { title: "Fini les clés perdues", text: "Une carte perdue se désactive en quelques secondes." },
        { title: "Accès selon l'horaire", text: "Chaque personne entre seulement là où et quand elle en a besoin." },
        { title: "Historique complet", text: "Chaque entrée est enregistrée, avec l'image de la caméra associée." },
      ],
      en: [
        { title: "No more lost keys", text: "A lost card is disabled in seconds." },
        { title: "Access by schedule", text: "Each person gets in only where and when they need to." },
        { title: "Full history", text: "Every entry is logged, with the matching camera image." },
      ],
    },
    useCases: {
      fr: ["Édifices gouvernementaux", "Établissements de santé", "Bureaux multilocataires", "Salles de serveurs et entrepôts"],
      en: ["Government buildings", "Healthcare facilities", "Multi-tenant offices", "Server rooms and warehouses"],
    },
    faq: {
      fr: [
        { q: "Peut-on ouvrir les portes avec un téléphone?", a: "Oui, avec des identifiants mobiles, en plus ou à la place des cartes." },
        { q: "Que se passe-t-il en cas de panne de courant?", a: "Les systèmes sont prévus avec une alimentation de secours et un comportement de porte défini selon les règles de sécurité incendie." },
        { q: "Pouvez-vous ajouter des portes plus tard?", a: "Oui, le système est conçu pour évoluer avec votre bâtiment." },
      ],
      en: [
        { q: "Can doors be opened with a phone?", a: "Yes, with mobile credentials, alongside or instead of cards." },
        { q: "What happens in a power outage?", a: "Systems include backup power and a defined door behaviour that follows fire safety rules." },
        { q: "Can you add doors later?", a: "Yes, the system is designed to grow with your building." },
      ],
    },
    related: ["cams", "cabling", "uc"],
  },
  {
    id: "sat",
    slug: { fr: "appareils-satellites", en: "satellite-devices" },
    icon: "sat",
    group: "network",
    name: { fr: "Appareils satellites", en: "Satellite Devices" },
    short: {
      fr: "Téléphones, internet et messagers satellites pour sites éloignés.",
      en: "Satellite phones, internet and messengers for remote sites.",
    },
    summary: {
      fr: "Restez joignable hors réseau : téléphones, internet et messagers satellites pour les sites éloignés et les travailleurs isolés.",
      en: "Stay reachable off the grid: satellite phones, internet and messengers for remote sites and lone workers.",
    },
    meta: {
      fr: "Appareils satellites pour sites éloignés : téléphones satellites, internet satellite, messagers et solutions pour travailleurs isolés.",
      en: "Satellite devices for remote sites: satellite phones, satellite internet, messengers and lone worker solutions.",
    },
    offers: {
      fr: [
        "Téléphones satellites",
        "Internet satellite pour camps et chantiers",
        "Messagers et balises pour travailleurs isolés",
        "Configuration et formation",
        "Location et forfaits",
      ],
      en: [
        "Satellite phones",
        "Satellite internet for camps and job sites",
        "Messengers and beacons for lone workers",
        "Setup and training",
        "Rentals and plans",
      ],
    },
    benefits: {
      fr: [
        { title: "Joignable partout", text: "Communication possible même sans aucun réseau cellulaire." },
        { title: "Sécurité des travailleurs isolés", text: "Bouton d'urgence et suivi de position." },
        { title: "Un camp connecté", text: "Internet pour la paperasse, les appels vidéo et le moral des équipes." },
      ],
      en: [
        { title: "Reachable anywhere", text: "Communication even with no cell network at all." },
        { title: "Lone worker safety", text: "SOS button and location tracking." },
        { title: "A connected camp", text: "Internet for paperwork, video calls and crew morale." },
      ],
    },
    useCases: {
      fr: ["Camps miniers et forestiers", "Communautés éloignées", "Équipes d'urgence", "Travailleurs seuls sur le terrain"],
      en: ["Mining and forestry camps", "Remote communities", "Emergency teams", "Lone field workers"],
    },
    faq: {
      fr: [
        { q: "L'internet satellite est-il assez rapide pour la vidéo?", a: "Les services récents en orbite basse permettent les appels vidéo dans la plupart des cas. Nous vous conseillons selon votre site." },
        { q: "Puis-je louer un téléphone satellite pour une saison?", a: "Oui, nous offrons la location à court terme." },
        { q: "Comment fonctionne un messager pour travailleur isolé?", a: "Il envoie la position et des messages courts par satellite, avec un bouton d'urgence relié à un centre de surveillance." },
      ],
      en: [
        { q: "Is satellite internet fast enough for video?", a: "Newer low-orbit services support video calls in most cases. We advise you based on your site." },
        { q: "Can I rent a satellite phone for a season?", a: "Yes, we offer short-term rentals." },
        { q: "How does a lone worker messenger work?", a: "It sends location and short messages by satellite, with an SOS button linked to a monitoring centre." },
      ],
    },
    related: ["radios", "fleet", "wifi"],
  },
  {
    id: "uc",
    slug: { fr: "communications-unifiees", en: "unified-communications" },
    icon: "uc",
    group: "voice",
    name: { fr: "Communications unifiées", en: "Unified Communications" },
    short: {
      fr: "Voix, vidéo, clavardage et conférences sur une seule plateforme.",
      en: "Voice, video, chat and conferencing in one platform.",
    },
    summary: {
      fr: "La voix, la vidéo, le clavardage et les conférences réunis sur une seule plateforme, au bureau comme sur le téléphone.",
      en: "Voice, video, chat and conferencing on one platform, at the office and on your phone.",
    },
    meta: {
      fr: "Communications unifiées : voix, vidéo, clavardage et conférences sur une plateforme, intégration Microsoft Teams et applications mobiles.",
      en: "Unified communications: voice, video, chat and conferencing in one platform, with Microsoft Teams integration and mobile apps.",
    },
    offers: {
      fr: [
        "Plateforme voix, vidéo et clavardage",
        "Intégration avec Microsoft Teams",
        "Applications mobiles et de bureau",
        "Équipement de salles de conférence",
        "Formation des utilisateurs",
      ],
      en: [
        "Voice, video and chat platform",
        "Microsoft Teams integration",
        "Mobile and desktop apps",
        "Conference room equipment",
        "User training",
      ],
    },
    benefits: {
      fr: [
        { title: "Un seul outil", text: "Moins d'applications à gérer pour vos équipes." },
        { title: "Votre numéro vous suit", text: "Répondez aux appels du bureau sur votre cellulaire." },
        { title: "Réunions sans friction", text: "Des salles de conférence qui démarrent en un clic." },
      ],
      en: [
        { title: "One tool", text: "Fewer apps for your teams to manage." },
        { title: "Your number follows you", text: "Take office calls on your cell phone." },
        { title: "Meetings that just work", text: "Conference rooms that start in one click." },
      ],
    },
    useCases: {
      fr: ["Équipes hybrides", "Organisations multisites", "Services à la clientèle", "Administrations publiques"],
      en: ["Hybrid teams", "Multi-site organizations", "Customer service teams", "Public administrations"],
    },
    faq: {
      fr: [
        { q: "Faut-il remplacer nos téléphones actuels?", a: "Pas toujours. Plusieurs postes existants restent compatibles. Nous faisons l'inventaire avant de recommander quoi que ce soit." },
        { q: "Travaillez-vous avec Microsoft Teams?", a: "Oui, nous intégrons la téléphonie à Teams pour appeler des numéros externes directement depuis Teams." },
        { q: "Offrez-vous la formation?", a: "Oui, en français ou en anglais, sur place ou à distance." },
      ],
      en: [
        { q: "Do we need to replace our current phones?", a: "Not always. Many existing phones remain compatible. We inventory them before recommending anything." },
        { q: "Do you work with Microsoft Teams?", a: "Yes, we integrate phone service with Teams so you can call outside numbers directly from Teams." },
        { q: "Do you provide training?", a: "Yes, in French or English, on site or remotely." },
      ],
    },
    related: ["phones", "wifi", "cabling"],
  },
  {
    id: "fleet",
    slug: { fr: "gestion-suivi-de-flotte", en: "fleet-tracking" },
    icon: "fleet",
    group: "fleet",
    name: { fr: "Gestion et suivi de flotte", en: "Fleet Tracking" },
    short: {
      fr: "Suivi GPS des véhicules et de l'équipement sur une carte en direct.",
      en: "GPS tracking for vehicles and equipment on a live map.",
    },
    summary: {
      fr: "Voyez vos véhicules et votre équipement sur une carte en direct, avec des rapports de conduite et des alertes d'entretien.",
      en: "See your vehicles and equipment on a live map, with driver behaviour reports and maintenance alerts.",
    },
    meta: {
      fr: "Gestion et suivi de flotte GPS : véhicules et équipement sur carte en direct, rapports de conduite, alertes d'entretien.",
      en: "GPS fleet tracking for New York, Vermont, Quebec and Ontario: live map of vehicles and equipment, driver reports, maintenance alerts.",
    },
    offers: {
      fr: [
        "Traceurs GPS pour véhicules et équipement",
        "Carte en direct et historique des trajets",
        "Rapports de comportement de conduite",
        "Alertes d'entretien",
        "Installation dans vos véhicules",
      ],
      en: [
        "GPS trackers for vehicles and equipment",
        "Live map and trip history",
        "Driver behaviour reports",
        "Maintenance alerts",
        "Installation in your vehicles",
      ],
    },
    benefits: {
      fr: [
        { title: "Savoir où est chaque véhicule", text: "Répartissez le travail selon la position réelle de vos équipes." },
        { title: "Moins de carburant gaspillé", text: "Les rapports montrent la marche au ralenti et les détours." },
        { title: "Entretien à temps", text: "Des alertes avant que la panne n'arrive." },
      ],
      en: [
        { title: "Know where every vehicle is", text: "Dispatch work based on where your crews actually are." },
        { title: "Less fuel wasted", text: "Reports show idling and detours." },
        { title: "Maintenance on time", text: "Alerts before a breakdown happens." },
      ],
    },
    useCases: {
      fr: ["Transport et livraison", "Entrepreneurs et services techniques", "Municipalités (déneigement, travaux publics)", "Location d'équipement"],
      en: ["Transport and delivery", "Contractors and field services", "Municipalities (snow removal, public works)", "Equipment rental"],
    },
    faq: {
      fr: [
        { q: "Peut-on suivre de l'équipement sans moteur?", a: "Oui, avec des traceurs autonomes à batterie pour remorques, conteneurs et machinerie." },
        { q: "Offrez-vous le support DCE (ELD)?", a: "À confirmer par CRC Telecom selon les solutions offertes." },
        { q: "Les données sont-elles accessibles sur téléphone?", a: "Oui, la carte et les rapports sont accessibles sur le Web et sur application mobile." },
      ],
      en: [
        { q: "Can I track equipment without an engine?", a: "Yes, with self-powered battery trackers for trailers, containers and machinery." },
        { q: "Do you offer ELD support?", a: "To be confirmed by CRC Telecom based on the solutions offered." },
        { q: "Is the data available on a phone?", a: "Yes, the map and reports are available on the web and in a mobile app." },
      ],
    },
    related: ["radios", "sat", "uc"],
  },
];

export const serviceById = (id: string) => SERVICES.find((s) => s.id === id)!;
export const serviceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug.fr === slug || s.slug.en === slug);
