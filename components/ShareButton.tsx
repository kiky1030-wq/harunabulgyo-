"use client";

import { Sutra } from "@/lib/sutra";

interface Props {
  sutra: Sutra;
}

export default function ShareButton({ sutra }: Props) {
  const handleShare = () => {
    const text = `오늘의 경전 — ${sutra.source}\n\n${sutra.korean}\n\n${sutra.commentary}`;

    if (navigator.share) {
      navigator.share({ title: "오늘의 경전", text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("오늘의 경전이 복사되었습니다.");
      });
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-5 py-2.5 border border-[#1a1a1a] text-[#1a1a1a] text-[12px] tracking-[0.12em] hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      공유하기
    </button>
  );
}
