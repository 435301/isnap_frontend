import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewLeadSourceModal = ({ show, handleClose, leadSource }) => {
  if (!leadSource) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Business Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Lead Source :</strong> {leadSource?.LeadSourceTitle}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {leadSource?.status ? (
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

export default ViewLeadSourceModal;
