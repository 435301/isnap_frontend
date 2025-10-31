import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDepartment, fetchDepartments } from "../../redux/actions/departmentActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchWings } from "../../redux/actions/wingAction";
import { createSubDepartment } from "../../redux/actions/subDepartmentAction";

const AddSubDepartment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        departmentId: "",
        wingId: "",
        status: 1,
    });

    const { departments = [] } = useSelector((state) => state.department || {});
    const { wings = [] } = useSelector((state) => state.wings || {});

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

    useEffect(() => {
        dispatch(fetchDepartments());
        dispatch(fetchWings());
    }, [dispatch]);

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
    };

    // Validate form
    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Sub Department Name is required.";
        } else if (formData.name.length < 3) {
            newErrors.name = "Sub Department Name must be at least 3 characters.";
        }
        else if (!formData.name.trim()) {
            newErrors.name = "Sub Department Name is required.";
        }
        else if (!formData.wingId.trim()) {
            newErrors.name = "Wing is required.";
        }

        if (![0, 1].includes(formData.status)) {
            newErrors.status = "Please select a valid status.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await dispatch(createSubDepartment(formData));
            navigate("/manage-sub-departments");
        } catch (error) {
            console.log(error);
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
                                    <h5 className="form-title m-0">Add Sub Department</h5>
                                </div>
                                <div className="col-lg-9 text-end">
                                    <Link to="/manage-sub-departments" className="btn btn-new-lead">
                                        Manage Sub Departments
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
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Wing <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="wingId"
                                            value={formData.wingId}
                                            onChange={handleChange}
                                            className={`form-select ${errors.wingId ? "is-invalid" : ""}`}
                                        >
                                            <option value="">Select Wing</option>
                                            {wings.map((wing) => (
                                                <option key={wing.id} value={wing.id}>
                                                    {wing.title}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.wingId && (
                                            <div className="invalid-feedback">{errors.wingId}</div>
                                        )}
                                    </div>
                                    {/* Department Name */}
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Department <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="departmentId"
                                            value={formData.departmentId}
                                            onChange={handleChange}
                                            className={`form-select ${errors.departmentId ? "is-invalid" : ""}`}
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map((department) => (
                                                <option key={department?.id} value={department.id}>
                                                    {department?.departmentName}
                                                </option>
                                            ))}

                                        </select>
                                        {errors.departmentId && (
                                            <div className="invalid-feedback">{errors.departmentId}</div>
                                        )}
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Sub Department Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            placeholder="Enter Sub Department Name"
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name}</div>
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
                                            onClick={() => navigate("/manage-sub-departments")}
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

export default AddSubDepartment;