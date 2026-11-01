"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { products } from "@/data/products";
import { formatPrice, isGeneratedPhoto, isValidEmail } from "@/lib/utils";
import { useStore } from "./StoreProvider";
import { ProductCard, Stars } from "./ProductCard";

function CartPanel() {
  const { cart, cartTotal, changeQuantity, setPanel, openInfo, viewAll } =
    useStore();
  const shipping = cartTotal > 50 ? 0 : 5.99;
  if (!cart.length)
    return (
      <div className="empty-state">
        <ShoppingBag size={42} strokeWidth={1} />
        <h3>Your next favorite is waiting.</h3>
        <p>Your shopping bag is empty. Let’s find something you love.</p>
        <button
          className="button button-primary"
          onClick={() => {
            setPanel(null);
            viewAll();
          }}
        >
          EXPLORE THE SHOP <ArrowRight size={15} />
        </button>
      </div>
    );
  return (
    <>
      <p className="panel-intro">Good finds, all in one place.</p>
      <div className="shipping-progress">
        <span>
          {cartTotal > 50
            ? "Your order qualifies for free shipping!"
            : `You’re ${formatPrice(50.01 - cartTotal)} away from free shipping.`}
        </span>
        <div>
          <span
            style={{ width: `${Math.min(100, (cartTotal / 50.01) * 100)}%` }}
          />
        </div>
      </div>
      <div className="cart-items">
        {cart.map((item) => {
          const product = products.find((p) => p.id === item.productId)!;
          return (
            <div className="cart-item" key={product.id}>
              <div
                className={`cart-item-image ${isGeneratedPhoto(product.image) ? "catalog-photo" : ""}`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="88px"
                />
              </div>
              <div className="cart-item-copy">
                <h3>{product.name}</h3>
                <span>{formatPrice(product.price)}</span>
                <div className="quantity-control">
                  <button
                    aria-label={`Decrease ${product.name} quantity`}
                    onClick={() => changeQuantity(product.id, -1)}
                  >
                    <Minus size={13} />
                  </button>
                  <span aria-label={`Quantity ${item.quantity}`}>
                    {item.quantity}
                  </span>
                  <button
                    aria-label={`Increase ${product.name} quantity`}
                    onClick={() => changeQuantity(product.id, 1)}
                    disabled={item.quantity >= 99}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
              <button
                className="remove-item"
                aria-label={`Remove ${product.name}`}
                onClick={() => changeQuantity(product.id, -item.quantity)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
      <div className="cart-summary">
        <div>
          <span>Subtotal</span>
          <strong>{formatPrice(cartTotal)}</strong>
        </div>
        <div>
          <span>Estimated shipping</span>
          <span>{shipping ? formatPrice(shipping) : "FREE"}</span>
        </div>
        <div className="cart-grand-total">
          <strong>Estimated total</strong>
          <strong>{formatPrice(cartTotal + shipping)}</strong>
        </div>
        <p>Taxes, if applicable, would be calculated at checkout.</p>
        <button
          className="button button-primary checkout-button"
          onClick={() =>
            openInfo(
              "Your checkout preview",
              `YOUR ORDER\n\n${cart
                .map((item) => {
                  const p = products.find((p) => p.id === item.productId)!;
                  return `${p.name} × ${item.quantity} — ${formatPrice(p.price * item.quantity)}`;
                })
                .join(
                  "\n",
                )}\n\nSubtotal: ${formatPrice(cartTotal)}\nShipping: ${shipping ? formatPrice(shipping) : "FREE"}\nEstimated total: ${formatPrice(cartTotal + shipping)}\n\nThis is a frontend demo. No order has been placed, no payment is collected, and your bag is still saved. Thank you for exploring SHOPLUXE!`,
            )
          }
        >
          PREVIEW CHECKOUT <ArrowRight size={16} />
        </button>
        <span className="secure-note">
          <ShieldCheck size={14} /> Demo checkout · No payment required
        </span>
      </div>
    </>
  );
}
function SearchPanel() {
  const [query, setQuery] = useState("");
  const { openProduct } = useStore();
  const results = products.filter((p) =>
    `${p.name} ${p.category}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <label className="search-field">
        <Search size={20} />
        <input
          autoFocus
          placeholder="Try ‘backpack’ or ‘home’…"
          aria-label="Search product catalog"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button aria-label="Clear search" onClick={() => setQuery("")}>
            <X size={17} />
          </button>
        )}
      </label>
      <p className="search-result-count" aria-live="polite">
        {query
          ? `${results.length} ${results.length === 1 ? "find" : "finds"} for “${query}”`
          : "A FEW THINGS YOU MIGHT LOVE"}
      </p>
      <div className="search-results">
        {results.map((product) => (
          <button
            className="search-result"
            key={product.id}
            onClick={() => openProduct(product)}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={64}
              height={64}
            />
            <span>
              <strong>{product.name}</strong>
              <span>{formatPrice(product.price)}</span>
            </span>
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      {!results.length && (
        <div className="empty-state">
          <Search size={35} strokeWidth={1} />
          <h3>No finds just yet.</h3>
          <p>
            Try another product name, or search for electronics, beauty, or
            accessories.
          </p>
        </div>
      )}
    </>
  );
}
function AccountPanel() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      setSuccess(false);
      return;
    }
    setSuccess(true);
    setMessage(
      "Your demo sign-in preview is ready. A live store would email a secure sign-in link; no email has been sent and no account was created.",
    );
  }
  return (
    <div className="account-panel">
      <div className="account-symbol">
        <UserRound size={30} strokeWidth={1.3} />
      </div>
      <h3>A little more, just for you.</h3>
      <p>Save your favorites and keep your good finds close.</p>
      <span className="demo-label">FRONTEND DEMO</span>
      <form onSubmit={submit} noValidate>
        <label htmlFor="account-email">Email address</label>
        <input
          autoFocus
          id="account-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage("");
            setSuccess(false);
          }}
          placeholder="you@example.com"
          autoComplete="email"
          aria-describedby="account-feedback"
          aria-invalid={!!message && !success}
          required
        />
        <button className="button button-primary" type="submit">
          PREVIEW EMAIL SIGN-IN <ArrowRight size={15} />
        </button>
        <p
          id="account-feedback"
          role="status"
          className={success ? "success" : "form-message"}
        >
          {message}
        </p>
      </form>
      <p className="small-print">
        No password or personal details needed. This demo does not create a real
        account.
      </p>
    </div>
  );
}
function WishlistPanel() {
  const { wishlist, viewAll, setPanel } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));
  if (!saved.length)
    return (
      <div className="empty-state">
        <Heart size={42} strokeWidth={1} />
        <h3>Keep the good finds close.</h3>
        <p>Tap the heart on any product to save it here.</p>
        <button
          className="button button-primary"
          onClick={() => {
            setPanel(null);
            viewAll();
          }}
        >
          FIND YOUR FAVORITES <ArrowRight size={15} />
        </button>
      </div>
    );
  return (
    <>
      <p className="panel-intro">A little collection of things you love.</p>
      <div className="wishlist-grid">
        {saved.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
function ProductPanel() {
  const {
    selectedProduct: product,
    addToCart,
    toggleWishlist,
    wishlist,
  } = useStore();
  if (!product) return null;
  return (
    <div className="product-preview">
      <div
        className={`preview-image ${isGeneratedPhoto(product.image) ? "catalog-photo" : ""}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 600px) 80vw, 450px"
        />
      </div>
      <div className="product-rating">
        <Stars rating={product.rating} />
        <span>({product.reviews} illustrative reviews)</span>
      </div>
      <p>{product.description}</p>
      <div className="product-price">
        <strong>{formatPrice(product.price)}</strong>
        {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
      </div>
      <button
        className="button button-primary"
        onClick={() => addToCart(product)}
      >
        <ShoppingBag size={16} />
        ADD TO CART
      </button>
      <button className="preview-save" onClick={() => toggleWishlist(product)}>
        <Heart
          size={16}
          fill={wishlist.includes(product.id) ? "currentColor" : "none"}
        />
        {wishlist.includes(product.id)
          ? "Saved to wishlist"
          : "Save to wishlist"}
      </button>
    </div>
  );
}
export function StoreOverlays() {
  const { panel, setPanel, info, selectedProduct, toast } = useStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (panel) {
      if (!dialog?.open) dialog?.showModal();
      document.body.style.overflow = "hidden";
      bodyRef.current?.scrollTo(0, 0);
    } else {
      dialog?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [panel]);
  const title =
    panel === "cart"
      ? "YOUR SHOPPING BAG"
      : panel === "search"
        ? "FIND SOMETHING YOU LOVE"
        : panel === "wishlist"
          ? "YOUR WISHLIST"
          : panel === "account"
            ? "WELCOME TO SHOPLUXE"
            : panel === "product"
              ? selectedProduct?.name
              : info.title;
  return (
    <>
      <dialog
        ref={dialogRef}
        className={`store-dialog ${panel === "cart" ? "cart-dialog" : ""}`}
        aria-labelledby="dialog-title"
        onCancel={() => setPanel(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            const r = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              setPanel(null);
          }
        }}
      >
        <div className="dialog-header">
          <div>
            <span className="eyebrow">THE SHOPLUXE EDIT</span>
            <h2 id="dialog-title">{title}</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={() => setPanel(null)}
          >
            <X size={21} />
          </button>
        </div>
        <div className="dialog-body" ref={bodyRef}>
          {panel === "cart" ? (
            <CartPanel />
          ) : panel === "search" ? (
            <SearchPanel />
          ) : panel === "account" ? (
            <AccountPanel />
          ) : panel === "wishlist" ? (
            <WishlistPanel />
          ) : panel === "product" ? (
            <ProductPanel />
          ) : panel === "info" ? (
            <div className="info-content">{info.body}</div>
          ) : null}
        </div>
        {toast && panel && (
          <div className="dialog-toast" role="status">
            <Check size={15} /> {toast}
          </div>
        )}
      </dialog>
      <div
        className={`toast ${toast && !panel ? "toast-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <span>
              <Check size={15} />
            </span>
            {toast}
          </>
        )}
      </div>
    </>
  );
}
