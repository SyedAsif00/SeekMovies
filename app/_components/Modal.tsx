import React, { ReactNode } from "react";
import {
  Box,
  Backdrop,
  Modal as MuiModal,
  Fade,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "./IconButton";
import { useTheme } from "@mui/material/styles";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ open, children, onClose }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    minHeight: "50vh",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : 500,
    backgroundColor: "rgb(55 53 53)",
    borderRadius: 2,
    maxWidth: "90vw",
    overflow: "auto",
  };

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <IconButton
            onClick={onClose}
            IconComponent={CloseIcon}
            sx={{ position: "absolute", right: 20, top: 10 }}
            iconStyle={{ fontSize: 30 }}
          />
          {children}
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
