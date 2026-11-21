# Coverage map data

`src/content/map-geo.ts` is generated, do not edit it by hand.

Source: Natural Earth 1:50m admin-1 boundaries (public domain), via the `sane-topojson` npm package (MIT).
Projection: Lambert conformal conic, simplified with `topojson-simplify`, coordinates rounded to whole pixels.

To regenerate (e.g. to move a label):

```bash
mkdir /tmp/geo && cd /tmp/geo && npm init -y && npm i sane-topojson topojson-client topojson-simplify d3-geo
cp <repo>/docs/map/gen.mjs . && node gen.mjs <repo>/src/content/map-geo.ts
```
