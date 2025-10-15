import React, { useState, useEffect } from 'react';
import Sidebar from '../components/ExecutiveNavbar';
import Navbar from '../components/ExecutiveSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from "react-router-dom";
import { createLeadStatus } from '../../redux/actions/leadStatusAction';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const LeadStatusPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    status: '',
  });

  const [errors, setErrors] = useState('');
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
    setFormData((prev) => ({ ...prev, [name]: name === "status" ? Number(value) : value, }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Lead Title is required.";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Lead Title must be at least 3 characters.";
    }
    if (!formData.status === "") {
      newErrors.status = "Lead Status is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await dispatch(createLeadStatus(formData));
      if (res?.status) {
        navigate("/manage-leads-status");
      } else {
        console.warn("Lead status creation failed:", res?.message);
      }
    } catch (err) {
      console.log('err')
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
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2 d-flex justify-content-between align-items-center">
              <h5 className="form-title m-0">Lead Status</h5>
              <Link to="/executive/manage-leads-status" className="btn btn-new-lead">
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
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      placeholder="Enter lead Title"
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}

                  </div>
                  {/* Lead Status */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Lead Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select status</option>
                      <option value="1">Active</option>
                      <option value="0">In Active</option>

                    </select>
                    {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                  </div>

                  {/* Form Buttons */}
                  <div className="col-md-12 d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-success px-4 me-2">
                      Save
                    </button>
                    <button type="reset" className="btn btn-outline-secondary px-4" onClick={() => {
                      setFormData({ title: "", status: "" });
                      setErrors({});
                    }}>
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
