"use client";

import Image from "next/image";
import { useState } from "react";
import type { BusinessInfoContent } from "@/types/site-content";

const links = [
  { name: "Home", href: "#home" },
  { name: "Menu", href: "#menu" },
  { name: "Favorites", href: "#favorites" },
  { name: "Gallery", href: "#gallery" },
  { name: "Visit Us", href: "#visit" },
];

export default function Navbar({
  business,
  announcementText,
  orderButtonText,
}: {
  business: BusinessInfoContent;
  announcementText: string;
  orderButtonText: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const businessNameParts = business.name.trim().split(/\s+/);
  const businessNameSuffix = businessNameParts.pop() || business.name;
  const businessNamePrimary =
    businessNameParts.join(" ") || businessNameSuffix;

  return (
    <>
      <div className="bg-purple-700 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-white">
        {announcementText}
      </div>

      <header className="sticky top-0 z-50 border-b border-purple-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a
            href="#home"
            className="flex items-center gap-3 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/logobb.png"
                alt={`${business.name} logo`}
                fill
                priority
                className="object-cover"
                sizes="56px"
              />
            </div>

            <div>
              <p className="text-lg font-black leading-none text-[#241b2f]">
                {businessNamePrimary}
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-purple-600">
                {businessNameSuffix}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-gray-700 transition hover:text-purple-700 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={business.orderingUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-11 rounded-full bg-purple-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 sm:block"
            >
              {orderButtonText}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-200 bg-white text-2xl text-purple-700 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 lg:hidden"
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-purple-100 bg-white px-5 py-5 shadow-xl lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-purple-50 py-4 text-base font-black text-[#241b2f] transition hover:text-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                >
                  {link.name}
                </a>
              ))}

              <a
                href={business.orderingUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-5 rounded-full bg-purple-600 px-6 py-4 text-center text-sm font-black text-white shadow-lg shadow-purple-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 sm:hidden"
              >
                {orderButtonText}
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
