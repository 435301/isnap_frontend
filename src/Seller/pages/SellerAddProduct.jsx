import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import { createProduct } from "../../redux/actions/productActions";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AddProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [formData, setFormData] = useState({
    seller: "",
    sku: "",
    title: "",
    mrp: "",
    sellingPrice: "",
    stock: "",
    marketplaces: [],
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  const marketplaceOptions = [
    { value: "Amazon", label: "Amazon" },
    { value: "Flipkart", label: "Flipkart" },
    { value: "Meesho", label: "Meesho" },
    { value: "JioMart", label: "JioMart" },
  ];

  /* Sidebar Responsive */
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

  /* Form Change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* Validation */
  const validate = () => {
    const err = {};
    if (!formData.seller) err.seller = "Seller is required";
    if (!formData.sku) err.sku = "SKU is required";
    if (!formData.title) err.title = "Product title is required";
    if (!formData.mrp) err.mrp = "MRP is required";
    if (!formData.sellingPrice) err.sellingPrice = "Selling price is required";
    if (!formData.stock) err.stock = "Stock is required";
    if (formData.marketplaces.length === 0)
      err.marketplaces = "Select at least one marketplace";
    return err;
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        ...formData,
        mrp: Number(formData.mrp),
        sellingPrice: Number(formData.sellingPrice),
        stock: Number(formData.stock),
        status: formData.status === "Active" ? 1 : 0,
      };

      try {
        await dispatch(createProduct(payload));
        navigate("/seller/manage-products");
      } catch {
        setErrors({ form: "Failed to create product" });
      }
    }
  };

  return (
    <div className="container-fluid d-flex p-0 bg-light">
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className="content flex-grow-1"
        style={{
          marginLeft:
            windowWidth >= 992 ? (isSidebarOpen ? 250 : 95) : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="bg-white p-3 rounded shadow-sm mb-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0 fw-semibold">Create Product</h5>
            <Link to="/seller/manage-product" className="btn btn-success">
              Manage Products
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-white p-4 rounded shadow-sm card-header">
            <form onSubmit={handleSubmit}>
              {errors.form && (
                <div className="alert alert-danger">{errors.form}</div>
              )}

              <div className="row g-3">
                {/* Seller */}
                <div className="col-md-3">
                  <label className="form-label">
                    Seller <span className="text-danger">*</span>
                  </label>
                  <select
                    name="seller"
                    value={formData.seller}
                    onChange={handleChange}
                    className={`form-select ${errors.seller && "is-invalid"}`}
                  >
                    <option value="">Select Seller</option>
                    <option value="Seller A">Seller A</option>
                    <option value="Seller B">Seller B</option>
                  </select>
                  <div className="invalid-feedback">{errors.seller}</div>
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

                {/* Product Title */}
                <div className="col-md-3">
                  <label className="form-label">
                    Product Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`form-control ${errors.title && "is-invalid"}`}
                    placeholder="Enter Product Title"
                  />
                  <div className="invalid-feedback">{errors.title}</div>
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
                  />
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
                    className={`form-control ${
                      errors.sellingPrice && "is-invalid"
                    }`}
                  />
                </div>

                {/* Stock */}
                <div className="col-md-3">
                  <label className="form-label">
                    Available Stock <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className={`form-control ${errors.stock && "is-invalid"}`}
                  />
                </div>

                {/* Marketplace */}
                <div className="col-md-3">
                  <label className="form-label">
                    Marketplace <span className="text-danger">*</span>
                  </label>
                  <Select
                    isMulti
                    options={marketplaceOptions}
                    onChange={(selected) =>
                      setFormData({
                        ...formData,
                        marketplaces: selected.map((s) => s.value),
                      })
                    }
                  />
                  {errors.marketplaces && (
                    <div className="text-danger mt-1">
                      {errors.marketplaces}
                    </div>
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
                    className="form-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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

        <ToastContainer autoClose={1500} />
      </div>
    </div>
  );
};

export default AddProductListing;
