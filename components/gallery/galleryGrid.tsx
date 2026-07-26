"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { getImageUrl, GalleryPhoto } from "@/lib/api";

function GalleryTile({ photo }: { photo: GalleryPhoto }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getImageUrl(photo.image);
  const showImage = Boolean(imageUrl) && !imgError;

  return (
    <div className="group relative mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={photo.caption ?? "Dokumentasi kegiatan SAKTI"}
          onError={() => setImgError(true)}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full aspect-square flex items-center justify-center text-slate-700">
          <ImageOff className="h-10 w-10" />
        </div>
      )}
      {photo.caption && (
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <p className="text-white text-sm font-medium">{photo.caption}</p>
        </div>
      )}
    </div>
  );
}

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  if (photos.length === 0) {
    return (
      <div className="text-center text-slate-500 py-20">
        Belum ada foto di galeri. Nantikan dokumentasi kegiatan kami selanjutnya.
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 gap-4">
      {photos.map((photo) => (
        <GalleryTile key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
