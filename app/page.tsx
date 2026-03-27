import { getTodaySutra } from "@/lib/sutra";
import ShareButton from "@/components/ShareButton";
import KakaoShareButton from "@/components/KakaoShareButton";
import PushNotificationButton from "@/components/PushNotificationButton";
import AudioButton from "@/components/AudioButton";
import SutraDisplay from "@/components/SutraDisplay";
import StreakBadge from "@/components/StreakBadge";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotusread.com";

export const metadata: Metadata = {
  alternates: { canonical: BASE_URL },
  title: "하루하나불교 — 오늘의 불교 경전 구절",
  description: "오늘의 불교 경전 구절. 법구경, 금강경, 반야심경, 화엄경 중 마음 평안을 주는 구절을 매일 만나보세요. Daily Buddhist quotes for inner peace.",
};

export default function Home() {
  const sutra = getTodaySutra();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "하루하나불교",
    "alternateName": "LotusRead",
    "url": BASE_URL,
    "description": "매일 하나의 불교 경전 구절로 하루를 시작하세요. 법구경, 금강경, 반야심경, 화엄경의 마음 평안을 주는 명언 모음.",
    "inLanguage": "ko",
    "keywords": "불교 명언, 불교 경전, 법구경, 금강경, 반야심경, 마음 평안, buddhist quotes, daily dharma",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE_URL}/archive`,
      "query-input": "required name=search_term_string",
    },
    "publisher": {
      "@type": "Organization",
      "name": "하루하나불교",
      "url": BASE_URL,
    },
  };

  const today = new Date().toLocaleDateString("ko-KR", {
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
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between flex-shrink-0">
        <span className="text-[13px] font-medium tracking-[0.08em]">하루하나불교</span>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/archive" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
            아카이브
          </Link>
          <Link href="/about" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
            소개
          </Link>
          <span className="hidden sm:inline text-[13px] text-[#1a1a1a] tracking-[0.04em]">{today}</span>
        </div>
      </nav>

      <SutraDisplay
        sutra={sutra}
        left={
          <div className="flex flex-col gap-2">
            <StreakBadge />
            <PushNotificationButton />
          </div>
        }
        actions={
          <>
            <AudioButton text={sutra.korean} />
            <KakaoShareButton sutra={sutra} />
            <ShareButton sutra={sutra} />
          </>
        }
      />

    </div>
  );
}
