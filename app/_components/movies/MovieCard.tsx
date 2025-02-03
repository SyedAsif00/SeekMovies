import React, { useState, MouseEvent } from "react";
import { Card, CardHeader } from "@mui/material";
import { CardMedia, Typography, Snackbar, Alert } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton from "../IconButton";
import FallbackImage from "../../_assets/fallback.png";
import { Movie } from "../../_types/Movie";
import { useBookmarksStore } from "@/app/_store/useBookmarksStore";

const MovieCard = ({
  movie,
  viewDetails,
}: {
  movie: Movie;
  viewDetails: (id: string) => void;
}) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarksStore();
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarks.some((b) => b.imdbID === movie.imdbID)
  );
  const [imageSrc, setImageSrc] = useState<string>(movie.Poster.toString());

  // State to manage both Snackbar visibility and message
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });

  const handleImageError = () => setImageSrc(FallbackImage.src);

  const handleSnackbarClose = (event: any) => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  };

  const handleBookmarkToggle = (event: MouseEvent) => {
    event.stopPropagation();
    const newIsBookmarked = !isBookmarked;
    setIsBookmarked(newIsBookmarked);

    if (newIsBookmarked) {
      addBookmark(movie);
      setSnackbarState({ open: true, message: "Added to bookmarks" });
    } else {
      removeBookmark(movie.imdbID);
      setSnackbarState({ open: true, message: "Removed from bookmarks" });
    }
  };

  return (
    <Card onClick={() => viewDetails(movie.imdbID)} className="movie-card">
      <CardMedia
        component="img"
        image={imageSrc}
        onError={handleImageError}
        className="movie-card-media"
      />
      <CardHeader
        title={
          <Typography variant="h6" component="div" className="movie-card-title">
            {movie.Title}
          </Typography>
        }
        action={
          <IconButton
            onClick={handleBookmarkToggle}
            IconComponent={isBookmarked ? BookmarkIcon : BookmarkBorderIcon}
            iconStyle={{ color: isBookmarked ? "#1C8394" : "gray" }}
          />
        }
        className="movie-card-header"
      />
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%", mt: 6 }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default React.memo(MovieCard);
