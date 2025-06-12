import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute({ userRole }) {
  if (userRole === 'founder') {
    return <Outlet />;
  }
  return <Navigate to="/login/founder" replace />;
}

export default AdminRoute;
