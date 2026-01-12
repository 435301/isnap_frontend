import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import useResponsiveSidebar from "../../components/useResponsiveSidebar";
import { fetchTeams } from "../../redux/actions/teamActions";
import { fetchBusinessDetails } from "../../redux/actions/businessActions";
import { fetchSupportStatus } from "../../redux/actions/supportStatusAction";
import { fetchIssueType } from "../../redux/actions/issueTypeAction";
import { createSellerSupport, fetchSellerSupportById, updateSellerSupport } from "../../redux/actions/sellerSupportAction";
import BASE_URL from "../../config/config";

const AddProductListing = () => {
  const { windowWidth, isSidebarOpen, setIsSidebarOpen } = useResponsiveSidebar(992);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { teams } = useSelector((state) => state.teams);
  const { businessDetails } = useSelector((state) => state.business);
  const { supportStatusList } = useSelector((state) => state.supportStatus);
  const { issueTypes } = useSelector((state) => state.issueTypes);
  const { selectedSupport } = useSelector((state) => state.sellerSupport);
  console.log('teams', teams, businessDetails, issueTypes)
  const [formData, setFormData] = useState({
    issueType: "",
    subject: "",
    description: "",
    attachment: null,
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [existingFile, setExistingFile] = useState(null);

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchBusinessDetails());
    dispatch(fetchSupportStatus({ page: "", search: "", showStatus: 1 }));
    dispatch(fetchIssueType({ page: "", search: "", showStatus: 1 }));
  }, [dispatch])

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchSellerSupportById(id));
    }
  }, [id, isEdit, dispatch]);

  useEffect(() => {
    if (isEdit && selectedSupport) {
      setFormData({
        issueType: selectedSupport.issueTypeId || "",
        subject: selectedSupport.subject || "",
        description: selectedSupport.description || "",
        attachment: null,
        status: selectedSupport.supportStatusId || "",
      });
      setExistingFile(selectedSupport.file || null);
    }
  }, [isEdit, selectedSupport, dispatch]);

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
    if (!formData.status) err.status = "Status is required";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    const payload = new FormData();
    payload.append("issueTypeId", formData.issueType);
    payload.append("supportStatusId", formData.status);
    payload.append("subject", formData.subject);
    payload.append("description", formData.description);
    if (formData.attachment) {
      payload.append("file", formData.attachment);
    }
    try {
      if (isEdit) {
        await dispatch(updateSellerSupport(id, payload))
      } else {
        await dispatch(createSellerSupport(payload));
      }
      navigate("/seller/manage-support");
    } catch (err) {
      console.log(err)
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
            <h5 className="m-0">{isEdit ? "Edit Support Ticket" : "Create Support Ticket"}</h5>
            <Link to="/seller/manage-support" className="btn btn-success">
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
                    className={`form-select ${errors.issueType && "is-invalid"
                      }`}
                    value={formData.issueType}
                    onChange={handleChange}
                  >
                    <option value="">Select Issue Type</option>
                    {issueTypes.map((opt) => (
                      <option key={opt.id} value={opt.id}>{opt.issueTypeTitle}</option>
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
                  <label className="form-label">Attachment(file size must be less than or equal to 100MB)</label>
                  <input
                    type="file"
                    name="attachment"
                    className="form-control"
                    onChange={handleChange}
                  />
                  {existingFile && (
                    <small className="d-block mt-1">
                      <a
                        href={`${BASE_URL}${existingFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {existingFile.split("/").pop()}
                      </a>
                    </small>
                  )}
                </div>

                {/* Description */}
                <div className="col-md-12">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows="4"
                    name="description"
                    className={`form-control ${errors.description && "is-invalid"
                      }`}
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.description}</div>
                </div>
                <div className="col-md-4">
                  <label className="form-label">
                    Support Status <span className="text-danger">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`form-select ${errors.status && "is-invalid"}`}
                  >
                    <option value="">Select Status</option>
                    {supportStatusList.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.supportStatusTitle}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.status}</div>
                </div>

                {/* Buttons */}
                <div className="col-12 text-end mt-4">
                  <button className="btn btn-success me-2 px-4">{isEdit ? "Update" : "Submit"}</button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => navigate("/seller/manage-support")}
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
