// src/components/Modal/ViewDigitalMarketModal.js
import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";

const ViewDigitalMarketModal = ({ show, handleClose, market }) => {
  if (!market) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Digital Market Pricing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Price:</strong> ₹{market.price}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color: market.status === 1 ? "green" : "red",
              fontWeight: "",
            }}
          >
            {market.status === 1 ? "Active" : "Inactive"}
          </span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDigitalMarketModal;
