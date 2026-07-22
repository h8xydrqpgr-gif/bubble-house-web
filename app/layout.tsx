import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { business } from "@/data/business";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Bubble House Nutrition | Boba, Loaded Teas & Protein Shakes in Lexington, KY",
    template: `%s | ${business.name}`,
  },
  applicationName: business.name,
  description:
    "Visit Bubble House Nutrition in Lexington, Kentucky for refreshing loaded teas, creamy milk teas with boba, protein shakes, protein coffee and freshly prepared waffles.",
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
    title: "Bubble House Nutrition in Lexington, KY",
    description:
      "Refreshing teas, creamy shakes, boba, coffee and waffles made fresh in Lexington, Kentucky.",
    locale: "en_US",
    type: "website",
    siteName: business.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bubble House Nutrition in Lexington, KY",
    description:
      "Refreshing teas, creamy shakes, boba, coffee and waffles made fresh in Lexington, Kentucky.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}
