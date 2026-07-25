import type {
  BenefitContent,
  SectionContent,
} from "@/types/site-content";

export default function WhyBubbleHouse({
  section,
  benefits,
}: {
  section: SectionContent;
  benefits: readonly BenefitContent[];
}) {
  return (
    <section className="bg-[#fbf9ff] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="text-center max-w-3xl mx-auto">

          <p className="text-sm font-black uppercase tracking-[0.25em] text-purple-600">
            {section.eyebrow}
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
            {section.title}
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            {section.description}
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
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
