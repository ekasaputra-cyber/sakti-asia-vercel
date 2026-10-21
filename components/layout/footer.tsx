import Link from "next/link";
import Image from "next/image";
import { Github, Instagram, Youtube, Mail, MapPin } from "lucide-react";
import { getContactInfo, OrgContact } from "@/lib/api";

// Dipakai kalau API Laravel nggak bisa diakses (misal pas proses build di
// Vercel, sebelum backend-nya online publik) — biar build/render nggak crash.
const FALLBACK_CONTACT: OrgContact = {
  address: "Institut Teknologi dan Bisnis Asia Malang",
  email: "himapro.sakti@gmail.com",
  office_hours: "Senin - Jumat, 09.00 - 16.00 WIB",
  maps_query: null,
  instagram_url: null,
  youtube_url: null,
  github_url: null,
};

export default async function Footer() {
  let contact: OrgContact;
  try {
    contact = await getContactInfo();
  } catch {
    contact = FALLBACK_CONTACT;
  }

  return (
    <footer className="border-t border-yellow-500/10 bg-black text-slate-400 pt-16 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TOP SECTION (Grid Layout) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* 1. BRANDING & DESC */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex gap-3 font-bold text-xl items-center text-white">
               {/* Logo Kecil */}
               <div className="relative h-8 w-8 overflow-hidden rounded bg-black border border-yellow-500/30">
                 <Image 
                   src="/logo.jpg" 
                   alt="Logo SAKTI" 
                   fill 
                   sizes="32px"
                   className="object-contain p-0.5"
                 />
               </div>
               <span>SAK<span className="text-yellow-500">TI</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-slate-500 break-words">
              Sindikat Akademi Teknik Informatika. Wadah kolaborasi mahasiswa TI untuk mengembangkan hard skill, soft skill, dan jejaring profesional di era digital.
            </p>
            <div className="flex gap-4 pt-2">
              {contact.instagram_url && (
                <SocialIcon icon={Instagram} href={contact.instagram_url} />
              )}
              {contact.youtube_url && (
                <SocialIcon icon={Youtube} href={contact.youtube_url} />
              )}
              {contact.github_url && (
                <SocialIcon icon={Github} href={contact.github_url} />
              )}
              <SocialIcon icon={Mail} href={`mailto:${contact.email}`} />
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div>
            <h3 className="font-bold text-white mb-6">Navigasi</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-yellow-500 transition-colors inline-block py-1 min-h-[36px] flex items-center">Beranda</Link></li>
              <li><Link href="/profil" className="hover:text-yellow-500 transition-colors inline-block py-1 min-h-[36px] flex items-center">Tentang Kami</Link></li>
              <li><Link href="/divisi" className="hover:text-yellow-500 transition-colors inline-block py-1 min-h-[36px] flex items-center">Divisi & Proker</Link></li>
              <li><Link href="/blog" className="hover:text-yellow-500 transition-colors inline-block py-1 min-h-[36px] flex items-center">Blog & Berita</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-500 transition-colors inline-block py-1 min-h-[36px] flex items-center">Kontak</Link></li>
              <li><Link href="/pendaftaran" className="hover:text-yellow-500 transition-colors inline-block py-1 min-h-[36px] flex items-center">Open Recruitment</Link></li>
            </ul>
          </div>

          {/* 3. KONTAK / ALAMAT */}
          <div>
            <h3 className="font-bold text-white mb-6">Sekretariat</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start min-w-0">
                <MapPin className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line break-words text-slate-400">
                  {contact.address}
                </span>
              </li>
              <li className="flex gap-3 items-center min-w-0">
                <Mail className="h-5 w-5 text-yellow-500 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-yellow-500 transition-colors break-all inline-block py-1">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- BOTTOM SECTION (Copyright) --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} SAKTI Organisasi TI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-400 py-1 inline-block min-h-[36px] flex items-center">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400 py-1 inline-block min-h-[36px] flex items-center">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Komponen Kecil untuk Icon Sosmed (Biar rapi)
function SocialIcon({ icon: Icon, href }: { icon: any, href: string }) {
  return (
    <Link 
      href={href} 
      className="h-11 w-11 min-h-[44px] min-w-[44px] rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-yellow-500 hover:text-black hover:border-yellow-400 transition-[transform,color,background-color,border-color] duration-200 hover:scale-110"
    >
      <Icon className="h-5 w-5" />
    </Link>
  )
}