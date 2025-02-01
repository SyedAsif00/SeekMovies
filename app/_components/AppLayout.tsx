"use client";
import React, { ReactNode, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import AppBar from "./AppBar";
import AppDrawer from "./AppDrawer";
interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  // semnatically meaningful html with either main or section. mui is powerful as it considers SEO.
  return (
    <React.Fragment>
      <AppBar onClose={handleDrawerToggle} />
      <AppDrawer open={mobileOpen} onClose={handleDrawerToggle} />

      <Box
        sx={{
          padding: { xs: "0 16px", sm: "0 30px", md: "0 60px", lg: "0 120px" },
          mt: 4,
        }}
        component="main"
      >
        <CssBaseline />
        {children}
      </Box>
    </React.Fragment>
  );
};

export default AppLayout;
