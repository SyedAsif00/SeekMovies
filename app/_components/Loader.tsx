import React from "react";
import { CircularProgress, CircularProgressProps } from "@mui/material";

interface LoaderProps extends CircularProgressProps {}

const Loader: React.FC<LoaderProps> = (props) => {
  return <CircularProgress {...props} />;
};

export default Loader;
