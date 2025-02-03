import { useQuery } from "@tanstack/react-query";
import MovieService from "../_services/movieService";
import useMovieStore from "../_store/useMovieStore";
import { MovieDataResponse, MovieDetailResponse } from "../_types/Movie";

const defaultMovieResponse = {
  Search: [],
  totalResults: "",
  Response: "",
  Error: "",
};

// return all movies based on search term, can accept page number and returns total records
export const useMovies = (title: string, page: number = 1) => {
  const { movies, setMovies, setError } = useMovieStore();

  return useQuery<MovieDataResponse, Error>({
    queryKey: ["movies", title, page],
    queryFn: async () => {
      console.log("🔍 Fetching movies for:", { title, page });

      if (!title) {
        console.log("❌ No title provided. Returning default response.");
        return defaultMovieResponse;
      }

      try {
        const response = await MovieService.getMovies(title, page);
        console.log("✅ API Response:", response); // Debug API response

        if (!response?.Search) {
          console.error("❌ API Error:", response?.Error || "No movies found.");
          throw new Error(response?.Error || "No movies found.");
        }

        console.log("📌 Previous movies state:", movies);
        setMovies([...movies, ...response.Search]); // Merge movies
        console.log("📌 Updated movies state:", [
          ...movies,
          ...response.Search,
        ]);

        setError(undefined);
        return response;
      } catch (error: any) {
        console.error("❌ Caught API Error:", error);
        setError(error.message || "An unknown error occurred");
        throw error;
      }
    },
    enabled: !!title,
    staleTime: 0,
    placeholderData: defaultMovieResponse,
  });
};

// return data for a single movie against movie id
export const useMovie = (movieId: string) => {
  const { cachedMovies, setCachedMovie } = useMovieStore();

  return useQuery<MovieDetailResponse, Error>({
    queryKey: ["movie", movieId],
    queryFn: async () => {
      const cachedData = cachedMovies[movieId];
      if (cachedData) {
        return cachedData;
      }
      const data = await MovieService.getMovieDetails(movieId);
      setCachedMovie(movieId, data);
      return data;
    },
    enabled: !!movieId,
    staleTime: Infinity,
  });
};
