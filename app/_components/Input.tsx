import React from "react";
import { InputBase, InputBaseProps } from "@mui/material";

type CustomProps = InputBaseProps & {
  // add custom props here like default size, border color etc
};

const defaultInputProps: Partial<CustomProps> = {
  fullWidth: true,
};

const TextInput: React.FC<CustomProps> = (props) => {
  // Merge default props with custom props
  const mergedProps = { ...defaultInputProps, ...props };

  const { ...rest } = mergedProps;

  return <InputBase {...rest} />;
};

export default TextInput;
