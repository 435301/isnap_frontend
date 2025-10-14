import React from "react";

const TrashModal = () => {
  return (
    <>
      {/* 🔹 Trash Button */}
      <div className="text-end">
        <a
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#trashModal"
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-trash text-danger"></i> Trash (2)
        </a>
      </div>

      {/* 🔹 Bootstrap 5 Modal */}
      <div
        className="modal fade"
        id="trashModal"
        tabIndex="-1"
        aria-labelledby="trashModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="trashModalLabel">
                Trash (2)
                <br />
                <span className="text-success fw-bold">
                  Photography (Store, Showroom & Manufacturing Unit Shoots)
                </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <table className="table table-striped table-bordered table-hover table-responsive">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Service Type</th>
                    <th>Actual Price</th>
                    <th>Offer Price</th>
                    <th>Billing Cycle</th>
                    <th>Added Date</th>
                    <th>Deleted Date</th>
                    <th>Deleted By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Product Photography</td>
                    <td>$500</td>
                    <td>$350</td>
                    <td>Monthly</td>
                    <td>2025-08-01</td>
                    <td>2025-09-05</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Store Shoot</td>
                    <td>$700</td>
                    <td>$500</td>
                    <td>One-time</td>
                    <td>2025-08-10</td>
                    <td>2025-09-07</td>
                    <td>Manager</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrashModal;
