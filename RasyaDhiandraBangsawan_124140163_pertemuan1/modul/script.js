// ============================================================
// Modul Praktikum JavaScript
// Rasya Dhiandra Bangsawan - 124140163
// Aturan: const untuk nilai tetap, let untuk nilai berubah,
// === untuk perbandingan, camelCase untuk penamaan.
// ============================================================

// ---------- Helper umum ----------
const $ = (id) => document.getElementById(id);

// Menulis banyak baris teks ke elemen <pre> sekaligus ke console
function tulis(idOutput, baris) {
  const teks = Array.isArray(baris) ? baris.join('\n') : String(baris);
  $(idOutput).textContent = teks;
  console.log(teks);
}

function buatSel(teks) {
  const td = document.createElement('td');
  td.textContent = teks; // textContent mencegah HTML injection
  return td;
}

function buatTombol(teks, kelas, aksi, id) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = teks;
  if (kelas) btn.className = kelas;
  btn.dataset.aksi = aksi;
  btn.dataset.id = id;
  return btn;
}

function simpanLokal(kunci, nilai) {
  localStorage.setItem(kunci, JSON.stringify(nilai));
}

function muatLokal(kunci, cadangan) {
  try {
    const data = JSON.parse(localStorage.getItem(kunci));
    return data === null ? cadangan : data;
  } catch (error) {
    console.error(`Data "${kunci}" rusak, memakai data awal.`, error);
    return cadangan;
  }
}

// ============================================================
// LATIHAN 1: Kondisional
// ============================================================

// 1a. Data diri (const untuk yang tetap, let untuk yang bisa berubah)
const namaLengkap = 'Rasya Dhiandra Bangsawan';
const nim = '124140163';
let umur = 20;                    // GANTI sesuai umurmu
let kotaAsal = 'Isi kota asalmu';  // GANTI sesuai kotamu

// 1b. Cek kelulusan: if-else (dua kemungkinan)
function cekKelulusan(nilai) {
  if (nilai >= 70) {
    return `Nilai ${nilai}: LULUS`;
  } else {
    return `Nilai ${nilai}: TIDAK LULUS`;
  }
}

// 1c. Kategori umur: if - else if (banyak rentang)
function kategoriUmur(usia) {
  if (usia < 0) return 'Umur tidak valid';
  if (usia < 12) return 'Anak';
  if (usia <= 17) return 'Remaja';
  if (usia <= 59) return 'Dewasa';
  return 'Lansia';
}

// 1d. Konversi angka hari ke nama hari: switch-case (banyak nilai tetap)
function namaHari(angka) {
  switch (angka) {
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    case 6: return 'Saturday';
    case 7: return 'Sunday';
    default: return 'Angka hari tidak valid (harus 1-7)';
  }
}

// 1e. Kalkulator grade: ternary operator bersarang
function hitungGrade(nilai) {
  return nilai >= 85 ? 'A'
    : nilai >= 70 ? 'B'
    : nilai >= 55 ? 'C'
    : nilai >= 40 ? 'D'
    : 'E';
}

function jalankanLatihan1() {
  const baris = [
    `Nama      : ${namaLengkap}`,
    `NIM       : ${nim}`,
    `Umur      : ${umur} (${kategoriUmur(umur)})`,
    `Kota asal : ${kotaAsal}`,
    '',
    '--- Kelulusan (>= 70) ---',
    cekKelulusan(85),
    cekKelulusan(70),
    cekKelulusan(55),
    '',
    '--- Kategori umur ---',
  ];
  [5, 12, 17, 18, 59, 60].forEach((u) => baris.push(`Umur ${u}: ${kategoriUmur(u)}`));

  baris.push('', '--- Hari (switch-case) ---');
  [1, 4, 7, 9].forEach((h) => baris.push(`Hari ${h}: ${namaHari(h)}`));

  baris.push('', '--- Grade (ternary) ---');
  [92, 78, 60, 45, 20].forEach((n) => baris.push(`Nilai ${n}: Grade ${hitungGrade(n)}`));

  tulis('out1', baris);
}

// ============================================================
// LATIHAN 2: Loop, Fungsi, dan Event Handler
// ============================================================

