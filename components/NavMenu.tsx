"use client";

import { useState } from "react";
import Link from "next/link";

const koLinks = [
  { href: "/sacha",    label: "사경" },
  { href: "/timer",    label: "명상" },
  { href: "/calendar", label: "달력" },
  { href: "/topic",    label: "주제별" },
  { href: "/archive",  label: "아카이브" },
  { href: "/about",    label: "소개" },
];

const enLinks = [
  { href: "/en/sacha",    label: "Writing" },
  { href: "/en/timer",    label: "Meditation" },
  { href: "/en/calendar", label: "Calendar" },
  { href: "/en/topic",    label: "By Topic" },
  { href: "/en/archive",  label: "Archive" },
  { href: "/en/about",    label: "About" },
];

export default function NavMenu({ today, lang = "ko" }: { today: string; lang?: "ko" | "en" }) {
  const [open, setOpen] = useState(false);
  const links = lang === "en" ? enLinks : koLinks;
  const switchHref = lang === "en" ? "/" : "/en/";
  const switchLabel = lang === "en" ? "KO" : "EN";

  return (
    <>
      {/* 데스크탑: 링크 일렬 */}
      <div className="hidden sm:flex items-center gap-6">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[13px] text-[#1a1a1a] tracking-[0.04em] hover:opacity-60 transition-opacity"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href={switchHref}
          className="text-[12px] text-[#1a1a1a] tracking-[0.08em] border border-[#1a1a1a] px-2 py-0.5 hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors"
        >
          {switchLabel}
        </Link>
        <span className="text-[13px] text-[#1a1a1a] tracking-[0.04em]">{today}</span>
      </div>

      {/* 모바일: 햄버거 + 언어 토글 */}
      <div className="sm:hidden flex items-center gap-3">
        <Link
          href={switchHref}
          className="text-[11px] text-[#1a1a1a] tracking-[0.08em] border border-[#1a1a1a] px-2 py-0.5 hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors"
        >
          {switchLabel}
        </Link>
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="메뉴"
          className="w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
        >
          <span className={`block w-5 h-px transition-all origin-center ${open ? "bg-white rotate-45 translate-y-[6px]" : "bg-[#1a1a1a]"}`} />
          <span className={`block w-5 h-px transition-all ${open ? "bg-white opacity-0" : "bg-[#1a1a1a]"}`} />
          <span className={`block w-5 h-px transition-all origin-center ${open ? "bg-white -rotate-45 -translate-y-[6px]" : "bg-[#1a1a1a]"}`} />
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {open && (
        <div className="sm:hidden absolute top-[60px] left-0 right-0 bg-[#1a1a1a] border-b border-[#333] z-50 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[14px] text-white tracking-[0.06em] hover:opacity-60 transition-opacity py-1"
            >
              {l.label}
            </Link>
          ))}
          <span className="text-[12px] text-[#aaa] tracking-[0.04em] pt-2 border-t border-[#333]">{today}</span>
        </div>
      )}
    </>
  );
}
