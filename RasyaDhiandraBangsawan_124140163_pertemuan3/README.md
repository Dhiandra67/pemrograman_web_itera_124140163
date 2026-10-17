# Aplikasi Manajemen Buku Pribadi

Nama: Rasya Dhiandra Bangsawan | NIM: 124140163 | Tugas Praktikum Pertemuan 3

## Deskripsi
Aplikasi untuk mencatat buku yang **dimiliki**, **sedang dibaca**, atau **ingin dibeli**. Pengguna dapat menambah, mengedit, menghapus, memfilter berdasarkan status, dan mencari berdasarkan judul/penulis. Data tersimpan di `localStorage`.

## Instalasi & Menjalankan (VS Code)
```bash
npm install
npm run dev      # buka http://localhost:5173
npm test         # menjalankan unit test
```

## Screenshot
> `![Beranda](screenshots/home.png)` `![Statistik](screenshots/stats.png)` `![Test](screenshots/test.png)`

## Fitur React yang Digunakan
- **useState & useEffect**: state form/filter, sinkronisasi `localStorage`, reset form saat mode edit.
- **Context API** (`BookContext`): menyimpan buku, filter, dan aksi CRUD secara global.
- **React Router**: halaman Beranda (`/`) dan Statistik (`/stats`).
- **Custom hooks**: `useLocalStorage` (persistensi) dan `useBookStats` (statistik).
- **Komponen reusable**: `BookForm`, `BookList`, `BookFilter`.
- **PropTypes** di seluruh komponen; **validasi form** dengan feedback visual (border merah + pesan).
- **Testing**: 8 unit test (Vitest + React Testing Library).
