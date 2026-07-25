"use client";

import Image from "next/image";
import { selectMenuCategory } from "@/components/menu-navigation";
import type {
  HomepageCategoryContent,
  SectionContent,
} from "@/types/site-content";

const categoryStyles: Record<
  string,
  { cardColor: string; iconColor: string }
> = {
  "Milk Teas": { cardColor: "bg-[#faf7ff]", iconColor: "bg-[#eee5fb]" },
  "Loaded Teas": { cardColor: "bg-[#fffaf0]", iconColor: "bg-[#f9edcf]" },
  "Protein Shakes": {
    cardColor: "bg-[#fff6f8]",
    iconColor: "bg-[#f8e4ea]",
  },
};

export default function Categories({
  section,
  categories,
}: {
  section: SectionContent;
  categories: readonly HomepageCategoryContent[];
}) {
  return (
    <section id="categories" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-purple-600 sm:text-sm">
            {section.eyebrow}
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#23182f] sm:text-5xl">
            {section.title}
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            {section.description}
          </p>
        </div>

        <div className="mt-10 grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {categories.map((category) => {
            const styles = categoryStyles[category.name] ?? {
              cardColor: "bg-[#faf7ff]",
              iconColor: "bg-[#eee5fb]",
            };

            return (
            <article
              key={category.name}
              className={`group flex h-full flex-col rounded-[2rem] border border-purple-100/80 p-7 shadow-[0_12px_36px_rgba(50,30,70,0.06)] transition duration-300 ease-out hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_20px_48px_rgba(50,30,70,0.1)] sm:p-8 md:last:col-span-2 md:last:w-[calc(50%-0.75rem)] md:last:justify-self-center lg:last:col-span-1 lg:last:w-full ${styles.cardColor}`}
            >
              <div
                aria-hidden="true"
                className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl text-2xl ring-1 ring-white/80 ${styles.iconColor}`}
              >
                {category.imageUrl ? (
                  <Image
                    src={category.imageUrl}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  category.icon
                )}
              </div>

              <h3 className="mt-6 text-2xl font-black tracking-tight text-[#23182f]">
                {category.name}
              </h3>

              <p className="mt-3 flex-1 leading-7 text-gray-600">
                {category.description}
              </p>

              <a
                href="#menu"
                onClick={(event) => {
                  event.preventDefault();
                  selectMenuCategory(category.name);
                }}
                className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-5 py-2.5 text-sm font-black text-purple-700 transition hover:border-purple-300 hover:bg-white hover:text-purple-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                {category.buttonText}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
