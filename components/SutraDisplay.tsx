"use client";

import { useState, useEffect } from "react";
import FontSizeButton, { FontSize, fontSizeStyle } from "./FontSizeButton";
import { Sutra } from "@/lib/sutra";

const STORAGE_KEY = "harunabulgyo-font-size";
const sizes: FontSize[] = ["sm", "md", "lg"];

interface Props {
  sutra: Sutra;
  lang?: "ko" | "en";
  actions?: React.ReactNode; // AudioButton, KakaoShareButton, ShareButton 등
  left?: React.ReactNode;    // PushNotificationButton 등
  badge?: React.ReactNode;   // StreakBadge 등 텍스트 위 가운데 배치
  copyright?: React.ReactNode;
}

export default function SutraDisplay({ sutra, lang = "ko", actions, left, badge, copyright }: Props) {
  const text = lang === "en" ? (sutra.english ?? sutra.korean) : sutra.korean;
  const note = lang === "en" ? (sutra.english_commentary ?? sutra.commentary) : sutra.commentary;
  const [fontSize, setFontSize] = useState<FontSize>("md");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as FontSize | null;
    if (saved && sizes.includes(saved)) setFontSize(saved);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10 sm:py-20">
        <div className="max-w-4xl w-full text-center">
          {badge && (
            <div className="flex justify-center mb-6 sm:mb-8">
              {badge}
            </div>
          )}
          <blockquote>
            <p
              className="font-light text-[#1a1a1a] whitespace-pre-line"
              style={{ fontSize: fontSizeStyle[fontSize], letterSpacing: "-0.01em", lineHeight: "1.4" }}
            >
              {text}
            </p>
          </blockquote>
        </div>
      </main>

      {/* ── 하단 메타 ── */}
      <footer className="px-4 sm:px-8 pb-10 sm:pb-12 flex-shrink-0">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[12px] text-[#1a1a1a] tracking-[0.2em] uppercase mb-3">
            {sutra.source}{sutra.chapter ? `  ·  ${sutra.chapter}` : ""}
          </p>
          <p className="text-[14px] sm:text-[15px] text-[#1a1a1a] leading-relaxed max-w-md mx-auto">
            {note}
          </p>
          {sutra.original && (
            <p className="text-[12px] text-[#1a1a1a] tracking-widest mt-5">
              {sutra.original}
            </p>
          )}
        </div>

        <div className="w-full h-px bg-[#d5d2cf] mb-6 sm:mb-8" />

        <div className="flex items-center justify-between sm:justify-between">
          {left ?? <span />}
          <div className="flex items-center gap-2">
            <FontSizeButton onChange={setFontSize} />
            {actions}
          </div>
          {copyright ?? <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">{lang === "en" ? "© LotusRead" : "© 하루하나불교"}</span>}
        </div>
      </footer>
    </>
  );
}
