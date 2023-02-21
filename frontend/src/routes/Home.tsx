import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "../theme/Theme";
import ContactList from "../components/Contacts/ContactList";
import MessagesArea from "../components/Messages Area/MessagesArea";
import ChatAppBar from "../components/App Bar/ChatAppBar";

import { MainContext } from "../context/MainContext";

const App = () => {
  const [showArea, setShowArea] = useState(false);
  const authContext = useContext(MainContext);
  console.log("from home " + authContext.isLoggedIn);
  return (
    <>
      {authContext.isLoggedIn ? (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="lg" disableGutters={true}>
            <CssBaseline />
            <ChatAppBar show={showArea} />
            <Box component="div" sx={{ display: "flex" }}>
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
