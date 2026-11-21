import fs from "node:fs";
import { createRequire } from "node:module";
import * as topo from "topojson-client";
import { presimplify, simplify } from "topojson-simplify";
import { geoConicConformal, geoPath, geoGraticule } from "d3-geo";
const require = createRequire(import.meta.url);
const t0 = require("sane-topojson/dist/north-america_50m.json");
const t = simplify(presimplify(t0), 0.0015);
const W = 1000, H = 820;
const subs = topo.feature(t, t.objects.subunits).features;
const lakes = topo.feature(t, t.objects.lakes);
const ocean = topo.feature(t, t.objects.ocean);
const land = topo.feature(t, t.objects.land);
// рамка интереса: от Кеноры до Лабрадора, от Нью-Йорка до Унгавы
const frame = { type: "MultiPoint", coordinates: [[-95.5, 49.5], [-57, 51], [-74, 40.4], [-71, 62.6], [-89, 56.9], [-80, 41]] };
const proj = geoConicConformal().parallels([44, 56]).rotate([77, 0]).fitExtent([[24, 24], [W - 24, H - 24]], frame);
proj.clipExtent([[-5, -5], [W + 5, H + 5]]);
const path = geoPath(proj);
const r = (s) => s ? s.replace(/\d+\.\d+/g, (m) => String(Math.round(+m))) : "";
const HL = { QC: "qc", ON: "on", NY: "ny", VT: "vt" };
const context = subs.filter((f) => !HL[f.id]).map((f) => r(path(f))).filter((d) => d && d.length > 4);
const regions = Object.fromEntries(subs.filter((f) => HL[f.id]).map((f) => [HL[f.id], r(path(f))]));
// Северо-запад Онтарио: западнее ~85.3° з.д. (граница районов Thunder Bay / Algoma), маска-многоугольник
const ring = []; for (let la = 46; la <= 57.5; la += 0.25) ring.push([-85.3, la]); ring.push([-100, 57.5], [-100, 46], [-85.3, 46]);
const nwMask = r(path({ type: "Polygon", coordinates: [ring.reverse()] }));
const border = r(path(topo.mesh(t, t.objects.subunits, (a, b) => a.properties.gu !== b.properties.gu)));
const lakesD = r(path(lakes)) + r(path(ocean));
const pt = (lon, lat) => proj([lon, lat]).map((v) => Math.round(v * 10) / 10);
const out = { W, H, context, regions, nwMask, border, lakes: lakesD,
  cities: { hq: pt(-73.65, 45.5), thunderBay: pt(-89.25, 48.38), kenora: pt(-94.49, 49.77) },
  labels: { qc: pt(-72.8, 52.8), on: pt(-89.6, 52.6), ny: pt(-75.3, 43.15), vt: pt(-72.7, 44.15), vtLabel: pt(-70.4, 43.2) } };
const src = `// Сгенерировано из Natural Earth (через sane-topojson, MIT), проекция Ламберта. Не редактировать руками.\n// Скрипт генерации: docs/map/gen.mjs\nexport const MAP = ${JSON.stringify(out)} as const;\n`;
fs.writeFileSync(process.argv[2], src);
console.log("bytes", src.length, out.cities, out.labels);
