import MeditationTimer from "@/components/MeditationTimer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "명상 타이머 — 하루하나불교",
  description: "경전을 읽은 후 잠시 눈을 감고 명상하세요. 1분부터 20분까지 선택할 수 있는 명상 타이머.",
};

export default function TimerPage() {
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
        <p className="text-[12px] tracking-[0.2em] uppercase text-[#888] mb-12">명상 타이머</p>
        <MeditationTimer />
      </main>

      <footer className="px-4 sm:px-8 pb-10 flex-shrink-0">
        <div className="w-full h-px bg-[#d5d2cf] mb-6" />
        <p className="text-center text-[12px] text-[#1a1a1a] tracking-[0.06em]">© 하루하나불교</p>
      </footer>
    </div>
  );
}
