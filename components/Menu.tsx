"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import BoosterCard from "@/components/BoosterCard";
import type { MenuCategory, MenuProduct } from "@/types/menu";

interface ActiveImage {
  src: string;
  alt: string;
  productName: string;
}

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
  const [activeImage, setActiveImage] = useState<ActiveImage>();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageDialogTitleId = useId();
  const lastImageTriggerRef = useRef<HTMLButtonElement | null>(null);

  const visibleDrinks =
    activeFilter === "All"
      ? drinks
      : drinks.filter((drink) => drink.category === activeFilter);

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveImage(undefined);
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastImageTriggerRef.current?.focus();
    };
  }, [activeImage]);

  return (
    <section id="menu" className="bg-[#fcfaf7] py-20 sm:py-24">
      <div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        aria-hidden={activeImage ? true : undefined}
        inert={activeImage ? true : undefined}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-purple-600 sm:text-sm">
            Our Menu
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#23182f] sm:text-5xl">
            Find your new favorite
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Explore refreshing teas, creamy shakes, milk teas, coffee, waffles,
            delicious add-ons and wellness boosters.
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
          {visibleDrinks.map((drink) =>
            drink.category === "Boosters" ? (
              <BoosterCard
                key={drink.id}
                product={drink}
                formattedPrice={formatPrice(drink.price)}
              />
            ) : (
            <article
              key={drink.id}
              className="group flex h-full flex-col rounded-[1.75rem] border border-purple-100/90 bg-white p-6 shadow-[0_10px_30px_rgba(50,30,70,0.05)] transition duration-300 ease-out hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_18px_42px_rgba(50,30,70,0.1)]"
            >
              <div className="flex items-start justify-between gap-4">
                {drink.imageUrl && (
                  <button
                    type="button"
                    className="relative size-20 shrink-0 cursor-zoom-in rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                    aria-label={`View larger image of ${drink.name}`}
                    aria-haspopup="dialog"
                    onClick={(event) => {
                      lastImageTriggerRef.current = event.currentTarget;
                      setActiveImage({
                        src: drink.imageUrl!,
                        alt: drink.imageAlt || drink.name,
                        productName: drink.name,
                      });
                    }}
                  >
                    <Image
                      src={drink.imageUrl}
                      alt={drink.imageAlt || drink.name}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 right-0 grid size-6 place-items-center rounded-full bg-white/95 text-purple-700 shadow-sm"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="size-3.5"
                      >
                        <circle cx="11" cy="11" r="6" />
                        <path d="m16 16 4 4M11 8v6M8 11h6" />
                      </svg>
                    </span>
                  </button>
                )}

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
            ),
          )}
        </div>
      </div>

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={imageDialogTitleId}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveImage(undefined);
            }
          }}
        >
          <h2 id={imageDialogTitleId} className="sr-only">
            Large image of {activeImage.productName}
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close image"
            onClick={() => setActiveImage(undefined)}
            className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-black/70 text-white shadow-lg transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-6"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div className="relative h-[82dvh] max-h-[48rem] w-[92vw] max-w-4xl touch-auto">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(max-width: 768px) 92vw, 1024px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
