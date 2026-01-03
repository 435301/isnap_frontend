import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageOrders = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
    );
  };

  /* ✅ Updated Orders Data */
  const orders = [
    {
      id: 1,
      subOrderId: "SUB-1001",
      orderId: "ORD-1001",
      product: "Wireless Mouse",
      mrp: 999,
      sellingPrice: 799,
      qty: 2,
      seller: "John Traders",
      marketplace: "Amazon",
      status: "Active",
    },
    {
      id: 2,
      subOrderId: "SUB-1002",
      orderId: "ORD-1002",
      product: "Bluetooth Headphones",
      mrp: 1999,
      sellingPrice: 1499,
      qty: 1,
      seller: "Smart Sellers",
      marketplace: "Flipkart",
      status: "Inactive",
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
        <Navbar />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="row mb-2">
            <div className="bg-white p-2 rounded shadow-sm card-header">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Manage sub Orders</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/add-sub-orders" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Sub Orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2 mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                {/* Search By */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search By"
                  />
                </div>

                {/* Order ID */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select">
                    <option value="">Select Order ID</option>
                    <option value="ODR-111">ODR-111</option>
                    <option value="ODR-112">ODR-112</option>
                  </select>
                </div>

                {/* Marketplace */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select">
                    <option value="">Marketplace</option>
                    <option value="amazon">Amazon</option>
                    <option value="flipkart">Flipkart</option>
                  </select>
                </div>

                {/* Seller */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select">
                    <option value="">Seller</option>
                    <option value="seller1">Seller 1</option>
                    <option value="seller2">Seller 2</option>
                  </select>
                </div>

                {/* Date Range */}
                <div className="col-lg-2 col-md-6 col-sm-12">
                  <div className="d-flex gap-1">
                    <DatePicker
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      selectsStart
                      startDate={fromDate}
                      endDate={toDate}
                      placeholderText="From Date"
                      className="form-control"
                      dateFormat="dd-MM-yyyy"
                    />
                    <DatePicker
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      selectsEnd
                      startDate={fromDate}
                      endDate={toDate}
                      minDate={fromDate}
                      placeholderText="To Date"
                      className="form-control"
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="col-lg-2 col-md-6 col-sm-12 d-flex">
                  <button className="btn btn-success me-2 ">
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border ">
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      
                      <th>S.No</th>
                      <th>Sub Order ID</th>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>MRP</th>
                      <th>Selling Price</th>
                      <th>Qty</th>
                      <th>Seller Name</th>
                      <th>Marketplace</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id}>
                        {/* <td>
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleCheckboxChange(order.id)}
                          />
                        </td> */}
                        <td>{index + 1}</td>
                        <td>{order.subOrderId}</td>
                        <td>{order.orderId}</td>
                        <td>{order.product}</td>
                        <td>₹{order.mrp}</td>
                        <td>₹{order.sellingPrice}</td>
                        <td>{order.qty}</td>
                        <td>{order.seller}</td>
                        <td>{order.marketplace}</td>

                        {/* Status */}

                        <td>
                          <span className="badge bg-success-light text-success">
                            Active
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          {/* <button
                            className="btn btn-icon btn-view me-1"
                            onClick={() => navigate("/order-details")}
                          >
                            <i className="bi bi-eye"></i>
                          </button> */}
                          <button className="btn btn-icon btn-edit me-1">
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button className="btn btn-icon btn-delete">
                            <i className="bi bi-trash"></i>
                          </button>
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

export default ManageOrders;