// Membaca bilangan bulat dari input; mengembalikan null jika tidak valid
function bacaBilanganBulat(teks) {
  const bersih = String(teks).trim();
  return /^-?\d+$/.test(bersih) ? Number(bersih) : null;
}

// 2a. Tabel perkalian 1 sampai 10
function tabelPerkalian(angka) {
  const baris = [`Tabel perkalian ${angka}`];
  for (let i = 1; i <= 10; i++) {
    baris.push(`${angka} x ${i} = ${angka * i}`);
  }
  return baris;
}

// 2b. Faktorial (BigInt agar hasil besar tetap akurat)
function faktorial(n) {
  let hasil = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    hasil *= i;
  }
  return hasil;
}

// 2c. Bilangan prima
function isPrima(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// 2d. BMI = berat (kg) / tinggi (m) kuadrat
function hitungBmi(beratKg, tinggiCm) {
  const tinggiM = tinggiCm / 100;
  const bmi = beratKg / (tinggiM * tinggiM);
  const kategori = bmi < 18.5 ? 'Berat badan kurang'
    : bmi < 25 ? 'Normal'
    : bmi < 30 ? 'Berat badan berlebih'
    : 'Obesitas';
  return { bmi, kategori };
}

// 2e. FizzBuzz
function fizzBuzz() {
  const hasil = [];
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) hasil.push('FizzBuzz');
    else if (i % 3 === 0) hasil.push('Fizz');
    else if (i % 5 === 0) hasil.push('Buzz');
    else hasil.push(String(i));
  }
  return hasil;
}

function pasangEventLatihan2() {
  $('btn-kali').addEventListener('click', () => {
    const angka = bacaBilanganBulat($('angka').value);
    if (angka === null) return tulis('out2', 'Masukkan angka bulat yang valid.');
    tulis('out2', tabelPerkalian(angka));
  });

  $('btn-faktorial').addEventListener('click', () => {
    const angka = bacaBilanganBulat($('angka').value);
    if (angka === null || angka < 0) return tulis('out2', 'Faktorial hanya untuk bilangan bulat >= 0.');
    if (angka > 500) return tulis('out2', 'Angka terlalu besar (maksimal 500).');
    tulis('out2', `${angka}! = ${faktorial(angka)}`);
  });

  $('btn-prima').addEventListener('click', () => {
    const angka = bacaBilanganBulat($('angka').value);
    if (angka === null) return tulis('out2', 'Masukkan angka bulat yang valid.');
    tulis('out2', `${angka} ${isPrima(angka) ? 'adalah' : 'bukan'} bilangan prima.`);
  });

  $('btn-fizzbuzz').addEventListener('click', () => tulis('out2', fizzBuzz().join(', ')));

  $('btn-bmi').addEventListener('click', () => {
    const berat = Number($('berat').value.replace(',', '.'));
    const tinggi = Number($('tinggi').value.replace(',', '.'));
    if (!($('berat').value.trim() !== '' && berat > 0 && tinggi > 0 && $('tinggi').value.trim() !== '')) {
      return tulis('hasil-bmi', 'Isi berat (kg) dan tinggi (cm) dengan angka lebih dari 0.');
    }
    const { bmi, kategori } = hitungBmi(berat, tinggi);
    tulis('hasil-bmi', `BMI kamu ${bmi.toFixed(1)}: ${kategori}`);
  });
}

// ============================================================
// LATIHAN 3 + LATIHAN TERAKHIR: Mahasiswa (CRUD, validasi, localStorage)
// ============================================================
const KUNCI_MHS = 'mahasiswa_v1';

const dataAwalMahasiswa = [
  { id: 1, nama: 'Budi Santoso', nim: '124140101', jurusan: 'Teknik Informatika', nilai: 88 },
  { id: 2, nama: 'Citra Lestari', nim: '124140102', jurusan: 'Sistem Informasi', nilai: 92 },
  { id: 3, nama: 'Andi Pratama', nim: '124140103', jurusan: 'Teknik Informatika', nilai: 67 },
  { id: 4, nama: 'Dewi Anggraini', nim: '124140104', jurusan: 'Teknik Elektro', nilai: 75 },
  { id: 5, nama: 'Eko Wijaya', nim: '124140105', jurusan: 'Sistem Informasi', nilai: 54 },
];

