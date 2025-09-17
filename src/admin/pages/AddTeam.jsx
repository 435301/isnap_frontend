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

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.employeeID.trim()) newErrors.employeeID = 'Employee ID is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile Number must be 10 digits';
    }

    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile Photo is required';
    if (!formData.addressProof) newErrors.addressProof = 'Address Proof is required';
    if (!formData.uploadProof) newErrors.uploadProof = 'Upload Proof is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Data:', formData);
      // Submit logic here
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

          {/* Form Start */}
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

                  {/* Upload Profile Photo */}
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
                    <label className="form-label">Address Proof <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="address_proof"
                      class="form-control"
                      placeholder="Enter Address Proof (e.g. Aadhar,Voter ID, etc.)"
                    />

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

                  {/* Buttons */}
                  <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                    <button type="submit" className="btn btn-success px-4 me-2">Submit</button>
                    <button type="button" className="btn btn-outline-secondary px-4">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Form End */}
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
