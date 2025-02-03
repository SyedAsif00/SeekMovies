import { useQuery } from "@tanstack/react-query";
import MovieService from "../_services/movieService";
import useMovieStore from "../_store/useMovieStore";
import { MovieDataResponse, MovieDetailResponse } from "../_types/Movie";
//! default which is empty
const defaultMovieResponse = {
  Search: [],
  totalResults: "",
  Response: "",
  Error: "",
};

// return all movies based on search term, can accept page number and returns total records
//! here we will take the zustand movie state and update it with in this component with an api call,
// ! though api is not called here just the logic is made that when a certain endpoint is reached and
//!  when the data is received update the movie state with all the fetched movies based on the debounced searchterm
export const useMovies = (title: string, page: number = 1) => {
  const { movies, setMovies, setError } = useMovieStore();

  return useQuery<MovieDataResponse, Error>({
    //! react query unique query key, this key is used to identify each request and cached material agaist this api key.
    queryKey: ["movies", title, page],
    //! the quuery fn is called to excute a code for a particular end point and update the state as accordingly.
    queryFn: async () => {
      console.log("🔍 Fetching movies for:", { title, page });

      if (!title) {
        console.log("❌ No title provided. Returning default response.");
        return defaultMovieResponse;
      }

      try {
        //! get movies object uses the /movies endpoint and provide the title and the page, based on which the movies will be fetched.
        const response = await MovieService.getMovies(title, page);
        console.log("✅ API Response:", response); // Debug API response

        if (!response?.Search) {
          console.error("❌ API Error:", response?.Error || "No movies found.");
          throw new Error(response?.Error || "No movies found.");
        }

        console.log("📌 Previous movies state:", movies);
        //! in the first loop respone.search recives the data, the state is upadatd here, the movies in the first cycle is empty,
        //! the ...res.search updates it with the movies that it returns which automatically becomes the value of the setter,
        //! we are doing this cuz the resp.search will fetch new data as per the scroll, since the scroll event is used here.
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
