"""
library.py
Berisi class Library yang menyimpan dan mengelola koleksi item perpustakaan.
"""
from library_item import LibraryItem


class Library:
    """Mengelola koleksi item perpustakaan."""

    def __init__(self, name):
        self._name = name
        self.__koleksi = []  # private: hanya diakses lewat method

    @property
    def jumlah_item(self):
        """Jumlah item dalam koleksi."""
        return len(self.__koleksi)

    def tambah_item(self, item):
        """Menambahkan item. Ditolak jika bukan LibraryItem atau ID duplikat."""
        if not isinstance(item, LibraryItem):
            print("Gagal: objek bukan LibraryItem.")
            return False
        if self.cari_berdasarkan_id(item.item_id):
            print(f"Gagal: ID '{item.item_id}' sudah terdaftar.")
            return False
        self.__koleksi.append(item)
        print(f"Item '{item.title}' ditambahkan.")
        return True

    def tampilkan_katalog(self, hanya_tersedia=False):
        """Menampilkan katalog; opsional hanya item yang tersedia."""
        judul = "ITEM TERSEDIA" if hanya_tersedia else "KATALOG LENGKAP"
        print(f"\n=== {judul} - {self._name} ===")
        data = [i for i in self.__koleksi if not (hanya_tersedia and i.is_dipinjam)]
        if not data:
            print("(kosong)")
        for item in data:
            print(item)           # __str__
            print("   ", item.get_detail())  # polymorphism

    def cari_berdasarkan_id(self, item_id):
        """Mencari item berdasarkan ID. Mengembalikan item atau None."""
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None

    def cari_berdasarkan_judul(self, kata_kunci):
        """Mencari item yang judulnya mengandung kata kunci (tanpa huruf besar/kecil)."""
        kata_kunci = kata_kunci.lower()
        return [i for i in self.__koleksi if kata_kunci in i.title.lower()]
