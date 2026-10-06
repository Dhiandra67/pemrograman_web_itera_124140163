# Kasir & Keranjang Belanja Sederhana (Mini POS)

## Identitas

Nama Lengkap :Rasya Dhiandra Bangsawan
NIM   :124140163 
Kelas Praktikum :RA
Tugas Pertemuan 1 

## Deskripsi Aplikasi

**Kasir & Keranjang Belanja Sederhana (Mini POS)**-*+ adalah aplikasi web satu halaman yang dipakai kasir untuk mencatat belanjaan pembeli, menghitung total, diskon, dan uang kembalian, lalu menyimpan keranjang agar tidak hilang saat halaman di-refresh.

**Tujuan pembuatan.** Aplikasi ini dibuat untuk melatih tiga kompetensi dasar pemrograman web:
1. Validasi input form dengan pesan kesalahan yang jelas.
2. Perhitungan otomatis (subtotal, total, diskon, kembalian) yang selalu mengikuti isi keranjang.
3. Manajemen data keranjang berbasis `localStorage` (`JSON.stringify()` dan `JSON.parse()`).

**Studi kasus.** Kasir kantin atau toko kampus. Pembeli membeli beberapa barang (misalnya Buku Tulis atau Air Mineral). Kasir memasukkan nama barang, harga satuan, dan jumlah, lalu aplikasi menghitung total belanja, memberi diskon 10% bila memenuhi syarat, dan menghitung kembalian dari uang yang dibayarkan.

Aplikasi dibuat dengan HTML, CSS, dan JavaScript murni, tanpa library atau framework.

## Struktur Folder

```
RasyaDhiandraBangsawan_124140163_pertemuan1/
├── index.html      # Struktur halaman
├── style.css       # Tampilan antarmuka
├── script.js       # Logika aplikasi
├── README.md       # Dokumentasi ini
├── screenshots/    # Tempat file tangkapan layar untuk README
└── modul/          # Folder latihan
```

## Daftar Fitur

**Validasi form input barang**
- [x] Nama barang wajib diisi, minimal 3 karakter (spasi di awal dan akhir diabaikan)
- [x] Harga satuan harus angka bulat minimal Rp 500 (kosong, 0, negatif, dan teks ditolak)
- [x] Jumlah / qty harus angka bulat minimal 1
- [x] Pesan peringatan berwarna merah muncul di bawah input yang salah
- [x] Barang tidak masuk keranjang selama ada input yang tidak valid
- [x] Form di-reset otomatis setelah barang berhasil ditambahkan

**Kalkulator dan perhitungan otomatis**
- [x] Subtotal per baris (harga satuan × qty)
- [x] Total belanja dari seluruh subtotal
- [x] Diskon 10% otomatis untuk total belanja minimal Rp 50.000
- [x] Kode promo `HEMAT10` untuk diskon 10%
- [x] Tampilan nominal diskon dan total akhir yang harus dibayar
- [x] Input uang bayar dengan perhitungan kembalian otomatis
- [x] Keterangan "uang belum mencukupi" beserta nominal kekurangan

**Manajemen keranjang dan localStorage**
- [x] Tabel keranjang dengan kolom No, Nama Barang, Harga Satuan, Qty, Subtotal, dan Aksi
- [x] Tombol **Hapus** per item, dengan total dan diskon dihitung ulang otomatis
- [x] Keranjang tersimpan di `localStorage` dengan `JSON.stringify()` dan dimuat ulang dengan `JSON.parse()`
- [x] Isi keranjang tidak hilang saat halaman di-refresh
- [x] Tombol **Transaksi baru** mengosongkan keranjang dan membersihkan `localStorage`

## Tangkapan Layar
#
## 1. Tampilan form input utama
[Tampilan form input utama](screenshots/01-form-input.png)

### 2. Tampilan saat validasi error muncul
[Tampilan validasi error](screenshots/02-validasi-error.png)

### 3. Tampilan hasil perhitungan dan tabel keranjang
[Tampilan hasil perhitungan dan tabel keranjang](screenshots/03-hasil-perhitungan.png)

## Penjelasan Teknis Singkat

Seluruh logika ada di `script.js`. State aplikasi hanya dua variabel: array `keranjang` (setiap item berbentuk `{ id, nama, harga, qty }`) dan string `kodePromo`. Setiap perubahan state memanggil `simpan()` lalu `render()`, sehingga tampilan selalu mengikuti data.

### 1. Penanganan validasi input
- Form memakai atribut `novalidate` supaya validasi dikendalikan sepenuhnya oleh JavaScript, bukan oleh browser.
- Saat event `submit`, `e.preventDefault()` mencegah halaman dimuat ulang. Tiga fungsi, `validasiNama()`, `validasiHarga()`, dan `validasiQty()`, memeriksa nilai input dan mengembalikan teks pesan error, atau string kosong bila valid.
- Harga dan qty diperiksa dengan regex `/^-?\d+$/` untuk memastikan isinya angka bulat, baru kemudian dibandingkan dengan batas minimum (Rp 500 dan 1). Dengan cara ini input seperti `abc`, `12.5`, atau `-5` mendapat pesan yang tepat.
- Pesan ditampilkan lewat `tampilkanError()` di elemen `<p class="error">` di bawah input, dan input diberi kelas `invalid` (border merah).
- Jika salah satu fungsi mengembalikan pesan, proses berhenti dengan `return` sehingga barang tidak masuk keranjang. Jika semua valid, barang di-`push` ke array, form di-`reset()`, dan fokus kembali ke input nama.

### 2. Algoritma kalkulator
Fungsi `hitung()` menghitung ulang semuanya dari isi `keranjang`, tanpa menyimpan angka hasil di tempat lain:

```
total       = Σ (harga × qty)                       // reduce() pada array keranjang
diskon      = 10% × total, jika total ≥ 50.000 ATAU kode promo = HEMAT10
              selain itu 0                           // tidak ditumpuk
totalAkhir  = total − diskon
kembalian   = uangBayar − totalAkhir                 // jika uangBayar ≥ totalAkhir
kekurangan  = totalAkhir − uangBayar                 // jika uangBayar < totalAkhir
```

`renderRingkasan()` menampilkan hasilnya dan memilih pesan sesuai kondisi: uang kurang (merah), uang cukup (hijau), atau input bukan angka. Karena dipanggil setiap keranjang, kode promo, atau uang bayar berubah, hasil selalu sinkron saat item dihapus.

### 3. Mekanisme serialisasi localStorage
- **Menyimpan:** `simpan()` membungkus state menjadi satu objek lalu mengubahnya menjadi teks JSON, karena `localStorage` hanya dapat menyimpan string.
  ```js
  localStorage.setItem('kasir_kantin_v1', JSON.stringify({ keranjang, kodePromo }));
  ```
- **Memuat:** saat halaman dibuka, `muat()` membaca string tersebut dan mengubahnya kembali menjadi objek dengan `JSON.parse()`. Data disaring dulu (tipe `nama`, `harga`, dan `qty` diperiksa) dan dibungkus `try/catch`, sehingga data rusak tidak membuat aplikasi error, melainkan dimulai dari keranjang kosong.
- **Menghapus:** `transaksiBaru()` mengosongkan state dan memanggil `localStorage.removeItem('kasir_kantin_v1')`.
- **Keamanan tampilan:** nama barang ditulis ke tabel memakai `textContent`, bukan `innerHTML`, sehingga input seperti `<script>` tampil sebagai teks biasa.