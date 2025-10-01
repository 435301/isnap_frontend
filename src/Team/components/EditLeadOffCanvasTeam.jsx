import React, { useState, useEffect } from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadStatus } from "../../redux/actions/leadStatusAction";
import { fetchLeadHistory, updateLeadHistory } from "../../redux/actions/leadTeamAction";

const EditLeadOffCanvasTeamModal = ({
    selectedLead = {},
    show = false,
    handleClose = () => { },
}) => {
    const dispatch = useDispatch();
    const { leadStatus = [] } = useSelector((state) => state.leadStatus);
    const [formData, setFormData] = useState({
        teamId: "",
        leadStatusId: "",
        followUpDate: "",
        followUpTime: "",
        leadDetails: ""
    });
    const[errors, setErrors] = useState("");

    useEffect(() => {
        dispatch(fetchLeadStatus());
    }, [dispatch]);


    useEffect(() => {
        if (selectedLead) {
            const date = selectedLead.followUpDate?.split("T")[0] || "";
            // Normalize time to HH:MM (24-hour)
            let time = "";
            if (selectedLead.followUpTime) {
                const [hours, minutes] = selectedLead.followUpTime.split(":");
                time = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
            }
            setFormData({
                leadSourceId: selectedLead.leadSourceId || "",
                followUpDate: date || "",
                followUpTime: time || "",
                leadStatusId: selectedLead.leadStatusId || "",
                leadDetails: selectedLead.leadDetails || "",
            });
        }
    }, [selectedLead]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.leadDetails.trim())
            newErrors.leadDetails = "Lead details are required";
        if (!formData.leadStatusId) newErrors.leadStatusId = "Lead Status is required";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        if (!selectedLead?.id) return;

        const payload = {
            teamId: selectedLead.teamId,
            leadStatusId: formData.leadStatusId,
            followUpDate: formData.followUpDate,
            followUpTime: formData.followUpTime,
            leadDetails: formData.leadDetails,
        };

        dispatch(updateLeadHistory(selectedLead.id, payload)).then(() => {
            dispatch(fetchLeadHistory({ search: "", page: 1, showStatus: "", teamId: selectedLead.teamId }))
            handleClose();
        });
    };


    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Lead</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Form onSubmit={handleSubmit} >
                    <div className="row g-3">
                        {/* Follow-up Date & Time */}
                        <div className="col-md-6">
                            <Form.Label>Follow-up Date & Time</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    type="date"
                                    name="followUpDate"
                                    value={formData.followUpDate}
                                    onChange={handleChange}
                                />
                                <Form.Select
                                    name="followUpTime"
                                    value={formData.followUpTime}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Select Time --</option>
                                    {Array.from({ length: 24 * 2 }, (_, i) => {
                                        const hours = String(Math.floor(i / 2)).padStart(2, "0");
                                        const minutes = i % 2 === 0 ? "00" : "30";
                                        return (
                                            <option key={i} value={`${hours}:${minutes}`}>
                                                {hours}:{minutes}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </div>
                        </div>


                        {/* Lead Status */}
                        <div className="col-md-6">
                            <Form.Label>Lead Status<span className="text-danger"> *</span></Form.Label>
                            <Form.Select
                                name="leadStatusId"
                                value={formData.leadStatusId}
                                onChange={handleChange}
                                className={`form-select ${errors.leadStatusId ? "is-invalid" : "" }`}
                            >
                                <option value="">Select Status</option>
                                {leadStatus
                                    .filter((ls) => ls.status === 1)
                                    .map((ls) => (
                                        <option key={ls.id} value={ls.id}>
                                            {ls.LeadStatusTitle}
                                        </option>
                                    ))}
                            </Form.Select>
                            {errors.leadStatusId && (
                                <div className="invalid-feedback">{errors.leadStatusId}</div>
                            )}
                        </div>

                        {/* Lead Details */}
                        <div className="col-12">
                            <Form.Label>Lead Details<span className="text-danger"> *</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="leadDetails"
                                value={formData.leadDetails}
                                onChange={handleChange}
                                placeholder="Lead Details"
                                className={`form-select ${errors.leadDetails ? "is-invalid" : "" }`}
                            />
                            {errors.leadDetails && (
                                <div className="invalid-feedback">{errors.leadDetails}</div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                            <Button variant="light" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="success">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default EditLeadOffCanvasTeamModal;
