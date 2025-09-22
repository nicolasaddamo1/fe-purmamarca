import QualitiesSection from "@/components/landing/Features/FeaturesSection";
import AboutUs from "@/components/landing/Hero/AboutUs";
import Hero from "@/components/landing/Hero/Hero";
import StarProduct from "@/components/landing/Hero/StarProduct";
import ProductsSection from "@/components/landing/Products/ProductsSection";
import TestimonialsSection from "@/components/landing/Testimonials/TestimonialSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <StarProduct />
      <AboutUs />
      <ProductsSection />
      <TestimonialsSection/>
      <QualitiesSection/> 
    </div>
  );
}
