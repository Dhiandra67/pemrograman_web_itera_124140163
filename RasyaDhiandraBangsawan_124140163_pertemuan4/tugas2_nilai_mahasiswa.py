"""Program pengelolaan data nilai mahasiswa."""

mahasiswa = [
    {"nama": "Rasya Dhiandra", "nim": "124140101",
     "nilai_uts": 78, "nilai_uas": 85, "nilai_tugas": 90},
    {"nama": "Erhan Kurniawan", "nim": "124140102",
     "nilai_uts": 65, "nilai_uas": 72, "nilai_tugas": 80},
    {"nama": "Abdul Aziz", "nim": "124140103",
     "nilai_uts": 92, "nilai_uas": 88, "nilai_tugas": 95},
    {"nama": "Dewi Anggraini", "nim": "124140104",
     "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 58},
    {"nama": "Eko Saputra", "nim": "124140105",
     "nilai_uts": 45, "nilai_uas": 50, "nilai_tugas": 48},
]


def tentukan_grade(nilai_akhir):
    """Menentukan grade huruf berdasarkan nilai akhir.
    Args:
        nilai_akhir (float): Nilai akhir mahasiswa (rentang 0-100).
    Returns:
        str: Grade "A" (>= 80), "B" (70-79), "C" (60-69), "D" (50-59),
            atau "E" (< 50).
    """
    if nilai_akhir >= 80:
        return "A"
    if nilai_akhir >= 70:
        return "B"
    if nilai_akhir >= 60:
        return "C"
    if nilai_akhir >= 50:
        return "D"
    return "E"


# Hitung nilai akhir dan grade setiap mahasiswa
for data in mahasiswa:
    data["nilai_akhir"] = (
        0.30 * data["nilai_uts"]
        + 0.40 * data["nilai_uas"]
        + 0.30 * data["nilai_tugas"]
    )
    data["grade"] = tentukan_grade(data["nilai_akhir"])

# Tentukan lebar kolom tabel sesuai data terpanjang
lebar_nama = max(len("Nama"), *(len(data["nama"]) for data in mahasiswa))
lebar_nim = max(len("NIM"), *(len(data["nim"]) for data in mahasiswa))
garis = (
    f"+{'-' * (lebar_nama + 2)}+{'-' * (lebar_nim + 2)}+"
    f"{'-' * 14}+{'-' * 7}+"
)

# Tampilkan tabel
print("\nDAFTAR NILAI MAHASISWA")
print(garis)
print(
    f"| {'Nama':<{lebar_nama}} | {'NIM':<{lebar_nim}} | "
    f"{'Nilai Akhir':>11} | {'Grade':^5} |"
)
print(garis)
for data in mahasiswa:
    print(
        f"| {data['nama']:<{lebar_nama}} | {data['nim']:<{lebar_nim}} | "
        f"{data['nilai_akhir']:>11.2f} | {data['grade']:^5} |"
    )
print(garis)

# Cari nilai tertinggi dan terendah
tertinggi = max(mahasiswa, key=lambda data: data["nilai_akhir"])
terendah = min(mahasiswa, key=lambda data: data["nilai_akhir"])

print(
    f"\nNilai tertinggi: {tertinggi['nama']} (NIM {tertinggi['nim']}), "
    f"nilai {tertinggi['nilai_akhir']:.2f}, grade {tertinggi['grade']}"
)
print(
    f"Nilai terendah: {terendah['nama']} (NIM {terendah['nim']}), "
    f"nilai {terendah['nilai_akhir']:.2f}, grade {terendah['grade']}"
)