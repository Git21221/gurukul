import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute({ userRole }) {
  if (userRole === 'founder') {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
}

export default AdminRoute;
