import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LandPage } from './pages/LandPage';
import { ValidateAuth } from './components/ValidateAuth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranding } from './redux/api/brandDetailsAPI';
import Login from './pages/login/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import FounderRoute from './utils/FounderRoute';
import EducatorRoute from './utils/EducatorRoute';
import UserRoute from './utils/UserRoute';
import { Helmet } from 'react-helmet';

function App() {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  const [branding, setBranding] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBranding()).then((data) => {
      console.log('Branding Data Fetched:', data);
      setBranding(data.payload);
    });
  }, []);
  // console.log('Branding Data:', branding);
  const location = useLocation();
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('lastRoute', location.pathname);
    }
  }, [location.pathname, isAuthenticated]);
  const lastRoute = localStorage.getItem('lastRoute') || '/';

  return (
    <div>
      <Helmet>
        <title>{branding?.brandName}</title>
      </Helmet>
      <Routes>
        {/* not protected routes */}
        <Route element={<ValidateAuth />}>
          <Route path="/" element={<LandPage />} />
          {/* <Route path="/signup/educator" element={<CheckToken />} /> */}
          <Route
            path="/login"
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
            {/* for educator routes */}
            <Route element={<EducatorRoute userRole={userRole} />}>
              <Route path="/educator/home" element={<>Protected</>} />
            </Route>
            {/* for student routes */}
            <Route element={<UserRoute userRole={userRole} />}>
              <Route path="/user/home" element={<>Protected</>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
