import React, { useState } from "react";
import { Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCardSkeletonLoader from "./MovieCardSkeletonLoad";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import { Movie } from "@/app/_types/Movie";

interface MovieListProps {
  movies: Movie[];
  isFetching: boolean;
  loadMore: () => void;
  hasMore: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
  movies = [],
  isFetching,
  loadMore,
  hasMore,
}) => {
  // state to store the movie id to view details
  const [viewMovieDetails, setViewMovieDetail] = useState<string | null>(null);

  if (!movies.length) return null;

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={loadMore}
      hasMore={hasMore}
      loader={null}
    >
      <Grid container spacing={2} sx={{ my: 5 }}>
        {movies.map((movie) => (
          <Grid item xs={6} md={4} lg={3} xl={2} key={movie.imdbID}>
            <MovieCard
              movie={movie}
              viewDetails={(id: string) => setViewMovieDetail(id)}
            />
          </Grid>
        ))}

        {isFetching && (
          <Grid item xs={12} md={4} lg={3} xl={2}>
            <MovieCardSkeletonLoader />
          </Grid>
        )}
      </Grid>
      {/* Alert Modal to view details of a movie  */}
      {viewMovieDetails && (
        <MovieDetails
          movieId={viewMovieDetails}
          clearMovieId={() => setViewMovieDetail(null)}
        />
      )}
    </InfiniteScroll>
  );
};

export default MovieList;
