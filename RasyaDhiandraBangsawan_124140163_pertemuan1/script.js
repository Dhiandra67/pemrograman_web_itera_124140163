// ===== Konstanta & State =====
const STORAGE_KEY = 'kasir_kantin_v1';
const MIN_HARGA = 500;
const MIN_NAMA = 3;
const BATAS_DISKON = 50000;
const PERSEN_DISKON = 0.1;
const KODE_PROMO = 'HEMAT10';

let keranjang = [];   // [{ id, nama, harga, qty }]
let kodePromo = '';

// ===== Elemen DOM =====
const $ = (id) => document.getElementById(id);
const form = $('form-barang');
const inputNama = $('nama'), inputHarga = $('harga'), inputQty = $('qty');
const inputPromo = $('promo'), inputBayar = $('bayar');

// ===== Utilitas =====
const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

function tampilkanError(input, pesan) {
  $('err-' + input.id).textContent = pesan;
  input.classList.toggle('invalid', Boolean(pesan));
}

// ===== 1. Validasi form =====
function validasiNama(v) {
  const nama = v.trim();
  if (nama.length < MIN_NAMA) return `Nama barang wajib diisi, minimal ${MIN_NAMA} karakter.`;
  return '';
}

function validasiHarga(v) {
  const teks = v.trim();
  if (teks === '') return 'Harga satuan wajib diisi.';
  if (!/^-?\d+$/.test(teks)) return 'Harga satuan harus berupa angka bulat (tanpa huruf atau simbol).';
  if (Number(teks) < MIN_HARGA) return `Harga satuan minimal ${rupiah(MIN_HARGA)}.`;
  return '';
}

function validasiQty(v) {
  const teks = v.trim();
  if (teks === '') return 'Jumlah wajib diisi.';
  if (!/^-?\d+$/.test(teks)) return 'Jumlah harus berupa angka bulat.';
  if (Number(teks) < 1) return 'Jumlah minimal 1.';
  return '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const errNama = validasiNama(inputNama.value);
  const errHarga = validasiHarga(inputHarga.value);
  const errQty = validasiQty(inputQty.value);

  tampilkanError(inputNama, errNama);
  tampilkanError(inputHarga, errHarga);
  tampilkanError(inputQty, errQty);

  if (errNama || errHarga || errQty) return; // data tidak valid: barang tidak masuk keranjang

  keranjang.push({
    id: Date.now() + Math.random(),
    nama: inputNama.value.trim(),
    harga: Number(inputHarga.value.trim()),
    qty: Number(inputQty.value.trim()),
  });

  form.reset();
  inputNama.focus();
  simpan();
  render();
});

// Hapus pesan error saat pengguna mulai mengetik ulang
[inputNama, inputHarga, inputQty].forEach((el) =>
  el.addEventListener('input', () => tampilkanError(el, ''))
);

// ===== 2. Kalkulator =====
function hitung() {
  const total = keranjang.reduce((jumlah, item) => jumlah + item.harga * item.qty, 0);
  const promoAktif = kodePromo.trim().toUpperCase() === KODE_PROMO && total > 0;
  const diskonOtomatis = total >= BATAS_DISKON;
  const diskon = promoAktif || diskonOtomatis ? Math.round(total * PERSEN_DISKON) : 0;
  const totalAkhir = total - diskon;
  const sumber = promoAktif ? `kode ${KODE_PROMO}` : diskonOtomatis ? 'belanja ≥ Rp 50.000' : '';
  return { total, diskon, totalAkhir, sumber, promoAktif };
}

// ===== 3. Render tampilan =====
function render() {
  const tbody = $('isi-keranjang');
  tbody.replaceChildren();

  keranjang.forEach((item, i) => {
    const tr = document.createElement('tr');
    const sel = (teks, kelas) => {
      const td = document.createElement('td');
      td.textContent = teks;
      if (kelas) td.className = kelas;
      return td;
    };
    tr.append(
      sel(i + 1),
      sel(item.nama),
      sel(rupiah(item.harga), 'num'),
      sel(item.qty, 'num'),
      sel(rupiah(item.harga * item.qty), 'num')
    );

    const tdAksi = document.createElement('td');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn hapus';
    btn.textContent = 'Hapus';
    btn.setAttribute('aria-label', 'Hapus ' + item.nama);
    btn.addEventListener('click', () => hapusItem(item.id));
    tdAksi.append(btn);
    tr.append(tdAksi);
    tbody.append(tr);
  });

  $('kosong').hidden = keranjang.length > 0;
  renderRingkasan();
}

