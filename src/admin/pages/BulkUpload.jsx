import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

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
    if (!formData.seller) err.seller = "Select a seller";
    if (formData.marketplaces.length === 0)
      err.marketplaces = "Select at least one marketplace";
    if (!formData.file) err.file = "Please upload a file";

    setErrors(err);

    if (Object.keys(err).length === 0) {
      alert(
        `Bulk upload submitted!\nSeller: ${
          formData.seller
        }\nMarketplaces: ${formData.marketplaces.join(", ")}\nFile: ${
          formData.file.name
        }`
      );
      setFormData({ seller: "", marketplaces: [], file: null });
    }
  };

  // Function to download sample CSV file
  const handleDownloadSample = () => {
    const sampleData =
      "Seller,Title,SKU,MRP,SellingPrice,Stock,Marketplace,Status\nSeller A,Product 1,SKU001,1000,900,50,Amazon,Active\nSeller B,Product 2,SKU002,1500,1200,30,Flipkart,Inactive";
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
                    name="seller"
                    value={formData.seller}
                    onChange={handleChange}
                    className={`form-select ${errors.seller && "is-invalid"}`}
                  >
                    <option value="">Select Seller</option>
                    {sellerOptions.map((s, idx) => (
                      <option key={idx} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.seller}</div>
                </div>

                {/* Marketplace */}
                <div className="col-md-4">
                  <label className="form-label">Marketplace <span className="text-danger"> *</span></label>
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
