import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form, Alert } from "react-bootstrap";

const EditBillingOffcanvas = ({
  showEditOffcanvas,
  setShowEditOffcanvas,
  selectedBilling,
  handleSaveChanges,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    durationRequired: 0,
    status: 1,
  });
  const [errors, setErrors] = useState({}); // For client-side validation
  const [serverError, setServerError] = useState(""); // For server-side errors

  // Populate formData when selectedBilling changes
  useEffect(() => {
    if (selectedBilling) {
      setFormData({
        id: selectedBilling.id || "",
        title: selectedBilling.title || "",
        status: selectedBilling.status ?? 1,
        durationRequired: selectedBilling.durationRequired ?? 0,
      });
    }
  }, [selectedBilling]);

  // Reset formData and errors when offcanvas closes
  useEffect(() => {
    if (!showEditOffcanvas) {
      setFormData({ id: "", title: "", status: 1 });
      setErrors({});
      setServerError("");
    }
  }, [showEditOffcanvas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "status" ? Number(value) : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error for this field
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.title.trim()) {
      tempErrors.title = "Title is required";
    }
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Call parent function
      await handleSaveChanges(formData);
      // Close offcanvas on success
      setShowEditOffcanvas(false);
    } catch (error) {
      // Display server error
      if (error.response && error.response.data && error.response.data.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Offcanvas
      show={showEditOffcanvas}
      onHide={() => setShowEditOffcanvas(false)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Billing Cycle</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {serverError && <Alert variant="danger">{serverError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </Form.Select>
          </Form.Group>

           <Form.Group className="mb-3">
            <Form.Label>Duration Required</Form.Label>
            <Form.Select
              name="durationRequired"
              value={formData.durationRequired}
              onChange={handleChange}
            >
              <option value={1}>Required</option>
              <option value={0}>Not Required</option>
            </Form.Select>
          </Form.Group>

          <div className="text-end d-flex justify-content-end">
            <Button
              variant="light"
              className="me-2"
              onClick={() => setShowEditOffcanvas(false)}
            >
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditBillingOffcanvas;
