import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewMarketTypeModal = ({ show, handleClose, marketType }) => {
  if (!marketType) return null; // ⛔ No data, don't render

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Market Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Market Type Name:</strong> {marketType.marketTypeName}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {marketType.status ? (
            <span className="badge bg-success">Active</span>
          ) : (
            <span className="badge bg-danger">Inactive</span>
          )}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewMarketTypeModal;
