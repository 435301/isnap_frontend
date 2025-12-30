import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createProduct } from "../../redux/actions/productActions";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const marketplaceOptions = [
    { value: "Amazon", label: "Amazon" },
    { value: "Flipkart", label: "Flipkart" },
    { value: "Meesho", label: "Meesho" },
    { value: "JioMart", label: "JioMart" },
  ];

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
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!formData.seller) err.seller = "Seller is required";
    if (!formData.sku) err.sku = "SKU is required";
    if (!formData.title) err.title = "Product title is required";
    if (!formData.mrp) err.mrp = "MRP is required";
    if (!formData.sellingPrice) err.sellingPrice = "Selling price is required";
    if (!formData.stock) err.stock = "Available stock is required";
    if (formData.marketplaces.length === 0)
      err.marketplaces = "Select at least one marketplace";
    if (!formData.status) err.status = "Status is required";
    return err;
  };

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
        navigate("/manage-product-listing");
      } catch (err) {
        setErrors({ form: "Failed to create product" });
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
            <Link to="/manage-products" className="btn btn-new-lead">
              Manage Product
            </Link>
          </div>

          <div className="bg-white p-4 rounded shadow-sm card-header ">
            <form onSubmit={handleSubmit}>
              {errors.form && (
                <div className="alert alert-danger">{errors.form}</div>
              )}
              <div className="row g-3">
                {/* Seller */}
                <div className="col-md-3">
                  <label className="form-label">Seller *</label>
                  <select
                    name="seller"
                    value={formData.seller}
                    onChange={handleChange}
                    className={`form-select ${errors.seller && "is-invalid"}`}
                  >
                    <option value="">Select Seller</option>
                    <option value="Seller A">Seller A</option>
                    <option value="Seller B">Seller B</option>
                    <option value="Seller C">Seller C</option>
                  </select>
                  <div className="invalid-feedback">{errors.seller}</div>
                </div>

                {/* SKU */}
                <div className="col-md-3">
                  <label className="form-label">SKU *</label>
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
                  <label className="form-label">Product Title *</label>
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
                  <label className="form-label">MRP *</label>
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
                  <label className="form-label">Selling Price *</label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.sellingPrice && "is-invalid"
                    }`}
                    placeholder="Enter Selling Price"
                  />
                  <div className="invalid-feedback">{errors.sellingPrice}</div>
                </div>

                {/* Available Stock */}
                <div className="col-md-3">
                  <label className="form-label">Available Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className={`form-control ${errors.stock && "is-invalid"}`}
                    placeholder="Enter Stock"
                  />
                  <div className="invalid-feedback">{errors.stock}</div>
                </div>

                {/* Marketplace MULTI SELECT */}
                <div className="col-md-3">
                  <label className="form-label">Marketplace *</label>
                  <Select
                    isMulti
                    options={marketplaceOptions}
                    value={marketplaceOptions.filter((option) =>
                      formData.marketplaces.includes(option.value)
                    )}
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
                  <label className="form-label">Status *</label>
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
                    onClick={() => navigate("/manage-productg")}
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
