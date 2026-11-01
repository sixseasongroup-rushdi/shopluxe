import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const response = await fetch("https://dummyjson.com/products?limit=0");
if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
const { products } = await response.json();
const catalog = {
  watch: 106,
  earbuds: 100,
  perfume: 6,
  sunglasses: 155,
  headphones: 101,
  plant: 46,
  shirt: 86,
  beauty: 2,
};
await mkdir("public/images/products", { recursive: true });
const galleries = {};
const sources = {};
for (const [name, id] of Object.entries(catalog)) {
  const product = products.find((item) => item.id === id);
  const images = product.images.slice(1, 4);
  galleries[name] = await Promise.all(
    images.map(async (url, index) => {
      const image = await fetch(url);
      if (!image.ok)
        throw new Error(`${name} image ${index + 2}: ${image.status}`);
      const file = `/images/products/${name}-${index + 2}.webp`;
      await sharp(Buffer.from(await image.arrayBuffer()))
        .resize({ width: 1000, withoutEnlargement: true })
        .webp({ quality: 88 })
        .toFile(`public${file}`);
      sources[file] = url;
      return {
        src: file,
        alt: `${product.title}, alternate view ${index + 2}`,
        label: `View ${index + 2}`,
      };
    }),
  );
  console.log(`${name}: ${galleries[name].length} alternate photos`);
}
await writeFile(
  "src/data/product-galleries.json",
  JSON.stringify(galleries, null, 2) + "\n",
);
await writeFile(
  "public/images/products/sources.json",
  JSON.stringify(sources, null, 2) + "\n",
);
