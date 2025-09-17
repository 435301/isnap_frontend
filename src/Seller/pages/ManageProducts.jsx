import React, { useState, useEffect } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import img1 from "../assets/images/img1.png";

const ManageProducts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const products = [
    {
    id: 101,
    image: img1,  // ✅ imported image
    sku: "SKU-001",
    name: "Headphone",
    category: "Fashion",
    qty: 1638,
    stock: "Stock"
  },
 {
    id: 101,
    image: img1,  // ✅ imported image
    sku: "SKU-001",
    name: "Headphone",
    category: "Fashion",
    qty: 1638,
    stock: "Stock"
  },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 992) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content flex-grow-1">
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-2">
                  <h5 className="form-title m-0">Manage Products</h5>
                </div>
                <div className="col-md-4"></div>
                <div className="col-lg-6 text-end">
                  <Link to="/seller/add-products" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Product
                  </Link>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    placeholder="Search by"
                  />
                </div>
                <div className="col-md-3">
                  <select className="form-select">
                    <option defaultValue="">Select Category</option>
                    <option>Fashion</option>
                    <option>Electronics</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex">
                  <button className="btn btn-success text-white me-3">
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border-1">
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <div className="table-responsive">
                <table className="table align-middle table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>S.no</th>
                      <th>Product Image</th>
                      <th>Product SKU</th>
                      <th>Product Id</th>
                      <th>Product Category</th>
                      <th>Quantity</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={product.image} alt={product.name} className="rounded" width="40" />
                        </td>
                        <td>{product.name}</td>
                        <td>#{product.id}</td>
                        <td>{product.category}</td>
                        <td>{product.qty.toLocaleString()}</td>
                        <td>
                          <span
                            className={`badge ${product.stock === 'Stock' ? 'bg-success-light text-success' : 'bg-danger-light text-danger'}`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-icon btn-view">
                              <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-icon btn-edit">
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-icon btn-delete">
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
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
