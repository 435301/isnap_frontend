import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";

const LeadStatusPage = () => {
  const [formData, setFormData] = useState({
    leadName: '',
   
    leadStatus: '', // Status field
  });

  const [error, setError] = useState('');
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
    setIsSidebarOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.leadName || !formData.leadEmail || !formData.leadStatus) {
      setError('Please fill all required fields.');
      return;
    }

    setError('');
    console.log('Lead Status Submitted:', formData);
    // Add API logic here to save lead status
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
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2 d-flex justify-content-between align-items-center">
              <h5 className="form-title m-0">Lead Status</h5>
                <Link to="/manage-leads-status" className="btn btn-new-lead">
               Manage Lead Status
              </Link>
            </div>
          </div>

          {/* Lead Status Form */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Lead Name */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Lead Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="leadName"
                      value={formData.leadName}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter lead Title"
                      required
                    />
                  </div>

                 

                  {/* Lead Status */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Lead Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="leadStatus"
                      value={formData.leadStatus}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select status</option>
                      <option value="new">Active</option>
                      <option value="contacted">In Active</option>
                     
                    </select>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="col-md-12">
                      <div className="alert alert-danger py-2">{error}</div>
                    </div>
                  )}

                  {/* Form Buttons */}
                  <div className="col-md-12 d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-success px-4 me-2">
                      Save
                    </button>
                    <button type="reset" className="btn btn-outline-secondary px-4">
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

export default LeadStatusPage;
