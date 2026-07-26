import Link from "next/link";
import Image from "next/image";
import { Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { getContactInfo } from "@/lib/api";

export default async function Footer() {
  const contact = await getContactInfo();

  return (
    <footer className="border-t border-yellow-500/10 bg-black text-slate-400 pt-16 pb-8">
      <div className="container px-4 md:px-8">
        
        {/* --- TOP SECTION (Grid Layout) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* 1. BRANDING & DESC */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex gap-3 font-bold text-xl items-center text-white">
               {/* Logo Kecil */}
               <div className="relative h-8 w-8 overflow-hidden rounded bg-black border border-yellow-500/30">
                 <Image 
                   src="/logo.jpg" 
                   alt="Logo SAKTI" 
                   fill 
                   className="object-contain p-0.5"
                 />
               </div>
               <span>SAK<span className="text-yellow-500">TI</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-slate-500">
              Sindikat Akademi Teknik Informatika. Wadah kolaborasi mahasiswa TI untuk mengembangkan hard skill, soft skill, dan jejaring profesional di era digital.
            </p>
            <div className="flex gap-4 pt-2">
              {contact.instagram_url && (
                <SocialIcon icon={Instagram} href={contact.instagram_url} />
              )}
              {contact.linkedin_url && (
                <SocialIcon icon={Linkedin} href={contact.linkedin_url} />
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
              <li><Link href="/" className="hover:text-yellow-500 transition-colors">Beranda</Link></li>
              <li><Link href="/profil" className="hover:text-yellow-500 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/divisi" className="hover:text-yellow-500 transition-colors">Divisi & Proker</Link></li>
              <li><Link href="/blog" className="hover:text-yellow-500 transition-colors">Blog & Berita</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-500 transition-colors">Kontak</Link></li>
              <li><Link href="/pendaftaran" className="hover:text-yellow-500 transition-colors">Open Recruitment</Link></li>
            </ul>
          </div>

          {/* 3. KONTAK / ALAMAT */}
          <div>
            <h3 className="font-bold text-white mb-6">Sekretariat</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">
                  {contact.address}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-yellow-500 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-yellow-500 transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- BOTTOM SECTION (Copyright) --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} SAKTI Organisasi TI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
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
      className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-yellow-500 hover:text-black hover:border-yellow-400 transition-all hover:scale-110"
    >
      <Icon className="h-5 w-5" />
    </Link>
  )
}