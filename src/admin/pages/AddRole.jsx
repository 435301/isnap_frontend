// src/pages/roles/AddRole.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createRole } from "../../redux/actions/roleActions";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchDepartments } from "../../redux/actions/departmentActions";
import { fetchWings } from "../../redux/actions/wingAction";

const AddRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { wings = [] } = useSelector((state) => state.wings || {});
  const { departments = [] } = useSelector((state) => state.department || {});
  console.log('wings', departments)
  const [formData, setFormData] = useState({
    wingId: "",
    departmentId: "",
    roleTitle: "",
    task: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchWings());
    dispatch(fetchDepartments())
  }, [dispatch]);

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
      [name]: name === "status" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.roleTitle.trim()) validationErrors.roleTitle = "Role title is required";
    if (!formData.wingId.trim()) validationErrors.wingId = "Wing Name is required";
    if (!formData.departmentId.trim()) validationErrors.departmentId = "Department Name  is required";
    if (!formData.status) {
      validationErrors.status = "status is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(createRole(formData));
      setFormData({ roleTitle: "", task: "", status: "", wingName: "", departmentName: "" });
      setErrors({});
      toast.success("Role created successfully!");
      navigate("/manage-roles");
    } catch (error) {
      // Error is now a string from action
      toast.error(error);
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
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      Wing <span className="text-danger">*</span>
                    </label>
                    <select
                      name="wingId"
                      value={formData.wingId}
                      onChange={handleChange}
                      className={`form-select ${errors.wingId ? "is-invalid" : ""}`}
                    >
                      <option value="">Select Wing</option>
                      {wings.map((wing) => (
                        <option key={wing.id} value={wing.id}>
                          {wing.title}
                        </option>
                      ))}
                    </select>
                    {errors.wingId && (
                      <div className="invalid-feedback">{errors.wingId}</div>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">
                      Department <span className="text-danger">*</span>
                    </label>
                    <select
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleChange}
                      className={`form-select ${errors.departmentId ? "is-invalid" : ""}`}
                    >
                      <option value="">Select Department</option>
                      {departments.map((department) => (
                        <option key={department?.id} value={department.id}>
                          {department?.departmentName}
                        </option>
                      ))}

                    </select>
                    {errors.departmentId && (
                      <div className="invalid-feedback">{errors.departmentId}</div>
                    )}
                  </div>

                     <div className="col-md-4">
                    <label className="form-label">
                     Sub Department
                    </label>
                    <select
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleChange}
                      className={`form-select ${errors.departmentId ? "is-invalid" : ""}`}
                    >
                      <option value="">Select Sub Department</option>
                      {departments.map((department) => (
                        <option key={department?.id} value={department.id}>
                          {department?.departmentName}
                        </option>
                      ))}

                    </select>
                    {errors.departmentId && (
                      <div className="invalid-feedback">{errors.departmentId}</div>
                    )}
                  </div>
                  
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
                    {errors.roleTitle && (
                      <div className="invalid-feedback">{errors.roleTitle}</div>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={`form-select ${errors.status ? "is-invalid" : ""}`}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                    {errors.status && (
                      <div className="invalid-feedback">{errors.status}</div>
                    )}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddRole;
