"use client";

import { useState, useEffect } from "react";

const KEY_STREAK = "harunabulgyo-streak";
const KEY_LAST = "harunabulgyo-last-visit";
const KEY_VISITED = "harunabulgyo-visited-dates";

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

    // 방문 이력 누적 저장
    const visited: string[] = JSON.parse(localStorage.getItem(KEY_VISITED) ?? "[]");
    if (!visited.includes(today)) {
      visited.push(today);
      localStorage.setItem(KEY_VISITED, JSON.stringify(visited));
    }

    setStreak(next);
  }, []);

  if (streak === 0) return null;

  return (
    <div
      title={`${streak}일 연속 독경 중`}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1a] text-[#EEECEA] text-[12px] tracking-[0.06em]"
    >
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${isNew ? "bg-white" : "bg-[#555]"}`} />
      <span>
        <span className="font-semibold">{streak}일</span> 연속
      </span>
    </div>
  );
}
