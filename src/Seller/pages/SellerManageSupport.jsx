import React, { useState } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth] = useState(window.innerWidth);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // ---------------------------
  // Support / Issue Data
  // ---------------------------
  const issues = [
    {
      id: 1,
      issueType: "Technical",
      subject: "Login not working",
      description: "Unable to login with valid credentials",
      attachment: "screenshot.png",
      seller: "screenshot",
      team: "Technical",

      Issuestatus: "Pending",
    },
    {
      id: 2,
      issueType: "Billing",
      subject: "Invoice mismatch",
      description: "Incorrect amount shown in invoice",
      attachment: "",
      seller: "screenshot",
      team: "Billing",
      Issuestatus: "In Progress",
    },
    {
      id: 3,
      issueType: "General",
      subject: "Feature request",
      description: "Need bulk upload option",
      attachment: "request.pdf",
      seller: "screenshot",
      team: "Support",
      Issuestatus: "Closed",
    },
  ];

  const [selectedIssues, setSelectedIssues] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedIssues((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className="content flex-grow-1"
        style={{
          marginLeft:
            windowWidth >= 992
              ? isSidebarOpen
                ? 250
                : 95
              : isSidebarOpen
              ? 220
              : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="row ">
            <div className="bg-white p-3 rounded shadow-sm ">
              <div className="row align-items-center">
                {/* Left: Title */}
                <div className="col-md-6">
                  <h5 className="m-0">Support </h5>
                </div>

                {/* Right: Add Support Button */}
                <div className="col-md-6 text-md-end mt-2 mt-md-0">
                  <Link to="/seller/add-support" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2 mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                {/* Search */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>

                {/* Seller */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select">
                    <option value="">Select Seller</option>
                    <option>Seller A</option>
                    <option>Seller B</option>
                    <option>Seller C</option>
                  </select>
                </div>

                {/* Team */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select">
                    <option value="">Select Team</option>
                    <option>Technical</option>
                    <option>Billing</option>
                    <option>Support</option>
                  </select>
                </div>

                {/* Issue Type */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select">
                    <option value="">Issue Type</option>
                    <option>Technical</option>
                    <option>Billing</option>
                    <option>General</option>
                    <option>Feature Request</option>
                  </select>
                </div>

                {/* Issue Status */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select">
                    <option value="">Issue Status</option>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Pending</option>
                    <option>Closed</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="col-lg-2 col-md-6 col-sm-12 d-flex">
                  <button className="btn btn-success me-2">
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border">
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Issue Type</th>
                      <th>Subject</th>
                      <th>Description</th>
                      <th>Attachments</th>
                      <th>Seller</th>
                      <th>Team</th>
                      <th>Issue Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {issues.map((issue, index) => (
                      <tr key={issue.id}>
                        <td>{index + 1}</td>
                        <td>{issue.issueType}</td>
                        <td>{issue.subject}</td>
                        <td>{issue.description}</td>

                        <td>
                          {issue.attachment ? (
                            <a href="#" className="text-primary">
                              <i className="bi bi-paperclip me-1"></i> View
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>

                        <td>{issue.seller}</td>
                        <td>{issue.team}</td>

                        <td>
                          <span
                            className={`badge ${
                              issue.Issuestatus === "Pending"
                                ? "bg-danger"
                                : issue.Issuestatus === "In Progress"
                                ? "bg-warning text-dark"
                                : "bg-success"
                            }`}
                          >
                            {issue.Issuestatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
