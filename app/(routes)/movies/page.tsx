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
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isFetching } = useMovies(debouncedSearchTerm, page);

  useEffect(() => {
    // remove movies when search term is empty
    if (!debouncedSearchTerm) setMovies([]);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    // trigger the next page api based on the total records and current page
    if (data?.totalResults && movies.length >= parseInt(data.totalResults))
      setHasMore(false);
  }, [movies.length, data?.totalResults]);

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
