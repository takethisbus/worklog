"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import { Divider } from "@mui/material";

const InputTextStyled = styled(TextField)({
  "&": {
    backgroundColor: "black"
  }
});

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password")
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            backgroundImage:
              "linear-gradient(to right, #434343 0%, black 100%)",
            textAlign: "center",
            borderRadius: "50%",
            marginBottom: "3rem"
          }}
        >
          Work log
          <Divider />
        </Box>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <InputTextStyled
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <InputTextStyled
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "black",
              color: "white"
            }}
          >
            Sign In
          </Button>
          <Grid container direction="row" justifyContent="center">
            <Link href="/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
