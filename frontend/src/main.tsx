// Modules import
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Routes import
import Home from "./routes/Home";
import ErrorPage from "./ErrorPage";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import ForgotPassword from "./routes/ForgotPassword";
import ResetPassword from "./routes/ResetPassword";

import "./main.module.css";

import MainContextProvider from "./context/MainContext";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" errorElement={<ErrorPage />}>
//       <Route path="/" element={<Home />} />
//       <Route path="login" element={<Login />} />
//       <Route path="sign-up" element={<SignUp />} />
//       <Route path="forgot-password" element={<ForgotPassword />} />
//       <Route path="reset-password" element={<ResetPassword />} />
//     </Route>
//   )
// );

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
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
