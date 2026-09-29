import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { MainLayout } from './components/layout/MainLayout';
import { ToastContainer } from './components/common/Toast';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { LandingPage } from './pages/Landing/LandingPage';
import { LoginPage } from './pages/Login/LoginPage';
import { SignupPage } from './pages/Signup/SignupPage';
import { HomePage } from './pages/Home/HomePage';
import { MoviesPage } from './pages/Movies/MoviesPage';
import { TVShowsPage } from './pages/TVShows/TVShowsPage';
import { SearchPage } from './pages/Search/SearchPage';
import { MovieDetailsPage } from './pages/MovieDetails/MovieDetailsPage';
import { TVDetailsPage } from './pages/TVShows/TVDetailsPage';
import { WatchlistPage } from './pages/Watchlist/WatchlistPage';
import { PlayerPage } from './pages/Player/PlayerPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WatchlistProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/tv-shows" element={<TVShowsPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/tv/:id" element={<TVDetailsPage />} />
                <Route path="/watchlist" element={<WatchlistPage />} />
                <Route path="/player/:id" element={<PlayerPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
          <ToastContainer />
        </WatchlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
