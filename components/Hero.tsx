import Image from "next/image";
import type {
  BusinessInfoContent,
  HeroContent,
} from "@/types/site-content";

export default function Hero({
  hero,
  business,
}: {
  hero: HeroContent;
  business: BusinessInfoContent;
}) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#faf7ff] via-white to-white"
    >
      {/* Background Blobs */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-16 lg:min-h-[780px] lg:grid-cols-2 lg:px-8">

        {/* LEFT */}
        <div>
          <div className="inline-flex items-center rounded-full border border-purple-200 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-purple-700 shadow-sm">
            {hero.eyebrow}
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[0.95] text-[#23182f] sm:text-6xl lg:text-7xl">
            {hero.headlineLineOne}
            <br />
            {hero.headlineLineTwo}
            <span className="block bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent">
              {hero.headlineHighlight}
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
            {hero.supportingText}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={hero.primaryButton.destination}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-purple-700 px-8 py-4 font-bold text-white transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
            >
              {hero.primaryButton.text}
            </a>

            <a
              href={hero.secondaryButton.destination || business.orderingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-purple-300 bg-white px-8 py-4 font-bold text-purple-700 transition hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
            >
              {hero.secondaryButton.text}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 font-semibold text-gray-600">
            {hero.trustPoints.map((point) => (
              <span key={point}>✓ {point}</span>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center">

          <Image
            src={hero.imageUrl}
            alt={hero.imageAlt}
            width={640}
            height={760}
            priority
            className="w-full max-w-[560px] drop-shadow-[0_40px_60px_rgba(0,0,0,.28)] transition duration-500 hover:scale-105"
          />

          <div className="absolute right-0 top-8 rounded-2xl bg-[#23182f] px-5 py-4 text-white shadow-2xl">
            <p className="text-[10px] uppercase tracking-[0.18em] text-yellow-300">
              {hero.imageBadgeEyebrow}
            </p>

            <p className="mt-1 text-sm font-bold">
              {hero.imageBadgeText}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
