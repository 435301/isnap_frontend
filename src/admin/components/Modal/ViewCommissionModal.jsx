import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewCommissionModal = ({ show, handleClose, commission }) => {
  if (!commission) return null;

  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>View Commission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Title:</strong> {commission.title}
        </p>
        <p>
          <strong>Percentage:</strong> {commission.percentage}%
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              commission.status === 1 ? "text-success fw-bold" : "text-danger fw-bold"
            }
          >
            {commission.status === 1 ? "Active" : "Inactive"}
          </span>
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

export default ViewCommissionModal;
