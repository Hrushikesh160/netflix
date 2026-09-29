import { useMemo, useState } from 'react';
import { SearchBar } from '../../components/search/SearchBar';
import { MovieGrid } from '../../components/movie/MovieGrid';
import { useDebounce } from '../../hooks/useDebounce';
import { useFetch } from '../../hooks/useFetch';
import { movieService } from '../../services/movieService';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [genre, setGenre] = useState('All');
  const debouncedQuery = useDebounce(query, 350);
  const { data, loading } = useFetch(() => movieService.searchMedia(debouncedQuery), [debouncedQuery]);

  const results = useMemo(() => {
    const movies = data?.movies || [];
    const tvShows = data?.tvShows || [];
    let combined = [...movies, ...tvShows.map((show) => ({ ...show, type: 'tv' }))];

    if (filter !== 'all') {
      combined = combined.filter((item) => item.type === filter);
    }

    if (genre !== 'All') {
      combined = combined.filter((item) => item.genres?.includes(genre));
    }

    return combined;
  }, [data, filter, genre]);

  const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Sci-Fi', 'Thriller'];

  return (
    <div className="container page-stack">
      <h1 className="page-title">Search</h1>
      <SearchBar value={query} onChange={setQuery} placeholder="Search for movies, shows, genres…" />

      <div className="filter-row">
        <div className="pill-group">
          {['all', 'movie', 'tv'].map((option) => (
            <button
              key={option}
              type="button"
              className={`pill ${filter === option ? 'active' : ''}`}
              onClick={() => setFilter(option)}
            >
              {option === 'all' ? 'All' : option === 'movie' ? 'Movies' : 'TV Shows'}
            </button>
          ))}
        </div>

        <select value={genre} onChange={(event) => setGenre(event.target.value)} className="genre-select">
          {genres.map((entry) => (
            <option key={entry} value={entry}>{entry}</option>
          ))}
        </select>
      </div>

      {loading ? <p className="loading-text">Searching…</p> : null}

      {!loading && !results.length ? (
        <div className="empty-state">
          <h3>No results found.</h3>
          <p>Try searching for another movie, show, actor, or genre.</p>
        </div>
      ) : null}

      {!loading && results.length ? <MovieGrid items={results} /> : null}
    </div>
  );
}
