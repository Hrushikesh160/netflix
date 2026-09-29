export const formatRating = (rating) => `${Number(rating || 0).toFixed(1)} ★`;

export const formatGenreList = (genres = []) => genres.join(' • ');

export const buildMovieDetailPath = (id) => `/movie/${id}`;

export const buildTVDetailPath = (id) => `/tv/${id}`;

export const buildPlayerPath = (id) => `/player/${id}`;
