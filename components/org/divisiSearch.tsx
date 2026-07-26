"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import TeamCard from "@/components/org/cardTeam";
import { Department } from "@/lib/api";

export default function DivisiSearch({
  departments,
}: {
  departments: Department[];
}) {
  const [query, setQuery] = useState("");

  // Filter: kalau search kosong, tampilin semua departemen apa adanya.
  // Kalau ada isinya, cuma tampilin departemen yang punya anggota dengan
  // nama cocok (case-insensitive), dan cuma anggota yang cocok aja yang muncul.
  const filteredDepartments = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return departments;

    return departments
      .map((dept) => ({
        ...dept,
        members: dept.members.filter((m) =>
          m.name.toLowerCase().includes(q),
        ),
      }))
      .filter((dept) => dept.members.length > 0);
  }, [departments, query]);

  const noResults = query.trim() !== "" && filteredDepartments.length === 0;

  return (
    <>
      {/* --- FILTER & SEARCH SECTION --- */}
      <section className="py-6 bg-slate-950 border-t border-slate-900">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Temukan Anggota
            </h3>
            <p className="text-slate-400 text-sm">
              Cari nama anggota berdasarkan departemen atau gunakan fitur
              pencarian untuk menemukan anggota tertentu.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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

      {/* --- SECTION: DEPARTEMEN LIST (sudah difilter search) --- */}
      <section className="py-12 bg-slate-950">
        <div className="container px-4 md:px-6 space-y-16">
          {noResults && (
            <div className="text-center text-slate-500 py-10">
              Nggak ada anggota dengan nama &quot;{query}&quot; ditemukan.
            </div>
          )}

          {filteredDepartments.map((dept) => (
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
    </>
  );
}
