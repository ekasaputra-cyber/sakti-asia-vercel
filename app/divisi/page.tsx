import { Badge } from "@/components/ui/badge";
import { getLeadership, getBoard, getDepartments } from "@/lib/api";
import TeamCard from "@/components/org/cardTeam";
import DivisiSearch from "@/components/org/divisiSearch";
import { Layers } from "lucide-react";

export default async function DivisiPage() {
  let leadership: Awaited<ReturnType<typeof getLeadership>> = [];
  let coreBoard: Awaited<ReturnType<typeof getBoard>> = [];
  let departments: Awaited<ReturnType<typeof getDepartments>> = [];

  try {
    [leadership, coreBoard, departments] = await Promise.all([
      getLeadership(),
      getBoard(),
      getDepartments(),
    ]);
  } catch {
    // Backend belum bisa diakses — tampilkan halaman kosong daripada crash.
  }

  const ketua = leadership.find((l) => l.role === "Ketua Umum");
  const wakil = leadership.find((l) => l.role === "Wakil Ketua");

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      {/* --- HEADER SECTION --- */}
      <section className="relative py-20 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-hive-pattern opacity-30"></div>
        <div className="absolute top-0 right-0 w-75 h-75 bg-yellow-500/10 blur-[100px] rounded-full -z-10"></div>

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
          >
            <Layers className="mr-2 h-3 w-3" />
            Struktur Organisasi
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Pilar Penggerak <span className="text-yellow-500">Hive.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat otak dan otot di balik SAKTI. Sinergi antara
            High Command dan Specialized Units.
          </p>
        </div>
      </section>

      {/* --- SECTION 1: HIGH COMMAND (BPH) --- */}
      <section className="py-16 bg-slate">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white inline-block border-b-2 border-yellow-500 pb-1">
              High Command (BPH)
            </h2>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="w-full md:w-1/3 max-w-sm mx-auto">
                <div className="text-center mb-3 text-xs text-yellow-500 font-bold uppercase tracking-widest bg-yellow-500/10 py-1 rounded-full">
                  Ketua Umum
                </div>
                {ketua && <TeamCard member={ketua} />}
              </div>
              <div className="w-full md:w-1/3 max-w-sm mx-auto">
                <div className="text-center mb-3 text-xs text-slate-500 font-bold uppercase tracking-widest bg-slate-900 py-1 rounded-full">
                  Wakil Ketua
                </div>
                {wakil && <TeamCard member={wakil} />}
              </div>
            </div>

            <div>
              <div className="text-center mb-6 text-sm text-slate-500 font-bold uppercase tracking-widest">
                Sekretaris & Bendahara
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {coreBoard.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEARCH + DEPARTEMEN LIST (client component, biar search-nya interaktif) --- */}
      <DivisiSearch departments={departments} />
    </div>
  );
}
