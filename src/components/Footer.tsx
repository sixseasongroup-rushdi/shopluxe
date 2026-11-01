"use client";

import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { ApplePay, Facebook, Instagram } from "./BrandIcons";
import { Logo } from "./Logo";
import { useStore } from "./StoreProvider";

const policies: Record<string, string> = {
  FAQs: "IS THIS A LIVE STORE?\nSHOPLUXE is a frontend shopping demo. Products, prices, and reviews are illustrative. No payments are collected.\n\nHOW DOES MY BAG WORK?\nAdd your favorites, adjust quantities, and preview your order. Your bag and wishlist are saved on this browser.\n\nCAN I PLACE AN ORDER?\nCheckout demonstrates an order summary. It does not create or ship an order.",
  "Shipping Policy":
    "Demo shipping policy\n\nStandard shipping is illustrated as free on orders over $50, and $5.99 otherwise. The demo does not process shipments or collect delivery addresses. A live store would confirm availability, delivery regions, and estimated arrival dates at checkout.",
  "Returns & Refunds":
    "Demo returns policy\n\nOur design presents easy returns as a shopping benefit. No purchases or refunds are processed in this demo. A live store would publish its return window, eligibility, and refund timeline before accepting orders.",
  "Terms & Conditions":
    "SHOPLUXE frontend demo terms\n\nThis website is a demonstration of an e-commerce experience. Product information, stock, reviews, and promotions are illustrative. No sales contract is created. Account, subscription, and checkout interactions are local demonstrations.",
  "Privacy Policy":
    "Your privacy in this demo\n\nYour shopping bag, wishlist, and optional newsletter email are stored only in this browser’s local storage. No account is created, no password is requested, and no payment details are collected. You can clear this data through your browser settings. Images and fonts are served locally by the application.",
};
export function Footer() {
  const { viewAll, setPanel, openInfo } = useStore();
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo />
            <p>
              A little of everything.
              <br />A lot to love.
            </p>
            <p className="brand-description">
              Thoughtfully chosen products for your
              <br className="desktop-break" /> everyday, all in one place.
            </p>
            <div className="social-links">
              <button
                aria-label="SHOPLUXE Instagram information"
                onClick={() =>
                  openInfo(
                    "Let’s stay connected",
                    "Our social pages are part of this storefront demo. To explore more, browse the collections or sign up for the demo newsletter.",
                  )
                }
              >
                <Instagram size={17} />
              </button>
              <button
                aria-label="SHOPLUXE Facebook information"
                onClick={() =>
                  openInfo(
                    "Find your community",
                    "This is the SHOPLUXE frontend demo. Social accounts are not connected. Explore the collections and save your favorite finds to your wishlist.",
                  )
                }
              >
                <Facebook size={17} />
              </button>
              <a
                aria-label="Email SHOPLUXE"
                href="mailto:hello@shopluxe.example"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Quick links</h3>
            <a href="#home">Home</a>
            <button onClick={viewAll}>Shop</button>
            <a href="#categories">Collections</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact Us</a>
          </div>
          <div className="footer-column">
            <h3>Customer service</h3>
            {Object.keys(policies).map((title) => (
              <button
                key={title}
                onClick={() => openInfo(title, policies[title])}
              >
                {title}
              </button>
            ))}
          </div>
          <div className="footer-column">
            <h3>My account</h3>
            <button onClick={() => setPanel("account")}>My Account</button>
            <button
              onClick={() =>
                openInfo(
                  "Order history",
                  "You haven’t placed any orders.\n\nSHOPLUXE is a frontend demo, so checkout will show a preview without processing an order or payment. Your bag and wishlist are saved on this browser.",
                )
              }
            >
              Order History
            </button>
            <button onClick={() => setPanel("wishlist")}>Wishlist</button>
            <button
              onClick={() =>
                openInfo(
                  "Track your order",
                  "There are no shipments to track in this demo.\n\nA live store would provide a tracking link after dispatch. You can explore the demo bag and checkout preview without placing a real order.",
                )
              }
            >
              Track Order
            </button>
            <button onClick={() => setPanel("account")}>
              Login / Register
            </button>
          </div>
          <div className="footer-column footer-contact">
            <h3>Contact us</h3>
            <a href="tel:+15550102026">
              <Phone size={15} />
              <span>+1 (555) 010-2026</span>
            </a>
            <a href="mailto:hello@shopluxe.example">
              <Mail size={15} />
              <span>hello@shopluxe.example</span>
            </a>
            <span className="address">
              <MapPin size={16} />
              <span>
                123 Market Street,
                <br />
                New York, NY 10001
              </span>
            </span>
            <span className="contact-demo">
              Illustrative demo contact details.
            </span>
            <a className="back-top" href="#home">
              Back to top <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {2026} SHOPLUXE. All rights reserved.
            <span> Designed for everyday living.</span>
          </p>
          <div
            className="payment-methods"
            aria-label="Visa, Mastercard, PayPal, and Apple Pay"
          >
            <span className="pay-visa">VISA</span>
            <span className="pay-mastercard" aria-label="Mastercard">
              <i />
              <i />
            </span>
            <span className="pay-paypal">PayPal</span>
            <span className="pay-apple">
              <ApplePay />
            </span>
          </div>
        </div>
        <p className="store-demo-note">
          A considered shopping experience. Frontend demo — no purchases or
          payments are processed.
        </p>
      </div>
    </footer>
  );
}
