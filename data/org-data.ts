import type {
  Leader,
  BoardMember,
  Department,
  Demissioner,
  OrgEvent,
  OrgStat,
  Achievement,
  GalleryPhoto,
  OrgContact,
} from "@/lib/api";

// =====================================================================
// SUMBER DATA STATIS (HARDCODE) UNTUK SELURUH KONTEN ORGANISASI.
// Dulu data ini di-fetch dari backend Laravel lewat lib/api.ts, sekarang
// semuanya ditulis langsung di sini. Kalau ada perubahan konten (nama
// pengurus, statistik, achievement, dst), edit langsung di file ini lalu
// deploy ulang — tidak perlu backend/database lagi.
//
// Field "image" sengaja diisi `null` kalau belum ada foto asli, biar
// komponen (Avatar/GalleryGrid/AchievementCard) otomatis nampilin
// fallback (inisial nama / ikon) alih-alih gambar rusak.
// =====================================================================

// ---------------------------------------------------------------------
// 1. PIMPINAN (Ketua Umum, Wakil Ketua, Pembina)
// ---------------------------------------------------------------------
export const leadershipData: Leader[] = [
  {
    id: 1,
    position_key: "ketua_umum",
    role: "Ketua Umum",
    name: "Gilang Dwi Hermawan",
    image: "/divisi/gilang.jpeg",
    visi:
      "Mewujudkan HIMAPRO TI SAKTI sebagai organisasi yang profesional, inovatif, dan kolaboratif dalam mengembangkan potensi mahasiswa Teknik Informatika serta memberikan kontribusi nyata bagi program studi.",
    misi: [
      "Membangun organisasi yang inklusif, profesional, dan bertanggung jawab melalui tata kelola yang efektif, transparan, serta komunikasi yang terbuka.",
      "Mengembangkan potensi akademik dan keterampilan mahasiswa Teknik Informatika melalui program-program pengembangan diri yang relevan dan berkelanjutan.",
      "Mengoptimalkan media informasi dan branding HIMAPRO TI SAKTI sebagai sarana komunikasi yang informatif.",
    ],
  },
  {
    id: 2,
    position_key: "wakil_ketua",
    role: "Wakil Ketua",
    name: "Fika Aulia",
    image: "/divisi/fika.jpg",
    visi: null,
    misi: null,
  },
  {
    id: 3,
    position_key: "pembina",
    role: "Pembina Organisasi",
    name: "Suastika Yulia Riska, S.Kom., M.Kom.",
    image: "/divisi/Pembina.jpeg",
    visi: null,
    misi: null,
  },
];

// ---------------------------------------------------------------------
// 2. BPH (Badan Pengurus Harian) — Sekretaris & Bendahara
// ---------------------------------------------------------------------
export const boardData: BoardMember[] = [
  { id: 1, name: "Muhammad Fadel", role: "Sekretaris I", image: "/divisi/fadel.jpg" },
  { id: 2, name: "Nadhifah Irbah Hafizhah", role: "Sekretaris II", image: "/divisi/nadhifah.jpg" },
  { id: 3, name: "Wangi Suci Avrillya", role: "Bendahara I", image: "/divisi/vrilly.jpg" },
  { id: 4, name: "Lailatul Putri Wijayanti", role: "Bendahara II", image: "/divisi/lailatul.jpg" },
];

