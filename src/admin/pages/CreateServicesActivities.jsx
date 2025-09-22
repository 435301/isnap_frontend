import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CreateServicesActivities = () => {
    const [rows, setRows] = useState([
        { servicesCategory: '', serviceType: '', status: '' },
    ]);

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

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { servicesCategory: '', serviceType: '', status: '' }]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Rows:', rows);
        // Submit rows to backend
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
                                    <h5 className="form-title m-0">Create Service Activities</h5>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <Link to="/manage-service-activities" className="btn btn-new-lead">
                                        Manage Service Activities
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="row">
                        <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
                            <form onSubmit={handleSubmit}>
                                {/* Service Categories - only once at the top */}
                                <div className="row g-3 mb-3">
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Service Category <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="servicesCategory"
                                            value={rows[0].servicesCategory}
                                            onChange={(e) => handleChange(0, e)}
                                            className="form-select"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Marketplace Business">Marketplace Business</option>
                                            <option value="Digital Marketing Services">Digital Marketing Services</option>
                                            <option value="Photography Services">Photography Services</option>
                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Service Type <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="serviceType"
                                            value={rows[0].serviceType}
                                            onChange={(e) => handleChange(0, e)}
                                            className="form-select"
                                        >
                                            <option value="">Select Service Type</option>
                                            <option value="Product Listing">Business Launch</option>
                                            <option value="Catalog Management">Catalog Management</option>
                                            <option value="SEO Optimization">SEO Optimization</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Dynamic rows for Service Activity & Status */}
                                {rows.map((row, index) => (
                                    <div className="row g-3 mb-3" key={index}>
                                        {/* Service Activity */}
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Service Activity <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="serviceActivity"
                                                value={row.serviceActivity || ''}
                                                onChange={(e) => handleChange(index, e)}
                                                className="form-control"
                                                placeholder="Enter Service Activity"
                                            />
                                        </div>

                                        {/* Status */}
                                        <div className="col-md-3">
                                            <label className="form-label">
                                                Status <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                name="status"
                                                value={row.status}
                                                onChange={(e) => handleChange(index, e)}
                                                className="form-select"
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>

                                        {/* Add / Remove Buttons (only on last row) */}
                                        {index === rows.length - 1 && (
                                            <div className="col-md-1 d-flex align-items-center mt-5 gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center"
                                                    style={{ width: "38px", height: "38px" }}
                                                    onClick={handleAddRow}
                                                >
                                                    <i className="bi bi-plus-circle"></i>
                                                </button>

                                                {rows.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                                                        style={{ width: "38px", height: "38px" }}
                                                        onClick={() => handleRemoveRow(index)}
                                                    >
                                                        <i className="bi bi-dash-circle"></i>
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Submit & Cancel */}
                                <div className="col-md-12 d-flex justify-content-end mt-4">
                                    <button type="submit" className="btn btn-success me-2 px-4">
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary me-2 px-4"
                                        onClick={() => setRows([{ serviceActivity: '', status: '' }])}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateServicesActivities;
