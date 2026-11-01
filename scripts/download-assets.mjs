import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Run from the repository root. Download once; the site serves every asset locally.
await mkdir("public/images", { recursive: true });
await mkdir("public/fonts", { recursive: true });
const catalogResponse = await fetch("https://dummyjson.com/products?limit=0");
if (!catalogResponse.ok)
  throw new Error(`Catalog request failed: ${catalogResponse.status}`);
const { products } = await catalogResponse.json();
const catalog = {
  watch: 106,
  earbuds: 100,
  perfume: 6,
  sunglasses: 155,
  headphones: 101,
  plant: 46,
  fashion: 86,
  beauty: 2,
};
const sources = Object.fromEntries(
  Object.entries(catalog).map(([name, id]) => [
    name,
    products.find((product) => product.id === id).images[0],
  ]),
);
sources["avatar-1"] =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80";
sources["avatar-2"] =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80";
sources["avatar-3"] =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80";
sources["avatar-4"] =
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&h=100&q=80";
const results = await Promise.allSettled(
  Object.entries(sources).map(async ([name, url]) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${name}: ${response.status}`);
    const data = Buffer.from(await response.arrayBuffer());
    await sharp(data)
      .resize({
        width: name.startsWith("avatar") ? 100 : 640,
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toFile(`public/images/${name}.webp`);
    console.log(`Downloaded ${name}`);
  }),
);
const failures = results.filter((result) => result.status === "rejected");
for (const failure of failures) console.error(failure.reason.message);
await writeFile(
  "public/images/sources.json",
  JSON.stringify(sources, null, 2) + "\n",
);
const cssResponse = await fetch(
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    },
  },
);
if (!cssResponse.ok) throw new Error("Could not fetch font stylesheet");
const css = await cssResponse.text();
const fontUrl = [...css.matchAll(/url\((https:[^)]+)\)/g)].at(-1)?.[1];
if (!fontUrl) throw new Error("Could not identify Inter font URL");
const fontResponse = await fetch(fontUrl);
if (!fontResponse.ok) throw new Error("Could not download Inter font");
await writeFile(
  "public/fonts/inter-latin.woff2",
  Buffer.from(await fontResponse.arrayBuffer()),
);
console.log("Downloaded self-hosted Inter font");
if (failures.length) process.exitCode = 1;