let mahasiswa = muatLokal(KUNCI_MHS, dataAwalMahasiswa);
let idSedangDiedit = null;   // null = mode tambah, angka = mode ubah
let modeFilter = 'semua';    // 'semua' | 'diatasRata'
let arahUrut = null;         // null | 'asc' | 'desc'

// Menghitung rata-rata nilai
function hitungRataRata(daftar) {
  if (daftar.length === 0) return 0;
  return daftar.reduce((jumlah, m) => jumlah + m.nilai, 0) / daftar.length;
}

// Mencari mahasiswa nilai tertinggi (bisa lebih dari satu jika nilainya sama)
function cariTertinggi(daftar) {
  if (daftar.length === 0) return [];
  const maks = Math.max(...daftar.map((m) => m.nilai));
  return daftar.filter((m) => m.nilai === maks);
}

// Filter di atas rata-rata
function diAtasRataRata(daftar) {
  const rata = hitungRataRata(daftar);
  return daftar.filter((m) => m.nilai > rata);
}

// Urut berdasarkan nama (tidak mengubah array asli)
function urutkanNama(daftar, arah) {
  const faktor = arah === 'desc' ? -1 : 1;
  return [...daftar].sort((a, b) => a.nama.localeCompare(b.nama, 'id') * faktor);
}

function ambilDataTampil() {
  let data = modeFilter === 'diatasRata' ? diAtasRataRata(mahasiswa) : [...mahasiswa];
  if (arahUrut) data = urutkanNama(data, arahUrut);
  return data;
}

function renderMahasiswa() {
  const tbody = $('tabel-mhs');
  tbody.replaceChildren();
  const data = ambilDataTampil();

  if (data.length === 0) {
    const tr = document.createElement('tr');
    const td = buatSel('Tidak ada data mahasiswa.');
    td.colSpan = 6;
    tr.append(td);
    tbody.append(tr);
  }

  data.forEach((m, i) => {
    const tr = document.createElement('tr');
    tr.append(buatSel(i + 1), buatSel(m.nama), buatSel(m.nim), buatSel(m.jurusan), buatSel(m.nilai));
    const tdAksi = document.createElement('td');
    tdAksi.append(
      buatTombol('Edit', 'sekunder', 'edit', m.id),
      ' ',
      buatTombol('Hapus', 'bahaya', 'hapus', m.id)
    );
    tr.append(tdAksi);
    tbody.append(tr);
  });
}

function tampilkanInfo(teks) {
  $('info-mhs').textContent = teks;
}

// Validasi form mahasiswa; mengembalikan { valid, data }
function validasiMahasiswa() {
  const nama = $('mhs-nama').value.trim();
  const nimInput = $('mhs-nim').value.trim();
  const jurusan = $('mhs-jurusan').value.trim();
  const nilaiTeks = $('mhs-nilai').value.trim();
  const error = { nama: '', nim: '', jurusan: '', nilai: '' };

  if (nama.length < 3) error.nama = 'Nama wajib diisi, minimal 3 karakter.';

  if (!/^\d{9}$/.test(nimInput)) {
    error.nim = 'NIM harus 9 digit angka.';
  } else if (mahasiswa.some((m) => m.nim === nimInput && m.id !== idSedangDiedit)) {
    error.nim = 'NIM sudah terdaftar.';
  }

  if (jurusan.length < 2) error.jurusan = 'Jurusan wajib diisi.';

  if (!/^\d+(\.\d+)?$/.test(nilaiTeks)) {
    error.nilai = 'Nilai harus berupa angka.';
  } else if (Number(nilaiTeks) > 100) {
    error.nilai = 'Nilai maksimal 100.';
  }

  ['nama', 'nim', 'jurusan', 'nilai'].forEach((k) => {
    $(`err-mhs-${k}`).textContent = error[k];
  });

  const valid = Object.values(error).every((pesan) => pesan === '');
  return { valid, data: { nama, nim: nimInput, jurusan, nilai: Number(nilaiTeks) } };
}

function resetFormMahasiswa() {
  $('form-mhs').reset();
  idSedangDiedit = null;
  $('btn-simpan-mhs').textContent = 'Tambah';
  $('btn-batal-edit').hidden = true;
  ['nama', 'nim', 'jurusan', 'nilai'].forEach((k) => { $(`err-mhs-${k}`).textContent = ''; });
}

