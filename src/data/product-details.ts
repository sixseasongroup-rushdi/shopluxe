import type { Product, ProductDetail, ProductImage } from "@/types";
import galleries from "./product-galleries.json";

export const productDetails: Record<string, ProductDetail> = {
  watch: {
    subtitle: "A smarter way to move through your day.",
    story:
      "From your first coffee to your evening walk, keep the things that matter close. A clean, easy-to-read display and a softly finished strap make this watch an effortless part of your everyday routine.",
    highlights: [
      "Clear, full-color touch display",
      "Comfortable, adjustable everyday strap",
      "A lightweight design for work and weekends",
      "Charging cable included",
    ],
    specifications: [
      { label: "Collection", value: "Everyday tech" },
      { label: "Display", value: "Color touchscreen" },
      { label: "Strap", value: "Adjustable sport strap" },
      {
        label: "In the box",
        value: "Watch, strap, charging cable, quick-start guide",
      },
    ],
    option: { label: "Case size", values: ["41 mm", "45 mm"] },
    color: { name: "Champagne", hex: "#c6b49d" },
    care: "Wipe with a soft, dry cloth. Keep the charging contacts clean and dry. Refer to the supplied guide before exposing the watch to water.",
  },
  backpack: {
    subtitle: "Pack a little. Go a little further.",
    story:
      "Made for the days that turn into adventures. A spacious main compartment, handy front pockets, and warm leather-style details bring practical organization and timeless character to your daily carry.",
    highlights: [
      "Roomy main compartment for everyday essentials",
      "Easy-access front pockets",
      "Adjustable shoulder straps",
      "Durable canvas with leather-style detailing",
    ],
    specifications: [
      { label: "Collection", value: "The everyday carry edit" },
      { label: "Material", value: "Canvas with leather-style trim" },
      { label: "Closure", value: "Buckle flap" },
      { label: "In the box", value: "One travel backpack" },
    ],
    option: { label: "Size", values: ["One size"] },
    color: { name: "Sand", hex: "#b5a18a" },
    care: "Spot clean with a damp cloth and mild soap. Air dry naturally. Avoid machine washing to preserve the shape and trim.",
  },
  earbuds: {
    subtitle: "Your soundtrack. Wherever life takes you.",
    story:
      "Find a little room for your favorite music. These lightweight earbuds tuck into a compact charging case, ready for your morning commute, afternoon focus time, or an unhurried walk home.",
    highlights: [
      "Compact wireless design",
      "Pocket-friendly charging case",
      "Lightweight fit for everyday listening",
      "Simple touch controls",
    ],
    specifications: [
      { label: "Collection", value: "Everyday audio" },
      { label: "Style", value: "In-ear wireless" },
      { label: "Connection", value: "Bluetooth" },
      { label: "In the box", value: "Pair of earbuds and charging case" },
    ],
    option: { label: "Style", values: ["With charging case"] },
    color: { name: "White", hex: "#f4f3ef" },
    care: "Clean with a soft, dry cloth. Keep the earbuds and charging case away from liquids and let them dry completely before charging.",
  },
  perfume: {
    subtitle: "The finishing touch to your everyday.",
    story:
      "A quiet statement that stays with you. This versatile fragrance brings a fresh opening and a warm, understated finish to your daily routine, in a bottle that looks just as considered on your shelf.",
    highlights: [
      "Fresh, balanced fragrance profile",
      "Versatile for day or evening",
      "Refill-free spray bottle",
      "A thoughtful everyday gift",
    ],
    specifications: [
      { label: "Collection", value: "The fragrance edit" },
      { label: "Format", value: "Spray" },
      { label: "Profile", value: "Fresh and warm" },
      { label: "In the box", value: "One fragrance bottle" },
    ],
    option: { label: "Size", values: ["100 ml"] },
    color: { name: "Frosted glass", hex: "#dbdcd5" },
    care: "Store upright in a cool, dry place, away from direct sunlight. Avoid contact with eyes and follow the label instructions.",
  },
  moon: {
    subtitle: "A little wonder for your favorite corner.",
    story:
      "Turn an ordinary evening into a softer one. A delicately textured lunar surface and a warm glow create a calming accent for your bedside or reading nook, balanced on a simple natural wood stand.",
    highlights: [
      "Detailed lunar texture",
      "Soft, warm ambient glow",
      "Natural wood display stand",
      "A compact accent for shelves and bedside tables",
    ],
    specifications: [
      { label: "Collection", value: "Calm spaces" },
      { label: "Light", value: "Warm ambient light" },
      { label: "Stand", value: "Natural wood" },
      { label: "In the box", value: "Moon lamp, wooden stand, power cable" },
    ],
    option: { label: "Style", values: ["With wooden stand"] },
    color: { name: "Warm white", hex: "#eedcb1" },
    care: "Dust gently with a dry cloth. Keep away from water and unplug before cleaning. Designed for indoor use.",
  },
  sunglasses: {
    subtitle: "A timeless finishing touch.",
    story:
      "An easygoing silhouette with a polished finish. Slip them into your bag and bring a little extra style to the everyday.",
    highlights: [
      "Classic rounded silhouette",
      "Lightweight frame",
      "Comfortable nose bridge",
      "Easy to pair with your everyday wardrobe",
    ],
    specifications: [
      { label: "Collection", value: "Everyday accessories" },
      { label: "Style", value: "Rounded frame" },
      { label: "Fit", value: "Regular" },
      { label: "In the box", value: "One pair of sunglasses" },
    ],
    option: { label: "Fit", values: ["Regular"] },
    color: { name: "Smoke", hex: "#576568" },
    care: "Clean with a microfiber cloth. Store in a protective case and avoid placing the lenses face down.",
  },
  headphones: {
    subtitle: "Make a little space for your sound.",
    story:
      "Comfortable listening, with a clean and considered design. Cushioned ear cups and an adjustable headband make these an easy companion for working, traveling, and winding down.",
    highlights: [
      "Cushioned over-ear design",
      "Adjustable headband",
      "Wireless listening",
      "Minimal silver finish",
    ],
    specifications: [
      { label: "Collection", value: "Everyday audio" },
      { label: "Style", value: "Over-ear" },
      { label: "Connection", value: "Bluetooth" },
      { label: "In the box", value: "Headphones and charging cable" },
    ],
    option: { label: "Style", values: ["Over-ear"] },
    color: { name: "Silver", hex: "#c5c9c7" },
    care: "Wipe the exterior with a soft cloth. Keep the ear cushions dry and store in a protective case when traveling.",
  },
  plant: {
    subtitle: "A fresh perspective for your space.",
    story:
      "A small green accent can change the feel of a room. This compact decorative plant brings texture and a little calm to your desk, shelf, or windowsill.",
    highlights: [
      "Compact decorative plant",
      "Neutral planter included",
      "Ready to display",
      "A fresh accent for small spaces",
    ],
    specifications: [
      { label: "Collection", value: "Calm spaces" },
      { label: "Style", value: "Decorative greenery" },
      { label: "Planter", value: "Included" },
      { label: "In the box", value: "One decorative plant with pot" },
    ],
    option: { label: "Style", values: ["Plant with pot"] },
    color: { name: "Charcoal pot", hex: "#51544c" },
    care: "Dust the leaves with a soft cloth and wipe the pot clean. Follow the included care instructions for your plant.",
  },
  shirt: {
    subtitle: "Easy style, from weekday to weekend.",
    story:
      "A relaxed everyday shirt with enough character to stand on its own. Wear it open over a tee or button it up for an effortless, put-together look.",
    highlights: [
      "Relaxed everyday fit",
      "Button-front closure",
      "Easy short sleeves",
      "Versatile blue print",
    ],
    specifications: [
      { label: "Collection", value: "Everyday wardrobe" },
      { label: "Fit", value: "Relaxed" },
      { label: "Sleeve", value: "Short sleeve" },
      { label: "In the box", value: "One shirt" },
    ],
    option: { label: "Size", values: ["S", "M", "L", "XL"] },
    color: { name: "Ocean blue", hex: "#557a99" },
    care: "Wash with similar colors on a gentle cycle. Air dry and iron on a low setting. Check the garment label before washing.",
  },
  beauty: {
    subtitle: "Your everyday color story.",
    story:
      "A thoughtful selection of wearable shades in a compact palette. Keep your daily routine simple, or explore a different combination when the mood takes you.",
    highlights: [
      "A selection of wearable shades",
      "Compact palette with mirror",
      "Easy to keep in your daily bag",
      "A mix of everyday and statement tones",
    ],
    specifications: [
      { label: "Collection", value: "Daily beauty" },
      { label: "Format", value: "Pressed powder palette" },
      { label: "Mirror", value: "Included" },
      { label: "In the box", value: "One beauty palette" },
    ],
    option: { label: "Palette", values: ["Everyday edit"] },
    color: { name: "Warm neutrals", hex: "#b88d7b" },
    care: "Keep closed in a cool, dry place. Use clean brushes and follow the product label for safe application and expiry information.",
  },
  weights: {
    subtitle: "A little movement, every day.",
    story:
      "Make room for a simple home routine. These compact dumbbells are easy to store and ready when you are, with a comfortable grip and a stable hexagonal shape.",
    highlights: [
      "Pair of hexagonal dumbbells",
      "Comfortable metal grip",
      "Flat-sided design for stable storage",
      "Compact enough for a home workout corner",
    ],
    specifications: [
      { label: "Collection", value: "Everyday movement" },
      { label: "Set", value: "Two dumbbells" },
      { label: "Shape", value: "Hexagonal" },
      { label: "Finish", value: "Rubber-style coating and metal handle" },
    ],
    option: { label: "Set", values: ["Pair"] },
    color: { name: "Charcoal", hex: "#4b4d4d" },
    care: "Wipe down after use and store on a stable surface. Check the equipment before each workout and use a weight appropriate to your routine.",
  },
  teddy: {
    subtitle: "A little friend for big adventures.",
    story:
      "Soft, familiar, and always ready for a cuddle. This classic teddy brings a warm touch to a room and makes a thoughtful little gift.",
    highlights: [
      "Classic sitting teddy design",
      "Soft textured plush",
      "Warm, neutral color",
      "A sweet gift or decorative companion",
    ],
    specifications: [
      { label: "Collection", value: "Little companions" },
      { label: "Style", value: "Sitting teddy" },
      { label: "Material", value: "Soft plush" },
      { label: "In the box", value: "One teddy bear" },
    ],
    option: { label: "Size", values: ["Classic"] },
    color: { name: "Honey", hex: "#bb9366" },
    care: "Spot clean and air dry. Check the product label for age suitability and care instructions before gifting to a child.",
  },
};

export function getProductGallery(product: Product): ProductImage[] {
  const alternate =
    (galleries as Record<string, ProductImage[]>)[product.id] ?? [];
  const images: ProductImage[] = [
    { src: product.image, alt: product.name, label: "Front view" },
    ...alternate,
  ];
  if (!alternate.length)
    images.push({
      src: product.image,
      alt: `${product.name}, texture detail`,
      label: "Details",
      zoom: 1.6,
    });
  if (product.id === "backpack")
    images.push({
      src: "/images/hero.webp",
      alt: "Travel backpack styled with everyday essentials",
      label: "In everyday life",
    });
  return images;
}
export function getDefaultVariant(productId: string) {
  const option = productDetails[productId]?.option;
  return option ? `${option.label}: ${option.values[0]}` : undefined;
}
export function isValidVariant(productId: string, variant: string) {
  const option = productDetails[productId]?.option;
  return !!option?.values.some(
    (value) => `${option.label}: ${value}` === variant,
  );
}
