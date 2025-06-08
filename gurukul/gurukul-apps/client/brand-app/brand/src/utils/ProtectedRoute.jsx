import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login/educator" replace />;
  } else return <Outlet />;
}

export default ProtectedRoute;
