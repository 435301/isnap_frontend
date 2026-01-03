import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    issueType: "",
    subject: "",
    description: "",
    attachment: null,
    status: "Open",
  });

  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const issueTypeOptions = [
    "Technical",
    "Billing",
    "General",
    "Feature Request",
    "Account",
  ];

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

    if (name === "attachment") {
      setFormData((prev) => ({ ...prev, attachment: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!formData.issueType) err.issueType = "Issue type is required";
    if (!formData.subject) err.subject = "Subject is required";
    if (!formData.description) err.description = "Description is required";
    if (!formData.status) err.status = "Status is required";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Prepare payload (FormData for file upload)
      const payload = new FormData();
      payload.append("issueType", formData.issueType);
      payload.append("subject", formData.subject);
      payload.append("description", formData.description);
      payload.append("status", formData.status);
      if (formData.attachment) {
        payload.append("attachment", formData.attachment);
      }

      console.log("Submitted Payload:", Object.fromEntries(payload));
      navigate("/manage-products");
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
          <div className="bg-white p-3 rounded shadow-sm mb-3">
            <div className="row align-items-center">
              {/* Left: Title */}
              <div className="col-md-6">
                <h5 className="m-0">Create Support Ticket</h5>
              </div>

              {/* Right: Button */}
              <div className="col-md-6 text-md-end mt-2 mt-md-0">
                <Link to="/support" className="reports mp-btn-add btn">
                  <i className="bi bi-plus-circle me-1"></i> Manage Support
                </Link>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-4 rounded card-header shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Issue Type */}
                <div className="col-md-4">
                  <label className="form-label">
                    Issue Type <span className="text-danger">*</span>
                  </label>
                  <select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    className={`form-select ${
                      errors.issueType && "is-invalid"
                    }`}
                  >
                    <option value="">Select Issue Type</option>
                    {issueTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
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
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-control ${errors.subject && "is-invalid"}`}
                    placeholder="Enter subject"
                  />
                  <div className="invalid-feedback">{errors.subject}</div>
                </div>
                {/* Attachment */}
                <div className="col-md-4">
                  <label className="form-label">Attachment</label>
                  <input
                    type="file"
                    name="attachment"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Description */}
                <div className="col-md-12">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`form-control ${
                      errors.description && "is-invalid"
                    }`}
                    placeholder="Describe your issue"
                  ></textarea>
                  <div className="invalid-feedback">{errors.description}</div>
                </div>

                {/* Buttons */}
                <div className="col-md-12 d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-success me-2 px-4">
                    Submit
                  </button>
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
