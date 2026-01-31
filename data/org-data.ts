import { Member, Division } from "@/types/organization";

// 1. DATA PIMPINAN & VISI MISI
export const leadershipData = {
  ketua: {
    id: "lead-1",
    name: "Heru Pratama",
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
    name: "Muhammad Nurfaiz Alfian Ikhsan", 
    role: "Wakil Ketua", 
    image: "/placeholder-user.jpg" 
  },
  pembina: { 
    id: "lead-3",
    name: "Dr. Suastika Yulia Riska", 
    role: "Pembina Organisasi", 
    image: "/placeholder-user.jpg" 
  }
};

// 2. DATA BPH (Badan Pengurus Harian)
export const coreBoard: Member[] = [
  { id: "1", name: "Dian Kurnia Ramadhani", role: "Sekretaris I", image: "/placeholder-user.jpg" },
  { id: "2", name: "Kinasih Putri Ramadhani", role: "Sekretaris II", image: "/placeholder-user.jpg" },
  { id: "3", name: "Jaya", role: "Bendahara I", image: "/placeholder-user.jpg" },
  { id: "4", name: "Wangi Suci Avrillya", role: "Bendahara II", image: "/placeholder-user.jpg" },
];

// 3. DATA DEPARTEMEN
export const departments: Division[] = [
  {
    id: "internal",
    name: "Departemen Internal",
    description: "Menjaga harmonisasi dan pengembangan SDM anggota.",
    members: [
      { id: "int1", name: "Aldo Tegar Laksana", role: "Koordinator", image: "/placeholder-user.jpg" },
      { id: "int2", name: "Mario Yudha Pratama", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "int3", name: "Ahmad Bagas Febriansyah Putra", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "int4", name: "Fika Aulia", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "int5", name: "Andrew Prastama Putra", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "int6", name: "Muhammad Fadel", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "int7", name: "Muhammad Emre Grimley", role: "Staff", image: "/placeholder-user.jpg" },
    ]
  },
  {
    id: "eksternal",
    name: "Departemen Eksternal",
    description: "Menjalin hubungan dengan pihak luar dan branding.",
    members: [
      { id: "eks1", name: "Irsal Fauzan Alfarizi", role: "Koordinator", image: "/placeholder-user.jpg" },
      { id: "eks2", name: "Muhammad Alfito Rizky Maulana", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "eks3", name: "Gilang Dwi Hermawan", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "eks4", name: "Adnan Abiyan Amrullah", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "eks5", name: "Bayu Sahara A", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "eks6", name: "Revanya Julianti Arsa Pradana", role: "Staff", image: "/placeholder-user.jpg" },
    ]
  },
  {
    id: "minatbakat",
    name: "Minat & Bakat",
    description: "Mewadahi potensi non-akademik dan akademik.",
    members: [
      { id: "min1", name: "Muhamad Fajar Ramadlan", role: "Koordinator", image: "/placeholder-user.jpg" },
      { id: "min2", name: "Jumiati", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "min3", name: "Dafit Fernandus Ferdi Hardiansyah", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "min4", name: "Nathanael Ivan Susanto", role: "Staff", image: "/placeholder-user.jpg" },
      { id: "min5", name: "Andhika Fhatrichias Arbania", role: "Staff", image: "/placeholder-user.jpg" },
    ]
  }
];

// 4. DATA DEMISIONER
export const demisioners: Member[] = [
  { id: "dem1", name: "Mu`jizah Al Mu`alifah", role: "Ketua 2021", period: "2021-2022", image: "" },
  { id: "dem2", name: "Ahmad Farid Dwi Prayitno", role: "Ketua 2022", period: "2022-2023", image: "" },
  { id: "dem3", name: "Stevanus Dwi Rizki", role: "Ketua 2023", period: "2023-2024", image: "" },
  { id: "dem4", name: "Saiful Bahri", role: "Ketua 2024", period: "2024-2025", image: "" },
];