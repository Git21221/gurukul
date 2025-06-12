import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LandPage } from './pages/landPage/LandPage';
import { ValidateAuth } from './components/ValidateAuth';
import { useSelector } from 'react-redux';
import { Login } from './pages/login/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import FounderRoute from './utils/FounderRoute';
import { SignupForm } from './pages/signup/SignupForm';
import CreateBrand from './pages/create-brand/CreateBrand';

function App() {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  console.log('App isAuthenticated:', isAuthenticated);
  console.log('App userRole:', userRole);

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
          <Route path="/signup/founder" element={<SignupForm />} />
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
              <Route path="/founder/create-brand" element={<CreateBrand />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
