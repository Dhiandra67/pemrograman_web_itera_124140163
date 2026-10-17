import { useEffect, useState } from 'react';

/**
 * Custom hook: state yang otomatis tersinkron dengan localStorage.
 * @param {string} key kunci penyimpanan
 * @param {*} initialValue nilai awal jika belum ada data
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue; // data rusak -> pakai nilai awal
    }
  });

  // Simpan ulang setiap kali value berubah
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Gagal menyimpan ke localStorage', err);
    }
  }, [key, value]);

  return [value, setValue];
}
