export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );
export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isGeneratedPhoto = (image: string) =>
  ["backpack", "moon", "teddy", "dumbbells"].some(
    (name) => image === `/images/${name}.webp`,
  );
