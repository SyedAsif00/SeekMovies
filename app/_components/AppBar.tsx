"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname, useRouter } from "next/navigation";
import AppRoutes from "../_lib/AppRoutes";
import { Badge } from "@mui/material";
export default function ButtonAppBar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            SeekMovie
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {Object.keys(AppRoutes).map((item: string, index: number) => (
              <Badge
                invisible={index == 0}
                // badgeContent={bookmarks.length}
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
                  key={index}
                  onClick={() => handleNavigate(AppRoutes[item])}
                >
                  {item}
                </Button>
              </Badge>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
