import type { BusinessInfoContent } from "@/types/site-content";

function to24Hour(time: string) {
  const match = time.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);

  if (!match) {
    return time;
  }

  const [, hourValue, minutes, period] = match;
  let hour = Number(hourValue);

  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  if (period === "PM" && hour !== 12) {
    hour += 12;
  }

  return `${hour.toString().padStart(2, "0")}:${minutes}`;
}

function parseHours(hours: string) {
  const [opens, closes] = hours.split(" - ");

  return {
    opens: to24Hour(opens),
    closes: to24Hour(closes),
  };
}

export default function LocalBusinessSchema({
  business,
}: {
  business: BusinessInfoContent;
}) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: business.name,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: business.businessHours.map((row) => {
      const parsed = parseHours(row.hours);

      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: row.schemaDays,
        opens: parsed.opens,
        closes: parsed.closes,
      };
    }),
    hasMap: business.googleMapsUrl,
    sameAs: business.socialLinks.map((link) => link.url).filter(Boolean),
  };

  const jsonLd = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
