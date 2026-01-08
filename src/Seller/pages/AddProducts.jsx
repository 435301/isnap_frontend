import React, { useState, useEffect } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import useResponsiveSidebar from "../../components/useResponsiveSidebar";

const AddProducts = () => {
  const { windowWidth, isSidebarOpen, setIsSidebarOpen } = useResponsiveSidebar(992);
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Handle file selection & validation
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.name.toLowerCase().endsWith(".csv")) {
            setFile(selectedFile);
            setErrorMessage("");
        } else {
            setFile(null);
            setErrorMessage("Invalid file format. only csv file are supported");
        }
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category) {
            setErrorMessage("Please select a category.");
            return;
        }
        if (!file) {
            setErrorMessage("Please choose a CSV file.");
            return;
        }

        // Simulate upload success
        setTimeout(() => {
            setSuccessMessage("Number of Products uploaded 254");
            setErrorMessage("Invalid file format. only csv file are supported");
        }, 800);
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
                                    <h5 className="form-title m-0">Products</h5>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <Link to="/seller/manage-products" className="btn btn-success">
                                        Manage Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upload Form */}
                    <div className="row">
                        <div className="bg-white p-4 rounded shadow-sm card-header mb-3">
                            <form onSubmit={handleSubmit}>
                                <div className="row align-items-center">
                                    {/* Select Category */}
                                    <div className="mb-3 col-lg-4">
                                        <label className="form-label">
                                            Select Category <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="home">Home</option>
                                        </select>
                                    </div>
                                    {/* CSV Preview Card - Always Visible */}
                                    <div className="col-lg-4 d-flex align-items-center mb-3">
                                        <div className="border rounded p-2 w-100 d-flex align-items-center">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                                alt="CSV"
                                                width="40"
                                                className="me-2"
                                            />
                                            <div>
                                                <strong>{file ? file.name : "Fashion.csv file"}</strong>
                                                <div>
                                                    <a href="/sample.csv" download className="text-success">
                                                        Sample Download
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* File Upload */}
                                <div className="mb-3 col-lg-4">
                                    <label className="form-label">
                                        Select Bulk Products <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept=".csv"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                {/* Messages */}
                                {successMessage && (
                                    <div className="text-success mb-2">
                                        Successful Message : {successMessage}
                                    </div>
                                )}
                                {errorMessage && (
                                    <div className="text-danger mb-3">
                                        Error Message : {errorMessage}
                                    </div>
                                )}

                                <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                                    <button type="submit" className="btn btn-success px-4 me-2">Submit</button>
                                    <button type="button" className="btn btn-outline-secondary px-4">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;
