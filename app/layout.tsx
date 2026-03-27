import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotusread.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "하루하나불교 — 오늘의 불교 경전 구절",
    template: "%s — 하루하나불교",
  },
  description: "매일 하나의 불교 경전 구절로 하루를 시작하세요. 법구경, 금강경, 반야심경, 화엄경의 마음 평안을 주는 명언 모음. Daily Buddhist scripture quotes for peace of mind.",
  keywords: [
    // 한국어 키워드
    "불교", "불교 경전", "불교 명언", "불교 글귀", "불교 좋은 글",
    "법구경", "금강경", "반야심경", "화엄경", "숫타니파타", "유마경",
    "마음 평안", "마음 수련", "오늘의 경전", "오늘의 불교", "매일 불교",
    "불교 묵상", "명상 명언", "마음챙김", "불교 구절", "경전 구절",
    // 영어 키워드
    "buddhist quotes", "daily buddhism", "buddhist scriptures",
    "dhammapada quotes", "heart sutra", "diamond sutra",
    "mindfulness quotes", "buddhist wisdom", "zen quotes",
    "daily dharma", "buddhist meditation", "lotus sutra",
    "buddhist sayings", "spiritual quotes", "inner peace quotes",
  ],
  authors: [{ name: "하루하나불교" }],
  creator: "하루하나불교",
  manifest: "/manifest.json",
  openGraph: {
    title: "하루하나불교 — 오늘의 불교 경전 구절",
    description: "매일 하나의 불교 경전 구절로 하루를 시작하세요. 법구경·금강경·반야심경의 마음 평안을 주는 구절 모음.",
    url: BASE_URL,
    siteName: "하루하나불교",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "하루하나불교 — 오늘의 불교 경전 구절",
    description: "매일 하나의 불교 경전 구절로 하루를 시작하세요. 법구경·금강경·반야심경.",
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "ko-KR": BASE_URL,
    },
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7MZ3WKC822"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7MZ3WKC822');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
