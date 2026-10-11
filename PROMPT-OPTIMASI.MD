Saya ingin kamu bertindak sebagai **Senior Full-Stack Developer, Website Performance Engineer, Code Auditor, dan DevOps Engineer**. Tugasmu adalah melakukan audit menyeluruh dan mengoptimalkan website SAKTI Asia agar lebih cepat, ringan, responsif, dan stabil tanpa merusak fitur maupun desain yang sudah ada.

## 1. Informasi Project

* **Nama project:** SAKTI Asia Website
* **Repository GitHub:** https://github.com/ekasaputra-cyber/sakti-asia-vercel.git
* **Website production:** https://www.saktiasia.web.id/
* **Lokasi kode:** Sudah tersedia di laptop lokal saya.
* **Deployment:** Repository GitHub sudah terhubung dengan Vercel dan website sudah online.
* **Kondisi saat ini:** Website terasa lemot atau mengalami lag ketika dibuka. Saya ingin mengetahui penyebabnya dan memperbaikinya secara menyeluruh.

PENTING: Kerjakan project yang sudah ada di direktori lokal saya. Jangan membuat project baru, jangan mengganti framework tanpa alasan teknis yang kuat, dan jangan mengasumsikan struktur project sebelum memeriksanya.

## 2. Tujuan Utama

Lakukan pekerjaan berikut secara sistematis:

1. Menemukan penyebab utama website lambat ketika pertama kali dibuka.
2. Mengidentifikasi kode, file, dependency, aset, dan proses yang tidak diperlukan.
3. Menghapus kode yang benar-benar tidak digunakan dengan tetap menjaga keamanan dan kompatibilitas.
4. Mengoptimalkan loading halaman, rendering, interaksi, animasi, gambar, CSS, JavaScript, dan request jaringan.
5. Menjaga seluruh fitur, tampilan, navigasi, responsivitas, dan integrasi yang sudah berjalan.
6. Memastikan perubahan aman untuk GitHub dan deployment Vercel.
7. Menguji hasil optimasi berdasarkan pengukuran sebelum dan sesudah perubahan.

Jangan langsung mengubah kode secara membabi buta. Lakukan audit terlebih dahulu, tentukan prioritas berdasarkan bukti, kemudian implementasikan perbaikan.

## 3. Tahap Pertama — Audit Struktur Project

Periksa keseluruhan project lokal, termasuk:

* Struktur direktori dan seluruh file sumber.
* `package.json` dan lockfile jika menggunakan Node.js.
* Framework, library, plugin, dan dependency yang digunakan.
* Konfigurasi build, bundler, dan deployment.
* File konfigurasi Vercel seperti `vercel.json`, jika tersedia.
* File CSS, JavaScript, TypeScript, HTML, komponen, dan halaman.
* Folder aset seperti gambar, ikon, video, font, serta animasi.
* Script yang dijalankan ketika aplikasi pertama kali dimuat.
* Integrasi API, database, analytics, chatbot, atau layanan eksternal jika ada.
* Duplikasi kode, komponen yang tidak digunakan, import yang tidak diperlukan, dan dependency berlebihan.

Buat daftar temuan dengan kategori:

* Aman dihapus.
* Perlu diverifikasi sebelum dihapus.
* Wajib dipertahankan.
* Berpotensi menyebabkan masalah performa.
* Berpotensi menyebabkan error atau masalah kompatibilitas.

Jangan menghapus file hanya karena terlihat tidak digunakan. Periksa referensi dinamis, routing, konfigurasi build, penggunaan aset, dan pemanggilan melalui string terlebih dahulu.

## 4. Tahap Kedua — Diagnosis Penyebab Website Lemot

Periksa website production dan project lokal untuk mengidentifikasi sumber masalah yang sebenarnya.

### A. Loading awal

Periksa:

* Waktu respons server dan Time to First Byte (TTFB).
* First Contentful Paint (FCP).
* Largest Contentful Paint (LCP).
* Total Blocking Time (TBT).
* Cumulative Layout Shift (CLS).
* Ukuran halaman dan total data yang diunduh.
* Jumlah request jaringan.
* Resource yang menghambat rendering.
* Perbedaan performa pada desktop dan perangkat mobile.

Gunakan Google PageSpeed Insights, Lighthouse, Chrome DevTools, atau alat lain yang tersedia. Simpan hasil pengukuran sebelum melakukan perubahan.

### B. JavaScript dan rendering

Periksa:

* Bundle JavaScript yang terlalu besar.
* Script yang berjalan terlalu dini atau berulang.
* Komponen yang melakukan render berlebihan.
* Proses berat pada main thread.
* Event listener yang tidak dibersihkan.
* Animasi yang menyebabkan frame drop.
* Efek scroll, parallax, cursor, transisi, dan efek visual lainnya.
* Hydration atau proses rendering yang tidak efisien jika menggunakan framework terkait.
* Error, warning, dan request gagal di console.

