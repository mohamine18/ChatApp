import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "../Theme";
import ContactList from "../components/Contacts/ContactList";
import MessagesArea from "../components/Messages Area/MessagesArea";
import ChatAppBar from "../components/App Bar/ChatAppBar";

const App = () => {
  const [isActive, setIsActive] = useState(true);
  const [showArea, setShowArea] = useState(false);
  return (
    <>
      {isActive ? (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <ChatAppBar show={showArea} />
            <Box component="div" sx={{ display: "flex", flexBasis: "100%" }}>
              <ContactList show={!showArea} />
              <MessagesArea show={showArea} />
            </Box>
          </Container>
        </ThemeProvider>
      ) : (
        <Navigate to={`login`} replace={true} />
      )}
    </>
  );
};

export default App;
