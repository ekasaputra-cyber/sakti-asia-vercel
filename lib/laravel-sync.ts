/**
 * Kirim data ke endpoint Laravel sebagai salinan tambahan (selain Google Sheets).
 * Sengaja "best-effort": kalau gagal (Laravel down, dsb), cuma di-log ke console,
 * TIDAK melempar error — biar submission ke Google Sheets tetap dianggap sukses
 * walau sinkronisasi ke database Laravel gagal.
 */
export async function syncToLaravel(
  path: string,
  body: Record<string, unknown>,
) {
  const baseUrl = process.env.LARAVEL_API_URL;
  const secret = process.env.LARAVEL_API_SECRET;

  if (!baseUrl || !secret) {
    console.error(
      "LARAVEL_API_URL atau LARAVEL_API_SECRET belum di-set — lewati sinkronisasi ke database Laravel.",
    );
    return;
  }

  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Secret": secret,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(
        `Gagal sinkronisasi ke Laravel (${path}): status ${res.status}`,
      );
    }
  } catch (error) {
    console.error(`Gagal sinkronisasi ke Laravel (${path}):`, error);
  }
}
