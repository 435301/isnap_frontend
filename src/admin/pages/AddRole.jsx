// src/admin/pages/AddRole.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createRole } from "../../redux/actions/roleActions"; // ✅ only import createRole
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const AddRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [formData, setFormData] = useState({
    roleTitle: "",
    task: "",
    status: true,
  });

  const [errors, setErrors] = useState({});

  // Sidebar toggle on resize
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.roleTitle.trim()) validationErrors.roleTitle = "Role title is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(createRole(formData)); // ✅ call Redux action
      setFormData({ roleTitle: "", task: "", status: true });
      setErrors({});
      navigate("/manage-roles"); // ✅ navigate without alert
    } catch (error) {
      setErrors({ server: error.response?.data?.error || "Role title must contain only alphabets and spaces." });
    }

  };

  return (
  <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft:
            windowWidth >= 992
              ? isSidebarOpen
                ? 259
                : 95
              : isSidebarOpen
              ? 220
              : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid px-4 pt-3">
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Add Role</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/manage-roles" className="btn btn-new-lead">
                    Manage Roles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                {errors.server && <div className="alert alert-danger">{errors.server}</div>}
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      Role Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="roleTitle"
                      value={formData.roleTitle}
                      onChange={handleChange}
                      className={`form-control ${errors.roleTitle ? "is-invalid" : ""}`}
                      placeholder="Role Title"
                    />
                    {errors.roleTitle && <div className="invalid-feedback">{errors.roleTitle}</div>}
                  </div>

                  {/* <div className="col-md-4">
                    <label className="form-label">Task</label>
                    <input
                      type="text"
                      name="task"
                      value={formData.task}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Task"
                    />
                  </div> */}

                  <div className="col-md-4">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  </div>

                  <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                    <button type="submit" className="btn btn-success px-4 me-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate("/manage-roles")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
