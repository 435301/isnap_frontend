import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageOrders = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth] = useState(window.innerWidth);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
    );
  };

  // ✅ Static Orders Data (Replace with API later)
  const orders = [
    {
      id: 1,
      orderId: "ORD-1001",
      seller: "John Traders",
      marketplace: "Amazon",
      orderDate: "2025-01-01",
      customerName: "Ravi Kumar",
      customerMobile: "9876543210",
      qty: 3,
      totalAmount: 2499,
    },
    {
      id: 2,
      orderId: "ORD-1002",
      seller: "Smart Sellers",
      marketplace: "Flipkart",
      orderDate: "2025-01-02",
      customerName: "Anita Sharma",
      customerMobile: "9123456789",
      qty: 1,
      totalAmount: 1499,
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
          {/* Header Card */}
          <div className="row mb-2">
            <div className="bg-white p-2 rounded shadow-sm card-header mb-2">
              <div className="row  g-2 align-items-center">
                {/* Title */}
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Manage Orders</h5>
                </div>
                <div className="col-lg-6 text-end">
                  {" "}
                  <Link to="/add-orders" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add orders
                    Listing
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row  g-2 align-items-center">
                {/* Title */}
                {/* <div className="col-lg-2">
                  <h5 className="form-title m-0">Manage Orders</h5>
                </div> */}
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search By"
                  />
                </div>
                {/* Marketplace */}
                <div className="col-lg-2">
                  <select className="form-select">
                    <option value="">Marketplace</option>
                    <option value="amazon">Amazon</option>
                    <option value="flipkart">Flipkart</option>
                  </select>
                </div>

                {/* Seller */}
                <div className="col-lg-2">
                  <select className="form-select">
                    <option value="">Seller</option>
                    <option value="seller1">Seller 1</option>
                    <option value="seller2">Seller 2</option>
                  </select>
                </div>

                {/* From Date */}
                <div className="col-lg-2">
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
                </div>

                {/* To Date */}
                <div className="col-lg-2">
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

                {/* Actions */}
                <div className="col-lg-2 ">
                  <button className="btn btn-success me-2">
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border">
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
                      <th>Order ID</th>
                      <th>Seller Name</th>
                      <th>Marketplace</th>
                      <th>Order Date</th>
                      <th>Order By</th>
                      <th>Qty</th>
                      <th>Total Amount</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.orderId}</td>
                        <td>{order.seller}</td>
                        <td>{order.marketplace}</td>
                        <td>{order.orderDate}</td>
                        <td>
                          <span className="">
                            {" "}
                            <strong>{order.customerName}</strong>
                          </span>
                          <br />
                          <small className="text-muted">
                            {order.customerMobile}
                          </small>
                        </td>
                        <td>
                          <Link
                            to="/manage-sub-orders"
                            className="text-primary fw-semibold text-decoration-none"
                          >
                            {order.qty}
                          </Link>
                        </td>

                        <td>₹{order.totalAmount}</td>
                        {/* <td>
                        <button className="btn btn-sm btn-light me-1">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-light">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td> */}
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
