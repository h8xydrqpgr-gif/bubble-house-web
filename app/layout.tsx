import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { getSiteContent } from "@/sanity/lib/get-site-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { business, settings } = await getSiteContent();
  const images = settings.openGraphImageUrl
    ? [
        {
          url: settings.openGraphImageUrl,
          alt: settings.openGraphImageAlt,
        },
      ]
    : undefined;

  return {
    title: {
      default: settings.websiteTitle,
      template: `%s | ${business.name}`,
    },
    applicationName: business.name,
    description: settings.metaDescription,
    authors: [{ name: business.name }],
    creator: business.name,
    publisher: business.name,
    category: "Food & Drink",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: settings.openGraphTitle,
      description: settings.openGraphDescription,
      images,
      locale: "en_US",
      type: "website",
      siteName: business.name,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.openGraphTitle,
      description: settings.openGraphDescription,
      images: settings.openGraphImageUrl
        ? [settings.openGraphImageUrl]
        : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { business } = await getSiteContent();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocalBusinessSchema business={business} />
        {children}
      </body>
    </html>
  );
}
