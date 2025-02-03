import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie } from "../_types/Movie";

interface BookmarkState {
  bookmarks: Movie[];
  addBookmark: (movie: Movie) => void;
  removeBookmark: (imdbID: string) => void;
}

// bookmark store: Handle movies that are bookmarked in localstorage

export const useBookmarksStore = create<BookmarkState>()(
  persist(
    (set) => ({
      bookmarks: [],
      addBookmark: (movie: Movie) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, movie],
        })),
      removeBookmark: (imdbID: string) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((movie) => movie.imdbID !== imdbID),
        })),
    }),
    {
      name: "bookmarks-storage",
    }
  )
);
