"use client"; // <--- 1. WAJIB: Tambahkan ini agar bisa pakai usePathname

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // <--- 2. Import hook ini
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { 
  Menu, 
  Home, 
  User, 
  Layers, 
  FileText, 
  Github, 
  Instagram, 
  Linkedin,
  ChevronRight
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname(); // <--- 3. Ambil URL saat ini

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Profil", href: "/profil", icon: User },
    { name: "Divisi", href: "/divisi", icon: Layers },
    { name: "Blog", href: "/blog", icon: FileText },
  ];

  return (
    // NAVBAR UTAMA: Hitam Pekat dengan Border Kuning Tipis
    <nav className="border-b border-yellow-500/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 w-full text-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* LOGO AREA */}
        <div className="flex gap-3 font-bold text-xl items-center">
          <div className="relative h-10 w-10 overflow-hidden rounded bg-black border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
             <Image 
               src="/logo.jpg" 
               alt="Logo SAKTI" 
               fill 
               className="object-contain p-0.5" 
             />
          </div>
          <Link href="/" className="tracking-wide hover:opacity-80 transition-opacity">
            SAK<span className="text-yellow-500 text-shadow-sm">TI</span>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            // Cek apakah link ini aktif
            const isActive = pathname === link.href;
            
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`
                  transition-all flex items-center gap-2 hover:scale-105
                  ${isActive 
                    ? "text-yellow-400 font-bold drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" // Style Aktif
                    : "text-slate-400 hover:text-yellow-400" // Style Tidak Aktif
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* RIGHT AREA */}
        <div className="flex gap-3 items-center">
          {/* Tombol Join: Kuning Neon */}
          <Button size="sm" className="hidden md:flex font-bold bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)] border-none transition-all">
            Join Kami
          </Button>

          {/* MOBILE MENU TRIGGER */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-200 hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              
              {/* SHEET CONTENT: Background Hitam (Fixed) */}
              <SheetContent side="right" className="flex flex-col h-full w-75 border-l border-yellow-500/20 bg-slate-950 text-white">
                
                <SheetHeader className="text-left mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 bg-yellow-500 rounded flex items-center justify-center text-black font-bold shadow-[0_0_10px_rgba(234,179,8,0.8)]">S</div>
                    <SheetTitle className="text-xl font-bold text-white">SAKTI</SheetTitle>
                  </div>
                  <SheetDescription className="text-slate-400">
                    Sindikat Akademik Teknik Informatika
                  </SheetDescription>
                </SheetHeader>

                {/* List Menu Mobile */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`
                          flex items-center justify-between p-3 rounded-lg transition-all group border
                          ${isActive 
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-bold" // Style Mobile Aktif
                            : "text-slate-300 border-transparent hover:bg-yellow-500/10 hover:text-yellow-400 hover:border-yellow-500/20" // Style Mobile Biasa
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className={`h-5 w-5 transition-colors ${isActive ? "text-yellow-500" : "text-slate-500 group-hover:text-yellow-500"}`} />
                          <span className="font-medium">
                            {link.name}
                          </span>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-colors ${isActive ? "text-yellow-500" : "text-slate-600 group-hover:text-yellow-500"}`} />
                      </Link>
                    );
                  })}
                </div>

                {/* Footer Menu Mobile */}
                <div className="mt-auto">
                  <Button className="w-full mb-6 font-bold bg-yellow-500 text-black hover:bg-yellow-400" size="lg">
                    Join Member Sekarang
                  </Button>
                  
                  <div className="flex justify-center gap-6 pb-4 border-t border-slate-800 pt-6">
                    <Link href="#" className="text-slate-500 hover:text-white transition-colors hover:scale-110">
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-slate-500 hover:text-pink-500 transition-colors hover:scale-110">
                      <Instagram className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-slate-500 hover:text-blue-500 transition-colors hover:scale-110">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                  <p className="text-center text-xs text-slate-600">
                    © 2026 SAKTI Organisasi TI
                  </p>
                </div>

              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}