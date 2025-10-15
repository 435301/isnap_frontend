import React, { useState, useEffect } from "react";
import Sidebar from "../components/AccountsSidebar";   // ✅ Sidebar from SellerSidebar
import Navbar from "../components/AccountsNavbar";     // ✅ Navbar from SellerNavbar
import DashboardCards from "../components/DashboardCards";
import TaskStatistics from "../components/TaskStatistics";

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SellerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 992) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft:
            windowWidth >= 992
              ? isSidebarOpen
                ? 259
                : 95
              : isSidebarOpen
                ? 220
                : 0,
          transition: "margin-left 0.3s ease"
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid ps-3 pt-3 pe-0">
          <div className="row mx-1 me-3 mb-3">
            <div className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Dashboard</h5>
            </div>
          </div>
          <div className="row mx-1 me-3">
            <DashboardCards />
          </div>
          <div className="row">
            <TaskStatistics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
