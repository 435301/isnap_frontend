// src/admin/pages/ViewStateModal.jsx
import React from "react";

const ViewStateModal = ({ showViewModal, setShowViewModal, selectedState }) => {
  if (!showViewModal || !selectedState) return null;

  const handleClose = () => {
    setShowViewModal(false);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-md modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">View State</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>State Name:</strong> {selectedState.stateName}
            </p>
            {/* <p>
              <strong>State Code:</strong> {selectedState.stateCode}
            </p> */}
           <p>
  <strong>Status:</strong>{" "}
  <span style={{ color: selectedState.stateStatus ? "green" : "red", fontWeight: "" }}>
    {selectedState.stateStatus ? "Active" : "Inactive"}
  </span>
</p>

          </div>
          <div className="modal-footer">
            <button className="btn btn-light" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStateModal;
