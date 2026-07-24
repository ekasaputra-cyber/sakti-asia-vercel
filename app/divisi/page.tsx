import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLeadership, getBoard, getDepartments } from "@/lib/api";
import TeamCard from "@/components/org/cardTeam";
import { Layers, Users } from "lucide-react";
import Link from "next/link";

export default async function DivisiPage() {
  const leadership = await getLeadership();
  const coreBoard = await getBoard();
  const departments = await getDepartments();

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

      {/* --- FILTER & SEARCH SECTION (NEW) --- */}
      <section className="py-6 bg-slate-950 border-t border-slate-900">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Temukan Anggota
            </h3>
            <p className="text-slate-400 text-sm">
              Cari nama anggota berdasarkan divisi
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Cari nama anggota..."
              className="w-full bg-black border border-slate-800 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-yellow-500 transition"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {departments.map((dept) => (
              <a
                key={dept.id}
                href={`#dept-${dept.id}`}
                className="px-4 py-2 bg-black border border-slate-800 rounded-full text-sm text-slate-400 hover:text-yellow-500 hover:border-yellow-500 transition"
              >
                {dept.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: DEPARTEMEN LIST --- */}
      <section className="py-12 bg-slate-950">
        <div className="container px-4 md:px-6 space-y-16">
          {departments.map((dept) => (
            <div
              key={dept.id}
              id={`dept-${dept.id}`}
              className="relative scroll-mt-24"
            >
              <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
                <div className="h-12 w-12 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-yellow-500 mb-4 shadow-[0_0_20px_-5px_rgba(234,179,8,0.2)]">
                  <Users className="h-6 w-6" />
                </div>
                <Link href={`/divisi/${dept.slug}`} className="group">
                  <h3
                    className="
                      text-3xl font-bold mb-2
                      text-yellow-400
                      animate-pulse
                      drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]
                      transition-all duration-300
                      group-hover:text-yellow-300
                      group-hover:drop-shadow-[0_0_12px_rgba(234,179,8,0.9)]
                    "
                  >
                    {dept.name}
                  </h3>
                  <div className="h-[2px] w-0 bg-yellow-500 mx-auto transition-all duration-500 group-hover:w-24"></div>
                </Link>
                <div className="text-sm text-yellow-500 mb-2">
                  {dept.members.length} Anggota Aktif
                </div>
                <p className="text-slate-400">{dept.description}</p>
                <div className="h-1 w-20 bg-linear-to-r from-transparent via-slate-800 to-transparent mt-6"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {dept.members.length > 0 ? (
                  dept.members.map((m) => <TeamCard key={m.id} member={m} />)
                ) : (
                  <div className="col-span-full flex justify-center">
                    <div className="w-full max-w-md py-10 border border-dashed border-slate-800 rounded-xl bg-slate-900/20 flex flex-col items-center justify-center text-center hover:border-yellow-500/30 transition-colors">
                      <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center mb-3">
                        <Users className="h-5 w-5 text-slate-500" />
                      </div>
                      <h4 className="text-slate-300 font-medium">
                        Divisi Masih Kosong
                      </h4>
                      <p className="text-slate-500 text-sm mb-4">
                        Pendaftaran anggota baru segera dibuka.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-700 bg-transparent text-slate-300 hover:text-yellow-500 hover:border-yellow-500"
                      >
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
    </div>
  );
}