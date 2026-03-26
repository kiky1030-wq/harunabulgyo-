import sutras from "@/data/sutras.json";

export interface Sutra {
  id: number;
  date: string;
  source: string;
  chapter: string;
  original: string;
  korean: string;
  commentary: string;
}

export function getTodaySutra(): Sutra {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const key = `${month}-${day}`;

  const found = (sutras as Sutra[]).find((s) => s.date === key);
  if (found) return found;

  // 날짜에 해당하는 경전이 없으면 day-of-year 기준 순환
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return (sutras as Sutra[])[dayOfYear % sutras.length];
}

export function getSutraByDate(dateStr: string): Sutra | undefined {
  return (sutras as Sutra[]).find((s) => s.date === dateStr);
}

export function getAllSutras(): Sutra[] {
  return sutras as Sutra[];
}
