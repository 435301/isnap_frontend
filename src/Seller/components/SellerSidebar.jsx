import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../admin/assets/admin/images/logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/authAction";

const SellerSidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const dropdownRoutes = {
      reports: ["/seller/create-report", "/seller/manage-reports"],
      mou: ["/seller/mou-1", "/seller/mou-2", "/seller/mou-3", "/seller/mou-4"], // ✅ Added MOU routes
    };

    const matchedDropdown = Object.keys(dropdownRoutes).find((key) =>
      dropdownRoutes[key].some((path) => location.pathname.startsWith(path))
    );

    setActiveDropdown(matchedDropdown || null);
  }, [location.pathname]);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // ✅ Supports single & multiple paths
  const isLinkActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some((path) => location.pathname.startsWith(path))
        ? "active"
        : "";
    }
    return location.pathname.startsWith(paths) ? "active" : "";
  };

  const isDropdownActive = (dropdown) => activeDropdown === dropdown;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/seller/login");
  };

  return (
    <div
      className={`sidebar pb-3 ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar-brand ms-4 mb-3">
          <img src={logo} alt="Logo" className="mx-4" />
        </Link>

        <div className="navbar-nav w-100">
          {/* Dashboard */}
          <Link
            to="/seller/dashboard"
            className={`nav-item nav-link ${isLinkActive("/seller/dashboard")}`}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            {isOpen && <span>Dashboard</span>}
          </Link>

          {/* Tasks */}
          <Link
            to="/seller/task"
            className={`nav-item nav-link ${isLinkActive("/seller/task")}`}
          >
            <i className="bi bi-list-task me-2"></i>
            {isOpen && <span>Tasks</span>}
          </Link>

          {/* Business Info */}
          <Link
            to="/seller/business-information"
            className={`nav-item nav-link ${isLinkActive([
              "/seller/seller-tasks",
              "/seller/business-information",
            ])}`}
          >
            <i className="bi bi-briefcase me-2"></i>
            {isOpen && <span>Business Details</span>}
          </Link>


          {/*  MOU Dropdown */}
          <div className={`nav-item ${isLinkActive("/seller/mou-1")}`}>
            <Link to="/seller/mou-1" className="nav-link">
              <i className="bi bi-file-earmark-text me-2"></i>
              {isOpen && <span>MOU's</span>}
            </Link>
          </div>

          {/*  Invoices Dropdown */}
          <div className={`nav-item ${isLinkActive("/seller/invoice-seller")}`}>
            <Link to="/seller/invoice-seller-list" className="nav-link">
              <i className="bi bi-file-earmark-text me-2"></i>
              {isOpen && <span>Invoice</span>}
            </Link>
          </div>
          {/*  Services */}
          <div
            className={`nav-item ${isLinkActive("/seller/services-seller")}`}
          >
            <Link to="/seller/services-seller-list" className="nav-link">
              <i className="bi bi-file-earmark-text me-2"></i>
              {isOpen && <span>Services</span>}
            </Link>
          </div>
          {/* Products */}
          <div
            className={`nav-item dropdown ${isDropdownActive("products") ? "show" : ""
              }`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${isDropdownActive("products") ? "active" : ""
                }`}
              onClick={() => handleDropdownToggle("products")}
            >
              <i className="bi bi-box-seam me-2"></i>
              {isOpen && <span>Products</span>}
            </a>
            <div
              className={`dropdown-menu bg-transparent border-0 ${isDropdownActive("products") ? "show" : ""
                }`}
            >
              <Link
                to="/seller/add-product"
                className={`dropdown-item ${isLinkActive(
                  "/seller/add-product"
                )}`}
              >
                Add Product
              </Link>
              <Link
                to="/seller/manage-products"
                className={`dropdown-item ${isLinkActive(
                  "/seller/manage-products"
                )}`}
              >
                Manage Products
              </Link>
              <Link
                to="/seller/bulk-upload"
                className={`dropdown-item ${isLinkActive("/bulk-upload")}`}
              >
                Bulk Upload
              </Link>
              <Link
                to="/seller/reports"
                className={`dropdown-item ${isLinkActive("/reports")}`}
              >
                Reports
              </Link>
              <Link
                to="/seller/marketplace-report"
                className={`dropdown-item ${isLinkActive(
                  "/marketplace-report"
                )}`}
              >
                Marketplace Reports
              </Link>
              <Link
                to="/seller/marketplace-services"
                className={`dropdown-item ${isLinkActive(
                  "/marketplace-services"
                )}`}
              >
                Marketplace services
              </Link>
            </div>
          </div>

          {/* orders */}
          <div
            className={`nav-item dropdown ${isDropdownActive("orders") ? "show" : ""
              }`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${isDropdownActive("orders") ? "active" : ""
                }`}
              onClick={() => handleDropdownToggle("orders")}
            >
              <i className="bi bi-receipt me-2"></i>
              {isOpen && <span>Orders</span>}
            </a>

            <div
              className={`dropdown-menu bg-transparent border-0 ${isDropdownActive("orders") ? "show" : ""
                }`}
            >
              {[
                { path: "/seller/manage-orders", label: "Orders" },
                { path: "/seller/manage-sub-orders", label: "Sub Orders" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`dropdown-item ${isLinkActive(item.path)}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Change Password */}
          <Link
            to="/seller/change-password"
            className={`nav-item nav-link ${isLinkActive(
              "/seller/change-password"
            )}`}
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

export default SellerSidebar;
