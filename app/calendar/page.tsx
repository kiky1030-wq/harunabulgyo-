import CalendarView from "@/components/CalendarView";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "독경 달력 — 하루하나불교",
  description: "매일 방문한 날과 사경을 완료한 날을 달력으로 확인하세요.",
};

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a] flex flex-col">
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between flex-shrink-0">
        <Link href="/" className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity">
          하루하나불교
        </Link>
        <Link href="/" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
          ← 오늘의 경전
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <p className="text-[12px] tracking-[0.2em] uppercase text-[#1a1a1a] mb-12">독경 달력</p>
        <CalendarView />
      </main>

      <footer className="px-4 sm:px-8 pb-10 flex-shrink-0">
        <div className="w-full h-px bg-[#d5d2cf] mb-6" />
        <p className="text-center text-[12px] text-[#1a1a1a] tracking-[0.06em]">© 하루하나불교</p>
      </footer>
    </div>
  );
}
