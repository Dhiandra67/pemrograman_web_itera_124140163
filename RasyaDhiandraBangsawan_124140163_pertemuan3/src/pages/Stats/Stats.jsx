import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { books } = useBooks();
  const s = useBookStats(books);
  const rows = [
    ['Milik', s.milik, s.percentMilik, 'milik'],
    ['Sedang dibaca', s.baca, s.percentBaca, 'baca'],
    ['Ingin dibeli', s.beli, s.percentBeli, 'beli'],
  ];
  return (
    <section className="stats">
      <h2>Statistik Koleksi</h2>
      <p>Total buku: <strong>{s.total}</strong></p>
      {rows.map(([label, n, pct, cls]) => (
        <div key={cls} className="stat-row">
          <span>{label}: {n} ({pct}%)</span>
          <div className="bar"><div className={`fill ${cls}`} style={{ width: `${pct}%` }} /></div>
        </div>
      ))}
    </section>
  );
}

export default Stats;
