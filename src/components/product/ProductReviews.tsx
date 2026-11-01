"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { Check, MessageSquare, Star, X } from "lucide-react";
import type { Product } from "@/types";
import { Stars } from "@/components/ProductCard";

type Review = {
  id: string;
  name: string;
  rating: number;
  title: string;
  text: string;
  local?: boolean;
};
const sampleReviews: Review[] = [
  {
    id: "sample-1",
    name: "Alex M.",
    rating: 5,
    title: "A lovely everyday find",
    text: "Simple, well considered, and easy to fit into my everyday routine. The neutral design is exactly the kind of thing I look for.",
  },
  {
    id: "sample-2",
    name: "Jordan K.",
    rating: 5,
    title: "Just what I was looking for",
    text: "I like the attention to the little details. A thoughtful addition to my collection, and something I would happily choose again.",
  },
  {
    id: "sample-3",
    name: "Sam R.",
    rating: 4,
    title: "An easy favorite",
    text: "A nice balance of style and practicality. The product photos made it easy to get a feel for the design before choosing it.",
  },
];
export function ProductReviews({ product }: { product: Product }) {
  const [localReviews, setLocalReviews] = useReducer(
    (_: Review[], next: Review[]) => next,
    [],
  );
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const storageKey = `shopluxe-reviews-${product.id}`;
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(saved))
        setLocalReviews(
          saved
            .filter(
              (review: Review) =>
                review &&
                typeof review.id === "string" &&
                typeof review.name === "string" &&
                typeof review.title === "string" &&
                typeof review.text === "string" &&
                Number.isInteger(review.rating) &&
                review.rating >= 1 &&
                review.rating <= 5,
            )
            .map((review) => ({ ...review, local: true })),
        );
    } catch {
      /* Reviews remain usable without browser storage. */
    }
  }, [storageKey]);
  const reviews = [...localReviews, ...sampleReviews].filter(
    (review) => filter === "all" || review.rating === Number(filter),
  );
  if (sort === "highest") reviews.sort((a, b) => b.rating - a.rating);
  if (sort === "lowest") reviews.sort((a, b) => a.rating - b.rating);
  const count = product.reviews + localReviews.length;
  const rating =
    (product.rating * product.reviews +
      localReviews.reduce((sum, review) => sum + review.rating, 0)) /
    count;
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const title = String(form.get("title") || "").trim();
    const text = String(form.get("review") || "").trim();
    if (!name || !title || text.length < 10) {
      setFormError(
        "Add your name, a title, and at least 10 characters for your review.",
      );
      return;
    }
    const next = [
      {
        id: crypto.randomUUID(),
        name,
        title,
        text,
        rating: Number(form.get("rating")),
        local: true,
      },
      ...localReviews,
    ];
    setLocalReviews(next);
    setFilter("all");
    setSort("recent");
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setMessage("Thanks! Your demo review is saved on this device.");
    } catch {
      setMessage(
        "Thanks! Your demo review is visible for this visit. Browser storage is unavailable.",
      );
    }
    event.currentTarget.reset();
    setFormError("");
    dialog.current?.close();
  }
  return (
    <section
      className="pdp-reviews"
      id="customer-reviews"
      aria-labelledby="reviews-title"
    >
      <div className="pdp-reviews-heading">
        <div>
          <span className="eyebrow">The little things people love</span>
          <h2 id="reviews-title">Customer reviews</h2>
        </div>
        <button
          className="button button-outline"
          onClick={() => {
            setFormError("");
            dialog.current?.showModal();
            document.body.style.overflow = "hidden";
          }}
        >
          <MessageSquare size={16} />
          Write a review
        </button>
      </div>
      <p className="pdp-review-demo">
        Sample reviews for this demo. Reviews you write stay on this device.
      </p>
      <div className="pdp-reviews-layout">
        <aside className="pdp-review-summary">
          <div className="pdp-review-score">
            <strong>{rating.toFixed(1)}</strong>
            <span>out of 5</span>
          </div>
          <Stars rating={rating} />
          <p>Based on {count} reviews</p>
          <div
            className="pdp-rating-bars"
            aria-label="Illustrative rating distribution"
          >
            {[87, 9, 3, 1, 0].map((percent, index) => (
              <button
                key={index}
                className={filter === String(5 - index) ? "active" : ""}
                aria-label={`Show ${5 - index} star sample reviews`}
                aria-pressed={filter === String(5 - index)}
                onClick={() =>
                  setFilter(
                    filter === String(5 - index) ? "all" : String(5 - index),
                  )
                }
              >
                <span>
                  {5 - index} <Star size={11} fill="currentColor" />
                </span>
                <span className="pdp-rating-bar">
                  <i style={{ width: `${percent}%` }} />
                </span>
                <span>{percent}%</span>
              </button>
            ))}
          </div>
        </aside>
        <div className="pdp-review-list">
          <div className="pdp-review-toolbar">
            <p aria-live="polite">
              Showing {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </p>
            <div>
              <label className="sr-only" htmlFor="review-filter">
                Filter reviews by rating
              </label>
              <select
                id="review-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All ratings</option>
                {[5, 4, 3, 2, 1].map((value) => (
                  <option value={value} key={value}>
                    {value} {value === 1 ? "star" : "stars"}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="review-sort">
                Sort reviews
              </label>
              <select
                id="review-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="recent">Most recent</option>
                <option value="highest">Highest rated</option>
                <option value="lowest">Lowest rated</option>
              </select>
            </div>
          </div>
          {message && (
            <p className="pdp-review-success" role="status">
              <Check size={16} />
              {message}
            </p>
          )}
          {reviews.map((review) => (
            <article className="pdp-review" key={review.id}>
              <div className="pdp-review-author">
                <span className="pdp-review-avatar">
                  {review.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <strong>{review.name}</strong>
                  <span>
                    {review.local ? "Your demo review" : "Sample review"}
                  </span>
                </div>
                <Stars rating={review.rating} />
              </div>
              <h3>{review.title}</h3>
              <p>{review.text}</p>
            </article>
          ))}
          {!reviews.length && (
            <div className="pdp-no-reviews">
              <MessageSquare size={26} strokeWidth={1.3} />
              <p>No sample reviews with this rating yet.</p>
              <button onClick={() => setFilter("all")}>View all reviews</button>
            </div>
          )}
        </div>
      </div>
      <dialog
        ref={dialog}
        className="store-dialog review-dialog"
        aria-labelledby="write-review-title"
        onClose={() => {
          document.body.style.overflow = "";
        }}
      >
        <div className="dialog-header">
          <div>
            <span className="eyebrow">Your opinion matters</span>
            <h2 id="write-review-title">Review {product.name}</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close review form"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <form className="pdp-review-form" onSubmit={submit} noValidate>
          <p>This demo review is saved only on your device.</p>
          <label>
            Your name
            <input
              name="name"
              autoComplete="nickname"
              maxLength={60}
              required
            />
          </label>
          <label>
            Rating
            <select name="rating" defaultValue="5">
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} {value === 1 ? "star" : "stars"}
                </option>
              ))}
            </select>
          </label>
          <label>
            Review title
            <input name="title" maxLength={100} required />
          </label>
          <label>
            Your review
            <textarea
              name="review"
              rows={4}
              minLength={10}
              maxLength={1500}
              required
            />
          </label>
          {formError && (
            <p className="form-message" role="alert">
              {formError}
            </p>
          )}
          <button className="button button-primary" type="submit">
            Save demo review
          </button>
        </form>
      </dialog>
    </section>
  );
}
