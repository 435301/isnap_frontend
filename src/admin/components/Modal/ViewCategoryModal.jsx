// src/components/Modal/ViewServiceModal.js
import React from "react";

const ViewCategoryModal = ({ showViewModal, setShowViewModal, selectedCategory }) => {
  if (!selectedCategory) return null; // fallback

  return (
    <div
      className={`modal fade ${showViewModal ? "show d-block" : ""}`}
      style={{ backgroundColor: showViewModal ? "rgba(0,0,0,0.5)" : "transparent" }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Category Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowViewModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <p><strong>Name:</strong> {selectedCategory.categoryName}</p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedCategory.categoryStatus ? "Active" : "Inactive"}
            </p>
            <p>
              <strong>CSV File:</strong>{" "}
              {selectedCategory.sampleCsvfile ? (
                <a href={selectedCategory.sampleCsvfile} download>
                  Download
                </a>
              ) : (
                "N/A"
              )}
            </p>
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

export default ViewCategoryModal;