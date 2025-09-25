import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditTeamModal = ({ showEditModal, setShowEditModal, selectedTeam, handleSaveChanges }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    mobile: "",
    gender: "",
    userRole: "",
    status: true,
    photo: null,
    idProof: null,
    trash: false,
  });

  useEffect(() => {
    if (selectedTeam) {
      setFormData({
        employeeId: selectedTeam.employeeId || "",
        name: selectedTeam.name || "",
        email: selectedTeam.email || "",
        mobile: selectedTeam.mobile || "",
        gender: selectedTeam.gender || "",
        userRole: selectedTeam.userRole || "",
        status: selectedTeam.status || false,
        photo: selectedTeam.photo || null,
        idProof: null,
        trash: selectedTeam.trash || false,
      });
    }
  }, [selectedTeam]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveChanges({ ...selectedTeam, ...formData });
  };

  if (!selectedTeam) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Team Member</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>User Role</Form.Label>
            <Form.Control type="text" name="userRole" value={formData.userRole} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2 form-check">
            <Form.Check type="checkbox" name="status" label="Active" checked={formData.status} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2 form-check">
            <Form.Check type="checkbox" name="trash" label="Trash" checked={formData.trash} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" name="photo" onChange={handleChange} />
            {formData.photo && typeof formData.photo === "string" && (
              <img src={formData.photo} alt="Photo" className="img-fluid mt-1" />
            )}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>ID Proof</Form.Label>
            <Form.Control type="file" name="idProof" onChange={handleChange} />
            {selectedTeam.idProof && (
              <img src={selectedTeam.idProof} alt="ID Proof" className="img-fluid mt-1" />
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button type="submit" variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditTeamModal;
