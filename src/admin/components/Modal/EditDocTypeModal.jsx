import React, { useState, useEffect } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";

const EditDocTypeOffcanvas = ({ show, handleClose, docType, onSave, documentCategories }) => {
    console.log('docType', docType, documentCategories)
    const [formData, setFormData] = useState({
        documentCategoryId: "",
        documentType: "",
        status: "",
    });

    useEffect(() => {
        if (docType) {
            setFormData({
                documentCategoryId: docType.documentCategoryId || "",
                documentType: docType.documentType || "",
                status: docType.status ? "Active" : "Inactive",
            });
        }
    }, [docType]);

    const handleSave = () => {
        const updated = {
            id: docType.id,
            documentCategoryId: formData.documentCategoryId,
            documentType: formData.documentType,
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
                <Offcanvas.Title>Edit Document Type</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label>Document Category</Form.Label>
                        <Form.Select
                            value={formData.documentCategoryId}
                            onChange={(e) =>
                                setFormData({ ...formData, documentCategoryId: e.target.value })
                            }
                        >
                            {documentCategories && documentCategories.map(doc => (
                                <option key={doc.id} value={doc.id}>{doc.title}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label> Document Type </Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.documentType}
                            onChange={(e) =>
                                setFormData({ ...formData, documentType: e.target.value })
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

export default EditDocTypeOffcanvas;
