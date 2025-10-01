import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../assets/admin/css/style.css"
import { useDispatch, useSelector } from 'react-redux';
import { checkMobile, createLead, fetchLeads } from '../../redux/actions/leadAction';
import { fetchLeadSources } from '../../redux/actions/leadSourceAction';
import { fetchLeadStatus } from '../../redux/actions/leadStatusAction';
import { fetchBusinessTypes } from '../../redux/actions/businessTypeAction';
import { fetchTeams } from '../../redux/actions/teamActions';

const CreateLead = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { mobileCheck } = useSelector((state) => state.leads);
  const { businessTypes } = useSelector((state) => state.businessTypes);
  const { leadSources } = useSelector((state) => state.leadSources);
  const { leadStatus = [] } = useSelector((state) => state.leadStatus);
  console.log('leadStatus', leadStatus)
  const { teams = [] } = useSelector(state => state.teams || {});
  console.log('businessTypes', businessTypes)

  useEffect(() => {
    dispatch(fetchLeads());
        dispatch(fetchLeadSources());
        dispatch(fetchLeadStatus());
        dispatch(fetchBusinessTypes());
        dispatch(fetchTeams());
  }, [dispatch])
  const [formData, setFormData] = useState({
    customerMobile: '',
    customerName: '',
    businessTypeId: '',
    emailId: '',
    leadSourceId: '',
    followUpDate: '',
    followUpTime: '',
    leadDetails: '',
    teamId: 0,
    leadStatusId: '',
  });

  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsSidebarOpen(width >= 992);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileCheck) {
      setFormData((prev) => ({
        ...prev,
        customerName: mobileCheck.customerName || prev.customerName,
        // emailId: mobileCheck.emailId || prev.emailId,
      }));
    }
  }, [mobileCheck]);

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };


  const validate = () => {
    const newErrors = {};
    const phonePattern = /^[6-9]\d{9}$/;
    const emailPattern = /^\S+@\S+\.\S+$/;

    if (!formData.customerMobile.trim()) {
      newErrors.customerMobile = "Mobile number is required";
    } else if (!phonePattern.test(formData.customerMobile)) {
      newErrors.customerMobile =
        "Enter a valid 10-digit mobile number starting with 6-9";
    }

    if (!formData.customerName.trim())
      newErrors.customerName = "Customer name is required";
    if (!formData.leadDetails.trim())
      newErrors.leadDetails = "Lead details are required";
    if (!formData.emailId.trim()) newErrors.emailId = "Email is required";
    else if (!emailPattern.test(formData.emailId))
      newErrors.emailId = "Invalid email format";
    if (!formData.businessTypeId) newErrors.businessTypeId = "Business Type is required";
    if (!formData.leadSourceId) newErrors.leadSourceId = "Lead Source is required";
    if (!formData.leadStatusId) newErrors.leadStatusId = "Lead Status is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const res = await dispatch(createLead(formData));
      if (res?.status) {
        navigate("/manage-leads");
      }
    } catch (err) {
      console.log(err);
    }
  }


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
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Create New Lead</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/manage-leads" className="btn btn-new-lead">
                    Manage Leads
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Customer Mobile */}
                  <div className="col-md-4">
                    <label className="form-label">Customer Mobile Number <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="customerMobile"
                      value={formData.customerMobile}
                      onChange={(e) => {
                        handleChange(e);

                        if (e.target.value.length === 10) {
                          dispatch(checkMobile(e.target.value));
                        }
                      }}
                      className={`form-control ${errors.customerMobile ? "is-invalid" : ""
                        }`}
                      placeholder="Customer Mobile Number"
                    />
                    {errors.customerMobile && (
                      <div className="invalid-feedback">{errors.customerMobile}</div>
                    )}
                  </div>

                  {/* Customer Name */}
                  <div className="col-md-4">
                    <label className="form-label">Customer Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      className={`form-control ${errors.customerName ? "is-invalid" : ""}`}
                      placeholder="Enter customer name"
                    />
                    {errors.customerName && (
                      <div className="invalid-feedback">{errors.customerName}</div>
                    )}
                  </div>

                  {/* Business Type */}
                  <div className="col-md-4">
                    <label className="form-label">Business Type<span className="text-danger">*</span></label>
                    <select
                      name="businessTypeId"
                      value={formData.businessTypeId}
                      onChange={handleChange}
                      className={`form-select ${errors.businessTypeId ? "is-invalid" : ""
                        }`}
                    >
                      <option value="">Select Business Type</option>
                      {businessTypes
                        ?.filter((b) => b.status === 1) //only active
                        .map((business) => (
                          <option key={business.id} value={business.id}>
                            {business.businessType}
                          </option>
                        ))}

                    </select>
                    {errors.businessTypeId && (
                      <div className="invalid-feedback">{errors.businessTypeId}</div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-md-4">
                    <label className="form-label">Email ID <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleChange}
                      className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                      placeholder="Enter email address"
                    />
                    {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
                  </div>

                  {/* Lead Source */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Lead Source <span className="text-danger">*</span>
                    </label>
                    <select
                      name="leadSourceId"
                      value={formData.leadSourceId || ""}
                      onChange={handleChange}
                      className={`form-select ${errors.leadSourceId ? "is-invalid" : ""
                        }`}
                    >
                      <option value="">Select Lead Source</option>
                      {leadSources?.filter((b) => b.status === 1).map((leadSource) => (
                        <option key={leadSource?.id} value={leadSource?.id}>
                          {leadSource?.LeadSourceTitle}
                        </option>
                      ))}
                    </select>
                    {errors.leadSourceId && (
                      <div className="invalid-feedback">{errors.leadSourceId}</div>
                    )}
                  </div>

                  {/* Follow-up Date & Time */}
                  <div className="col-md-4">
                    <label className="form-label">Follow up date & time</label>
                    <div className="d-flex gap-2">
                      <input
                        type="date"
                        name="followUpDate"
                        value={formData.followUpDate}
                        onChange={handleChange}
                        className="form-control"
                      />
                      <select
                        name="followUpTime"
                        value={formData.followUpTime}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">-- Select Time --</option>
                        {Array.from({ length: 24 * 2 }, (_, i) => {
                          const hours = String(Math.floor(i / 2)).padStart(2, "0");
                          const minutes = i % 2 === 0 ? "00" : "30";
                          return (
                            <option key={i} value={`${hours}:${minutes}`}>
                              {hours}:{minutes}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Team */}
                  <div className="col-md-4">
                    <label className="form-label">Team Member</label>
                    <select
                      name="teamId"
                      value={formData.teamId}
                      onChange={handleChange}
                      className="form-select "
                    >
                      <option value="">Select Team Member</option>
                      {teams?.map((team) => (
                        <option key={team?.id} value={team?.id}>
                          {team?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div className="col-md-4">
                    <label className="form-label">Lead Status<span className="text-danger">*</span></label>
                    <select
                      name="leadStatusId"
                      value={formData.leadStatusId}
                      onChange={handleChange}
                      className={`form-select ${errors.leadStatusId ? "is-invalid" : ""
                        }`}
                    >
                      <option value="">Select Status</option>
                      {leadStatus?.filter((b) => b.status === 1).map((leadStatus) => (
                        <option key={leadStatus.id} value={leadStatus.id}>
                          {leadStatus?.LeadStatusTitle}
                        </option>
                      ))}
                    </select>
                    {errors.leadStatusId && (
                      <div className="invalid-feedback">{errors.leadStatusId}</div>
                    )}
                  </div>

                  {/* Lead Details */}
                  <div className="col-md-12">
                    <label className="form-label">Lead Details <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="leadDetails"
                      value={formData.leadDetails}
                      onChange={handleChange}
                      className={`form-control ${errors.leadDetails ? 'is-invalid' : ''}`}
                      placeholder="Lead Details"
                    />
                    {errors.leadDetails && <div className="invalid-feedback">{errors.leadDetails}</div>}
                  </div>

                  {/* Buttons */}
                  <div className="col-md-12 d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-success me-2 px-4">
                      Submit
                    </button>
                    <Link to="/manage-leads" className="btn btn-outline-secondary px-4">
                      Cancel
                    </Link>
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

export default CreateLead;
