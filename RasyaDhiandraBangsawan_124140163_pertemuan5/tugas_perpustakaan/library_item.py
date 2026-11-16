"""
library_item.py
Berisi abstract class LibraryItem beserta subclass Book dan Magazine.
"""
from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract class: dasar untuk semua item di perpustakaan.
    Tidak dapat diinstansiasi langsung; subclass wajib mengimplementasikan
    method abstract hitung_denda() dan get_detail().
    """

    def __init__(self, item_id, title, year):
        self._item_id = item_id        # protected: hanya untuk class & turunannya
        self._title = title            # protected
        self._year = year              # protected
        self.__is_dipinjam = False     # private: status dikelola lewat method

    # ---------- Property (encapsulation) ----------
    @property
    def item_id(self):
        """ID item (read-only)."""
        return self._item_id

    @property
    def title(self):
        """Judul item (read-only)."""
        return self._title

    @property
    def year(self):
        """Tahun terbit (read-only)."""
        return self._year

    @property
    def is_dipinjam(self):
        """Status peminjaman: True jika sedang dipinjam (read-only)."""
        return self.__is_dipinjam

    # ---------- Method untuk mengubah status (satu-satunya jalur) ----------
    def pinjam(self):
        """Meminjam item. Mengembalikan True jika berhasil."""
        if self.__is_dipinjam:
            return False
        self.__is_dipinjam = True
        return True

    def kembalikan(self):
        """Mengembalikan item. Mengembalikan True jika berhasil."""
        if not self.__is_dipinjam:
            return False
        self.__is_dipinjam = False
        return True

    # ---------- Abstract methods ----------
    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Menghitung denda keterlambatan (rupiah). Wajib di-override."""

    @abstractmethod
    def get_detail(self):
        """Mengembalikan string detail item. Wajib di-override."""

    def __str__(self):
        status = "Dipinjam" if self.__is_dipinjam else "Tersedia"
        return f"[{self._item_id}] {self._title} ({self._year}) - {status}"


class Book(LibraryItem):
    """Buku. Denda Rp1.000 per hari keterlambatan."""

    DENDA_PER_HARI = 1000

    def __init__(self, item_id, title, year, author, pages):
        super().__init__(item_id, title, year)
        self._author = author
        self._pages = pages

    @property
    def author(self):
        """Penulis buku."""
        return self._author

    def hitung_denda(self, hari_terlambat):
        """Denda buku = hari terlambat x Rp1.000."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI

    def get_detail(self):
        """Detail khusus buku."""
        return (f"Buku     | {self._title} oleh {self._author} "
                f"({self._year}), {self._pages} halaman")


class Magazine(LibraryItem):
    """Majalah. Denda Rp500 per hari keterlambatan."""

    DENDA_PER_HARI = 500

    def __init__(self, item_id, title, year, edition, publisher):
        super().__init__(item_id, title, year)
        self._edition = edition
        self._publisher = publisher

    @property
    def edition(self):
        """Edisi majalah."""
        return self._edition

    def hitung_denda(self, hari_terlambat):
        """Denda majalah = hari terlambat x Rp500."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI

    def get_detail(self):
        """Detail khusus majalah."""
        return (f"Majalah  | {self._title} edisi {self._edition} "
                f"({self._year}), penerbit {self._publisher}")
