import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewIssueTypeModal = ({ show, handleClose, issueType }) => {
  if (!issueType) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Issue Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Issue Type :</strong> {issueType?.issueTypeTitle}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {issueType?.status ? (
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

export default ViewIssueTypeModal;
