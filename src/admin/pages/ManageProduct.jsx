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
  const products = [
    {
      id: 1,
      marketplaces: ["Amazon", "Flipkart"],
      seller: "John Doe",
      title: "Wireless Mouse",
      stock: 100,
      mrp: 999,
      sellingPrice: 799,
      status: 1,
    },
    {
      id: 2,
      marketplaces: ["Snapdeal"],
      seller: "Jane Smith",
      title: "Bluetooth Headphones",
      stock: 50,
      mrp: 1999,
      sellingPrice: 1499,
      status: 0,
    },
    {
      id: 3,
      marketplaces: [],
      seller: "Mike Johnson",
      title: "Gaming Keyboard",
      stock: 30,
      mrp: 2999,
      sellingPrice: 2499,
      status: 1,
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
                  <h5 className="form-title m-0">Manage Products</h5>
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

                  <select className="form-select me-2">
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  {/* Search Input */}
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search Products..."
                    onChange={(e) => console.log(e.target.value)} // replace with your search logic
                  />
                </div>

                <div className="col-md-2 d-flex">
                  <button className="btn btn-success text-white me-3">
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border">
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
                <div className="col-lg-2">
                  {" "}
                  <Link to="/add-product" className="reports mp-btn-add btn">
                    <i className="bi bi-plus-circle me-1"></i> Add Products
                    Listing
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              {/* Second Row: Action Buttons */}
              <div className="row g-2 align-items-center mb-3">
                <div className="col text-end">
                  <button className="mp-btn mp-btn-active me-2">
                    <i className="bi bi-check-circle me-1"></i> Active
                  </button>
                  <button className="mp-btn mp-btn-inactive me-2">
                    <i className="bi bi-x-circle me-1"></i> Inactive
                  </button>
                  <button className="mp-btn mp-btn-delete me-2">
                    <i className="bi bi-trash me-1"></i> Delete
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectedProducts.length === products.length}
                          onChange={() =>
                            setSelectedProducts(
                              selectedProducts.length === products.length
                                ? []
                                : products.map((p) => p.id)
                            )
                          }
                        />
                      </th>
                      <th>S.No</th>
                      <th>Marketplace</th>
                      <th>Seller Name</th>
                      <th>Product Title</th>
                      <th>Available Stock</th>
                      <th>MRP</th>
                      <th>Selling Price</th>
                      <th>Status / Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleCheckboxChange(product.id)}
                          />
                        </td>
                        <td>{index + 1}</td>
                        <td>
                          {product.marketplaces.length
                            ? product.marketplaces.join(", ")
                            : "-"}
                        </td>
                        <td>{product.seller}</td>
                        <td>{product.title}</td>
                        <td>{product.stock}</td>
                        <td>₹{product.mrp}</td>
                        <td>₹{product.sellingPrice}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span
                              className={`badge ${
                                product.status === 1
                                  ? "bg-success-light text-success"
                                  : "bg-danger-light text-danger"
                              }`}
                            >
                              {product.status === 1 ? "Active" : "Inactive"}
                            </span>
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
