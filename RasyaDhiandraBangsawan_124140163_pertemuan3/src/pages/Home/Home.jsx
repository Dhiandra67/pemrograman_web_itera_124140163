import { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

function Home() {
  const { filteredBooks, addBook, updateBook, deleteBook,
    statusFilter, setStatusFilter, search, setSearch } = useBooks();
  const [editing, setEditing] = useState(null);

  const handleSubmit = (data) => {
    if (editing) {
      updateBook(editing.id, data);
      setEditing(null);
    } else {
      addBook(data);
    }
  };

  return (
    <section className="home">
      <BookForm initialData={editing} onSubmit={handleSubmit} onCancel={editing ? () => setEditing(null) : null} />
      <BookFilter status={statusFilter} search={search}
        onStatusChange={setStatusFilter} onSearchChange={setSearch} />
      <BookList books={filteredBooks} onEdit={setEditing} onDelete={deleteBook} />
    </section>
  );
}

export default Home;
