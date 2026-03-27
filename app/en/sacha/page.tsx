import { getTodaySutra } from "@/lib/sutra";
import SachaNote from "@/components/SachaNote";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scripture Writing — LotusRead",
  description: "Copy today's scripture passage by hand. This meditative practice of transcription helps calm and focus the mind.",
};

export default function EnSachaPage() {
  const sutra = getTodaySutra();

  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a] flex flex-col">
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between flex-shrink-0">
        <Link href="/en" className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity">
          LotusRead
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/sacha" className="text-[12px] text-[#1a1a1a] tracking-[0.04em] border border-[#1a1a1a] px-2 py-0.5 hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors">KO</Link>
          <Link href="/en" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
            ← Today&apos;s Scripture
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <p className="text-[12px] tracking-[0.2em] uppercase text-[#555] mb-12">Scripture Writing</p>
        <SachaNote
          sutra={sutra.english ?? sutra.korean}
          dateKey={sutra.date}
          standalone
          lang="en"
        />
      </main>

      <footer className="px-4 sm:px-8 pb-10 flex-shrink-0">
        <div className="w-full h-px bg-[#d5d2cf] mb-6" />
        <p className="text-center text-[12px] text-[#1a1a1a] tracking-[0.06em]">© LotusRead</p>
      </footer>
    </div>
  );
}
