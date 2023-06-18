import { Footer } from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Products from "@/components/Products";
import Promotions from "@/components/Promotions";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <Promotions />
      <Products />
      <Footer />
    </div>
  );
}
