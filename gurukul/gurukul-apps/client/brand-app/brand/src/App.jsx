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
import DashboardLayout from './components/DashboardLayout';
import PublicLayout from './components/PublicLayout';
import Signup from './pages/signup/user/Signup';
import { FounderHome } from './pages/founder/home/FounderHome';
import { SignUpEducator } from './components/signup/educator/SignUpEducator';
import { EducatorHome } from './pages/educator/home/EducatorHome';
import { UploadVideo } from './pages/educator/upload/UploadVideo';
import { AllCourse } from './pages/educator/course/AllCourse';

function App() {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  const [branding, setBranding] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBranding()).then((data) => {
      console.log('Branding Data Fetched:', data);
      setBranding(data.payload);
      setLoading(false);
    });
  }, [dispatch]);
  // console.log('Branding Data:', branding);
  const location = useLocation();
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('lastRoute', location.pathname);
    }
  }, [location.pathname, isAuthenticated]);
  const lastRoute = localStorage.getItem('lastRoute') || '/';
  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <Helmet>
        <title>{branding?.brandName}</title>
      </Helmet>
      <Routes>
        {/* not protected routes */}
        <Route element={<ValidateAuth />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandPage />} />
            {/* <Route path="/signup/educator" element={<CheckToken />} /> */}
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to={'/'} replace />
              }
            />
            <Route
              path="/signup"
              element={
                !isAuthenticated ? <Signup /> : <Navigate to={'/'} replace />
              }
            />
            <Route path="/signup/educator" element={<SignUpEducator />} />
          </Route>
          {/* protected routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            {/* for admin routes */}
            <Route element={<FounderRoute userRole={userRole} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/founder/home" element={<FounderHome />} />
              </Route>
            </Route>
            {/* for educator routes */}
            <Route element={<EducatorRoute userRole={userRole} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/educator/home" element={<EducatorHome />} />
                <Route
                  path="/educator/upload-video"
                  element={<UploadVideo />}
                />
                <Route path="/educator/courses" element={<AllCourse />} />
              </Route>
            </Route>
            {/* for student routes */}
            <Route element={<UserRoute userRole={userRole} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/user/home" element={<div>user Home</div>} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
