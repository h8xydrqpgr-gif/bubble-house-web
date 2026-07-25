import Image from "next/image";
import type {
  BusinessInfoContent,
  FooterContent,
} from "@/types/site-content";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Favorites", href: "#favorites" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit Us", href: "#visit" },
] as const;

const linkStyles =
  "w-fit text-purple-100 transition hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300";

export default function Footer({
  business,
  content,
}: {
  business: BusinessInfoContent;
  content: FooterContent;
}) {
  const socialLinks = [
    ...business.socialLinks.map((link) => ({
      label: link.label,
      href: link.url,
    })),
    { label: "Apple Maps", href: business.appleMapsUrl },
    { label: "Google Maps", href: business.googleMapsUrl },
  ].filter((link) => Boolean(link.href));

  return (
    <footer className="bg-[#211929] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:pt-20 lg:px-8">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-[1.25fr_0.75fr_1fr_0.85fr]">
          <section aria-labelledby="footer-brand">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                <Image
                  src="/images/logobb.png"
                  alt={`${business.name} logo`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <h2 id="footer-brand" className="text-xl font-black leading-tight">
                {business.name}
              </h2>
            </div>

            <p className="mt-5 max-w-sm leading-7 text-purple-100/80">
              {content.description}
            </p>
          </section>

          <nav aria-labelledby="footer-navigation">
            <h2
              id="footer-navigation"
              className="text-sm font-black uppercase tracking-[0.16em] text-white"
            >
              Quick Links
            </h2>

            <ul className="mt-5 space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkStyles}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-contact">
            <h2
              id="footer-contact"
              className="text-sm font-black uppercase tracking-[0.16em] text-white"
            >
              Visit &amp; Contact
            </h2>

            <div className="mt-5 space-y-5 text-purple-100/80">
              {business.googleMapsUrl && (
                <address className="not-italic leading-7">
                  <a
                    href={business.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`${linkStyles} inline-block`}
                  >
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state}{" "}
                    {business.address.zip}
                  </a>
                </address>
              )}

              <a
                href={`tel:${business.phoneLink}`}
                className={`${linkStyles} block font-semibold`}
              >
                {business.phone}
              </a>

              <dl className="space-y-2 text-sm leading-6">
                {business.businessHours.map((row) => (
                  <div key={row.label}>
                    <dt className="font-bold text-white">{row.label}</dt>
                    <dd>{row.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <nav aria-labelledby="footer-social">
            <h2
              id="footer-social"
              className="text-sm font-black uppercase tracking-[0.16em] text-white"
            >
              Follow Us
            </h2>

            <ul className="mt-5 space-y-3.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${linkStyles} inline-flex items-center gap-2`}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-xs text-purple-300">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-center text-sm text-purple-200/70 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {business.name}.{" "}
            {content.copyrightText}
          </p>
          <p>{content.closingText}</p>
        </div>
      </div>
    </footer>
  );
}
