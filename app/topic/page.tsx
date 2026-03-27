import { TOPICS, getSutrasByTopic } from "@/lib/sutra";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotusread.com";

export const metadata: Metadata = {
  title: "주제별 경전 — 하루하나불교",
  description: "마음, 자비, 지혜, 행복, 인연, 무상 등 주제별로 모은 불교 경전 구절 모음. 원하는 주제의 불교 명언을 찾아보세요.",
  keywords: ["불교 명언 주제별", "마음 불교 명언", "자비 불교", "지혜 불교 경전", "행복 불교 글귀", "불교 좋은글 모음"],
  alternates: { canonical: `${BASE_URL}/topic` },
  openGraph: {
    title: "주제별 경전 — 하루하나불교",
    description: "마음, 자비, 지혜, 행복, 인연 등 주제별로 모은 불교 경전 구절 모음.",
    url: `${BASE_URL}/topic`,
    type: "website",
    siteName: "하루하나불교",
  },
};

export default function TopicIndexPage() {
  const topics = Object.entries(TOPICS).map(([key, data]) => ({
    key,
    ...data,
    count: getSutrasByTopic(key).length,
  }));

  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a]">
      {/* NAV */}
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
        <Link href="/" className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity">
          하루하나불교
        </Link>
        <Link href="/archive" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
          아카이브
        </Link>
      </nav>

      {/* HEADER */}
      <header className="px-4 sm:px-8 pt-6 sm:pt-8 pb-10 sm:pb-16">
        <p className="text-[11px] tracking-[0.25em] text-[#555] uppercase mb-4">By Topic</p>
        <h1
          className="font-light leading-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          주제별 경전.
        </h1>
        <p className="text-[14px] text-[#555] mt-4">원하는 주제의 불교 경전 구절을 찾아보세요.</p>
      </header>

      <div className="h-px bg-[#d5d2cf] mx-4 sm:mx-8 mb-8 sm:mb-12" />

      {/* TOPIC GRID */}
      <main className="px-4 sm:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {topics.map(({ key, label, description, count }) => (
            <Link
              key={key}
              href={`/topic/${encodeURIComponent(key)}`}
              className="group py-6 sm:py-8 pr-8 border-b border-[#d5d2cf] hover:border-[#1a1a1a] transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-[1.3rem] sm:text-[1.6rem] font-light">{label}</h2>
                <span className="text-[12px] text-[#999] group-hover:text-[#1a1a1a] transition-colors ml-4">
                  {count}개 →
                </span>
              </div>
              <p className="text-[13px] text-[#666] mt-2 leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>
      </main>

      <div className="h-px bg-[#d5d2cf] mx-4 sm:mx-8" />
      <footer className="px-4 sm:px-8 py-6 flex items-center justify-between">
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">매일 하나의 경전</span>
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">© 하루하나불교</span>
      </footer>
    </div>
  );
}
