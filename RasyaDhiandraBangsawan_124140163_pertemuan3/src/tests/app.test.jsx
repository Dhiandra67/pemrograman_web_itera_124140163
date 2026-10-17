import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import useLocalStorage from '../hooks/useLocalStorage';
import useBookStats from '../hooks/useBookStats';
import BookForm from '../components/BookForm/BookForm';
import BookList from '../components/BookList/BookList';
import BookFilter from '../components/BookFilter/BookFilter';

const books = [
  { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: '2', title: 'Bumi', author: 'Tere Liye', status: 'baca' },
  { id: '3', title: 'Dilan', author: 'Pidi Baiq', status: 'beli' },
];

describe('useLocalStorage', () => {
  it('menyimpan nilai ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('k', []));
    act(() => result.current[1](['a']));
    expect(JSON.parse(localStorage.getItem('k'))).toEqual(['a']);
  });
});

describe('useBookStats', () => {
  it('menghitung total & jumlah per status', () => {
    const { result } = renderHook(() => useBookStats(books));
    expect(result.current).toMatchObject({ total: 3, milik: 1, baca: 1, beli: 1, percentMilik: 33 });
  });
});

describe('BookForm', () => {
  it('menampilkan error saat kolom kosong & tidak submit', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));
    expect(screen.getByText('Judul wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Penulis wajib diisi')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('memanggil onSubmit dengan data valid', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Bumi' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Tere Liye' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));
    expect(onSubmit).toHaveBeenCalledWith({ title: 'Bumi', author: 'Tere Liye', status: 'beli' });
  });
});

describe('BookList', () => {
  it('menampilkan semua buku', () => {
    render(<BookList books={books} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('memanggil onDelete dengan id buku', () => {
    const onDelete = vi.fn();
    render(<BookList books={books} onEdit={() => {}} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByText('Hapus')[1]);
    expect(onDelete).toHaveBeenCalledWith('2');
  });

  it('menampilkan pesan kosong bila tidak ada buku', () => {
    render(<BookList books={[]} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/Belum ada buku/)).toBeInTheDocument();
  });
});

describe('BookFilter', () => {
  it('memanggil callback saat mencari & mengganti status', () => {
    const onSearch = vi.fn();
    const onStatus = vi.fn();
    render(<BookFilter status="semua" search="" onSearchChange={onSearch} onStatusChange={onStatus} />);
    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'bumi' } });
    fireEvent.change(screen.getByLabelText('Filter status'), { target: { value: 'baca' } });
    expect(onSearch).toHaveBeenCalledWith('bumi');
    expect(onStatus).toHaveBeenCalledWith('baca');
  });
});
