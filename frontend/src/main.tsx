import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./ErrorPage";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import ForgotPassword from "./routes/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <h2>children goes here</h2>,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
