import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewSubServiceModal = ({ show, handleClose, subService }) => {
  if (!subService) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Sub-Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {subService.subServiceName}</p>
        <p><strong>Category:</strong> {subService.serviceCategoryName}</p>
        <p>
          <strong>Status:</strong>{" "}
          {subService.status === 1 ? "Active" : "Inactive"}
        </p>
        <p>
          <strong>Gender Applicable:</strong>{" "}
          {subService.isGenderApplicable === 1 ? "Yes" : "No"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewSubServiceModal;
