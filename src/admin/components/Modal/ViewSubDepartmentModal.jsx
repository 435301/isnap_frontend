import React from "react";

const ViewSubDepartmentModal = ({ show, handleClose, subDepartment }) => {
  if (!show || !subDepartment) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5 className="modal-title">View Sub Department</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12">
                <p><strong>Wing Name:</strong> {subDepartment.wingName}</p>
                <p><strong>Department Name:</strong> {subDepartment.departmentName}</p>
                <p><strong>Sub Department Name:</strong> {subDepartment.name}</p>
              </div>
              <div className="col-md-12">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={subDepartment.status ? "text-success" : "text-danger"}>
                    {subDepartment.status ? "Active" : "Inactive"}
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

export default ViewSubDepartmentModal;
