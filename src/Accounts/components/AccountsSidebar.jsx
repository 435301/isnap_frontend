import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../admin/assets/admin/images/logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";

const AccountsSidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ✅ Detect active dropdown from route
  useEffect(() => {
    const dropdownRoutes = {
      invoice: [
        "/accounts/invoice-notification",
        "/accounts/create-invoice",
      ],
    };

    const matchedDropdown = Object.keys(dropdownRoutes).find((key) =>
      dropdownRoutes[key].some((path) => location.pathname.startsWith(path))
    );

    setActiveDropdown(matchedDropdown || null);
  }, [location.pathname]);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // ✅ Determine active links
  const isLinkActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some((path) => location.pathname.startsWith(path))
        ? "active"
        : "";
    }
    return location.pathname.startsWith(paths) ? "active" : "";
  };

  const isDropdownActive = (dropdown) => activeDropdown === dropdown;

  return (
    <div className={`sidebar pb-3 ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar-brand ms-4 mb-3">
          <img src={logo} alt="Logo" className="mx-4" />
        </Link>

        <div className="navbar-nav w-100">
          {/* Dashboard */}
          <Link
            to="/accounts/dashboard"
            className={`nav-item nav-link ${isLinkActive("/accounts/dashboard")}`}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            {isOpen && <span>Dashboard</span>}
          </Link>

          {/* Invoice Dropdown */}
          <div
            className={`nav-item dropdown ${isDropdownActive("invoice") ? "show" : ""}`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${
                isDropdownActive("invoice") ? "active" : ""
              }`}
              onClick={() => handleDropdownToggle("invoice")}
            >
              <i className="bi bi-receipt-cutoff me-2"></i>
              {isOpen && <span>Invoices</span>}
            </a>

            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isDropdownActive("invoice") ? "show" : ""
              }`}
            >
              <Link
                to="/accounts/invoice-notification"
                className={`dropdown-item ${isLinkActive("/accounts/invoice-notification")}`}
              >
                Invoice Notifications
              </Link>
              <Link
                to="/accounts/create-invoice"
                className={`dropdown-item ${isLinkActive("/accounts/create-invoice")}`}
              >
                Create Invoice
              </Link>
            </div>
          </div>

          {/* Change Password */}
          <Link
            to="/accounts/change-password"
            className={`nav-item nav-link ${isLinkActive("/accounts/change-password")}`}
          >
            <i className="bi bi-key me-2"></i>
            {isOpen && <span>Change Password</span>}
          </Link>

          {/* Logout */}
          <Link
            to="/logout"
            className={`nav-item nav-link text-danger ${isLinkActive("/logout")}`}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            {isOpen && <span>Logout</span>}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AccountsSidebar;
