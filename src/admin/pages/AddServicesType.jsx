import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createServiceType } from "../../redux/actions/serviceTypeActions";
import { fetchMarketTypes } from "../../redux/actions/marketTypeActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const AddServiceType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { marketTypes } = useSelector((state) => state.marketType);

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    marketPlaceId: "",
    serviceTypeName: "",
    price: "",
    status: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchMarketTypes());
  }, [dispatch]);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: name === "status" ? Number(value) : value,
  //   }));
  //   setErrors((prev) => ({ ...prev, [name]: "" }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "serviceTypeName") {
      const selectedMarketplace = marketTypes.find(
        (mt) => mt.id === Number(formData.marketPlaceId)
      );
      setFormData((prev) => ({
        ...prev,
        serviceTypeName: selectedMarketplace
          ? `${value} (${selectedMarketplace.marketPlaceType})`
          : value,
      }));
    } else if (name === "marketPlaceId") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
        // Also update the serviceTypeName to reflect new marketplace
        serviceTypeName: prev.serviceTypeName
          ? `${prev.serviceTypeName.split(" (")[0]} (${marketTypes.find(mt => mt.id === Number(value))?.marketPlaceType || ""})`
          : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: name === "status" ? Number(value) : value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.marketPlaceId) validationErrors.marketPlaceId = "Marketplace is required";
    if (!formData.serviceTypeName.trim()) validationErrors.serviceTypeName = "Marketplace type  is required";
    if (!formData.price || Number(formData.price) <= 0) validationErrors.price = "Price must be a positive number";
    if (formData.status !== 1 && formData.status !== 0) validationErrors.status = "Status is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(createServiceType(formData));
      setFormData({ marketPlaceId: "", serviceTypeName: "", price: "", status: 1 });
      setErrors({});
      toast.success("Marketplace added successfully!");
      navigate("/manage-marketplace");
    } catch (error) {
      // Use toast for server-side error
      toast.error(error.response?.data?.message || "Market Place already exists");
    }
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : isSidebarOpen ? 220 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid px-4 pt-3">
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header d-flex justify-content-between align-items-center">
              <h5 className="form-title m-0">Add Marketplace</h5>
              <Link to="/manage-services-type" className="btn btn-new-lead">
                Manage Marketplaces
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Marketplace */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Marketplace Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.marketPlaceId ? "is-invalid" : ""}`}
                      name="marketPlaceId"
                      value={formData.marketPlaceId}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Marketplace Type --</option>
                      {marketTypes?.map((mt) => (
                        <option key={mt.id} value={mt.id}>
                          {mt.marketPlaceType}
                        </option>
                      ))}
                    </select>
                    {errors.marketPlaceId && <div className="invalid-feedback">{errors.marketPlaceId}</div>}
                  </div>

                  {/* Service Type */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Marketplace <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="serviceTypeName"
                      value={formData.serviceTypeName}
                      onChange={handleChange}
                      className={`form-control ${errors.serviceTypeName ? "is-invalid" : ""}`}
                      placeholder="Enter Marketplace"
                    />
                    {errors.serviceTypeName && <div className="invalid-feedback">{errors.serviceTypeName}</div>}
                  </div>

                  {/* Price */}
                  <div className="col-md-4">
                    <label className="form-label">
                      Launch Price <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`form-control ${errors.price ? "is-invalid" : ""}`}
                      placeholder="Price"
                      min="0"
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                  </div>

                  {/* Status */}
                  <div className="col-md-4">
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
                    {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                  </div>

                  {/* Buttons */}
                  <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                    <button type="submit" className="btn btn-success px-4 me-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate("/manage-services-type")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Toast container */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default AddServiceType;
