import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/actions/categoryActions";

const EditSubServiceModal = ({ show, handleClose, subService, onSave }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category?.categories || []);

  const [form, setForm] = useState({
    serviceCategoryId: "",
    subServiceName: "",
    status: "",
    isGenderApplicable: 0,
  });

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Pre-fill form when subService changes
  useEffect(() => {
    if (subService) {
      setForm({
        serviceCategoryId: subService.serviceCategoryId || "",
        subServiceName: subService.subServiceName || "",
        status: subService.status === 1 ? "Active" : "Inactive",
        isGenderApplicable: subService.isGenderApplicable || 0,
      });
    }
  }, [subService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.serviceCategoryId) return alert("Please select a service category!");
    if (!form.subServiceName) return alert("Sub-Service name is required!");

    const payload = {
      id: subService.id,
      serviceCategoryId: form.serviceCategoryId,
      subServiceName: form.subServiceName,
      status: form.status === "Active" ? 1 : 0,
      isGenderApplicable: form.isGenderApplicable,
    };

    onSave(payload);
    handleClose();
  };

  if (!subService) return null;

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" backdrop={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Service Types</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          {/* Service Category */}
          <Form.Group className="mb-3">
            <Form.Label>
              Service Category <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="serviceCategoryId"
              value={form.serviceCategoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName || cat.serviceCategoryName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Sub-Service Name */}
          <Form.Group className="mb-3">
            <Form.Label>
             Service Type <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="subServiceName"
              value={form.subServiceName}
              onChange={handleChange}
              placeholder="Enter Sub-Service Name"
              required
            />
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>
              Status <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Form.Group>

          {/* Gender Applicable */}
          <Form.Group className="mb-3 form-check">
            <Form.Check
              type="checkbox"
              label="Gender Applicable"
              name="isGenderApplicable"
              checked={form.isGenderApplicable === 1}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Save Changes
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditSubServiceModal;
