"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useStore } from "./StoreProvider";

const slides = [
  {
    eyebrow: "WELCOME TO SHOPLUXE",
    heading: (
      <>
        EVERYTHING.
        <br />
        FOR EVERYONE.
      </>
    ),
    tagline: "Best Quality, Best Prices!",
    description:
      "Discover a wide range of top-quality products handpicked just for you.",
    image: "/images/hero.webp",
    alt: "Canvas travel backpack, cream sneakers, bottle, and sculptural home decor in a warm studio",
  },
  {
    eyebrow: "YOUR NEXT EVERYDAY FAVORITES",
    heading: (
      <>
        LITTLE DETAILS.
        <br />
        BIG DIFFERENCE.
      </>
    ),
    tagline: "Thoughtfully chosen. Just for you.",
    description:
      "Find the everyday essentials that make your routine feel a little more extraordinary.",
    image: "/images/hero.webp",
    alt: "Thoughtfully curated travel and home essentials in neutral tones",
  },
  {
    eyebrow: "MAKE ROOM FOR SOMETHING NEW",
    heading: (
      <>
        MORE STYLE.
        <br />
        LESS SPENDING.
      </>
    ),
    tagline: "Good finds. Even better prices.",
    description:
      "Fresh finds, timeless favorites, and a little inspiration for every part of your life.",
    image: "/images/hero.webp",
    alt: "A curated collection of lifestyle products on beige stone plinths",
  },
];
export function HeroSection() {
  const [slide, setSlide] = useState(0);
  const { viewAll } = useStore();
  const current = slides[slide];
  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div className="container hero-inner">
        <div className="hero-copy" key={slide} aria-live="polite">
          <p className="eyebrow">
            <span />
            {current.eyebrow}
          </p>
          <h1>{current.heading}</h1>
          <p className="hero-tagline">{current.tagline}</p>
          <p className="hero-description">{current.description}</p>
          <div className="hero-buttons">
            <button className="button button-primary" onClick={viewAll}>
              SHOP NOW <ArrowRight size={16} />
            </button>
            <a href="#categories" className="button button-outline">
              EXPLORE COLLECTIONS
            </a>
          </div>
          <div className="hero-services">
            <span>
              <Truck />
              FREE SHIPPING
            </span>
            <span>
              <RotateCcw />
              EASY RETURNS
            </span>
            <span>
              <ShieldCheck />
              SECURE PAYMENT
            </span>
          </div>
        </div>
        <div className={`hero-visual hero-visual-${slide}`}>
          <Image
            src={current.image}
            alt={current.alt}
            fill
            sizes="(max-width: 767px) 100vw, 57vw"
            preload
            className="hero-image"
          />
          <div className="discount-seal">
            <span>UP TO</span>
            <strong>
              50<span>%</span>
            </strong>
            <span>OFF</span>
          </div>
          <span className="hero-image-caption">GOOD FINDS. GREAT LIVING.</span>
        </div>
        <div className="slider-controls">
          <button
            className="slider-arrow"
            aria-label="Previous slide"
            onClick={() =>
              setSlide((slide + slides.length - 1) % slides.length)
            }
          >
            <ChevronLeft size={16} />
          </button>
          <div className="slider-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={slide === i ? "true" : undefined}
                className={slide === i ? "selected" : ""}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
          <button
            className="slider-arrow"
            aria-label="Next slide"
            onClick={() => setSlide((slide + 1) % slides.length)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
