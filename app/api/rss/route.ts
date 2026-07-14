import Parser from "rss-parser";
import { NextResponse } from "next/server";

export const revalidate = 900;

const parser = new Parser();

// Bisa nambah sumber baru di sini, tinggal tambahin object baru
const FEED_SOURCES = [
  {
    url: "https://inet.detik.com/rss",
    source: "detikInet",
  },
  {
    url: "https://dev.to/feed",
    source: "DevTo",
  },
  // contoh nambah sumber lain:
  // { url: "https://www.freecodecamp.org/news/rss/", source: "freeCodeCamp" },
];

const TECH_CATEGORIES: Record<string, string> = {
  security: "Keamanan Siber",
  telecommunication: "Telekomunikasi",
  consumer: "Gadget & Consumer",
  business: "Bisnis Teknologi",
  "mobile-apps": "Aplikasi Mobile",
  "tips-dan-trik": "Tips & Trik",
};

function getCategoryFromLink(link: string): string {
  try {
    return new URL(link).pathname.split("/")[1] ?? "";
  } catch {
    return "";
  }
}

type Article = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image: string | null;
  category: string;
  categoryLabel: string;
  source: string;
};

async function fetchDetikInet(url: string, source: string): Promise<Article[]> {
  const feed = await parser.parseURL(url);

  return (feed.items ?? [])
    .map((item) => {
      const rawCategory = getCategoryFromLink(item.link ?? "");
      return { item, rawCategory };
    })
    .filter(({ rawCategory }) => rawCategory in TECH_CATEGORIES)
    .map(({ item, rawCategory }) => {
      const imageMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);

      return {
        title: item.title ?? "",
        link: item.link ?? "",
        pubDate: item.pubDate ?? "",
        description:
          item.contentSnippet?.replace(/\s+/g, " ").trim().slice(0, 160) ?? "",
        image: imageMatch ? imageMatch[1] : null,
        category: rawCategory,
        categoryLabel: TECH_CATEGORIES[rawCategory],
        source,
      };
    });
}

async function fetchDevTo(url: string, source: string): Promise<Article[]> {
  const feed = await parser.parseURL(url);

  return (feed.items ?? []).map((item) => {
    const imageMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);

    return {
      title: item.title ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? "",
      description:
        item.contentSnippet?.replace(/\s+/g, " ").trim().slice(0, 160) ?? "",
      image: imageMatch ? imageMatch[1] : null,
      category: "programming",
      categoryLabel: "Programming",
      source,
    };
  });
}

// Mapping sumber ke fungsi parsing-nya masing-masing,
// karena struktur tiap feed beda-beda
type SourceHandler = (url: string, source: string) => Promise<Article[]>;

const SOURCE_HANDLERS: Record<string, SourceHandler> = {
  detikInet: fetchDetikInet,
  DevTo: fetchDevTo,
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Number(searchParams.get("limit")) || 12);

    const results = await Promise.allSettled(
      FEED_SOURCES.map(({ url, source }) =>
        SOURCE_HANDLERS[source](url, source)
      )
    );

    const allItems = results
      .filter((r): r is PromiseFulfilledResult<Article[]> => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );

    const start = (page - 1) * limit;
    const paginated = allItems.slice(start, start + limit);
    const hasMore = start + limit < allItems.length;

    return NextResponse.json({
      items: paginated,
      hasMore,
      total: allItems.length,
    });
  } catch (error) {
    console.error("Gagal mengambil RSS feed:", error);
    return NextResponse.json(
      { items: [], hasMore: false, error: "Gagal mengambil berita" },
      { status: 500 }
    );
  }
}