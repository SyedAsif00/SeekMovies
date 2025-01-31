import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  // semnatically meaningful html with either main or section. mui is powerful as it considers SEO.
  return <Box component="main">{children}</Box>;
};

export default AppLayout;
