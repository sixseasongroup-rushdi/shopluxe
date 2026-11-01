"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { useStore } from "./StoreProvider";
import { isGeneratedPhoto } from "@/lib/utils";

export function CategorySection() {
  const { category, selectCategory } = useStore();
  return (
    <section id="categories" className="container category-section">
      <div className="section-heading centered">
        <span className="eyebrow">A WORLD OF POSSIBILITIES</span>
        <h2>BROWSE BY CATEGORY</h2>
        <span className="heading-rule" />
      </div>
      <div className="category-grid">
        {categories.map((item) => (
          <button
            className={`category-card ${category === item.id ? "category-selected" : ""}`}
            key={item.id}
            onClick={() => selectCategory(item.id)}
            aria-pressed={category === item.id}
          >
            <div
              className={`category-image ${isGeneratedPhoto(item.image) ? "catalog-photo" : ""}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 767px) 40vw, 150px"
              />
            </div>
            <span>
              {item.name}
              <ArrowUpRight size={14} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
