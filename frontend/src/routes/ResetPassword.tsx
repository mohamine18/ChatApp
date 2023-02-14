import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import theme from "../Theme";

const ResetPassword = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
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
            alt="app logo"
            src="/logo.png"
          ></Avatar>
          <Typography component="h1" variant="h4" color="primary">
            Reset password
          </Typography>
          <Box
            component="form"
            sx={{ mt: 3 }}
            noValidate
            onSubmit={submitHandler}
          >
            <TextField
              margin="normal"
              name="password"
              label="New Password"
              required
              fullWidth
              id="Password"
              type="password"
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              name="confirmPassword"
              label="Confirm Password"
              required
              fullWidth
              id="ConfirmPassword"
              type="password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPassword;
