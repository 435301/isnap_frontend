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

  /* Handle resize */
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Static Data */
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
    <div className="container-fluid d-flex p-0 bg-light">
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
          {/* Header */}
          <div className="bg-white p-3 rounded shadow-sm mb-3">
            <h5 className="m-0">Manage Products</h5>
          </div>

          {/* Filters */}
          <div className="bg-white p-3 rounded shadow-sm mb-3">
            <div className="row g-2 align-items-center">
              <div className="col-lg-3">
                <select className="form-select">
                  <option value="">Select Seller</option>
                  <option>Seller 1</option>
                  <option>Seller 2</option>
                </select>
              </div>

              <div className="col-lg-3">
                <select className="form-select">
                  <option value="">Select Marketplace</option>
                  <option>Amazon</option>
                  <option>Flipkart</option>
                </select>
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
          <div className="bg-white  p-3 rounded shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover  table-striped align-middle">
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
                          to={`/seller/manage-products`}
                          className="text-decoration-none"
                        >
                          <span className="badge bg-success px-3 py-2">
                            {item.activeSkus}
                          </span>
                        </Link>
                      </td>

                      <td>
                        <Link
                          to={`/seller/manage-products`}
                          className="text-decoration-none"
                        >
                          <span className="badge bg-warning text-dark px-3 py-2">
                            {item.inactiveSkus}
                          </span>
                        </Link>
                      </td>

                      <td>
                        <Link
                          to={`/seller/manage-products`}
                          className="text-decoration-none"
                        >
                          <span className="badge bg-primary px-3 py-2">
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
  );
};

export default ManageProducts;
