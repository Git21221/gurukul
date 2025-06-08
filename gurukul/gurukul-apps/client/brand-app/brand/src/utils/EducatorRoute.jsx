import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function EducatorRoute({ userRole }) {
  console.log("User Role in EducatorRoute:", userRole);
  
  if (userRole === "educator") {
    return <Outlet />;
  } else if (userRole === "admin") {
    return <Navigate to="/login/admin" replace />;
  }
  return <Navigate to="/login/user" replace />;
}

export default EducatorRoute;
