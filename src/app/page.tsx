import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { TrendingProducts } from "@/components/TrendingProducts";
import { PromoBanners } from "@/components/PromoBanners";
import { TrustNewsletter } from "@/components/TrustNewsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <TrendingProducts />
      <PromoBanners />
      <TrustNewsletter />
    </>
  );
}
