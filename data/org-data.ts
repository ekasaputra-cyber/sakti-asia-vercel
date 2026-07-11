import { Member, Division } from "@/types/organization";

// 1. DATA PIMPINAN & VISI MISI
export const leadershipData = {
  ketua: {
    id: "lead-1",
    name: "Gilang Dwi Hermawan",
    role: "Ketua Umum",
    image: "/placeholder-user.jpg",
    visi: "Mewujudkan organisasi terbuka dan profesional sebagai ruang kolaborasi mahasiswa TI dalam Pengembangan akademik dan minat bakat",
    misi: [
      "Menghadirkan suasana organisasi yang terbuka dan nyaman bagi semua anggota untuk tumbuh bersama",
      "Menjalakan program kerja yang nyata, kolaboratif, dan berdampak, baik dalam bidang akademik maupun non-akademik",
      "Menjaga nilai profesionalisme dan tanggung jawab dalam setiap kegiatan organisasi",
      "Bersinergi dengan program studi Teknik Informatika untuk mendukung peningkatan mutu akademik, kegiatan mahasiswa dan reputasi prodi secara internal maupun eksternal"
    ]
  },
  wakil: { 
    id: "lead-2",
    name: "Fika Aulia", 
    role: "Wakil Ketua", 
    image: "/placeholder-user.jpg" 
  },
  pembina: { 
    id: "lead-3",
    name: "Dr. Suastika Yulia Riska, S.Kom., M.Kom.", 
    role: "Pembina Organisasi", 
    image: "/placeholder-user.jpg" 
  }
};

// 2. DATA BPH (Badan Pengurus Harian)
export const coreBoard: Member[] = [
  { id: "1", name: "Muhammad Fadel", role: "Sekretaris I", image: "/placeholder-user.jpg" },
  { id: "2", name: "Nadhifah Irbah Hafizhah", role: "Sekretaris II", image: "/placeholder-user.jpg" },
  { id: "3", name: "Wangi Suci Avrillya", role: "Bendahara I", image: "/placeholder-user.jpg" },
  { id: "4", name: "Lailatul Putri Wijayanti", role: "Bendahara II", image: "/placeholder-user.jpg" },
];

// 3. DATA DEPARTEMEN
export const departments: Division[] = [
  {
    id: "internal",
    slug: "internal",
    name: "Departemen Internal",
    description: "Menjaga harmonisasi dan pengembangan SDM anggota.",
    jobdesk:
      "Bertanggung jawab atas manajemen internal organisasi, pengembangan anggota, serta menjaga komunikasi dan koordinasi antar divisi.",
    programs: [
      "Rapat Koordinasi Rutin",
      "Evaluasi Kinerja Anggota",
      "Pengelolaan Database Anggota",
      "Kegiatan Penguatan Internal"
    ],
    skills: [
      "Leadership",
      "Manajemen Waktu",
      "Team Management",
      "Problem Solving"
    ],
    projects: [
      "Sistem Monitoring Kehadiran",
      "Dashboard Internal Management",
      "Program Mentoring Anggota Baru"
    ],
    members: [
      { id: "int1", name: "Emre Grimley", role: "Koordinator", image: "/placeholder-user.jpg" },
      { id: "int2", name: "Gita Patricia Ramadhani", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "int3", name: "Farhan Ahmad Syah", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "int4", name: "Variza Allana Gazara Putra", role: "Staff", image: "/placeholder-user.jpg" },
    ]
  },
  {
    id: "eksternal",
    slug: "eksternal",
    name: "Departemen Eksternal",
    description: "Menjalin hubungan dengan pihak luar dan branding organisasi.",
    jobdesk:
      "Mengelola komunikasi eksternal, membangun relasi dengan mitra, serta mengembangkan citra dan branding organisasi.",
    programs: [
      "Kerja Sama Antar Organisasi",
      "Media Partnership Event",
      "Publikasi dan Branding Digital",
      "Company Visit"
    ],
    skills: [
      "Public Speaking",
      "Negotiation",
      "Branding Strategy",
      "Networking"
    ],
    projects: [
      "Website Company Profile",
      "Campaign Media Sosial",
      "Event Collaboration dengan Kampus Lain"
    ],
    members: [
      { id: "eks1", name: "Adnan Abiyan Amrullah", role: "Koordinator", image: "/placeholder-user.jpg" },
      { id: "eks2", name: "Revanya Julianti Arsa Pradana", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "eks3", name: "M. Syarif Hidayatulloh", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "eks4", name: "Adi Jaya Wibawa", role: "Staff", image: "/placeholder-user.jpg" },
    ]
  },
  {
    id: "minatbakat",
    slug: "minat-bakat",
    name: "Minat & Bakat",
    description: "Mewadahi potensi akademik dan non-akademik anggota.",
    jobdesk:
      "Mengembangkan potensi anggota dalam bidang akademik dan non-akademik melalui program pelatihan, kompetisi, dan pengembangan komunitas.",
    programs: [
      "Pelatihan Programming",
      "Workshop UI/UX",
      "Turnamen E-Sport",
      "Kompetisi Internal Hive"
    ],
    skills: [
      "Programming",
      "UI/UX Design",
      "Creative Thinking",
      "Competitive Mindset"
    ],
    projects: [
      "Aplikasi Internal Hive",
      "Design System Organisasi",
      "Tim Kompetisi Hackathon"
    ],
    members: [
      { id: "min1", name: "Nathanael Ivan Susanto", role: "Koordinator", image: "/placeholder-user.jpg" },
      { id: "min2", name: "Jumiati", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "min3", name: "Dafit Fernandus Ferdi Hardiansyah", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "min4", name: "Kinasih Putri Ramadhani", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "min5", name: "Khoirudin", role: "Staff", image: "/placeholder-user.jpg" },
    ]
  }
];

// 4. DATA DEMISIONER
export const demisioners: Member[] = [
  { id: "dem1", name: "Mu`jizah Al Mu`alifah", role: "Ketua 2021", period: "2021-2022", image: "" },
  { id: "dem2", name: "Ahmad Farid Dwi Prayitno", role: "Ketua 2022", period: "2022-2023", image: "" },
  { id: "dem3", name: "Stevanus Dwi Rizki", role: "Ketua 2023", period: "2023-2024", image: "" },
  { id: "dem4", name: "Saiful Bahri", role: "Ketua 2024", period: "2024-2025", image: "" },
  { id: "dem5", name: "Heru Pratama", role: "Ketua 2025", period: "2025-2026", image: "" },
];