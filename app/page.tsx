import { Fragment, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import MenuSection from "@/components/MenuSection";
import BestSellers from "@/components/TopDrinks";
import WhyBubbleHouse from "@/components/WhyBubbleHouse";
import Gallery from "@/components/Gallery";
import VisitUs from "@/components/VisitUs";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/sanity/lib/get-site-content";
import { SanityLive } from "@/sanity/lib/live";

export default async function Home() {
  const content = await getSiteContent();
  const sections: Array<{ key: string; order: number; node: ReactNode }> = [];

  if (content.hero.isActive) {
    sections.push({
      key: "hero",
      order: content.hero.sortOrder,
      node: <Hero hero={content.hero} business={content.business} />,
    });
  }

  if (content.categoriesSection.isActive) {
    sections.push({
      key: "categories",
      order: content.categoriesSection.sortOrder,
      node: (
        <Categories
          section={content.categoriesSection}
          categories={content.homepageCategories}
        />
      ),
    });
  }

  if (content.menuSection.isActive) {
    sections.push({
      key: "menu",
      order: content.menuSection.sortOrder,
      node: <MenuSection section={content.menuSection} />,
    });
  }

  if (content.favoritesSection.isActive) {
    sections.push({
      key: "favorites",
      order: content.favoritesSection.sortOrder,
      node: (
        <BestSellers
          section={content.favoritesSection}
          favorites={content.favorites}
        />
      ),
    });
  }

  if (content.whySection.isActive) {
    sections.push({
      key: "why",
      order: content.whySection.sortOrder,
      node: (
        <WhyBubbleHouse
          section={content.whySection}
          benefits={content.benefits}
        />
      ),
    });
  }

  if (content.gallerySection.isActive) {
    sections.push({
      key: "gallery",
      order: content.gallerySection.sortOrder,
      node: (
        <Gallery
          section={content.gallerySection}
          items={content.galleryItems}
        />
      ),
    });
  }

  if (content.visitSection.isActive) {
    sections.push({
      key: "visit",
      order: content.visitSection.sortOrder,
      node: (
        <VisitUs
          section={content.visitSection}
          business={content.business}
        />
      ),
    });
  }

  sections.sort((a, b) => a.order - b.order);

  return (
    <main>
      <Navbar
        business={content.business}
        announcementText={content.header.announcementText}
        orderButtonText={content.header.orderButtonText}
      />
      {sections.map((section) => (
        <Fragment key={section.key}>{section.node}</Fragment>
      ))}
      <Footer business={content.business} content={content.footer} />
      <SanityLive action="refresh" />
    </main>
  );
}
