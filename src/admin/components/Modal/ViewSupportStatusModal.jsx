import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewSupportStatus = ({ show, handleClose, supportStatus }) => {
  if (!supportStatus) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Support Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Support Status :</strong> {supportStatus?.supportStatusTitle}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {supportStatus?.status ? (
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

export default ViewSupportStatus;
