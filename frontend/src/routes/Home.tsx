import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import theme from "../Theme";
import ContactList from "../components/ContactList";
import MessagesArea from "../components/MessagesArea";

const App = () => {
  const [isActive, setIsActive] = useState(true);
  const [showArea, setShowArea] = useState(false);
  return (
    <>
      {isActive ? (
        <ThemeProvider theme={theme}>
          <Container
            component="main"
            maxWidth="lg"
            fixed
            sx={{ height: "100vh", overflow: "auto" }}
          >
            <CssBaseline />
            <Grid container spacing={1}>
              <ContactList show={!showArea} />
              <MessagesArea show={showArea} />
            </Grid>
          </Container>
        </ThemeProvider>
      ) : (
        <Navigate to={`login`} replace={true} />
      )}
    </>
  );
};

export default App;
