import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { fetchRoles } from "../../redux/actions/roleActions";
import { createTeam, setSuccessMessage, setErrorMessage, fetchTeams } from "../../redux/actions/teamActions";
import { fetchDepartments } from "../../redux/actions/departmentActions";
import { fetchWings } from "../../redux/actions/wingAction";

const AddTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = useSelector(state => state.roles.roles || []);
  const { teams } = useSelector((state) => state.teams);
  const { wings } = useSelector((state) => state.wings);
  const { departments } = useSelector((state) => state.department);
  console.log('teams', teams)
  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchDepartments());
    dispatch(fetchWings());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    gender: "",
    email: "",
    mobile: "",
    userRole: "",
    photo: null,
    idProofType: "",
    idProof: null,
    address: "",
    password: "",
    wingId: "",
    departmentId: "",
    superior: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => { dispatch(fetchRoles()); }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile Number is required";
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Mobile Number must be 10 digits";
    if (!formData.userRole) newErrors.userRole = "Role is required";
    if (!formData.photo) newErrors.photo = "Profile Photo is required";
    if (!formData.idProofType) newErrors.idProofType = "ID Proof Type is required";
    if (!formData.idProof) newErrors.idProof = "Upload Proof is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.wingId.trim()) newErrors.wingId = "Wing name is required";
    if (!formData.departmentId.trim()) newErrors.departmentId = "Department name is required";
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const payload = new FormData();
        Object.keys(formData).forEach(key => { if (formData[key] !== null) payload.append(key, formData[key]); });
        await dispatch(createTeam(payload));
        dispatch(setSuccessMessage("Team member created successfully!"));
        navigate("/manage-team");
      } catch {
        dispatch(setErrorMessage("Failed to create team member."));
      }
    }
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content flex-grow-1" style={{ marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : (isSidebarOpen ? 220 : 0), transition: "margin-left 0.3s" }}>
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid px-4 pt-3">
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header d-flex justify-content-between align-items-center">
              <h5 className="m-0">Add Team Member</h5>
              <Link to="/manage-team" className="btn btn-new-lead">Manage Teams</Link>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  {/* Full Name */}
                  <div className="col-md-4">
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                    {errors.name && <div className="text-danger small">{errors.name}</div>}
                  </div>

                  {/* Employee ID */}
                  <div className="col-md-4">
                    <label className="form-label">Employee ID *</label>
                    <input type="text" name="employeeId" className="form-control" value={formData.employeeId} onChange={handleChange} />
                    {errors.employeeId && <div className="text-danger small">{errors.employeeId}</div>}
                  </div>

                  {/* Gender */}
                  <div className="col-md-4">
                    <label className="form-label">Gender *</label>
                    <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <div className="text-danger small">{errors.gender}</div>}
                  </div>

                  {/* Email */}
                  <div className="col-md-4">
                    <label className="form-label">Email *</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="text-danger small">{errors.email}</div>}
                  </div>

                  {/* Mobile */}
                  <div className="col-md-4">
                    <label className="form-label">Mobile Number *</label>
                    <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} />
                    {errors.mobile && <div className="text-danger small">{errors.mobile}</div>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Wing *</label>
                    <select name="wingId" className="form-select" value={formData.wingId} onChange={handleChange}>
                      <option value="">Select Wing</option>
                      {wings.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                    </select>
                    {errors.wingId && <div className="text-danger small">{errors.wingId}</div>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Department *</label>
                    <select name="departmentId" className="form-select" value={formData.departmentId} onChange={handleChange}>
                      <option value="">Select Department</option>
                      {departments.map(r => <option key={r.id} value={r.id}>{r.DepartmentName}</option>)}
                    </select>
                    {errors.departmentId && <div className="text-danger small">{errors.departmentId}</div>}
                  </div>

                  {/* Role */}
                  <div className="col-md-4">
                    <label className="form-label">Role *</label>
                    <select name="userRole" className="form-select" value={formData.userRole} onChange={handleChange}>
                      <option value="">Select Role</option>
                      {roles.map(r => <option key={r.id} value={r.id}>{r.roleTitle}</option>)}
                    </select>
                    {errors.userRole && <div className="text-danger small">{errors.userRole}</div>}
                  </div>

                <div className="col-md-4">
                    <label className="form-label">Superior</label>
                    <select name="superior" className="form-select" value={formData.superior} onChange={handleChange}>
                      <option value="0">Select Superior</option>
                      {teams.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                    {errors.superior && <div className="text-danger small">{errors.superior}</div>}
                  </div>

                  {/* Photo */}
                  <div className="col-md-4">
                    <label className="form-label">Profile Photo *</label>
                    <input type="file" name="photo" className="form-control" onChange={handleChange} />
                    {errors.photo && <div className="text-danger small">{errors.photo}</div>}
                  </div>

                  {/* ID Proof Type */}
                  <div className="col-md-4">
                    <label className="form-label">ID Proof Type *</label>
                    <select name="idProofType" className="form-select" value={formData.idProofType} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="1">Aadhaar</option>
                      <option value="2">PAN Card</option>
                    </select>
                    {errors.idProofType && <div className="text-danger small">{errors.idProofType}</div>}
                  </div>

                  {/* Upload Proof */}
                  <div className="col-md-4">
                    <label className="form-label">Upload Proof *</label>
                    <input type="file" name="idProof" className="form-control" onChange={handleChange} />
                    {errors.idProof && <div className="text-danger small">{errors.idProof}</div>}
                  </div>

                  {/* Address */}
                  <div className="col-md-4">
                    <label className="form-label">Address</label>
                    <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
                  </div>

                  {/* Password */}
                  <div className="col-md-4">
                    <label className="form-label">Password *</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
                    {errors.password && <div className="textjmnhmj-danger small">{errors.password}</div>}
                  </div>

                  <div className="col-12 d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-success me-2">Submit</button>
                    <Link to="/manage-team" className="btn btn-outline-secondary">Cancel</Link>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
