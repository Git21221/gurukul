import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login/founder" replace />;
  } else return <Outlet />;
}

export default ProtectedRoute;
