import { getAllSutras } from "@/lib/sutra";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotusread.com";

export const dynamic = "force-static";
export const revalidate = 86400; // 24시간

export function GET() {
  const sutras = getAllSutras();
  const today = new Date();
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
  const currentDay = String(today.getDate()).padStart(2, "0");
  const todayKey = `${currentMonth}-${currentDay}`;

  // 오늘 날짜 기준으로 최근 30개
  const todayIdx = sutras.findIndex((s) => s.date === todayKey);
  const start = todayIdx === -1 ? 0 : Math.max(0, todayIdx - 29);
  const end = todayIdx === -1 ? 30 : todayIdx + 1;
  const recent = sutras.slice(start, end).reverse();

  const items = recent
    .map((s) => {
      const [month, day] = s.date.split("-");
      const title = `${month}월 ${day}일 — ${s.korean.split("\n")[0]}`;
      const desc = `${s.korean}\n\n${s.commentary}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const link = `${BASE_URL}/sutra/${s.date}`;
      return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${desc}]]></description>
      <category><![CDATA[${s.source}]]></category>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>하루하나불교 — 오늘의 불교 경전 구절</title>
    <link>${BASE_URL}</link>
    <description>매일 하나의 불교 경전 구절로 하루를 시작하세요. 법구경, 금강경, 반야심경, 화엄경.</description>
    <language>ko</language>
    <lastBuildDate>${today.toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/opengraph-image</url>
      <title>하루하나불교</title>
      <link>${BASE_URL}</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