// ---------------------------------------------------------------------
// 3. DEPARTEMEN
// ---------------------------------------------------------------------
export const departmentsData: Department[] = [
  {
    id: 1,
    slug: "internal",
    name: "Departemen Internal",
    description: "Menjaga harmonisasi dan pengembangan SDM anggota.",
    jobdesk:
      "Bertanggung jawab atas manajemen internal organisasi, pengembangan anggota, serta menjaga komunikasi dan koordinasi antar divisi.",
    programs: [
      "Rapat Koordinasi Rutin",
      "Evaluasi Kinerja Anggota",
      "Pengelolaan Database Anggota",
      "Kegiatan Penguatan Internal",
    ],
    skills: ["Leadership", "Manajemen Waktu", "Team Management", "Problem Solving"],
    projects: [
      "Sistem Monitoring Kehadiran",
      "Dashboard Internal Management",
      "Program Mentoring Anggota Baru",
    ],
    members: [
      { id: 101, name: "Emre Grimley", role: "Koordinator", image: "/divisi/emre.jpg" },
      { id: 102, name: "Gita Patricia Ramadhani", role: "Staff", image: "/divisi/gita.jpg" },
      { id: 103, name: "Kinasih Putri Ramadhani", role: "Staff", image: "/divisi/kinasih.jpg" },
      { id: 104, name: "Variza Allana Gazara Putra", role: "Staff", image: "/divisi/variza.jpg" },
    ],
  },
  {
    id: 2,
    slug: "eksternal",
    name: "Departemen Eksternal",
    description: "Menjalin hubungan dengan pihak luar dan branding organisasi.",
    jobdesk:
      "Mengelola komunikasi eksternal, membangun relasi dengan mitra, serta mengembangkan citra dan branding organisasi.",
    programs: [
      "Kerja Sama Antar Organisasi",
      "Media Partnership Event",
      "Publikasi dan Branding Digital",
      "Company Visit",
    ],
    skills: ["Public Speaking", "Negotiation", "Branding Strategy", "Networking"],
    projects: [
      "Website Company Profile",
      "Campaign Media Sosial",
      "Event Collaboration dengan Kampus Lain",
    ],
    members: [
      { id: 201, name: "Adnan Abiyan Amrullah", role: "Koordinator", image: "/divisi/adnan.jpg" },
      { id: 202, name: "Revanya Julianti Arsa Pradana", role: "Staff", image: "/divisi/revanya.jpg" },
      { id: 203, name: "Farhan Ahmad Syah", role: "Staff", image: "/divisi/farhan.jpg" },
      { id: 204, name: "Adi Jaya Wibawa", role: "Staff", image: "/divisi/adi.jpg" },
    ],
  },
  {
    id: 3,
    slug: "minat-bakat",
    name: "Minat & Bakat",
    description: "Mewadahi potensi akademik dan non-akademik anggota.",
    jobdesk:
      "Mengembangkan potensi anggota dalam bidang akademik dan non-akademik melalui program pelatihan, kompetisi, dan pengembangan komunitas.",
    programs: [
      "Pelatihan Programming",
      "Workshop UI/UX",
      "Turnamen E-Sport",
      "Kompetisi Internal Hive",
    ],
    skills: ["Programming", "UI/UX Design", "Creative Thinking", "Competitive Mindset"],
    projects: [
      "Aplikasi Internal Hive",
      "Design System Organisasi",
      "Tim Kompetisi Hackathon",
    ],
    members: [
      { id: 301, name: "Nathanael Ivan Susanto", role: "Koordinator", image: "/divisi/ivan.jpg" },
      { id: 302, name: "Jumiati", role: "Staff", image: "/divisi/mia.jpg" },
      { id: 303, name: "Dafit Fernandus Ferdi Hardiansyah", role: "Staff", image: "/divisi/dafit.jpg" },
      { id: 305, name: "Khoirudin", role: "Staff", image: "/divisi/khoirudin.jpg" },
    ],
  },
];

// ---------------------------------------------------------------------
// 4. DEMISIONER (Hall of Fame — mantan Ketua Umum)
// ---------------------------------------------------------------------
export const demissionersData: Demissioner[] = [
  { id: 1, name: "Mu`jizah Al Mu`alifah", role: "Ketua Umum", period: "2021-2022", image: null },
  { id: 2, name: "Ahmad Farid Dwi Prayitno", role: "Ketua Umum", period: "2022-2023", image: null },
  { id: 3, name: "Stevanus Dwi Rizki", role: "Ketua Umum", period: "2023-2024", image: null },
  { id: 4, name: "Saiful Bahri", role: "Ketua Umum", period: "2024-2025", image: null },
  { id: 5, name: "Heru Pratama", role: "Ketua Umum", period: "2025-2026", image: null },
];