function pasangEventMahasiswa() {
  // CREATE dan UPDATE
  $('form-mhs').addEventListener('submit', (e) => {
    e.preventDefault();
    const { valid, data } = validasiMahasiswa();
    if (!valid) return;

    if (idSedangDiedit === null) {
      const idBaru = mahasiswa.reduce((maks, m) => Math.max(maks, m.id), 0) + 1;
      mahasiswa.push({ id: idBaru, ...data });
    } else {
      mahasiswa = mahasiswa.map((m) => (m.id === idSedangDiedit ? { ...m, ...data } : m));
    }
    simpanLokal(KUNCI_MHS, mahasiswa);
    resetFormMahasiswa();
    tampilkanInfo('Data tersimpan.');
    renderMahasiswa();
  });

  // READ / EDIT / DELETE lewat event delegation pada tbody
  $('tabel-mhs').addEventListener('click', (e) => {
    const tombol = e.target.closest('button');
    if (!tombol) return;
    const id = Number(tombol.dataset.id);

    if (tombol.dataset.aksi === 'hapus') {
      mahasiswa = mahasiswa.filter((m) => m.id !== id);
      if (idSedangDiedit === id) resetFormMahasiswa();
      simpanLokal(KUNCI_MHS, mahasiswa);
      tampilkanInfo('Data dihapus.');
      renderMahasiswa();
    } else if (tombol.dataset.aksi === 'edit') {
      const m = mahasiswa.find((item) => item.id === id);
      if (!m) return;
      idSedangDiedit = id;
      $('mhs-nama').value = m.nama;
      $('mhs-nim').value = m.nim;
      $('mhs-jurusan').value = m.jurusan;
      $('mhs-nilai').value = m.nilai;
      $('btn-simpan-mhs').textContent = 'Perbarui';
      $('btn-batal-edit').hidden = false;
      $('mhs-nama').focus();
    }
  });

  $('btn-batal-edit').addEventListener('click', resetFormMahasiswa);

  $('btn-semua').addEventListener('click', () => {
    modeFilter = 'semua';
    arahUrut = null;
    tampilkanInfo('Menampilkan semua mahasiswa.');
    renderMahasiswa();
  });

  $('btn-tertinggi').addEventListener('click', () => {
    const top = cariTertinggi(mahasiswa);
    tampilkanInfo(top.length
      ? `Nilai tertinggi: ${top.map((m) => `${m.nama} (${m.nilai})`).join(', ')}`
      : 'Belum ada data.');
  });

  $('btn-filter-rata').addEventListener('click', () => {
    modeFilter = 'diatasRata';
    tampilkanInfo(`Rata-rata nilai: ${hitungRataRata(mahasiswa).toFixed(2)}. Menampilkan yang di atas rata-rata.`);
    renderMahasiswa();
  });

  $('btn-urut-asc').addEventListener('click', () => { arahUrut = 'asc'; renderMahasiswa(); });
  $('btn-urut-desc').addEventListener('click', () => { arahUrut = 'desc'; renderMahasiswa(); });
}

// ============================================================
// LATIHAN TERAKHIR: Fetch API, search, dan pagination
// ============================================================
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const POST_PER_HALAMAN = 10;
let semuaPost = [];
let postTersaring = [];
let halamanAktif = 1;

