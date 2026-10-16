## Fitur Aplikasi
- Tambah, edit, hapus, dan tandai selesai tugas (CRUD)
- Filter Semua / Aktif / Selesai dan ringkasan jumlah tugas
- Penanda tenggat otomatis (terlambat, hari ini, N hari lagi)
- Data tersimpan di `localStorage`, tetap ada setelah browser ditutup
- Daftar tugas pertama kali diisi dari JSONPlaceholder, cuaca dari Open-Meteo, kutipan dari DummyJSON
- Tampilan responsif, mendukung mode gelap

## Screenshot
![Tampilan dashboard](screenshot.png)

## Fitur ES6+ yang Diimplementasikan
| Fitur | Lokasi |
|---|---|
| `let` dan `const` | `js/main.js` baris 12-13 (`let`), `js/main.js` baris 7 dan 15 (`const`) |
| Arrow functions (lebih dari 3) | `js/modules/utils.js` baris 2, 4, 7, 10; `js/main.js` baris 7, 15, 24, 39, 48 |
| Template literals | `js/main.js` baris 18-21, 24-37, 45; `js/modules/utils.js` baris 2 |
| Async/Await | `js/modules/data.js` baris 10-28; `js/app.js` baris 15-24; `js/main.js` baris 92-93 dan 103 |
| Promises (`Promise.allSettled`) | `js/main.js` baris 93 |
| Classes (`TaskItem`, `DashboardApp`, private field `#tasks`) | `js/app.js` baris 5 dan 11 |
| Destructuring | `js/modules/data.js` baris 17, 22, 28; `js/main.js` baris 24, 44, 67, 73 |
| Spread operator | `js/app.js` baris 36 dan 41 |
| ES Modules (`import`/`export`) | semua file di folder `js/` |

## Struktur Direktori
```
project-js-nextgen/
├── index.html
├── css/style.css
└── js/
    ├── main.js            # entry point: event listener dan update DOM
    ├── app.js             # class TaskItem dan DashboardApp
    └── modules/
        ├── utils.js       # fungsi bantu
        └── data.js        # localStorage key dan fetch API
```
