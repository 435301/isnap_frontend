import React, { useState, useEffect } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const InvoiceNotifications = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle sidebar toggle
  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Invoice notification data
  const notifications = [
    {
      id: 1,
      type: "success",
      message: "Invoice #1234 has been successfully sent to the client.",
      time: "10 Oct 2025, 09:30 AM",
    },
    {
      id: 2,
      type: "warning",
      message: "Invoice #1235 is pending approval from manager.",
      time: "11 Oct 2025, 11:15 AM",
    },
    {
      id: 3,
      type: "danger",
      message: "Invoice #1236 was rejected due to missing details.",
      time: "12 Oct 2025, 03:45 PM",
    },
    {
      id: 4,
      type: "success",
      message: "Invoice #1237 has been approved and sent.",
      time: "13 Oct 2025, 10:20 AM",
    },
  ];

  const renderNotification = (item) => (
    <div
      className="bg-white p-3 rounded border mb-2"
      key={item.id}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex">
          <div
            className={`d-flex align-items-center justify-content-center me-3 rounded-circle ${
              item.type === "success"
                ? "bg-success"
                : item.type === "warning"
                ? "bg-warning"
                : "bg-danger"
            }`}
            style={{ width: 40, height: 40 }}
          >
            <i className="bi bi-receipt text-white"></i>
          </div>
          <div>
            <p className="mb-1 small fw-semibold text-dark">{item.message}</p>
            <p className="small mb-0 text-muted">{item.time}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content flex-grow-1">
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-4">
          <div className="bg-white p-3 rounded shadow-sm card-header mb-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0 fw-semibold">Invoice Notifications</h5>
          </div>

          {/* Notifications List */}
          <div className="bg-white p-3 rounded shadow-sm border">
            {notifications.length > 0 ? (
              notifications.map((item) => renderNotification(item))
            ) : (
              <p className="text-muted small mb-0">No invoice notifications available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceNotifications;
