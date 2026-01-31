import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { demisioners } from "@/data/org-data";
import { Crown, Info, History, ShieldCheck, Hexagon } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      
      {/* --- HEADER SECTION --- */}
      <section className="relative py-20 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-hive-pattern opacity-30"></div>
        <div className="absolute top-0 left-0 w-75 h-75 bg-yellow-500/10 blur-[100px] rounded-full -z-10"></div>

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <Badge variant="outline" className="mb-4 border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
            <Info className="mr-2 h-3 w-3" />
            Tentang Kami
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Mengenal <span className="text-yellow-500">SAKTI.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Lebih dari sekadar organisasi, kami adalah inkubator pergerakan mahasiswa IT yang menjunjung tinggi solidaritas dan inovasi.
          </p>
        </div>
      </section>

      {/* --- STORY & PHILOSOPHY --- */}
      <section className="py-20 bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Kolom Kiri: Logo Besar & Filosofi */}
            <div className="relative group">
               {/* Efek Glow di belakang logo */}
               <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
               
               <div className="relative z-10 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl text-center backdrop-blur-sm">
                  <div className="relative h-48 w-48 mx-auto mb-6">
                    <Image 
                      src="/logo.jpg" 
                      alt="Logo SAKTI" 
                      fill 
                      className="object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">The Cyber Hive</h3>
                  <p className="text-sm text-slate-400 italic">
                    "Seperti lebah, kami bekerja keras, terorganisir, dan menghasilkan 'madu' (karya) yang bermanfaat bagi sekitar."
                  </p>
               </div>
            </div>

            {/* Kolom Kanan: Teks Sejarah */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Latar Belakang</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  <strong className="text-yellow-500">SAKTI (Sindikat Akademik Teknik Informatika)</strong> didirikan pada tahun 2010 sebagai respons terhadap kebutuhan mahasiswa akan wadah pengembangan diri di luar jam kuliah.
                </p>
                <p>
                  Berawal dari komunitas belajar kecil di pojok kantin, kini SAKTI telah bertransformasi menjadi organisasi mahasiswa terbesar di Fakultas Ilmu Komputer dengan lebih dari 500 alumni yang tersebar di berbagai perusahaan teknologi top tier.
                </p>
              </div>

              {/* Poin Nilai */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <ShieldCheck className="text-yellow-500 h-6 w-6" />
                  <span className="font-bold text-sm">Integritas</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <Hexagon className="text-yellow-500 h-6 w-6" />
                  <span className="font-bold text-sm">Solidaritas</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- HALL OF FAME (DEMISIONER) --- */}
      <section className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
             <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 rounded-full mb-4">
                <History className="h-6 w-6 text-yellow-500" />
             </div>
             <h2 className="text-3xl font-bold text-white">Hall of Fame</h2>
             <p className="text-slate-400 mt-2">Para pemimpin terdahulu yang telah meletakkan fondasi.</p>
          </div>

          {/* Timeline Style Layout */}
          <div className="relative max-w-4xl mx-auto">
             {/* Garis Tengah Timeline (Hidden di Mobile) */}
             <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-800 hidden md:block"></div>

             <div className="space-y-12">
                {demisioners.map((dem, index) => (
                   <div key={dem.id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      
                      {/* Sisi 1: Kosong (Spacer) */}
                      <div className="flex-1 w-full hidden md:block"></div>

                      {/* Sisi Tengah: Marker Tahun */}
                      <div className="relative z-10 flex items-center justify-center h-12 w-12 rounded-full bg-slate-900 border-2 border-yellow-500 text-yellow-500 font-bold text-xs shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                         {dem.period?.substring(0,4)}
                      </div>

                      {/* Sisi 2: Content Card */}
                      <div className="flex-1 w-full">
                         <div className="group relative p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-yellow-500/50 transition-all text-center md:text-left">
                            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex items-center gap-4 mb-2 justify-center md:justify-start">
                               <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center">
                                  <Crown className="h-5 w-5 text-yellow-500" />
                               </div>
                               <div>
                                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{dem.name}</h3>
                                  <p className="text-xs text-slate-500 uppercase tracking-widest">Ketua Umum</p>
                               </div>
                            </div>
                            
                            <p className="text-slate-400 text-sm mt-3">
                               "Masa bakti {dem.period}. Membawa SAKTI menuju era digitalisasi modern."
                            </p>
                         </div>
                      </div>

                   </div>
                ))}
             </div>
          </div>

        </div>
      </section>

    </div>
  );
}