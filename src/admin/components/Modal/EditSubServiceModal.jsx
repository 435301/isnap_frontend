import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditSubServiceModal = ({ show, handleClose, subService, onSave }) => {
    const [form, setForm] = useState({
        subServiceName: "",
        status: "Active",
        isGenderApplicable: 0
    });

    useEffect(() => {
        if (subService) {
            setForm({
                subServiceName: subService.subServiceName || "",
                status: subService.status === 1 ? "Active" : "Inactive",
                isGenderApplicable: subService.isGenderApplicable || 0,
                serviceCategoryId: subService.serviceCategoryId || "", // 🔹 add this
            });
        }
    }, [subService]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.subServiceName) {
            alert("Name is required!");
            return;
        }
        const payload = {
            id: subService.id,
            subServiceName: form.subServiceName,
            status: form.status === "Active" ? 1 : 0,
            isGenderApplicable: form.isGenderApplicable
        };
        onSave(payload); // 🔹 send to parent for redux call
    };

    if (!subService) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Sub-Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Service Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="serviceCategoryId"
                        value={form.serviceCategoryId}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="subServiceName"
                            value={form.subServiceName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3 form-check">
                        <Form.Check
                            type="checkbox"
                            label="Gender Applicable"
                            name="isGenderApplicable"
                            checked={form.isGenderApplicable === 1}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button type="submit" variant="success">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditSubServiceModal;
