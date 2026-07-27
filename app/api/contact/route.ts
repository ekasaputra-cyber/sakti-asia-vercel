import { NextRequest, NextResponse } from "next/server";
import { appendRow } from "@/lib/google-sheets";
import { syncToLaravel } from "@/lib/laravel-sync";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validasi dasar
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json(
        { error: "Format data tidak valid" },
        { status: 400 }
      );
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });

    await appendRow("Contact", [timestamp, name, email, message]);

    // Kirim salinan ke database Laravel juga (best-effort, tidak menggagalkan
    // request ini kalau Laravel-nya lagi down).
    await syncToLaravel("/contact-submissions", { name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan di server, coba lagi nanti" },
      { status: 500 }
    );
  }
}