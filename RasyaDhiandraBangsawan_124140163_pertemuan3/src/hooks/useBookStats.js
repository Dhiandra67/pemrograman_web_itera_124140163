import { useMemo } from 'react';

/**
 * Custom hook: menghitung statistik koleksi buku.
 * @param {Array} books daftar buku
 */
export default function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const milik = books.filter((b) => b.status === 'milik').length;
    const baca = books.filter((b) => b.status === 'baca').length;
    const beli = books.filter((b) => b.status === 'beli').length;
    const percent = (n) => (total === 0 ? 0 : Math.round((n / total) * 100));
    return {
      total, milik, baca, beli,
      percentMilik: percent(milik),
      percentBaca: percent(baca),
      percentBeli: percent(beli),
    };
  }, [books]);
}
