"""Program utama untuk menguji seluruh fungsi pada math_operations."""

import inspect
import math_operations
from math_operations import *  # noqa: F403

# Nilai uji berdasarkan jumlah parameter fungsi
TEST_VALUES = {
    0: [()],
    1: [(12,), (5,), (0.25,)],
    2: [(12, 4), (7, 2), (9, 3)],
    3: [(12, 4, 2), (7, 2, 3), (9, 3, 1)],
}


def main():
    """Menguji semua fungsi di math_operations dan mencetak hasilnya.

    Fungsi dicari secara otomatis, jumlah parameternya dihitung, lalu
    dipanggil dengan nilai uji dari TEST_VALUES.

    Returns:
        None: Fungsi hanya menampilkan hasil ke konsol.
    """
    print("=" * 50)
    print("     PENGUJIAN FUNGSI MATH_OPERATIONS")
    print("=" * 50)

    # Ambil semua fungsi yang didefinisikan di math_operations
    functions = [
        name for name, obj in vars(math_operations).items()
        if inspect.isfunction(obj)
        and obj.__module__ == math_operations.__name__
    ]

    if not functions:
        print("Tidak ada fungsi yang ditemukan pada math_operations.")
        return

    for name in functions:
        # Gunakan fungsi hasil "from ... import *" jika tersedia
        function = globals().get(name, getattr(math_operations, name))
        arity = len(inspect.signature(function).parameters)

        print(f"\nFungsi: {name}")
        for values in TEST_VALUES.get(arity, TEST_VALUES[3]):
            try:
                print(f"  Input {values} -> {function(*values)}")
            except Exception as error:
                print(f"  Input {values} -> Gagal: {error}")

    print("\n" + "=" * 50)


if __name__ == "__main__":
    main()