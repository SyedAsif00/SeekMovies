"use client";
import React, { ChangeEvent } from "react";
import TextInput from "@/app/_components/Input";
import { Alert, Box, Paper, Typography } from "@mui/material";
import Button from "@/app/_components/Button";

import useMovieStore from "@/app/_store/useMovieStore";
const page = () => {
  const {
    movies,
    searchTerm,
    setSearchTerm,
    page,
    hasMore,
    error,
    setMovies,
    setPage,
    setHasMore,
    setError,
  } = useMovieStore();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setMovies([]);
    setError(undefined);
    setPage(1);
    setHasMore(true);
    setSearchTerm(e.target.value);
  };
  return (
    <Box className="shrinkedContainer">
      <Typography variant="h6" gutterBottom>
        what are you looking for{" "}
      </Typography>
      <Paper className="movieSeacrhForm">
        <TextInput
          className="movieSearchInput"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          label="search"
          sx={{
            height: "100%",
            minWidth: { xs: "100px", sm: "130px" },
            borderRadius: 0,
          }}
        />
      </Paper>
    </Box>
  );
};

export default page;
