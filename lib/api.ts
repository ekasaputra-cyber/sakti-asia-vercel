import {
    leadershipData,
    boardData,
    departmentsData,
    demissionersData,
    eventsData,
    statsData,
    achievementsData,
    galleryData,
    contactData,
} from "@/data/org-data";

export interface Leader {
    id: number;
    position_key: string;
    role: string;
    name: string;
    image: string | null;
    visi: string | null;
    misi: string[] | null;
}

export interface BoardMember {
    id: number;
    name: string;
    role: string;
    image: string | null;
}

export interface DepartmentMember {
    id: number;
    name: string;
    role: string;
    image: string | null;
}

export interface Department {
    id: number;
    slug: string;
    name: string;
    description: string | null;
    jobdesk: string | null;
    programs: string[] | null;
    skills: string[] | null;
    projects: string[] | null;
    members: DepartmentMember[];
}

export interface Demissioner {
    id: number;
    name: string;
    role: string;
    period: string | null;
    image: string | null;
}

export interface OrgEvent {
    id: number;
    title: string;
    category: string;
    start_date: string; // format "YYYY-MM-DD"
    end_date: string | null; // format "YYYY-MM-DD", null kalau acara 1 hari
    description: string | null;
}

export interface OrgStat {
    id: number;
    label: string;
    number: number;
    suffix: string | null;
}

export interface Achievement {
    id: number;
    name: string;
    achievement: string;
    badge: string;
    image: string | null;
}

export interface GalleryPhoto {
    id: number;
    image: string;
    caption: string | null;
}

export interface OrgContact {
    address: string;
    email: string;
    office_hours: string;
    maps_query: string | null;
    instagram_url: string | null;
    youtube_url: string | null;
    github_url: string | null;
}


// =====================================================================
// Semua konten organisasi sekarang di-hardcode langsung di
// data/org-data.ts, bukan lagi fetch dari backend Laravel.
// Fungsi-fungsi di bawah ini sengaja tetap async (return Promise) biar
// semua halaman yang sudah manggil pakai `await` / `.then()` tidak perlu
// diubah sama sekali.
// =====================================================================

// Helper: kalau path gambar sudah berupa URL lengkap (http/https), dipakai
// apa adanya. Kalau path lokal (misal "/foto/anu.jpg" di folder /public),
// juga dipakai apa adanya. Return undefined kalau belum ada gambar sama
// sekali, biar komponen UI otomatis nampilin fallback (inisial/ikon).
export function getImageUrl(
    path: string | null | undefined,
): string | undefined {
    if (!path) return undefined;
    return path;
}

export async function getLeadership(): Promise<Leader[]> {
    return leadershipData;
}

export async function getBoard(): Promise<BoardMember[]> {
    return boardData;
}

export async function getDepartments(): Promise<Department[]> {
    return departmentsData;
}

// Ambil 1 departemen berdasarkan slug. Return null kalau nggak ketemu,
// biar halaman detail bisa panggil notFound().
export async function getDepartment(slug: string): Promise<Department | null> {
    return departmentsData.find((dept) => dept.slug === slug) ?? null;
}

export async function getDemissioners(): Promise<Demissioner[]> {
    return demissionersData;
}

export async function getEvents(): Promise<OrgEvent[]> {
    return eventsData;
}

export async function getStats(): Promise<OrgStat[]> {
    return statsData;
}

export async function getAchievements(): Promise<Achievement[]> {
    return achievementsData;
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
    return galleryData;
}

export async function getContactInfo(): Promise<OrgContact> {
    return contactData;
}