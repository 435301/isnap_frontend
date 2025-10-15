import React, { useEffect, useState } from "react";

const EditStateModal = ({
  showEditModal,
  setShowEditModal,
  selectedState,
  handleSaveChanges,
}) => {
  const [formData, setFormData] = useState({
    stateName: "",
    stateStatus: true,
  });

  useEffect(() => {
    if (selectedState) {
      setFormData({
        stateName: selectedState.stateName || "",
        stateStatus: selectedState.stateStatus ?? true,
      });
    }
  }, [selectedState]);

  if (!showEditModal || !selectedState) return null;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: name === "stateStatus" ? value === "active" : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSaveChanges({
      id: selectedState.id,
      stateName: formData.stateName.trim(),
      stateStatus: !!formData.stateStatus,
    });
  };

  return (
    <div
      className={`modal right fade show d-block`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-0">
          <div className="modal-header">
            <h5 className="modal-title">Edit State</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowEditModal(false)}
            ></button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">State Name</label>
                <input
                  type="text"
                  name="stateName"
                  value={formData.stateName}
                  onChange={onChange}
                  className="form-control"
                  placeholder="Enter state name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="stateStatus"
                  value={formData.stateStatus ? "active" : "inactive"}
                  onChange={onChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStateModal;
