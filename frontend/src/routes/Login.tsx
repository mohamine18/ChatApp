import { Link as RouterLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import theme from "../Theme";

const Login = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      remember: formData.get("remember") ? true : false,
    };
    console.log(data);
  };
  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h3" color="primary">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={submitHandler}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  // error
                  // helperText='incorrect'
                  margin="normal"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox value="remember" color="primary" name="remember" />
              }
              label="Remember me"
            ></FormControlLabel>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <RouterLink to="/forgot-password">
                  <Typography component="p" variant="body2">
                    Forgot password?
                  </Typography>
                </RouterLink>
              </Grid>
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

export default Login;
