import { departments } from "@/data/org-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Users } from "lucide-react";

export default async function DivisiDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dept = departments.find((d) => d.slug === slug);

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

        {/* SKILLS */}
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

        {/* PROJECTS */}
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

        {/* ANGGOTA */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6">
            Anggota Divisi
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {dept.members.map((member) => (
              <div
                key={member.id}
                className="bg-slate-900 p-4 rounded-xl border border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <Users className="text-yellow-500 w-5 h-5" />
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-slate-400">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}