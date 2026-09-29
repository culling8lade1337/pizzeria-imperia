import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollPizza } from "@/components/ScrollPizza";
import { HOURS, SITE } from "@/data/site";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Figtree({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const description = "Handcrafted pizzas, fresh ingredients and honest prices — made for Copenhagen. Pizzeria Imperia, Nørre Farimagsgade 68.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Pizzeria Imperia — Pizza in Copenhagen", template: "%s | Pizzeria Imperia" },
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "Pizzeria Imperia — Pizza in Copenhagen", description, url: SITE.url, siteName: SITE.name, locale: "en_DK", type: "website", images: [{ url: "/images/hero.jpg", width: 1200, height: 1500, alt: "Pizza from Pizzeria Imperia" }] },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#FBF7F0" };

const dayIds = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.name, url: SITE.url, telephone: "+4533120050",
  servesCuisine: "Italian", priceRange: "kr.",
  image: `${SITE.url}/images/hero.jpg`,
  address: { "@type": "PostalAddress", streetAddress: SITE.street, postalCode: SITE.postalCode, addressLocality: SITE.city, addressCountry: "DK" },
  openingHoursSpecification: HOURS.filter((h) => h.open).map((h) => ({
    "@type": "OpeningHoursSpecification", dayOfWeek: dayIds.find((d) => d === h.day), opens: h.open, closes: h.close })),
  hasMenu: `${SITE.url}/menu`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollPizza />
      </body>
    </html>
  );
}
