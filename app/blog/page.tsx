"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  TrendingUp,
  Terminal,
  Cpu,
  ChevronDown,
} from "lucide-react";

export default function BlogPage() {
  // DATA DUMMY BERITA (Nanti bisa dari Database/CMS)
  const featuredPost = {
    slug: "quantum-computing-kriptografi",
    title:
      "Era Quantum Computing: Ancaman atau Peluang bagi Kriptografi Modern?",
    excerpt:
      "Perkembangan komputer kuantum mengancam sistem enkripsi RSA dan ECC yang saat ini digunakan secara global. Bagaimana mahasiswa TI harus mempersiapkan diri menghadapi post-quantum cryptography?",
    date: "31 Jan 2026",
    author: "Divisi Riset Keamanan Siber",
    category: "Cyber Security",
    readTime: "7 min read",
    imageColor: "bg-purple-900/20",
  };

  const posts = [
    {
      id: 1,
      slug: "rust-memory-safety",
      title: "Mengapa Rust Jadi Bahasa Favorit untuk System Programming?",
      excerpt:
        "Rust menawarkan memory safety tanpa garbage collector. Cocok untuk backend, blockchain, hingga embedded system.",
      date: "2026-01-28",
      category: "Web Dev",
      readTime: "5 min read",
      views: 320,
      author: "Divisi Web Dev",
      icon: Terminal,
    },
    {
      id: 2,
      slug: "ai-untuk-skripsi",
      title: "Memanfaatkan AI untuk Penelitian dan Skripsi Mahasiswa TI",
      excerpt:
        "Dari literature review otomatis hingga analisis dataset besar menggunakan machine learning.",
      date: "2026-01-25",
      category: "AI/ML",
      readTime: "6 min read",
      views: 320,
      author: "Divisi AI/ML",
      icon: Cpu,
    },
    {
      id: 3,
      slug: "nextjs-vs-svelte",
      title: "Next.js vs SvelteKit: Mana Lebih Cocok untuk Project Kampus?",
      excerpt:
        "Perbandingan performa, SSR, dan kemudahan deployment untuk kebutuhan akademik.",
      date: "2026-01-20",
      category: "Web Dev",
      readTime: "6 min read",
      views: 320,
      author: "Divisi Web Dev",
      icon: Cpu,
    },
    {
      id: 4,
      slug: "zero-trust-security",
      title: "Zero Trust Architecture: Standar Baru Keamanan Sistem",
      excerpt:
        "Model keamanan modern yang mulai diadopsi perusahaan global dan instansi pemerintahan.",
      date: "2026-01-15",
      category: "Cyber Security",
      readTime: "8 min read",
      views: 320,
      author: "Divisi Cyber Security",
      icon: TrendingUp,
    },
    {
      id: 5,
      slug: "karir-cyber-security",
      title: "Roadmap Karier Cyber Security untuk Mahasiswa TI",
      excerpt:
        "Dari belajar networking hingga mendapatkan sertifikasi seperti CEH dan Security+.",
      date: "2026-01-10",
      category: "Career",
      readTime: "5 min read",
      views: 320,
      author: "Divisi Career Development",
      icon: Terminal,
    },
    {
      id: 6,
      slug: "iot-smart-campus",
      title: "Implementasi IoT untuk Smart Campus",
      excerpt:
        "Monitoring ruang kelas, parkir pintar, hingga sistem presensi berbasis sensor.",
      date: "2026-01-05",
      category: "IoT",
      readTime: "7 min read",
      views: 320,
      author: "Divisi IoT",
      icon: Cpu,
    },
  ];

  const categories = [
    "All",
    "Web Dev",
    "AI/ML",
    "Cyber Security",
    "IoT",
    "Career",
  ];
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts
    .filter((post) =>
      activeCategory === "All" ? true : post.category === activeCategory
    )
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "popular") {
      return b.views - a.views;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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
            Pusat literasi digital SAKTI. Temukan artikel terbaru, tutorial
            coding, dan wawasan industri yang dikurasi oleh mahasiswa untuk
            mahasiswa.
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

      {/* --- FEATURED POST (HIGHLIGHT) --- */}
      <section className="py-16 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="text-yellow-500 h-5 w-5" />
            <h2 className="text-xl font-bold text-white">Sedang Hangat</h2>
          </div>

          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group hover:border-yellow-500/50 transition-all cursor-pointer">
              <div className="grid md:grid-cols-2">
                {/* Image Placeholder */}
                <div
                  className={`h-64 md:h-auto ${featuredPost.imageColor} relative flex items-center justify-center`}
                >
                  <div className="absolute inset-0 bg-hive-pattern opacity-50"></div>
                  <Cpu className="h-24 w-24 text-white/20 group-hover:text-yellow-500/50 transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                      {featuredPost.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {featuredPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {featuredPost.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-yellow-500 border border-slate-700">
                      DR
                    </div>
                    <span className="text-sm font-medium text-white">
                      {featuredPost.author}
                    </span>
                    <ArrowRight className="ml-auto h-5 w-5 text-slate-500 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

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
              <p className="mb-1">
                Nggak ada artikel yang cocok dengan &quot;{searchQuery}&quot;.
              </p>
              <p className="text-sm">Coba kata kunci lain, ya.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="group flex flex-col h-full bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-yellow-500/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer">
                  {/* Card Header (Icon as Image) */}
                  <div className="h-40 bg-black/50 relative flex items-center justify-center border-b border-slate-800 group-hover:bg-yellow-500/5 transition-colors">
                    {(() => {
                      const Icon = post.icon;
                      return (
                        <Icon className="h-12 w-12 text-slate-600 group-hover:text-yellow-500 transition-colors" />
                      );
                    })()}
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.views} views</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3 mb-4 grow">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">
                        Baca Selengkapnya
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="group !border-yellow-500/40 !bg-yellow-500 !text-black hover:!bg-slate-900 hover:!text-white hover:!border-yellow-500 font-bold px-8 transition-colors"
            >
              Muat Lebih Banyak Artikel
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Button>
          </div>
        </div>
      </section>

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