import Image from "next/image";

const favorites = [
  {
    name: "Taro Milk Tea",
    label: "Customer Favorite",
    description:
      "Creamy taro milk tea with chewy boba and a smooth, perfectly sweet flavor.",
    image: "/images/hero/taro.png",
    imageAlt: "Taro Milk Tea from Bubble House Nutrition",
  },
  {
    name: "Strawberry Cheesecake",
    label: "Sweet & Creamy",
    description:
      "A creamy strawberry cheesecake-inspired drink with a rich and refreshing finish.",
    image: "/images/hero/strawberry-chesecake.png",
    imageAlt: "Strawberry Cheesecake drink from Bubble House Nutrition",
  },
  {
    name: "Protein Waffle",
    label: "Perfect Breakfast",
    description:
      "A freshly prepared protein waffle topped with fruit and delicious flavor.",
    image: "/images/hero/protein-waffle.png",
    imageAlt: "Protein Waffle from Bubble House Nutrition",
  },
] as const;

export default function BestSellers() {
  return (
    <section id="favorites" className="bg-[#fcfaf7] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-purple-600 sm:text-sm">
            Bubble House Favorites
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#23182f] sm:text-5xl">
            Customer favorites
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover three of our most-loved Bubble House creations.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-fr items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {favorites.map((favorite) => (
            <article
              key={favorite.name}
              className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-purple-100/90 bg-white shadow-[0_12px_36px_rgba(50,30,70,0.07)] transition duration-300 ease-out hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_20px_48px_rgba(50,30,70,0.11)] md:last:col-span-2 md:last:w-[calc(50%-0.75rem)] md:last:justify-self-center lg:last:col-span-1 lg:last:w-full"
            >
              <div className="relative h-72 shrink-0 overflow-hidden bg-[#f8f5f1] sm:h-80 md:h-72 lg:h-80">
                <span className="absolute left-5 top-5 z-10 rounded-full border border-purple-100/80 bg-[#fffdfb]/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-purple-700 shadow-[0_6px_18px_rgba(76,29,149,0.08)] backdrop-blur-sm">
                  {favorite.label}
                </span>

                <Image
                  src={favorite.image}
                  alt={favorite.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-contain p-2 transition duration-500 ease-out group-hover:scale-[1.025]"
                />
              </div>

              <div className="flex flex-1 flex-col border-t border-purple-50 p-6 sm:p-7">
                <h3 className="text-2xl font-black tracking-tight text-[#23182f]">
                  {favorite.name}
                </h3>

                <p className="mt-2 flex-1 leading-7 text-gray-600">
                  {favorite.description}
                </p>

                <a
                  href="#menu"
                  className="mt-4 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-black text-purple-700 transition-colors hover:text-purple-900 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
                >
                  View menu
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
