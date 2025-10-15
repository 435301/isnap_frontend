import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewDocTypeModal = ({ show, handleClose, docType }) => {
  console.log('docType',docType)
  if (!docType) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Document Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <p>
          <strong>Document Category :</strong> {docType?.documentCategoryTitle}
        </p>
        <p>
          <strong>Document Type :</strong> {docType?.documentType}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {docType?.status ? (
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

export default ViewDocTypeModal;
