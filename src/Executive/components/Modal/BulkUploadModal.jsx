import React from "react";

const BulkUploadModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Bulk Seller Upload</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <label className="form-label">Select File <span className="text-danger">*</span></label>
            <input type="file" className="form-control mb-3" />

            <div className="progress mb-3">
              <div
                className="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                style={{ width: "50%" }}
              >
                50%
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadModal;
