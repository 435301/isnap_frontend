import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import TaskUpdates from "../components/TaskUpdates";
import LeadsUpdates from "../components/LeadsUpdates";
import TaskStatistics from "../components/TaskStatistics";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Keep sidebar open by default on desktop
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
          transition: 'margin-left 0.3s ease'
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid ps-3 pt-3 pe-0">
          <h5 className="mb-3 fw-bold">Dashboard</h5>
          <DashboardCards />
          <div className="row g-2 me-3">
            <div className="col-lg-6">
              <TaskUpdates />
            </div>
            <div className="col-lg-6">
              <LeadsUpdates />
            </div>
          </div>
          <div className="row">
            <TaskStatistics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
