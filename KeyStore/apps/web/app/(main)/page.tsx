import HeroCarousel from "@/components/home/hero-carousel";
import ProductsContainer from "@/components/home/products-container";
import SecurityBanner from "@/components/security-banner";

export default function Home() {
  return (
    <div>
      <section className="relative w-full h-[550px] overflow-hidden">
        <HeroCarousel></HeroCarousel>
      </section>
      <section className="pb-10 bg-gray-900">
        <ProductsContainer></ProductsContainer>
      </section>
      <SecurityBanner></SecurityBanner>
      <section className="pb-10 bg-gray-900">
        <ProductsContainer></ProductsContainer>
      </section>
    </div>
  );
}
