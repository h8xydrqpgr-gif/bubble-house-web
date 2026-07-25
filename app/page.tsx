import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import MenuSection from "@/components/MenuSection";
import BestSellers from "@/components/TopDrinks";
import WhyBubbleHouse from "@/components/WhyBubbleHouse";
import Gallery from "@/components/Gallery";
import VisitUs from "@/components/VisitUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <MenuSection />
      <BestSellers />
      <WhyBubbleHouse />
      <Gallery />
      <VisitUs />
      <Footer />
    </main>
  );
}
