import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';

// Komponen root: navigasi + definisi route multi-halaman
function App() {
  return (
    <>
      <nav className="navbar">
        <h1>📚 Buku Pribadi</h1>
        <NavLink to="/" end>Beranda</NavLink>
        <NavLink to="/stats">Statistik</NavLink>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
