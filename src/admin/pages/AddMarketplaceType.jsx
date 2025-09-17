import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createMarketType } from "../../redux/actions/marketTypeActions";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const AddMarketType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    marketTypePlaceName: "",
    marketTypeStatus: "Active",
  });
  const [backendError, setBackendError] = useState("");

  const [errors, setErrors] = useState({});

  // ✅ Get error state from redux
  const { error } = useSelector((state) => state.marketType || {});

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setBackendError(""); // clear old errors

  const validationErrors = {};
  if (!formData.marketTypePlaceName.trim())
    validationErrors.marketTypePlaceName = "Marketplace Type Name is required.";
  if (!formData.marketTypeStatus)
    validationErrors.marketTypeStatus = "Status is required.";

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    await dispatch(createMarketType(formData));
    navigate("/market-place-type");
  } catch (err) {
    setBackendError(err.message); // ✅ show only here
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
                  <h5 className="form-title m-0">Add Market Type</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/market-place-type" className="btn btn-new-lead">
                    Manage Market Type
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              {/* ✅ Show backend error on Add page */}
              {error && (
                <div className="alert alert-danger mb-3">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      Marketplace Type Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="marketTypePlaceName"
                      value={formData.marketTypePlaceName}
                      onChange={handleChange}
                      className={`form-control ${errors.marketTypePlaceName ? "is-invalid" : ""}`}
                      placeholder="Enter Market Type Name"
                    />
                    {errors.marketTypePlaceName && (
                      <div className="invalid-feedback">{errors.marketTypePlaceName}</div>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="marketTypeStatus"
                      value={formData.marketTypeStatus}
                      onChange={handleChange}
                      className={`form-select ${errors.marketTypeStatus ? "is-invalid" : ""}`}
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    {errors.marketTypeStatus && (
                      <div className="invalid-feedback">{errors.marketTypeStatus}</div>
                    )}
                  </div>

                  <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                    <button type="submit" className="btn btn-success px-4 me-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate("/market-place-type")}
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

export default AddMarketType;
