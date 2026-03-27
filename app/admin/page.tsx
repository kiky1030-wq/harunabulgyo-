import { getAdminStats, type AdminStats } from "@/lib/analytics";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "관리자 대시보드",
};

export const dynamic = "force-dynamic";

// ── 날짜 포맷 (YYYYMMDD → MM.DD) ──────────────────────────
function fmtDate(d: string): string {
  return `${d.slice(4, 6)}.${d.slice(6, 8)}`;
}

// ── 숫자 천 단위 구분 ──────────────────────────────────────
function fmt(n: number): string {
  return n.toLocaleString("ko-KR");
}

// ── 트렌드 SVG 차트 ───────────────────────────────────────
function TrendChart({ data }: { data: { date: string; users: number }[] }) {
  if (!data.length) return null;
  const W = 600;
  const H = 120;
  const PAD = { t: 10, r: 8, b: 24, l: 32 };
  const maxVal = Math.max(...data.map((d) => d.users), 1);
  const xs = data.map(
    (_, i) => PAD.l + (i / (data.length - 1)) * (W - PAD.l - PAD.r)
  );
  const ys = data.map(
    (d) => PAD.t + (1 - d.users / maxVal) * (H - PAD.t - PAD.b)
  );
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const area =
    path +
    ` L${xs[xs.length - 1]},${H - PAD.b} L${xs[0]},${H - PAD.b} Z`;

  const labelStep = Math.ceil(data.length / 6);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[120px]">
      {/* 가로 기준선 */}
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="#ccc" strokeWidth="1" />
      {/* 영역 채우기 */}
      <path d={area} fill="#1a1a1a" opacity="0.06" />
      {/* 선 */}
      <path d={path} fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round" />
      {/* 날짜 레이블 */}
      {data.map((d, i) =>
        i % labelStep === 0 ? (
          <text key={d.date} x={xs[i]} y={H - 6} textAnchor="middle" fontSize="9" fill="#888">
            {fmtDate(d.date)}
          </text>
        ) : null
      )}
      {/* 최대값 레이블 */}
      <text x={PAD.l - 4} y={PAD.t + 4} textAnchor="end" fontSize="9" fill="#888">
        {fmt(maxVal)}
      </text>
    </svg>
  );
}

// ── 가로 바 차트 ──────────────────────────────────────────
function BarList({
  items,
  labelKey,
  valueKey,
}: {
  items: Record<string, string | number>[];
  labelKey: string;
  valueKey: string;
}) {
  const max = Math.max(...items.map((i) => Number(i[valueKey])), 1);
  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="text-[13px]">
          <div className="flex justify-between mb-[3px]">
            <span className="text-[#333] truncate max-w-[70%]">{String(item[labelKey])}</span>
            <span className="text-[#555] tabular-nums">{fmt(Number(item[valueKey]))}</span>
          </div>
          <div className="h-[5px] bg-[#e0ddd9] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1a1a1a] rounded-full"
              style={{ width: `${(Number(item[valueKey]) / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

// ── 카드 ─────────────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/60 rounded-xl p-5 border border-[#dedad6]">
      <p className="text-[11px] tracking-[0.1em] text-[#888] uppercase mb-4">{title}</p>
      {children}
    </div>
  );
}

// ── 핵심 지표 숫자 ────────────────────────────────────────
function StatBlock({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="text-center">
      <p className="text-[11px] text-[#888] mb-1 tracking-wide">{label}</p>
      <p className="text-3xl font-light text-[#1a1a1a] tabular-nums">{value}</p>
      {sub && <p className="text-[11px] text-[#888] mt-1">{sub}</p>}
    </div>
  );
}

// ── 대시보드 본문 ─────────────────────────────────────────
function Dashboard({ stats }: { stats: AdminStats }) {
  const deviceLabels: Record<string, string> = {
    mobile: "모바일",
    desktop: "데스크탑",
    tablet: "태블릿",
  };
  const channelLabels: Record<string, string> = {
    "Organic Search": "검색",
    "Direct": "직접",
    "Organic Social": "소셜",
    "Referral": "참조",
    "Email": "이메일",
    "(other)": "기타",
  };

  return (
    <div className="min-h-screen bg-[#EEECEA] px-4 sm:px-8 py-8 font-[family-name:var(--font-noto-serif-kr)]">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* 헤더 */}
        <div className="flex items-baseline justify-between">
          <h1 className="text-[15px] font-medium tracking-wide text-[#1a1a1a]">하루하나불교 관리자</h1>
          <p className="text-[12px] text-[#888]">최근 30일 기준</p>
        </div>

        {/* 핵심 지표 */}
        <Card title="활성 사용자">
          <div className="grid grid-cols-4 gap-4">
            <StatBlock label="오늘" value={fmt(stats.activeUsers.today)} />
            <StatBlock label="7일" value={fmt(stats.activeUsers.week)} />
            <StatBlock label="30일" value={fmt(stats.activeUsers.month)} />
            <StatBlock
              label="재방문율"
              value={`${stats.returnRate}%`}
              sub={`신규 ${fmt(stats.newUsers30d)}명`}
            />
          </div>
        </Card>

        {/* 일별 추이 */}
        <Card title="일별 방문 추이 (30일)">
          <TrendChart data={stats.dailyTrend} />
        </Card>

        {/* 상위 페이지 */}
        <Card title="상위 페이지 Top 10 (페이지뷰)">
          <BarList
            items={stats.topPages}
            labelKey="path"
            valueKey="views"
          />
        </Card>

        {/* 트래픽 소스 + 기기 */}
        <div className="grid grid-cols-2 gap-4">
          <Card title="트래픽 소스">
            <BarList
              items={stats.channels.map((c) => ({
                ...c,
                name: channelLabels[c.name] ?? c.name,
              }))}
              labelKey="name"
              valueKey="sessions"
            />
          </Card>
          <Card title="기기 유형">
            <BarList
              items={stats.devices.map((d) => ({
                ...d,
                type: deviceLabels[d.type] ?? d.type,
              }))}
              labelKey="type"
              valueKey="sessions"
            />
          </Card>
        </div>

      </div>
    </div>
  );
}

// ── 페이지 ────────────────────────────────────────────────
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const { secret } = await searchParams;

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return (
      <div className="min-h-screen bg-[#EEECEA] flex items-center justify-center">
        <p className="text-[#888] text-[14px] tracking-wide">접근 권한이 없습니다.</p>
      </div>
    );
  }

  let stats: AdminStats;
  try {
    stats = await getAdminStats();
  } catch (e) {
    return (
      <div className="min-h-screen bg-[#EEECEA] flex items-center justify-center">
        <p className="text-[#888] text-[14px] tracking-wide">
          데이터를 불러올 수 없습니다. ({String(e)})
        </p>
      </div>
    );
  }

  return <Dashboard stats={stats} />;
}
