# SHOPLUXE

A complete responsive storefront built with Next.js 16.4.3, React 19, TypeScript, Tailwind CSS 4, and Lucide React. The starter is replaced from the announcement bar through the footer.

## Run locally

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). In Windows PowerShell, use `npm.cmd` if your execution policy blocks `npm.ps1`.

For a production build:

```sh
npm run build
npm start
```

All images and the Inter font are stored locally. Normal development, builds, and browsing do not require third-party asset requests. The reference screenshot was not attached; the design follows the written layout, product list, and navy/beige palette.

## Files

```text
src/
  app/               Layout, homepage, responsive styles, brand icon
  components/        AnnouncementBar, Navbar, HeroSection, CategorySection,
                     TrendingProducts, ProductCard, PromoBanners,
                     TrustNewsletter, Footer, Logo, BrandIcons,
                     StoreProvider, StoreOverlays
  data/              Typed product and category catalogs
  types/             Shared product, category, cart, and overlay types
  lib/               Currency, email validation, and image helpers
public/
  images/            Optimized local WebP photographs and source records
  fonts/             Self-hosted variable Inter font and license
scripts/
  download-assets.mjs Optional refresh of downloaded demo assets
```

## Working interactions

- Sticky navigation and mobile hamburger menu.
- Three hero slides, previous/next controls, and indicators.
- Seven category filters, twelve-product catalog, and discounted-item filtering. The homepage initially shows the five specified trending products.
- Product previews and wishlists, with native modal focus management and Escape dismissal.
- Shopping bag with quantities, removals, item count, totals, shipping threshold, and an itemized checkout preview.
- Cart and wishlist persistence in browser local storage; shopping still works if storage is unavailable.
- Live product search with an empty-results state.
- Newsletter email validation and local confirmation.
- Account, journal, policy, order history, tracking, and social demo content.

This is a frontend demo. Checkout does not place orders or collect payment. Account sign-in does not send email or create an account. Newsletter signup stores the email on this device and does not subscribe it to a service. Reviews, community totals, and contact details are illustrative. Production commerce requires backend integrations and finalized policies.

## Assets

Catalog photos come from DummyJSON's demonstration catalog; illustrative portraits come from Unsplash. Exact download URLs are in `public/images/sources.json`. Generated image paths and final prompts are in [public/images/GENERATED.md](public/images/GENERATED.md). Images are optimized as WebP and rendered through `next/image` with responsive sizes. Inter is distributed under the SIL Open Font License.

To refresh downloaded photos and the font, run `node scripts/download-assets.mjs`. This does not regenerate or overwrite the AI-created photographs.

## Validation

The production build and TypeScript checks passed. Local Chrome checks covered image loading, cart calculations and persistence, wishlist persistence, search, category and offer filtering, hero controls, newsletter validation, account preview, mobile navigation, and Escape dismissal. No browser errors or horizontal overflow were observed at 320, 375, 390, 767, 768, 1024, 1280, 1440, and 1920 pixels. Temporary QA artifacts are excluded from Git.
