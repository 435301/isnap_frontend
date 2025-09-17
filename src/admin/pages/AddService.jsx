import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createCategory, fetchCategories } from "../../redux/actions/categoryActions";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const AddService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    serviceCategoryName: "",
    serviceCategoryCode: "",
    serviceStatus: true,
  });

  const [errors, setErrors] = useState({});

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
      [name]: name === "serviceStatus" ? value === "true" : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.serviceCategoryName.trim())
      validationErrors.serviceCategoryName = "Service Category Name is required.";

    if (!formData.serviceCategoryCode.trim())
      validationErrors.serviceCategoryCode = "Service Category Code is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(createCategory(formData)); // redux will handle success message
      dispatch(fetchCategories()); // refresh list
      navigate("/manage-services"); // redirect
    } catch (error) {
      setErrors({ server: error.response?.data?.message || error.message || "Failed to create category" });
    }
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content flex-grow-1">
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid px-4 pt-3">
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Add Service Category</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/manage-services" className="btn btn-new-lead">
                    Manage Services
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
                      Category Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="serviceCategoryName"
                      value={formData.serviceCategoryName}
                      onChange={handleChange}
                      className={`form-control ${errors.serviceCategoryName ? "is-invalid" : ""}`}
                      placeholder="Category Name"
                    />
                    {errors.serviceCategoryName && (
                      <div className="invalid-feedback">{errors.serviceCategoryName}</div>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Category Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="serviceCategoryCode"
                      value={formData.serviceCategoryCode}
                      onChange={handleChange}
                      className={`form-control ${errors.serviceCategoryCode ? "is-invalid" : ""}`}
                      placeholder="Category Code"
                    />
                    {errors.serviceCategoryCode && (
                      <div className="invalid-feedback">{errors.serviceCategoryCode}</div>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="serviceStatus"
                      value={formData.serviceStatus}
                      onChange={handleChange}
                      className={`form-select ${errors.serviceStatus ? "is-invalid" : ""}`}
                    >
                      <option value="">Select Status</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>

                  <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                    <button type="submit" className="btn btn-success px-4 me-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate("/manage-services")}
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

export default AddService;
