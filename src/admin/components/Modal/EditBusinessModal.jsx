import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditBusinessModal = ({ show, handleClose, business, handleSave }) => {
    const [formData, setFormData] = useState({
        id: "",
        businessName: "",
        sellerName: "",
        regdEmail: "",
        regdMobile: "",
        spocName: "",
        spocMobile: "",
        stateId: "",
        cityName: "",
        gstNumber: "",
        referredBy: "",
        address: "",
        businessLogo: "",
        status: 1,
    });

    useEffect(() => {
        if (business) {
            setFormData({
                id: business.id,
                businessName: business.businessName || "",
                sellerName: business.sellerName || "",
                regdEmail: business.regdEmail || "",
                regdMobile: business.regdMobile || "",
                spocName: business.spocName || "",
                spocMobile: business.spocMobile || "",
                stateId: business.stateId || "",
                cityName: business.cityName || "",
                gstNumber: business.gstNumber || "",
                referredBy: business.referredBy || "",
                address: business.address || "",
                businessLogo: business.businessLogo || "",
                status: business.status ?? 1,
            });
        }
    }, [business]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "businessLogo" && files.length > 0) {
            setFormData({ ...formData, businessLogo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const onSave = () => handleSave(formData);

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Seller</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Seller Name</Form.Label>
                        <Form.Control
                            name="sellerName"
                            value={formData.sellerName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="regdEmail"
                            value={formData.regdEmail}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            name="regdMobile"
                            value={formData.regdMobile}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>SPOC Name</Form.Label>
                        <Form.Control
                            name="spocName"
                            value={formData.spocName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>SPOC Mobile</Form.Label>
                        <Form.Control
                            name="spocMobile"
                            value={formData.spocMobile}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>State ID</Form.Label>
                        <Form.Control
                            name="stateId"
                            value={formData.stateId}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>City Name</Form.Label>
                        <Form.Control
                            name="cityName"
                            value={formData.cityName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>GST Number</Form.Label>
                        <Form.Control
                            name="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Referred By</Form.Label>
                        <Form.Control
                            name="referredBy"
                            value={formData.referredBy}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Business Logo</Form.Label>
                        <Form.Control
                            type="file"
                            name="businessLogo"
                            onChange={handleChange}
                        />
                        {formData.businessLogo && typeof formData.businessLogo === "string" && (
                            <img
                                src={`${process.env.REACT_APP_API_BASE_URL}${formData.businessLogo}`}
                                alt="Logo"
                                style={{ width: "100px", marginTop: "10px" }}
                            />
                        )}
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditBusinessModal;
