import React, { useState, useEffect } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";

const BusinessInformationForm = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        categories: []
    });

    const categoriesList = [
        'Electronics', 'Fashion', 'Grocery', 'Home Appliances',
        'Books', 'Toys', 'Sports', 'Beauty & Personal Care'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prev) => {
                let updatedCategories = [...prev.categories];
                if (checked) {
                    updatedCategories.push(value);
                } else {
                    updatedCategories = updatedCategories.filter((c) => c !== value);
                }
                return { ...prev, categories: updatedCategories };
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        alert('Form submitted!');
    };

    const handleCancel = () => {
        setFormData({
            businessName: '',
            ownerName: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            state: '',
            categories: []
        });
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth >= 992) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        handleResize(); // Initial run
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="container-fluid position-relative bg-white d-flex p-0">
            <Sidebar isOpen={isSidebarOpen} />
            <div
                className="content flex-grow-1"
                style={{
                    marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : isSidebarOpen ? 220 : 0,
                    transition: 'margin-left 0.3s ease',
                }}
            >
                <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                <div className="container-fluid px-4 pt-3">
                    {/* Header */}
                    <div className="row">
                        <div className="bg-white  rounded shadow-sm card-header mb-2">
                            <div className="row g-2 align-items-center">
                                <div className="col-lg-6">
                                    <h5 className="form-title m-0">Business Information</h5>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Upload Form */}
                    <div className="row">
                        <div className="bg-white p-4 rounded shadow-sm card-header mb-3">
                            <form onSubmit={handleSubmit}>
                                {/* Row 1 */}
                                <div className="row g-3 mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Business Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="businessName"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Owner Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="ownerName"
                                            value={formData.ownerName}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Phone <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">
                                            City <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            State <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="form-select"
                                            required
                                        >
                                            <option value="">Select State</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Karnataka">Karnataka</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            GST Number (if any) <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="GST Number (if any)"

                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Address <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Address"
                                        />
                                    </div>



                                    {/* Categories */}
                                    <div className="col-md-9">
                                        <label className="form-label">
                                            Categories <span className="text-danger">*</span>
                                        </label>
                                        <div className="row">
                                            {categoriesList.map((cat, index) => (
                                                <div className="col-md-3 col-sm-6" key={index}>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="categories"
                                                            value={cat}
                                                            checked={formData.categories.includes(cat)}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-check-label">{cat}</label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
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

export default BusinessInformationForm;
