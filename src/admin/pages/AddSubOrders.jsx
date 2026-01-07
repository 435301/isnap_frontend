import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addSubOrder, editSubOrder, fetchOrders, fetchProductData, fetchSubOrdersById, resetProductData } from "../../redux/actions/orderActions";
import { fetchAdminProducts } from "../../redux/actions/adminProductsAction";

const AddOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { orders, productData, subOrderById } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.adminProducts);
  const [formData, setFormData] = useState({
    orderId: "",
    suborderId: "",
    productId: "",
    qty: "",
    mrp: "",
    sellingPrice: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

  //edit 
  const { id } = useParams();
  const isEditMode = Boolean(id);


  useEffect(() => {
    dispatch(fetchOrders({
      page: "", sellerId: "", marketPlaceId: "", fromDate: "", toDate: "", search: ""
    }));
    dispatch(fetchAdminProducts({ page: "", search: "", marketPlaceId: "", status: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (productData && Object.keys(productData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        mrp: productData.mrp || "",
        sellingPrice: productData.sellingPrice || "",
      }));
    }
  }, [productData]);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchSubOrdersById(id));
    }
  }, [id, isEditMode, dispatch]);

  useEffect(() => {
    if (isEditMode && subOrderById) {
      setFormData({
        orderId: subOrderById.orderId || "",
        suborderId: subOrderById.subOrderId || "",
        productId: subOrderById.productId || "",
        qty: subOrderById.qty || "",
        mrp: subOrderById.mrp || "",
        sellingPrice: subOrderById.sellingPrice || "",
        status: subOrderById.status ?? "",
      });
      if (subOrderById.productId) {
        dispatch(fetchProductData(subOrderById.productId));
      }
    }
  }, [isEditMode, subOrderById, dispatch]);


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

  const handleProduct = (e) => {
    const selectedProductId = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      productId: selectedProductId,
    }));

    if (selectedProductId) {
      dispatch(fetchProductData(selectedProductId));
    }
  }

  /* Validation */
  const validate = () => {
    let newErrors = {};
    if (!formData.orderId) newErrors.orderId = "Order ID is required";
    if (!formData.suborderId) newErrors.suborderId = "Sub order Id is required";
    if (!formData.productId)
      newErrors.productId = "Product Id is required";
    if (!formData.mrp) newErrors.mrp = "MRP is required";
    if (!formData.sellingPrice)
      newErrors.sellingPrice = "Selling Price is required";
    if (!formData.qty || formData.qty <= 0)
      newErrors.qty = "Quantity must be greater than 0";
    if (!formData.status)
      newErrors.status = "Status is required";
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
        suborderId: formData.suborderId,
        productId: formData.productId,
        qty: formData.qty,
        mrp: formData.mrp,
        sellingPrice: formData.sellingPrice,
        status: formData.status
      }
      try {
        if (isEditMode) {
          await dispatch(editSubOrder(id, payload));
        } else {
          await dispatch(addSubOrder(payload));
        }
        navigate("/manage-sub-orders");
      } catch (err) {
        setErrors({ errors });
      }
    }
    handleCancel();
  };


  const handleCancel = ()=>{
   setFormData({
      orderId: "",
      suborderId: "",
      productId: "",
      qty: "",
      mrp: "",
      sellingPrice: "",
      status: "",
    });
    setErrors({});
    dispatch(resetProductData());
    navigate("/manage-sub-orders")
  }

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
                  <h5 className="form-title m-0">{isEditMode ? "Edit Sub Order" : "Add Sub Order"}</h5>
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
                      name="suborderId"
                      className={`form-control ${errors.suborderId ? "is-invalid" : ""
                        }`}
                      value={formData.suborderId}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.suborderId}</div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">
                      Order Id <span className="text-danger">*</span>
                    </label>
                    <select
                      name="orderId"
                      className={`form-select ${errors.orderId ? "is-invalid" : ""
                        }`}
                      value={formData.orderId}
                      onChange={handleChange}
                    >
                      <option value="">Select Order Id</option>
                      {orders.map((order) => (
                        <option key={order.id} value={order.id}>{order.orderId}</option>
                      ))}
                    </select>
                    <div className="invalid-feedback">{errors.orderId}</div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">
                      Product<span className="text-danger">*</span>
                    </label>
                    <select
                      name="productId"
                      className={`form-select ${errors.productId ? "is-invalid" : ""
                        }`}
                      value={formData.productId}
                      onChange={handleProduct}
                    >
                      <option value="">Select Product</option>
                      {products?.map((product) => (
                        <option key={product.id} value={product.id}>{product.productTitle}</option>
                      ))}
                    </select>
                    <div className="invalid-feedback">{errors.productId}</div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Mrp <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      name="mrp"
                      placeholder="Enter Mrp"
                      className={`form-control ${errors.mrp ? "is-invalid" : ""
                        }`}
                      value={formData.mrp}
                      onChange={handleChange}
                      disabled
                    />
                    <div className="invalid-feedback">{errors.mrp}</div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Selling Price<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="sellingPrice"
                      placeholder="Enter selling Price "
                      className={`form-control ${errors.sellingPrice ? "is-invalid" : ""
                        }`}
                      value={formData.sellingPrice}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      {errors.sellingPrice}
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
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={`form-select ${errors.qty ? "is-invalid" : ""}`}
                    >
                      <option value="">Select status</option>
                      <option value={1}>Active</option>
                      <option value={0}>In Active</option>
                    </select>
                    <div className="invalid-feedback">{errors.status}</div>
                  </div>
                  <div className="col-12 d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-success px-4 me-2">
                      {isEditMode ? "Update" : "Submit"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={ handleCancel}
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