### C. Gambar dan aset

Periksa:

* Gambar beresolusi terlalu besar.
* Gambar yang dapat dikonversi ke WebP atau AVIF.
* Gambar yang seharusnya menggunakan lazy loading.
* Gambar utama di area awal halaman yang justru terlambat dimuat.
* Video, GIF, ikon, font, dan aset yang terlalu berat.
* Aset duplikat atau tidak digunakan.

Gunakan optimasi sesuai kebutuhan. Jangan menerapkan lazy loading pada gambar utama yang menjadi elemen LCP apabila hal tersebut memperlambat tampilan awal.

### D. CSS dan efek visual

Periksa:

* CSS yang tidak digunakan.
* Selector atau aturan CSS berulang.
* File stylesheet yang terlalu besar.
* Animasi yang memicu layout atau paint berulang.
* Penggunaan `backdrop-filter`, `filter`, `box-shadow`, blur, dan efek mahal lainnya secara berlebihan.
* Layout shift akibat gambar, font, atau elemen yang ukurannya tidak ditentukan.

Pertahankan karakter visual website. Kurangi biaya rendering tanpa menghilangkan identitas desainnya.

### E. Jaringan dan layanan eksternal

Periksa:

* API yang lambat atau dipanggil berulang kali.
* Request yang memblokir tampilan awal.
* Script pihak ketiga yang tidak penting.
* Font eksternal yang lambat.
* Kebijakan cache dan kompresi aset.
* Redirect yang tidak diperlukan.
* Kegagalan koneksi dan timeout.
* Penggunaan CDN atau caching yang belum optimal.

Jangan mengubah layanan eksternal atau menghapus integrasi penting tanpa mengetahui dampaknya terhadap fitur website.

## 5. Tahap Ketiga — Optimasi Kode

Setelah penyebab masalah teridentifikasi, implementasikan perbaikan yang paling berdampak.

Prioritaskan:

1. Mengurangi JavaScript yang tidak diperlukan dan ukuran bundle.
2. Menghapus kode mati, import tidak terpakai, dan dependency yang terbukti tidak digunakan.
3. Menerapkan code splitting dan lazy loading pada bagian yang tepat.
4. Mengoptimalkan gambar, font, ikon, dan aset lainnya.
5. Mengurangi render berlebihan dan pekerjaan berat pada main thread.
6. Mengoptimalkan CSS dan animasi yang menyebabkan lag.
7. Memperbaiki request API dan proses pemuatan data.
8. Mengoptimalkan cache, kompresi, dan pemuatan resource.
9. Mengoptimalkan konfigurasi build serta deployment Vercel jika terbukti diperlukan.
10. Memperbaiki error atau warning yang terbukti memengaruhi performa.

Jangan melakukan optimasi yang hanya terlihat bagus di laporan tetapi tidak memberikan peningkatan nyata pada pengalaman pengguna.

Jangan mengubah semua kode sekaligus tanpa kontrol. Lakukan perubahan secara terstruktur agar penyebab keberhasilan atau kegagalan setiap perbaikan bisa ditelusuri.

## 6. Tahap Keempat — Audit Keamanan Perubahan

Project ini sudah terhubung dengan GitHub dan Vercel. Karena itu, perubahan harus dilakukan secara hati-hati.

WAJIB:

* Periksa status Git sebelum mengubah file.
* Pertahankan perubahan lokal saya yang belum di-commit.
* Jangan menimpa atau menghapus pekerjaan yang sudah ada.
* Jangan menjalankan perintah destruktif seperti `git reset --hard`, `git clean -fd`, atau penghapusan massal.
* Jangan menghapus lockfile atau mengganti package manager tanpa alasan yang jelas.
* Jangan melakukan force push.
* Jangan mengubah repository remote, nama branch, domain, atau konfigurasi production secara sembarangan.
* Jangan menampilkan, menyalin ke laporan, atau mengirim secret, token, password, dan API key.
* Jangan mengubah environment variable production tanpa kebutuhan dan persetujuan.
* Jangan menonaktifkan fitur hanya demi mendapatkan skor performa lebih tinggi.

Jika Git working tree tidak bersih, identifikasi perubahan yang sudah ada sebelum melanjutkan. Pisahkan perubahan optimasi dari pekerjaan saya sebelumnya.

## 7. Tahap Kelima — Pengujian Setelah Optimasi

Setelah perbaikan diterapkan:

1. Jalankan pemeriksaan lint, type-check, dan test yang tersedia.
2. Jalankan production build sesuai framework dan package manager project.
3. Perbaiki error yang muncul akibat perubahan.
4. Periksa console browser dan network request.
5. Uji halaman utama, seluruh navigasi, tautan, formulir, menu, dan fitur interaktif.
6. Periksa tampilan desktop, tablet, dan mobile.
7. Pastikan animasi tidak menyebabkan lag yang mengganggu.
8. Pastikan aset dan halaman penting tetap dapat dimuat.
9. Bandingkan hasil pengukuran performa sebelum dan sesudah optimasi.
10. Uji ulang website production setelah deployment hanya jika deployment telah disetujui dan selesai.

