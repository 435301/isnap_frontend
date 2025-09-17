import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { createCommission } from "../../redux/actions/commissionActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommissionPricing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    percentage: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);

  // Handle sidebar toggle on window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Commission Title is required";
    if (!formData.percentage.trim()) newErrors.percentage = "Percentage is required";
    else if (isNaN(formData.percentage) || formData.percentage <= 0)
      newErrors.percentage = "Enter a valid percentage";
    if (!formData.status.trim()) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const payload = {
          commissionTitle: formData.title,
          percentage: formData.percentage,
          status: formData.status === "Active" ? 1 : 0,
        };

        const res = await dispatch(createCommission(payload));

        if (res?.id) {
          toast.success("Commission created successfully ✅");
          navigate("/manage-commission");
        } else {
          toast.error(res?.message || "Commission already exists ❌");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message || "Failed to create commission ❌");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : isSidebarOpen ? 220 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <div className="container-fluid px-4 pt-3">
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Create Commission Pricing</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/manage-commission" className="btn btn-new-lead">
                    Manage Commission
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                {errors.api && <div className="alert alert-danger">{errors.api}</div>}

                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      Commission Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      placeholder="Enter Commission Title"
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Percentage (%) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      name="percentage"
                      value={formData.percentage}
                      onChange={handleChange}
                      className={`form-control ${errors.percentage ? "is-invalid" : ""}`}
                      placeholder="Enter Percentage"
                    />
                    {errors.percentage && (
                      <div className="invalid-feedback">{errors.percentage}</div>
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
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    {errors.status && (
                      <div className="invalid-feedback">{errors.status}</div>
                    )}
                  </div>

                  <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                    <button
                      type="submit"
                      className="btn btn-success me-2 px-4"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate("/manage-commission")}
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

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CommissionPricing;
