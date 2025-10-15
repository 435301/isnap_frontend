import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";

const EditDigitalMarketModal = ({
  showEditModal,
  setShowEditModal,
  selectedMarket,
  handleSaveChanges, // async function that returns error message if any
}) => {
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(1);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Populate form when selectedMarket changes
  useEffect(() => {
    if (selectedMarket) {
      setPrice(selectedMarket.price || "");
      setStatus(selectedMarket.status ?? 1);
      setErrors({});
      setServerError("");
    }
  }, [selectedMarket]);

  // Validate fields
  const validate = () => {
    const newErrors = {};
    if (!price || Number(price) <= 0) newErrors.price = "Price must be greater than 0";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedMarket = {
      id: selectedMarket.id,
      price: Number(price),
      status,
    };

    // Call parent handler and capture server error
    const errorMessage = await handleSaveChanges(updatedMarket);
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
        <Offcanvas.Title>Edit Digital Market Pricing</Offcanvas.Title>
      </Offcanvas.Header>

      <Form onSubmit={handleSubmit}>
        <Offcanvas.Body>
          {/* Server Error */}
          {serverError && <div className="alert alert-danger">{serverError}</div>}

          {/* Price */}
          <Form.Group className="mb-3">
            <Form.Label>
              Price <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
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

export default EditDigitalMarketModal;
