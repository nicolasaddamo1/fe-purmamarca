import QualitiesSection from "@/components/landing/Features/FeaturesSection";
import GalleryProducts from "@/components/landing/GalleryProducts/GalleryProducts";
import AboutUs from "@/components/landing/Hero/AboutUs";
import Hero from "@/components/landing/Hero/Hero";

export default function Home() {
  return (
    <div>
      <Hero />

      <AboutUs />

      <GalleryProducts />
      <QualitiesSection />
    </div>
  );
}
