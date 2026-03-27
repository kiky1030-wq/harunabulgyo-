"use client";

import { useState, useEffect } from "react";

const KEY_VISITED = "harunabulgyo-visited-dates";
const KEY_SACHA_PREFIX = "harunabulgyo-sacha-";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

// 사경 완료 여부: storageKey가 "harunabulgyo-sacha-MM-DD" 형식
function sachaKey(y: number, m: number, d: number) {
  return `${KEY_SACHA_PREFIX}${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function CalendarView() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0-indexed
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [sacha, setSacha] = useState<Set<string>>(new Set());

  useEffect(() => {
    const v: string[] = JSON.parse(localStorage.getItem(KEY_VISITED) ?? "[]");
    setVisited(new Set(v));

    // 사경 완료 날짜 수집
    const sachaSet = new Set<string>();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(KEY_SACHA_PREFIX)) {
        const val = localStorage.getItem(key) ?? "";
        if (val.trim().length > 0) sachaSet.add(key);
      }
    }
    setSacha(sachaSet);
  }, []);

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  // 이번 달 날짜 계산
  const firstDay = new Date(year, month, 1).getDay(); // 0=일
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = toDateStr(now.getFullYear(), now.getMonth(), now.getDate());

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // 6주 맞춤
  while (cells.length % 7 !== 0) cells.push(null);

  // 통계
  const visitedThisMonth = cells.filter(
    d => d !== null && visited.has(toDateStr(year, month, d as number))
  ).length;

  return (
    <div className="w-full max-w-sm mx-auto px-2 sm:px-0">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#1a1a1a] transition-colors"
          aria-label="이전 달"
        >
          ←
        </button>
        <div className="text-center">
          <p className="text-[13px] tracking-[0.12em] text-[#1a1a1a]">
            {year}년 {month + 1}월
          </p>
          {visitedThisMonth > 0 && (
            <p className="text-[11px] text-[#888] tracking-[0.06em] mt-0.5">
              {visitedThisMonth}일 방문
            </p>
          )}
        </div>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#1a1a1a] transition-colors"
          aria-label="다음 달"
        >
          →
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-2">
        {WEEK.map(w => (
          <div key={w} className="text-center text-[11px] tracking-[0.1em] text-[#aaa] py-1">
            {w}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (d === null) return <div key={`empty-${i}`} />;

          const dateStr = toDateStr(year, month, d);
          const isToday = dateStr === todayStr;
          const isVisited = visited.has(dateStr);
          const hasSacha = sacha.has(sachaKey(year, month, d));
          const isFuture = dateStr > todayStr;

          return (
            <div key={dateStr} className="flex flex-col items-center py-1 gap-1">
              <span
                className={`
                  w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-[13px] sm:text-[12px] tabular-nums transition-colors
                  ${isToday ? "bg-[#1a1a1a] text-[#EEECEA]" : ""}
                  ${isVisited && !isToday ? "text-[#1a1a1a] font-medium" : ""}
                  ${!isVisited && !isToday && !isFuture ? "text-[#ccc]" : ""}
                  ${isFuture ? "text-[#ddd]" : ""}
                `}
              >
                {d}
              </span>
              {/* 방문 점 */}
              <div className="flex items-center gap-0.5 h-1.5">
                {isVisited && (
                  <span className="w-1 h-1 rounded-full bg-[#1a1a1a] inline-block" />
                )}
                {hasSacha && (
                  <span className="w-1 h-1 rounded-full bg-[#888] inline-block" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="flex items-center justify-center gap-5 mt-8 text-[11px] text-[#888] tracking-[0.06em]">
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#1a1a1a] inline-block" />
          방문
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#888] inline-block" />
          사경 완료
        </span>
      </div>
    </div>
  );
}
