import { NextRequest, NextResponse } from "next/server";
import { appendRow, uploadFileToDrive } from "@/lib/google-sheets";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB, sesuai batas yang ditampilkan di form

async function fileToBuffer(file: File): Promise<Buffer> {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const nama = formData.get("nama");
        const ttl = formData.get("ttl");
        const email = formData.get("email");
        const nim = formData.get("nim");
        const whatsapp = formData.get("whatsapp");
        const motivasi = formData.get("motivasi");

        const fotoKtm = formData.get("fotoKtm");
        const cv = formData.get("cv");
        const sertifikatOspro = formData.get("sertifikatOspro");

        // Validasi field teks
        if (!nama || !ttl || !email || !nim || !whatsapp || !motivasi) {
            return NextResponse.json(
                { error: "Semua field wajib diisi" },
                { status: 400 },
            );
        }

        // Validasi file ada & bertipe File (bukan string kosong)
        if (
            !(fotoKtm instanceof File) ||
            !(cv instanceof File) ||
            !(sertifikatOspro instanceof File) ||
            fotoKtm.size === 0 ||
            cv.size === 0 ||
            sertifikatOspro.size === 0
        ) {
            return NextResponse.json(
                { error: "Semua berkas lampiran wajib diupload" },
                { status: 400 },
            );
        }

        // Validasi ukuran file
        const files = { fotoKtm, cv, sertifikatOspro };
        for (const [key, file] of Object.entries(files)) {
            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: `Ukuran file ${key} melebihi 2MB` },
                    { status: 400 },
                );
            }
        }

        // Validasi format email sederhana
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof email !== "string" || !emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Format email tidak valid" },
                { status: 400 },
            );
        }

        // Upload ketiga file ke Google Drive secara paralel (masing-masing ke folder sendiri)
        const timestampForFile = Date.now();
        const safeNama = String(nama).replace(/[^a-zA-Z0-9]/g, "_");

        const fotoKtmFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID_FOTO_KTM;
        const cvFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID_CV;
        const sertifikatFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID_SERTIFIKAT;

        if (!fotoKtmFolderId || !cvFolderId || !sertifikatFolderId) {
            throw new Error(
                "Folder ID Google Drive (Foto KTM/CV/Sertifikat) belum lengkap di environment variables",
            );
        }

        const [fotoKtmUrl, cvUrl, sertifikatUrl] = await Promise.all([
            uploadFileToDrive(
                `${safeNama}_${timestampForFile}_FotoKTM${getExt(fotoKtm.name)}`,
                fotoKtm.type,
                await fileToBuffer(fotoKtm),
                fotoKtmFolderId,
            ),
            uploadFileToDrive(
                `${safeNama}_${timestampForFile}_CV${getExt(cv.name)}`,
                cv.type,
                await fileToBuffer(cv),
                cvFolderId,
            ),
            uploadFileToDrive(
                `${safeNama}_${timestampForFile}_SertifOspro${getExt(sertifikatOspro.name)}`,
                sertifikatOspro.type,
                await fileToBuffer(sertifikatOspro),
                sertifikatFolderId,
            ),
        ]);

        const timestamp = new Date().toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
        });

        await appendRow("Pendaftaran", [
            timestamp,
            String(nama),
            String(ttl),
            String(email),
            String(nim),
            String(whatsapp),
            String(motivasi),
            fotoKtmUrl,
            cvUrl,
            sertifikatUrl,
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error submitting pendaftaran form:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan di server, coba lagi nanti" },
            { status: 500 },
        );
    }
}

function getExt(filename: string): string {
    const match = filename.match(/\.[^.]+$/);
    return match ? match[0] : "";
}
