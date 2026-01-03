import React, { useState, useEffect } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ManageProducts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  /* Handle window resize */
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ✅ New Static Product Data */
  const productData = [
    {
      id: 1,
      marketplace: "Amazon",
      sku: "AMZ-001",
      productName: "Wireless Mouse",
      listedCount: 45,
      nonListedCount: 5,
    },
    {
      id: 2,
      marketplace: "Flipkart",
      sku: "FLP-102",
      productName: "Bluetooth Keyboard",
      listedCount: 30,
      nonListedCount: 10,
    },
    {
      id: 3,
      marketplace: "Snapdeal",
      sku: "SNP-210",
      productName: "USB-C Charger",
      listedCount: 18,
      nonListedCount: 7,
    },
  ];

  return (
    <div className="container-fluid d-flex p-0 bg-light">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 250 : 95) : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="bg-white p-3 rounded shadow-sm mb-3">
            <h5 className="m-0">Marketplace Report</h5>
          </div>

          {/* Filters */}
          <div className="bg-white p-3 rounded shadow-sm mb-3 card-header">
            <div className="row g-2 align-items-center">
              <div className="col-lg-3">
                <select className="form-select">
                  <option value="">Select Marketplace</option>
                  <option>Amazon</option>
                  <option>Flipkart</option>
                  <option>Snapdeal</option>
                </select>
              </div>

              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by SKU / Product Name"
                />
              </div>

              <div className="col-lg-2 d-flex">
                <button className="btn btn-success me-2">
                  <i className="bi bi-search"></i>
                </button>
                <button className="btn btn-light border">
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover  table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Sl No</th>
                    <th>Marketplace</th>
                    <th>SKU</th>
                    <th>Product Name</th>
                    <th>Live Count</th>
                    <th>Non-Live Count</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.marketplace}</td>
                      <td>{item.sku}</td>
                      <td>{item.productName}</td>

                      <td className="">
                        <span className="text-info px-4">
                          {item.listedCount}
                        </span>{" "}
                      </td>

                      <td>
                        <span className="text-info px-5">
                          {item.nonListedCount}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {productData.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
