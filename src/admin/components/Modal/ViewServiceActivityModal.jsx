import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewServiceActivityModal = ({ show, handleClose, activity }) => {
  if (!activity) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Service Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Service Category:</strong> {activity.serviceCategoryName}</p>
        <p><strong>Service Type:</strong> {activity.serviceTypeName || "-"}</p>
        <p><strong>Activity Name:</strong> {activity.activityName}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`badge ${activity.status === "Active" ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>
            {activity.status}
          </span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewServiceActivityModal;