function renderRingkasan() {
  const { total, diskon, totalAkhir, sumber, promoAktif } = hitung();

  $('total').textContent = rupiah(total);
  $('diskon').textContent = '– ' + rupiah(diskon);
  $('label-diskon').textContent = diskon > 0 ? `Diskon 10% (${sumber})` : 'Diskon';
  $('total-akhir').textContent = rupiah(totalAkhir);

  // Info kode promo
  const infoPromo = $('info-promo');
  const kode = kodePromo.trim();
  infoPromo.className = 'hint';
  if (kode === '') {
    infoPromo.textContent = `Diskon 10% otomatis untuk belanja minimal ${rupiah(BATAS_DISKON)}.`;
  } else if (promoAktif) {
    infoPromo.textContent = `Kode ${KODE_PROMO} dipakai: diskon 10%.`;
    infoPromo.classList.add('ok');
  } else if (kode.toUpperCase() === KODE_PROMO) {
    infoPromo.textContent = 'Tambahkan barang dulu agar kode promo berlaku.';
    infoPromo.classList.add('bad');
  } else {
    infoPromo.textContent = 'Kode promo tidak dikenal.';
    infoPromo.classList.add('bad');
  }

  // Pembayaran & kembalian
  const teksBayar = inputBayar.value.trim();
  const bayar = /^\d+$/.test(teksBayar) ? Number(teksBayar) : 0;
  const infoBayar = $('info-bayar');
  const barisKembali = $('kembalian').parentElement;
  infoBayar.className = 'hint';
  barisKembali.classList.remove('kurang');
  $('uang-bayar').textContent = rupiah(bayar);

  if (teksBayar !== '' && !/^\d+$/.test(teksBayar)) {
    infoBayar.textContent = 'Uang bayar harus berupa angka.';
    infoBayar.classList.add('bad');
    $('label-kembali').textContent = 'Kembalian';
    $('kembalian').textContent = rupiah(0);
  } else if (totalAkhir === 0) {
    infoBayar.textContent = '';
    $('label-kembali').textContent = 'Kembalian';
    $('kembalian').textContent = rupiah(0);
  } else if (bayar < totalAkhir) {
    const kurang = totalAkhir - bayar;
    infoBayar.textContent = `Uang belum mencukupi, kurang ${rupiah(kurang)}.`;
    infoBayar.classList.add('bad');
    $('label-kembali').textContent = 'Kekurangan';
    $('kembalian').textContent = rupiah(kurang);
    barisKembali.classList.add('kurang');
  } else {
    infoBayar.textContent = 'Uang bayar mencukupi.';
    infoBayar.classList.add('ok');
    $('label-kembali').textContent = 'Kembalian';
    $('kembalian').textContent = rupiah(bayar - totalAkhir);
  }
}

// ===== 4. Aksi keranjang =====
function hapusItem(id) {
  keranjang = keranjang.filter((item) => item.id !== id);
  simpan();
  render();
}

function transaksiBaru() {
  keranjang = [];
  kodePromo = '';
  inputPromo.value = '';
  inputBayar.value = '';
  form.reset();
  [inputNama, inputHarga, inputQty].forEach((el) => tampilkanError(el, ''));
  localStorage.removeItem(STORAGE_KEY);
  render();
}

$('btn-reset').addEventListener('click', transaksiBaru);
inputPromo.addEventListener('input', () => { kodePromo = inputPromo.value; simpan(); renderRingkasan(); });
inputBayar.addEventListener('input', renderRingkasan);

// ===== 5. LocalStorage =====
function simpan() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ keranjang, kodePromo }));
}

function muat() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data && Array.isArray(data.keranjang)) {
      keranjang = data.keranjang.filter(
        (it) => typeof it.nama === 'string' && Number.isFinite(it.harga) && Number.isFinite(it.qty)
      );
      kodePromo = typeof data.kodePromo === 'string' ? data.kodePromo : '';
      inputPromo.value = kodePromo;
    }
  } catch (err) {
    keranjang = []; // data rusak: mulai dari keranjang kosong
  }
}

// ===== Mulai =====
muat();
render();
