import Link from "next/link";

export const metadata = {
  title: "About — LotusRead | Daily Buddhist Scripture",
  description: "LotusRead offers one Buddhist scripture passage every day to bring peace of mind. Timeless wisdom from the Dhammapada, Diamond Sutra, Heart Sutra, and more.",
  keywords: ["about lotusread", "buddhist scripture service", "inner peace", "daily buddhist quotes", "mindfulness app"],
};

export default function EnAboutPage() {
  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a]">

      {/* NAV */}
      <nav className="px-8 py-6 flex items-center justify-between">
        <Link
          href="/en"
          className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity"
        >
          LotusRead
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-[12px] text-[#1a1a1a] tracking-[0.04em] border border-[#1a1a1a] px-2 py-0.5 hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors">KO</Link>
          <span className="text-[13px] text-[#1a1a1a] tracking-[0.04em]">About</span>
        </div>
      </nav>

      {/* OPENING */}
      <header className="px-8 pt-16 pb-24 max-w-4xl">
        <p className="text-[11px] tracking-[0.25em] text-[#555] uppercase mb-8">About</p>
        <h1
          className="font-light leading-tight text-[#1a1a1a]"
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: "1.25",
          }}
        >
          I built this<br />for myself<br />first.
        </h1>
      </header>

      <div className="h-px bg-[#d5d2cf] mx-8" />

      {/* STORY SECTION 1 */}
      <section className="px-8 py-20 max-w-2xl">
        <p className="text-[11px] tracking-[0.25em] text-[#555] uppercase mb-8">01</p>
        <p
          className="font-light text-[#1a1a1a] leading-loose"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", lineHeight: "2" }}
        >
          These days, anxiety and uncertainty seem to be everywhere.
          <br /><br />
          Every morning I woke up feeling anxious.
          <br />
          What might happen today?
          <br />
          How should I be living my life?
          <br /><br />
          My eyes kept drifting to others instead of myself.
          <br />
          I felt my mind slowly fraying at the edges.
        </p>
      </section>

      <div className="h-px bg-[#d5d2cf] mx-8" />

      {/* STORY SECTION 2 */}
      <section className="px-8 py-20">
        <p className="text-[11px] tracking-[0.25em] text-[#555] uppercase mb-12">02</p>

        <p
          className="font-light text-[#1a1a1a] leading-loose max-w-2xl mb-16"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", lineHeight: "2" }}
        >
          Then one day,
          <br />
          I came across a line from a Buddhist scripture
          <br />
          and felt a quiet calm settle over me.
        </p>

        <blockquote className="border-l-2 border-[#1a1a1a] pl-8 my-12 max-w-xl">
          <p
            className="font-light text-[#1a1a1a] leading-loose"
            style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", lineHeight: "1.7" }}
          >
            "The lotus rises from the mud
            <br />
            yet is not stained by it."
          </p>
          <p className="text-[12px] text-[#555] tracking-[0.15em] uppercase mt-4">— Dhammapada</p>
        </blockquote>

        <p
          className="font-light text-[#1a1a1a] leading-loose max-w-2xl mt-16"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", lineHeight: "2" }}
        >
          So I started building.
          <br />
          At first, just for me.
        </p>
      </section>

      <div className="h-px bg-[#d5d2cf] mx-8" />

      {/* STORY SECTION 3 */}
      <section className="px-8 py-20 max-w-2xl">
        <p className="text-[11px] tracking-[0.25em] text-[#555] uppercase mb-8">03</p>
        <p
          className="font-light text-[#1a1a1a] leading-loose"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", lineHeight: "2" }}
        >
          Then I looked around and realized
          <br />
          there were so many people feeling the same way.
          <br /><br />
          I hoped that others around me —
          <br />
          and anyone who found their way here —
          <br />
          might find even a small sense of peace.
          <br /><br />
          And so
          <br />
          <span className="font-medium">LotusRead</span> was born.
        </p>
      </section>

      <div className="h-px bg-[#d5d2cf] mx-8" />

      {/* CLOSING */}
      <section className="px-8 py-24 text-center">
        <p
          className="font-light text-[#1a1a1a] mb-12"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em", lineHeight: "1.4" }}
        >
          Just for a moment today,
          <br />
          let your mind rest.
        </p>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#1a1a1a] text-[#1a1a1a] text-[13px] tracking-[0.12em] hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors"
        >
          Today&apos;s Scripture →
        </Link>
      </section>

      {/* FOOTER */}
      <div className="h-px bg-[#d5d2cf] mx-8" />
      <footer className="px-8 py-6 flex items-center justify-between">
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">One scripture a day</span>
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">© LotusRead</span>
      </footer>

    </div>
  );
}
