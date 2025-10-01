import React, { useState, useEffect } from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

const EditLeadOffCanvasModal = ({
  selectedLead = {},
  show = false,
  handleClose = () => {},
  onSave = () => {},
  businessTypes = [],
  leadSources = [],
  leadStatus = [],
  teams = [],
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    customerMobile: "",
    customerName: "",
    businessTypeId: "",
    emailId: "",
    leadSourceId: "",
    followUpDate: "",
    followUpTime: "",
    teamId: "",
    leadStatusId: "",
    leadDetails: "",
  });

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
        customerMobile: selectedLead.customerMobile || "",
        customerName: selectedLead.customerName || "",
        businessTypeId: selectedLead.businessTypeId || "",
        emailId: selectedLead.emailId || "",
        leadSourceId: selectedLead.leadSourceId || "",
        followUpDate: date || "",
        followUpTime: time || "",
        teamId: selectedLead.teamId || "",
        leadStatusId: selectedLead.leadStatusId || "",
        leadDetails: selectedLead.leadDetails || "",
      });
    }
  }, [selectedLead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass updated data to parent
    onSave({ ...selectedLead, ...formData });
    handleClose();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Lead</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Customer Mobile */}
            <div className="col-md-6">
              <Form.Label>Customer Mobile Number<span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="text"
                name="customerMobile"
                value={formData.customerMobile}
                onChange={handleChange}
                placeholder="Customer Mobile Number"
                required
              />
            </div>

            {/* Customer Name */}
            <div className="col-md-6">
              <Form.Label>Customer Name<span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />
            </div>

            {/* Business Type */}
            <div className="col-md-6">
              <Form.Label>Business Type<span className="text-danger"> *</span></Form.Label>
              <Form.Select
                name="businessTypeId"
                value={formData.businessTypeId}
                onChange={handleChange}
                required
              >
                <option value="">Select Business Type</option>
                {businessTypes
                  .filter((b) => b.status === 1)
                  .map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.businessType}
                    </option>
                  ))}
              </Form.Select>
            </div>

            {/* Email */}
            <div className="col-md-6">
              <Form.Label>Email ID<span className="text-danger"> *</span></Form.Label>
              <Form.Control
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>

            {/* Lead Source */}
            <div className="col-md-6">
              <Form.Label>Lead Source<span className="text-danger"> *</span></Form.Label>
              <Form.Select
                name="leadSourceId"
                value={formData.leadSourceId}
                onChange={handleChange}
                required
              >
                <option value="">Select Lead Source</option>
                {leadSources
                  .filter((ls) => ls.status === 1)
                  .map((ls) => (
                    <option key={ls.id} value={ls.id}>
                      {ls.LeadSourceTitle}
                    </option>
                  ))}
              </Form.Select>
            </div>

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
              

            {/* Team */}
            <div className="col-md-6">
              <Form.Label>Team Member</Form.Label>
              <Form.Select
                name="teamId"
                value={formData.teamId}
                onChange={handleChange}
              >
                <option value="">Select Team Member</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Lead Status */}
            <div className="col-md-6">
              <Form.Label>Lead Status<span className="text-danger"> *</span></Form.Label>
              <Form.Select
                name="leadStatusId"
                value={formData.leadStatusId}
                onChange={handleChange}
                required
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
                required
              />
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

export default EditLeadOffCanvasModal;
