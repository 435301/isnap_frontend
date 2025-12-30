import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Example static data
  const skuData = [
    {
      id: 1,
      seller: "John Doe",
      marketplace: "Amazon",
      activeSkus: 120,
      inactiveSkus: 30,
      totalSkus: 150,
    },
    {
      id: 2,
      seller: "Jane Smith",
      marketplace: "Flipkart",
      activeSkus: 80,
      inactiveSkus: 20,
      totalSkus: 100,
    },
    {
      id: 3,
      seller: "Mike Johnson",
      marketplace: "Snapdeal",
      activeSkus: 45,
      inactiveSkus: 15,
      totalSkus: 60,
    },
  ];

  return (
    <div className="container-fluid d-flex p-0">
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
          {/* Header Card */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              {/* First Row: Title + Filters + Refresh */}
              <div className="row g-2 align-items-center mb-2">
                <div className="col-lg-12">
                  <h5 className="form-title m-0">Manage Reports</h5>
                </div>

                <div className="col-lg-8 d-flex align-items-center">
                  <select className="form-select me-2">
                    <option value="">Select Seller</option>
                    <option value="seller1">Seller 1</option>
                    <option value="seller2">Seller 2</option>
                  </select>

                  <select className="form-select me-2">
                    <option value="">Select Marketplace</option>
                    <option value="marketplace1">Marketplace 1</option>
                    <option value="marketplace2">Marketplace 2</option>
                  </select>
                </div>

                <div className="col-md-2 d-flex">
                  <button className="btn btn-success text-white me-3">
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border">
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              {/* Second Row: Action Buttons */}

              <div className="table-responsive">
                <table className="table align-middle table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Seller</th>
                      <th>Marketplace</th>
                      <th>Active SKUs</th>
                      <th>Inactive SKUs</th>
                      <th>Total SKUs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skuData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.seller}</td>
                        <td>{item.marketplace}</td>
                        <td>
                          <Link
                            to="/manage-products"
                            className="text-decoration-none"
                          >
                            <span className="badge bg-success cursor-pointer">
                              {item.activeSkus}
                            </span>
                          </Link>
                        </td>

                        <td>
                          <Link
                            to="/manage-products"
                            className="text-decoration-none"
                          >
                            <span className="badge bg-warning text-dark cursor-pointer">
                              {item.inactiveSkus}
                            </span>
                          </Link>
                        </td>

                        <td>
                          <Link
                            to="/manage-products"
                            className="text-decoration-none"
                          >
                            <span className="badge bg-primary cursor-pointer">
                              {item.totalSkus}
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
