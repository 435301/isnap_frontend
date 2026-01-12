import React from "react";
import userImg from '../assets/admin/images/user.png';
import { useNavigate } from "react-router-dom";

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand bg-white navbar-light sticky-top px-4 py-3">
      {/* Sidebar Toggle */}
      <a
        href="#"
        className="sidebar-toggler flex-shrink-0"
        onClick={(e) => {
          e.preventDefault();
          onToggleSidebar();
        }}
      >
        <i className="fa fa-bars"></i>
      </a>

      {/* Welcome Message */}
      <div className="ms-3">
        <h5 className="mb-0 fw-bold">
          Welcome to <span className="text-success">Isnap Task Management</span>
        </h5>
      </div>

      {/* Right Section */}
      <div className="navbar-nav align-items-center ms-auto d-flex gap-3">

        {/* Add Buttons */}
        <div className="d-flex gap-2 d-none d-md-block">
          <button className="btn btn-task btn-sm me-1" onClick={()=> navigate("/add-team")}>
            <i className="bi bi-plus-circle me-1"></i> Add Team
          </button>
          <button className="btn btn-lead btn-sm me-1" onClick={()=> navigate("/create-lead")}>
            <i className="bi bi-plus-circle me-1"></i> Add Lead
          </button>
          <button className="btn btn-invoice btn-sm" onClick={()=> navigate("/create-seller")}>
            <i className="bi bi-plus-circle me-1"></i> Add Seller
          </button>
        </div>



        {/* Notification */}
        <div className="nav-item dropdown">
          <a href="#" className="nav-link" data-bs-toggle="dropdown">
            <i className="bi bi-bell fs-5 position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </i>
          </a>
          <ul className="dropdown-menu dropdown-menu-end bg-light border-0 m-0">
            <li>
              <a href="#" className="dropdown-item">
                <h6 className="fw-normal mb-0">Profile updated</h6>
                <small>15 mins ago</small>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a href="#" className="dropdown-item">
                <h6 className="fw-normal mb-0">New user added</h6>
                <small>30 mins ago</small>
              </a>
            </li>
          </ul>
        </div>



        {/* User Avatar */}
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link d-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            <img
              className="rounded-circle me-2"
              src={userImg}
              alt="user"
              style={{ width: "40px", height: "40px" }}
            />
          </a>
          <ul className="dropdown-menu dropdown-menu-end bg-white border-0 p-3">
            <li>
              <a href="#" className="dropdown-item">
                <i className="bi bi-person me-2"></i> My Account
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item text-danger">
                <i className="bi bi-box-arrow-right me-2"></i> Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
