import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
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
      status: "Pending",
    },
    {
      id: 2,
      issueType: "Billing",
      subject: "Invoice mismatch",
      description: "Incorrect amount shown in invoice",
      attachment: "",
      status: "In Progress",
    },
    {
      id: 3,
      issueType: "General",
      subject: "Feature request",
      description: "Need bulk upload option",
      attachment: "request.pdf",
      status: "Closed",
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
            <div className="bg-white p-3 rounded shadow-sm mb-3">
              <div className="row align-items-center">
                {/* Left: Title */}
                <div className="col-md-6">
                  <h5 className="m-0">Support </h5>
                </div>

                {/* Right: Add Support Button */}
                <div className="col-md-6 text-md-end mt-2 mt-md-0">
                  <Link to="/add-support" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Support
                  </Link>
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
                      <th>Status</th>
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
                              <i className="bi bi-paperclip me-1"></i>
                              View
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              issue.status === "Pending"
                                ? "bg-danger"
                                : issue.status === "In Progress"
                                ? "bg-warning text-dark"
                                : "bg-success"
                            }`}
                          >
                            {issue.status}
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
