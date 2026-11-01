"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { Product, ProductImage } from "@/types";
import { isGeneratedPhoto } from "@/lib/utils";

export function ProductGallery({
  product,
  images,
}: {
  product: Product;
  images: ProductImage[];
}) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = images[active];
  const move = (direction: number) =>
    setActive((index) => (index + direction + images.length) % images.length);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!expanded) {
      dialog?.close();
      return;
    }
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded]);
  const pictureStyle = { transform: `scale(${current.zoom ?? 1})` };
  return (
    <div className="pdp-gallery">
      <div className="pdp-gallery-stage">
        <div className="pdp-thumbnails" aria-label="Product photographs">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              aria-label={`Show ${image.label.toLowerCase()}`}
              aria-pressed={active === index}
              className={`pdp-thumbnail ${active === index ? "selected" : ""} ${isGeneratedPhoto(image.src) ? "catalog-photo" : ""}`}
              onClick={() => setActive(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="80px"
                style={{ transform: `scale(${image.zoom ?? 1})` }}
              />
            </button>
          ))}
        </div>
        <div
          className={`pdp-main-image ${isGeneratedPhoto(current.src) ? "catalog-photo" : ""} ${current.src.includes("hero") ? "lifestyle-photo" : ""}`}
        >
          <span className="pdp-photo-badge">The everyday edit</span>
          <button
            className="pdp-expand"
            onClick={() => setExpanded(true)}
            aria-label={`Enlarge ${product.name} image`}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 55vw, 620px"
              preload={active === 0}
              style={pictureStyle}
            />
            <span className="pdp-expand-icon">
              <Expand size={19} />
            </span>
          </button>
          <span className="pdp-image-counter" aria-live="polite">
            {String(active + 1).padStart(2, "0")}{" "}
            <span>/ {String(images.length).padStart(2, "0")}</span>
          </span>
          <div className="pdp-gallery-arrows">
            <button
              aria-label="Previous product photo"
              onClick={() => move(-1)}
            >
              <ArrowLeft size={17} />
            </button>
            <button aria-label="Next product photo" onClick={() => move(1)}>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
      <p className="pdp-image-caption">
        Thoughtfully chosen. Made for your everyday.
      </p>
      <dialog
        className="product-lightbox"
        ref={dialogRef}
        aria-label={`${product.name} enlarged photographs`}
        onCancel={() => setExpanded(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move(1);
          if (event.key === "ArrowLeft") move(-1);
        }}
      >
        <div className="lightbox-header">
          <span>{product.name}</span>
          <button
            className="icon-button"
            aria-label="Close enlarged photo"
            onClick={() => setExpanded(false)}
          >
            <X />
          </button>
        </div>
        <div
          className={`lightbox-image ${isGeneratedPhoto(current.src) ? "catalog-photo" : ""}`}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="90vw"
            style={pictureStyle}
          />
        </div>
        <div className="lightbox-controls">
          <button aria-label="Previous enlarged photo" onClick={() => move(-1)}>
            <ArrowLeft size={20} />
          </button>
          <span>
            {current.label} · {active + 1} of {images.length}
          </span>
          <button aria-label="Next enlarged photo" onClick={() => move(1)}>
            <ArrowRight size={20} />
          </button>
        </div>
      </dialog>
    </div>
  );
}
