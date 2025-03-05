"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import useAuth from "@/app/_hooks/useAuth";

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Container maxWidth="xs">
      <Card sx={{ mt: 8, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Log In to your account
          </Typography>

          {error && (
            <Alert severity="error">
              {error.response?.data?.message ||
                error.message ||
                "An error occurred"}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              fullWidth
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "logging in..." : "login"}
            </Button>

            <Typography textAlign="center" sx={{ mt: 2 }}>
              create an account here <a href="/auth/register">Login</a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
