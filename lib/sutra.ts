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

export function getSutrasBySource(source: string): Sutra[] {
  return (sutras as Sutra[]).filter((s) => s.source === source);
}

export function getAllSources(): string[] {
  return [...new Set((sutras as Sutra[]).map((s) => s.source))];
}

export const TOPICS: Record<string, { label: string; description: string; keywords: string[] }> = {
  "마음": {
    label: "마음",
    description: "마음의 본질과 수련에 관한 경전 구절",
    keywords: ["마음", "심"],
  },
  "자비": {
    label: "자비와 사랑",
    description: "자비, 자애, 사랑에 관한 경전 구절",
    keywords: ["자비", "자애", "사랑", "친절", "베풀"],
  },
  "지혜": {
    label: "지혜",
    description: "지혜와 깨달음에 관한 경전 구절",
    keywords: ["지혜", "깨달음", "앎", "깨닫"],
  },
  "고통": {
    label: "고통과 해탈",
    description: "고통의 원인과 해탈에 관한 경전 구절",
    keywords: ["고통", "괴로움", "해탈", "苦"],
  },
  "행복": {
    label: "행복과 평화",
    description: "행복, 평화, 기쁨에 관한 경전 구절",
    keywords: ["행복", "기쁨", "평화", "평안"],
  },
  "인연": {
    label: "인연",
    description: "인연과 관계에 관한 경전 구절",
    keywords: ["인연"],
  },
  "무상": {
    label: "무상",
    description: "무상과 비움에 관한 경전 구절",
    keywords: ["무상", "비어", "공", "空", "사라", "덧없"],
  },
  "정진": {
    label: "정진과 수행",
    description: "노력, 수행, 정진에 관한 경전 구절",
    keywords: ["정진", "노력", "수행", "꾸준", "게으름"],
  },
};

export function getAllTopics(): string[] {
  return Object.keys(TOPICS);
}

export function getSutrasByTopic(topic: string): Sutra[] {
  const topicData = TOPICS[topic];
  if (!topicData) return [];
  return (sutras as Sutra[]).filter((s) =>
    topicData.keywords.some(
      (kw) => s.korean.includes(kw) || s.commentary.includes(kw)
    )
  );
}

export function getPrevNextSutra(dateStr: string): { prev: Sutra | null; next: Sutra | null } {
  const all = sutras as Sutra[];
  const idx = all.findIndex((s) => s.date === dateStr);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
