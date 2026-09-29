import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from '../navbar/Navbar';

export function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
