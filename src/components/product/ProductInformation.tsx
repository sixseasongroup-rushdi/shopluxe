"use client";

import { useRef, useState } from "react";
import { Check, PackageCheck, RotateCcw, Truck } from "lucide-react";
import type { ProductDetail } from "@/types";

const tabs = ["Description", "Specifications", "Delivery & returns"];
export function ProductInformation({ detail }: { detail: ProductDetail }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <section className="pdp-information" aria-label="Product information">
      <div
        className="pdp-tabs"
        role="tablist"
        aria-label="Product information tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab}
            id={`product-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls={`product-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
              else if (event.key === "ArrowLeft")
                next = (index + tabs.length - 1) % tabs.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = tabs.length - 1;
              else return;
              event.preventDefault();
              setActive(next);
              buttons.current[next]?.focus();
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabs.map((_, index) => (
        <div
          key={index}
          className="pdp-tab-panel"
          role="tabpanel"
          id={`product-panel-${index}`}
          aria-labelledby={`product-tab-${index}`}
          hidden={active !== index}
          tabIndex={0}
        >
          {index === 0 ? (
            <div className="pdp-description-grid">
              <div>
                <span className="eyebrow">
                  Everyday, thoughtfully considered
                </span>
                <h2>Good design. Great company.</h2>
                <p>{detail.story}</p>
                <p className="pdp-care">
                  <strong>A little care goes a long way.</strong> {detail.care}
                </p>
              </div>
              <div className="pdp-highlights">
                <h3>What makes it a good find</h3>
                <ul>
                  {detail.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Check size={17} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : index === 1 ? (
            <div className="pdp-specs">
              <h2>The details, at a glance.</h2>
              <dl>
                {detail.specifications.map((spec) => (
                  <div key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
                <div>
                  <dt>Care</dt>
                  <dd>{detail.care}</dd>
                </div>
              </dl>
              <p className="pdp-demo-note">
                Illustrative specifications for this storefront demo. Confirm
                final specifications with the seller before purchasing.
              </p>
            </div>
          ) : (
            <div className="pdp-shipping-grid">
              <article>
                <Truck size={27} strokeWidth={1.3} />
                <h3>Simple delivery</h3>
                <p>
                  Standard shipping is free on orders over $50. Smaller orders
                  have a $5.99 delivery fee, shown in your shopping bag.
                </p>
              </article>
              <article>
                <RotateCcw size={27} strokeWidth={1.3} />
                <h3>Shop with confidence</h3>
                <p>
                  The live store would confirm the return window, eligibility,
                  and refund timeline before you place an order.
                </p>
              </article>
              <article>
                <PackageCheck size={27} strokeWidth={1.3} />
                <h3>A preview, just for you</h3>
                <p>
                  This demo does not dispatch orders or process returns. Explore
                  your bag and checkout summary with no payment required.
                </p>
              </article>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
