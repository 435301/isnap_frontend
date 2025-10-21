import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptDocuments, fetchRequiredDocuments, rejectDocuments } from "../../redux/actions/mouAction";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";
import "../assets/css/reject.css";

const ManagerDocumentView = ({ businessId, show, onClose, onApprove, onReject }) => {
  const dispatch = useDispatch();
  const { loading, documents, error } = useSelector((state) => state.mou);
  const [showPrompt, setShowPrompt] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (show && businessId) {
      dispatch(fetchRequiredDocuments(businessId));
    }
  }, [dispatch, businessId, show]);

  if (!show) return null; // Don’t render when modal is closed

  // Remove duplicate documentTypeId entries
  const uniqueDocuments = documents.filter(
    (doc, index, self) =>
      index === self.findIndex(
        (d) => d.documentTypeId === doc.documentTypeId && d.documentCategoryId === doc.documentCategoryId
      )
  );

  // Group documents by category
  const groupedDocs = uniqueDocuments.reduce((acc, doc) => {
    const category = doc.documentCategoryTitle;
    if (!acc[category]) acc[category] = [];
    acc[category].push(doc);
    return acc;
  }, {});


  const handleAccept = async () => {
    const res = await dispatch(acceptDocuments(businessId));
    console.log('res', res)
    onApprove();
  };

  const handleRejectConfirm = async () => {
    if (!reason.trim()) {
      toast.warn("Please enter a reason");
      return;
    }
    await dispatch(rejectDocuments(businessId, reason));
    setShowPrompt(false);
    setReason("");
    onReject();
  };

  const handleReject = () => {
    setShowPrompt(true);
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header text-white">
            <h5 className="modal-title">Seller Documents</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {loading ? (
              <p>Loading documents...</p>
            ) : documents.length === 0 ? (
              <p>No documents found.</p>
            ) : (
              Object.entries(groupedDocs).map(([category, docs]) => (
                <div key={category} className="mt-3">
                  <h6 className="text-success">{category}</h6>
                  <div className="ms-3">
                    {docs.map((doc) => (
                      <div
                        key={doc.id}
                        className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center"
                      >
                        <div className="flex-grow-1">
                          <label className="fw-semibold">
                            {doc.documentType}
                          </label>

                          {doc.file ? (
                            <p className="text-success mt-2">
                              Uploaded:{" "}
                              <a
                                href={`${BASE_URL}${doc.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View File
                              </a>
                            </p>
                          ) : (
                            <p className="text-danger mt-2">Not uploaded</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
            {documents.length > 0 && (
              <>
                <div className="col-lg-12 d-flex justify-content-end mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary px-3 me-2"
                    onClick={handleAccept}
                  >
                    Approve Documents
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger px-3"
                    onClick={handleReject}
                  >
                    Reject Documents
                  </button>

                  {showPrompt && (
                    <div className="small-prompt-overlay">
                      <div className="small-prompt-box">
                        <h6 className="mb-2">Reject Documents</h6>
                        <textarea
                          className="form-control form-control-sm"
                          placeholder="Enter reason..."
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          rows={5}
                        ></textarea>
                        <div className="mt-3 text-end">
                          <button
                            className="btn btn-light btn-sm me-2"
                            onClick={() => setShowPrompt(false)}
                          >
                            Cancel
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={handleRejectConfirm}>
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )
            }

          </div>

          <div className="modal-footer">
            <button className="btn btn-light" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDocumentView;
