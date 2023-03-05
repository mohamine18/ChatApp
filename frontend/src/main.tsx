// Modules import
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Routes import
import Home from "./routes/Home";
import ErrorPage from "./ErrorBoundary";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import ForgotPassword from "./routes/ForgotPassword";
import ResetPassword from "./routes/ResetPassword";

// css
import "./main.module.css";

// context
import MainContextProvider from "./context/MainContext";
import ConversationContextProvider from "./context/conversationContext";

// error boundary
import ErrorBoundary from "./ErrorBoundary";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ConversationContextProvider>
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                </ConversationContextProvider>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
