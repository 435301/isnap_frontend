import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authAction";
import logo from "../assets/admin/images/logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);

  // Active link check
  const isLinkActive = (path) => {
    if (Array.isArray(path)) {
      return path.includes(location.pathname) ? "active" : "";
    }
    return location.pathname === path ? "active" : "";
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  // Dropdown route groups
  useEffect(() => {
    const dropdownRoutes = {
      "master-data": [
        "/manage-digital-marketing-price",
        "/market-place-type",
        "/manage-marketplace",
        "/manage-product-listing",
        "/manage-commission",
        "/add-marketplacetype",
        "/manage-billing",
        "/manage-state",
        "/manage-business-type",
        "/add-business-type",
        "/manage-lead-source",
        "/manage-document-category",
        "/manage-document-type",
        "/manage-issue-types",
      ],
      serviceTypes: [
        "/manage-service-types",
        "/manage-services",
        "/create-service-type",
        "/add-service",
        "/create-service-activities",
        "/manage-service-activities",
      ],
      sellers: ["/manage-sellers", "/create-seller", "/view-seller"],
      team: [
        "/manage-team",
        "/add-team",
        "/manage-roles",
        "/manage-departments",
        "/manage-sub-departments",
        "create-department",
        "/add-role",
        "/latest-updates",
        "/manage-updates",
      ],
      tasks: ["/manage-task", "/create-task", "/rejected-tasks"],
      leads: ["/manage-leads", "/create-lead", "/view-lead"],
      notifications: ["/view-notifications", "/notification-settings"],
      orders: [
        "/add-orders",
        "/add-sub-orders",
        "/manage-orders",
        "/manage-sub-orders",
        "/order-details",
      ],

      products: [
        "/add-product",
        "/manage-products",
        "/bulk-upload",
        "/reports",
      ],
    };

    let currentDropdown = null;
    Object.keys(dropdownRoutes).forEach((key) => {
      if (
        dropdownRoutes[key].some((route) => location.pathname.startsWith(route))
      ) {
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

  // ------------------ Role-based Sidebar ------------------
  // Define allowed menus by role
  const allowedMenus = {
    Admin: [
      "dashboard",
      "master-data",
      "serviceTypes",
      "leads",
      "sellers",
      "team",
      "tasks",
      "products",
      "notifications",
      "change-password",
      "support",
      "add-support",

      "logout",
    ],
    Team: ["dashboard", "leads", "tasks", "change-password", "logout"],
    Seller: ["dashboard", "products", "change-password", "logout"],
  };

  // Get role, fallback to empty so it won’t render anything wrong
  const role = user?.roleName || "team"; // defaulting to team if null
  console.log("role", role);
  const menusToShow = allowedMenus[role] || [];

  return (
    <div
      className={`sidebar pb-3 ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <nav className="navbar">
        <Link to="/" className="navbar-brand ms-4 mb-3">
          <img src={logo} alt="Logo" className="mx-4" />
        </Link>

        <div className="navbar-nav w-100">
          {/* Dashboard */}
          {menusToShow.includes("dashboard") && (
            <Link
              to="/dashboard"
              className={`nav-item nav-link ${isLinkActive("/dashboard")}`}
            >
              <i className="bi bi-speedometer2 me-2"></i>
              {isOpen && <span>Dashboard</span>}
            </Link>
          )}

          {/* Master Data */}
          <div
            className={`nav-item dropdown ${
              isDropdownActive("master-data") ? "show" : ""
            }`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${
                isDropdownActive("master-data") ? "active" : ""
              }`}
              onClick={() => handleDropdownToggle("master-data")}
              aria-expanded={isDropdownActive("master-data")}
            >
              <i className="bi bi-folder2-open me-2"></i>
              {isOpen && <span>Master Data</span>}
            </a>
            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isDropdownActive("master-data") ? "show" : ""
              }`}
            >
              <Link
                to="/market-place-type"
                className={`dropdown-item ${isLinkActive(
                  "/market-place-type"
                )}`}
              >
                Marketplace Types
              </Link>
              <Link
                to="/manage-marketplace"
                className={`dropdown-item ${isLinkActive(
                  "/manage-marketplace"
                )}`}
              >
                Marketplaces
              </Link>
              <Link
                to="/manage-product-listing"
                className={`dropdown-item ${isLinkActive(
                  "/manage-product-listing"
                )}`}
              >
                Product Listing
              </Link>
              <Link
                to="/manage-commission"
                className={`dropdown-item ${isLinkActive(
                  "/manage-commission"
                )}`}
              >
                Commission Pricing
              </Link>
              <Link
                to="/manage-billing"
                className={`dropdown-item ${isLinkActive("/manage-billing")}`}
              >
                Billing Cycle
              </Link>
              <Link
                to="/manage-state"
                className={`dropdown-item ${isLinkActive("/manage-state")}`}
              >
                States
              </Link>
              <Link
                to="/manage-digital-marketing-price"
                className={`dropdown-item ${isLinkActive(
                  "/manage-digital-marketing-price"
                )}`}
              >
                {" "}
                Digital Market Pricing
              </Link>
              <Link
                to="/manage-business-type"
                className={`dropdown-item ${isLinkActive(
                  "/manage-business-type"
                )}`}
              >
                Business Types
              </Link>
              <Link
                to="/manage-lead-source"
                className={`dropdown-item ${isLinkActive(
                  "/manage-lead-source"
                )}`}
              >
                Lead Source
              </Link>
              <Link
                to="/manage-document-category"
                className={`dropdown-item ${isLinkActive(
                  "/manage-document-category"
                )}`}
              >
                Document Category
              </Link>
              <Link
                to="/manage-document-type"
                className={`dropdown-item ${isLinkActive(
                  "/manage-document-type"
                )}`}
              >
                Document Type
              </Link>
               <Link
                to="/manage-issue-type"
                className={`dropdown-item ${isLinkActive(
                  "/manage-issue-type"
                )}`}
              >
                Issue Type
              </Link>
            </div>
          </div>

          {/* Service Types */}
          <div
            className={`nav-item dropdown ${
              isDropdownActive("serviceTypes") ? "show" : ""
            }`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${
                isDropdownActive("serviceTypes") ? "active" : ""
              }`}
              onClick={() => handleDropdownToggle("serviceTypes")}
            >
              <i className="bi bi-gear-fill me-2"></i>
              {isOpen && <span>Service Types</span>}
            </a>
            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isDropdownActive("serviceTypes") ? "show" : ""
              }`}
            >
              <Link
                to="/manage-services"
                className={`dropdown-item ${isLinkActive("/manage-services")}`}
              >
                Service Categories
              </Link>
              <Link
                to="/manage-service-types"
                className={`dropdown-item ${isLinkActive(
                  "/manage-service-types"
                )}`}
              >
                Service Types
              </Link>
              <Link
                to="/manage-service-activities"
                className={`dropdown-item ${isLinkActive(
                  "/manage-service-activities"
                )}`}
              >
                Service Activities
              </Link>
            </div>
          </div>

          {/* Leads */}
          {menusToShow.includes("leads") && (
            <div
              className={`nav-item dropdown ${
                isDropdownActive("leads") ? "show" : ""
              }`}
            >
              <a
                href="#!"
                className={`nav-link dropdown-toggle ${
                  isDropdownActive("leads") ? "active" : ""
                }`}
                onClick={() => handleDropdownToggle("leads")}
              >
                <i className="bi bi-person-plus-fill me-2"></i>
                {isOpen && <span>Leads</span>}
              </a>
              <div
                className={`dropdown-menu bg-transparent border-0 ${
                  isDropdownActive("leads") ? "show" : ""
                }`}
              >
                <Link
                  to="/create-lead"
                  className={`dropdown-item ${isLinkActive("/create-lead")}`}
                >
                  Create New Lead
                </Link>
                <Link
                  to="/manage-leads"
                  className={`dropdown-item ${isLinkActive("/manage-leads")}`}
                >
                  Manage Leads
                </Link>
                <Link
                  to="/leads-status"
                  className={`dropdown-item ${isLinkActive("/leads-status")}`}
                >
                  Leads Status
                </Link>
              </div>
            </div>
          )}

          {/* Sellers */}
          <div
            className={`nav-item dropdown ${
              isDropdownActive("sellers") ? "show" : ""
            }`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${
                isDropdownActive("sellers") ? "active" : ""
              }`}
              onClick={() => handleDropdownToggle("sellers")}
            >
              <i className="bi bi-person-lines-fill me-2"></i>
              {isOpen && <span>Sellers</span>}
            </a>
            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isDropdownActive("sellers") ? "show" : ""
              }`}
            >
              <Link
                to="/manage-sellers"
                className={`dropdown-item ${isLinkActive("/manage-sellers")}`}
              >
                Manage Sellers
              </Link>
              <Link
                to="/create-seller"
                className={`dropdown-item ${isLinkActive("/create-seller")}`}
              >
                Create Seller
              </Link>
              <Link
                to="/seller/invoice-seller"
                className={`dropdown-item ${isLinkActive(
                  "/manage-service-activities"
                )}`}
              >
                Invoice
              </Link>
            </div>
          </div>

          {/* Team */}
          <div
            className={`nav-item dropdown ${
              isDropdownActive("team") ? "show" : ""
            }`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${
                isDropdownActive("team") ? "active" : ""
              }`}
              onClick={() => handleDropdownToggle("team")}
            >
              <i className="bi bi-people-fill me-2"></i>
              {isOpen && <span>Team</span>}
            </a>
            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isDropdownActive("team") ? "show" : ""
              }`}
            >
              <Link
                to="/manage-wings"
                className={`dropdown-item ${isLinkActive("/manage-wings")}`}
              >
                Wings
              </Link>
              <Link
                to="/manage-departments"
                className={`dropdown-item ${isLinkActive(
                  "/manage-departments"
                )}`}
              >
                Departments
              </Link>
              <Link
                to="/manage-sub-departments"
                className={`dropdown-item ${isLinkActive(
                  "/manage-sub-departments"
                )}`}
              >
                Sub Departments
              </Link>
              <Link
                to="/manage-roles"
                className={`dropdown-item ${isLinkActive("/manage-roles")}`}
              >
                Roles
              </Link>
              <Link
                to="/manage-roles-features"
                className={`dropdown-item ${isLinkActive(
                  "//manage-roles-features"
                )}`}
              >
                Roles Features
              </Link>

              <Link
                to="/manage-team"
                className={`dropdown-item ${isLinkActive("/manage-team")}`}
              >
                Teams
              </Link>
              {/* <Link to="/latest-updates" className={`dropdown-item ${isLinkActive("/latest-updates")}`}>Latest Updates</Link> */}
              <Link
                to="/manage-updates"
                className={`dropdown-item ${isLinkActive("/manage-updates")}`}
              >
                Manage Updates
              </Link>
            </div>
          </div>

    
          {/* Products */}
          <div
            className={`nav-item dropdown ${
              isDropdownActive("products") ? "show" : ""
            }`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${
                isDropdownActive("products") ? "active" : ""
              }`}
              onClick={() => handleDropdownToggle("products")}
            >
              <i className="bi bi-box-seam me-2"></i>
              {isOpen && <span>Products</span>}
            </a>
            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isDropdownActive("products") ? "show" : ""
              }`}
            >
              <Link
                to="/add-product"
                className={`dropdown-item ${isLinkActive("/add-product")}`}
              >
                Add Product
              </Link>
              <Link
                to="/manage-products"
                className={`dropdown-item ${isLinkActive("/manage-products")}`}
              >
                Manage Products
              </Link>
              <Link
                to="/bulk-upload"
                className={`dropdown-item ${isLinkActive("/bulk-upload")}`}
              >
                Bulk Upload
              </Link>
              <Link
                to="/reports"
                className={`dropdown-item ${isLinkActive("/reports")}`}
              >
                Reports
              </Link>
            </div>
          </div>
          {/* Orders */}
          <div
            className={`nav-item dropdown ${
              isDropdownActive("orders") ? "show" : ""
            }`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${
                isDropdownActive("orders") ? "active" : ""
              }`}
              onClick={() => handleDropdownToggle("orders")}
            >
              <i className="bi bi-receipt me-2"></i>
              {isOpen && <span>Orders</span>}
            </a>

            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isDropdownActive("orders") ? "show" : ""
              }`}
            >
              {[
                { path: "/manage-orders", label: "Orders" },
                { path: "/manage-sub-orders", label: "Sub Orders" },
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

          {/* Notifications */}
          <div
            className={`nav-item dropdown ${
              isDropdownActive("notifications") ? "show" : ""
            }`}
          >
            <a
              href="#!"
              className={`nav-link dropdown-toggle ${
                isDropdownActive("notifications") ? "active" : ""
              }`}
              onClick={() => handleDropdownToggle("notifications")}
            >
              <i className="bi bi-bell me-2"></i>
              {isOpen && <span>Notifications</span>}
            </a>
            <div
              className={`dropdown-menu bg-transparent border-0 ${
                isDropdownActive("notifications") ? "show" : ""
              }`}
            >
              <Link
                to="/view-notifications"
                className={`dropdown-item ${isLinkActive(
                  "/view-notifications"
                )}`}
              >
                View Notifications
              </Link>
              <Link
                to="/notification-settings"
                className={`dropdown-item ${isLinkActive(
                  "/notification-settings"
                )}`}
              >
                Settings
              </Link>
            </div>
          </div>
          {/* Support */}
          {menusToShow.includes("support") && (
            <Link
              to="/support"
              className={`nav-item nav-link ${isLinkActive("/support")}`}
            >
              <i className="bi bi-headset me-2"></i>
              {isOpen && <span>Support</span>}
            </Link>
          )}
          {/* Change Password */}
          {menusToShow.includes("change-password") && (
            <Link
              to="/change-password"
              className={`nav-item nav-link ${isLinkActive(
                "/change-password"
              )}`}
            >
              <i className="bi bi-key me-2"></i>
              {isOpen && <span>Change Password</span>}
            </Link>
          )}

          {/* Logout */}
          {menusToShow.includes("logout") && (
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
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
