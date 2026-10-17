import PropTypes from 'prop-types';
import './BookList.css';

const STATUS_LABEL = { milik: 'Milik', baca: 'Sedang dibaca', beli: 'Ingin dibeli' };

// Menampilkan daftar buku beserta tombol edit & hapus
function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">Belum ada buku yang cocok. Tambahkan buku lewat form di atas.</p>;
  }
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-item">
          <div>
            <strong>{book.title}</strong>
            <div className="author">{book.author}</div>
            <span className={`badge ${book.status}`}>{STATUS_LABEL[book.status]}</span>
          </div>
          <div className="item-actions">
            <button type="button" className="secondary" onClick={() => onEdit(book)}>Edit</button>
            <button type="button" className="danger" onClick={() => onDelete(book.id)}>Hapus</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
