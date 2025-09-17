import React, { useState, useEffect } from "react";

const EditServiceCategory = ({
  showEditModal,
  setShowEditModal,
  selectedCategory,
  handleSaveChanges,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [status, setStatus] = useState(1);
  const [errors, setErrors] = useState({}); // ✅ Track validation errors

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.categoryName || "");
      setCategoryCode(selectedCategory.categoryCode || "");
      setStatus(
        selectedCategory.status !== undefined ? selectedCategory.status : 1
      );
      setErrors({});
    }
  }, [selectedCategory]);

  // ✅ Validation logic
  const validate = () => {
    const newErrors = {};

    // Category Name
    if (!categoryName.trim()) {
      newErrors.categoryName = "Category Name is required";
    } else if (categoryName.length < 3) {
      newErrors.categoryName = "Category Name must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9 ]+$/.test(categoryName)) {
      newErrors.categoryName =
        "Only letters, numbers, and spaces are allowed";
    }

    // Category Code
  // Category Code
if (categoryCode && !/^[a-zA-Z0-9]+$/.test(categoryCode)) {
  newErrors.categoryCode =
    "Category Code must contain only letters and numbers (no spaces or special characters)";
}


    // Status
    if (status !== 0 && status !== 1) {
      newErrors.status = "Invalid status selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return; // ✅ Stop if errors exist

    handleSaveChanges({
      ...selectedCategory,
      categoryName,
      categoryCode,
      status,
    });

    setShowEditModal(false);
  };

  if (!showEditModal) return null;

  return (
    <div
      className="modal right fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-full-height modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Service Category</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowEditModal(false)}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Category Name */}
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.categoryName ? "is-invalid" : ""
                  }`}
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                />
                {errors.categoryName && (
                  <div className="invalid-feedback">{errors.categoryName}</div>
                )}
              </div>

              {/* Category Code */}
              <div className="mb-3">
                <label className="form-label">Category Code</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.categoryCode ? "is-invalid" : ""
                  }`}
                  value={categoryCode}
                  onChange={(e) => setCategoryCode(e.target.value)}
                  placeholder="Enter category code"
                />
                {errors.categoryCode && (
                  <div className="invalid-feedback">{errors.categoryCode}</div>
                )}
              </div>

              {/* Status */}
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className={`form-select ${errors.status ? "is-invalid" : ""}`}
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
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

export default EditServiceCategory;
