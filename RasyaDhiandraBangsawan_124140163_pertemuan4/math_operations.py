"""Fungsi matematika untuk geometri dan konversi temperatur."""

PI = 3.14159


def luas_persegi(side):
	"""Mengembalikan luas persegi."""
	return side ** 2


def keliling_persegi(side):
	"""Mengembalikan keliling persegi."""
	return 4 * side


def luas_persegi_panjang(length, width):
	"""Mengembalikan luas persegi panjang."""
	return length * width


def keliling_persegi_panjang(length, width):
	"""Mengembalikan keliling persegi panjang."""
	return 2 * (length + width)


def luas_lingkaran(radius):
	"""Mengembalikan luas lingkaran."""
	return PI * radius ** 2


def keliling_lingkaran(radius):
	"""Mengembalikan keliling lingkaran."""
	return 2 * PI * radius


def celsius_ke_fahrenheit(celsius):
	"""Mengubah suhu dari Celsius ke Fahrenheit."""
	return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius):
	"""Mengubah suhu dari Celsius ke Kelvin."""
	return celsius + 273.15
