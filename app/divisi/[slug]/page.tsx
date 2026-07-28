import { getDepartment } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import TeamCard from "@/components/org/cardTeam";

export default async function DivisiDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let dept: Awaited<ReturnType<typeof getDepartment>> = null;
  try {
    dept = await getDepartment(slug);
  } catch {
    // Backend belum bisa diakses — treat sama kayak "nggak ketemu".
  }

  if (!dept) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container max-w-4xl mx-auto px-6 py-16">

        <Link
          href="/divisi"
          className="text-yellow-500 hover:underline text-sm"
        >
          ← Kembali ke Divisi
        </Link>

        <h1 className="text-4xl font-bold mt-6 mb-4">
          {dept.name}
        </h1>

        <p className="text-slate-400 mb-10">
          {dept.description}
        </p>

        {/* JOBDESK */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-yellow-500 mb-3">
            Jobdesk
          </h2>
          <p className="text-slate-300 leading-relaxed">
            {dept.jobdesk}
          </p>
        </section>

        {/* PROGRAMS */}
        {dept.programs && dept.programs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              Program Kerja
            </h2>
            <ul className="space-y-2 text-slate-300">
              {dept.programs.map((program, i) => (
                <li key={i}>• {program}</li>
              ))}
            </ul>
          </section>
        )}

        {/* SKILLS */}
        {dept.skills && dept.skills.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              Skill yang Dikembangkan
            </h2>
            <ul className="space-y-2 text-slate-300">
              {dept.skills.map((skill, i) => (
                <li key={i}>• {skill}</li>
              ))}
            </ul>
          </section>
        )}

        {/* PROJECTS */}
        {dept.projects && dept.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              Project
            </h2>
            <ul className="space-y-2 text-slate-300">
              {dept.projects.map((project, i) => (
                <li key={i}>• {project}</li>
              ))}
            </ul>
          </section>
        )}

        {/* ANGGOTA */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6">
            Anggota Divisi
          </h2>

          {dept.members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {dept.members.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <p className="text-slate-500">Belum ada anggota di divisi ini.</p>
          )}
        </section>

      </div>
    </div>
  );
}
