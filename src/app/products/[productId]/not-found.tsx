import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="container product-not-found">
      <ShoppingBag size={44} strokeWidth={1.3} />
      <p className="eyebrow">Let’s find your next favorite</p>
      <h1>This product isn’t here.</h1>
      <p>
        It may have moved, or the link may be incorrect. There’s plenty more to
        discover in the shop.
      </p>
      <Link className="button button-primary" href="/">
        <ArrowLeft size={17} />
        Back to the shop
      </Link>
    </div>
  );
}
