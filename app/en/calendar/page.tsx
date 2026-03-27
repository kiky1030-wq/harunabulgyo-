import CalendarView from "@/components/CalendarView";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Calendar — LotusRead",
  description: "Track the days you have visited and completed scripture writing practice on your monthly calendar.",
};

export default function EnCalendarPage() {
  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a] flex flex-col">
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between flex-shrink-0">
        <Link href="/en" className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity">
          LotusRead
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/calendar" className="text-[12px] text-[#1a1a1a] tracking-[0.04em] border border-[#1a1a1a] px-2 py-0.5 hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors">KO</Link>
          <Link href="/en" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
            ← Today&apos;s Scripture
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <p className="text-[12px] tracking-[0.2em] uppercase text-[#1a1a1a] mb-12">Reading Calendar</p>
        <CalendarView lang="en" />
      </main>

      <footer className="px-4 sm:px-8 pb-10 flex-shrink-0">
        <div className="w-full h-px bg-[#d5d2cf] mb-6" />
        <p className="text-center text-[12px] text-[#1a1a1a] tracking-[0.06em]">© LotusRead</p>
      </footer>
    </div>
  );
}
