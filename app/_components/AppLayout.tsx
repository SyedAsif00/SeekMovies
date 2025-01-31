import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  return <Box>{children}</Box>;
};

export default AppLayout;
