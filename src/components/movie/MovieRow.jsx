import { MovieCard } from './MovieCard';

export function MovieRow({ title, items = [], emptyMessage }) {
  if (!items.length) {
    return (
      <section className="movie-row">
        <div className="section-header">
          <h2>{title}</h2>
        </div>
        <p className="empty-message">{emptyMessage || 'Nothing to show here yet.'}</p>
      </section>
    );
  }

  return (
    <section className="movie-row">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="movie-row-scroll">
        {items.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
