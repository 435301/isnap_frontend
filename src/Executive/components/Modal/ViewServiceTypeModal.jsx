import React from "react";

const ViewServiceTypeModal = ({ show, handleClose, service }) => {
  if (!show || !service) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5>View Marketplace</h5>
            <button className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Marketplace Type:</strong> {service.marketPlaceType}</p>
            <p><strong>Marketplace:</strong> {service.serviceType}</p>
            <p><strong>Price:</strong> ₹{service.price}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: service.status ? "green" : "red" }}>
                {service.status ? "Active" : "Inactive"}
              </span>
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewServiceTypeModal;
