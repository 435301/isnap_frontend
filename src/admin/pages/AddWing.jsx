import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createDepartment } from "../../redux/actions/departmentActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createWing } from "../../redux/actions/wingAction";

const AddWing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        status: "",
    });

    const [errors, setErrors] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Sidebar responsive
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            setIsSidebarOpen(width >= 992);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "status" ? Number(value) : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Validate form
    const validate = () => {
        let newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Wing Name is required.";
        } else if (formData.title.length < 3) {
            newErrors.title = "Wing Name must be at least 3 characters.";
        }
        if (formData.status !== 0 && formData.status !== 1) {
            newErrors.status = "status is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!validate()) return;
        try {
            await dispatch(createWing(formData));
            navigate("/manage-wings");
        } catch (error) {
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
                                <div className="col-lg-3">
                                    <h5 className="form-title m-0">Add Wing</h5>
                                </div>
                                <div className="col-lg-9 text-end">
                                    <Link to="/manage-wings" className="btn btn-new-lead">
                                        Manage Wing
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
                                    {/* Department Name */}
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Wing Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                            placeholder="Enter Wing Name"
                                        />
                                        {errors.title && (
                                            <div className="invalid-feedback">{errors.title}</div>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Status <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className={`form-select ${errors.status ? "is-invalid" : ""}`}
                                        >
                                            <option >Select Status</option>
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                        {errors.status && (
                                            <div className="invalid-feedback">{errors.status}</div>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                                        <button type="submit" className="btn btn-success px-4 me-2">
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary px-4"
                                            onClick={() => navigate("/manage-wings")}
                                        >
                                            Cancel
                                        </button>
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

export default AddWing;