import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

const EMPTY = { title: '', author: '', status: 'beli' };

// Form tambah / edit buku dengan validasi kolom wajib
function BookForm({ initialData, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialData || EMPTY);
  const [errors, setErrors] = useState({});

  // Reset form saat mode edit berganti
  useEffect(() => {
    setValues(initialData || EMPTY);
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (value.trim()) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const er = {};
    if (!values.title.trim()) er.title = 'Judul wajib diisi';
    if (!values.author.trim()) er.author = 'Penulis wajib diisi';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: values.title.trim(), author: values.author.trim(), status: values.status });
    if (!initialData) setValues(EMPTY);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{initialData ? 'Edit Buku' : 'Tambah Buku'}</h2>

      <label htmlFor="title">Judul</label>
      <input id="title" name="title" value={values.title} onChange={handleChange}
        className={errors.title ? 'invalid' : ''} placeholder="Judul buku" />
      {errors.title && <span className="error" role="alert">{errors.title}</span>}

      <label htmlFor="author">Penulis</label>
      <input id="author" name="author" value={values.author} onChange={handleChange}
        className={errors.author ? 'invalid' : ''} placeholder="Nama penulis" />
      {errors.author && <span className="error" role="alert">{errors.author}</span>}

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={values.status} onChange={handleChange}>
        <option value="milik">Milik</option>
        <option value="baca">Sedang dibaca</option>
        <option value="beli">Ingin dibeli</option>
      </select>

      <div className="actions">
        <button type="submit">{initialData ? 'Simpan Perubahan' : 'Tambah Buku'}</button>
        {onCancel && <button type="button" className="secondary" onClick={onCancel}>Batal</button>}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};
BookForm.defaultProps = { initialData: null, onCancel: null };

export default BookForm;
