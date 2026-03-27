"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  text: string;
}

export default function AudioButton({ text }: Props) {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(false);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported("speechSynthesis" in window);
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const toggle = () => {
    if (!supported) return;

    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "ko-KR";
    utt.rate = 0.82;
    utt.pitch = 1.0;

    // 한국어 음성 우선 선택
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find((v) => v.lang.startsWith("ko"));
    if (koVoice) utt.voice = koVoice;

    utt.onend = () => setPlaying(false);
    utt.onerror = () => setPlaying(false);

    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
    setPlaying(true);
  };

  if (!supported) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "낭독 중지" : "경전 낭독 듣기"}
      className="flex items-center gap-2 px-3 sm:px-5 py-2.5 border border-[#1a1a1a] text-[#1a1a1a] text-[12px] tracking-[0.12em] hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors"
    >
      {playing ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
          <span className="hidden sm:inline">낭독 중지</span>
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          <span className="hidden sm:inline">낭독 듣기</span>
        </>
      )}
    </button>
  );
}
