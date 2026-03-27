import { getAllSutras } from "@/lib/sutra";
import Link from "next/link";

export const metadata = {
  title: "불교 경전 구절 모음 — 하루하나불교 아카이브",
  description: "법구경, 금강경, 반야심경, 화엄경, 숫타니파타, 유마경의 구절 모음. 날짜별로 정리된 불교 명언과 마음 평안을 주는 경전 글귀 아카이브.",
  keywords: ["불교 경전 모음", "불교 명언 모음", "법구경 구절", "금강경 구절", "반야심경 구절", "불교 글귀 모음", "경전 아카이브"],
};

export default function ArchivePage() {
  const sutras = getAllSutras();

  const byMonth: Record<string, typeof sutras> = {};
  for (const s of sutras) {
    const month = s.date.split("-")[0];
    if (!byMonth[month]) byMonth[month] = [];
    byMonth[month].push(s);
  }

  const monthNames: Record<string, string> = {
    "01": "1월", "02": "2월", "03": "3월", "04": "4월",
    "05": "5월", "06": "6월", "07": "7월", "08": "8월",
    "09": "9월", "10": "10월", "11": "11월", "12": "12월",
  };

  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a]">

      {/* NAV */}
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
        <Link href="/" className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity">
          하루하나불교
        </Link>
        <span className="text-[13px] text-[#1a1a1a] tracking-[0.04em]">경전 아카이브</span>
      </nav>

      {/* HEADER */}
      <header className="px-4 sm:px-8 pt-6 sm:pt-8 pb-10 sm:pb-16">
        <p className="text-[11px] tracking-[0.25em] text-[#888] uppercase mb-4">Archive</p>
        <h1
          className="font-light leading-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          모든 경전.
        </h1>
      </header>

      {/* DIVIDER */}
      <div className="h-px bg-[#d5d2cf] mx-4 sm:mx-8 mb-8 sm:mb-12" />

      {/* LIST BY MONTH */}
      <main className="px-4 sm:px-8 pb-16 sm:pb-20">
        {Object.entries(byMonth).map(([month, list]) => (
          <div key={month} className="mb-10 sm:mb-14">
            <p className="text-[11px] tracking-[0.25em] text-[#888] uppercase mb-4 sm:mb-6">
              {monthNames[month] ?? `${month}월`}
            </p>
            <div className="space-y-0">
              {list.map((sutra) => {
                const [, d] = sutra.date.split("-");
                return (
                  <Link
                    key={sutra.id}
                    href={`/sutra/${sutra.date}`}
                    className="group flex items-baseline gap-3 sm:gap-6 py-4 sm:py-5 border-b border-[#d5d2cf] hover:border-[#1a1a1a] transition-colors"
                  >
                    <span className="text-[12px] text-[#aaa] w-7 sm:w-8 flex-shrink-0">
                      {d}일
                    </span>
                    <span className="hidden sm:inline text-[11px] tracking-[0.15em] text-[#888] uppercase w-20 flex-shrink-0">
                      {sutra.source}
                    </span>
                    <p
                      className="font-light text-[#1a1a1a] leading-snug truncate flex-1 text-[0.9rem] sm:text-[1rem]"
                    >
                      {sutra.korean.split("\n")[0]}
                    </p>
                    <span className="text-[12px] text-[#ccc] group-hover:text-[#1a1a1a] transition-colors flex-shrink-0">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <div className="h-px bg-[#d5d2cf] mx-4 sm:mx-8" />
      <footer className="px-4 sm:px-8 py-6 flex items-center justify-between">
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">매일 하나의 경전</span>
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">© 하루하나불교</span>
      </footer>
    </div>
  );
}
