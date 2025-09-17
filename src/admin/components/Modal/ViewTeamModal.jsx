import React from "react";

const ViewTeamModal = ({ showViewModal, setShowViewModal, selectedTeam }) => {
  if (!showViewModal || !selectedTeam) return null;

  return (
     <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-md" role="document">
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
            <p><strong>Name:</strong> {selectedTeam.name}</p>
            <p><strong>Gender:</strong> {selectedTeam.gender}</p>
            <p><strong>Email:</strong> {selectedTeam.email}</p>
            <p><strong>Role:</strong> {selectedTeam.role}</p>
            <p><strong>Address:</strong> {selectedTeam.address}</p>
            <p><strong>Status:</strong> {selectedTeam.status}</p>
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
