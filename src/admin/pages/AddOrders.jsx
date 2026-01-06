import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import { fetchMarketPlaceSellers } from "../../redux/actions/adminProductsAction";
import Select from "react-select";
import { addOrder } from "../../redux/actions/orderActions";
import DatePicker from "react-datepicker";
import { safeFormat } from "../../common/formatDate";


const AddOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { serviceTypes } = useSelector(state => state.serviceType);
  const serviceTypeOptions = serviceTypes?.map((item) => ({
    label: item.serviceType,
    value: item.id,
  }));
  const { marketPlacesellers } = useSelector((state) => state.adminProducts);
  useEffect(() => {
    dispatch(fetchServiceTypes());
    dispatch(fetchMarketPlaceSellers());
  }, [dispatch]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [formData, setFormData] = useState({
    orderId: "",
    sellerId: "",
    marketPlaceId: "",
    orderDate: null,
    customerName: "",
    customerMobile: "",
    qty: "",
    totalAmount: "",
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
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* Validation */
  const validate = () => {
    let newErrors = {};
    if (!formData.orderId.trim()) newErrors.orderId = "Order ID is required";

    if (!formData.sellerId) newErrors.sellerId = "Seller is required";

    if (!formData.marketPlaceId || formData.marketPlaceId.length === 0)
      newErrors.marketPlaceId = "Marketplace is required";

    if (!formData.orderDate) newErrors.orderDate = "Order date is required";

    if (!formData.customerName.trim())
      newErrors.customerName = "Customer name is required";

    if (!/^[6-9]\d{9}$/.test(formData.customerMobile))
      newErrors.customerMobile = "Enter valid mobile number";

    if (!formData.qty || formData.qty <= 0)
      newErrors.qty = "Quantity must be greater than 0";

    if (!formData.totalAmount || formData.totalAmount <= 0)
      newErrors.totalAmount = "Enter valid amount";
    return newErrors;
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        orderId: formData.orderId,
        sellerId: formData.sellerId,
        customerName: formData.customerName,
        marketPlaceId: formData.marketPlaceId,
        customerMobile: formData.customerMobile,
        qty: formData.qty,
        totalAmount: formData.totalAmount,
        orderDate: safeFormat(formData.orderDate)
      }
      try {
        await dispatch(addOrder(payload));
        navigate("/manage-orders");
      } catch (err) {
        setErrors({ errors });
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
                      name="orderId"
                      className={`form-control ${errors.orderId ? "is-invalid" : ""
                        }`}
                      value={formData.orderId}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.orderId}</div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Seller <span className="text-danger">*</span>
                    </label>
                    <select
                      name="sellerId"
                      value={formData.sellerId}
                      onChange={handleChange}
                      className={`form-select ${errors.sellerId && "is-invalid"}`}
                    >
                      <option value="">Select Seller</option>
                      {marketPlacesellers?.map((seller) => (
                        <option key={seller?.id} value={seller?.id}>{seller?.businessName}</option>
                      ))}
                    </select>
                    <div className="invalid-feedback ">{errors.sellerId}</div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Marketplace <span className="text-danger">*</span>
                    </label>
                    <Select
                      isMulti
                      options={serviceTypeOptions}
                      value={serviceTypeOptions?.filter((opt) =>
                        formData.marketPlaceId?.includes(opt.value)
                      )}
                      onChange={(selected) =>
                        setFormData({
                          ...formData,
                          marketPlaceId: selected.map((s) => s.value),
                        })
                      }
                       className={` ${errors.marketPlaceId && "is-invalid"}`}
                    />
                    {errors.marketPlaceId && (
                      <div className="invalid-feedback"> {errors.marketPlaceId}  </div>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Order Date <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      selected={formData.orderDate}
                      onChange={(date) =>
                        setFormData((prev) => ({
                          ...prev,
                          orderDate: date
                        }))
                      }
                      placeholderText="Ordered Date"
                      className={`form-control ${errors.orderDate ? "is-invalid" : ""}`}
                      dateFormat="dd-MM-yyyy"
                    />
                    <div className="text-danger small">{errors.orderDate}</div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Customer Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      placeholder="Customer Name "
                      className={`form-control ${errors.customerName ? "is-invalid" : ""
                        }`}
                      value={formData.customerName}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      {errors.customerName}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Customer Mobile Number{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerMobile"
                      placeholder="Enter Custmor Mobile Number"
                      className={`form-control ${errors.customerMobile ? "is-invalid" : ""
                        }`}
                      value={formData.customerMobile}
                      onChange={handleChange}
                      maxLength="10"
                    />
                    <div className="invalid-feedback">
                      {errors.customerMobile}
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
                      className={`form-control ${errors.qty ? "is-invalid" : ""
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
                      name="totalAmount"
                      className={`form-control ${errors.totalAmount ? "is-invalid" : ""
                        }`}
                      value={formData.totalAmount}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      {errors.totalAmount}
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
    </div>
  );
};

export default AddOrder;
