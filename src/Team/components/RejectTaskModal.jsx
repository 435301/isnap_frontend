import React from "react";

const RejectTaskModal = ({
  show,
  onClose,
  selectedTask,
  rejectReasonType,
  setRejectReasonType,
  rejectReasonText,
  setRejectReasonText,
  onSubmit,
}) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4">
          <div className="modal-header">
            <h5 className="modal-title fw-semibold">Reject Task</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Task Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedTask?.title || ""}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Select Reason Type</label>
                <select
                  className="form-select"
                  value={rejectReasonType}
                  onChange={(e) => setRejectReasonType(e.target.value)}
                >
                  <option value="">Select Reason</option>
                  <option value="Workload">Workload</option>
                  <option value="Unclear">Not Clear</option>
                  <option value="Out of Scope">Out of Scope</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Enter Reason</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Conflict with current high priority tasks"
                  value={rejectReasonText}
                  onChange={(e) => setRejectReasonText(e.target.value)}
                ></textarea>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={() =>
                onSubmit(selectedTask, rejectReasonType, rejectReasonText)
              }
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectTaskModal;
