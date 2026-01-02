import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import { bulkUploadProducts, fetchMarketPlaceSellers } from "../../redux/actions/adminProductsAction";
import { useDispatch, useSelector } from "react-redux";

const BulkUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  const [formData, setFormData] = useState({
    sellerId: "",
    marketPlaceId: [],
    file: null,
  });

  const [errors, setErrors] = useState({});

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
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!formData.sellerId) err.sellerId = "Select a seller";
    if (formData.marketPlaceId.length === 0)
      err.marketPlaceId = "Select at least one marketplace";
    if (!formData.file) err.file = "Please upload a file";
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        dispatch(bulkUploadProducts({
          sellerId: formData.sellerId,
          marketPlaceId: formData.marketPlaceId,
          file: formData.file,
        }));
        navigate("/manage-products");
      } catch (err) {
        console.log(err);
      }
      setFormData({ sellerId: "", marketPlaceId: [], file: null });
    }
  };

  // Function to download sample CSV file
  const handleDownloadSample = () => {
    const sampleData = "sku,product_title,mrp,selling_price,available_stock,status\nSKU1234,realme ,10000,9000,11,1\nSKU12345,redmi,9000,9000,10,1";
    const blob = new Blob([sampleData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulk_upload_sample.csv";
    a.click();
    URL.revokeObjectURL(url);
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
          <div className="bg-white p-3 rounded shadow-sm mb-3 d-flex justify-content-between align-items-center">
            <h5>Bulk Upload Products</h5>
            <div>
              <button
                type="button"
                className="btn btn-outline-primary me-2"
                onClick={handleDownloadSample}
              >
                Download Sample CSV
              </button>
              <Link to="/manage-products" className="btn btn-new-lead">
                Manage Product
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm card-header">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Seller */}
                <div className="col-md-4">
                  <label className="form-label">Seller <span className="text-danger"> *</span></label>
                  <select
                    name="sellerId"
                    value={formData.sellerId}
                    onChange={handleChange}
                    className={`form-select ${errors.sellerId && "is-invalid"}`}
                  >
                    <option value="">Select Seller</option>
                    {marketPlacesellers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.businessName}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.sellerId}</div>
                </div>

                {/* Marketplace */}
                <div className="col-md-4">
                  <label className="form-label">Marketplace <span className="text-danger"> *</span></label>
                  <Select
                    isMulti
                    options={serviceTypeOptions}
                    value={serviceTypeOptions.filter((option) =>
                      formData.marketPlaceId.includes(option.value)
                    )}
                    onChange={(selected) =>
                      setFormData({
                        ...formData,
                        marketPlaceId: selected.map((s) => s.value),
                      })
                    }
                  />
                  {errors.marketPlaceId && (
                    <div className="text-danger mt-1">
                      {errors.marketPlaceId}
                    </div>
                  )}
                </div>

                {/* File Upload */}
                <div className="col-md-4">
                  <label className="form-label">Upload File <span className="text-danger"> *</span></label>
                  <input
                    type="file"
                    name="file"
                    className={`form-control ${errors.file && "is-invalid"}`}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.file}</div>
                </div>

                {/* Buttons */}
                <div className="col-12 d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-success me-2 px-4">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => navigate("/manage-products")}
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

export default BulkUpload;
