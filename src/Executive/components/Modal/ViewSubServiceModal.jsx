import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewSubServiceModal = ({ show, handleClose, subService }) => {
  if (!subService) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Service Types</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Service Type:</strong> {subService.subServiceName}</p>
        <p><strong>Category:</strong> {subService.serviceCategoryName}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span style={{ color: subService.status === 1 ? "green" : "red", fontWeight: "" }}>
            {subService.status === 1 ? "Active" : "Inactive"}
          </span>
        </p>

        <p>
          <strong>Gender Applicable:</strong>{" "}
          <span
            style={{
              color: subService.isGenderApplicable === 1 ? "green" : "red",
              fontWeight: "",
            }}
          >
            {subService.isGenderApplicable === 1 ? "Yes" : "No"}
          </span>
        </p>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewSubServiceModal;
