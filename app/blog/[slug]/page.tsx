import Link from "next/link";
import { notFound } from "next/navigation";

const posts = [
  {
    slug: "rust-memory-safety",
    title: "Mengapa Rust Jadi Bahasa Favorit untuk System Programming?",
    category: "Web Dev",
    date: "2026-01-28",
    readTime: "5 min read",
    views: 1200,
    author: "Divisi Web Dev",
    content: `
Rust menawarkan memory safety tanpa garbage collector.

Keunggulan:
- Ownership system
- Aman dari data race
- Cocok untuk backend dan blockchain
    `,
  },
  {
    slug: "ai-untuk-skripsi",
    title: "Memanfaatkan AI untuk Penelitian dan Skripsi Mahasiswa TI",
    category: "AI/ML",
    date: "2026-01-25",
    readTime: "6 min read",
    views: 900,
    author: "Divisi AI/ML",
    content: `
AI dapat membantu mahasiswa dalam:
- Literature review otomatis
- Analisis dataset besar
- Pembuatan model prediksi

Framework populer:
- TensorFlow
- PyTorch
    `,
  },
  {
    slug: "nextjs-vs-svelte",
    title: "Next.js vs SvelteKit: Mana Lebih Cocok untuk Project Kampus?",
    category: "Web Dev",
    date: "2026-01-20",
    readTime: "6 min read",
    views: 1500,
    author: "Divisi Web Dev",
    content: `
Next.js unggul dalam ecosystem dan SSR.
SvelteKit unggul dalam simplicity dan bundle size kecil.

Untuk project kampus? Pilih sesuai kebutuhan tim.
    `,
  },
  {
    slug: "zero-trust-security",
    title: "Zero Trust Architecture: Standar Baru Keamanan Sistem",
    category: "Cyber Security",
    date: "2026-01-15",
    readTime: "8 min read",
    views: 800,
    author: "Divisi Cyber Security",
    content: `
Zero Trust berarti tidak ada sistem yang langsung dipercaya.

Semua akses harus diverifikasi:
- Multi-factor authentication
- Least privilege access
    `,
  },
  {
    slug: "karir-cyber-security",
    title: "Roadmap Karier Cyber Security untuk Mahasiswa TI",
    category: "Career",
    date: "2026-01-10",
    readTime: "5 min read",
    views: 1100,
    author: "Divisi Cyber Security",
    content: `
Langkah memulai karier:
1. Kuasai networking
2. Pelajari Linux
3. Ambil sertifikasi seperti Security+
    `,
  },
  {
    slug: "iot-smart-campus",
    title: "Implementasi IoT untuk Smart Campus",
    category: "IoT",
    date: "2026-01-05",
    readTime: "7 min read",
    views: 700,
    author: "Divisi IoT",
    content: `
Smart campus dapat menggunakan:
- Sensor suhu
- RFID
- Monitoring parkir

Semua terintegrasi via cloud dashboard.
    `,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.content.slice(0, 120),
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const currentUrl = `/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-7">
        {/* Back Button (Bagian dari Konten, tanpa blur, tanpa sticky) */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-sm text-yellow-500 hover:text-yellow-400"
          >
            ← Kembali ke Blog
          </Link>

          <span className="text-xs text-slate-500">Blog HIMTI</span>
        </div>

        <div className="mb-2">
          <span className="text-yellow-500 text-sm font-bold">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>

        <p className="text-xs text-slate-500 mb-2">Oleh {post.author}</p>

        <div className="flex gap-4 mb-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              post.title + " - " + currentUrl,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-yellow-500 hover:underline"
          >
            Share ke WhatsApp
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              currentUrl,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-yellow-500 hover:underline"
          >
            Share ke LinkedIn
          </a>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-sm mb-10">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <article className="prose prose-invert max-w-none">
          <p className="whitespace-pre-line leading-relaxed text-slate-300">
            {post.content}
          </p>
        </article>
      </div>
    </div>
    // </div>
  );
}
