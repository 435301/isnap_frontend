import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createProduct } from "../../redux/actions/productActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

const AddProductListing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fromQty: "",
        toQty: "",
        price: "",
        status: "Active", // Default selected
    });

    const [errors, setErrors] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "", form: "" })); // Clear previous errors
    };

    const validate = () => {
        const newErrors = {};
        const from = Number(formData.fromQty);
        const to = Number(formData.toQty);

        if (!formData.fromQty) newErrors.fromQty = "From Quantity is required";
        if (!formData.toQty) newErrors.toQty = "To Quantity is required";

        // Check only if both values exist and are numbers
        if (formData.fromQty && formData.toQty && !isNaN(from) && !isNaN(to)) {
            if (to <= from) {
                newErrors.toQty = "To Qty must be greater than From Qty";
            }
        }

        if (!formData.price) newErrors.price = "Price is required";
        if (!formData.status) newErrors.status = "Status is required";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const payload = {
                fromQty: Number(formData.fromQty),
                toQty: Number(formData.toQty),
                price: Number(formData.price),
                status: formData.status === "Active" ? 1 : 0,
            };

            try {
                const res = await dispatch(createProduct(payload));
                setFormData({ fromQty: "", toQty: "", price: "", status: "Active" });
                setTimeout(() => navigate("/manage-product-listing"), 1500);
            } catch (err) {
                setErrors((prev) => ({
                    ...prev,
                    form: err.message || "Failed to create product",
                }));
            }
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
                                <div className="col-lg-6">
                                    <h5 className="form-title m-0">Create Product Listing</h5>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <Link to="/manage-product-listing" className="btn btn-new-lead">
                                        Manage Product Listings
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
                            <form onSubmit={handleSubmit}>
                                {/* Form-level error */}
                                {errors.form && (
                                    <div className="alert alert-danger mb-3">{errors.form}</div>
                                )}

                                <div className="row g-3">
                                    {/* From Qty */}
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            From Quantity <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="fromQty"
                                            value={formData.fromQty}
                                            onChange={handleChange}
                                            className={`form-control ${errors.fromQty ? "is-invalid" : ""}`}
                                            placeholder="Enter From Quantity"
                                        />
                                        {errors.fromQty && <div className="invalid-feedback">{errors.fromQty}</div>}
                                    </div>

                                    {/* To Qty */}
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            To Quantity <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="toQty"
                                            value={formData.toQty}
                                            onChange={handleChange}
                                            className={`form-control ${errors.toQty ? "is-invalid" : ""}`}
                                            placeholder="Enter To Quantity"
                                        />
                                        {errors.toQty && <div className="invalid-feedback">{errors.toQty}</div>}
                                    </div>

                                    {/* Price */}
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Price <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"

                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                            placeholder="Enter Price"
                                        />
                                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
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
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                        {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                                    </div>

                                    {/* Submit button */}
                                    <div className="col-md-12 d-flex justify-content-end mt-4">
                                        <button type="submit" className="btn btn-success me-2 px-4">
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary px-4"
                                            onClick={() => navigate("/manage-product-listing")}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={1500} hideProgressBar />
            </div>
        </div>
    );
};

export default AddProductListing;
