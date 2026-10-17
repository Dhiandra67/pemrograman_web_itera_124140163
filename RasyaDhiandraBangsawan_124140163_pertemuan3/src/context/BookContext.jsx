import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);
  const [statusFilter, setStatusFilter] = useState('semua');
  const [search, setSearch] = useState('');

  const addBook = (book) =>
    setBooks((prev) => [...prev, { ...book, id: String(Date.now()) + Math.random().toString(16).slice(2) }]);

  const updateBook = (id, data) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));

  const deleteBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));

  // Filter status + pencarian judul/penulis
  const filteredBooks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return books.filter((b) => {
      const okStatus = statusFilter === 'semua' || b.status === statusFilter;
      const okSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      return okStatus && okSearch;
    });
  }, [books, statusFilter, search]);

  const value = {
    books, filteredBooks, addBook, updateBook, deleteBook,
    statusFilter, setStatusFilter, search, setSearch,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = { children: PropTypes.node.isRequired };

// eslint-disable-next-line react-refresh/only-export-components
export function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error('useBooks harus dipakai di dalam BookProvider');
  return ctx;
}
