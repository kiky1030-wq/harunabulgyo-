"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const PRESETS = [1, 3, 5, 10, 15, 20];

function playBell() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(528, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(396, ctx.currentTime + 2.5);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 3);
    osc.onended = () => ctx.close();
  } catch {
    // 지원 안 하는 환경에서 무시
  }
}

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function MeditationTimer() {
  const [selected, setSelected] = useState(5);       // 분
  const [remaining, setRemaining] = useState(5 * 60); // 초
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = selected * 60;
  const progress = 1 - remaining / total;

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setDone(false);
    setRemaining(selected * 60);
  }, [selected]);

  // 프리셋 변경 시 리셋
  useEffect(() => {
    reset();
  }, [selected, reset]);

  // 타이머 틱
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          setDone(true);
          playBell();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  const toggle = () => {
    if (done) { reset(); return; }
    setRunning((r) => !r);
  };

  // SVG 원형 프로그레스
  const R = 88;
  const CIRC = 2 * Math.PI * R;
  const dash = CIRC * progress;

  return (
    <div className="flex flex-col items-center gap-8 sm:gap-10 w-full px-4 sm:px-0">

      {/* 원형 타이머 */}
      <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
        <svg width="220" height="220" className="absolute -rotate-90">
          {/* 배경 링 */}
          <circle cx="110" cy="110" r={R} fill="none" stroke="#d5d2cf" strokeWidth="2" />
          {/* 진행 링 */}
          {progress > 0 && (
            <circle
              cx="110" cy="110" r={R}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeDasharray={`${dash} ${CIRC}`}
              strokeLinecap="round"
            />
          )}
        </svg>

        <div className="text-center z-10">
          {done ? (
            <p className="text-[13px] tracking-[0.2em] text-[#1a1a1a]">명상 완료</p>
          ) : (
            <>
              <p
                className="font-light text-[#1a1a1a] tabular-nums"
                style={{ fontSize: "clamp(2rem, 8vw, 2.8rem)", letterSpacing: "-0.02em" }}
              >
                {fmt(remaining)}
              </p>
              <p className="text-[11px] tracking-[0.2em] text-[#888] mt-1">
                {running ? "명상 중" : remaining === total ? "시작 전" : "일시정지"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* 프리셋 선택 */}
      <div className="flex gap-2 flex-wrap justify-center">
        {PRESETS.map((min) => (
          <button
            key={min}
            onClick={() => setSelected(min)}
            className={`px-4 py-2.5 sm:py-2 text-[13px] sm:text-[12px] tracking-[0.12em] border transition-colors min-w-[52px] ${
              selected === min
                ? "bg-[#1a1a1a] text-[#EEECEA] border-[#1a1a1a]"
                : "bg-transparent text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#EEECEA]"
            }`}
          >
            {min}분
          </button>
        ))}
      </div>

      {/* 컨트롤 */}
      <div className="flex gap-3">
        <button
          onClick={toggle}
          className="px-8 py-3.5 sm:py-3 bg-[#1a1a1a] text-[#EEECEA] text-[14px] sm:text-[13px] tracking-[0.12em] hover:opacity-80 transition-opacity min-w-[100px]"
        >
          {done ? "다시 시작" : running ? "일시정지" : "시작"}
        </button>
        {(running || (!running && remaining < total)) && !done && (
          <button
            onClick={reset}
            className="px-6 py-3.5 sm:py-3 border border-[#1a1a1a] text-[#1a1a1a] text-[14px] sm:text-[13px] tracking-[0.12em] hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors"
          >
            초기화
          </button>
        )}
      </div>

      <p className="text-[12px] text-[#aaa] tracking-[0.06em] text-center max-w-xs">
        타이머 종료 시 종소리가 울립니다.
        <br />
        화면을 켜둔 채 눈을 감으세요.
      </p>
    </div>
  );
}
