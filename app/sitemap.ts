import { MetadataRoute } from "next";
import { getAllSutras, getAllSources } from "@/lib/sutra";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotusread.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const sutras = getAllSutras();
  const sources = getAllSources();

  const sutraPages: MetadataRoute.Sitemap = sutras.map((s) => ({
    url: `${BASE_URL}/sutra/${s.date}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const sourcePages: MetadataRoute.Sitemap = sources.map((source) => ({
    url: `${BASE_URL}/source/${encodeURIComponent(source)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/archive`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...sourcePages,
    ...sutraPages,
  ];
}
