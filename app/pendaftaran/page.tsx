"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    UserPlus,
    Send,
    CheckCircle2,
    ArrowLeft,
    Paperclip,
} from "lucide-react";

type FormState = {
    nama: string;
    ttl: string;
    nim: string;
    email: string;
    whatsapp: string;
    motivasi: string;
};

type FileState = {
    fotoKtm: File | null;
    cv: File | null;
    sertifikatOspro: File | null;
};

type FileFieldName = keyof FileState;

const INITIAL_FORM: FormState = {
    nama: "",
    ttl: "",
    nim: "",
    email: "",
    whatsapp: "",
    motivasi: "",
};

const INITIAL_FILES: FileState = {
    fotoKtm: null,
    cv: null,
    sertifikatOspro: null,
};

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB, samakan dengan batas di API

export default function PendaftaranPage() {
    const [form, setForm] = useState<FormState>(INITIAL_FORM);
    const [files, setFiles] = useState<FileState>(INITIAL_FILES);
    const [fileErrors, setFileErrors] = useState<Record<FileFieldName, string | null>>({
        fotoKtm: null,
        cv: null,
        sertifikatOspro: null,
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, files: fileList } = e.target;
        const fieldName = name as FileFieldName;
        const selectedFile = fileList?.[0] ?? null;

        if (selectedFile && selectedFile.size > MAX_FILE_SIZE_BYTES) {
            const sizeMb = (selectedFile.size / (1024 * 1024)).toFixed(1);
            setFileErrors((prev) => ({
                ...prev,
                [fieldName]: `Ukuran file ${sizeMb}MB melebihi batas 2MB. Pilih file lain.`,
            }));
            setFiles((prev) => ({ ...prev, [fieldName]: null }));
            e.target.value = ""; // reset input biar nggak nyangkut file yang ditolak
            return;
        }

        setFileErrors((prev) => ({ ...prev, [fieldName]: null }));
        setFiles((prev) => ({ ...prev, [fieldName]: selectedFile }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!files.fotoKtm || !files.cv || !files.sertifikatOspro) {
            setError("Semua berkas lampiran wajib diupload");
            return;
        }

        setSubmitting(true);


        try {
            const payload = new FormData();
            payload.append("nama", form.nama);
            payload.append("ttl", form.ttl);
            payload.append("nim", form.nim);
            payload.append("email", form.email);
            payload.append("whatsapp", form.whatsapp);
            payload.append("motivasi", form.motivasi);
            payload.append("fotoKtm", files.fotoKtm);
            payload.append("cv", files.cv);
            payload.append("sertifikatOspro", files.sertifikatOspro);

            const res = await fetch("/api/pendaftaran", {
                method: "POST",
                body: payload,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Gagal mengirim pendaftaran");
            }

            setSubmitted(true);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi"
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* --- HERO --- */}
            <section className="relative py-20 overflow-hidden border-b border-slate-900 text-center">
                <div className="absolute inset-0 bg-hive-pattern opacity-30"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 h-75 bg-yellow-500/10 blur-[100px] rounded-full -z-10"></div>

                <div className="container px-4 relative z-10">
                    <Badge
                        variant="outline"
                        className="mb-4 border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
                        <UserPlus className="h-6 w-6 text-yellow-500" />
                        Open Recruitment 2026
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Gabung Bersama <span className="text-yellow-500">SAKTI</span>
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Isi formulir di bawah ini untuk mendaftar jadi bagian dari Hive.
                    </p>
                </div>
            </section>

            {/* --- FORM SECTION --- */}
            <section className="py-16">
                <div className="container px-4">
                    <div className="max-w-2xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-yellow-500 transition-colors mb-6"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Beranda
                        </Link>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                            {submitted ? (
                                <div className="flex flex-col items-center text-center py-8">
                                    <CheckCircle2 className="h-12 w-12 text-yellow-500 mb-4" />
                                    <h2 className="text-xl font-bold mb-2">
                                        Pendaftaran Terkirim
                                    </h2>
                                    <p className="text-slate-400 mb-6">
                                        Terima kasih sudah mendaftar! Tim kami akan
                                        menghubungi kamu untuk proses selanjutnya.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                                        onClick={() => {
                                            setForm(INITIAL_FORM);
                                            setFiles(INITIAL_FILES);
                                            setFileErrors({ fotoKtm: null, cv: null, sertifikatOspro: null });
                                            setSubmitted(false);
                                        }}
                                    >
                                        Isi Formulir Lain
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <h2 className="text-xl font-bold mb-2">
                                        OPEN RECRUITMENT<span className="text-yellow-500 text-shadow-sm"> HIMAPRO TI SAKTI</span>
                                    </h2>

                                    {/* Nama Lengkap */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="nama"
                                            className="text-sm font-medium text-slate-300"
                                        >
                                            Nama Lengkap
                                        </label>
                                        <Input
                                            id="nama"
                                            name="nama"
                                            value={form.nama}
                                            onChange={handleChange}
                                            placeholder="Nama lengkap kamu"
                                            required
                                            className="bg-black border-slate-700 h-11 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/40"
                                        />
                                    </div>

                                    {/* TTL & NIM */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="ttl"
                                                className="text-sm font-medium text-slate-300"
                                            >
                                                Tempat, Tanggal Lahir
                                            </label>
                                            <Input
                                                id="ttl"
                                                name="ttl"
                                                value={form.ttl}
                                                onChange={handleChange}
                                                placeholder="Contoh: Malang, 17 Agustus 2005"
                                                required
                                                className="bg-black border-slate-700 h-11 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/40"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                htmlFor="nim"
                                                className="text-sm font-medium text-slate-300"
                                            >
                                                NIM
                                            </label>
                                            <Input
                                                id="nim"
                                                name="nim"
                                                value={form.nim}
                                                onChange={handleChange}
                                                placeholder="Nomor Induk Mahasiswa"
                                                required
                                                className="bg-black border-slate-700 h-11 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/40"
                                            />
                                        </div>
                                    </div>

                                    {/* Email & No Telp */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="email"
                                                className="text-sm font-medium text-slate-300"
                                            >
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="nama@email.com"
                                                required
                                                className="bg-black border-slate-700 h-11 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/40"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                htmlFor="whatsapp"
                                                className="text-sm font-medium text-slate-300"
                                            >
                                                No Telp/HP/WA
                                            </label>
                                            <Input
                                                id="whatsapp"
                                                name="whatsapp"
                                                type="tel"
                                                value={form.whatsapp}
                                                onChange={handleChange}
                                                placeholder="08xxxxxxxxxx"
                                                required
                                                className="bg-black border-slate-700 h-11 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/40"
                                            />
                                        </div>
                                    </div>

                                    {/* --- UPLOAD FILES --- */}
                                    <div className="pt-2 border-t border-slate-800">
                                        <p className="text-sm font-medium text-slate-300 flex items-center gap-2 mt-5 mb-4">
                                            <Paperclip className="h-4 w-4 text-yellow-500" />
                                            Berkas Lampiran
                                        </p>

                                        <div className="space-y-5">
                                            {/* Foto KTM */}
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="fotoKtm"
                                                    className="text-sm font-medium text-slate-300"
                                                >
                                                    Foto KTM
                                                </label>
                                                <Input
                                                    id="fotoKtm"
                                                    name="fotoKtm"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    required
                                                    className="bg-black border-slate-700 h-11 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/40 file:text-yellow-500"
                                                />
                                                <p className="text-xs text-slate-500">
                                                    Format JPG/PNG, maks. 2MB.
                                                </p>
                                                {fileErrors.fotoKtm && (
                                                    <p className="text-xs text-red-500">
                                                        {fileErrors.fotoKtm}
                                                    </p>
                                                )}
                                            </div>

                                            {/* CV */}
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="cv"
                                                    className="text-sm font-medium text-slate-300"
                                                >
                                                    CV/Riwayat Hidup
                                                </label>
                                                <Input
                                                    id="cv"
                                                    name="cv"
                                                    type="file"
                                                    accept="application/pdf"
                                                    onChange={handleFileChange}
                                                    required
                                                    className="bg-black border-slate-700 h-11 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/40 file:text-yellow-500"
                                                />
                                                <p className="text-xs text-slate-500">
                                                    Format PDF/PNG maks. 2MB.
                                                </p>
                                                {fileErrors.cv && (
                                                    <p className="text-xs text-red-500">
                                                        {fileErrors.cv}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Sertifikat Ospro */}
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="sertifikatOspro"
                                                    className="text-sm font-medium text-slate-300"
                                                >
                                                    Sertifikat Ospro
                                                </label>
                                                <Input
                                                    id="sertifikatOspro"
                                                    name="sertifikatOspro"
                                                    type="file"
                                                    accept="application/pdf,image/*"
                                                    onChange={handleFileChange}
                                                    required
                                                    className="bg-black border-slate-700 h-11 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/40 file:text-yellow-500"
                                                />
                                                <p className="text-xs text-slate-500">
                                                    Format PDF/JPG/PNG, maks. 2MB.
                                                </p>
                                                {fileErrors.sertifikatOspro && (
                                                    <p className="text-xs text-red-500">
                                                        {fileErrors.sertifikatOspro}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Motivasi */}
                                    <div className="space-y-2 pt-2">
                                        <label
                                            htmlFor="motivasi"
                                            className="text-sm font-medium text-slate-300"
                                        >
                                            Motivasi/Alasan Bergabung
                                        </label>
                                        <textarea
                                            id="motivasi"
                                            name="motivasi"
                                            value={form.motivasi}
                                            onChange={handleChange}
                                            placeholder="Ceritakan alasan dan harapan kamu bergabung dengan SAKTI..."
                                            required
                                            rows={5}
                                            className="w-full rounded-md border border-slate-700 bg-black px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none transition-[color,box-shadow] focus-visible:border-yellow-500 focus-visible:ring-[3px] focus-visible:ring-yellow-500/40 resize-none"
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                                            {error}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-11 disabled:opacity-60"
                                    >
                                        {submitting ? "Mengirim..." : "Kirim Pendaftaran"}
                                        {!submitting && <Send className="ml-2 h-4 w-4" />}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}