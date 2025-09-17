import React, { useState, useEffect } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";

const EditMarketTypeOffcanvas = ({ show, handleClose, marketType, onSave }) => {
  const [formData, setFormData] = useState({
    marketTypeName: "",
    status: "Active",
  });

  // Pre-fill form when marketType changes
  useEffect(() => {
    if (marketType) {
      setFormData({
        marketTypeName: marketType.marketTypeName || "",
        status: marketType.status ? "Active" : "Inactive",
      });
    }
  }, [marketType]);

  const handleSave = () => {
    const updated = {
      id: marketType.id,
      marketTypeName: formData.marketTypeName,
      status: formData.status === "Active" ? 1 : 0, // ✅ numeric
    };
    onSave(updated); // send back to parent
    handleClose();
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      backdrop={true}
      scroll={false}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Market Type</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Form>
          {/* Market Type Name */}
          <Form.Group className="mb-3">
            <Form.Label>Market Type Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.marketTypeName}
              onChange={(e) =>
                setFormData({ ...formData, marketTypeName: e.target.value })
              }
            />
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="light" className="me-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditMarketTypeOffcanvas;
