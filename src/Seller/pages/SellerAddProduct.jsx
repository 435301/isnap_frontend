import React, { useState, useEffect } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import { addSellerProduct } from "../../redux/actions/sellerProductsAction";
import Select from "react-select";

const AddSellerProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { serviceTypes } = useSelector(state => state.serviceType);
    const serviceTypeOptions = serviceTypes?.map((item) => ({
        label: item.serviceType,
        value: item.id,
    }));
    useEffect(() => {
        dispatch(fetchServiceTypes("", "", "", 1, ""));
    }, [dispatch]);

    const [formData, setFormData] = useState({
        sku: "",
        productTitle: "",
        mrp: "",
        sellingPrice: "",
        availableStock: "",
        marketPlaceIds: [],
        status: "",
    });

    const [errors, setErrors] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setIsSidebarOpen(window.innerWidth >= 992);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value, }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const err = {};
        if (!formData.sku) err.sku = "SKU is required";
        if (!formData.productTitle) err.productTitle = "Product title is required";
        if (!formData.mrp) err.mrp = "MRP is required";
        if (!formData.sellingPrice) err.sellingPrice = "Selling price is required";
        if (!formData.availableStock) err.availableStock = "Available stock is required";
        if (formData.marketPlaceIds.length === 0)
            err.marketPlaceIds = "Select at least one marketplace";
        if (!formData.status) err.status = "Status is required";
        return err;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const payload = {
                sku: formData.sku,
                productTitle: formData.productTitle,
                marketPlaceIds: formData.marketPlaceIds,
                mrp: formData.mrp,
                sellingPrice: formData.sellingPrice,
                availableStock: formData.availableStock,
                status: formData.status
            }
console.log("Payload being sent:", payload);
            try {
                await dispatch(addSellerProduct(payload));
                navigate("/seller/manage-product");
            } catch (err) {
                setErrors({ errors });
            }
        }
    };

    return (
        <div className="container-fluid d-flex p-0">
            <Sidebar isOpen={isSidebarOpen} />
            <div
                className="content flex-grow-1"
                style={{
                    marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 250 : 95) : 0,
                    transition: "margin-left 0.3s ease",
                }}
            >
                <Navbar onToggleSidebar={handleToggleSidebar} />
                <div className="container-fluid px-4 pt-3">
                    <div className="bg-white p-3 rounded shadow-sm mb-3 d-flex justify-content-between">
                        <h5>Create Product</h5>
                        <Link to="/seller/manage-products" className="btn btn-new-lead">
                            Manage Product
                        </Link>
                    </div>

                    <div className="bg-white p-4 rounded shadow-sm card-header ">
                        <form onSubmit={handleSubmit}>
                            {errors.form && (
                                <div className="alert alert-danger">{errors.form}</div>
                            )}
                            <div className="row g-3">
                                {/* Marketplace MULTI SELECT */}
                                <div className="col-md-3">
                                    <label className="form-label">
                                        Marketplace <span className="text-danger">*</span>
                                    </label>
                                    <Select
                                        isMulti
                                        options={serviceTypeOptions}
                                        value={serviceTypeOptions?.filter((opt) =>
                                            formData.marketPlaceIds?.includes(opt.value)
                                        )}
                                        onChange={(selected) =>
                                            setFormData({
                                                ...formData,
                                                marketPlaceIds: selected.map((s) => s.value),
                                            })
                                        }
                                    />
                                    {errors.marketPlaceIds && (
                                        <div className="text-danger mt-1">
                                            {errors.marketPlaceIds}
                                        </div>
                                    )}
                                </div>


                                {/* Product Title */}
                                <div className="col-md-3">
                                    <label className="form-label">
                                        Product Title <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="productTitle"
                                        value={formData.productTitle}
                                        onChange={handleChange}
                                        className={`form-control ${errors.productTitle && "is-invalid"}`}
                                        placeholder="Enter Product Title"
                                    />
                                    <div className="invalid-feedback">{errors.productTitle}</div>
                                </div>

                                {/* SKU */}
                                <div className="col-md-3">
                                    <label className="form-label">
                                        SKU <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleChange}
                                        className={`form-control ${errors.sku && "is-invalid"}`}
                                        placeholder="Enter SKU"
                                    />
                                    <div className="invalid-feedback">{errors.sku}</div>
                                </div>

                                {/* Available Stock */}
                                <div className="col-md-3">
                                    <label className="form-label">
                                        Available Stock <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="availableStock"
                                        value={formData.availableStock}
                                        onChange={handleChange}
                                        className={`form-control ${errors.availableStock && "is-invalid"}`}
                                        placeholder="Enter Stock"
                                    />
                                    <div className="invalid-feedback">{errors.availableStock}</div>
                                </div>

                                {/* MRP */}
                                <div className="col-md-3">
                                    <label className="form-label">
                                        MRP <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="mrp"
                                        value={formData.mrp}
                                        onChange={handleChange}
                                        className={`form-control ${errors.mrp && "is-invalid"}`}
                                        placeholder="Enter MRP"
                                    />
                                    <div className="invalid-feedback">{errors.mrp}</div>
                                </div>

                                {/* Selling Price */}
                                <div className="col-md-3">
                                    <label className="form-label">
                                        Selling Price <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="sellingPrice"
                                        value={formData.sellingPrice}
                                        onChange={handleChange}
                                        className={`form-control ${errors.sellingPrice && "is-invalid"
                                            }`}
                                        placeholder="Enter Selling Price"
                                    />
                                    <div className="invalid-feedback">{errors.sellingPrice}</div>
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
                                        className="form-select"
                                    >
                                        <option value="">Select Status</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                </div>

                                {/* Buttons */}
                                <div className="col-md-12 d-flex justify-content-end mt-4">
                                    <button type="submit" className="btn btn-success me-2 px-4">
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4"
                                        onClick={() => navigate("/seller/manage-products")}
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
    );
};

export default AddSellerProduct;
