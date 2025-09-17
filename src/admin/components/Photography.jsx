import React from 'react';

const Photography = ({
  formData,
  setFormData, // Add setFormData to props
  errors,
  expandedSections,
  toggleSection,
  handleServiceRowChange,
  handleRemoveServiceRow,
  handleSubmit,
}) => {
  return (
    <div className="tab-content">
      <form onSubmit={handleSubmit}>
        {/* Product Photography Section */}
        <div className="accordion mb-3">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${!expandedSections.photographyProduct ? 'collapsed' : ''}`}
                type="button"
                onClick={() => toggleSection('photographyProduct')}
                aria-expanded={expandedSections.photographyProduct}
              >
                Product Photography
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${expandedSections.photographyProduct ? 'show' : ''}`}
              aria-labelledby="photographyProduct"
            >
              <div className="accordion-body">
                <div className="row g-3 mb-3 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label">Service Type <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="serviceType"
                      value={formData.serviceRows[0]?.serviceType || ''}
                      onChange={(e) => handleServiceRowChange(0, e)}
                    >
                      <option value="">Select Service Type</option>
                      <option value="Single Product Shot">Single Product Shot</option>
                      <option value="Lifestyle & Creative Photography">Lifestyle & Creative Photography</option>
                      <option value="Model Photography">Model Photography</option>
                      <option value="A+ Content Photography">A+ Content Photography</option>
                      <option value="Store, Showroom & Manufacturing Unit Shoots">Store, Showroom & Manufacturing Unit Shoots</option>
                      <option value="Social Media Ready Content">Social Media Ready Content</option>
                    </select>
                    {errors.serviceType && <div className="text-danger small">{errors.serviceType}</div>}
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Actual Price</label>
                    <input
                      type="number"
                      placeholder="567"
                      className="form-control"
                      name="actualPrice"
                      value={formData.serviceRows[0]?.actualPrice || ''}
                      onChange={(e) => handleServiceRowChange(0, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Offer Price</label>
                    <input
                      type="number"
                      placeholder="467"
                      className="form-control"
                      name="offerPrice"
                      value={formData.serviceRows[0]?.offerPrice || ''}
                      onChange={(e) => handleServiceRowChange(0, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Billing Cycle</label>
                    <select
                      className="form-select"
                      name="billingCycle"
                      value={formData.serviceRows[0]?.billingCycle || ''}
                      onChange={(e) => handleServiceRowChange(0, e)}
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
                      value={formData.serviceRows[0]?.taskDays || ''}
                      onChange={(e) => handleServiceRowChange(0, e)}
                    />
                  </div>
                </div>
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
                          <td colSpan="6" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12 d-flex justify-content-end mt-3">
                  <button type="button" className="btn btn-outline-secondary px-5 me-2">Reset</button>
                  <button type="submit" className="btn btn-success px-5">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle & Creative Photography Section */}
        <div className="accordion mb-3">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${!expandedSections.photographyLifestyle ? 'collapsed' : ''}`}
                type="button"
                onClick={() => toggleSection('photographyLifestyle')}
                aria-expanded={expandedSections.photographyLifestyle}
              >
                Lifestyle & Creative Photography
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${expandedSections.photographyLifestyle ? 'show' : ''}`}
              aria-labelledby="photographyLifestyle"
            >
              <div className="accordion-body">
                <div className="row g-3 mb-3 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label">Service Type <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="serviceType"
                      value={formData.serviceRows[1]?.serviceType || ''}
                      onChange={(e) => handleServiceRowChange(1, e)}
                    >
                      <option value="">Select Service Type</option>
                      <option value="Single Product Shot">Single Product Shot</option>
                      <option value="Lifestyle & Creative Photography">Lifestyle & Creative Photography</option>
                      <option value="Model Photography">Model Photography</option>
                      <option value="A+ Content Photography">A+ Content Photography</option>
                      <option value="Store, Showroom & Manufacturing Unit Shoots">Store, Showroom & Manufacturing Unit Shoots</option>
                      <option value="Social Media Ready Content">Social Media Ready Content</option>
                    </select>
                    {errors.serviceType && <div className="text-danger small">{errors.serviceType}</div>}
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Actual Price</label>
                    <input
                      type="number"
                      placeholder="567"
                      className="form-control"
                      name="actualPrice"
                      value={formData.serviceRows[1]?.actualPrice || ''}
                      onChange={(e) => handleServiceRowChange(1, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Offer Price</label>
                    <input
                      type="number"
                      placeholder="467"
                      className="form-control"
                      name="offerPrice"
                      value={formData.serviceRows[1]?.offerPrice || ''}
                      onChange={(e) => handleServiceRowChange(1, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Billing Cycle</label>
                    <select
                      className="form-select"
                      name="billingCycle"
                      value={formData.serviceRows[1]?.billingCycle || ''}
                      onChange={(e) => handleServiceRowChange(1, e)}
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
                      value={formData.serviceRows[1]?.taskDays || ''}
                      onChange={(e) => handleServiceRowChange(1, e)}
                    />
                  </div>
                </div>
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
                      {formData.serviceRows.length > 1 ? (
                        formData.serviceRows.slice(1, 2).map((row, index) => (
                          <tr key={index + 1}>
                            <td>{index + 2}</td>
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
                                onClick={() => handleRemoveServiceRow(index + 1)}
                                disabled={formData.serviceRows.length === 1}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12 d-flex justify-content-end mt-3">
                  <button type="button" className="btn btn-outline-secondary px-5 me-2">Reset</button>
                  <button type="submit" className="btn btn-success px-5">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Photography Section */}
        <div className="accordion mb-3">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${!expandedSections.photographyModel ? 'collapsed' : ''}`}
                type="button"
                onClick={() => toggleSection('photographyModel')}
                aria-expanded={expandedSections.photographyModel}
              >
                Model Photography
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${expandedSections.photographyModel ? 'show' : ''}`}
              aria-labelledby="photographyModel"
            >
              <div className="accordion-body">
                <div className="row g-3 mb-3 align-items-center">
                  <div className="col-md-3">
                    <label className="form-label">Gender <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="gender"
                      value={formData.gender || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, gender: e.target.value }))
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <div className="text-danger small">{errors.gender}</div>}
                  </div>
                </div>
                <div className="row g-3 mb-3 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label">Service Type <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="serviceType"
                      value={formData.serviceRows[2]?.serviceType || ''}
                      onChange={(e) => handleServiceRowChange(2, e)}
                    >
                      <option value="">Select Service Type</option>
                      <option value="Single Product Shot">Single Product Shot</option>
                      <option value="Lifestyle & Creative Photography">Lifestyle & Creative Photography</option>
                      <option value="Model Photography">Model Photography</option>
                      <option value="A+ Content Photography">A+ Content Photography</option>
                      <option value="Store, Showroom & Manufacturing Unit Shoots">Store, Showroom & Manufacturing Unit Shoots</option>
                      <option value="Social Media Ready Content">Social Media Ready Content</option>
                    </select>
                    {errors.serviceType && <div className="text-danger small">{errors.serviceType}</div>}
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Actual Price</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="567"
                      name="actualPrice"
                      value={formData.serviceRows[2]?.actualPrice || ''}
                      onChange={(e) => handleServiceRowChange(2, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Offer Price</label>
                    <input
                      type="number"
                      placeholder="467"
                      className="form-control"
                      name="offerPrice"
                      value={formData.serviceRows[2]?.offerPrice || ''}
                      onChange={(e) => handleServiceRowChange(2, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Billing Cycle</label>
                    <select
                      className="form-select"
                      name="billingCycle"
                      value={formData.serviceRows[2]?.billingCycle || ''}
                      onChange={(e) => handleServiceRowChange(2, e)}
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
                      value={formData.serviceRows[2]?.taskDays || ''}
                      onChange={(e) => handleServiceRowChange(2, e)}
                    />
                  </div>
                </div>
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
                      {formData.serviceRows.length > 2 ? (
                        formData.serviceRows.slice(2, 3).map((row, index) => (
                          <tr key={index + 2}>
                            <td>{index + 3}</td>
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
                                onClick={() => handleRemoveServiceRow(index + 2)}
                                disabled={formData.serviceRows.length === 1}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12 d-flex justify-content-end mt-3">
                  <button type="button" className="btn btn-outline-secondary px-5 me-2">Reset</button>
                  <button type="submit" className="btn btn-success px-5">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* A+ Content Photography Section */}
        <div className="accordion mb-3">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${!expandedSections.photographyAplus ? 'collapsed' : ''}`}
                type="button"
                onClick={() => toggleSection('photographyAplus')}
                aria-expanded={expandedSections.photographyAplus}
              >
                A+ Content Photography
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${expandedSections.photographyAplus ? 'show' : ''}`}
              aria-labelledby="photographyAplus"
            >
              <div className="accordion-body">
                <div className="row g-3 mb-3 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label">Service Type <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="serviceType"
                      value={formData.serviceRows[3]?.serviceType || ''}
                      onChange={(e) => handleServiceRowChange(3, e)}
                    >
                      <option value="">Select Service Type</option>
                      <option value="Single Product Shot">Single Product Shot</option>
                      <option value="Lifestyle & Creative Photography">Lifestyle & Creative Photography</option>
                      <option value="Model Photography">Model Photography</option>
                      <option value="A+ Content Photography">A+ Content Photography</option>
                      <option value="Store, Showroom & Manufacturing Unit Shoots">Store, Showroom & Manufacturing Unit Shoots</option>
                      <option value="Social Media Ready Content">Social Media Ready Content</option>
                    </select>
                    {errors.serviceType && <div className="text-danger small">{errors.serviceType}</div>}
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Actual Price</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="567"
                      name="actualPrice"
                      value={formData.serviceRows[3]?.actualPrice || ''}
                      onChange={(e) => handleServiceRowChange(3, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Offer Price</label>
                    <input
                      type="number"
                      placeholder="467"
                      className="form-control"
                      name="offerPrice"
                      value={formData.serviceRows[3]?.offerPrice || ''}
                      onChange={(e) => handleServiceRowChange(3, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Billing Cycle</label>
                    <select
                      className="form-select"
                      name="billingCycle"
                      value={formData.serviceRows[3]?.billingCycle || ''}
                      onChange={(e) => handleServiceRowChange(3, e)}
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
                      value={formData.serviceRows[3]?.taskDays || ''}
                      onChange={(e) => handleServiceRowChange(3, e)}
                    />
                  </div>
                </div>
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
                      {formData.serviceRows.length > 3 ? (
                        formData.serviceRows.slice(3, 4).map((row, index) => (
                          <tr key={index + 3}>
                            <td>{index + 4}</td>
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
                                onClick={() => handleRemoveServiceRow(index + 3)}
                                disabled={formData.serviceRows.length === 1}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12 d-flex justify-content-end mt-3">
                  <button type="button" className="btn btn-outline-secondary px-5 me-2">Reset</button>
                  <button type="submit" className="btn btn-success px-5">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store, Showroom & Manufacturing Unit Shoots Section */}
        <div className="accordion mb-3">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${!expandedSections.photographyStore ? 'collapsed' : ''}`}
                type="button"
                onClick={() => toggleSection('photographyStore')}
                aria-expanded={expandedSections.photographyStore}
              >
                Store, Showroom & Manufacturing Unit Shoots
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${expandedSections.photographyStore ? 'show' : ''}`}
              aria-labelledby="photographyStore"
            >
              <div className="accordion-body">
                <div className="row g-3 mb-3 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label">Service Type <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="serviceType"
                      value={formData.serviceRows[4]?.serviceType || ''}
                      onChange={(e) => handleServiceRowChange(4, e)}
                    >
                      <option value="">Select Service Type</option>
                      <option value="Single Product Shot">Single Product Shot</option>
                      <option value="Lifestyle & Creative Photography">Lifestyle & Creative Photography</option>
                      <option value="Model Photography">Model Photography</option>
                      <option value="A+ Content Photography">A+ Content Photography</option>
                      <option value="Store, Showroom & Manufacturing Unit Shoots">Store, Showroom & Manufacturing Unit Shoots</option>
                      <option value="Social Media Ready Content">Social Media Ready Content</option>
                    </select>
                    {errors.serviceType && <div className="text-danger small">{errors.serviceType}</div>}
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Actual Price</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="567"
                      name="actualPrice"
                      value={formData.serviceRows[4]?.actualPrice || ''}
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
                      value={formData.serviceRows[4]?.offerPrice || ''}
                      onChange={(e) => handleServiceRowChange(4, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Billing Cycle</label>
                    <select
                      className="form-select"
                      name="billingCycle"
                      value={formData.serviceRows[4]?.billingCycle || ''}
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
                      value={formData.serviceRows[4]?.taskDays || ''}
                      onChange={(e) => handleServiceRowChange(4, e)}
                    />
                  </div>
                </div>
                <div className="text-end mb-3">
                  <a href="#" className="text-danger" data-bs-toggle="modal" data-bs-target="#trashModal">
                    <i className="bi bi-trash"></i> Trash (2)
                  </a>
                </div>
                <div className="modal fade" id="trashModal" tabIndex="-1" aria-labelledby="trashModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header bg-danger">
                        <h5 className="modal-title" id="trashModalLabel">Trash (2)</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <h5 className="mb-3">
                          <span className="text-success">Photography</span> (Store, Showroom & Manufacturing Unit Shoots)
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
                                        disabled={formData.serviceRows.length === 1}
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6" className="text-center">No data available</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      {formData.serviceRows.length > 4 ? (
                        formData.serviceRows.slice(4, 5).map((row, index) => (
                          <tr key={index + 4}>
                            <td>{index + 5}</td>
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
                                onClick={() => handleRemoveServiceRow(index + 4)}
                                disabled={formData.serviceRows.length === 1}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12 d-flex justify-content-end mt-3">
                  <button type="button" className="btn btn-outline-secondary px-5 me-2">Reset</button>
                  <button type="submit" className="btn btn-success px-5">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Ready Content Section */}
        <div className="accordion mb-3">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${!expandedSections.photographySocial ? 'collapsed' : ''}`}
                type="button"
                onClick={() => toggleSection('photographySocial')}
                aria-expanded={expandedSections.photographySocial}
              >
                Social Media Ready Content
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${expandedSections.photographySocial ? 'show' : ''}`}
              aria-labelledby="photographySocial"
            >
              <div className="accordion-body">
                <div className="row g-3 mb-3 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label">Service Type <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="serviceType"
                      value={formData.serviceRows[5]?.serviceType || ''}
                      onChange={(e) => handleServiceRowChange(5, e)}
                    >
                      <option value="">Select Service Type</option>
                      <option value="Single Product Shot">Single Product Shot</option>
                      <option value="Lifestyle & Creative Photography">Lifestyle & Creative Photography</option>
                      <option value="Model Photography">Model Photography</option>
                      <option value="A+ Content Photography">A+ Content Photography</option>
                      <option value="Store, Showroom & Manufacturing Unit Shoots">Store, Showroom & Manufacturing Unit Shoots</option>
                      <option value="Social Media Ready Content">Social Media Ready Content</option>
                    </select>
                    {errors.serviceType && <div className="text-danger small">{errors.serviceType}</div>}
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Actual Price</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="567"
                      name="actualPrice"
                      value={formData.serviceRows[5]?.actualPrice || ''}
                      onChange={(e) => handleServiceRowChange(5, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Offer Price</label>
                    <input
                      type="number"
                      placeholder="467"
                      className="form-control"
                      name="offerPrice"
                      value={formData.serviceRows[5]?.offerPrice || ''}
                      onChange={(e) => handleServiceRowChange(5, e)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Billing Cycle</label>
                    <select
                      className="form-select"
                      name="billingCycle"
                      value={formData.serviceRows[5]?.billingCycle || ''}
                      onChange={(e) => handleServiceRowChange(5, e)}
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
                      value={formData.serviceRows[5]?.taskDays || ''}
                      onChange={(e) => handleServiceRowChange(5, e)}
                    />
                  </div>
                </div>
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
                      {formData.serviceRows.length > 5 ? (
                        formData.serviceRows.slice(5, 6).map((row, index) => (
                          <tr key={index + 5}>
                            <td>{index + 6}</td>
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
                                onClick={() => handleRemoveServiceRow(index + 5)}
                                disabled={formData.serviceRows.length === 1}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12 d-flex justify-content-end mt-3">
                  <button type="button" className="btn btn-outline-secondary px-5 me-2">Reset</button>
                  <button type="submit" className="btn btn-success px-5">Save</button>
                </div> 
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
          <button type="button" className="btn btn-outline-secondary px-5 me-2">Cancel</button>
          <button type="submit" className="btn btn-success px-5">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Photography;