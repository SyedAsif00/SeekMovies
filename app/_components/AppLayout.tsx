"use client";

import React, { useState, ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import AppDrawer from "./AppDrawer";
import LoadingWidget from "./LoadingWidget";
import AppBar from "./AppBar";
import queryClient from "../_lib/queryClient";
// import { useRouter, usePathname } from "next/navigation";
// import { isAuthenticated } from "@/app/_store/useAuthStore";

interface AppLayoutProps {
  children?: ReactNode;
}

// Basic app layout including App bar and sidebar
const AppLayout = ({ children }: AppLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  // const router = useRouter();
  // const pathname = usePathname();

  // Auth Guard: Redirect to login if not authenticated
  // useEffect(() => {
  //   const publicRoutes = ["/auth/login", "/auth/register"];
  //   if (!isAuthenticated() && !publicRoutes.includes(pathname)) {
  //     router.push("/auth/login");
  //   }
  // }, [router, pathname]);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <AppBar onClose={handleDrawerToggle} />
        <AppDrawer open={mobileOpen} onClose={handleDrawerToggle} />

        <Box
          component="main"
          sx={{
            padding: {
              xs: "0 16px",
              sm: "0 30px",
              md: "0 60px",
              lg: "0 120px",
            },
            mt: 4,
          }}
        >
          <Toolbar />
          <LoadingWidget />
          <CssBaseline />
          {children}
        </Box>
      </>
    </QueryClientProvider>
  );
};

export default AppLayout;
