import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";

const EditWingModal = ({
  showEditModal,
  setShowEditModal,
  selectedWing,
  handleSaveChanges, // async function that returns error message if any
}) => {
    console.log('selectedWing',selectedWing)
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(1);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Populate form when selectedDepartment changes
  useEffect(() => {
    if (selectedWing) {
      setTitle(selectedWing.title || "");
      setStatus(selectedWing.status ?? 1);
      setErrors({});
      setServerError("");
    }
  }, [selectedWing]);

  // Validate fields
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Wing Name is required";
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }else{
     handleSaveChanges({
        ...selectedWing,
        title: title, 
        status,
      });
  }
};


  return (
    <Offcanvas
      show={showEditModal}
      onHide={() => setShowEditModal(false)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Wing</Offcanvas.Title>
      </Offcanvas.Header>

      <Form onSubmit={handleSubmit}>
        <Offcanvas.Body>
          {/* Server Error */}
          {serverError && <div className="alert alert-danger">{serverError}</div>}

          {/* Department Name */}
          <Form.Group className="mb-3">
            <Form.Label>
              Wing Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Wing Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            >
              <option value="">Select Status</option>
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

export default EditWingModal;
