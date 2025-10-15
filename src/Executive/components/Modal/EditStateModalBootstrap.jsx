import React, { useEffect, useState } from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const EditStateOffcanvas = ({ show, handleClose, selectedState, handleSaveChanges }) => {
  const [formData, setFormData] = useState({
    stateName: "",
    stateStatus: true,
  });

  useEffect(() => {
    if (selectedState) {
      setFormData({
        stateName: selectedState.stateName || "",
        stateStatus: selectedState.stateStatus ?? true,
      });
    }
  }, [selectedState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stateStatus" ? value === "active" : value,
    }));
  };

  const onSave = () => {
    if (
      formData.stateName.trim() === selectedState.stateName &&
      !!formData.stateStatus === !!selectedState.stateStatus
    ) {
      toast.error("No changes detected or state name already exists");
      return;
    }

    handleSaveChanges({
      id: selectedState.id,
      stateName: formData.stateName.trim(),
      stateStatus: !!formData.stateStatus,
    });
    handleClose();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit State</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>State Name</Form.Label>
            <Form.Control
              type="text"
              name="stateName"
              value={formData.stateName}
              onChange={handleChange}
              placeholder="Enter state name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="stateStatus"
              value={formData.stateStatus ? "active" : "inactive"}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="light" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="success" onClick={onSave}>
              Save Changes
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditStateOffcanvas;
