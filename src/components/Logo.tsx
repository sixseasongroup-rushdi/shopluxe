import { ShoppingBag } from "lucide-react";

export function Logo() {
  return (
    <a className="logo" href="#home" aria-label="SHOPLUXE home">
      <ShoppingBag strokeWidth={1.6} aria-hidden="true" />
      <span>
        SHOP<span className="logo-light">LUXE</span>
        <span className="logo-period">.</span>
      </span>
    </a>
  );
}
