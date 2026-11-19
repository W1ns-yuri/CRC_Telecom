export const SITE = {
  name: "CRC Telecom",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://crc-telecom.ca").replace(/\/$/, ""),
  email: "office@crc-telecom.ca",
  phone: "647-367-1022",
  phoneHref: "tel:+16473671022",
  phoneE164: "+1-647-367-1022",
  address: {
    street: "5590 av Royalmount",
    city: "Mont-Royal",
    region: "QC",
    postal: "H4P 1H7",
    country: "CA",
    full: "5590 av Royalmount, Mont-Royal, QC H4P 1H7",
  },
  geo: { lat: 45.4985, lng: -73.6539 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=5590+av+Royalmount+Mont-Royal+QC+H4P+1H7",
  mapsEmbed: "https://www.google.com/maps?q=5590+av+Royalmount,+Mont-Royal,+QC+H4P+1H7&output=embed",
  // CRC Telecom ещё не прислали — оставляем null, UI показывает «à confirmer»
  hours: null as null | string,
  social: { linkedin: null as null | string, facebook: null as null | string },
};
