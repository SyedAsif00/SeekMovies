import React from "react";
import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";
import { SvgIconComponent } from "@mui/icons-material";

interface IconButtonProps extends Omit<MuiIconButtonProps, "children"> {
  IconComponent: SvgIconComponent;
  iconStyle?: React.CSSProperties;
}

const IconButton: React.FC<IconButtonProps> = ({
  IconComponent,
  iconStyle,
  ...rest
}) => {
  return (
    <MuiIconButton {...rest}>
      <IconComponent style={iconStyle} />
    </MuiIconButton>
  );
};

export default IconButton;
