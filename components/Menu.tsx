"use client";

import { useState } from "react";
import type { MenuCategory, MenuProduct } from "@/types/menu";

function formatPrice(price: number) {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

export default function Menu({
  categories,
  drinks,
}: {
  categories: readonly MenuCategory[];
  drinks: readonly MenuProduct[];
}) {
  const filters = ["All", ...categories.map((category) => category.name)];
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleDrinks =
    activeFilter === "All"
      ? drinks
      : drinks.filter((drink) => drink.category === activeFilter);

  return (
    <section id="menu" className="bg-[#fcfaf7] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-purple-600 sm:text-sm">
            Our Menu
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#23182f] sm:text-5xl">
            Find your new favorite
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Explore refreshing teas, creamy shakes, milk teas, coffee, waffles
            and delicious add-ons.
          </p>
        </div>

        <div
          aria-label="Filter menu by category"
          className="-mx-5 mt-10 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0"
        >
          <div className="mx-auto flex w-max min-w-full gap-2 lg:justify-center">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 ${
                    isActive
                      ? "border-purple-700 bg-purple-700 text-white shadow-sm"
                      : "border-purple-100 bg-white text-gray-700 hover:border-purple-300 hover:text-purple-700"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visibleDrinks.length} menu items for {activeFilter}.
        </p>

        <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleDrinks.map((drink) => (
            <article
              key={drink.id}
              className="group flex h-full flex-col rounded-[1.75rem] border border-purple-100/90 bg-white p-6 shadow-[0_10px_30px_rgba(50,30,70,0.05)] transition duration-300 ease-out hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_18px_42px_rgba(50,30,70,0.1)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">
                    {drink.category}
                  </p>
                  <h3 className="mt-2 text-xl font-black tracking-tight text-[#23182f]">
                    {drink.name}
                  </h3>
                </div>

                <p className="shrink-0 rounded-full bg-[#f5effd] px-3 py-1.5 text-sm font-black text-purple-800">
                  {formatPrice(drink.price)}
                </p>
              </div>

              <p className="mt-3 flex-1 leading-7 text-gray-600">
                {drink.description}
              </p>

              {drink.featured && (
                <p className="mt-5 w-fit rounded-full border border-purple-100 bg-[#faf7ff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-purple-700">
                  Popular
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
