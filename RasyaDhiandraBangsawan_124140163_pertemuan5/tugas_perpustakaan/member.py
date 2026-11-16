"""
member.py
Berisi class Member: anggota perpustakaan yang dapat meminjam item.
"""


class Member:
    """Anggota perpustakaan dengan batas maksimal peminjaman."""

    MAX_PINJAM = 3

    def __init__(self, member_id, name):
        self._member_id = member_id
        self._name = name
        self.__dipinjam = []  # private: daftar item yang sedang dipinjam

    @property
    def member_id(self):
        """ID anggota (read-only)."""
        return self._member_id

    @property
    def name(self):
        """Nama anggota (read-only)."""
        return self._name

    @property
    def jumlah_pinjaman(self):
        """Jumlah item yang sedang dipinjam."""
        return len(self.__dipinjam)

    def pinjam_item(self, item):
        """Meminjam item. Mengembalikan pesan hasil."""
        if len(self.__dipinjam) >= self.MAX_PINJAM:
            return f"{self._name} sudah mencapai batas {self.MAX_PINJAM} pinjaman."
        if not item.pinjam():
            return f"'{item.title}' sedang dipinjam orang lain."
        self.__dipinjam.append(item)
        return f"{self._name} berhasil meminjam '{item.title}'."

    def kembalikan_item(self, item, hari_terlambat=0):
        """Mengembalikan item dan menghitung denda (polymorphism)."""
        if item not in self.__dipinjam:
            return f"{self._name} tidak meminjam '{item.title}'."
        item.kembalikan()
        self.__dipinjam.remove(item)
        denda = item.hitung_denda(hari_terlambat)
        pesan = f"{self._name} mengembalikan '{item.title}'."
        if denda:
            pesan += f" Denda: Rp{denda:,}".replace(",", ".")
        return pesan

    def __str__(self):
        return f"Member {self._member_id}: {self._name} ({self.jumlah_pinjaman} pinjaman)"
