import { create } from "zustand";
import { Movie } from "../_types/Movie";

interface MovieStore {
  cachedMovies: Record<string, Movie>;
  setCachedMovie: (imdbID: string, data: Movie) => void;

  movies: Movie[];
  setMovies: (movies: Movie[]) => void;

  error: string | undefined;
  setError: (error: string | undefined) => void;

  searchTerm: string;
  setSearchTerm: (term: string) => void;

  page: number;
  setPage: (page: number) => void;

  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
}

// handle states for movies
const useMovieStore = create<MovieStore>((set) => ({
  // while viewing movie details, if api is called for a single movie that record is cached againt its id, so the next time api wont be called.
  cachedMovies: {},
  setCachedMovie: (imdbID, data) =>
    set((state) => ({
      cachedMovies: { ...state.cachedMovies, [imdbID]: data },
    })),

  movies: [],
  setMovies: (movies) => set({ movies }),

  error: undefined,
  setError: (error) => set(() => ({ error })),

  searchTerm: "",
  setSearchTerm: (term) => set(() => ({ searchTerm: term })),

  page: 1,
  setPage: (page) => set(() => ({ page })),

  hasMore: true,
  setHasMore: (hasMore) => set(() => ({ hasMore })),
}));

export default useMovieStore;
