import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import { bulkSellerUploadProducts } from "../../redux/actions/sellerProductsAction";

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
  useEffect(() => {
    dispatch(fetchServiceTypes("", "", "", 1, ""));
  }, [dispatch]);

  const [formData, setFormData] = useState({
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

  const handleMarketplaceChange = (selected) => {
  setFormData((prev) => ({
    ...prev,
    marketPlaceId: selected ? selected.map((s) => s.value) : [],
  }));

  setErrors((prev) => ({
    ...prev,
    marketPlaceId: "",
  }));
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (formData.marketPlaceId.length === 0)
      err.marketPlaceId = "Select at least one marketplace";
    if (!formData.file) err.file = "Please upload a file";
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        dispatch(bulkSellerUploadProducts({
          marketPlaceId: formData.marketPlaceId,
          file: formData.file,
        }));
        navigate("/seller/manage-products");
      } catch (err) {
        console.log(err);
      }
      setFormData({ marketPlaceId: [], file: null });
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
              <Link to="/seller/manage-products" className="btn btn-new-lead">
                Manage Product
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm card-header">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">


                {/* Marketplace */}
                <div className="col-md-4">
                  <label className="form-label">Marketplace <span className="text-danger"> *</span></label>
                  <Select
                    isMulti
                    options={serviceTypeOptions}
                    value={serviceTypeOptions.filter((option) =>
                      formData.marketPlaceId.includes(option.value)
                    )}
                    onChange={handleMarketplaceChange}
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

export default BulkUpload;
