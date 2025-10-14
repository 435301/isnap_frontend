import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewRoleModal = ({ showViewModal, setShowViewModal, selectedRole }) => {
  if (!selectedRole) return null;

  const handleClose = () => setShowViewModal(false);

  return (
    <Modal show={showViewModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Role Name:</strong> {selectedRole.roleTitle}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {selectedRole.status === true || selectedRole.status === "active" ? (
            <span className="badge bg-success">Active</span>
          ) : (
            <span className="badge bg-danger">Inactive</span>
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

export default ViewRoleModal;
