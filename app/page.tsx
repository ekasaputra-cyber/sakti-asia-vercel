"use client";

import Link from "next/link";
// import { useState } from "react";
import {
  ChevronRight,
  ArrowRight,
  Clock,
  Users,
  Trophy,
  Star,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { leadershipData } from "@/data/org-data";
import TeamCard from "@/components/org/cardTeam";
import { useEffect, useState } from "react";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    let start = 1;
    const duration = 1500; // 1.5 detik
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  // DATA AGENDA
  const prokers = [
    {
      title: "Tech Summit 2026",
      date: "12 Maret 2026",
      category: "Seminar",
      desc: "Konferensi teknologi terbesar tahun ini, menghadirkan pembicara dari Google & GoTo membahas masa depan AI.",
    },
    {
      title: "Code Camp : Zero to Hero",
      date: "15-17 Mei 2026",
      category: "Bootcamp",
      desc: "Pelatihan intensif 3 hari 2 malam. Fokus pada fundamental algoritma dan clean code untuk mahasiswa baru.",
    },
    {
      title: "Hackathon SAKTI",
      date: "20 Agustus 2026",
      category: "Kompetisi",
      desc: "Tantangan coding 24 jam non-stop. Bangun solusi cerdas untuk permasalahan Smart City.",
    },
    {
      title: "TI Festival & Expo",
      date: "10 November 2026",
      category: "Pameran",
      desc: "Puncak apresiasi karya mahasiswa. Pameran tugas akhir, bazar startup, dan malam penganugerahan.",
    },
  ];

  const eventDates = [
    new Date(2026, 2, 12), // 12 Maret 2026 (bulan mulai dari 0, jadi 2 = Maret)
    new Date(2026, 4, 15), // 15 Mei 2026
    new Date(2026, 4, 16),
    new Date(2026, 4, 17),
    new Date(2026, 7, 20), // 20 Agustus 2026
    new Date(2026, 10, 10), // 10 November 2026
  ];

  const prokerWithDate = [
    { ...prokers[0], dateObj: new Date(2026, 2, 12) },
    { ...prokers[1], dateObj: new Date(2026, 4, 15) },
    { ...prokers[1], dateObj: new Date(2026, 4, 16) },
    { ...prokers[1], dateObj: new Date(2026, 4, 17) },
    { ...prokers[2], dateObj: new Date(2026, 7, 20) },
    { ...prokers[3], dateObj: new Date(2026, 10, 10) },
  ];

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const achievements = [
    {
      name: "Rina Wijaya",
      event: "Juara 1 Gemastik UX Design",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Tim SAKTI Go",
      event: "Gold Medal Lomba Inovasi IoT",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Dimas Anggara",
      event: "Google Solution Challenge Top 50",
      image: "/placeholder-user.jpg",
    },
  ];

  const selectedEvents = prokerWithDate.filter(
    (item) =>
      selectedDate &&
      item.dateObj.toDateString() === selectedDate.toDateString(),
  );

  const stats = [
    {
      number: 500,
      suffix: "+",
      label: "Alumni Tersebar",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
    },
    {
      number: 30,
      suffix: "+",
      label: "Event Diselenggarakan",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
    },
    {
      number: 6,
      suffix: "",
      label: "Divisi Aktif",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
    },
    {
      number: 1000,
      suffix: "+",
      label: "Peserta Kegiatan",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      text: "text-purple-400",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full py-20 md:py-32 lg:py-33 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-hive-pattern opacity-30 mask-[radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-yellow-500/10 blur-[120px] rounded-full -z-10"></div>

        {/* UBAH: Tambah padding px-6 md:px-12 */}
        <div className="container px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-400 backdrop-blur-sm shadow-[0_0_15px_-5px_rgba(234,179,8,0.5)]">
              <span className="flex h-2 w-2 rounded-full bg-yellow-500 mr-2 animate-pulse shadow-[0_0_10px_rgba(234,179,8,1)]"></span>
              Open Recruitment 2026
              <ChevronRight className="ml-1 h-4 w-4" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl text-white">
              Membangun Hive <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-amber-600 drop-shadow-sm">
                Teknologi & Inovasi
              </span>
            </h1>
            <p className="mx-auto max-w-175 text-slate-400 md:text-xl leading-relaxed">
              Wadah kolaborasi "Sarang Lebah" mahasiswa TI. Bersatu, bekerja
              keras, dan menghasilkan karya manis untuk masa depan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
              <Button
                size="lg"
                className="h-12 px-8 text-base bg-yellow-500 hover:bg-yellow-400 text-black shadow-[0_0_20px_-5px_rgba(234,179,8,0.4)] transition-all hover:scale-105 font-bold border-none"
              >
                Gabung Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/divisi">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-yellow-400"
                >
                  Lihat Divisi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: STATISTIK ORGANISASI --- */}
      <section className="py-20 bg-slate-950 border-y border-slate-900">
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((item, i) => (
              <div
                key={i}
                className={`
            bg-black/60 backdrop-blur-sm
            rounded-2xl p-8
            border
            hover:-translate-y-2
            transition-all duration-300
            text-center
            shadow-lg
            ${item.border}
          `}
              >
                <h3
                  className={`text-3xl md:text-4xl font-extrabold mb-2 ${item.text}`}
                >
                  <AnimatedCounter target={item.number} suffix={item.suffix} />
                </h3>

                <p className="text-slate-400 text-sm tracking-wide">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: PIMPINAN & VISI MISI --- */}
      <section className="py-20 bg-slate-950 border-t border-slate-900 relative">
        {/* UBAH: Tambah padding px-6 md:px-12 */}
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 text-center">
                <TeamCard member={leadershipData.pembina} />
              </div>
              <div className="space-y-4 text-center mt-12">
                <TeamCard member={leadershipData.ketua} />
              </div>
            </div>
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="px-4 py-1 border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
              >
                Vision & Mission
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                Arah Gerak SAKTI
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
                  <h3 className="font-bold text-lg text-white mb-2">
                    Visi Ketua
                  </h3>
                  <p className="text-slate-300 italic">
                    "{leadershipData.ketua.visi}"
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-4">
                    Misi Utama
                  </h3>
                  <ul className="space-y-3">
                    {leadershipData.ketua.misi.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-slate-300 items-start group"
                      >
                        <div className="h-6 w-6 rounded bg-slate-800 text-yellow-500 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover:border-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                          {index + 1}
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: AGENDA (DESAIN BARU: CIRCUIT TIMELINE) --- */}
      <section className="py-24 bg-black relative">
        {/* UBAH: Tambah padding px-6 md:px-12 */}
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-slate-800 pb-8">
            <div className="max-w-2xl">
              <Badge
                variant="outline"
                className="mb-4 border-yellow-500/30 text-yellow-500"
              >
                Timeline Kegiatan
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Agenda Mendatang
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Catat tanggalnya! Jangan sampai ketinggalan momen penting
                pengembangan dirimu bersama SAKTI.
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="shrink-0 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                >
                  Lihat Kalender Lengkap <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-yellow-400">
                    Kalender Kegiatan SAKTI
                  </DialogTitle>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* KALENDER */}
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    modifiers={{
                      event: eventDates,
                    }}
                    modifiersClassNames={{
                      event: "bg-yellow-500 text-black font-bold rounded-full",
                    }}
                    className="rounded-md border border-slate-800"
                  />

                  {/* DETAIL ACARA */}
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 min-h-[300px]">
                    {selectedDate ? (
                      selectedEvents.length > 0 ? (
                        <div className="space-y-4">
                          {selectedEvents.map((item, index) => (
                            <div
                              key={index}
                              className="border-b border-slate-700 pb-3"
                            >
                              <h3 className="text-yellow-400 font-bold">
                                {item.title}
                              </h3>
                              <p className="text-xs text-slate-400 mb-2">
                                {item.date}
                              </p>
                              <p className="text-sm text-slate-300">
                                {item.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-400">
                          Tidak ada acara di tanggal ini.
                        </p>
                      )
                    ) : (
                      <p className="text-slate-400">
                        Pilih tanggal untuk melihat detail acara.
                      </p>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 md:transform md:-translate-x-1/2">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-yellow-500 via-transparent to-transparent opacity-50"></div>
            </div>

            <div className="space-y-12">
              {prokers.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1 w-full pl-12 md:pl-0">
                    <div
                      className={`group relative p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-yellow-500/50 hover:bg-slate-900 transition-all duration-300 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}
                    >
                      <div
                        className={`hidden md:block absolute top-1/2 w-8 h-px bg-slate-700 group-hover:bg-yellow-500/50 transition-colors ${index % 2 === 0 ? "-left-8" : "-right-8"}`}
                      ></div>
                      <div
                        className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
                      >
                        <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500 hover:text-black transition-colors">
                          {item.category}
                        </Badge>
                        <div className="flex items-center text-xs text-slate-400 gap-1">
                          <Clock className="h-3 w-3" />
                          {item.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="h-4 w-4 bg-black rounded-full border-2 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)] z-10"></div>
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-4 md:left-1/2 transform -translate-x-1/2 translate-y-full pt-4">
              <div className="h-2 w-2 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: MAHASISWA BERPRESTASI --- */}
      <section className="py-20 bg-slate-950 border-y border-slate-900">
        {/* UBAH: Tambah padding px-6 md:px-12 */}
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 border-yellow-500/30 text-yellow-400"
            >
              Achievement Unlocked
            </Badge>
            <h2 className="text-3xl font-bold text-white">
              Mahasiswa TI Berprestasi
            </h2>
            <p className="text-slate-400 mt-2">
              Bukti nyata kualitas SDM Organisasi SAKTI.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((item, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden aspect-4/5 md:aspect-auto md:h-100"
              >
                <div className="absolute inset-0 bg-slate-800">
                  <div className="w-full h-full flex items-center justify-center text-slate-700">
                    <Users className="h-20 w-20" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 text-yellow-400 mb-1">
                      <Trophy className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Winner
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.name}
                    </h3>
                    <p className="text-slate-300 text-sm">{item.event}</p>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/50 rounded-2xl transition-colors pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* --- SECTION: TESTIMONI --- */}
      <section className="py-20 bg-black">
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Apa Kata Mereka?</h2>
            <p className="text-slate-400 mt-2">
              Cerita dari alumni & anggota SAKTI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alumni 2022",
                text: "SAKTI membentuk saya jadi lebih percaya diri dan siap masuk industri teknologi.",
              },
              {
                name: "Anggota Internal",
                text: "Lingkungan yang suportif dan banyak belajar hal baru setiap minggu.",
              },
              {
                name: "Dosen Pembina",
                text: "Organisasi yang aktif, progresif, dan berdampak nyata bagi mahasiswa.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-yellow-500/30 transition-colors"
              >
                <p className="text-slate-300 italic mb-4">"{item.text}"</p>
                <h4 className="text-yellow-500 font-semibold">{item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* --- SECTION 5: DIDIKAN ANAK TI --- */}
      <section className="py-20 bg-black">
        {/* UBAH: Tambah padding px-6 md:px-12 */}
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold text-white">
                Bukan Sekadar <br />
                <span className="text-yellow-500">Himpunan Biasa.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                "Didikan Anak TI" tentang membentuk mental baja dan logika
                algoritma yang kuat. Di SAKTI, semua sama rata, teman adalah
                partner coding, dan kampus adalah rumah kedua.
              </p>
              <ul className="space-y-4">
                {[
                  "Mentoring Akademik Sebaya",
                  "Kultur Sharing & Open Source",
                  "Solidaritas Tanpa Batas",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-white font-medium"
                  >
                    <div className="h-8 w-8 rounded-full bg-slate-900 border border-yellow-500/30 flex items-center justify-center text-yellow-500">
                      <Star className="h-4 w-4" />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
              <Button className="bg-white text-black hover:bg-slate-200 mt-4">
                Lihat Galeri Kegiatan
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="h-40 w-full bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center text-slate-600">
                  Foto 1
                </div>
                <div className="h-56 w-full bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center text-slate-600 bg-hive-pattern">
                  Foto 2
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-56 w-full bg-yellow-500/10 rounded-2xl border border-yellow-500/20 flex items-center justify-center text-yellow-500/50">
                  Foto 3
                </div>
                <div className="h-40 w-full bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center text-slate-600">
                  Foto 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: OPEN RECRUITMENT CTA --- */}
      {/* <section className="py-20 bg-black text-center">
        <div className="container px-6 md:px-12 lg:px-24">
          <h2 className="text-4xl font-bold text-white mb-4">
            Siap Jadi Bagian dari Hive?
          </h2>
          <p className="text-slate-400 mb-8">
            Jangan cuma jadi penonton. Bangun karier, relasi, dan prestasi
            bersama SAKTI.
          </p>

          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10"
          >
            Daftar Open Recruitment 🚀
          </Button>
        </div>
      </section> */}

{/* --- SECTION: PUNYA PERTANYAAN? --- */}
<section className="py-20 bg-black text-center border-t border-slate-900">
  <div className="container px-6 md:px-12 lg:px-24">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Masih Punya Pertanyaan?
    </h2>
    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
      Kalau belum menemukan jawaban yang kamu cari, cek FAQ kami
      atau hubungi tim SAKTI untuk bertanya langsung.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="#faq">
        <Button
          variant="outline"
          className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
        >
          Lihat FAQ
        </Button>
      </Link>

      <Link href="/contact">
        <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
          Hubungi Kami
        </Button>
      </Link>
    </div>
  </div>
</section>
      {/* --- SECTION: FAQ --- */}
      <section 
      id="faq"
      className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Apakah harus jago coding untuk bergabung?",
                a: "Tidak. Kami menerima mahasiswa yang ingin belajar dan berkembang.",
              },
              {
                q: "Open recruitment kapan dibuka?",
                a: "Biasanya setiap awal semester genap. Pantau terus pengumuman resmi.",
              },
              {
                q: "Apakah bisa ikut lebih dari satu divisi?",
                a: "Bisa, sesuai komitmen dan kesepakatan internal.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-black/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 hover:border-yellow-500/40 transition"
              >
                <h4 className="text-yellow-400 font-semibold mb-2">{item.q}</h4>
                <p className="text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
