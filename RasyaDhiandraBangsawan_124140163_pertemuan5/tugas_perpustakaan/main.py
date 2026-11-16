"""
main.py
Skrip untuk menguji seluruh fungsionalitas sistem perpustakaan.
"""
from library_item import Book, Magazine, LibraryItem
from library import Library
from member import Member


def tampilkan_hasil(label, hasil):
    """Mencetak hasil pencarian."""
    print(f"\n{label}")
    if not hasil:
        print("  Tidak ditemukan.")
    for item in hasil:
        print("  ", item)


def main():
    perpus = Library("Perpustakaan ITERA")

    print(">>> 1. Menambahkan item")
    perpus.tambah_item(Book("B001", "Pemrograman Python", 2021, "Budi Santoso", 320))
    perpus.tambah_item(Book("B002", "Struktur Data", 2019, "Siti Aminah", 450))
    perpus.tambah_item(Magazine("M001", "Tech Today", 2026, "Nov-2026", "Media Teknologi"))
    perpus.tambah_item(Magazine("M002", "Sains Populer", 2025, "Mar-2025", "Ilmu Press"))
    perpus.tambah_item(Book("B001", "Duplikat ID", 2020, "X", 10))  # ditolak

    print("\n>>> 2. Menampilkan katalog")
    perpus.tampilkan_katalog()

    print("\n>>> 3. Mencari item")
    tampilkan_hasil("Cari judul 'python':", perpus.cari_berdasarkan_judul("python"))
    item = perpus.cari_berdasarkan_id("M001")
    tampilkan_hasil("Cari ID 'M001':", [item] if item else [])
    tampilkan_hasil("Cari ID 'X999':", [])

    print("\n>>> 4. Status ketersediaan (peminjaman)")
    ani = Member("A01", "Ani")
    print(ani.pinjam_item(perpus.cari_berdasarkan_id("B001")))
    print(ani.pinjam_item(perpus.cari_berdasarkan_id("M001")))
    print(Member("A02", "Budi").pinjam_item(perpus.cari_berdasarkan_id("B001")))
    perpus.tampilkan_katalog()
    perpus.tampilkan_katalog(hanya_tersedia=True)

    print("\n>>> 5. Pengembalian & polymorphism denda (terlambat 5 hari)")
    print(ani.kembalikan_item(perpus.cari_berdasarkan_id("B001"), 5))
    print(ani.kembalikan_item(perpus.cari_berdasarkan_id("M001"), 5))

    print("\n>>> 6. Bukti encapsulation & abstract class")
    buku = perpus.cari_berdasarkan_id("B002")
    try:
        buku.is_dipinjam = True      # property tanpa setter
    except AttributeError as e:
        print("Ubah is_dipinjam langsung ditolak:", e)
    try:
        LibraryItem("X", "Abstrak", 2026)
    except TypeError as e:
        print("LibraryItem tidak bisa diinstansiasi:", e)

    perpus.tampilkan_katalog(hanya_tersedia=True)


if __name__ == "__main__":
    main()
