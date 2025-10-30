import React from "react";

const MoveTaskModal = ({
  show,
  onClose,
  selectedTask,
  selectedBucket,
  setSelectedBucket,
  onSave,
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
            <h5 className="modal-title fw-semibold">Move Task</h5>
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
                <label className="form-label">Bucket Name</label>
                <select
                  className="form-select"
                  value={selectedBucket}
                  onChange={(e) => setSelectedBucket(e.target.value)}
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={() => onSave(selectedTask, selectedBucket)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveTaskModal;
