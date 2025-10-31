import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import BASE_URL from "../../../config/config";

const EditTeamOffcanvas = ({ show, handleClose, selectedTeam, handleSaveChanges, wings, departments, teams, subDepartments }) => {
  const roles = useSelector((state) => state.roles.roles || []);
  console.log('selectedTeam', selectedTeam)

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    mobile: "",
    gender: "",
    userRole: "",
    status: "Active",
    photo: null,
    idProof: null,
    wingId: "",
    departmentId: "",
    subDepartmentId:"",
    superior: 0,
  });

  useEffect(() => {
    if (selectedTeam) {
      setForm({
        employeeId: selectedTeam.employeeId || "",
        name: selectedTeam.name || "",
        email: selectedTeam.email || "",
        mobile: selectedTeam.mobile || "",
        gender: selectedTeam.gender || "",
        userRole: selectedTeam.userRole || "",
        status: selectedTeam.status ? "Active" : "Inactive",
        photo: selectedTeam.photo || null,
        idProof: null,
        wingId: selectedTeam.wingId || "",
        departmentId: selectedTeam.departmentId || "",
        subDepartmentId:selectedTeam.subDepartmentId || "",
        superior: selectedTeam.superiorId || 0,
      });
    }
  }, [selectedTeam]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") setForm((prev) => ({ ...prev, [name]: files[0] }));
    else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...selectedTeam,
      ...form,
      status: form.status === "Active" ? 1 : 0,
    };
    handleSaveChanges(payload);
    handleClose();
  };

  if (!selectedTeam) return null;

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" backdrop={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Team Member</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Employee ID <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile<span className="text-danger"> *</span></Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender<span className="text-danger"> *</span></Form.Label>
            <Form.Select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Wing<span className="text-danger"> *</span></Form.Label>
            <Form.Select name="wingId" value={form.wingId} onChange={handleChange}>
              <option value="">Select Wing</option>
              {wings?.map((r) => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </Form.Select>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Department<span className="text-danger"> *</span></Form.Label>
            <Form.Select name="departmentId" value={form.departmentId} onChange={handleChange}>
              <option value="">Select Department</option>
              {departments?.map((r) => (
                <option key={r.id} value={r.id}>{r.departmentName}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sub Department</Form.Label>
            <Form.Select name="subDepartmentId" value={form.subDepartmentId} onChange={handleChange}>
              <option value="">Select Sub Department</option>
              {subDepartments?.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Role<span className="text-danger"> *</span></Form.Label>
            <Form.Select name="userRole" value={form.userRole} onChange={handleChange}>
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>{r.roleTitle}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Superior</Form.Label>
            <Form.Select name="superior" value={form.superior || 0} onChange={handleChange}>
              <option value="">Select Superior</option>
              {teams.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status<span className="text-danger"> *</span></Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Photo<span className="text-danger"> *</span></Form.Label>
            <Form.Control type="file" name="photo" onChange={handleChange} />
            {form.photo && (
              <img
                src={typeof form.photo === "string" ? `${BASE_URL}${form.photo}` : URL.createObjectURL(form.photo)}
                alt="Photo"
                className="img-fluid mt-1"
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ID Proof<span className="text-danger"> *</span></Form.Label>
            <Form.Control type="file" name="idProof" onChange={handleChange} />
            {selectedTeam.idProof && typeof selectedTeam.idProof === "string" && (
              <img
                src={`${BASE_URL}${selectedTeam.idProof}`}
                alt="ID Proof"
                className="img-fluid mt-1"
              />
            )}
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="success">Save Changes</Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditTeamOffcanvas;
