import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function UserRoute({ userRole }) {
  console.log('UserRoute: userRole =', userRole);
  if (userRole === 'user') {
    return <Outlet />;
  } else if (userRole === 'admin') {
    return <Navigate to="/login/admin" replace />;
  }
  return <Navigate to="/login/educator" replace />;
}

export default UserRoute;
