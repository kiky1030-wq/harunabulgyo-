import { getTodaySutra, getAllSources, getAllTopics, TOPICS } from "@/lib/sutra";
import ShareButton from "@/components/ShareButton";
import KakaoShareButton from "@/components/KakaoShareButton";
import PushNotificationButton from "@/components/PushNotificationButton";
import AudioButton from "@/components/AudioButton";
import SutraDisplay from "@/components/SutraDisplay";
import StreakBadge from "@/components/StreakBadge";
import NavMenu from "@/components/NavMenu";
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
  const sources = getAllSources();
  const topics = getAllTopics();

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
      <nav className="relative px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between flex-shrink-0">
        <Link href="/" className="text-[13px] font-medium tracking-[0.08em]">하루하나불교</Link>
        <NavMenu today={today} />
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

      {/* 내부 링크 섹션 */}
      <section className="px-4 sm:px-8 pb-16 border-t border-[#d5d2cf] mt-0">
        <div className="pt-10 sm:pt-12 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16">
          {/* 경전별 */}
          <div>
            <p className="text-[11px] tracking-[0.2em] text-[#888] uppercase mb-5">경전별</p>
            <div className="flex flex-wrap gap-2">
              {sources.map((src) => (
                <Link
                  key={src}
                  href={`/source/${encodeURIComponent(src)}`}
                  className="text-[13px] text-[#1a1a1a] border border-[#d5d2cf] px-3 py-1.5 hover:border-[#1a1a1a] transition-colors"
                >
                  {src}
                </Link>
              ))}
            </div>
          </div>

          {/* 주제별 */}
          <div>
            <p className="text-[11px] tracking-[0.2em] text-[#888] uppercase mb-5">주제별</p>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Link
                  key={topic}
                  href={`/topic/${encodeURIComponent(topic)}`}
                  className="text-[13px] text-[#1a1a1a] border border-[#d5d2cf] px-3 py-1.5 hover:border-[#1a1a1a] transition-colors"
                >
                  {TOPICS[topic].label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
