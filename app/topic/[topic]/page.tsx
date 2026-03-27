import { getSutrasByTopic, getAllTopics, TOPICS } from "@/lib/sutra";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotusread.com";

export function generateStaticParams() {
  return getAllTopics().map((topic) => ({ topic: encodeURIComponent(topic) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: encodedTopic } = await params;
  const topic = decodeURIComponent(encodedTopic);
  const topicData = TOPICS[topic];
  if (!topicData) return {};

  const title = `${topicData.label} — 불교 경전 구절 모음`;
  const description = `${topicData.description}. 법구경, 금강경, 반야심경 등 다양한 경전에서 모은 ${topicData.label} 관련 명언 모음.`;

  return {
    title,
    description,
    keywords: [
      topicData.label,
      `${topicData.label} 불교 명언`,
      `불교 ${topicData.label}`,
      `${topicData.label}에 관한 불교 말씀`,
      "불교 경전", "불교 명언", "불교 글귀",
    ],
    alternates: { canonical: `${BASE_URL}/topic/${encodedTopic}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/topic/${encodedTopic}`,
      type: "website",
      siteName: "하루하나불교",
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: encodedTopic } = await params;
  const topic = decodeURIComponent(encodedTopic);
  const topicData = TOPICS[topic];
  if (!topicData) notFound();

  const sutras = getSutrasByTopic(topic);

  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a]">
      {/* NAV */}
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
        <Link href="/" className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity">
          하루하나불교
        </Link>
        <Link href="/topic" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
          ← 주제 목록
        </Link>
      </nav>

      {/* HEADER */}
      <header className="px-4 sm:px-8 pt-6 sm:pt-8 pb-10 sm:pb-16">
        <p className="text-[11px] tracking-[0.25em] text-[#555] uppercase mb-4">Topic</p>
        <h1
          className="font-light leading-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          {topicData.label}.
        </h1>
        <p className="text-[14px] text-[#555] mt-4">{topicData.description}</p>
        <p className="text-[13px] text-[#888] mt-2">{sutras.length}개 구절</p>
      </header>

      <div className="h-px bg-[#d5d2cf] mx-4 sm:mx-8 mb-8 sm:mb-12" />

      {/* LIST */}
      <main className="px-4 sm:px-8 pb-16 sm:pb-20">
        {sutras.length === 0 ? (
          <p className="text-[#888] text-[14px]">해당 주제의 구절이 없습니다.</p>
        ) : (
          <div className="space-y-0">
            {sutras.map((sutra) => {
              const [month, day] = sutra.date.split("-");
              return (
                <Link
                  key={sutra.id}
                  href={`/sutra/${sutra.date}`}
                  className="group flex items-baseline gap-3 sm:gap-6 py-4 sm:py-5 border-b border-[#d5d2cf] hover:border-[#1a1a1a] transition-colors"
                >
                  <span className="text-[12px] text-[#666] w-14 flex-shrink-0">
                    {month}월 {day}일
                  </span>
                  <span className="hidden sm:inline text-[11px] tracking-[0.15em] text-[#555] uppercase w-28 flex-shrink-0">
                    {sutra.source}
                  </span>
                  <p className="font-light text-[#1a1a1a] leading-snug truncate flex-1 text-[0.9rem] sm:text-[1rem]">
                    {sutra.korean.split("\n")[0]}
                  </p>
                  <span className="text-[12px] text-[#999] group-hover:text-[#1a1a1a] transition-colors flex-shrink-0">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <div className="h-px bg-[#d5d2cf] mx-4 sm:mx-8" />
      <footer className="px-4 sm:px-8 py-6 flex items-center justify-between">
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">매일 하나의 경전</span>
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">© 하루하나불교</span>
      </footer>
    </div>
  );
}
