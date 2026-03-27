import { getSutraByDate, getAllSutras, getPrevNextSutra, SOURCE_NAMES_EN } from "@/lib/sutra";
import ShareButton from "@/components/ShareButton";
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
  const sourceEn = SOURCE_NAMES_EN[sutra.source] ?? sutra.source;
  const firstLine = (sutra.english ?? sutra.korean).split("\n")[0];
  const title = `${sourceEn} · ${month}/${day} — LotusRead`;
  const description = `${firstLine} — ${sourceEn}${sutra.chapter ? ` ${sutra.chapter}` : ""}. ${sutra.english_commentary ?? sutra.commentary}`;

  return {
    title,
    description,
    keywords: [sourceEn, "buddhist quote", "buddhist scripture", "inner peace", `${sourceEn} passage`, "daily dharma"],
    alternates: {
      canonical: `${BASE_URL}/en/sutra/${date}`,
      languages: {
        "en": `${BASE_URL}/en/sutra/${date}`,
        "ko": `${BASE_URL}/sutra/${date}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/en/sutra/${date}`,
      type: "article",
      siteName: "LotusRead",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function EnSutraDetailPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const sutra = getSutraByDate(date);
  if (!sutra) notFound();
  const { prev, next } = getPrevNextSutra(date);

  const sourceEn = SOURCE_NAMES_EN[sutra.source] ?? sutra.source;
  const [month, day] = date.split("-");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "text": sutra.english ?? sutra.korean,
    "abstract": sutra.english_commentary ?? sutra.commentary,
    "isPartOf": {
      "@type": "Book",
      "name": sourceEn,
      "inLanguage": "en",
    },
    "url": `${BASE_URL}/en/sutra/${date}`,
    "publisher": {
      "@type": "Organization",
      "name": "LotusRead",
      "url": `${BASE_URL}/en`,
    },
  };

  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a] flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAV */}
      <nav className="px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between flex-shrink-0">
        <Link href="/en" className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity">
          LotusRead
        </Link>
        <div className="flex items-center gap-4">
          <Link href={`/sutra/${date}`} className="text-[12px] text-[#1a1a1a] tracking-[0.04em] border border-[#1a1a1a] px-2 py-0.5 hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors">KO</Link>
          <Link href="/en/archive" className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity">
            ← Archive
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10 sm:py-20">
        <div className="max-w-4xl w-full text-center">
          <p className="text-[12px] text-[#555] tracking-[0.2em] uppercase mb-8 sm:mb-10">
            {sourceEn} · {month}/{day}
          </p>
          <blockquote>
            <p
              className="font-light leading-tight text-[#1a1a1a] whitespace-pre-line"
              style={{ fontSize: "clamp(1.28rem, 4.4vw, 3.36rem)", letterSpacing: "-0.01em", lineHeight: "1.4" }}
            >
              {sutra.english ?? sutra.korean}
            </p>
          </blockquote>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-4 sm:px-8 pb-10 sm:pb-12 flex-shrink-0">
        <div className="text-center mb-8 sm:mb-10">
          <Link
            href={`/en/source/${encodeURIComponent(sutra.source)}`}
            className="text-[12px] text-[#1a1a1a] tracking-[0.2em] uppercase mb-3 hover:opacity-60 transition-opacity inline-block"
          >
            {sourceEn}{sutra.chapter ? `  ·  ${sutra.chapter}` : ""}
          </Link>
          <p className="text-[14px] sm:text-[15px] text-[#1a1a1a] leading-relaxed max-w-md mx-auto">
            {sutra.english_commentary ?? sutra.commentary}
          </p>
          {sutra.original && (
            <p className="text-[12px] text-[#1a1a1a] tracking-widest mt-5">
              {sutra.original}
            </p>
          )}
        </div>

        <div className="w-full h-px bg-[#d5d2cf] mb-6 sm:mb-8" />

        {/* Prev/Next */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          {prev ? (
            <Link
              href={`/en/sutra/${prev.date}`}
              className="flex items-center gap-2 text-[12px] text-[#555] hover:text-[#1a1a1a] transition-colors"
            >
              <span>←</span>
              <span className="hidden sm:inline">{prev.date.replace("-", "/")}</span>
              <span className="sm:hidden">Prev</span>
            </Link>
          ) : <span />}
          <ShareButton sutra={sutra} />
          {next ? (
            <Link
              href={`/en/sutra/${next.date}`}
              className="flex items-center gap-2 text-[12px] text-[#555] hover:text-[#1a1a1a] transition-colors"
            >
              <span className="hidden sm:inline">{next.date.replace("-", "/")}</span>
              <span className="sm:hidden">Next</span>
              <span>→</span>
            </Link>
          ) : <span />}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">One scripture a day</span>
          <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">© LotusRead</span>
        </div>
      </footer>
    </div>
  );
}
