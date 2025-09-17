import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Validation function
const validateStateForm = (formData) => {
    const errors = {};

    // Seller is required if "Seller" or "Both" is selected
    if ((formData.selectTo === 'Seller' || formData.selectTo === 'Both') && !formData.seller) {
        errors.seller = 'Please select a seller.';
    }

    // Title required
    if (!formData.title.trim()) {
        errors.title = 'Title is required.';
    } else if (formData.title.length < 3) {
        errors.title = 'Title must be at least 3 characters long.';
    }

    // Description required
    if (!formData.description.trim()) {
        errors.description = 'Description is required.';
    } else if (formData.description.length < 5) {
        errors.description = 'Description must be at least 5 characters long.';
    }

    return errors;
};

const Notifications = () => {
    const [formData, setFormData] = useState({
        selectTo: 'Team',
        seller: 'All',
        title: '',
        description: '',
    });

    const [errors, setErrors] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Sidebar responsive handling
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

    // Handles all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleRadioChange = handleChange;

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateStateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('Form Submitted:', formData);
            // API call here
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

                <div className="container-fluid px-3 pt-3">
                    {/* Page Header */}
                    <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
                        <div className="row g-2 align-items-center">
                            <div className="col-lg-2">
                                <h5 className="form-title m-0">Notifications</h5>
                            </div>
                            <div className="col-lg-10 text-end">
                                <Link to="/manage-updates" className="btn btn-success text-white">
                                    Manage Updates
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
                            <div className="row g-3">
                                {/* Select To */}
                                <div className="col-md-12">
                                    <label>Select to </label>
                                    <div className="d-flex gap-3">
                                        {['Team', 'Seller', 'Both'].map(option => (
                                            <div className="form-check" key={option}>
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="selectTo"
                                                    value={option}
                                                    checked={formData.selectTo === option}
                                                    onChange={handleRadioChange}
                                                />
                                                <label className="form-check-label">{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Seller */}
                                <div className="col-md-4">
                                    <label>Seller <span className='text-danger'>*</span></label>
                                    <select
                                        className={`form-select ${errors.seller ? 'is-invalid' : ''}`}
                                        name="seller"
                                        value={formData.seller}
                                        onChange={handleChange}
                                    >
                                        <option value="">-- Select Seller --</option>
                                        <option>All</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                    {errors.seller && <div className="invalid-feedback">{errors.seller}</div>}
                                </div>

                                {/* Title */}
                                <div className="col-md-4">
                                    <label>Title <span className='text-danger'>*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Title"
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>

                                {/* Description */}
                                <div className="col-md-8">
                                    <label>Description <span className='text-danger'>*</span></label>
                                    <textarea
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                    />
                                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                </div>

                                {/* Buttons */}
                                <div className="col-md-12 d-flex justify-content-end mt-4">
                                    <button type="submit" className="btn btn-success px-4 me-2">Submit</button>
                                    <button type="button" className="btn btn-outline-secondary px-4">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
