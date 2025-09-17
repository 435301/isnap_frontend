import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form, Alert } from "react-bootstrap";

const EditCommissionOffcanvas = ({
  showEditModal,
  setShowEditModal,
  selectedCommission,
  handleSaveChanges,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    percentage: "",
    status: 1,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); // ✅ new state

  useEffect(() => {
    if (selectedCommission) {
      setFormData({
        id: selectedCommission.id,
        title: selectedCommission.title || "",
        percentage: selectedCommission.percentage || "",
        status: Number(selectedCommission.status),
      });
      setErrors({});
      setServerError(""); // clear error on reopen
    }
  }, [selectedCommission]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Commission Title is required";
    if (!formData.percentage.toString().trim())
      newErrors.percentage = "Percentage is required";
    else if (isNaN(formData.percentage) || Number(formData.percentage) <= 0)
      newErrors.percentage = "Enter a valid percentage";
    if (formData.status !== 0 && formData.status !== 1)
      newErrors.status = "Status is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await handleSaveChanges({
        ...formData,
        status: Number(formData.status),
      });
      setShowEditModal(false);
    } catch (err) {
      // ✅ Catch backend message
      setServerError(err.message || "Something went wrong");
    }
  };

  return (
    <Offcanvas
      show={showEditModal}
      onHide={() => setShowEditModal(false)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Commission</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {serverError && (
          <Alert variant="danger" className="mb-3">
            {serverError}
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Commission Title <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Percentage <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              placeholder="Enter percentage"
              isInvalid={!!errors.percentage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.percentage}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Status <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              isInvalid={!!errors.status}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.status}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="light"
              className="me-2"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditCommissionOffcanvas;
