import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../admin/assets/admin/images/logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/authAction";

const ExecutiveSidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Detect which dropdown should be open based on route
  useEffect(() => {
    const dropdownRoutes = {
      leads: [
        "/executive/create-lead",
        "/executive/manage-leads",
        "/executive/leads-status",
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

  // ✅ Supports single or multiple paths for active link
  const isLinkActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some((path) => location.pathname.startsWith(path))
        ? "active"
        : "";
    }
    return location.pathname.startsWith(paths) ? "active" : "";
  };

  const isDropdownActive = (dropdown) => activeDropdown === dropdown;

  // ✅ Logout Handler
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

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
            to="/executive/dashboard"
            className={`nav-item nav-link ${isLinkActive("/executive/dashboard")}`}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            {isOpen && <span>Dashboard</span>}
          </Link>

          {/* Seller Management */}
          <Link
            to="/executive/manage-seller"
            className={`nav-item nav-link ${isLinkActive("/executive/manage-seller")}`}
          >
            <i className="bi bi-people-fill me-2"></i>
            {isOpen && <span>Manage Sellers</span>}
          </Link>

          {/* Leads Dropdown */}
          <div
            className={`nav-item dropdown ${isDropdownActive("leads") ? "show" : ""}`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${isDropdownActive("leads") ? "active" : ""
                }`}
              onClick={() => handleDropdownToggle("leads")}
            >
              <i className="bi bi-person-plus-fill me-2"></i>
              {isOpen && <span>Leads</span>}
            </a>

            <div
              className={`dropdown-menu bg-transparent border-0 ${isDropdownActive("leads") ? "show" : ""
                }`}
            >
              <Link
                to="/executive/create-lead"
                className={`dropdown-item ${isLinkActive("/executive/create-lead")}`}
              >
                Create New Lead
              </Link>
              <Link
                to="/executive/manage-leads"
                className={`dropdown-item ${isLinkActive("/executive/manage-leads")}`}
              >
                Manage Leads
              </Link>
              <Link
                to="/executive/leads-status"
                className={`dropdown-item ${isLinkActive("/executive/leads-status")}`}
              >
                Leads Status
              </Link>
            </div>
          </div>
          {/* Change Password */}
          <Link
            to="/executive/latest-updates"
            className={`nav-item nav-link ${isLinkActive("/executive/latest-updates")}`}
          >
            <i className="bi bi-key me-2"></i>
            {isOpen && <span>Latest Updates </span>}
          </Link>

          {/* Change Password */}
          <Link
            to="/executive/change-password"
            className={`nav-item nav-link ${isLinkActive("/executive/change-password")}`}
          >
            <i className="bi bi-key me-2"></i>
            {isOpen && <span>Change Password</span>}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="nav-item nav-link text-danger"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ExecutiveSidebar;
