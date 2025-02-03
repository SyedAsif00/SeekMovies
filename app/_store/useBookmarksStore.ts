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
  //! here it uses the persist method to use the local storgae to store the bookmarked in the LS,
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
