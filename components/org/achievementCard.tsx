"use client";

import { useState } from "react";
import { Trophy, Users } from "lucide-react";
import { getImageUrl } from "@/lib/api";

export default function AchievementCard({
  name,
  achievement,
  badge,
  image,
}: {
  name: string;
  achievement: string;
  badge: string;
  image: string | null;
}) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getImageUrl(image);
  const showImage = Boolean(imageUrl) && !imgError;

  return (
    <div className="group relative rounded-2xl overflow-hidden aspect-4/5 md:aspect-auto md:h-100">
      <div className="absolute inset-0 bg-slate-800">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-700">
            <Users className="h-20 w-20" />
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 text-yellow-400 mb-1">
            <Trophy className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {badge}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-slate-300 text-sm">{achievement}</p>
        </div>
      </div>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/50 rounded-2xl transition-colors pointer-events-none"></div>
    </div>
  );
}
