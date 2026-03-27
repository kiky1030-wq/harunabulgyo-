"use client";

import { useState, useEffect } from "react";

export type FontSize = "sm" | "md" | "lg";

const STORAGE_KEY = "harunabulgyo-font-size";

const labels: Record<FontSize, string> = { sm: "가", md: "가", lg: "가" };
const sizes: FontSize[] = ["sm", "md", "lg"];

// 각 크기별 clamp 값
export const fontSizeStyle: Record<FontSize, string> = {
  sm: "clamp(1.2rem, 4vw, 3rem)",
  md: "clamp(1.6rem, 5.5vw, 4.2rem)",
  lg: "clamp(2rem, 7vw, 5.5rem)",
};

interface Props {
  onChange?: (size: FontSize) => void;
}

export function useFontSize(): FontSize {
  const [size, setSize] = useState<FontSize>("md");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as FontSize | null;
    if (saved && sizes.includes(saved)) setSize(saved);
  }, []);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && sizes.includes(e.newValue as FontSize)) {
        setSize(e.newValue as FontSize);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return size;
}

export default function FontSizeButton({ onChange }: Props) {
  const [size, setSize] = useState<FontSize>("md");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as FontSize | null;
    if (saved && sizes.includes(saved)) setSize(saved);
  }, []);

  const cycle = () => {
    const next = sizes[(sizes.indexOf(size) + 1) % sizes.length];
    setSize(next);
    localStorage.setItem(STORAGE_KEY, next);
    onChange?.(next);
    // StorageEvent는 같은 탭에선 발생 안 하므로 커스텀 이벤트로 동기화
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: next }));
  };

  const textSizes = { sm: "text-[11px]", md: "text-[13px]", lg: "text-[16px]" };

  return (
    <button
      onClick={cycle}
      aria-label="글씨 크기 조절"
      title={`현재: ${size === "sm" ? "작게" : size === "md" ? "보통" : "크게"} → 클릭하면 변경`}
      className="flex items-center gap-1.5 px-3 sm:px-5 py-2.5 border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors select-none"
    >
      <span className={`font-medium leading-none ${textSizes[size]}`}>가</span>
      <span className="hidden sm:inline text-[12px] tracking-[0.12em]">
        {size === "sm" ? "작게" : size === "md" ? "보통" : "크게"}
      </span>
    </button>
  );
}