Gunakan kondisi pengujian yang sebanding untuk perbandingan sebelum dan sesudah. Bedakan hasil pengujian lokal, preview deployment, dan production.

Target performa sebagai sasaran, bukan jaminan:

* Lighthouse Performance desktop: 90 atau lebih.
* Lighthouse Performance mobile: 85 atau lebih, dengan target 90 jika memungkinkan.
* LCP: maksimal 2,5 detik.
* INP: maksimal 200 milidetik jika tersedia data lapangan yang memadai.
* CLS: maksimal 0,1.
* Tidak ada error kritis pada build.
* Tidak ada fitur penting yang rusak.

Jika target tidak tercapai, jelaskan hambatan yang masih tersisa. Jangan memalsukan hasil pengukuran atau mengklaim berhasil tanpa bukti.

## 8. Tahap Keenam — GitHub dan Vercel

Ingat bahwa GitHub dan Vercel sudah terhubung.

Karena itu:

* Fokus pada optimasi kode di laptop lokal saya.
* Jangan membuat repository baru atau proyek Vercel baru.
* Jangan langsung melakukan push atau deployment production.
* Jangan mengubah konfigurasi domain.
* Setelah perubahan selesai, tampilkan ringkasan file yang diubah dan hasil pengujian.
* Minta persetujuan saya sebelum melakukan commit, push, atau tindakan yang dapat memicu deployment production.
* Jika tersedia preview deployment, gunakan untuk memverifikasi perubahan sebelum production.

Pastikan solusi sesuai dengan framework dan konfigurasi deployment yang benar-benar digunakan oleh project ini.

## 9. Format Laporan Akhir

Setelah pekerjaan selesai, berikan laporan dengan struktur berikut:

### A. Ringkasan diagnosis

Jelaskan penyebab utama website lambat berdasarkan temuan nyata.

### B. Daftar masalah

Buat tabel berisi:

* Masalah.
* File atau resource terkait.
* Dampak terhadap performa.
* Prioritas perbaikan.
* Solusi yang diterapkan.

### C. Kode yang dibersihkan

Sebutkan file, fungsi, dependency, atau aset yang dihapus maupun disederhanakan, lengkap dengan alasan teknisnya.

### D. Perubahan optimasi

Jelaskan perubahan yang dilakukan dan bagaimana perubahan tersebut meningkatkan performa.

### E. Hasil pengujian

Tampilkan perbandingan sebelum dan sesudah jika kedua pengukuran tersedia.

| Metrik                         | Sebelum               | Sesudah               |
| ------------------------------ | --------------------- | --------------------- |
| Lighthouse Performance desktop | Hasil aktual          | Hasil aktual          |
| Lighthouse Performance mobile  | Hasil aktual          | Hasil aktual          |
| LCP                            | Hasil aktual          | Hasil aktual          |
| INP                            | Hasil aktual atau N/A | Hasil aktual atau N/A |
| CLS                            | Hasil aktual          | Hasil aktual          |
| TBT                            | Hasil aktual          | Hasil aktual          |
| Ukuran halaman                 | Hasil aktual          | Hasil aktual          |
| Build                          | Hasil aktual          | Hasil aktual          |

Jangan mengisi angka berdasarkan perkiraan. Jika suatu metrik tidak dapat diukur, tuliskan alasannya.

### F. Status fitur

Daftar fitur yang sudah diuji, fitur yang bermasalah, dan fitur yang belum bisa diverifikasi.

### G. Status Git dan deployment

Jelaskan branch aktif, perubahan file, status working tree, hasil build, serta apakah perubahan sudah di-commit, di-push, atau di-deploy.

### H. Rekomendasi berikutnya

Urutkan masalah yang masih tersisa berdasarkan dampaknya terhadap pengalaman pengguna.

## 10. Instruksi Pelaksanaan

Mulai dengan memeriksa direktori project lokal, status Git, struktur kode, konfigurasi build, dan kondisi performa website production.

Setelah itu, lakukan diagnosis berbasis bukti, buat daftar masalah, lalu langsung implementasikan optimasi yang aman dan relevan. Jangan berhenti hanya pada pemberian rekomendasi atau laporan audit.

Jika ada tindakan yang berisiko merusak data, mengubah layanan production, atau membutuhkan akses yang belum tersedia, berhenti pada tindakan tersebut dan minta persetujuan saya.

**Prioritas tertinggi adalah membuat website SAKTI Asia terasa cepat ketika pertama kali dibuka, tetap lancar saat digunakan, mempertahankan tampilan dan seluruh fitur penting, serta aman untuk workflow GitHub dan Vercel yang sudah berjalan.**
