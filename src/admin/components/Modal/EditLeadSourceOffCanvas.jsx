import React, { useState, useEffect } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";

const EditLeadSourceOffcanvas = ({ show, handleClose, leadSource, onSave }) => {
    console.log('leadSource',leadSource)
  const [formData, setFormData] = useState({
    title: "",
    status: "",
  });

  useEffect(() => {
    if (leadSource) {
      setFormData({
        title: leadSource.LeadSourceTitle || "",
        status: leadSource.status ? "Active" : "Inactive",
      });
    }
  }, [leadSource]);

  const handleSave = () => {
    const updated = {
      id: leadSource.id,
      title: formData.title,
      status: formData.status === "Active" ? 1 : 0, 
    };
    onSave(updated); 
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
        <Offcanvas.Title>Edit Lead Source</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Form>
          {/* Market Type Name */}
          <Form.Group className="mb-3">
            <Form.Label>Lead Source Title </Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, leadSource: e.target.value })
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

export default EditLeadSourceOffcanvas;
