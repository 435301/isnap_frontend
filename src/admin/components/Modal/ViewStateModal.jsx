// src/admin/pages/ViewStateModal.jsx
import React from "react";

const ViewStateModal = ({ showViewModal, setShowViewModal, selectedState }) => {
  if (!showViewModal || !selectedState) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">View State</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowViewModal(false)}
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
              {selectedState.stateStatus ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStateModal;
