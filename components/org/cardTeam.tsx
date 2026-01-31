import { Member } from "@/types/organization";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TeamCard({ member }: { member: Member }) {
  // Ambil inisial nama (Misal: "Andi Saputra" -> "AS")
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <Card className="relative group overflow-hidden border border-slate-800 bg-slate-900/40 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(234,179,8,0.3)]">
      
      {/* --- HIASAN VISUAL TECH (Garis Pojok) --- */}
      {/* Pojok Kanan Atas */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-slate-700 group-hover:border-yellow-500 transition-colors rounded-tr-sm opacity-50 group-hover:opacity-100"></div>
      {/* Pojok Kiri Bawah */}
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-slate-700 group-hover:border-yellow-500 transition-colors rounded-bl-sm opacity-50 group-hover:opacity-100"></div>

      <CardContent className="p-6 flex flex-col items-center gap-4 relative z-10">
        
        {/* --- AVATAR DENGAN GLOW --- */}
        <div className="relative">
          {/* Efek Glow di belakang foto */}
          <div className="absolute -inset-2 rounded-full bg-yellow-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
          
          <Avatar className="h-24 w-24 md:h-28 md:w-28 border-2 border-slate-700 group-hover:border-yellow-400 transition-colors relative">
            <AvatarImage src={member.image} alt={member.name} className="object-cover" />
            <AvatarFallback className="bg-slate-800 text-slate-400 font-bold text-xl group-hover:text-yellow-400 group-hover:bg-slate-950 transition-colors">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
        
        {/* --- INFO TEXT --- */}
        <div className="space-y-2 text-center w-full">
          <h3 className="font-bold text-lg text-slate-100 leading-tight group-hover:text-yellow-400 transition-colors truncate">
            {member.name}
          </h3>
          
          {/* Badge Jabatan */}
          <Badge variant="outline" className="border-slate-700 text-slate-400 bg-slate-950/50 group-hover:border-yellow-500/30 group-hover:text-yellow-200 transition-colors">
            {member.role}
          </Badge>

          {member.period && (
            <div className="pt-1">
              <span className="text-[10px] uppercase tracking-widest text-slate-600 group-hover:text-slate-400 transition-colors">
                Periode {member.period}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}