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
  // if (user?.roleName !== "Admin") return <h2>401 - Unauthorized</h2>;
  return children;
};

// Team Only
export const TeamRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  console.log("TeamRoute - Token:", token, "User:", user); // Debug
  //  if (!token || !isTokenValid(token)) {
  //   //  Clear invalid token
  //   localStorage.removeItem("teamToken");
  //   localStorage.removeItem("team");
  //   return <Navigate to="/team/login" replace />;
  // };
  // if (user?.roleName !== "Team") return <h2>401 - Unauthorized</h2>;
  return children;
};

// Seller Only
export const SellerRoute = ({ children }) => {
  const { token, seller } = useSelector((state) => state.sellerAuth);
  console.log("SellerRoute - Token:", token, "seller:", seller); // Debug
  if (!token || !isTokenValid(token)) {
    //  Clear invalid token
    localStorage.removeItem("authToken");
    localStorage.removeItem("seller");
    return <Navigate to="/seller/login" replace />;
  };
  // if (seller?.roleName !== "Seller") return <h2>401 - Unauthorized</h2>;
  return children;
};