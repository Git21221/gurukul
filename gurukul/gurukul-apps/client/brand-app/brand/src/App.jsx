import { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LandPage } from "./pages/LandPage";
import { ValidateAuth } from "./components/ValidateAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranding } from "./redux/api/brandDetailsAPI";
import Login from "./pages/login/educator/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";
import EducatorRoute from "./utils/EducatorRoute";
import UserRoute from "./utils/UserRoute";

function App() {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBranding());
  }, []);
  const location = useLocation();
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("lastRoute", location.pathname);
    }
  }, [location.pathname, isAuthenticated]);
  const lastRoute = localStorage.getItem("lastRoute") || "/";

  return (
    <div>
      <Routes>
        {/* not protected routes */}
        <Route element={<ValidateAuth />}>
          <Route path="/" element={<LandPage />} />
          {/* <Route path="/signup/educator" element={<CheckToken />} /> */}
          <Route
            path="/login/educator"
            element={
              !isAuthenticated || userRole !== "educator" ? (
                <Login />
              ) : (
                <Navigate to={"/"} replace />
              )
            }
          />
          {/* protected routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            {/* for admin routes */}
            <Route element={<AdminRoute userRole={userRole} />}>
              <Route path="/admin/home" element={<>Protected</>} />
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
