import React from "react";

const ViewDepartmentModal = ({ show, handleClose, department }) => {
  if (!show || !department) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5 className="modal-title">View Department</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12">
                <p><strong>Department Name:</strong> {department.DepartmentName}</p>
              </div>
              <div className="col-md-12">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={department.status ? "text-success" : "text-danger"}>
                    {department.status ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>

            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-light" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartmentModal;
