import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewWingModal = ({ show, handleClose,selectedWing }) => {
  if (!selectedWing) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View wing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Wing Name:</strong> {selectedWing.title}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {selectedWing.status === 1 || selectedWing.status === "active" ? (
            <span className="badge bg-success text-dark" >Active</span>
          ) : (
            <span className="badge bg-danger text-dark">Inactive</span>
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

export default ViewWingModal;
