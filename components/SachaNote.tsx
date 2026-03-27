"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  sutra: string;
  dateKey: string;   // "MM-DD" 형태, 날짜별 저장
  standalone?: boolean; // true면 항상 펼쳐진 상태
}

function storageKey(dateKey: string) {
  return `harunabulgyo-sacha-${dateKey}`;
}

function normalize(s: string) {
  return s.replace(/\s+/g, "");
}

export default function SachaNote({ sutra, dateKey, standalone = false }: Props) {
  const [open, setOpen] = useState(standalone);
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey(dateKey)) ?? "";
    setValue(saved);
    if (saved && normalize(saved) === normalize(sutra)) setDone(true);
  }, [dateKey, sutra]);

  useEffect(() => {
    if (open && !standalone) textareaRef.current?.focus();
  }, [open, standalone]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setValue(v);
    localStorage.setItem(storageKey(dateKey), v);
    if (normalize(v) === normalize(sutra)) setDone(true);
    else setDone(false);
  };

  const handleClear = () => {
    setValue("");
    setDone(false);
    localStorage.removeItem(storageKey(dateKey));
  };

  const target = normalize(sutra).length;
  const typed = Math.min(normalize(value).length, target);
  const percent = target > 0 ? Math.round((typed / target) * 100) : 0;

  const content = (
    <div className={standalone ? "" : "border-t border-[#d5d2cf] pt-8 pb-10"}>
      {!standalone && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-[12px] tracking-[0.2em] text-[#888]">사경</p>
          <button
            onClick={() => setOpen(false)}
            className="text-[12px] text-[#aaa] hover:text-[#1a1a1a] tracking-[0.06em] transition-colors"
          >
            닫기
          </button>
        </div>
      )}

      {/* 원문 참고 */}
      <p className="text-[13px] sm:text-[15px] text-[#aaa] leading-relaxed whitespace-pre-line mb-6 border-l-2 border-[#d5d2cf] pl-4">
        {sutra}
      </p>

      {done ? (
        <div className="text-center py-8">
          <p className="text-[13px] tracking-[0.2em] text-[#1a1a1a] mb-1">사경 완료</p>
          <p className="text-[12px] text-[#aaa]">오늘도 마음을 모았습니다.</p>
          <button
            onClick={handleClear}
            className="mt-6 text-[11px] text-[#aaa] hover:text-[#1a1a1a] tracking-[0.1em] transition-colors underline underline-offset-2"
          >
            다시 쓰기
          </button>
        </div>
      ) : (
        <>
          <textarea
            ref={standalone ? undefined : textareaRef}
            value={value}
            onChange={handleChange}
            placeholder="여기에 구절을 따라 써보세요..."
            rows={standalone ? 6 : 4}
            className="w-full bg-transparent border border-[#d5d2cf] focus:border-[#1a1a1a] outline-none px-4 py-3 text-[16px] sm:text-[14px] text-[#1a1a1a] leading-relaxed resize-none transition-colors placeholder:text-[#ccc]"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex-1 h-px bg-[#d5d2cf] mr-4">
              <div
                className="h-px bg-[#1a1a1a] transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-[11px] text-[#aaa] tabular-nums">{percent}%</span>
          </div>
          {value.length > 0 && (
            <button
              onClick={handleClear}
              className="mt-2 text-[11px] text-[#ccc] hover:text-[#aaa] tracking-[0.1em] transition-colors"
            >
              지우기
            </button>
          )}
        </>
      )}
    </div>
  );

  if (standalone) return <div className="w-full max-w-2xl mx-auto">{content}</div>;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-4 border-t border-[#d5d2cf] text-[12px] tracking-[0.2em] text-[#888] hover:text-[#1a1a1a] transition-colors flex items-center justify-center gap-2"
        >
          {done ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] inline-block" />
              오늘의 사경 완료
            </>
          ) : (
            "사경하기 — 오늘의 구절을 따라 써보세요"
          )}
        </button>
      ) : content}
    </div>
  );
}
