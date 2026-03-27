import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotusread.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "LotusRead — Daily Buddhist Scripture",
    template: "%s — LotusRead",
  },
  description: "Start each day with one Buddhist scripture passage. Timeless wisdom from the Dhammapada, Diamond Sutra, Heart Sutra, and more.",
  keywords: [
    "buddhist quotes", "daily buddhism", "buddhist scriptures",
    "dhammapada quotes", "heart sutra", "diamond sutra",
    "mindfulness quotes", "buddhist wisdom", "zen quotes",
    "daily dharma", "buddhist meditation", "buddhist sayings",
    "spiritual quotes", "inner peace quotes", "buddhist teachings",
    "sutta nipata", "avatamsaka sutra", "vimalakirti sutra",
  ],
  authors: [{ name: "LotusRead" }],
  creator: "LotusRead",
  openGraph: {
    title: "LotusRead — Daily Buddhist Scripture",
    description: "Start each day with one Buddhist scripture passage. Wisdom from the Dhammapada, Diamond Sutra, Heart Sutra, and more.",
    url: `${BASE_URL}/en`,
    siteName: "LotusRead",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "LotusRead — Daily Buddhist Scripture",
    description: "Start each day with one Buddhist scripture passage.",
  },
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: {
      "en": `${BASE_URL}/en`,
      "ko": BASE_URL,
    },
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
