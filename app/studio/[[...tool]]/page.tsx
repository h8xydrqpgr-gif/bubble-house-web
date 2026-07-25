import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import { isSanityConfigured } from "@/sanity/env";
import config from "@/sanity.config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Bubble House Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export { viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main
        style={{
          display: "grid",
          minHeight: "100vh",
          placeItems: "center",
          padding: "2rem",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <section style={{ maxWidth: "42rem", textAlign: "center" }}>
          <h1>Sanity Studio is not configured</h1>
          <p>
            Add the variables documented in .env.example, then restart the
            development server.
          </p>
        </section>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