async function muatPost() {
  $('status-api').textContent = 'Memuat data dari API...';
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Server membalas status ${response.status}`);
    semuaPost = await response.json();
    $('status-api').textContent = `${semuaPost.length} post berhasil dimuat.`;
  } catch (error) {
    semuaPost = [];
    $('status-api').textContent = `Gagal memuat data: ${error.message}. Periksa koneksi internet lalu muat ulang halaman.`;
    console.error(error);
  }
  terapkanPencarian();
}

function terapkanPencarian() {
  const kataKunci = $('cari-post').value.trim().toLowerCase();
  postTersaring = semuaPost.filter((p) => p.title.toLowerCase().includes(kataKunci));
  halamanAktif = 1;
  renderPost();
}

function renderPost() {
  const total = postTersaring.length;
  const totalHalaman = Math.max(1, Math.ceil(total / POST_PER_HALAMAN));
  const awal = (halamanAktif - 1) * POST_PER_HALAMAN;
  const daftar = $('daftar-post');
  daftar.replaceChildren();

  postTersaring.slice(awal, awal + POST_PER_HALAMAN).forEach((p) => {
    const li = document.createElement('li');
    const judul = document.createElement('strong');
    judul.textContent = p.title;
    const isi = document.createElement('div');
    isi.textContent = p.body;
    li.append(judul, isi);
    daftar.append(li);
  });

  if (total === 0 && semuaPost.length > 0) {
    const li = document.createElement('li');
    li.textContent = 'Tidak ada post yang cocok dengan pencarian.';
    daftar.append(li);
  }

  $('info-halaman').textContent = `Halaman ${halamanAktif} dari ${totalHalaman}`;
  $('btn-prev').disabled = halamanAktif <= 1;
  $('btn-next').disabled = halamanAktif >= totalHalaman;
}

function pasangEventApi() {
  $('cari-post').addEventListener('input', terapkanPencarian);
  $('btn-prev').addEventListener('click', () => { halamanAktif--; renderPost(); });
  $('btn-next').addEventListener('click', () => { halamanAktif++; renderPost(); });
}

// ============================================================
// LATIHAN TERAKHIR: Dark mode (manipulasi class CSS)
// ============================================================
const KUNCI_TEMA = 'tema_v1';

function terapkanTema(gelap) {
  document.body.classList.toggle('dark', gelap);
  $('btn-dark').textContent = gelap ? 'Mode terang' : 'Mode gelap';
  localStorage.setItem(KUNCI_TEMA, gelap ? 'gelap' : 'terang');
}

function pasangEventTema() {
  terapkanTema(localStorage.getItem(KUNCI_TEMA) === 'gelap');
  $('btn-dark').addEventListener('click', () => {
    terapkanTema(!document.body.classList.contains('dark'));
  });
}

// ============================================================
// LATIHAN TERAKHIR: Todo List (DOM + localStorage)
// ============================================================
const KUNCI_TODO = 'todo_v1';
let daftarTodo = muatLokal(KUNCI_TODO, []);

function renderTodo() {
  const ul = $('todo-list');
  ul.replaceChildren();

  daftarTodo.forEach((t) => {
    const li = document.createElement('li');
    li.className = t.selesai ? 'selesai' : '';

    const cek = document.createElement('input');
    cek.type = 'checkbox';
    cek.checked = t.selesai;
    cek.dataset.aksi = 'toggle';
    cek.dataset.id = t.id;
    cek.setAttribute('aria-label', `Tandai selesai: ${t.teks}`);

    const teks = document.createElement('span');
    teks.className = 'teks';
    teks.textContent = ` ${t.teks} `;

    li.append(cek, teks, buatTombol('Hapus', 'bahaya', 'hapus', t.id));
    ul.append(li);
  });

  const selesai = daftarTodo.filter((t) => t.selesai).length;
  $('todo-info').textContent = daftarTodo.length === 0
    ? 'Belum ada tugas. Tambahkan tugas pertamamu.'
    : `${selesai} dari ${daftarTodo.length} tugas selesai.`;
}

function pasangEventTodo() {
  $('form-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    const teks = $('todo-input').value.trim();
    if (teks === '') {
      $('err-todo').textContent = 'Tugas tidak boleh kosong.';
      return;
    }
    $('err-todo').textContent = '';
    daftarTodo.push({ id: Date.now(), teks, selesai: false });
    $('todo-input').value = '';
    simpanLokal(KUNCI_TODO, daftarTodo);
    renderTodo();
  });

  $('todo-list').addEventListener('click', (e) => {
    const target = e.target.closest('[data-aksi]');
    if (!target) return;
    const id = Number(target.dataset.id);

    if (target.dataset.aksi === 'toggle') {
      daftarTodo = daftarTodo.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t));
    } else if (target.dataset.aksi === 'hapus') {
      daftarTodo = daftarTodo.filter((t) => t.id !== id);
    }
    simpanLokal(KUNCI_TODO, daftarTodo);
    renderTodo();
  });
}

jalankanLatihan1();
pasangEventLatihan2();
pasangEventMahasiswa();
renderMahasiswa();
pasangEventApi();
muatPost();
pasangEventTema();
pasangEventTodo();
renderTodo();
