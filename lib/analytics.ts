import { BetaAnalyticsDataClient } from "@google-analytics/data";

function getClient() {
  const credentials = JSON.parse(process.env.GA_SERVICE_ACCOUNT_KEY!);
  return new BetaAnalyticsDataClient({ credentials });
}

function prop() {
  return `properties/${process.env.GA_PROPERTY_ID}`;
}

function rowNum(row: unknown, metricIdx = 0): number {
  const r = row as { metricValues?: { value?: string }[] } | undefined;
  return parseInt(r?.metricValues?.[metricIdx]?.value ?? "0");
}

function rowDim(row: unknown, dimIdx = 0): string {
  const r = row as { dimensionValues?: { value?: string }[] } | undefined;
  return r?.dimensionValues?.[dimIdx]?.value ?? "";
}

export type AdminStats = {
  activeUsers: { today: number; week: number; month: number };
  newUsers30d: number;
  returnRate: number; // %
  dailyTrend: { date: string; users: number }[];
  topPages: { path: string; views: number }[];
  channels: { name: string; sessions: number }[];
  devices: { type: string; sessions: number }[];
};

export async function getAdminStats(): Promise<AdminStats> {
  const client = getClient();
  const property = prop();

  const [
    [todayRes],
    [weekRes],
    [monthRes],
    [trendRes],
    [pagesRes],
    [channelsRes],
    [devicesRes],
  ] = await Promise.all([
    client.runReport({
      property,
      dateRanges: [{ startDate: "today", endDate: "today" }],
      metrics: [{ name: "activeUsers" }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [{ name: "activeUsers" }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "activeUsers" }, { name: "newUsers" }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    }),
  ]);

  const todayUsers = rowNum(todayRes.rows?.[0]);
  const weekUsers = rowNum(weekRes.rows?.[0]);
  const monthUsers = rowNum(monthRes.rows?.[0]);
  const newUsers30d = rowNum(monthRes.rows?.[0], 1);
  const returnRate =
    monthUsers > 0
      ? Math.round(((monthUsers - newUsers30d) / monthUsers) * 100)
      : 0;

  const dailyTrend = (trendRes.rows ?? []).map((row) => ({
    date: rowDim(row),
    users: rowNum(row),
  }));

  const topPages = (pagesRes.rows ?? []).map((row) => ({
    path: rowDim(row),
    views: rowNum(row),
  }));

  const channels = (channelsRes.rows ?? []).map((row) => ({
    name: rowDim(row),
    sessions: rowNum(row),
  }));

  const devices = (devicesRes.rows ?? []).map((row) => ({
    type: rowDim(row),
    sessions: rowNum(row),
  }));

  return {
    activeUsers: { today: todayUsers, week: weekUsers, month: monthUsers },
    newUsers30d,
    returnRate,
    dailyTrend,
    topPages,
    channels,
    devices,
  };
}
