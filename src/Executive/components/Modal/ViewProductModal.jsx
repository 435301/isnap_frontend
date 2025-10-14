import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewProductModal = ({ show, handleClose, product }) => {
  if (!product) return null;

  // Convert status to readable text
  const statusText = Number(product.status) === 1 ? "Active" : "Inactive";
  const statusClass = Number(product.status) === 1 ? "text-success" : "text-danger";

  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>View Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>From Qty:</strong> {product.fromQty}</p>
        <p><strong>To Qty:</strong> {product.toQty}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={statusClass}>{statusText}</span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewProductModal;
