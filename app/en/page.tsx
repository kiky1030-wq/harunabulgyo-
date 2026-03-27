import { getTodaySutra } from "@/lib/sutra";
import ShareButton from "@/components/ShareButton";
import AudioButton from "@/components/AudioButton";
import SutraDisplay from "@/components/SutraDisplay";
import StreakBadge from "@/components/StreakBadge";
import NavMenu from "@/components/NavMenu";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotusread.com";

export const metadata: Metadata = {
  alternates: { canonical: `${BASE_URL}/en` },
  title: "LotusRead — Daily Buddhist Scripture",
  description: "Start each day with one Buddhist scripture passage. Timeless wisdom from the Dhammapada, Diamond Sutra, Heart Sutra, and more for inner peace.",
};

export default function EnHome() {
  const sutra = getTodaySutra();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LotusRead",
    "alternateName": "하루하나불교",
    "url": `${BASE_URL}/en`,
    "description": "Start each day with one Buddhist scripture passage. Timeless wisdom from the Dhammapada, Diamond Sutra, Heart Sutra, and more.",
    "inLanguage": "en",
    "keywords": "buddhist quotes, daily buddhism, dhammapada, heart sutra, diamond sutra, mindfulness, inner peace",
    "publisher": {
      "@type": "Organization",
      "name": "LotusRead",
      "url": `${BASE_URL}/en`,
    },
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── NAV ── */}
      <nav className="relative px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between flex-shrink-0">
        <Link href="/en" className="text-[13px] font-medium tracking-[0.08em]">LotusRead</Link>
        <NavMenu today={today} lang="en" />
      </nav>

      <SutraDisplay
        sutra={sutra}
        lang="en"
        left={<StreakBadge lang="en" />}
        actions={
          <>
            <AudioButton text={sutra.english ?? sutra.korean} />
            <ShareButton sutra={sutra} />
          </>
        }
      />
    </div>
  );
}
