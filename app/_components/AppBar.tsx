import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppBar as MuiAppBar, Box, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AppRoutes from "../_lib/AppRoutes";
import Button from "./Button";
import IconButton from "./IconButton";
import { useBookmarksStore } from "../_store/useBookmarksStore";
import Badge from "@mui/material/Badge";

interface AppDrawerProps {
  onClose: () => void;
}

const AppBar = ({ onClose }: AppDrawerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { bookmarks } = useBookmarksStore();

  const handleNavigate = (path: string) => router.push(path);

  return (
    <MuiAppBar component="nav" sx={{ backgroundColor: "#1C8394" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClose}
          sx={{ mr: 2, display: { sm: "none" } }}
          IconComponent={MenuIcon}
        />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          SeekMovie
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {Object.keys(AppRoutes).map((item: string, index: number) => (
            <Badge
              key={index}
              invisible={index == 0}
              badgeContent={bookmarks.length}
              color="success"
              showZero
            >
              <Button
                variant="text"
                size="large"
                sx={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: pathname === AppRoutes[item] ? "700" : "400",
                  transition: "background 0.3s ease, color 0.3s ease",
                  borderBottom:
                    pathname === AppRoutes[item] ? "1px solid #1C8394" : "",
                  "&:hover": { color: "#FFFFFF" },
                }}
                label={item}
                key={index}
                onClick={() => handleNavigate(AppRoutes[item])}
              />
            </Badge>
          ))}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
