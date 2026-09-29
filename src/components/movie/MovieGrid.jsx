import { MovieCard } from './MovieCard';

export function MovieGrid({ items = [], title }) {
  return (
    <section className="movie-grid-section">
      {title ? <h2>{title}</h2> : null}
      <div className="movie-grid">
        {items.map((item) => (
          <MovieCard key={`${item.type || 'movie'}-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );
}
