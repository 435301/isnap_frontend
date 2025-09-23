import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isTokenValid } from "../utils/tokenValidate";

// Admin Only
export const AdminRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  console.log("AdminRoute - Token:", token, "User:", user); // Debug
  if (!token || !isTokenValid(token)) {
    //  Clear invalid token
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") return <h2>403 - Unauthorized</h2>;
  return children;
};

// Team Only
export const TeamRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  console.log("TeamRoute - Token:", token, "User:", user); // Debug
  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== "team") return <h2>403 - Unauthorized</h2>;
  return children;
};

// Seller Only
export const SellerRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  console.log("SellerRoute - Token:", token, "User:", user); // Debug
  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== "seller") return <h2>403 - Unauthorized</h2>;
  return children;
};