import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LandPage } from './pages/landPage/LandPage';
import { ValidateAuth } from './components/ValidateAuth';
import { useSelector } from 'react-redux';
import { Login } from './pages/login/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import FounderRoute from './utils/FounderRoute';

function App() {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  const location = useLocation();
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('lastRoute', location.pathname);
    }
  }, [location.pathname, isAuthenticated]);
  const lastRoute = localStorage.getItem('lastRoute') || '/';

  return (
    <div>
      <Routes>
        {/* not protected routes */}
        <Route element={<ValidateAuth />}>
          <Route path="/" element={<LandPage />} />
          {/* <Route path="/signup/educator" element={<CheckToken />} /> */}
          <Route
            path="/login/founder"
            element={
              !isAuthenticated ? <Login /> : <Navigate to={'/'} replace />
            }
          />
          {/* protected routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            {/* for admin routes */}
            <Route element={<FounderRoute userRole={userRole} />}>
              <Route path="/founder/home" element={<>Protected</>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
