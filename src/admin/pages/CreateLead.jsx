import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../assets/admin/css/style.css"
const CreateLead = () => {
  const [formData, setFormData] = useState({
    customerMobile: '',
    customerName: '',
    businessType: '',
    email: '',
    leadSource: '',
    followUpDate: '',
    followUpTime: '',
    leadDetails: '',
    team: '',
    status: '',
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

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Remove error for the field dynamically
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validate = () => {
    const newErrors = {};
    const phonePattern = /^[6-9]\d{9}$/;
    const emailPattern = /^\S+@\S+\.\S+$/;

    if (!formData.customerMobile.trim()) {
      newErrors.customerMobile = 'Mobile number is required';
    } else if (!phonePattern.test(formData.customerMobile)) {
      newErrors.customerMobile = 'Enter a valid 10-digit mobile number starting with 6-9';
    }

    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!formData.leadDetails.trim()) newErrors.leadDetails = 'Lead details are required';
    if (!formData.team.trim()) newErrors.team = 'Team is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailPattern.test(formData.email)) newErrors.email = 'Invalid email format';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Lead Submitted:', formData);
      // Submit to backend
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
                      onChange={handleChange}
                      className={`form-control ${errors.customerMobile ? 'is-invalid' : ''}`}
                      placeholder="Customer Mobile Number"
                    />
                    {errors.customerMobile && <div className="invalid-feedback">{errors.customerMobile}</div>}
                  </div>

                  {/* Customer Name */}
                  <div className="col-md-4">
                    <label className="form-label">Customer Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
                      placeholder="Enter customer name"
                    />
                    {errors.customerName && <div className="invalid-feedback">{errors.customerName}</div>}
                  </div>

                  {/* Business Type */}
                  <div className="col-md-4">
                    <label className="form-label">Business Type<span className="text-danger">*</span></label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Business Type</option>
                      <option value="Retail">Retail</option>
                      <option value="Wholesale">Wholesale</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div className="col-md-4">
                    <label className="form-label">Email ID <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Lead Source */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Lead Source <span className="text-danger">*</span>
                    </label>
                    <select
                      name="leadSource"
                      value={formData.leadSource || ""}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Lead Source</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Other">Other</option>
                    </select>
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
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                      className={`form-select ${errors.team ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Team Member</option>
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                    </select>
                    {errors.team && <div className="invalid-feedback">{errors.team}</div>}
                  </div>

                  {/* Status */}
                  <div className="col-md-4">
                    <label className="form-label">Status<span className="text-danger">*</span></label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Status</option>
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
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
