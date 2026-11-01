"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Headphones,
  Package,
  ShieldCheck,
} from "lucide-react";
import type { Product, ProductDetail, ProductImage } from "@/types";
import { categories } from "@/data/categories";
import { useStore } from "@/components/StoreProvider";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "./ProductGallery";
import { ProductPurchase } from "./ProductPurchase";
import { ProductInformation } from "./ProductInformation";
import { ProductReviews } from "./ProductReviews";

export function ProductDetailView({
  product,
  detail,
  images,
  related,
}: {
  product: Product;
  detail: ProductDetail;
  images: ProductImage[];
  related: Product[];
}) {
  const { selectCategory, viewAll } = useStore();
  const category = categories.find((item) => item.id === product.category);
  return (
    <div className="product-page">
      <div className="container">
        <div className="pdp-breadcrumb-row">
          <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} />
            <button onClick={() => selectCategory(product.category)}>
              {category?.name}
            </button>
            <ChevronRight size={13} />
            <span aria-current="page">{product.name}</span>
          </nav>
          <Link className="pdp-back-link" href="/#products">
            <ArrowLeft size={14} />
            Back to shop
          </Link>
        </div>
        <section className="pdp-main" aria-label={product.name}>
          <ProductGallery product={product} images={images} />
          <ProductPurchase product={product} detail={detail} />
        </section>
        <div className="pdp-benefit-strip">
          <span>
            <Package size={21} strokeWidth={1.3} />
            <span>
              <strong>Thoughtfully selected</strong>Good finds, chosen with
              care.
            </span>
          </span>
          <span>
            <ShieldCheck size={21} strokeWidth={1.3} />
            <span>
              <strong>A little peace of mind</strong>A clear, simple shopping
              experience.
            </span>
          </span>
          <span>
            <Headphones size={21} strokeWidth={1.3} />
            <span>
              <strong>Here to help</strong>
              <a href="#contact">Get in touch with our team.</a>
            </span>
          </span>
        </div>
        <ProductInformation detail={detail} />
        <ProductReviews product={product} />
        <section className="pdp-related" aria-labelledby="related-title">
          <div className="section-heading products-heading">
            <div>
              <span className="eyebrow">A few more good finds</span>
              <h2 id="related-title">You might also like</h2>
            </div>
            <button className="text-link" onClick={viewAll}>
              Explore the shop <ArrowRight size={16} />
            </button>
          </div>
          <div className="pdp-related-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
      <div className="pdp-closing">
        <div className="container">
          <span className="eyebrow">
            A little of everything. A lot to love.
          </span>
          <h2>Your next favorite is waiting.</h2>
          <Link href="/#categories">
            Find your collection <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
