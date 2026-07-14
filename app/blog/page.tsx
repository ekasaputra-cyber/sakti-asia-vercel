"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  TrendingUp,
  Cpu,
  Shield,
  Smartphone,
  Wifi,
  Briefcase,
  Lightbulb,
  Code2,
  Loader2,
} from "lucide-react";

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image: string | null;
  category: string;
  categoryLabel: string;
  source: string;
};

const CATEGORY_ICONS: Record<string, typeof Cpu> = {
  cyberlife: Cpu,
  security: Shield,
  telecommunication: Wifi,
  consumer: Smartphone,
  business: Briefcase,
  "mobile-apps": Smartphone,
  "tips-dan-trik": Lightbulb,
  programming: Code2,
};

// Label sumber yang enak dibaca + inisial buat avatar bulat
const SOURCE_LABELS: Record<string, string> = {
  detikInet: "detikInet",
  DevTo: "Dev.to",
};

function getSourceLabel(source: string): string {
  return SOURCE_LABELS[source] ?? source;
}

function getSourceInitials(source: string): string {
  const label = getSourceLabel(source);
  return label.slice(0, 2).toUpperCase();
}

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const LIMIT = 12;

export default function BlogPage() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");

  // Load halaman pertama
  useEffect(() => {
    fetch(`/api/rss?page=1&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.items ?? []);
        setHasMore(data.hasMore ?? false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/rss?page=${nextPage}&limit=${LIMIT}`);
      const data = await res.json();

      setArticles((prev) => [...prev, ...(data.items ?? [])]);
      setHasMore(data.hasMore ?? false);
      setPage(nextPage);
    } catch {
      // Kalau gagal, biarin hasMore tetap true biar user bisa coba lagi
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore]);

  const categories = [
    "All",
    ...Array.from(new Set(articles.map((a) => a.categoryLabel))),
  ];

  const featuredPost = articles[0];
  const posts = articles.slice(1);

  const filteredPosts = posts
    .filter((post) =>
      activeCategory === "All" ? true : post.categoryLabel === activeCategory
    )
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
  void sortBy;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      {/* --- HEADER SECTION --- */}
      <section className="relative py-20 border-b border-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-hive-pattern opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-100 h-100 bg-yellow-500/10 blur-[120px] rounded-full -z-10"></div>

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
          >
            DIKTI
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Dinamika Informasi & <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-amber-600">
              Kajian Teknologi
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Pusat literasi digital SAKTI. Berita teknologi terkini yang diambil
            langsung dari berbagai sumber terpercaya.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-yellow-500 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-5 w-5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik (misal: React, AI, Skripsi)..."
                className="w-full h-12 pl-10 pr-4 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500 bg-black">
          Mengambil berita teknologi terbaru...
        </div>
      ) : (
        <>
          {/* --- FEATURED POST (HIGHLIGHT) --- */}
          {featuredPost && (
            <section className="py-16 bg-black">
              <div className="container px-4 md:px-6">
                <div className="flex items-center gap-2 mb-8">
                  <TrendingUp className="text-yellow-500 h-5 w-5" />
                  <h2 className="text-xl font-bold text-white">
                    Sedang Hangat
                  </h2>
                </div>

                
                  <a href={featuredPost.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group hover:border-yellow-500/50 transition-all cursor-pointer"
                >
                  <div className="grid md:grid-cols-2">
                    {/* Image Placeholder */}
                    <div className="h-64 md:h-auto bg-purple-900/20 relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-hive-pattern opacity-50"></div>
                      <Cpu className="h-24 w-24 text-white/20 group-hover:text-yellow-500/50 transition-colors duration-500" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                          {featuredPost.categoryLabel}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />{" "}
                          {formatDate(featuredPost.pubDate)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{" "}
                          {estimateReadTime(featuredPost.description)}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed mb-6">
                        {featuredPost.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-yellow-500 border border-slate-700">
                          {getSourceInitials(featuredPost.source)}
                        </div>
                        <span className="text-sm font-medium text-white">
                          {getSourceLabel(featuredPost.source)}
                        </span>
                        <ArrowRight className="ml-auto h-5 w-5 text-slate-500 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </section>
          )}

          {/* --- LATEST ARTICLES GRID --- */}
          <section className="py-16 bg-slate-950 border-t border-slate-900">
            <div className="container px-4 md:px-6">
              <div className="flex justify-end mb-6">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:border-yellow-500"
                >
                  <option value="latest">Terbaru</option>
                  <option value="popular">Terpopuler</option>
                </select>
              </div>
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      activeCategory === cat
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:border-yellow-500/50 hover:text-yellow-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              {sortedPosts.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  Nggak ada artikel yang cocok.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedPosts.map((post, i) => {
                    const Icon = CATEGORY_ICONS[post.category] ?? Cpu;
                    return (
                      
                       <a  key={i}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col h-full bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-yellow-500/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer"
                      >
                        {/* Card Header (Icon as Image) */}
                        <div className="h-40 bg-black/50 relative flex items-center justify-center border-b border-slate-800 group-hover:bg-yellow-500/5 transition-colors">
                          <Icon className="h-12 w-12 text-slate-600 group-hover:text-yellow-500 transition-colors" />
                          <div className="absolute top-4 left-4">
                            <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">
                              {post.categoryLabel}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 flex flex-col grow">
                          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                            <span>{formatDate(post.pubDate)}</span>
                            <span>•</span>
                            <span>{estimateReadTime(post.description)}</span>
                            <span>•</span>
                            <span>{getSourceLabel(post.source)}</span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-400 text-sm line-clamp-3 mb-4 grow">
                            {post.description}
                          </p>

                          <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">
                              Baca Selengkapnya
                            </span>
                            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}

              {hasMore && (
                <div className="mt-12 text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    disabled={loadingMore}
                    onClick={loadMore}
                    className="group !border-yellow-500/40 !bg-yellow-500 !text-black hover:!bg-slate-900 hover:!text-white hover:!border-yellow-500 font-bold px-8 transition-colors disabled:opacity-60"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Memuat...
                      </>
                    ) : (
                      "Muat Lebih Banyak Artikel"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* --- NEWSLETTER CTA --- */}
      <section className="py-20 bg-black border-t border-slate-900">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[50px] rounded-full"></div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Jangan Ketinggalan Info TI!
            </h2>
            <p className="text-slate-400 mb-8">
              Dapatkan ringkasan berita teknologi dan info lomba terbaru
              langsung ke emailmu setiap minggu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email kampus..."
                className="flex-1 h-10 px-4 rounded-md bg-black border border-slate-700 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
              <Button className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}