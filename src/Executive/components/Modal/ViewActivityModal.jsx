import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewActivityModal = ({ show, handleClose, activity }) => {
  if (!activity) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Activity Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Service Category	:</strong> {activity.serviceCategory}</p>
        <p><strong>Sub Service:</strong> {activity.subService}</p>
        <p><strong>Activity Name:</strong> {activity.activityName}</p>
        <p><strong>Activity Code:</strong> {activity.activityCode}</p>

        <p><strong>Status:</strong> {activity.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewActivityModal;
