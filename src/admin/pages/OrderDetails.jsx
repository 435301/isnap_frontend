import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const OrderDetails = () => {
  const order = {
    orderId: "ORD-1001",
    subOrderId: "SUB-2001",
    seller: "John Traders",
    marketplace: "Amazon",
    orderDate: "01 Jan 2025",
    status: "Delivered",
    customerName: "Ravi Kumar",
    customerMobile: "9876543210",
    email: "ravi@gmail.com",
    address: "Flat 302, Green Homes, Madhapur, Hyderabad, Telangana - 500081",
    deliveryCharge: 50,
  };

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      mrp: 2999,
      price: 2499,
      qty: 1,
      deliveryDate: "05 Jan 2025",
    },
    {
      id: 2,
      name: "Mobile Charger",
      mrp: 999,
      price: 799,
      qty: 2,
      deliveryDate: "06 Jan 2025",
    },
  ];

  const subTotal = products.reduce((sum, p) => sum + p.price * p.qty, 0);
  const grandTotal = subTotal + order.deliveryCharge;

  return (
    <div className="container-fluid d-flex p-0 bg-light">
      <Sidebar isOpen />

      <div className="content flex-grow-1">
        <Navbar />

        <div className="container-fluid px-4 pt-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="fw-semibold mb-1">Order Details</h4>
              <small className="text-muted">Order ID: {order.orderId}</small>
            </div>
            <Link to="/manage-orders" className="btn btn-new-lead">
              ← Back
            </Link>
          </div>

          {/* Status */}
          <div className="status-card mb-2">
            <div>
              <span className="status-dot"></span>
              <span className="fw-semibold ms-2">{order.status}</span>
            </div>
            <small className="text-muted">
              Ordered on {order.orderDate} via {order.marketplace}
            </small>
          </div>

          {/* Info Cards */}
          <div className="row g-4 mb-2">
            <div className="col-lg-4">
              <div className="info-card h-100">
                <h6 className="info-title">Order Info</h6>
                <p>
                  <span>Sub Order:</span> {order.subOrderId}
                </p>
                <p>
                  <span>Seller:</span> {order.seller}
                </p>
                <p>
                  <span>Marketplace:</span> {order.marketplace}
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="info-card h-100">
                <h6 className="info-title">Customer Info</h6>
                <p>
                  <span>Name:</span> {order.customerName}
                </p>
                <p>
                  <span>Mobile:</span> {order.customerMobile}
                </p>
                <p>
                  <span>Email:</span> {order.email}
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="info-card h-100">
                <h6 className="info-title">Delivery Address</h6>
                <p className="mb-0">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="info-card mb-2">
            <h6 className="info-title mb-3">Products</h6>

            <div className="table-responsive">
              <table className="table align-middle table-hover modern-table">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>MRP</th>
                    <th>Selling Price</th>
                    <th>Delivery Date</th>

                    <th>Qty</th>
                    <th className="text-end">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={p.id}>
                      <td>{i + 1}</td>
                      <td>{p.name}</td>
                      <td>₹{p.mrp}</td>
                      <td>₹{p.price}</td>
                      <td>{p.deliveryDate}</td>
                      <td>{p.qty}</td>
                      <td className="text-end fw-semibold">
                        ₹{p.price * p.qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className="row justify-content-end mt-3">
              <div className="col-md-4">
                <div className="border rounded p-3 bg-light">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{subTotal}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery Charges</span>
                    <span>₹{order.deliveryCharge}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-semibold">
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="d-flex justify-content-end gap-2 mb-4">
            <button className="btn btn-outline-secondary">Cancel</button>
            <button className="btn btn-primary">
              <i className="bi bi-pencil me-1"></i> Edit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
