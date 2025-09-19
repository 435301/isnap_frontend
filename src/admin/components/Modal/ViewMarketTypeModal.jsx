import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewMarketTypeModal = ({ show, handleClose, marketType }) => {
  if (!marketType) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Marketplace Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Marketplace Type :</strong> {marketType.marketTypeName}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {marketType.status ? (
            <span className=" text-success">Active</span>
          ) : (
            <span className=" text-danger">Inactive</span>
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
