import { business } from "@/data/business";

export default function VisitUs() {
  return (
    <section id="visit" className="bg-[#fcfaf7] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-purple-600 sm:text-sm">
            Visit Bubble House
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#23182f] sm:text-5xl">
            Come see us
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Stop by for your favorite drinks, shakes, coffee and waffles.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-7">
          <article className="rounded-[2rem] border border-purple-100/90 bg-white p-7 shadow-[0_14px_40px_rgba(50,30,70,0.07)] sm:p-9">
            <h3 className="text-2xl font-black tracking-tight text-[#23182f]">
              {business.name}
            </h3>

            <div className="mt-7 divide-y divide-purple-100">
              <div className="flex gap-4 pb-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4edff] text-purple-700">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
                    />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>

                <div>
                  <h4 className="text-sm font-black uppercase tracking-[0.14em] text-purple-700">
                    Address
                  </h4>
                  <address className="mt-2 not-italic leading-7 text-gray-600">
                    {business.address}
                    <br />
                    {business.city}, {business.state} {business.zip}
                  </address>
                </div>
              </div>

              <div className="flex gap-4 py-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4edff] text-purple-700">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.2 3.5 4.8 5.2c-.8.6-1.1 1.6-.8 2.5 1.7 5.8 6.5 10.6 12.3 12.3.9.3 1.9 0 2.5-.8l1.7-2.4a1.5 1.5 0 0 0-.4-2.1l-3.4-2.1a1.5 1.5 0 0 0-1.9.3l-1 1.2a13 13 0 0 1-3.9-3.9l1.2-1a1.5 1.5 0 0 0 .3-1.9L9.3 3.9a1.5 1.5 0 0 0-2.1-.4Z"
                    />
                  </svg>
                </div>

                <div>
                  <h4 className="text-sm font-black uppercase tracking-[0.14em] text-purple-700">
                    Phone
                  </h4>
                  <a
                    href={`tel:${business.phoneLink}`}
                    className="mt-2 block font-semibold text-gray-600 transition hover:text-purple-700 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4edff] text-purple-700">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="8.5" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7.5V12l3 2"
                    />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-black uppercase tracking-[0.14em] text-purple-700">
                    Hours
                  </h4>
                  <dl className="mt-2 space-y-2 text-gray-600">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                      <dt>Monday – Saturday</dt>
                      <dd className="font-semibold text-[#352b40]">
                        {business.hours.mondaySaturday}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                      <dt>Sunday</dt>
                      <dd className="font-semibold text-[#352b40]">
                        {business.hours.sunday}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${business.phoneLink}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-purple-700 px-6 py-3 text-sm font-black text-white transition hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                Call us
              </a>

              {business.delivery.doordash && (
                <a
                  href={business.delivery.doordash}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-purple-200 bg-white px-6 py-3 text-sm font-black text-purple-700 transition hover:border-purple-300 hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                >
                  Order online
                </a>
              )}
            </div>
          </article>

          <aside className="relative flex min-h-[390px] overflow-hidden rounded-[2rem] border border-purple-100/90 bg-[#f4effa] shadow-[0_14px_40px_rgba(50,30,70,0.07)] sm:min-h-[460px]">
            <svg
              aria-hidden="true"
              viewBox="0 0 700 520"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full text-purple-300/45"
            >
              <path
                d="M-40 90C90 40 160 170 285 120s190-30 270 55 150 60 205 20M-50 350c105-70 180-40 265 15s170 70 265 5 170-55 260 15M150-30c-25 110 55 155 15 260s-20 205 70 320M510-40c-75 110-20 190 25 265s25 165-30 330"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M10 230 690 80M30 470 670 270"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="10 12"
              />
            </svg>

            <div className="relative m-auto flex max-w-sm flex-col items-center px-6 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-purple-700 shadow-[0_12px_30px_rgba(76,29,149,0.14)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
                  />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-purple-600">
                Find us in {business.city}
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-[#23182f]">
                Your next favorite is nearby
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                {business.address}, {business.city}, {business.state} {business.zip}
              </p>

              <a
                href={business.maps.google}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#23182f] px-7 py-3 text-sm font-black text-white transition hover:bg-purple-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                Open in Google Maps
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
