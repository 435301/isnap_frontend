import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";

const EditDepartmentModal = ({
  showEditModal,
  setShowEditModal,
  selectedDepartment,
  handleSaveChanges, // async function that returns error message if any
}) => {
  const [departmentName, setDepartmentName] = useState("");
  const [status, setStatus] = useState(1);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Populate form when selectedDepartment changes
  useEffect(() => {
    if (selectedDepartment) {
      setDepartmentName(selectedDepartment.departmentName || "");
      setStatus(selectedDepartment.status ?? 1);
      setErrors({});
      setServerError("");
    }
  }, [selectedDepartment]);

  // Validate fields
  const validate = () => {
    const newErrors = {};
    if (!departmentName.trim()) newErrors.departmentName = "Department Name is required";
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const updatedDepartment = {
    id: selectedDepartment.id,
    DepartmentName: departmentName.trim(),
    status,
  };

  // Call parent handler and capture server error
  const errorMessage = await handleSaveChanges(updatedDepartment);
  if (errorMessage) {
    setServerError(errorMessage); // show inside modal
  } else {
    setServerError(""); // clear previous errors
  }
};


  return (
    <Offcanvas
      show={showEditModal}
      onHide={() => setShowEditModal(false)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Department</Offcanvas.Title>
      </Offcanvas.Header>

      <Form onSubmit={handleSubmit}>
        <Offcanvas.Body>
          {/* Server Error */}
          {serverError && <div className="alert alert-danger">{serverError}</div>}

          {/* Department Name */}
          <Form.Group className="mb-3">
            <Form.Label>
              Department Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              isInvalid={!!errors.departmentName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.departmentName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </Form.Select>
          </Form.Group>

          {/* Footer Buttons */}
          <div className="d-flex justify-content-end">
            <Button
              variant="light"
              onClick={() => setShowEditModal(false)}
              className="me-2"
            >
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Save Changes
            </Button>
          </div>
        </Offcanvas.Body>
      </Form>
    </Offcanvas>
  );
};

export default EditDepartmentModal;
