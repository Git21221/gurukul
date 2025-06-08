import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute({ userRole }) {
  if (userRole === "admin") {
    return <Outlet />;
  } else if (userRole === "educator") {
    return <Navigate to="/login/educator" replace />;
  }
  return <Navigate to="/login/user" replace />;
}

export default AdminRoute;
