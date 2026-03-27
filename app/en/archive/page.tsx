import { getAllSutras } from "@/lib/sutra";
import Link from "next/link";

export const metadata = {
  title: "Buddhist Scripture Archive — LotusRead",
  description: "Browse all 365 Buddhist scripture passages from the Dhammapada, Diamond Sutra, Heart Sutra, Avatamsaka Sutra, Sutta Nipata, and Vimalakirti Sutra.",
  keywords: ["buddhist scriptures", "dhammapada passages", "diamond sutra quotes", "heart sutra", "buddhist archive", "daily dharma"],
};

export default function EnArchivePage() {
  const sutras = getAllSutras();

  const byMonth: Record<string, typeof sutras> = {};
  for (const s of sutras) {
    const month = s.date.split("-")[0];
    if (!byMonth[month]) byMonth[month] = [];
    byMonth[month].push(s);
  }

  const monthNames: Record<string, string> = {
    "01": "January", "02": "February", "03": "March", "04": "April",
    "05": "May", "06": "June", "07": "July", "08": "August",
    "09": "September", "10": "October", "11": "November", "12": "December",
  };

  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a]">

      {/* NAV */}
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
        <Link href="/en" className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity">
          LotusRead
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/archive" className="text-[12px] text-[#1a1a1a] tracking-[0.04em] border border-[#1a1a1a] px-2 py-0.5 hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors">KO</Link>
          <span className="text-[13px] text-[#1a1a1a] tracking-[0.04em]">Archive</span>
        </div>
      </nav>

      {/* HEADER */}
      <header className="px-4 sm:px-8 pt-6 sm:pt-8 pb-10 sm:pb-16">
        <p className="text-[11px] tracking-[0.25em] text-[#555] uppercase mb-4">Archive</p>
        <h1
          className="font-light leading-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          All Scriptures.
        </h1>
      </header>

      {/* DIVIDER */}
      <div className="h-px bg-[#d5d2cf] mx-4 sm:mx-8 mb-8 sm:mb-12" />

      {/* LIST BY MONTH */}
      <main className="px-4 sm:px-8 pb-16 sm:pb-20">
        {Object.entries(byMonth).map(([month, list]) => (
          <div key={month} className="mb-10 sm:mb-14">
            <p className="text-[11px] tracking-[0.25em] text-[#555] uppercase mb-4 sm:mb-6">
              {monthNames[month] ?? `Month ${month}`}
            </p>
            <div className="space-y-0">
              {list.map((sutra) => {
                const [, d] = sutra.date.split("-");
                return (
                  <Link
                    key={sutra.id}
                    href={`/en/sutra/${sutra.date}`}
                    className="group flex items-baseline gap-3 sm:gap-6 py-4 sm:py-5 border-b border-[#d5d2cf] hover:border-[#1a1a1a] transition-colors"
                  >
                    <span className="text-[12px] text-[#666] w-7 sm:w-8 flex-shrink-0">
                      {d}
                    </span>
                    <span className="hidden sm:inline text-[11px] tracking-[0.15em] text-[#555] uppercase w-32 flex-shrink-0">
                      {sutra.source}
                    </span>
                    <p className="font-light text-[#1a1a1a] leading-snug truncate flex-1 text-[0.9rem] sm:text-[1rem]">
                      {(sutra.english ?? sutra.korean).split("\n")[0]}
                    </p>
                    <span className="text-[12px] text-[#999] group-hover:text-[#1a1a1a] transition-colors flex-shrink-0">
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
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">One scripture a day</span>
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">© LotusRead</span>
      </footer>
    </div>
  );
}
