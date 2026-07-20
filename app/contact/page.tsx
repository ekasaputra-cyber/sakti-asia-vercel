"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";

const MAPS_QUERY = "-7.937973,112.6266227";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengirim pesan");
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
    <div className="min-h-screen bg-black text-white">
      {/* --- HERO --- */}
      <section className="py-20 border-b border-slate-900 text-center">
        <div className="container px-4">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500/10 mb-6">
            <Mail className="h-6 w-6 text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Hubungi Kami
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Punya pertanyaan, saran, atau mau kolaborasi dengan SAKTI? Kirim
            pesan kamu atau langsung datang ke sekretariat.
          </p>
        </div>
      </section>

      {/* --- CONTENT: 2 KOLOM --- */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
            {/* --- KOLOM KIRI (desktop) / BAWAH (mobile): INFO + MAPS --- */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Info Sekretariat</h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3 items-start">
                      <MapPin className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        Institut Teknologi dan Bisnis Asia Malang
                        <br />
                        Jl. Soekarno Hatta, Rembuksari No. 1A
                        <br />
                        Mojolangu, Lowokwaru, Kota Malang 65113
                      </span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Mail className="h-5 w-5 text-yellow-500 shrink-0" />
                      <a
                        href="mailto:himapro.sakti@gmail.com"
                        className="text-slate-300 hover:text-yellow-500 transition-colors"
                      >
                        himapro.sakti@gmail.com
                      </a>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Clock className="h-5 w-5 text-yellow-500 shrink-0" />
                      <span className="text-slate-300">
                        Senin – Jumat, 09.00 – 16.00 WIB
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- MAPS EMBED --- */}
              <div className="rounded-2xl overflow-hidden border border-slate-800 h-72">
                <iframe
                  src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Lokasi Sekretariat SAKTI"
                />
              </div>
            </div>

            {/* --- KOLOM KANAN (desktop) / ATAS (mobile): FORM --- */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 order-1 lg:order-2">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-yellow-500 mb-4" />
                  <h2 className="text-xl font-bold mb-2">
                    Pesan Terkirim
                  </h2>
                  <p className="text-slate-400 mb-6">
                    Terima kasih! Pesan kamu sudah kami terima dan akan
                    segera kami balas.
                  </p>
                  <Button
                    variant="outline"
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                    onClick={() => {
                      setForm({ name: "", email: "", message: "" });
                      setSubmitted(false);
                    }}
                  >
                    Kirim Pesan Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold mb-2">Kirim Pesan</h2>

                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-300"
                    >
                      Nama
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nama lengkap kamu"
                      required
                      className="bg-black border-slate-700 h-11 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/40"
                    />
                  </div>

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
                      htmlFor="message"
                      className="text-sm font-medium text-slate-300"
                    >
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tulis pesan kamu di sini..."
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
                    {submitting ? "Mengirim..." : "Kirim Pesan"}
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