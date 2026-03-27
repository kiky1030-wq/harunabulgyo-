import type { NextConfig } from "next";

const securityHeaders = [
  // 클릭재킹 방지
  { key: "X-Frame-Options", value: "DENY" },
  // MIME 스니핑 방지
  { key: "X-Content-Type-Options", value: "nosniff" },
  // 리퍼러 정책
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 불필요한 브라우저 기능 비활성화
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // HTTPS 강제 (2년)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // XSS 필터 (구형 브라우저 대응)
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Content Security Policy
  // AdSense·GA4·카카오 SDK를 허용하면서 기본 보호 유지
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // GA4 인라인 스크립트 + 외부 서비스 허용
      "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://t1.kakaocdn.net https://googleads.g.doubleclick.net",
      // Tailwind 인라인 스타일 허용
      "style-src 'self' 'unsafe-inline'",
      // 이미지: self + data URI + HTTPS (AdSense 광고 이미지 포함)
      "img-src 'self' data: https:",
      // Next.js 셀프호스팅 폰트
      "font-src 'self'",
      // GA4·AdSense 분석 요청
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com",
      // AdSense iframe
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
      // 플러그인 완전 차단
      "object-src 'none'",
      // base 태그 악용 방지
      "base-uri 'self'",
      // 폼 제출 제한
      "form-action 'self'",
      // HTTP 링크를 HTTPS로 업그레이드
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
