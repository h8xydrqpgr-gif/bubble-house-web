const benefits = [
  {
    icon: "✨",
    title: "Made Fresh",
    text: "Every drink is prepared fresh when you order.",
  },
  {
    icon: "💜",
    title: "Made With Care",
    text: "Friendly service and quality in every visit.",
  },
  {
    icon: "🧋",
    title: "Premium Ingredients",
    text: "Quality ingredients for bold flavors you'll love.",
  },
  {
    icon: "🚗",
    title: "Delivery Available",
    text: "Enjoy Bubble House at home with DoorDash.",
  },
];

export default function WhyBubbleHouse() {
  return (
    <section className="bg-[#fbf9ff] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">

          <p className="text-sm font-black uppercase tracking-[0.25em] text-purple-600">
            Why Bubble House?
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
            More than a drink.
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Every drink is handcrafted with attention to detail, premium
            ingredients and friendly service.
          </p>

        </div>

        <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-4">

          {benefits.map((item) => (

            <div
              key={item.title}
              className="rounded-[2rem] bg-white border border-purple-100 p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="text-4xl">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-black">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
