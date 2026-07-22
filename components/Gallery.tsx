import Image from "next/image";

const images = [
  "/images/drink.jpeg",
  "/images/drink.jpeg",
  "/images/drink.jpeg",
  "/images/drink.jpeg",
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-purple-600">
            Gallery
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            Crafted to impress.
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Every drink is made fresh and prepared with attention to every
            detail.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-[2rem]"
            >
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt="Bubble House Drink"
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
