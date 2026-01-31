import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { leadershipData, coreBoard, departments } from "@/data/org-data";
import TeamCard from "@/components/org/cardTeam"; 
import { ArrowRight, Layers, Users } from "lucide-react";
import Link from "next/link";

export default function DivisiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      
      {/* --- HEADER SECTION --- */}
      <section className="relative py-20 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-hive-pattern opacity-30"></div>
        <div className="absolute top-0 right-0 w-75 h-75 bg-yellow-500/10 blur-[100px] rounded-full -z-10"></div>

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <Badge variant="outline" className="mb-4 border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
            <Layers className="mr-2 h-3 w-3" />
            Struktur Organisasi
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Pilar Penggerak <span className="text-yellow-500">Hive.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat otak dan otot di balik SAKTI. Sinergi antara High Command dan Specialized Units.
          </p>
        </div>
      </section>

      {/* --- SECTION 1: HIGH COMMAND (BPH) --- */}
      <section className="py-16 bg-black">
        <div className="container px-4 md:px-6">
          
          {/* Judul Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white inline-block border-b-2 border-yellow-500 pb-1">High Command (BPH)</h2>
          </div>

          <div className="flex flex-col gap-12">
            
            {/* Tier 1: Ketua & Wakil */}
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="w-full md:w-1/3 max-w-sm mx-auto">
                 <div className="text-center mb-3 text-xs text-yellow-500 font-bold uppercase tracking-widest bg-yellow-500/10 py-1 rounded-full">Ketua Umum</div>
                 <TeamCard member={leadershipData.ketua} />
              </div>
              <div className="w-full md:w-1/3 max-w-sm mx-auto">
                 <div className="text-center mb-3 text-xs text-slate-500 font-bold uppercase tracking-widest bg-slate-900 py-1 rounded-full">Wakil Ketua</div>
                 <TeamCard member={leadershipData.wakil} />
              </div>
            </div>

            {/* Tier 2: Sekretaris & Bendahara */}
            <div>
              <div className="text-center mb-6 text-sm text-slate-500 font-bold uppercase tracking-widest">Sekretaris & Bendahara</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {coreBoard.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 2: DEPARTEMEN LIST (Updated Style) --- */}
      <section className="py-20 bg-slate-950">
        <div className="container px-4 md:px-6 space-y-24">
          
          {departments.map((dept) => (
            <div key={dept.id} className="relative">
              
              {/* Header Departemen (Centered) */}
              <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
                <div className="h-12 w-12 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-yellow-500 mb-4 shadow-[0_0_20px_-5px_rgba(234,179,8,0.2)]">
                   <Users className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{dept.name}</h3>
                <p className="text-slate-400">{dept.description}</p>
                <div className="h-1 w-20 bg-linear-to-r from-transparent via-slate-800 to-transparent mt-6"></div>
              </div>

              {/* Grid Anggota (Centered Grid - Sama seperti BPH) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {dept.members.length > 0 ? (
                  dept.members.map((m) => (
                    <TeamCard key={m.id} member={m} />
                  ))
                ) : (
                  // Tampilan Kosong (Open Recruitment)
                  <div className="col-span-full flex justify-center">
                    <div className="w-full max-w-md py-10 border border-dashed border-slate-800 rounded-xl bg-slate-900/20 flex flex-col items-center justify-center text-center hover:border-yellow-500/30 transition-colors">
                      <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <Users className="h-5 w-5 text-slate-500" />
                      </div>
                      <h4 className="text-slate-300 font-medium">Divisi Masih Kosong</h4>
                      <p className="text-slate-500 text-sm mb-4">Pendaftaran anggota baru segera dibuka.</p>
                      <Button variant="outline" size="sm" className="border-slate-700 bg-transparent text-slate-300 hover:text-yellow-500 hover:border-yellow-500">
                        Info Open Recruitment
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-linear-to-t from-yellow-900/10 to-black border-t border-slate-900">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Siap Menjadi Bagian dari Hive?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Kami selalu mencari talenta baru yang memiliki semangat belajar tinggi.
          </p>
          <Link href="#">
            <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold px-8 shadow-lg shadow-yellow-500/20">
              Daftar Sekarang <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}