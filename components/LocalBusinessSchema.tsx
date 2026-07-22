import { business } from "@/data/business";

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

export default function LocalBusinessSchema() {
  const mondaySaturday = parseHours(business.hours.mondaySaturday);
  const sunday = parseHours(business.hours.sunday);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: business.name,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: mondaySaturday.opens,
        closes: mondaySaturday.closes,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: sunday.opens,
        closes: sunday.closes,
      },
    ],
    hasMap: business.maps.google,
    sameAs: [business.social.facebook, business.social.yelp].filter(Boolean),
  };

  const jsonLd = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
