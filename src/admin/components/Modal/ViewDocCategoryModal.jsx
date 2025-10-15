import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewDocCategoryModal = ({ show, handleClose, docCategory }) => {
  if (!docCategory) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Document Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Document Category :</strong> {docCategory?.title}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {docCategory?.status ? (
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

export default ViewDocCategoryModal;
