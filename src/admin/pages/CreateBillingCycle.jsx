import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBillingCycle } from "../../redux/actions/billingActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BillingCycle = () => {
  const [formData, setFormData] = useState({
    billCycleTitle: "",
    status: "1",
    durationRequired:""
  });
  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsSidebarOpen(width >= 992);
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
    if (!formData.billCycleTitle.trim()) newErrors.billCycleTitle = "Title is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.durationRequired) newErrors.durationRequired = "Duration is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const result = await dispatch(createBillingCycle(formData));
        if (result && result.status) {
          navigate("/manage-billing", {
            state: { successMessage: "Billing cycle created successfully" },
          });
        } else if (result && !result.status && result.message) {
          // Show server message in toast if status is false
          toast.error(result.message);
        }
      } catch (err) {
        // Fallback for unexpected errors
        toast.error(err.response?.data?.message || err.message || "Failed to create billing cycle");
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
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="container-fluid px-4 pt-3">
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Create Billing Cycle</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/manage-billing" className="btn btn-new-lead">
                    Manage Billing Cycle
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label">
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="billCycleTitle"
                      value={formData.billCycleTitle}
                      onChange={handleChange}
                      className={`form-control ${errors.billCycleTitle ? "is-invalid" : ""}`}
                      placeholder="Enter Title"
                    />
                    {errors.billCycleTitle && <div className="invalid-feedback">{errors.billCycleTitle}</div>}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status} // formData.status is already 1 by default
                      onChange={handleChange}
                      className={`form-select ${errors.status ? "is-invalid" : ""}`}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                    {errors.status && <div className="invalid-feedback">{errors.status}</div>}

                  </div>

                    <div className="col-md-3">
                    <label className="form-label">
                      Duration Required <span className="text-danger">*</span>
                    </label>
                    <select
                      name="durationRequired"
                      value={formData.durationRequired} // formData.status is already 1 by default
                      onChange={handleChange}
                      className={`form-select ${errors.durationRequired ? "is-invalid" : ""}`}
                    >
                      <option value="">Select Duration</option>
                      <option value={1}>Required</option>
                      <option value={0}>Not Required</option>
                    </select>
                    {errors.durationRequired && <div className="invalid-feedback">{errors.durationRequired}</div>}

                  </div>

                  <div className="col-md-12 d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-success me-2 px-4">Submit</button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate("/manage-billing")}
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

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default BillingCycle;