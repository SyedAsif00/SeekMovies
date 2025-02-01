import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import AppBar from "./AppBar";

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  // semnatically meaningful html with either main or section. mui is powerful as it considers SEO.
  return (
    <React.Fragment>
      <AppBar />
      <Box
        sx={{
          padding: { xs: "0 16px", sm: "0 30px", md: "0 60px", lg: "0 120px" },
          mt: 4,
        }}
        component="main"
      >
        {children}
      </Box>
    </React.Fragment>
  );
};

export default AppLayout;
