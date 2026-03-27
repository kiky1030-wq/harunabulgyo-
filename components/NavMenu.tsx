"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/sacha",   label: "사경" },
  { href: "/timer",   label: "명상" },
  { href: "/calendar",label: "달력" },
  { href: "/archive", label: "아카이브" },
  { href: "/about",   label: "소개" },
];

export default function NavMenu({ today }: { today: string }) {
  const [open, setOpen] = useState(false);

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
        <span className="text-[13px] text-[#1a1a1a] tracking-[0.04em]">{today}</span>
      </div>

      {/* 모바일: 햄버거 */}
      <div className="sm:hidden flex items-center">
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="메뉴"
          className="w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
        >
          <span className={`block w-5 h-px bg-[#1a1a1a] transition-transform origin-center ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-[#1a1a1a] transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#1a1a1a] transition-transform origin-center ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {open && (
        <div className="sm:hidden absolute top-[60px] left-0 right-0 bg-[#EEECEA] border-b border-[#d5d2cf] z-50 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[14px] text-[#1a1a1a] tracking-[0.06em] hover:opacity-60 transition-opacity py-1"
            >
              {l.label}
            </Link>
          ))}
          <span className="text-[12px] text-[#888] tracking-[0.04em] pt-2 border-t border-[#d5d2cf]">{today}</span>
        </div>
      )}
    </>
  );
}
