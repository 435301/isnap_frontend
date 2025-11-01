import React from "react";

const AssignTaskModal = ({
  show,
  onClose,
  onSubmit,
  selectedTask,
  assignTo,
  setAssignTo,
  assignComment,
  setAssignComment,
  executives,
}) => {
  console.log('executives', executives)
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
            <h5 className="modal-title fw-semibold">Assign Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
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
                <label className="form-label">Assign To</label>
                <select
                  className="form-select"
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                >
                  <option value="">Select Assignee</option>
                  {executives.map((executive) => {
                    return (
                      <option key={executive.id} value={executive.id}>
                        {executive.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Comments</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Add any additional instructions..."
                  value={assignComment}
                  onChange={(e) => setAssignComment(e.target.value)}
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
              onClick={() => onSubmit(selectedTask, assignTo, assignComment)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskModal;
