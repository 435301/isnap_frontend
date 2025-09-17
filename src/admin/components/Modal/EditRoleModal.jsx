import React, { useState, useEffect } from "react";

const EditRoleModal = ({
  showEditModal,
  setShowEditModal,
  selectedRole,
  handleSaveChanges,
}) => {
  const [roleTitle, setRoleTitle] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (selectedRole) {
      setRoleTitle(selectedRole.roleTitle || "");
      setStatus(selectedRole.status !== undefined ? selectedRole.status : true);
    }
  }, [selectedRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      handleSaveChanges({
        ...selectedRole,
        roleTitle: roleTitle, // send correct field
        status,
      });
    }
  };

  if (!showEditModal) return null;

  return (
    <div
      className="modal right fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-slide">
        <div className="modal-content">
          <div className="modal-header bg-light text-dark">
            <h5 className="modal-title">Edit Role</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowEditModal(false)}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Role Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status ? "active" : "inactive"}
                  onChange={(e) => setStatus(e.target.value === "active")}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoleModal;
