import Image from "next/image";
import type {
  GalleryItemContent,
  SectionContent,
} from "@/types/site-content";

export default function Gallery({
  section,
  items,
}: {
  section: SectionContent;
  items: readonly GalleryItemContent[];
}) {
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

        <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-[2rem]"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
