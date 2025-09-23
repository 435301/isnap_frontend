import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AddTeam = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    employeeID: '',
    gender: '',
    email: '',
    mobileNumber: '',
    role: '',
    profilePhoto: null,
    addressProof: '',
    uploadProof: null,
    address: '',
    password: '',
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
  const { name, value, files } = e.target;

  // Update the formData
  const newValue = files ? files[0] : value;
  setFormData(prev => ({ ...prev, [name]: newValue }));

  // Remove error for this field if it exists and input is valid
  setErrors(prevErrors => {
    const updatedErrors = { ...prevErrors };

    // Validate this single field on change
    switch (name) {
      case 'fullName':
        if (value.trim()) delete updatedErrors.fullName;
        break;
      case 'employeeID':
        if (value.trim()) delete updatedErrors.employeeID;
        break;
      case 'gender':
        if (value) delete updatedErrors.gender;
        break;
      case 'email':
        if (/\S+@\S+\.\S+/.test(value)) delete updatedErrors.email;
        else if (!value) updatedErrors.email = 'Email is required';
        break;
      case 'mobileNumber':
        if (/^\d{10}$/.test(value)) delete updatedErrors.mobileNumber;
        else if (!value) updatedErrors.mobileNumber = 'Mobile Number is required';
        break;
      case 'role':
        if (value) delete updatedErrors.role;
        break;
      case 'addressProof':
        if (['1', '2'].includes(String(value))) delete updatedErrors.addressProof;
        break;
      case 'password':
        if (value.length >= 6) delete updatedErrors.password;
        break;
      case 'address':
        if (value.trim()) delete updatedErrors.address;
        break;
      case 'profilePhoto':
      case 'uploadProof':
        if (files && files.length > 0) delete updatedErrors[name];
        break;
      default:
        break;
    }

    return updatedErrors;
  });
};

  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';

    // Employee ID
    if (!formData.employeeID.trim()) newErrors.employeeID = 'Employee ID is required';

    // Gender
    if (!formData.gender) newErrors.gender = 'Gender is required';

    // Email
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    // Mobile Number
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required';
    else if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Mobile Number must be 10 digits';

    // Role
    if (!formData.role) newErrors.role = 'Role is required';

    // Profile Photo
    if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile Photo is required';

    // Address Proof
    if (!formData.addressProof) newErrors.addressProof = 'ID Proof Type is required';
    else if (!['1', '2'].includes(String(formData.addressProof))) newErrors.addressProof = 'Id Proof Type must be either 1 (Aadhaar) or 2 (PAN)';

    // Upload Proof
    if (!formData.uploadProof) newErrors.uploadProof = 'Upload Proof is required';

   

    // Password
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Data:', formData);
      // Submit form logic here
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
                <div className="col-lg-2">
                  <h5 className="form-title m-0">Add Team Member</h5>
                </div>
                <div className="col-md-4" />
                <div className="col-lg-6 text-end">
                  <Link to="/manage-team" className="btn btn-new-lead">Manage Teams</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Full Name */}
                  <div className="col-md-4">
                    <label className="form-label">Full Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && <div className="text-danger small">{errors.fullName}</div>}
                  </div>

                  {/* Employee ID */}
                  <div className="col-md-4">
                    <label className="form-label">Employee ID <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="employeeID"
                      className="form-control"
                      placeholder="Employee ID"
                      value={formData.employeeID}
                      onChange={handleChange}
                    />
                    {errors.employeeID && <div className="text-danger small">{errors.employeeID}</div>}
                  </div>

                  {/* Gender */}
                  <div className="col-md-4">
                    <label className="form-label">Gender <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <div className="text-danger small">{errors.gender}</div>}
                  </div>

                  {/* Email */}
                  <div className="col-md-4">
                    <label className="form-label">Email ID <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email Id"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="text-danger small">{errors.email}</div>}
                  </div>

                  {/* Mobile Number */}
                  <div className="col-md-4">
                    <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="mobileNumber"
                      className="form-control"
                      placeholder="Mobile Number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                    />
                    {errors.mobileNumber && <div className="text-danger small">{errors.mobileNumber}</div>}
                  </div>

                  {/* Role */}
                  <div className="col-md-4">
                    <label className="form-label">Role <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="developer">Developer</option>
                      <option value="designer">Designer</option>
                      <option value="manager">Manager</option>
                    </select>
                    {errors.role && <div className="text-danger small">{errors.role}</div>}
                  </div>

                  {/* Profile Photo */}
                  <div className="col-md-4">
                    <label className="form-label">Upload Profile Photo <span className="text-danger">*</span></label>
                    <input
                      type="file"
                      name="profilePhoto"
                      className="form-control"
                      onChange={handleChange}
                    />
                    {errors.profilePhoto && <div className="text-danger small">{errors.profilePhoto}</div>}
                  </div>

                  {/* Address Proof */}
                  <div className="col-md-4">
                    <label className="form-label">ID Proof Type <span className="text-danger">*</span></label>
                    <select
                      name="addressProof"
                      className="form-select"
                      value={formData.addressProof}
                      onChange={handleChange}
                    >
                      <option value="">Select ID Proof</option>
                      <option value={1}>Aadhaar</option>
                      <option value={2}>PAN Card</option>
                    </select>
                    {errors.addressProof && <div className="text-danger small">{errors.addressProof}</div>}
                  </div>

                  {/* Upload Proof */}
                  <div className="col-md-4">
                    <label className="form-label">Upload Proof <span className="text-danger">*</span></label>
                    <input
                      type="file"
                      name="uploadProof"
                      className="form-control"
                      onChange={handleChange}
                    />
                    {errors.uploadProof && <div className="text-danger small">{errors.uploadProof}</div>}
                  </div>

                  {/* Address */}
                  <div className="col-md-4">
                    <label className="form-label">Address </label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && <div className="text-danger small">{errors.address}</div>}
                  </div>

                  {/* Password */}
                  <div className="col-md-4">
                    <label className="form-label">Password <span className="text-danger">*</span></label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="text-danger small">{errors.password}</div>}
                  </div>

                  {/* Buttons */}
                  <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                    <button type="submit" className="btn btn-success px-4 me-2">Submit</button>
                    <button type="button" className="btn btn-outline-secondary px-4">Cancel</button>
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

export default AddTeam;
