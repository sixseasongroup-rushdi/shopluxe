"use client";

import { ArrowRight, X } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "./ProductCard";
import { useStore } from "./StoreProvider";

export function TrendingProducts() {
  const { category, showAll, viewAll, offersOnly } = useStore();
  const visible = products
    .filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!offersOnly || p.oldPrice),
    )
    .slice(0, showAll ? undefined : 5);
  const title = offersOnly
    ? "The good-find edit"
    : category !== "all"
      ? `${categories.find((c) => c.id === category)?.name} collection`
      : showAll
        ? "All products"
        : "Trending products";
  return (
    <section id="products" className="container products-section">
      <div className="section-heading products-heading">
        <div>
          <span className="eyebrow">Discover your next favorite</span>
          <h2>{title}</h2>
        </div>
        <button className="text-link" onClick={viewAll}>
          {category !== "all" || offersOnly ? (
            <>
              Clear filter <X size={14} />
            </>
          ) : (
            <>
              View all products <ArrowRight size={15} />
            </>
          )}
        </button>
      </div>
      <div className="products-grid">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
