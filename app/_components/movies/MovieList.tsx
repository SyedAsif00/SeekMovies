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
  const uniqueMovies = Array.from(
    new Map(movies.map((m) => [m.imdbID, m])).values()
  );

  return (
    //! this module uses the loadmore function as NEXT in the props, this library works on NEXT, HAS MORE, these things has to be provided.
    //! next is called when there is more data, which increments the page number
    //! has more is set to FALSE when the movies.length is equal to total thing, as long as the hasMore is false there will be fetching
    <InfiniteScroll
      dataLength={movies.length}
      next={loadMore}
      hasMore={hasMore}
      loader={null}
    >
      <Grid container spacing={2} sx={{ my: 5 }}>
        {uniqueMovies.map((movie) => (
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
      //! to show the details in the modal, we send the single movie id to the
      //! child component that will use a modal there to show case the data
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
