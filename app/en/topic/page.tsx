import { TOPICS_EN, getSutrasByTopic } from "@/lib/sutra";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotusread.com";

export const metadata: Metadata = {
  title: "Buddhist Scriptures By Topic — LotusRead",
  description: "Browse Buddhist scripture passages by topic: Mind, Compassion, Wisdom, Happiness, Karma, Impermanence, and Practice.",
  keywords: ["buddhist wisdom by topic", "mind buddhist quotes", "compassion buddhism", "wisdom buddhist scripture", "happiness buddhist", "impermanence"],
  alternates: {
    canonical: `${BASE_URL}/en/topic`,
    languages: {
      "en": `${BASE_URL}/en/topic`,
      "ko": `${BASE_URL}/topic`,
    },
  },
};

export default function EnTopicIndexPage() {
  const topics = Object.entries(TOPICS_EN).map(([key, data]) => ({
    key,
    ...data,
    count: getSutrasByTopic(key).length,
  }));

  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a]">
      {/* NAV */}
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
        <Link href="/en" className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity">
          LotusRead
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/topic" className="text-[12px] text-[#1a1a1a] tracking-[0.04em] border border-[#1a1a1a] px-2 py-0.5 hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors">KO</Link>
          <Link href="/en/archive" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
            Archive
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <header className="px-4 sm:px-8 pt-6 sm:pt-8 pb-10 sm:pb-16">
        <p className="text-[11px] tracking-[0.25em] text-[#555] uppercase mb-4">By Topic</p>
        <h1
          className="font-light leading-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          Topics.
        </h1>
        <p className="text-[14px] text-[#555] mt-4">Find scripture passages by theme.</p>
      </header>

      <div className="h-px bg-[#d5d2cf] mx-4 sm:mx-8 mb-8 sm:mb-12" />

      {/* TOPIC GRID */}
      <main className="px-4 sm:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {topics.map(({ key, label, description, count }) => (
            <Link
              key={key}
              href={`/en/topic/${encodeURIComponent(key)}`}
              className="group py-6 sm:py-8 pr-8 border-b border-[#d5d2cf] hover:border-[#1a1a1a] transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-[1.3rem] sm:text-[1.6rem] font-light">{label}</h2>
                <span className="text-[12px] text-[#999] group-hover:text-[#1a1a1a] transition-colors ml-4">
                  {count} →
                </span>
              </div>
              <p className="text-[13px] text-[#666] mt-2 leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>
      </main>

      <div className="h-px bg-[#d5d2cf] mx-4 sm:mx-8" />
      <footer className="px-4 sm:px-8 py-6 flex items-center justify-between">
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">One scripture a day</span>
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">© LotusRead</span>
      </footer>
    </div>
  );
}
