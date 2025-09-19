import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewServiceCategoryModal = ({ show, handleClose, services }) => {
  if (!services) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View  Service Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Service Category Name:</strong> {services.categoryName}</p>
        <p><strong>Services Category Code	:</strong> {services.categoryCode}</p>
        {/* <p><strong>Status	:</strong> {services.servicesCode}</p> */}
        <p>
          <strong>Status:</strong>{" "}
          <span style={{ color: services.status ? "green" : "red" }}>
            {services.status ? "Active" : "Inactive"}
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

export default ViewServiceCategoryModal;
