import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";

const EditServiceActivityOffcanvas = ({ show, handleClose, activity, onSave }) => {
  const [formData, setFormData] = useState({
    serviceCategoryName: "",
    serviceTypeName: "",
    activityName: "",
    status: "Active",
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        serviceCategoryName: activity.serviceCategoryName || "",
        serviceTypeName: activity.serviceTypeName || "",
        activityName: activity.activityName || "",
        status: activity.status || "Active",
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...activity, ...formData });
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Service Activity</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Service Category</Form.Label>
            <Form.Control
              type="text"
              name="serviceCategoryName"
              value={formData.serviceCategoryName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Service Type</Form.Label>
            <Form.Control
              type="text"
              name="serviceTypeName"
              value={formData.serviceTypeName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Activity Name</Form.Label>
            <Form.Control
              type="text"
              name="activityName"
              value={formData.activityName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="me-2" variant="success">
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditServiceActivityOffcanvas;
