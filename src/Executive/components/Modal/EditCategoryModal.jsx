import React, { useState, useEffect } from "react";

const EditCategoryModal = ({
  showEditModal,
  setShowEditModal,
  selectedCategory,
  handleSaveChanges,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(true);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.categoryName || "");
      setCategoryStatus(selectedCategory.categoryStatus || false);
    }
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      handleSaveChanges({
        ...selectedCategory,
        categoryName,
        categoryStatus,
      });
    }
  };

  if (!showEditModal) return null;

  return (
    <div
      className={`modal right fade show d-block`} // Right sidebar style
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-light text-dark">
            <h5 className="modal-title">Edit Category</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowEditModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={categoryStatus ? "active" : "inactive"}
                  onChange={(e) =>
                    setCategoryStatus(e.target.value === "active")
                  }
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

export default EditCategoryModal;
