import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form, Alert } from "react-bootstrap";

const EditProductOffcanvas = ({ show, setShowEditModal, selectedProduct, handleSaveChanges }) => {
  const [formData, setFormData] = useState({
    fromQty: "",
    toQty: "",
    price: "",
    status: 1,
  });

  const [errors, setErrors] = useState({}); // Track errors per field
  const [generalError, setGeneralError] = useState(""); // General error for alert

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        fromQty: selectedProduct.fromQty || "",
        toQty: selectedProduct.toQty || "",
        price: selectedProduct.price || "",
        status: selectedProduct.status !== undefined ? Number(selectedProduct.status) : 1,
      });
      setErrors({});
      setGeneralError("");
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "status" ? Number(value) : value,
    });
    setErrors({ ...errors, [name]: false }); // clear error for this field
    setGeneralError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    let hasError = false;

    // Validate fromQty
    if (!formData.fromQty || Number(formData.fromQty) <= 0) {
      validationErrors.fromQty = true;
      hasError = true;
    }

    // Validate toQty
    if (!formData.toQty || Number(formData.toQty) <= 0 || Number(formData.toQty) <= Number(formData.fromQty)) {
      validationErrors.toQty = true;
      hasError = true;
    }

    // Validate price
    if (!formData.price || Number(formData.price) <= 0) {
      validationErrors.price = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(validationErrors);
      setGeneralError("Please correct the highlighted fields.");
      return;
    }

    const payload = {
      ...selectedProduct,
      fromQty: Number(formData.fromQty),
      toQty: Number(formData.toQty),
      price: Number(formData.price),
      status: formData.status.toString(),
    };
    handleSaveChanges(payload);
  };

  return (
    <Offcanvas
      show={show}
      onHide={() => setShowEditModal(false)}
      placement="end"
      backdrop={true}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {generalError && <Alert variant="danger">{generalError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-12">
              <Form.Label>From Qty <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                name="fromQty"
                value={formData.fromQty}
                onChange={handleChange}
                isInvalid={errors.fromQty}
              />
              <Form.Control.Feedback type="invalid">
                From Qty must be greater than 0
              </Form.Control.Feedback>
            </div>
            <div className="col-md-12">
              <Form.Label>To Qty <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                name="toQty"
                value={formData.toQty}
                onChange={handleChange}
                isInvalid={errors.toQty}
              />
              <Form.Control.Feedback type="invalid">
                To Qty must be greater than From Qty
              </Form.Control.Feedback>
            </div>
            <div className="col-md-12">
              <Form.Label>Price<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                isInvalid={errors.price}
              />
              <Form.Control.Feedback type="invalid">
                Price must be greater than 0
              </Form.Control.Feedback>
            </div>
            <div className="col-md-12">
              <Form.Label>Status <span className="text-danger">*</span></Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Form.Select>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="light" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success" className="ms-2">
              Save Changes
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditProductOffcanvas;
