import axios from "../_lib/axios";
import { MovieDataResponse, MovieDetailResponse } from "../_types/Movie";

// get all movies and get movie details against a movie id
//! movie service object uses the axios interceptos to call for the api and return the data
const MovieService = {
  getMovies: async (
    title: string,
    page: number
  ): Promise<MovieDataResponse> => {
    try {
      const { data } = await axios.get("/", {
        params: {
          s: title,
          type: "movie",
          page,
        },
      });

      return data;
    } catch (e) {
      throw e;
    }
  },
  getMovieDetails: async (movieId: string): Promise<MovieDetailResponse> => {
    try {
      const { data } = await axios.get("/", {
        params: {
          i: movieId,
        },
      });

      return data;
    } catch (e) {
      throw e;
    }
  },
};

export default MovieService;
