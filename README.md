# A JOURNEY THROUGH THE BLUE
### An Immersive 3D Underwater Birthday Experience

> *"A little world made from everything that makes you, you."*

Website ulang tahun interaktif 3D bertema dunia bawah laut yang dipandu oleh **The Blue Whale Guide** (paus biru 3D semi-realistis), menggunakan tipografi **San Francisco**, dilengkapi peta laut 3D interaktif, **Scene Jakarta**, **14 Destinasi Personal**, **Digital Scrapbook**, **Amplop Kenangan**, **Konstelasi Enam Harapan**, **Surat dalam Botol Kaca (Typewriter)**, audio bawah laut persisten, serta ilustrasi dan ucapan lengkap siap pakai.

---

## 1. Cara Menjalankan Website

1. Buka folder `birthday-ocean/`.
2. Klik dua kali `index.html` untuk langsung membukanya di browser modern (Three.js dan GSAP sudah tersedia lokal di `js/vendor/`, sehingga website dapat berjalan lancar bahkan tanpa internet).
3. Opsional untuk development: jalankan ekstensi **Live Server** di VS Code atau server HTTP lokal apa pun pada folder ini.

---

## 2. Struktur Folder

```text
birthday-ocean/
├── index.html
├── README.md
├── css/
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── vendor/
│   │   ├── three.min.js
│   │   └── gsap.min.js
│   ├── content.js         # Pusat konfigurasi seluruh teks, foto, ucapan, audio & warna
│   ├── audio.js
│   ├── whale.js
│   ├── world3d.js
│   ├── animations.js
│   ├── interactions.js
│   ├── memory.js
│   ├── navigation.js
│   └── main.js
└── assets/
    ├── images/
    │   ├── fantasy/
    │   ├── whale/
    │   ├── jakarta/
    │   ├── beach/
    │   ├── perpusat/
    │   ├── bomba/
    │   ├── food/
    │   ├── coffee/
    │   ├── kaliurang/
    │   ├── memories/
    │   └── books/
    ├── audio/
    ├── models/
    └── icons/
        └── whale-favicon.svg
```

---

## 3. Cara Mengganti Foto (Tanpa Mengedit HTML)

Seluruh slot foto saat ini sudah terisi artwork lokal bertema masing-masing chapter. Untuk menukar dengan foto pribadi asli:
1. Salin foto Anda ke folder kategori di dalam `assets/images/` (misalnya `assets/images/jakarta/foto-01.jpg`).
2. Buka `js/content.js` dan ubah nilai `photo:` / `src:` / `image:` ke path foto baru Anda.

## 4. Cara Mengubah Caption

Edit properti `caption:` di dalam `js/content.js`. Perubahan otomatis muncul di kartu, galeri, modal detail, dan Lightbox.

## 5. Cara Mengganti Nama Penerima & Pengirim

Buka bagian paling atas `js/content.js` dan edit:
```javascript
recipientName: "Nama Penerima",
senderName: "Nama Pengirim",
```

## 6. Cara Mengubah Tanggal Ulang Tahun

Edit properti `birthdayDate:` di bagian atas `js/content.js`.

## 7. Cara Mengubah Pertanyaan & Jawaban Verifikasi

Edit blok `verification` di `js/content.js` (`question` dan `answer` yang menerima string atau array beberapa jawaban, tidak sensitif huruf besar/kecil).

## 8. Cara Mengedit Chapter

- **Jakarta Chapter:** edit objek `jakartaChapter` di `js/content.js`.
- **14 Destinasi Personal:** edit array `chapters` (`ch01` sampai `ch14`) di `js/content.js`.

## 9. Cara Menambah Memori & Amplop

Tambahkan objek baru ke array `personalMemories` (Scene 06) atau `forgottenMemories` (Scene 07) di `js/content.js`.

## 10. Cara Mengganti Audio

Secara bawaan, audio bawah laut prosedural Web Audio API aktif setelah interaksi pengguna pertama. Untuk memakai file `.mp3`/`.ogg` lokal milik Anda, simpan ke `assets/audio/` lalu isi path-nya pada blok `audio` di `js/content.js`.

## 11. Cara Mengubah Surat & Enam Harapan

Edit `birthdayWishes` (Scene 08), `letter` (Scene 09), dan `ending` (Scene 10) di `js/content.js`. Token `[NAME]` dan `[YOUR NAME]` terisi otomatis dari konfigurasi utama.

## 12. Cara Mengubah Warna

Edit objek `theme` di bagian atas `js/content.js`. Seluruh palet akan diterapkan otomatis ke variabel CSS saat halaman dibuka.
