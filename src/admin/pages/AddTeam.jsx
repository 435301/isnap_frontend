import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { fetchRoles } from '../../redux/actions/roleActions';
import { createTeam } from '../../redux/actions/teamActions';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AddTeam = () => {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.roles?.roles || []);

  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    gender: '',
    email: '',
    mobile: '',
    userRole: '',
    photo: null,
    idProofType: '',
    idProof: null,
    address: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Sidebar responsiveness
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

  // Fetch roles on mount
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile Number is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile Number must be 10 digits';
    if (!formData.userRole) newErrors.userRole = 'Role is required';
    if (!formData.photo) newErrors.photo = 'Profile Photo is required';
    if (!formData.idProofType) newErrors.idProofType = 'Id Proof Type is required';
    if (!formData.idProof) newErrors.idProof = 'Upload Proof is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const payload = new FormData();
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null) payload.append(key, formData[key]);
        });

        await dispatch(createTeam(payload));
        alert('Team member created successfully!');

        setFormData({
          name: '',
          employeeId: '',
          gender: '',
          email: '',
          mobile: '',
          userRole: '',
          photo: null,
          idProofType: '',
          idProof: null,
          address: '',
          password: '',
        });
      } catch (err) {
        console.error('Error creating team:', err);
      }
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
              ? isSidebarOpen ? 259 : 95
              : isSidebarOpen ? 220 : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid px-4 pt-3">

          {/* Header */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-lg-2">
                  <h5 className="form-title m-0">Add Team Member</h5>
                </div>
                <div className="col-lg-6 text-end ms-auto">
                  <Link to="/manage-team" className="btn btn-new-lead">Manage Teams</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  {/* Full Name */}
                  <div className="col-md-4">
                    <label className="form-label">Full Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="text-danger small">{errors.name}</div>}
                  </div>

                  {/* Employee ID */}
                  <div className="col-md-4">
                    <label className="form-label">Employee ID <span className="text-danger">*</span></label>
                    <input type="text" name="employeeId" className="form-control" value={formData.employeeId} onChange={handleChange} />
                    {errors.employeeId && <div className="text-danger small">{errors.employeeId}</div>}
                  </div>

                  {/* Gender */}
                  <div className="col-md-4">
                    <label className="form-label">Gender <span className="text-danger">*</span></label>
                    <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <div className="text-danger small">{errors.gender}</div>}
                  </div>

                  {/* Email */}
                  <div className="col-md-4">
                    <label className="form-label">Email <span className="text-danger">*</span></label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="text-danger small">{errors.email}</div>}
                  </div>

                  {/* Mobile Number */}
                  <div className="col-md-4">
                    <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
                    <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} />
                    {errors.mobile && <div className="text-danger small">{errors.mobile}</div>}
                  </div>

                  {/* Role */}
                  <div className="col-md-4">
                    <label className="form-label">Role <span className="text-danger">*</span></label>
                    <select name="userRole" value={formData.userRole} onChange={handleChange} className="form-select">
                      <option value="">Select Role</option>
                      {roles.map(r => (
                        <option key={r.id} value={r.id}>{r.roleTitle}</option>
                      ))}
                    </select>
                    {errors.userRole && <div className="text-danger small">{errors.userRole}</div>}
                  </div>

                  {/* Profile Photo */}
                  <div className="col-md-4">
                    <label className="form-label">Profile Photo <span className="text-danger">*</span></label>
                    <input type="file" name="photo" className="form-control" onChange={handleChange} />
                    {errors.photo && <div className="text-danger small">{errors.photo}</div>}
                  </div>

                  {/* ID Proof Type */}
                  <div className="col-md-4">
                    <label className="form-label">ID Proof Type <span className="text-danger">*</span></label>
                    <select name="idProofType" className="form-select" value={formData.idProofType} onChange={handleChange}>
                      <option value="">Select ID Proof</option>
                      <option value="1">Aadhaar</option>
                      <option value="2">Voter ID</option>
                    </select>
                    {errors.idProofType && <div className="text-danger small">{errors.idProofType}</div>}
                  </div>

                  {/* Upload Proof */}
                  <div className="col-md-4">
                    <label className="form-label">Upload Proof <span className="text-danger">*</span></label>
                    <input type="file" name="idProof" className="form-control" onChange={handleChange} />
                    {errors.idProof && <div className="text-danger small">{errors.idProof}</div>}
                  </div>

                  {/* Address */}
                  <div className="col-md-4">
                    <label className="form-label">Address</label>
                    <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
                  </div>

                  {/* Password */}
                  <div className="col-md-4">
                    <label className="form-label">Password <span className="text-danger">*</span></label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
                    {errors.password && <div className="text-danger small">{errors.password}</div>}
                  </div>

                  {/* Buttons */}
                  <div className="col-md-12 d-flex justify-content-end mt-4">
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
