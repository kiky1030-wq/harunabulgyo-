import { getTodaySutra } from "@/lib/sutra";
import ShareButton from "@/components/ShareButton";
import KakaoShareButton from "@/components/KakaoShareButton";
import PushNotificationButton from "@/components/PushNotificationButton";
import AudioButton from "@/components/AudioButton";
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
      <nav className="px-8 py-6 flex items-center justify-between flex-shrink-0">
        <span className="text-[13px] font-medium tracking-[0.08em]">하루하나불교</span>
        <div className="flex items-center gap-6">
          <Link href="/archive" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
            아카이브
          </Link>
          <Link href="/about" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
            소개
          </Link>
          <span className="text-[13px] text-[#1a1a1a] tracking-[0.04em]">{today}</span>
        </div>
      </nav>

      {/* ── HERO: 구절이 화면 정중앙 ── */}
      <main className="flex-1 flex items-center justify-center px-8 py-20">
        <div className="max-w-4xl w-full text-center">
          <blockquote>
            <p
              className="font-light leading-tight text-[#1a1a1a] whitespace-pre-line"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.2rem)", letterSpacing: "-0.01em", lineHeight: "1.35" }}
            >
              {sutra.korean}
            </p>
          </blockquote>
        </div>
      </main>

      {/* ── 하단 메타 정보 ── */}
      <footer className="px-8 pb-12 flex-shrink-0">
        {/* 출처 + 해설 — 중앙 정렬 */}
        <div className="text-center mb-10">
          <p className="text-[12px] text-[#1a1a1a] tracking-[0.2em] uppercase mb-3">
            {sutra.source}{sutra.chapter ? `  ·  ${sutra.chapter}` : ""}
          </p>
          <p className="text-[15px] text-[#1a1a1a] leading-relaxed max-w-md mx-auto">
            {sutra.commentary}
          </p>
          {sutra.original && (
            <p className="text-[12px] text-[#1a1a1a] tracking-widest mt-5">
              {sutra.original}
            </p>
          )}
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-[#d5d2cf] mb-8" />

        {/* 공유 + 저작 */}
        <div className="flex items-center justify-between">
          <PushNotificationButton />
          <div className="flex items-center gap-3">
            <AudioButton text={sutra.korean} />
            <KakaoShareButton sutra={sutra} />
            <ShareButton sutra={sutra} />
          </div>
          <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">© 하루하나불교</span>
        </div>
      </footer>

    </div>
  );
}
