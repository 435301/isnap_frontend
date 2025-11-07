import React from "react";
import { useSelector } from "react-redux";

const ViewTeamModal = ({ showViewModal, setShowViewModal, selectedTeam }) => {
  const roles = useSelector((state) => state.roles.roles || []);

  if (!showViewModal || !selectedTeam) return null;

  const API_BASE_URL = "https://isnap-backend.duckdns.org";

  const resolveImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  };

  // Find role name by ID
  const getRoleName = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.roleTitle : "N/A";
  };

  // Map ID proof type IDs to names
  const idProofTypes = {
    1: "Aadhaar",
    2: "PAN Card",
    // add more if needed
  };
  const getIdProofName = (id) => idProofTypes[id] || "N/A";

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
            <h5 className="modal-title">View Team Member</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowViewModal(false)}
            ></button>
          </div>

          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <p><strong>ID:</strong> {selectedTeam.id}</p>
                <p><strong>Employee ID:</strong> {selectedTeam.employeeId}</p>
                <p><strong>Name:</strong> {selectedTeam.name}</p>
                <p><strong>Email:</strong> {selectedTeam.email}</p>
                <p><strong>Mobile:</strong> {selectedTeam.mobile}</p>
                <p><strong>Gender:</strong> {selectedTeam.gender}</p>
                <p><strong>Address:</strong> {selectedTeam.address}</p>
                <p><strong>User Role:</strong> {getRoleName(selectedTeam.userRole)}</p>
                <p><strong>ID Proof Type:</strong> {getIdProofName(selectedTeam.idProofType)}</p>
                <p><strong>Status:</strong> {selectedTeam.status ? "Active" : "Inactive"}</p>
              </div>

              <div className="col-md-6">
                <div className="mb-2">
                  <strong>Photo:</strong><br />
                  {selectedTeam.photo ? (
                    <img
                      src={resolveImageUrl(selectedTeam.photo)}
                      alt="User"
                      className="img-thumbnail"
                      style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    />
                  ) : <span>No Photo</span>}
                </div>

                <div className="mb-2">
                  <strong>ID Proof:</strong><br />
                  {selectedTeam.idProof ? (
                    <img
                      src={resolveImageUrl(selectedTeam.idProof)}
                      alt="ID Proof"
                      className="img-thumbnail"
                      style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    />
                  ) : <span>No Proof</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setShowViewModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeamModal;
