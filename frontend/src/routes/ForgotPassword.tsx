import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

import Theme from "../Theme";

const ForgotPassword = () => {
  const [noEmpty, setNoEmpty] = useState(true);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
    };
    if (
      isEmpty(data.email as string) === false ||
      isEmail(data.email as string) === false
    )
      setNoEmpty(false);
  };
  return (
    <ThemeProvider theme={Theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "white" }}
            alt="chat logo"
            src="/logo.png"
          ></Avatar>
          <Typography component="h1" variant="h4" color="primary">
            Forgot Password
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={submitHandler}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!noEmpty}
              helperText={noEmpty ? "" : "Please enter a valid email"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset password
            </Button>
            <Grid container>
              <Grid item>
                <RouterLink to="/sign-up">
                  <Typography component="p" variant="body2">
                    Don't have an account? Sign Up
                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
