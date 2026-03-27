import { getSutraByDate, getAllSutras } from "@/lib/sutra";
import ShareButton from "@/components/ShareButton";
import KakaoShareButton from "@/components/KakaoShareButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotusread.com";

export function generateStaticParams() {
  return getAllSutras().map((s) => ({ date: s.date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const sutra = getSutraByDate(date);
  if (!sutra) return {};

  const [month, day] = date.split("-");
  const firstLine = sutra.korean.split("\n")[0];
  const title = `${month}월 ${day}일 ${sutra.source} 구절 — 하루하나불교`;
  const description = `${firstLine} — ${sutra.source}${sutra.chapter ? ` ${sutra.chapter}` : ""}. ${sutra.commentary}`;

  return {
    title,
    description,
    keywords: [sutra.source, "불교 명언", "불교 경전 구절", "마음 평안", `${sutra.source} 구절`, "불교 글귀", "buddhist quotes"],
    alternates: { canonical: `${BASE_URL}/sutra/${date}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/sutra/${date}`,
      type: "article",
      siteName: "하루하나불교",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function SutraDetailPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const sutra = getSutraByDate(date);
  if (!sutra) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "text": sutra.korean,
    "abstract": sutra.commentary,
    "isPartOf": {
      "@type": "Book",
      "name": sutra.source,
      "inLanguage": "ko",
    },
    "description": sutra.commentary,
    "url": `${BASE_URL}/sutra/${date}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/sutra/${date}`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "하루하나불교",
      "url": BASE_URL,
    },
  };

  const [month, day] = date.split("-");

  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAV */}
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between flex-shrink-0">
        <Link href="/" className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity">
          하루하나불교
        </Link>
        <Link href="/archive" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
          ← 아카이브
        </Link>
      </nav>

      {/* HERO */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10 sm:py-20">
        <div className="max-w-4xl w-full text-center">
          <p className="text-[12px] text-[#888] tracking-[0.2em] uppercase mb-8 sm:mb-10">
            {month}월 {day}일의 경전
          </p>
          <blockquote>
            <p
              className="font-light leading-tight text-[#1a1a1a] whitespace-pre-line"
              style={{ fontSize: "clamp(1.6rem, 5.5vw, 4.2rem)", letterSpacing: "-0.01em", lineHeight: "1.4" }}
            >
              {sutra.korean}
            </p>
          </blockquote>
        </div>
      </main>

      {/* 하단 메타 */}
      <footer className="px-4 sm:px-8 pb-10 sm:pb-12 flex-shrink-0">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[12px] text-[#1a1a1a] tracking-[0.2em] uppercase mb-3">
            {sutra.source}{sutra.chapter ? `  ·  ${sutra.chapter}` : ""}
          </p>
          <p className="text-[14px] sm:text-[15px] text-[#1a1a1a] leading-relaxed max-w-md mx-auto">
            {sutra.commentary}
          </p>
          {sutra.original && (
            <p className="text-[12px] text-[#1a1a1a] tracking-widest mt-5">
              {sutra.original}
            </p>
          )}
        </div>

        <div className="w-full h-px bg-[#d5d2cf] mb-6 sm:mb-8" />

        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">매일 하나의 경전</span>
          <div className="flex items-center gap-2">
            <KakaoShareButton sutra={sutra} />
            <ShareButton sutra={sutra} />
          </div>
          <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">© 하루하나불교</span>
        </div>
      </footer>
    </div>
  );
}
