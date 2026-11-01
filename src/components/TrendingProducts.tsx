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
    ? "THE GOOD-FIND EDIT"
    : category !== "all"
      ? `${categories.find((c) => c.id === category)?.name.toUpperCase()} COLLECTION`
      : showAll
        ? "ALL PRODUCTS"
        : "TRENDING PRODUCTS";
  return (
    <section id="products" className="container products-section">
      <div className="section-heading products-heading">
        <div>
          <span className="eyebrow">DISCOVER YOUR NEXT FAVORITE</span>
          <h2>{title}</h2>
        </div>
        <button className="text-link" onClick={viewAll}>
          {category !== "all" || offersOnly ? (
            <>
              CLEAR FILTER <X size={14} />
            </>
          ) : (
            <>
              VIEW ALL PRODUCTS <ArrowRight size={15} />
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
