import PropTypes from 'prop-types';
import './BookFilter.css';

// Pencarian (judul/penulis) + filter berdasarkan status
function BookFilter({ status, search, onStatusChange, onSearchChange }) {
  return (
    <div className="book-filter">
      <input type="search" aria-label="Cari buku" placeholder="Cari judul atau penulis..."
        value={search} onChange={(e) => onSearchChange(e.target.value)} />
      <select aria-label="Filter status" value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="semua">Semua status</option>
        <option value="milik">Milik</option>
        <option value="baca">Sedang dibaca</option>
        <option value="beli">Ingin dibeli</option>
      </select>
    </div>
  );
}

BookFilter.propTypes = {
  status: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default BookFilter;
