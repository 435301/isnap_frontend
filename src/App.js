import React , { Suspense, lazy }from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminRoute, SellerRoute, TeamRoute } from "./routes/RoleRoutes";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";

const AdminRoutes = lazy(() => import("./routes/AdminRoutes.jsx"));
const TeamRoutes = lazy(() => import("./routes/TeamRoutes"));
const SellerRoutes = lazy(() => import("./routes/SellerRoutes"));
const ExecutiveRoutes = lazy(() => import("./routes/ExecutiveRoutes"));
const AccountsRoutes = lazy(() => import("./routes/AccountRoutes.jsx"));
const Login = lazy(() => import("./admin/pages/Login"));
const SellerLogin = lazy(() => import("./Seller/pages/SellerLogin.jsx"));
const NotFound = lazy(() => import("./common/404.jsx"));

const ToastContainer = lazy(() =>
  import("react-toastify").then((m) => ({ default: m.ToastContainer }))
);

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/seller/login" element={<SellerLogin />} />
            {/* Role Routes */}
          <Route path="/dashboard/*" element={<AdminRoutes />} />
          <Route path="/team/*" element={<TeamRoutes />} />
          <Route path="/seller/*" element={<SellerRoutes />} />
          <Route path="/executive/*" element={<ExecutiveRoutes />} />
          <Route path="/accounts/*" element={<AccountsRoutes />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
        <Suspense fallback={null}>
          <ToastContainer position="top-right" autoClose={3000} />
        </Suspense>
      </Suspense>
    </Router>
  );
}

export default App;
