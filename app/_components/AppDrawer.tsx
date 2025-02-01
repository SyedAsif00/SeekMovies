import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import AppRoutes from "../_lib/AppRoutes";
import Button from "./Button";

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AppDrawer = ({ open, onClose }: AppDrawerProps) => {
  const router = useRouter();

  const handleNavigate = (path: string) => router.push(path);

  const drawer = (
    <Box onClick={onClose} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SeekMovie
      </Typography>
      <Divider />
      <List>
        {Object.keys(AppRoutes).map((item: string, index: number) => (
          <ListItem key={index}>
            <Button
              variant="text"
              size="large"
              sx={{ fontSize: 18, textTransform: "capitalize" }}
              label={item}
              onClick={() => handleNavigate(AppRoutes[item])}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default AppDrawer;
