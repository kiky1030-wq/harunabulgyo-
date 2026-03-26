"use client";

import { useEffect } from "react";
import { Sutra } from "@/lib/sutra";
import { KAKAO_JS_KEY } from "@/lib/config";

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: object) => void;
      };
    };
  }
}

interface Props {
  sutra: Sutra;
}

export default function KakaoShareButton({ sutra }: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao?.isInitialized()) {
      alert("카카오 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "text",
      text: `📿 오늘의 경전 — ${sutra.source}\n\n${sutra.korean}\n\n${sutra.commentary}\n\n매일 하나의 경전, 하루하나불교`,
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    });
  };

  return (
    <button
      onClick={handleKakaoShare}
      className="flex items-center gap-2 px-5 py-2.5 bg-[#FAE100] text-[#3A1D1D] text-[12px] font-medium tracking-[0.06em] hover:bg-[#f0d800] active:scale-95 transition-all"
    >
      {/* 카카오 말풍선 아이콘 */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.477 3 2 6.477 2 11c0 2.814 1.528 5.284 3.875 6.857L5 21l3.563-1.781C9.316 19.399 10.638 19.5 12 19.5c5.523 0 10-3.477 10-8.5S17.523 3 12 3z" />
      </svg>
      카카오톡 공유
    </button>
  );
}
