import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductListing = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    issueType: "",
    subject: "",
    description: "",
    attachment: null,
    seller: "",
    team: "",
    status: "", // ✅ ADD THIS
  });
  const statusOptions = ["Open", "In Progress", "Pending", "Closed"];

  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const issueTypeOptions = [
    "Technical",
    "Billing",
    "General",
    "Feature Request",
  ];
  const sellerOptions = ["Seller A", "Seller B", "Seller C"];
  const teamOptions = ["Technical", "Billing", "Support"];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "attachment" ? files[0] : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!formData.issueType) err.issueType = "Issue type is required";
    if (!formData.subject) err.subject = "Subject is required";
    if (!formData.description) err.description = "Description is required";
    if (!formData.seller) err.seller = "Seller is required";
    if (!formData.team) err.team = "Team is required";
    if (!formData.status) err.status = "Status is required"; // ✅
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });

      console.log("Submitted Payload:", Object.fromEntries(payload));
      navigate("/support");
    }
  };

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className="content flex-grow-1"
        style={{
          marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 250 : 95) : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="bg-white p-3 rounded shadow-sm mb-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0">Create Support Ticket</h5>
            <Link to="/seller/manage-support" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-1"></i> Manage Support
            </Link>
          </div>

          {/* Form */}
          <div className="bg-white p-3 rounded shadow-sm card-header">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Issue Type */}
                <div className="col-md-4">
                  <label className="form-label">
                    Issue Type <span className="text-danger">*</span>
                  </label>
                  <select
                    name="issueType"
                    className={`form-select ${
                      errors.issueType && "is-invalid"
                    }`}
                    value={formData.issueType}
                    onChange={handleChange}
                  >
                    <option value="">Select Issue Type</option>
                    {issueTypeOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.issueType}</div>
                </div>

                {/* Subject */}
                <div className="col-md-4">
                  <label className="form-label">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className={`form-control ${errors.subject && "is-invalid"}`}
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.subject}</div>
                </div>

                {/* Attachment */}
                <div className="col-md-4">
                  <label className="form-label">Attachment</label>
                  <input
                    type="file"
                    name="attachment"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="col-md-12">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows="4"
                    name="description"
                    className={`form-control ${
                      errors.description && "is-invalid"
                    }`}
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.description}</div>
                </div>

                {/* Seller */}
                <div className="col-md-4">
                  <label className="form-label">
                    Seller <span className="text-danger">*</span>
                  </label>
                  <select
                    name="seller"
                    className={`form-select ${errors.seller && "is-invalid"}`}
                    value={formData.seller}
                    onChange={handleChange}
                  >
                    <option value="">Select Seller</option>
                    {sellerOptions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.seller}</div>
                </div>

                {/* Team */}
                <div className="col-md-4">
                  <label className="form-label">
                    Team <span className="text-danger">*</span>
                  </label>
                  <select
                    name="team"
                    className={`form-select ${errors.team && "is-invalid"}`}
                    value={formData.team}
                    onChange={handleChange}
                  >
                    <option value="">Select Team</option>
                    {teamOptions.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.team}</div>
                </div>
                <div className="col-md-4">
                  <label className="form-label">
                    Issue Status <span className="text-danger">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`form-select ${errors.status && "is-invalid"}`}
                  >
                    <option value="">Select Status</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.status}</div>
                </div>

                {/* Buttons */}
                <div className="col-12 text-end mt-4">
                  <button className="btn btn-success me-2 px-4">Submit</button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => navigate("/support")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <ToastContainer autoClose={1500} />
      </div>
    </div>
  );
};

export default AddProductListing;
