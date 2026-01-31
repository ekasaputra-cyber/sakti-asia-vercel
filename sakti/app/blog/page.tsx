import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"; // Pastikan sudah install shadcn input
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Search, 
  Hash, 
  TrendingUp, 
  Terminal,
  Cpu
} from "lucide-react";

export default function BlogPage() {
  
  // DATA DUMMY BERITA (Nanti bisa dari Database/CMS)
  const featuredPost = {
    title: "Era Quantum Computing: Ancaman atau Peluang bagi Kriptografi Modern?",
    excerpt: "Google dan IBM berlomba mencapai Quantum Supremacy. Apa dampaknya bagi keamanan data kita di tahun 2026? Simak analisis mendalamnya.",
    date: "31 Jan 2026",
    author: "Divisi Riset",
    category: "Cyber Security",
    readTime: "5 min read",
    imageColor: "bg-purple-900/20" // Placeholder warna
  };

  const posts = [
    {
      id: 1,
      title: "Mengenal 'Rust': Bahasa Pemrograman yang Dicintai Stack Overflow",
      excerpt: "Mengapa banyak startup mulai migrasi dari C++ ke Rust? Cek keunggulan memory safety-nya.",
      date: "28 Jan 2026",
      category: "Programming",
      readTime: "4 min read",
      icon: Terminal
    },
    {
      id: 2,
      title: "Tren UI/UX 2026: Kembali ke Skewmorphism atau Tetap Flat?",
      excerpt: "Perdebatan desain antarmuka tidak ada habisnya. Lihat prediksi tren visual tahun ini.",
      date: "25 Jan 2026",
      category: "Design",
      readTime: "3 min read",
      icon: Hash
    },
    {
      id: 3,
      title: "Review Framework: Svelte 5 vs React 19",
      excerpt: "Adu performa dan developer experience. Mana yang sebaiknya kamu pelajari untuk skripsi?",
      date: "20 Jan 2026",
      category: "Web Dev",
      readTime: "6 min read",
      icon: Cpu
    },
    {
      id: 4,
      title: "Recap Tech Summit: Masa Depan AI Generatif di Indonesia",
      excerpt: "Rangkuman materi dari pembicara ahli tentang adopsi AI di industri lokal.",
      date: "15 Jan 2026",
      category: "Event",
      readTime: "8 min read",
      icon: TrendingUp
    },
    {
      id: 5,
      title: "Tips Lolos Hackathon untuk Pemula",
      excerpt: "Jangan cuma modal coding! Strategi pitching dan manajemen waktu adalah kunci juara.",
      date: "10 Jan 2026",
      category: "Tips",
      readTime: "4 min read",
      icon: Terminal
    },
    {
      id: 6,
      title: "Membangun Smart Home Sederhana dengan ESP32",
      excerpt: "Tutorial IoT murah meriah untuk anak kos. Kontrol lampu kamar pakai HP.",
      date: "05 Jan 2026",
      category: "IoT",
      readTime: "7 min read",
      icon: Cpu
    }
  ];

  const categories = ["All", "Web Dev", "AI/ML", "Cyber Security", "IoT", "Career"];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      
      {/* --- HEADER SECTION --- */}
      <section className="relative py-20 border-b border-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-hive-pattern opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-100 h-100 bg-yellow-500/10 blur-[120px] rounded-full -z-10"></div>

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <Badge variant="outline" className="mb-4 border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
            DIKTI
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Dinamika Informasi & <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-amber-600">
              Kajian Teknologi
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Pusat literasi digital SAKTI. Temukan artikel terbaru, tutorial coding, dan wawasan industri yang dikurasi oleh mahasiswa untuk mahasiswa.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-yellow-500 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-5 w-5 text-slate-500" />
              <input 
                type="text" 
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

          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group hover:border-yellow-500/50 transition-all cursor-pointer">
            <div className="grid md:grid-cols-2">
              {/* Image Placeholder */}
              <div className={`h-64 md:h-auto ${featuredPost.imageColor} relative flex items-center justify-center`}>
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
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> {featuredPost.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3"/> {featuredPost.readTime}</span>
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
                  <span className="text-sm font-medium text-white">{featuredPost.author}</span>
                  <ArrowRight className="ml-auto h-5 w-5 text-slate-500 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LATEST ARTICLES GRID --- */}
      <section className="py-16 bg-slate-950 border-t border-slate-900">
        <div className="container px-4 md:px-6">
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start">
            {categories.map((cat, i) => (
              <button 
                key={i}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  i === 0 
                  ? "bg-yellow-500 text-black border-yellow-500" 
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-yellow-500/50 hover:text-yellow-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="group flex flex-col h-full bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-yellow-500/50 hover:bg-slate-900 transition-all duration-300">
                
                {/* Card Header (Icon as Image) */}
                <div className="h-40 bg-black/50 relative flex items-center justify-center border-b border-slate-800 group-hover:bg-yellow-500/5 transition-colors">
                  <post.icon className="h-12 w-12 text-slate-600 group-hover:text-yellow-500 transition-colors" />
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
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                     {post.title}
                   </h3>
                   <p className="text-slate-400 text-sm line-clamp-3 mb-4 grow">
                     {post.excerpt}
                   </p>
                   
                   <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">Baca Selengkapnya</span>
                      <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                   </div>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="border-slate-800 text-black bg-yellow-500 hover:text-white hover:border-yellow-500 hover:bg-slate-900">
              Muat Lebih Banyak Artikel
            </Button>
          </div>

        </div>
      </section>

      {/* --- NEWSLETTER CTA --- */}
      <section className="py-20 bg-black border-t border-slate-900">
        <div className="container px-4 text-center">
           <div className="max-w-2xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[50px] rounded-full"></div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Jangan Ketinggalan Info TI!</h2>
              <p className="text-slate-400 mb-8">
                 Dapatkan ringkasan berita teknologi dan info lomba terbaru langsung ke emailmu setiap minggu.
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