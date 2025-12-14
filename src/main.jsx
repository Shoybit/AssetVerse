import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import router from "./routes/Routes";
import "./index.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
