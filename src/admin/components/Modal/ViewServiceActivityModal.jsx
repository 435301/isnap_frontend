import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const ViewServiceActivityModal = ({ show, handleClose, activity }) => {
  if (!activity) return null;

  const getStatusText = (status) => (status === 1 ? "Active" : "Inactive");
  const getStatusClass = (status) =>
    status === 1 ? "bg-success-light text-success" : "bg-danger-light text-danger";

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Service Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Service Category:</strong> {activity.serviceCategoryName || "-"}
        </p>
        <p>
          <strong>Service Type:</strong> {activity.subServiceName || "-"}
        </p>
        <p>
          <strong>Activity Name:</strong> {activity.activityName || "-"}
        </p>

        {activity.isGenderApplicable ? (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Male Price</th>
                <th>Female Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{activity.malePrice || 0}</td>
                <td>{activity.femalePrice || 0}</td>
                <td>
                  <span className={`badge ${getStatusClass(activity.status)}`}>
                    {getStatusText(activity.status)}
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <p className="mb-2">
            <strong className="mb-2">Price:</strong> {activity.price || 0} <br />
            <strong>Status:</strong>{" "}
            <span
              className={`badge mt-3`}
              style={{ color: activity.status === 1 ? "green" : "red", fontWeight: "500",  fontSize: "14px"}}
            >
              {activity.status === 1 ? "Active" : "Inactive"}
            </span>


          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewServiceActivityModal;
