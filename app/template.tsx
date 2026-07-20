/**
 * template.tsx berbeda dari layout.tsx: dia di-remount setiap kali
 * pindah halaman/route. Ini dimanfaatkan untuk animasi transisi
 * halus (fade + sedikit slide) setiap kali user navigasi ke halaman
 * baru, tanpa perlu library tambahan (pakai utility dari tw-animate-css
 * yang sudah terpasang di project ini).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out">
      {children}
    </div>
  );
}