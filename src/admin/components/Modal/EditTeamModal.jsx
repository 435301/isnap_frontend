import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EditTeamModal = ({
  showEditModal,
  setShowEditModal,
  selectedTeam,
  handleSaveChanges,
}) => {
  const [name, setname] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [userRole, setUserRole] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [addressProof, setAddressProof] = useState("");
  const [uploadProof, setUploadProof] = useState(null);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");

  // 🔹 Get roles from Redux
  const { roles = [] } = useSelector((state) => state.roles || {});
useEffect(() => {
  if (selectedTeam) {
    setname(selectedTeam.name || "");              // name → name
    setEmployeeID(selectedTeam.employeeId || "");      // employeeId → employeeID
    setGender(selectedTeam.gender || "");
    setEmail(selectedTeam.email || "");
    setMobileNumber(selectedTeam.mobile || "");        // mobile → mobileNumber
    setUserRole(String(selectedTeam.userRole ?? ""));
    setProfilePhoto(selectedTeam.photo || null);       // photo → profilePhoto
    setAddressProof(selectedTeam.idProofType || "");   // idProofType → addressProof
    setUploadProof(selectedTeam.idProof || null);      // idProof → uploadProof
    setAddress(selectedTeam.address || "");
    setStatus(selectedTeam.status ? "Active" : "Inactive");
  }
}, [selectedTeam]);

  if (!showEditModal || !selectedTeam) return null;

const handleSubmit = () => {
  const updatedTeam = {
    ...selectedTeam,
    name: name,                    // API expects "name"
    employeeId: employeeID,            // API expects "employeeId"
    gender,
    email,
    mobile: mobileNumber,              // API expects "mobile"
    userRole: userRole ? String(userRole) : null, 
    photo: profilePhoto,               // API expects "photo"
    idProofType: addressProof,         // API expects "idProofType"
    idProof: uploadProof,              // API expects "idProof"
    address,
    status: status === "Active" ? 1 : 0,
  };

  handleSaveChanges(updatedTeam);
};


  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Team Member</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowEditModal(false)}
            ></button>
          </div>

          <div className="modal-body">
            <div className="row g-3">
              {/* Full Name */}
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              {/* Employee ID */}
              <div className="col-md-6">
                <label className="form-label">Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={employeeID}
                  onChange={(e) => setEmployeeID(e.target.value)}
                />
              </div>

              {/* Gender */}
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Mobile Number */}
              <div className="col-md-6">
                <label className="form-label">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>

              {/* Role */}
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.roleTitle || role.name || "Unnamed Role"}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No roles available
                    </option>
                  )}
                </select>
              </div>

              {/* Profile Photo */}
              <div className="col-md-6">
                <label className="form-label">Profile Photo</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
                {profilePhoto && (
                  <small className="text-muted">
                    Current: {profilePhoto.name || "Uploaded File"}
                  </small>
                )}
              </div>

              {/* Address Proof */}
              <div className="col-md-6">
                <label className="form-label">Address Proof</label>
                <input
                  type="text"
                  className="form-control"
                  value={addressProof}
                  onChange={(e) => setAddressProof(e.target.value)}
                />
              </div>

              {/* Upload Proof */}
              <div className="col-md-6">
                <label className="form-label">Upload Proof</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setUploadProof(e.target.files[0])}
                />
                {uploadProof && (
                  <small className="text-muted">
                    Current: {uploadProof.name || "Uploaded File"}
                  </small>
                )}
              </div>

              {/* Address */}
              <div className="col-md-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeamModal;
