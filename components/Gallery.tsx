"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  GalleryItemContent,
  SectionContent,
} from "@/types/site-content";

function GalleryImage({
  item,
  featured = false,
  onOpen,
}: {
  item: GalleryItemContent;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative flex w-full items-center justify-center overflow-hidden rounded-[2rem] bg-purple-50/50 p-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500 focus-visible:ring-offset-4 sm:p-4 ${
        featured ? "" : "min-h-64 sm:min-h-80"
      }`}
      aria-label={`Open ${item.alt} in fullscreen gallery`}
    >
      <Image
        src={item.imageUrl}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes={
          featured
            ? "(max-width: 1279px) 100vw, 1216px"
            : "(max-width: 767px) 100vw, 50vw"
        }
        className={`h-auto w-auto max-w-full object-contain transition duration-500 group-hover:scale-[1.02] ${
          featured ? "max-h-[46rem]" : "max-h-[38rem]"
        }`}
      />
      <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-purple-700 shadow-lg backdrop-blur">
        View image
      </span>
    </button>
  );
}

export default function Gallery({
  section,
  items,
}: {
  section: SectionContent;
  items: readonly GalleryItemContent[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const featuredIndex = Math.max(
    0,
    items.findIndex((item) => item.isFeatured),
  );
  const featuredItem = items[featuredIndex];
  const remainingItems = items.filter((_, index) => index !== featuredIndex);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + items.length) % items.length,
    );
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % items.length,
    );
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPrevious();
      } else if (event.key === "ArrowRight") {
        showNext();
      } else if (event.key === "Tab") {
        const dialog = closeButtonRef.current?.closest('[role="dialog"]');
        const controls = dialog?.querySelectorAll<HTMLElement>("button");

        if (!controls?.length) {
          return;
        }

        const first = controls[0];
        const last = controls[controls.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  const openLightbox = (index: number) => {
    lastTriggerRef.current = document.activeElement as HTMLElement;
    setActiveIndex(index);
  };

  return (
    <section id="gallery" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-purple-600">
            {section.eyebrow}
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            {section.title}
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            {section.description}
          </p>
        </div>

        {featuredItem ? (
          <div className="mt-10 sm:mt-14">
            <GalleryImage
              item={featuredItem}
              featured
              onOpen={() => openLightbox(featuredIndex)}
            />

            {remainingItems.length > 0 ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {remainingItems.map((item) => {
                  const itemIndex = items.findIndex(
                    (candidate) => candidate.id === item.id,
                  );

                  return (
                    <GalleryImage
                      key={item.id}
                      item={item}
                      onOpen={() => openLightbox(itemIndex)}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {activeIndex !== null && items[activeIndex] ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 grid size-12 place-items-center rounded-full bg-white text-2xl text-gray-950 shadow-xl transition hover:bg-purple-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-400 sm:right-8 sm:top-8"
            aria-label="Close gallery"
          >
            <span aria-hidden="true">×</span>
          </button>

          {items.length > 1 ? (
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-3xl text-gray-950 shadow-xl transition hover:bg-purple-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-400 sm:left-8"
              aria-label="Previous gallery image"
            >
              <span aria-hidden="true">‹</span>
            </button>
          ) : null}

          <div className="relative h-[82vh] w-[calc(100vw-2rem)] max-w-7xl touch-auto sm:w-[calc(100vw-8rem)]">
            <Image
              src={items[activeIndex].imageUrl}
              alt={items[activeIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {items.length > 1 ? (
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-3xl text-gray-950 shadow-xl transition hover:bg-purple-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-400 sm:right-8"
              aria-label="Next gallery image"
            >
              <span aria-hidden="true">›</span>
            </button>
          ) : null}

          <p
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white"
            aria-live="polite"
          >
            {activeIndex + 1} / {items.length}
          </p>
        </div>
      ) : null}
    </section>
  );
}