// ---------------------------------------------------------------------
// 5. AGENDA / EVENTS
// ⚠️ PLACEHOLDER — belum ada data asli, ganti tanggal & deskripsinya.
// ---------------------------------------------------------------------
export const eventsData: OrgEvent[] = [
  {
    id: 1,
    title: "Upgrading Kepengurusan",
    category: "BPH",
    start_date: "2026-10-03",
    end_date: "2026-10-03",
    description: "Pemaparan program kerja oleh masing-masing departemen kepada pembina.",
  },
  {
    id: 2,
    title: "Ospek Prodi 2026",
    category: "OSPRO",
    start_date: "2026-10-24",
    end_date: "2026-11-07",
    description: "Orientasi Program Studi Teknik Informatika 2026, dilaksanakan dalam 5 pertemuan.",
  },
  {
    id: 3,
    title: "Oprec & Diklat Pengurus 2026/2027",
    category: "Kaderisasi",
    start_date: "2026-10-01",
    end_date: "2027-02-28",
    description:
      "Open recruitment dan pendidikan & pelatihan calon pengurus baru. Interview 28-29 Nov, seleksi 30 Nov-5 Des, pengumuman 8 Des, Diklat ruangan 13/19 Des, Diklat lapangan Januari.",
  },
  {
    id: 4,
    title: "SaktiCamp (Makrab)",
    category: "Eksternal",
    start_date: "2027-02-01",
    end_date: "2027-02-28",
    description: "Malam keakraban pengurus dan anggota SAKTI.",
  },
  {
    id: 5,
    title: "Sidang AD/ART",
    category: "Internal",
    start_date: "2027-04-01",
    end_date: "2027-04-30",
    description: "Kajian dan sidang AD/ART, dilaksanakan minimal 2 kali kajian.",
  },
  {
    id: 6,
    title: "Halal bi Halal + Diesnatalis",
    category: "Internal",
    start_date: "2027-03-27",
    end_date: "2027-03-27",
    description: "Halal bi halal sekaligus perayaan hari jadi (Diesnatalis) HIMAPRO SAKTI.",
  },
  {
    id: 7,
    title: "EXPLORA 2026",
    category: "Minat & Bakat",
    start_date: "2026-06-23",
    end_date: "2026-07-01",
    description: "Rangkaian lomba, workshop, dan pameran EXPLORA 2026.",
  },
];

// ---------------------------------------------------------------------
// 6. STATISTIK ORGANISASI
// ⚠️ PLACEHOLDER — ganti angkanya sesuai data riil.
// ---------------------------------------------------------------------
export const statsData: OrgStat[] = [
  { id: 1, label: "Total Anggota", number: 100, suffix: "+" },
  { id: 2, label: "Program Kerja", number: 20, suffix: "+" },
  { id: 3, label: "Departemen", number: 3, suffix: null },
  { id: 4, label: "Tahun Berdiri", number: 2010, suffix: null },
];

// ---------------------------------------------------------------------
// 7. ACHIEVEMENT / MAHASISWA BERPRESTASI
// ⚠️ PLACEHOLDER — isi dengan pencapaian nyata anggota/alumni.
// ---------------------------------------------------------------------
export const achievementsData: Achievement[] = [
  {
    id: 1,
    name: "Florera",
    achievement: "Juara 2 Bisnis Digital dan Juara 2 Bisnis Development",
    badge: "Juara",
    image: "/achievement/Florera.jpeg",
  },
  {
    id: 2,
    name: "Kebun Sei",
    achievement: "Sistem pertanian dan peternakan terintegrasi berbasis ekonomi sirkular untuk ketahanan pangan",
    badge: "P2MW",
    image: "/achievement/Mojinsei.JPG",
  },
  {
    id: 3,
    name: "PKM",
    achievement: "Smart Certification: Sistem Sertifikasi Benih Sawit Berbasis Blockchain dan AI untuk Menjamin Keaslian dan Mutu Benih",
    badge: "PKM",
    image: "/achievement/SmartSeed2.jpeg",
  },
];

// ---------------------------------------------------------------------
// 8. GALERI FOTO
// Sengaja dikosongkan dulu — belum ada foto asli untuk di-hardcode.
// Taruh foto di /public lalu isi array ini, contoh:
// { id: 1, image: "/gallery/foto1.jpg", caption: "Keterangan foto" }
// ---------------------------------------------------------------------
export const galleryData: GalleryPhoto[] = [
  { id: 1, image: "/gallery/img1.JPG", caption: "Open Recruitment 2026" },
  { id: 2, image: "/gallery/img2.JPG", caption: "Latihan Dasar Kepemimpinan" },
  { id: 3, image: "/gallery/img3.jpg", caption: "Rapat Koordinasi Divisi" },
  { id: 4, image: "/gallery/img4.jpg", caption: "Workshop UI/UX" },
];

// ---------------------------------------------------------------------
// 9. INFO KONTAK
// ---------------------------------------------------------------------
export const contactData: OrgContact = {
  address: "Institut Teknologi dan Bisnis Asia Malang",
  email: "himapro.sakti@gmail.com",
  office_hours: "Senin - Jumat, 09.00 - 16.00 WIB",
  maps_query: "https://maps.app.goo.gl/RaxFfyJVQ2dMhuFs9",
  instagram_url: "https://www.instagram.com/sakti_asia?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
  youtube_url: "https://youtube.com/@saktiasia7111?si=X4Ridb7pjji5-TkB",
  github_url: "https://github.com/sakti-asia",
};