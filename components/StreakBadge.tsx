"use client";

import { useState, useEffect } from "react";

const KEY_STREAK = "harunabulgyo-streak";
const KEY_LAST = "harunabulgyo-last-visit";

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function diffDays(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}

export default function StreakBadge() {
  const [streak, setStreak] = useState(0);
  const [isNew, setIsNew] = useState(false); // 오늘 처음 방문 여부

  useEffect(() => {
    const today = toDateStr(new Date());
    const last = localStorage.getItem(KEY_LAST);
    const saved = parseInt(localStorage.getItem(KEY_STREAK) ?? "0", 10);

    let next = saved;

    if (!last) {
      // 첫 방문
      next = 1;
      setIsNew(true);
    } else if (last === today) {
      // 오늘 이미 방문
      next = saved;
    } else {
      const diff = diffDays(last, today);
      if (diff === 1) {
        // 연속
        next = saved + 1;
        setIsNew(true);
      } else {
        // 중단 → 리셋
        next = 1;
        setIsNew(true);
      }
    }

    localStorage.setItem(KEY_STREAK, String(next));
    localStorage.setItem(KEY_LAST, today);
    setStreak(next);
  }, []);

  if (streak === 0) return null;

  return (
    <div
      title={`${streak}일 연속 독경 중`}
      className="flex items-center gap-1.5 text-[12px] text-[#1a1a1a] tracking-[0.06em]"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full inline-block ${isNew ? "bg-[#1a1a1a]" : "bg-[#aaa]"}`}
      />
      <span>
        <span className="font-medium">{streak}일</span> 연속
      </span>
    </div>
  );
}
