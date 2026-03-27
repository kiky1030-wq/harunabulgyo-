"use client";

import { useState, useEffect } from "react";

export default function PushNotificationButton() {
  const [status, setStatus] = useState<"idle" | "subscribed" | "denied" | "unsupported">("idle");

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }
    if (Notification.permission === "granted") setStatus("subscribed");
    if (Notification.permission === "denied") setStatus("denied");
  }, []);

  const subscribe = async () => {
    if (!("serviceWorker" in navigator)) return;

    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        setStatus("subscribed");
        // 실제 서버 푸시를 위해서는 VAPID 키와 서버 엔드포인트가 필요합니다.
        // 현재는 브라우저 등록까지만 처리합니다.
      } else {
        setStatus("denied");
      }
    } catch (err) {
      console.error("알림 등록 실패:", err);
    }
  };

  if (status === "unsupported") return null;

  if (status === "subscribed") {
    return (
      <div className="flex items-center gap-2 text-[12px] text-[#1a1a1a] tracking-[0.06em]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] inline-block" />
        매일 아침 알림 켜짐
      </div>
    );
  }

  if (status === "denied") {
    return (
      <p className="text-[12px] text-[#aaa]">알림이 차단되어 있습니다. 브라우저 설정에서 허용해주세요.</p>
    );
  }

  return (
    <button
      onClick={subscribe}
      className="flex items-center gap-2 px-3 sm:px-5 py-2.5 border border-[#1a1a1a] text-[#1a1a1a] text-[12px] tracking-[0.12em] hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span className="hidden sm:inline">매일 아침 알림 받기</span>
    </button>
  );
}
