"use client";
import React, { useEffect, ChangeEvent } from "react";
import { Alert, Box, Paper, Typography } from "@mui/material";
import { useMovies } from "@/app/_hooks/useMovies";
import TextInput from "@/app/_components/Input";
import useDebounce from "@/app/_hooks/useDebounce";
import MovieList from "@/app/_components/movies/MovieList";
import useMovieStore from "@/app/_store/useMovieStore";
import Button from "@/app/_components/Button";
import Loader from "@/app/_components/Loader";

const Movies = () => {
  // states are coming from zustand in the store
  const {
    movies,
    searchTerm,
    page,
    hasMore,
    error,
    setMovies,
    setPage,
    setHasMore,
    setSearchTerm,
    setError,
  } = useMovieStore();
  //! the search term is is used as debounced with a delay of a half sec.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  //! the react query will return the data which is destructured here and the debouhcned search term is provided as the paramter to the useMovies that calls the getMovies
  const { data, isFetching } = useMovies(debouncedSearchTerm, page);

  useEffect(() => {
    // remove movies when search term is empty
    if (!debouncedSearchTerm) setMovies([]);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    //! trigger the next page api based on the total records and current page
    //! the api resposne will proide us with a total number of movies.
    //! if the movies.length will represent how much movies are fetched, if it is less than the totalresults, the useffect will run and the state will be updated based on that new movies will be fetched
    if (data?.totalResults && movies.length >= parseInt(data.totalResults))
      setHasMore(false);
  }, [movies.length, data?.totalResults]);
  //! when the user types something it stores in the state as a search term, this search term value is passed to another debounce function that put a delay on the setter, this is debouncing
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // clear states on search
    setMovies([]);
    setError(undefined);
    setPage(1);
    setHasMore(true);
    setSearchTerm(e.target.value);
  };
  const loadMoreMovies = () => setPage(page + 1);

  return (
    <Box
      className={
        movies.length === 0 ? "centeredContainer" : "shrinkedContainer"
      }
    >
      <Typography
        variant="h6"
        gutterBottom
        className={movies.length === 0 ? "boldLabel" : ""}
      >
        What are you looking for?
      </Typography>
      <Paper className="movieSearchForm">
        <TextInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Title"
          className="movieSearchInput"
        />
        <Button
          //! isfetching is coming from the react query, which shows either the promise is resolved or not. if pending it is set to false, vice verca
          startIcon={
            isFetching ? <Loader sx={{ color: "white" }} size={20} /> : null
          }
          label={isFetching ? "Searching" : "Search"}
          sx={{
            height: "100%",
            minWidth: { xs: "100px", sm: "130px" },
            borderRadius: 0,
          }}
        />
      </Paper>
      {movies.length > 0 && (
        //! this compoennet will the infinte scroll to cause for the other movies from the api
        <MovieList
          movies={movies}
          isFetching={isFetching}
          loadMore={loadMoreMovies}
          hasMore={hasMore}
        />
      )}
      {error && (
        <Alert severity="error" sx={{ my: 5, fontSize: 16 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default Movies;
