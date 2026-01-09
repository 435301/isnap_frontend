import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../admin/assets/admin/images/logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { logoutUser } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const TeamSidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropdownRoutes = {
    reports: ["/team/create-report", "/team/manage-reports"],
  };

  // Highlight dropdown parent if current path is inside it
  useEffect(() => {
    const matchedDropdown = Object.keys(dropdownRoutes).find((key) =>
      dropdownRoutes[key].includes(location.pathname)
    );
    setActiveDropdown(matchedDropdown || null);
  }, [location.pathname]);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Supports both single & multiple paths
  const isLinkActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.includes(location.pathname) ? "active" : "";
    }
    return location.pathname === paths ? "active" : "";
  };

  const isDropdownActive = (dropdown) => {
    return (
      activeDropdown === dropdown ||
      dropdownRoutes[dropdown]?.includes(location.pathname)
    );
  };

    const handleLogout = () => {
      dispatch(logoutUser());
      navigate("/login");
    };
  

  return (
    <div
      className={`sidebar pb-3 ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <nav className="navbar">
        <Link to="/" className="navbar-brand ms-4 mb-3">
          <img src={logo} alt="Logo" className="mx-4" />
        </Link>

        <div className="navbar-nav w-100">
          <Link
            to="/team/dashboard"
            className={`nav-item nav-link ${isLinkActive("/team/dashboard")}`}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            {isOpen && <span>Dashboard</span>}
          </Link>

          {/* <Link
            to="/team/manage-leads"
            className={`nav-item nav-link ${isLinkActive("/team/manage-leads")}`}
          >
            <i className="bi bi-key me-2"></i>
            {isOpen && <span>Leads</span>}
          </Link> */}

          {/* Tasks Section */}
          <Link
            to="/team/team-tasks"
            className={`nav-item nav-link ${isLinkActive([
              "/team/team-tasks",
              "/team/task-summary",
            ])}`}
          >
            <i className="bi bi-list-check me-2"></i>
            {isOpen && <span>Task</span>}
          </Link>

          <Link
            to="/team/latest-updates"
            className={`nav-item nav-link ${isLinkActive(
              "/team/latest-updates"
            )}`}
          >
            <i className="bi bi-bell-fill me-2"></i>
            {isOpen && <span>Latest Updates</span>}
          </Link>

            <Link
            to="/team/manage-sellers"
            className={`nav-item nav-link ${isLinkActive(
              "/team/manage-sellers"
            )}`}
          >
            <i className="bi bi-bell me-2"></i>
            {isOpen && <span>Manage Sellers</span>}
          </Link>

          {/* Reports Dropdown */}
            {/* <div
              className={`nav-item dropdown ${
                isDropdownActive("reports") ? "show" : ""
              }`}
            >
              <a
                href="#"
                className={`nav-link dropdown-toggle ${
                  isDropdownActive("reports") ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownToggle("reports");
                }}
              >
                <i className="bi bi-bar-chart me-2"></i>
                {isOpen && <span>Reports</span>}
              </a>
              <div
                className={`dropdown-menu bg-transparent border-0 ${
                  isDropdownActive("reports") ? "show" : ""
                }`}
              >
                <Link
                  to="/team/create-report"
                  className={`dropdown-item ${isLinkActive(
                    "/team/create-report"
                  )}`}
                >
                  Create Report
                </Link>
                <Link
                  to="/team/manage-reports"
                  className={`dropdown-item ${isLinkActive(
                    "/team/manage-reports"
                  )}`}
                >
                  Manage Reports
                </Link>
              </div>
            </div> */}

          <Link
            to="/team/team-notification"
            className={`nav-item nav-link ${isLinkActive(
              "/team/team-notification"
            )}`}
          >
            <i className="bi bi-bell me-2"></i>
            {isOpen && <span>Notification</span>}
          </Link>


          <Link
            to="/team/team-documents"
            className={`nav-item nav-link ${isLinkActive(
              "/team/team-documents"
            )}`}
          >
            <i className="bi bi-bell me-2"></i>
            {isOpen && <span>Documents</span>}
          </Link>

          <Link
            to="/team/change-password"
            className={`nav-item nav-link ${isLinkActive(
              "/team/change-password"
            )}`}
          >
            <i className="bi bi-key me-2"></i>
            {isOpen && <span>Change Password</span>}
          </Link>

          {/* <Link
            to="/logout"
            className={`nav-item nav-link text-danger ${isLinkActive(
              "/logout"
            )}`}
          > */}
            <button
              onClick={handleLogout}
              className="nav-item nav-link text-danger"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              {isOpen && <span>Logout</span>}
            </button>
         
          {/* </Link> */}
        </div>
      </nav>
    </div>
  );
};

export default TeamSidebar;
