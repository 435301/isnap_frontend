import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsSidebarOpen(width >= 992); // open sidebar on desktop
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const validateChangePassword = (data) => {
    const validationErrors = {};
    const { oldPassword, newPassword, confirmPassword } = data;

    // Old Password
    if (!oldPassword.trim()) {
      validationErrors.oldPassword = 'Old password is required.';
    } else if (oldPassword.length < 6) {
      validationErrors.oldPassword = 'Old password must be at least 6 characters.';
    }

    // New Password
    if (!newPassword.trim()) {
      validationErrors.newPassword = 'New password is required.';
    } else if (newPassword.length < 8) {
      validationErrors.newPassword = 'New password must be at least 8 characters.';
    } else if (!/[A-Z]/.test(newPassword)) {
      validationErrors.newPassword = 'Must contain at least one uppercase letter.';
    } else if (!/[a-z]/.test(newPassword)) {
      validationErrors.newPassword = 'Must contain at least one lowercase letter.';
    } else if (!/[0-9]/.test(newPassword)) {
      validationErrors.newPassword = 'Must contain at least one number.';
    } else if (!/[@$!%*?&]/.test(newPassword)) {
      validationErrors.newPassword = 'Must contain at least one special character.';
    }

    // Confirm Password
    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = 'Please confirm your new password.';
    } else if (confirmPassword !== newPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

    return validationErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New Password and Confirm Password do not match.');
      return;
    }

    setError('');
    console.log('Password Change Submitted:', formData);
    // Add API logic here
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
                  <h5 className="form-title m-0">Change Password</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">
                      Old Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter old password"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      New Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Confirm new password"
                    />
                  </div>

                  {error && (
                    <div className="col-md-12">
                      <div className="alert alert-danger py-2">{error}</div>
                    </div>
                  )}

                  <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                    <button type="submit" className="btn btn-success px-4 me-2">
                      Submit
                    </button>
                    <button type="reset" className="btn btn-outline-secondary px-4" onClick={()=> navigate("/dashboard")}> 
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Content End */}
      </div>
    </div>
  );
};

export default ChangePassword;
