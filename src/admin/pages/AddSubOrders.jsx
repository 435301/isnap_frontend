import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddOrder = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [formData, setFormData] = useState({
    order_id: "",
    seller: "",
    marketplace: "",
    order_date: "",
    customer_name: "",
    customer_mobile: "",
    qty: "",
    total_amount: "",
  });

  const [errors, setErrors] = useState({});

  /* Sidebar responsive */
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

  /* Handle input */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* Validation */
  const validate = () => {
    let newErrors = {};

    if (!formData.order_id.trim()) newErrors.order_id = "Order ID is required";

    if (!formData.seller) newErrors.seller = "Seller is required";

    if (!formData.marketplace)
      newErrors.marketplace = "Marketplace is required";

    if (!formData.order_date) newErrors.order_date = "Order date is required";

    if (!formData.customer_name.trim())
      newErrors.customer_name = "Customer name is required";

    if (!/^[6-9]\d{9}$/.test(formData.customer_mobile))
      newErrors.customer_mobile = "Enter valid mobile number";

    if (!formData.qty || formData.qty <= 0)
      newErrors.qty = "Quantity must be greater than 0";

    if (!formData.total_amount || formData.total_amount <= 0)
      newErrors.total_amount = "Enter valid amount";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    toast.success("Order added successfully");
    setTimeout(() => navigate("/manage-orders"), 1500);
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
          {/* Header */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <h5 className="form-title m-0">Add Sub Orders</h5>
                </div>
                <div className="col-lg-9 text-end">
                  <Link to="/manage-sub-orders" className="btn btn-new-lead">
                    Manage Sub Orders
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
                      Sub Order ID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Sub Order Id"
                      name="order_id"
                      className={`form-control ${
                        errors.order_id ? "is-invalid" : ""
                      }`}
                      value={formData.order_id}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.order_id}</div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">
                      Order Id <span className="text-danger">*</span>
                    </label>
                    <select
                      name="seller"
                      className={`form-select ${
                        errors.seller ? "is-invalid" : ""
                      }`}
                      value={formData.seller}
                      onChange={handleChange}
                    >
                      <option value="">Select Order Id</option>
                      <option value="Seller 1">SUB 1</option>
                      <option value="Seller 2">SUB 2</option>
                    </select>
                    <div className="invalid-feedback">{errors.seller}</div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">
                      Product<span className="text-danger">*</span>
                    </label>
                    <select
                      name="seller"
                      className={`form-select ${
                        errors.seller ? "is-invalid" : ""
                      }`}
                      value={formData.seller}
                      onChange={handleChange}
                    >
                      <option value="">Select Product</option>
                      <option value="Seller 1">Product 1</option>
                      <option value="Seller 2">Product 2</option>
                    </select>
                    <div className="invalid-feedback">{errors.seller}</div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mrp <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      name="mrp"
                      placeholder="Enter Mrp"
                      className={`form-control ${
                        errors.order_date ? "is-invalid" : ""
                      }`}
                      value={formData.order_date}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.order_date}</div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Selling Price<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      placeholder="Enter selling Price "
                      className={`form-control ${
                        errors.customer_name ? "is-invalid" : ""
                      }`}
                      value={formData.customer_name}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      {errors.customer_name}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Quantity <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      name="qty"
                      placeholder="Enter Qty"
                      className={`form-control ${
                        errors.qty ? "is-invalid" : ""
                      }`}
                      value={formData.qty}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.qty}</div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="stateStatus"
                      value={formData.stateStatus}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="In Active">In Active</option>
                    </select>
                  </div>
                  <div className="col-12 d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-success px-4 me-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate("/manage-orders")}
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddOrder;
