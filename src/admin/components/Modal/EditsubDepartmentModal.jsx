import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { fetchDepartments } from "../../../redux/actions/departmentActions";

const EditSubDepartmentModal = ({
    showEditModal,
    setShowEditModal,
    selectedSubDepartment,
    handleSaveChanges,
    departments,
    wings
}) => {
    console.log('selectedSubDepartment', selectedSubDepartment)
    const [subDepartmentName, setSubDepartmentName] = useState("");
    console.log('subDepartmentName', subDepartmentName)
    const [status, setStatus] = useState(1);
    const [wingId, setWingId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    // Populate form when selectedDepartment changes
    useEffect(() => {
        if (selectedSubDepartment) {
            setSubDepartmentName(selectedSubDepartment.name || "");
            setStatus(selectedSubDepartment.status );
            setWingId(selectedSubDepartment.wingId || "");
            setDepartmentId(selectedSubDepartment.departmentId || "");
            setErrors({});
            setServerError("");
        }
    }, [selectedSubDepartment]);

    // Validate fields
    const validate = () => {
        const newErrors = {};
        if (!subDepartmentName.trim()) newErrors.subDepartmentName = "Sub Department Name is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const updatedDepartment = {
            id: selectedSubDepartment?.id,
            name: subDepartmentName.trim(),
            departmentId: Number(departmentId),
            wingId: Number(wingId) ,
            status: status,
        };
        console.log(" Sending payload:", updatedDepartment);
        const response = await handleSaveChanges(updatedDepartment);
    };

    return (
        <Offcanvas
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            placement="end"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Sub Department</Offcanvas.Title>
            </Offcanvas.Header>

            <Form onSubmit={handleSubmit}>
                <Offcanvas.Body>
                    {/* Server Error */}
                    {serverError && <div className="alert alert-danger">{serverError}</div>}

                    <Form.Group className="mb-3">
                        <Form.Label>Wing</Form.Label>
                        <Form.Select
                            value={wingId}
                            onChange={(e) => setWingId(e.target.value)}
                        >
                            <option value="">Select Wing</option>
                            {wings.map((wing) => (
                                <option key={wing?.id} value={wing.id}>
                                    {wing?.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.departmentName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Department Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Sub Department Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Sub Department Name"
                            value={subDepartmentName}
                            onChange={(e) => setSubDepartmentName(e.target.value)}
                            isInvalid={!!errors.subDepartmentName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.subDepartmentName}
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

export default EditSubDepartmentModal;
