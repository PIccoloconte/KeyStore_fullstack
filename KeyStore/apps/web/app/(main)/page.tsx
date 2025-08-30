import HeroCarousel from "@/components/home/hero-carousel";
import ProductsContainer from "@/components/home/products-container";
import SecurityBanner from "@/components/security-banner";

export default function Home() {
  return (
    <div className="mt-[104px] md:mt-20">
      <section className="relative w-full h-[550px] overflow-hidden">
        <HeroCarousel></HeroCarousel>
      </section>
      <section className="pb-10 bg-gray-900">
        <ProductsContainer categoryName="Trending"></ProductsContainer>
      </section>
      <SecurityBanner></SecurityBanner>
      <section className="pb-10 bg-gray-900">
        <ProductsContainer
          filter="price"
          categoryName="The cheapest games"
        ></ProductsContainer>
      </section>
    </div>
  );
}
