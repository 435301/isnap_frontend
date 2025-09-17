import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TeamLatestUpdates = () => {
  const [formData, setFormData] = useState({
    team: 'All',
    title: '',
    description: '',
    image: null,
    file: null,
    urls: ['']  // multiple URLs
  });

  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Responsive sidebar toggle
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle changes for all inputs, including file and urls
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name.startsWith('url')) {
      // Handle urls with name format: url-0, url-1, etc.
      const index = parseInt(name.split('-')[1], 10);
      const newUrls = [...formData.urls];
      newUrls[index] = value;
      setFormData(prev => ({ ...prev, urls: newUrls }));
      setErrors(prev => ({ ...prev, [`url-${index}`]: '' }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: files ? files[0] : value
      }));
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Add new URL field
  const addUrlField = () => {
    setFormData(prev => ({
      ...prev,
      urls: [...prev.urls, '']
    }));
  };

  // Remove URL field by index
  const removeUrlField = (index) => {
    const newUrls = formData.urls.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      urls: newUrls.length ? newUrls : ['']  // keep at least one URL input
    }));

    // Remove error related to that URL field
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`url-${index}`];
      return newErrors;
    });
  };

  // Validate all form fields including all URLs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.team) newErrors.team = 'Team is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Image is required';
    if (!formData.file) newErrors.file = 'File is required';

    formData.urls.forEach((url, idx) => {
      if (!url.trim()) {
        newErrors[`url-${idx}`] = 'URL is required';
      } else {
        try {
          new URL(url);
        } catch {
          newErrors[`url-${idx}`] = 'Invalid URL';
        }
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Submitted Latest Updates:', formData);
      // TODO: API call or further processing here
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
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-4">
                  <h5 className="form-title m-0">Team Latest Updates</h5>
                </div>
                <div className="col-lg-8 text-end">
                  <Link to="/manage-updates" className="btn btn-new-lead">
                    Manage Updates
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  {/* Team */}
                  <div className="col-md-4">
                    <label className="form-label">Team <span className="text-danger">*</span></label>
                    <select
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                      className={`form-select ${errors.team ? 'is-invalid' : ''}`}
                    >
                      <option value="All">All</option>
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                    {errors.team && <div className="invalid-feedback">{errors.team}</div>}
                  </div>

                  {/* Title */}
                  <div className="col-md-4">
                    <label className="form-label">Title <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      placeholder="Title"
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                  </div>

                  {/* Description */}
                  <div className="col-md-8">
                    <label className="form-label">Description <span className="text-danger">*</span></label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      placeholder="Description"
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </div>

                  <div className="col-md-4"></div>

                  {/* Upload Image */}
                  <div className="col-md-4">
                    <label className="form-label">Upload Image <span className="text-danger">*</span></label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                    />
                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                  </div>

                  {/* Upload File */}
                  <div className="col-md-4">
                    <label className="form-label">Upload File <span className="text-danger">*</span></label>
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className={`form-control ${errors.file ? 'is-invalid' : ''}`}
                    />
                    {errors.file && <div className="invalid-feedback">{errors.file}</div>}
                  </div>
                  <div className="col-md-8 d-flex flex-column gap-3">
                    {formData.urls.map((url, index) => (
                      <div key={index} className="d-flex align-items-end gap-2" style={{ minWidth: '600px' }}>
                        <div className="flex-grow-1">
                          <label className="form-label">
                            URL <span className="text-danger">*</span>
                          </label>
                          <input
                            type="url"
                            name={`url-${index}`}
                            value={url}
                            onChange={handleChange}
                            className={`form-control ${errors[`url-${index}`] ? 'is-invalid' : ''}`}
                            placeholder="Enter URL"
                          />
                          {errors[`url-${index}`] && (
                            <div className="invalid-feedback d-block">{errors[`url-${index}`]}</div>
                          )}
                        </div>

                        {index !== 0 && (
                          <button
                            type="button"
                            className="btn btn-danger mb-2"
                            onClick={() => removeUrlField(index)}
                            title="Remove URL"
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        )}

                        {/* Add URL button only next to the last input */}
                        {index === formData.urls.length - 1 && (
                          <button
                            type="button"
                            className="btn btn-outline-primary mb-2"
                            onClick={addUrlField}
                          >
                            <i className="bi bi-plus-lg"></i> Add URL
                          </button>
                        )}
                      </div>
                    ))}
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

export default TeamLatestUpdates;
