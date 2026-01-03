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
                  <h5 className="form-title m-0">Add Order</h5>
                </div>
                <div className="col-lg-9 text-end">
                  <Link to="/manage-orders" className="btn btn-new-lead">
                    Manage Orders
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
                      Order ID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter order Id"
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
                      Seller <span className="text-danger">*</span>
                    </label>
                    <select
                      name="seller"
                      className={`form-select ${
                        errors.seller ? "is-invalid" : ""
                      }`}
                      value={formData.seller}
                      onChange={handleChange}
                    >
                      <option value="">Select Seller</option>
                      <option value="Seller 1">Seller 1</option>
                      <option value="Seller 2">Seller 2</option>
                    </select>
                    <div className="invalid-feedback">{errors.seller}</div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Marketplace <span className="text-danger">*</span>
                    </label>
                    <select
                      name="marketplace"
                      className={`form-select ${
                        errors.marketplace ? "is-invalid" : ""
                      }`}
                      value={formData.marketplace}
                      onChange={handleChange}
                    >
                      <option value="">Select Marketplace</option>
                      <option value="Amazon">Amazon</option>
                      <option value="Flipkart">Flipkart</option>
                    </select>
                    <div className="invalid-feedback">{errors.marketplace}</div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Order Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      name="order_date"
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
                      Customer Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      placeholder="Customer Name "
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
                      Customer Mobile Number{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="customer_mobile"
                      placeholder="Enter Custmor Mobile Number"
                      className={`form-control ${
                        errors.customer_mobile ? "is-invalid" : ""
                      }`}
                      value={formData.customer_mobile}
                      onChange={handleChange}
                      maxLength="10"
                    />
                    <div className="invalid-feedback">
                      {errors.customer_mobile}
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
                      Total Amount <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Total Amount"
                      name="total_amount"
                      className={`form-control ${
                        errors.total_amount ? "is-invalid" : ""
                      }`}
                      value={formData.total_amount}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      {errors.total_amount}
                    </div>
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
