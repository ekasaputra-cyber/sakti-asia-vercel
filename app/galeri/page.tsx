import { Badge } from "@/components/ui/badge";
import { getGalleryPhotos } from "@/lib/api";
import { Camera } from "lucide-react";
import GalleryGrid from "@/components/gallery/galleryGrid";

export default async function GaleriPage() {
  let photos: Awaited<ReturnType<typeof getGalleryPhotos>> = [];
  try {
    photos = await getGalleryPhotos();
  } catch {
    // Backend belum bisa diakses — tampilkan galeri kosong daripada crash.
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      {/* --- HEADER SECTION --- */}
      <section className="relative py-20 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-hive-pattern opacity-30"></div>
        <div className="absolute top-0 left-0 w-75 h-75 bg-yellow-500/10 blur-[100px] rounded-full -z-10"></div>

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
          >
            <Camera className="mr-2 h-3 w-3" />
            Dokumentasi
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Galeri <span className="text-yellow-500">Kegiatan.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Momen-momen keseruan dan pencapaian HIMAPRO TI SAKTI, terekam dalam
            gambar.
          </p>
        </div>
      </section>

      {/* --- GALLERY GRID --- */}
      <section className="py-16 bg-black">
        <div className="container px-4 md:px-6">
          <GalleryGrid photos={photos} />
        </div>
      </section>
    </div>
  );
}
