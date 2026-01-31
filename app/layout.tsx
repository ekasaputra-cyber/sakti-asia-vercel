import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar"; // Sesuaikan path
import Footer from "@/components/layout/footer"; // Sesuaikan path

const inter = Inter({ subsets: ["latin"] });

// 1. VIEWPORT SETTINGS (PENTING UNTUK MOBILE)
// Ini mengatur warna bar browser di HP agar menyatu dengan header hitam kita.
export const viewport: Viewport = {
  themeColor: "#020617", // Slate-950 (Sesuai background website)
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// 2. METADATA GLOBAL (SEO & SOCIAL SHARE)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.saktiasia.web.id/"), 
  
  title: {
    default: "SAKTI - Sindikat Akademik Teknik Informatika",
    template: "%s | SAKTI",
  },
  description: 
    "Wadah kolaborasi mahasiswa TI. Fokus pada pengembangan Hard Skill (Coding, AI, IoT) dan Soft Skill kepemimpinan.",
  
  keywords: [
    "SAKTI", 
    "Teknik Informatika", 
    "Organisasi IT", 
    "Mahasiswa TI", 
    "Komunitas Coding", 
    "Web Development", 
    "Kampus ITB Asia"
  ],
  
  authors: [{ name: "Divisi Ristek SAKTI" }],
  creator: "SAKTI Dev Team",
  
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.saktiasia.web.id",
    title: "SAKTI - Sindikat Akademik Teknik Informatika",
    description: "Membangun Hive Teknologi & Inovasi. Gabung bersama kami!",
    siteName: "SAKTI Organisasi TI",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "SAKTI - Industrial Hive",
      },
    ],
  },
  
  // Konfigurasi Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "SAKTI - Sindikat Akademik Teknik Informatika",
    description: "Wadah kolaborasi mahasiswa TI. Bersatu, bekerja keras, menghasilkan karya.",
    images: ["/logo.png"], // Gunakan gambar yang sama
    creator: "@sakti_id", // Ganti username twitter/X organisasi
  },
  
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.jpg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Tambahkan class 'dark' untuk memaksa mode gelap
    <html lang="id" className="dark scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-950 text-white selection:bg-yellow-500 selection:text-black`}>
        <Navbar />
        <main className="relative overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}