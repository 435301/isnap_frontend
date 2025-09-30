import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewLeadStatusModal = ({ show, handleClose, leadStatus }) => {
  if (!leadStatus) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Lead Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Lead Status :</strong> {leadStatus?.LeadStatusTitle}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {leadStatus?.status ? (
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

export default ViewLeadStatusModal;
