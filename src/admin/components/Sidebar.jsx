import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/authAction";
import logo from "../assets/admin/images/logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if the path is active
  const isLinkActive = (path) => {
    if (path instanceof Array) {
      return path.includes(location.pathname) ? "active" : "";
    }
    return location.pathname === path ? "active" : "";
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  // Open dropdown if current path is inside it
  useEffect(() => {
    const dropdownRoutes = {
      "master-data": [
        "/manage-services",
        "/market-place-type",
        "/manage-billing",
        "/manage-activities",
        "/manage-state",
        "/add-category",
        "/add-market-place",
        "/add-activities",
        "/add-service",
        "/add-state",
        "/add-market-type",
        "/create-department",
        "/create-billing",
        "/manage-departments",
        "/add-department",
        "/add-product-listing",
        "/manage-commission",
        "/create-commission",
        "/manage-billing",
        "/manage-product-listing"
      ],
      sellers: ["/manage-sellers", "/create-seller", "/view-seller"],

      team: ["/manage-team", "/add-team", "/manage-roles", "/add-role", "/latest-updates", "/manage-updates"],
      tasks: ["/manage-task", "/create-task", "/rejected-tasks"],
      leads: ["/manage-leads", "/create-lead", "/view-lead"],
      notifications: ["/view-notifications", "/notification-settings"],
    };

    let currentDropdown = null;
    Object.keys(dropdownRoutes).forEach((key) => {
      if (dropdownRoutes[key].some((route) => location.pathname.startsWith(route))) {
        currentDropdown = key;
      }
    });

    setActiveDropdown(currentDropdown);
  }, [location.pathname]);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const isDropdownActive = (dropdown) => activeDropdown === dropdown;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className={`sidebar pb-3 ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <nav className="navbar">
        <Link to="/" className="navbar-brand ms-4 mb-3">
          <img src={logo} alt="Logo" className="mx-4" />
        </Link>

        <div className="navbar-nav w-100">
          {/* Dashboard */}
          <Link to="/dashboard" className={`nav-item nav-link ${isLinkActive("/dashboard")}`}>
            <i className="bi bi-speedometer2 me-2"></i>
            {isOpen && <span>Dashboard</span>}
          </Link>

          {/* Master Data */}
          <div className={`nav-item dropdown ${isDropdownActive("master-data") ? "show" : ""}`}>
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${isDropdownActive("master-data") ? "active" : ""}`}
              onClick={() => handleDropdownToggle("master-data")}
              aria-expanded={isDropdownActive("master-data")}
            >
              <i className="bi bi-folder2-open me-2"></i>
              {isOpen && <span>Master Data</span>}
            </a>
            <div className={`dropdown-menu bg-transparent border-0 ${isDropdownActive("master-data") ? "show" : ""}`}>
              <Link to="/manage-services" className={`dropdown-item ${isLinkActive("/manage-services")}`}>Service Categories</Link>
              <Link to="/market-place-type" className={`dropdown-item ${isLinkActive("/market-place-type")}`}>Marketplace Types</Link>
              <Link to="/manage-services-type" className={`dropdown-item ${isLinkActive("/manage-services-type")}`}>Marketplaces</Link>
              <Link to="/manage-product-listing" className={`dropdown-item ${isLinkActive("/manage-product-listing")}`}>Product Listing </Link>
              <Link to="/manage-commission" className={`dropdown-item ${isLinkActive("/manage-commission")}`}>Comission Pricing</Link>

              <Link to="/manage-departments" className={`dropdown-item ${isLinkActive("/manage-departments")}`}>
                Departments
              </Link>
              <Link to="/manage-billing" className={`dropdown-item ${isLinkActive("/manage-billing")}`}>Billing Cycle</Link>
              <Link to="/manage-state" className={`dropdown-item ${isLinkActive("/manage-state")}`}>States</Link>

            </div>
          </div>

          {/* Leads */}
          <div className={`nav-item dropdown ${isDropdownActive("leads") ? "show" : ""}`}>
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${isDropdownActive("leads") ? "active" : ""}`}
              onClick={() => handleDropdownToggle("leads")}
            >
              <i className="bi bi-person-plus-fill me-2"></i>
              {isOpen && <span>Leads</span>}
            </a>
            <div className={`dropdown-menu bg-transparent border-0 ${isDropdownActive("leads") ? "show" : ""}`}>
              <Link to="/manage-leads" className={`dropdown-item ${isLinkActive("/manage-leads")}`}>Manage Leads</Link>
              <Link to="/create-lead" className={`dropdown-item ${isLinkActive("/create-lead")}`}>Create Lead</Link>
            </div>
          </div>

          {/* Sellers */}
          <div className={`nav-item dropdown ${isDropdownActive("sellers") ? "show" : ""}`}>
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${isDropdownActive("sellers") ? "active" : ""}`}
              onClick={() => handleDropdownToggle("sellers")}
            >
              <i className="bi bi-person-lines-fill me-2"></i>
              {isOpen && <span>Sellers</span>}
            </a>
            <div className={`dropdown-menu bg-transparent border-0 ${isDropdownActive("sellers") ? "show" : ""}`}>
              <Link to="/manage-sellers" className={`dropdown-item ${isLinkActive("/manage-sellers")}`}>Manage Sellers</Link>
              <Link to="/create-seller" className={`dropdown-item ${isLinkActive("/create-seller")}`}>Create Seller</Link>
            </div>
          </div>

          {/* Team */}
          <div className={`nav-item dropdown ${isDropdownActive("team") ? "show" : ""}`}>
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${isDropdownActive("team") ? "active" : ""}`}
              onClick={() => handleDropdownToggle("team")}
            >
              <i className="bi bi-people-fill me-2"></i>
              {isOpen && <span>Team</span>}
            </a>
            <div className={`dropdown-menu bg-transparent border-0 ${isDropdownActive("team") ? "show" : ""}`}>
              <Link to="/manage-team" className={`dropdown-item ${isLinkActive("/manage-team")}`}>Teams</Link>
              <Link to="/manage-roles" className={`dropdown-item ${isLinkActive("/manage-roles")}`}>Roles</Link>
              <Link to="/latest-updates" className={`dropdown-item ${isLinkActive("/latest-updates")}`}>Latest Updates</Link>
            </div>
          </div>

          {/* Tasks */}
          <div className={`nav-item dropdown ${isDropdownActive("tasks") ? "show" : ""}`}>
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${isDropdownActive("tasks") ? "active" : ""}`}
              onClick={() => handleDropdownToggle("tasks")}
            >
              <i className="bi bi-list-check me-2"></i>
              {isOpen && <span>Tasks</span>}
            </a>
            <div className={`dropdown-menu bg-transparent border-0 ${isDropdownActive("tasks") ? "show" : ""}`}>
              <Link to="/manage-task" className={`dropdown-item ${isLinkActive("/manage-task")}`}>Manage Task</Link>
              <Link to="/create-task" className={`dropdown-item ${isLinkActive("/create-task")}`}>Create Task</Link>
              <Link to="/rejected-tasks" className={`dropdown-item ${isLinkActive("/rejected-tasks")}`}>Rejected Task</Link>
            </div>
          </div>

          {/* Products */}
          <div className={`nav-item dropdown ${isDropdownActive("products") ? "show" : ""}`}>
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${isDropdownActive("products") ? "active" : ""}`}
              onClick={() => handleDropdownToggle("products")}
            >
              <i className="bi bi-box-seam me-2"></i>
              {isOpen && <span>Products</span>}
            </a>
            <div className={`dropdown-menu bg-transparent border-0 `}>
              <Link to="" className={`dropdown-item`}>Add Product</Link>
              <Link to="" className={`dropdown-item `}>Manage Products</Link>
            </div>
          </div>

          {/* Notifications */}
          <div className={`nav-item dropdown ${isDropdownActive("notifications") ? "show" : ""}`}>
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${isDropdownActive("notifications") ? "active" : ""}`}
              onClick={() => handleDropdownToggle("notifications")}
            >
              <i className="bi bi-bell me-2"></i>
              {isOpen && <span>Notifications</span>}
            </a>
            <div className={`dropdown-menu bg-transparent border-0 ${isDropdownActive("notifications") ? "show" : ""}`}>
              <Link to="/view-notifications" className={`dropdown-item ${isLinkActive("/view-notifications")}`}>View Notifications</Link>
              <Link to="/notification-settings" className={`dropdown-item ${isLinkActive("/notification-settings")}`}>Settings</Link>
            </div>
          </div>

          {/* Change Password */}
          <Link to="/change-password" className={`nav-item nav-link ${isLinkActive("/change-password")}`}>
            <i className="bi bi-key me-2"></i>
            {isOpen && <span>Change Password</span>}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`nav-item nav-link text-danger`}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
