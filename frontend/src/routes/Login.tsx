// Modules imports
import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// MUI imports
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
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// Theme import
import theme from "../theme/Theme";

// Utils imports
import { loginFn } from "../utils/authUtilities";

// context imports
import { MainContext } from "../context/MainContext";

type error = { path: Array<string>; message: string };
const errorsInit: error[] = [];

const Login = () => {
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState(errorsInit);
  const { isActive, toggleActive } = useContext(MainContext);
  const navigate = useNavigate();
  const authMutateQuery = useMutation({
    mutationFn: (data) => loginFn(data),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 400) {
        setIsError(true);
        setErrors(data.error.details);
      }
      if (data.status === 403) {
        setIsError(true);
        setErrors([{ path: ["error"], message: data.error.message }]);
      }
      if (data.status === 200) {
        localStorage.setItem("token", data.token);
        console.log("here");
        return navigate("/");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
      remember: formData.get("remember") ? true : false,
    };
    authMutateQuery.mutate(data as any);
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
          <Stack spacing={0} sx={{ margin: 1 }}>
            {errors.map((err, index) => {
              return (
                <Alert key={index} variant="outlined" severity="error">
                  {`${err.path[0]}: ${err.message}`}
                </Alert>
              );
            })}
          </Stack>
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
              {authMutateQuery.isLoading ? (
                <CircularProgress color="secondary" />
              ) : (
                `Sign In`
              )}
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
