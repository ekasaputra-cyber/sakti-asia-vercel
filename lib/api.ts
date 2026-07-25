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

// Bentuk data mentah yang dikirim backend, sebelum dinormalisasi.
// Field yang seharusnya array bisa datang sebagai string (belum di-cast di Laravel).
type RawLeader = Omit<Leader, "misi"> & { misi: unknown };
type RawDepartment = Omit<Department, "programs" | "skills" | "projects"> & {
    programs: unknown;
    skills: unknown;
    projects: unknown;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// Base URL server Laravel tanpa "/api" di belakangnya, contoh: http://localhost:8000
const STORAGE_BASE_URL = API_URL?.replace(/\/api\/?$/, "");

// Helper: gabungin path gambar dari database (contoh: "leaders/xxx.jpeg")
// jadi URL lengkap ke storage Laravel (contoh: http://localhost:8000/storage/leaders/xxx.jpeg).
// Kalau image sudah berupa URL lengkap (http/https), dipakai apa adanya.
export function getImageUrl(
    path: string | null | undefined,
): string | undefined {
    if (!path) return undefined;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const normalized = path.replace(/\\/g, "/");
    const cleanPath = normalized.startsWith("/") ? normalized.slice(1) : normalized;
    return `${STORAGE_BASE_URL}/storage/${cleanPath}`;
}

// Helper: pastikan field yang harusnya array beneran jadi array,
// meski backend ngirim JSON string (misal karena belum di-cast di Laravel).
function toArray<T = string>(value: unknown): T[] | null {
    if (value === null || value === undefined) return null;
    if (Array.isArray(value)) return value as T[];
    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? (parsed as T[]) : null;
        } catch {
            return null;
        }
    }
    return null;
}

function normalizeLeader(item: RawLeader): Leader {
    return {
        ...item,
        misi: toArray<string>(item.misi),
    };
}

function normalizeDepartment(item: RawDepartment): Department {
    return {
        ...item,
        programs: toArray<string>(item.programs),
        skills: toArray<string>(item.skills),
        projects: toArray<string>(item.projects),
    };
}

export async function getLeadership(): Promise<Leader[]> {
    const res = await fetch(`${API_URL}/leadership`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Gagal mengambil data leadership");
    const json = await res.json();
    return (json.data as RawLeader[]).map(normalizeLeader);
}

export async function getBoard(): Promise<BoardMember[]> {
    const res = await fetch(`${API_URL}/board`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Gagal mengambil data board");
    const json = await res.json();
    return json.data;
}

export async function getDepartments(): Promise<Department[]> {
    const res = await fetch(`${API_URL}/departments`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Gagal mengambil data departemen");
    const json = await res.json();
    return (json.data as RawDepartment[]).map(normalizeDepartment);
}

export async function getDemissioners(): Promise<Demissioner[]> {
    const res = await fetch(`${API_URL}/demissioners`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Gagal mengambil data demisioner");
    const json = await res.json();
    return json.data;
}

export async function getEvents(): Promise<OrgEvent[]> {
    const res = await fetch(`${API_URL}/events`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Gagal mengambil data agenda");
    const json = await res.json();
    return json.data;
}

export async function getStats(): Promise<OrgStat[]> {
    const res = await fetch(`${API_URL}/stats`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Gagal mengambil data statistik");
    const json = await res.json();
    return json.data;
}
