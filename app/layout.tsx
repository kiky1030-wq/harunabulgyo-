import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harunabulgyo.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "하루하나불교 — 오늘의 경전",
    template: "%s — 하루하나불교",
  },
  description: "매일 하나의 불교 경전 구절로 하루를 시작하세요. 법구경, 금강경, 반야심경의 마음 평안 구절 모음.",
  keywords: ["불교", "불교 경전", "법구경", "금강경", "반야심경", "마음 평안", "오늘의 경전", "명언", "불교 명언"],
  authors: [{ name: "하루하나불교" }],
  creator: "하루하나불교",
  manifest: "/manifest.json",
  openGraph: {
    title: "하루하나불교 — 오늘의 경전",
    description: "매일 하나의 불교 경전 구절로 하루를 시작하세요. 마음의 평안을 드립니다.",
    url: BASE_URL,
    siteName: "하루하나불교",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "하루하나불교 — 오늘의 경전",
    description: "매일 하나의 불교 경전 구절로 하루를 시작하세요.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "하루하나불교",
    "theme-color": "#EEECEA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSerifKR.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-noto-serif-kr)]">
        {children}
      </body>
    </html>
  );
}
