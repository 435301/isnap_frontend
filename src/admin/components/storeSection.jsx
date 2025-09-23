import React from "react";

const PhotographyStoreSection = ({
  expandedSections,
  toggleSection,
  formData,
  getServiceRow,
  handleServiceRowChange,
  handleRemoveServiceRow,
  resetSection,
  errors,
}) => {
  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${!expandedSections?.photographyStore ? "collapsed" : ""
              }`}
            type="button"
            onClick={() => toggleSection("photographyStore")}
            aria-expanded={expandedSections?.photographyStore}
          >
            Store, Showroom & Manufacturing Unit Shoots
          </button>
        </h2>

        <div
          className={`accordion-collapse collapse ${expandedSections?.photographyStore ? "show" : ""
            }`}
          aria-labelledby="photographyStore"
        >
          <div className="accordion-body">
            {/* Form Row */}
            <div className="row g-3 mb-3 align-items-center">
              <div className="col-md-4">
                <label className="form-label">
                  Service Type <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="serviceType"
                  value={getServiceRow(4).serviceType}
                  onChange={(e) => handleServiceRowChange(4, e)}
                >
                  <option value="">Select Service Type</option>
                  <option value="Single Product Shot">Single Product Shot</option>
                  <option value="Lifestyle & Creative Photography">
                    Lifestyle & Creative Photography
                  </option>
                  <option value="Model Photography">Model Photography</option>
                  <option value="A+ Content Photography">
                    A+ Content Photography
                  </option>
                  <option value="Store, Showroom & Manufacturing Unit Shoots">
                    Store, Showroom & Manufacturing Unit Shoots
                  </option>
                  <option value="Social Media Ready Content">
                    Social Media Ready Content
                  </option>
                </select>
                {errors?.[`serviceType${4}`] && (
                  <div className="text-danger small">
                    {errors?.[`serviceType${4}`]}
                  </div>
                )}
              </div>

              <div className="col-md-2">
                <label className="form-label">Actual Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="567"
                  name="actualPrice"
                  value={getServiceRow(4).actualPrice}
                  onChange={(e) => handleServiceRowChange(4, e)}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Offer Price</label>
                <input
                  type="number"
                  placeholder="467"
                  className="form-control"
                  name="offerPrice"
                  value={getServiceRow(4).offerPrice}
                  onChange={(e) => handleServiceRowChange(4, e)}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Billing Cycle</label>
                <select
                  className="form-select"
                  name="billingCycle"
                  value={getServiceRow(4).billingCycle}
                  onChange={(e) => handleServiceRowChange(4, e)}
                >
                  <option value="">Select Billing Cycle</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label">Task Completion Days</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="No. of days"
                  name="taskDays"
                  value={getServiceRow(4).taskDays}
                  onChange={(e) => handleServiceRowChange(4, e)}
                />
              </div>
            </div>

            {/* Trash Link */}
            <div className="text-end mb-3">
              <a
                href="#"
                className="text-danger"
                data-bs-toggle="modal"
                data-bs-target="#trashModal"
              >
                <i className="bi bi-trash"></i> Trash (
                {formData.serviceRows.length})
              </a>
            </div>

            {/* Trash Modal */}
            <div
              className="modal fade"
              id="trashModal"
              tabIndex="-1"
              aria-labelledby="trashModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header bg-danger">
                    <h5 className="modal-title" id="trashModalLabel">
                      Trash ({formData.serviceRows.length})
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h5 className="mb-3">
                      <span className="text-success">Photography</span> (Store,
                      Showroom & Manufacturing Unit Shoots)
                    </h5>

                    <div className="table-responsive mb-3">
                      <table className="table table-bordered">
                        <thead className="thead-light">
                          <tr>
                            <th>S.no</th>
                            <th>Service Type</th>
                            <th>Actual Price</th>
                            <th>Offer Price</th>
                            <th>Billing Cycle</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {formData.serviceRows.length > 0 ? (
                            formData.serviceRows.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{row.serviceType}</td>
                                <td>{row.actualPrice}</td>
                                <td>{row.offerPrice}</td>
                                <td>{row.billingCycle}</td>
                                <td>
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="bi bi-pencil"></i>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleRemoveServiceRow(index)}
                                    disabled={
                                      formData.serviceRows.length === 1
                                    }
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="col-md-12 d-flex justify-content-end mt-3 mb-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-5 me-2"
                onClick={() => resetSection(4)}
              >
                Reset
              </button>
              <button type="submit" className="btn btn-success px-5">
                Save
              </button>
            </div>

            {/* Service Table */}
            <div className="table-responsive mb-3">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>S.no</th>
                    <th>Service Type</th>
                    <th>Actual Price</th>
                    <th>Offer Price</th>
                    <th>Billing Cycle</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {formData.serviceRows.length > 0 ? (
                    formData.serviceRows.slice(0, 1).map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.serviceType}</td>
                        <td>{row.actualPrice}</td>
                        <td>{row.offerPrice}</td>
                        <td>{row.billingCycle}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveServiceRow(index)}
                            disabled={formData.serviceRows.length === 1}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographyStoreSection;
