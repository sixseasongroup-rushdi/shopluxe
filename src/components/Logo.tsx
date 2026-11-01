import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="SHOPLUXE home">
      <ShoppingBag strokeWidth={1.6} aria-hidden="true" />
      <span>
        SHOP<span className="logo-light">LUXE</span>
        <span className="logo-period">.</span>
      </span>
    </Link>
  );
}
