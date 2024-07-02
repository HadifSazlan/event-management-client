import React from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../api/authProvider.js";

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role === "admin" && user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  if (role === "user" && user.role !== "user") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
