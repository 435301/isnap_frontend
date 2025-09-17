import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";

const EditServiceTypeOffcanvas = ({ show, handleClose, service, onSave, marketTypes }) => {
  const [formData, setFormData] = useState({
    marketPlaceId: "",
    serviceTypeName: "",
    price: "",
    status: 1, // 1 = Active, 0 = Inactive
  });
  const [errors, setErrors] = useState({});

  // Load service data into form
  useEffect(() => {
    if (service) {
      setFormData({
        marketPlaceId: service.marketPlaceId || "",
        serviceTypeName: service.serviceType || "",
        price: service.price || "",
        status: Number(service.status), // ✅ ensure 1 or 0
      });
    }
  }, [service]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value, // ✅ convert status to number
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = {};
  if (!formData.marketPlaceId) validationErrors.marketPlaceId = "Marketplace is required";
  if (!formData.serviceTypeName.trim()) validationErrors.serviceTypeName = "Service type name is required";
  if (!formData.price || Number(formData.price) <= 0) validationErrors.price = "Price must be a positive number";

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    await onSave({
      id: service.id,
      marketPlaceId: formData.marketPlaceId,
      serviceName: formData.serviceTypeName,
      price: formData.price,
      status: formData.status,
    });
    handleClose(); // ✅ close only on success
  } catch (error) {
    setErrors({ server: error.message }); // ✅ show error only in edit page
  }
};


  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" backdrop={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Marketplace</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          {/* Marketplace select */}
          <Form.Group className="mb-3">
            <Form.Label>Marketplace <span className="text-danger">*</span></Form.Label>
            <Form.Select
              name="marketPlaceId"
              value={formData.marketPlaceId}
              onChange={handleChange}
              isInvalid={!!errors.marketPlaceId}
            >
              <option value="">-- Select Marketplace --</option>
              {marketTypes && marketTypes.map(mt => (
                <option key={mt.id} value={mt.id}>{mt.marketPlaceType}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.marketPlaceId}</Form.Control.Feedback>
          </Form.Group>

          {/* Service Type input */}
          <Form.Group className="mb-3">
            <Form.Label>Marketplace Name <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="serviceTypeName"
              value={formData.serviceTypeName}
              onChange={handleChange}
              isInvalid={!!errors.serviceTypeName}
            />
            <Form.Control.Feedback type="invalid">{errors.serviceTypeName}</Form.Control.Feedback>
          </Form.Group>

          {/* Price input */}
          <Form.Group className="mb-3">
            <Form.Label>Price <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
              min="0"
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>

          {/* Status select */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </Form.Select>
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex justify-content-end">
            <Button variant="light" className="me-2" onClick={handleClose}>Cancel</Button>
            <Button variant="success" type="submit">Save Changes</Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditServiceTypeOffcanvas;
