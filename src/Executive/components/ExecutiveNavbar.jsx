import React from "react";
import userImg from '../../admin/assets/admin/images/user.png';

const SellerNavbar = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand bg-white navbar-light sticky-top px-4 py-3">
      <a href="#" className="sidebar-toggler flex-shrink-0" onClick={(e) => { e.preventDefault(); onToggleSidebar(); }}>
        <i className="fa fa-bars"></i>
      </a>
      <div className="nav-item d-none d-lg-flex ms-3">
        <h4 className="page-title fs-18 fw-bold mb-0">
          Welcome to, <span className="text-success">Isnap Team Login</span>
        </h4>
      </div>
      <div className="navbar-nav align-items-center ms-auto d-flex gap-3">
        
        <div className="nav-item dropdown">
          <a href="#" className="nav-link" data-bs-toggle="dropdown">
            <i className="bi bi-bell fs-5 position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
            </i>
          </a>
          <ul className="dropdown-menu dropdown-menu-end bg-light border-0 m-0">
            <li><a href="#" className="dropdown-item"><h6 className="fw-normal mb-0">Profile updated</h6><small>15 minutes ago</small></a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a href="#" className="dropdown-item"><h6 className="fw-normal mb-0">New user added</h6><small>15 minutes ago</small></a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a href="#" className="dropdown-item text-center">See all notifications</a></li>
          </ul>
        </div>

        <div className="nav-item">
          <a href="#" className="nav-link"><i className="bi bi-moon fs-5"></i></a>
        </div>

        <div className="nav-item">
          <a href="#" className="nav-link"><i className="bi bi-gear fs-5"></i></a>
        </div>

        <div className="nav-item dropdown">
          <a href="#" className="nav-link d-flex align-items-center" data-bs-toggle="dropdown">
            <img className="rounded-circle me-2" src={userImg} alt="user" style={{ width: "40px", height: "40px" }} />
          </a>
          <ul className="dropdown-menu dropdown-menu-end bg-white border-0 p-3" style={{ minWidth: "220px" }}>
            <li className="mb-2 px-2">Welcome!</li>
            <li><a href="#" className="dropdown-item d-flex align-items-center"><i className="bi bi-person me-2"></i> My Account</a></li>
            <li><a href="#" className="dropdown-item d-flex align-items-center"><i className="bi bi-wallet2 me-2"></i> Wallet: <strong className="ms-1">$89.25k</strong></a></li>
            <li><a href="#" className="dropdown-item d-flex align-items-center"><i className="bi bi-gear me-2"></i> Settings</a></li>
            <li><a href="#" className="dropdown-item d-flex align-items-center"><i className="bi bi-question-circle me-2"></i> Support</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a href="#" className="dropdown-item d-flex align-items-center"><i className="bi bi-lock me-2"></i> Lock Screen</a></li>
            <li><a href="#" className="dropdown-item d-flex align-items-center text-danger"><i className="bi bi-box-arrow-right me-2"></i> Sign Out</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SellerNavbar;
