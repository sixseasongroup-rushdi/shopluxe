"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { isValidEmail } from "@/lib/utils";
import { Stars } from "./ProductCard";

export function TrustNewsletter() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);
  function subscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setFeedback("Please enter a valid email address.");
      setSuccess(false);
      return;
    }
    try {
      localStorage.setItem("shopluxe-newsletter", email.trim());
    } catch {
      /* Local confirmation still works without storage. */
    }
    setSuccess(true);
    setFeedback("You’re on the list! Demo subscription saved on this device.");
  }
  return (
    <section className="trust-newsletter" id="about">
      <div className="container trust-inner">
        <div className="trust-block">
          <span className="eyebrow">THE LITTLE THINGS MATTER</span>
          <h2>TRUSTED BY THOUSANDS</h2>
          <p>Quality products, happy customers.</p>
          <div className="customer-proof">
            <div className="avatar-stack">
              {[1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  src={`/images/avatar-${i}.webp`}
                  width={41}
                  height={41}
                  alt="Illustrative customer portrait"
                />
              ))}
              <span>2.5k+</span>
            </div>
            <div className="review-copy">
              <div>
                <Stars rating={4.8} />
                <strong>4.8/5</strong>
              </div>
              <span>Based on 2,500+ Reviews</span>
            </div>
          </div>
          <span className="demo-review-note">
            Illustrative community ratings for this demo.
          </span>
        </div>
        <div className="newsletter-block" id="newsletter">
          <span className="eyebrow">GOOD THINGS, STRAIGHT TO YOUR INBOX</span>
          <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
          <p>Get the latest updates on new products and sales.</p>
          <form
            className={`newsletter-form ${success ? "subscribed" : ""}`}
            onSubmit={subscribe}
            noValidate
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <Mail size={17} aria-hidden="true" />
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFeedback("");
                setSuccess(false);
              }}
              aria-invalid={!!feedback && !success}
              aria-describedby="newsletter-feedback"
              required
            />
            <button type="submit" aria-label="Subscribe to newsletter">
              {success ? (
                <>
                  <Check size={14} />
                  SUBSCRIBED
                </>
              ) : (
                <>
                  SUBSCRIBE <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
          <p
            id="newsletter-feedback"
            className={`newsletter-feedback ${success ? "success" : ""}`}
            role="status"
          >
            {feedback || "A little inspiration. No spam. Unsubscribe anytime."}
          </p>
        </div>
      </div>
    </section>
  );
}
