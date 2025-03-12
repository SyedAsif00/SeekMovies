"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Container } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MovieList from "@/app/_components/movies/MovieList";
import AppRoutes from "@/app/_lib/AppRoutes";
import Button from "@/app/_components/Button";
import { useBookmarksStore } from "@/app/_store/useBookmarksStore";

const Bookmark = () => {
  const router = useRouter();
  const { bookmarks } = useBookmarksStore();
  const handleNavigate = () => router.push(AppRoutes.Movies);

  if (!bookmarks.length)
    return (
      <Container sx={{ textAlign: "center", my: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <BookmarkIcon sx={{ fontSize: 80, color: "white", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {"Your bookmarks list is empty!"}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {
              " It looks like you haven't added any movies to your bookmarks yet Browse now and start adding your favorite movies!"
            }
          </Typography>
          <Button onClick={handleNavigate} label="Browse Movies" />
        </Box>
      </Container>
    );

  return (
    <React.Fragment>
      <MovieList
        movies={bookmarks}
        isFetching={false}
        loadMore={() => {}}
        hasMore={false}
      />
    </React.Fragment>
  );
};

export default Bookmark;
