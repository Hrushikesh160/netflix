import { movies } from '../data/movies';
import { tvShows } from '../data/tvShows';
import { simulateRequest } from './api';

export const movieService = {
  async getMovies() {
    return simulateRequest(() => [...movies]);
  },

  async getMovieById(id) {
    return simulateRequest(() => movies.find((movie) => movie.id === Number(id)) || null);
  },

  async getTVShows() {
    return simulateRequest(() => [...tvShows]);
  },

  async getTVShowById(id) {
    return simulateRequest(() => tvShows.find((show) => show.id === Number(id)) || null);
  },

  async searchMedia(query = '') {
    return simulateRequest(() => {
      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        return { movies: [...movies], tvShows: [...tvShows] };
      }

      return {
        movies: movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(normalized) ||
            movie.description.toLowerCase().includes(normalized) ||
            movie.genres.some((genre) => genre.toLowerCase().includes(normalized)),
        ),
        tvShows: tvShows.filter(
          (show) =>
            show.title.toLowerCase().includes(normalized) ||
            show.description.toLowerCase().includes(normalized) ||
            show.genres.some((genre) => genre.toLowerCase().includes(normalized)),
        ),
      };
    });
  },

  async getTrending() {
    return simulateRequest(() => [...movies].sort((a, b) => b.rating - a.rating).slice(0, 8));
  },

  async getTopRated() {
    return simulateRequest(() => [...movies].sort((a, b) => b.rating - a.rating));
  },
};
