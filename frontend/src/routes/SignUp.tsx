// Modules import
import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Link as RouterLink,
  useNavigate,
  Navigate as Nav,
} from "react-router-dom";

// MUI import
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

// Theme import
import theme from "../theme/Theme";

// Utils import
import { singUpFn } from "../utils/authFetch";

// Context Import
import { MainContext } from "../context/MainContext";

// Types
type error = { path: Array<string>; message: string };
const errorsInit: error[] = [];

const SignUp = () => {
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState(errorsInit);

  const authContext = useContext(MainContext);

  const navigate = useNavigate();

  const signUpMutationQuery = useMutation({
    mutationFn: (data) => singUpFn(data),
    onSuccess: (data) => {
      if (data.status === 400) {
        setIsError(true);
        setErrors(data.error.details);
      }
      if (data.status === 403) {
        setIsError(true);
        setErrors([{ path: ["error"], message: data.error.message }]);
      }
      if (data.status === 201) {
        console.log(data.user);
        authContext.login(data.token, data.user);
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
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      newsLetter: formData.get("newsLetter") ? true : false,
    };
    console.log(data);
    signUpMutationQuery.mutate(data as any);
  };

  return (
    <>
      {!authContext.isLoggedIn ? (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                marginBottom: 8,
                textDecoration: "none",
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
                Sing Up
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
                sx={{ mt: 3 }}
                onSubmit={submitHandler}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoComplete="given-name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="lastName"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
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
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="allowExtraEmails"
                          color="primary"
                          name="newsLetter"
                        />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <RouterLink to="/login">
                      <Typography component="p" variant="body2">
                        Already have an account? Sign in
                      </Typography>
                    </RouterLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      ) : (
        <Nav to={`/`} replace={true} />
      )}
    </>
  );
};

export default SignUp;
