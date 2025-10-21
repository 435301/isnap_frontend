import React, { useState, useEffect } from "react";
import Sidebar from "../components/AccountsSidebar";
import Navbar from "../components/AccountsNavbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { fetchBusinessDetailsExecutive } from "../../redux/actions/businessActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const InvoiceNotifications = () => {
  const navigate = useNavigate();
  const accountantUser = localStorage.getItem("user");
  const roleType = accountantUser ? JSON.parse(accountantUser).roleName : null;
  console.log('roleType', roleType)
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { businessDetailsSales =[]} = useSelector((state) => state.business); 
  console.log('businessDetails', businessDetailsSales)

useEffect(() => {
  dispatch(fetchBusinessDetailsExecutive(1, "", "", 1, roleType));
}, [dispatch, roleType]);

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

    // Convert business details → notification format
  const notifications =
    businessDetailsSales?.map((biz) => {
      let type = "warning";
      let message = "";
      let icon = "bi-receipt";

     if (biz.requestForInvoice === 1) {
      type = "success";
      message = `Invoice for "${biz.businessName}" has been requested by Sales Manager.`;
      icon = "bi-check-circle";
    }
    // No invoice requested yet
    else if (biz.requestForInvoice === 0) {
      type = "secondary";
      message = `No invoice requested for "${biz.businessName}" yet.`;
      icon = "bi-dash-circle";
    }
    else {
      message = `No active invoice for "${biz.businessName}".`;
    }
      return {
        id: biz.id,
        type,
        icon,
        message,
        time: new Date(biz.updatedAt).toLocaleString(),
      };
    }) || [];

     const handleCreateInvoice = (businessId) => {
    navigate(`/accounts/create-invoice/${businessId}`);
  };


   const renderNotification = (item) => (
    <div className="bg-white p-3 rounded border mb-2 shadow-sm" key={item.id}>
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
            <i className={`bi ${item.icon} text-white`}></i>
          </div>
          <div>
            <p className="mb-1 small fw-semibold text-dark">{item.message}</p>
            <p className="small mb-0 text-muted">{item.time}</p>
          </div>
        </div>
         {item.type === "success" && (
          <button
            className="btn btn-sm btn-primary ms-3"
            onClick={() => handleCreateInvoice(item.id)}
          >
            Create Invoice
          </button>
        )}
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
