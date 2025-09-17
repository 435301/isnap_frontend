import React, { useState, useEffect } from "react";
import Sidebar from "../components/TeamSidebar";
import Navbar from "../components/TeamNavbar";
import DashboardCards from "../components/DashboardCards"; // ✅ make sure this line is present
import TaskStatistics from "../components/TaskStatistics";

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


const TeamDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // start closed on mobile

  // Keep sidebar open by default on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // run initially
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
              <h5 className=" mb-0 fw-bold">Dashboard</h5>
            </div>
          </div>

          <div className="row mx-1 me-3">
            <div className="">
              <DashboardCards />
            </div>
          </div>
          <div className="row ">
            <TaskStatistics />
          </div>

        </div>
      </div>
    </div>

  );
};

export default TeamDashboard;
