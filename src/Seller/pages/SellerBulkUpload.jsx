import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BulkUpload = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [formData, setFormData] = useState({
    seller: "",
    marketplaces: [],
    file: null,
  });

  const [errors, setErrors] = useState({});

  const sellerOptions = ["Seller A", "Seller B", "Seller C"];

  const marketplaceOptions = [
    { value: "Amazon", label: "Amazon" },
    { value: "Flipkart", label: "Flipkart" },
    { value: "Meesho", label: "Meesho" },
    { value: "JioMart", label: "JioMart" },
  ];

  /* Sidebar responsive */
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () =>
    setIsSidebarOpen((prev) => !prev);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (!file.name.toLowerCase().endsWith(".csv")) {
        setErrors({ file: "Only CSV files are allowed" });
        return;
      }
      setFormData((prev) => ({ ...prev, file }));
      setErrors((prev) => ({ ...prev, file: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const err = {};
    if (!formData.seller) err.seller = "Seller is required";
    if (formData.marketplaces.length === 0)
      err.marketplaces = "Select at least one marketplace";
    if (!formData.file) err.file = "CSV file is required";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // API call will go here
      alert("Bulk products uploaded successfully!");
      navigate("/seller/manage-products");
    }
  };

  /* Download Sample CSV */
  const handleDownloadSample = () => {
    const csv =
      "Seller,Title,SKU,MRP,SellingPrice,Stock,Marketplace,Status\n" +
      "Seller A,Product 1,SKU001,1000,900,50,Amazon,Active\n" +
      "Seller B,Product 2,SKU002,1500,1200,30,Flipkart,Inactive";

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulk_upload_sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-fluid d-flex p-0 bg-light">
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className="content flex-grow-1"
        style={{
          marginLeft:
            windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="bg-white p-3 rounded shadow-sm mb-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0">Bulk Upload Products</h5>
            <div>
              <button
                className="btn btn-outline-primary me-2"
                onClick={handleDownloadSample}
              >
                Download Sample CSV
              </button>
              <Link
                to="/seller/manage-product"
                className="btn btn-new-lead"
              >
                Manage Products
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-4 rounded shadow-sm card-header">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Seller */}
                <div className="col-md-4">
                  <label className="form-label">
                    Seller <span className="text-danger">*</span>
                  </label>
                  <select
                    name="seller"
                    value={formData.seller}
                    onChange={handleChange}
                    className={`form-select ${
                      errors.seller && "is-invalid"
                    }`}
                  >
                    <option value="">Select Seller</option>
                    {sellerOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    {errors.seller}
                  </div>
                </div>

                {/* Marketplace */}
                <div className="col-md-4">
                  <label className="form-label">
                    Marketplace <span className="text-danger">*</span>
                  </label>
                  <Select
                    isMulti
                    options={marketplaceOptions}
                    value={marketplaceOptions.filter((o) =>
                      formData.marketplaces.includes(o.value)
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

                {/* File */}
                <div className="col-md-4">
                  <label className="form-label">
                    Upload CSV <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="file"
                    accept=".csv"
                    className={`form-control ${
                      errors.file && "is-invalid"
                    }`}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    {errors.file}
                  </div>
                </div>

                {/* Buttons */}
                <div className="col-12 d-flex justify-content-end mt-4">
                  <button
                    type="submit"
                    className="btn btn-success me-2 px-4"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() =>
                      navigate("/seller/manage-products")
                    }
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
