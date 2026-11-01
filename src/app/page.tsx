import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { TrendingProducts } from "@/components/TrendingProducts";
import { PromoBanners } from "@/components/PromoBanners";
import { TrustNewsletter } from "@/components/TrustNewsletter";
import { Footer } from "@/components/Footer";
import { StoreProvider } from "@/components/StoreProvider";
import { StoreOverlays } from "@/components/StoreOverlays";

export default function Home() {
  return (
    <StoreProvider>
      <div id="home">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <CategorySection />
          <TrendingProducts />
          <PromoBanners />
          <TrustNewsletter />
        </main>
        <Footer />
        <StoreOverlays />
      </div>
    </StoreProvider>
  );
}
