"use client";

import { ArrowRight, Gift, Percent, ShoppingBag } from "lucide-react";
import { useStore } from "./StoreProvider";

export function PromoBanners() {
  const { viewAll, showOffers } = useStore();
  return (
    <section
      className="container promo-grid"
      aria-label="Shopping perks and offers"
    >
      <article className="promo-card promo-navy">
        <div>
          <h3>Free shipping</h3>
          <p>On orders over $50</p>
          <button onClick={viewAll}>
            Shop Now <ArrowRight size={14} />
          </button>
        </div>
        <ShoppingBag className="promo-icon" strokeWidth={1.1} />
      </article>
      <article className="promo-card promo-beige">
        <div>
          <h3>Special offer</h3>
          <p>Save up to 50% off</p>
          <button onClick={showOffers}>
            Grab the Deal <ArrowRight size={14} />
          </button>
        </div>
        <Percent className="promo-icon" strokeWidth={1.1} />
      </article>
      <article className="promo-card promo-gray">
        <div>
          <h3>Member benefits</h3>
          <p>Join now & get exclusive deals</p>
          <a href="#newsletter">
            Join Free <ArrowRight size={14} />
          </a>
        </div>
        <Gift className="promo-icon" strokeWidth={1.1} />
      </article>
    </section>
  );
}
