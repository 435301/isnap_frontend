import React from 'react';

const CatalogListingSection = ({
  formData,
  errors,
  handleCatalogRowChange,
  handleRemoveCatalogRow,
  expandedSections,
  toggleSection,
}) => {
  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${!expandedSections.catalogListing ? 'collapsed' : ''}`}
            type="button"
            onClick={() => toggleSection('catalogListing')}
            aria-expanded={expandedSections.catalogListing}
          >
            Catalog Listing
          </button>
        </h2>
        <div
          className={`accordion-collapse collapse ${expandedSections.catalogListing ? 'show' : ''}`}
          aria-labelledby="catalogListing"
        >
          <div className="accordion-body">
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label">Marketplace <span className="text-danger">*</span></label>
                <select
                  className="form-select"
                  name="catalogType"
                  value={formData.catalogRows[0]?.catalogType || ''}
                  onChange={(e) => handleCatalogRowChange(0, e)}
                >
                  <option value="">Select Marketplace</option>
                  <option value="Type1">Type 1</option>
                  <option value="Type2">Type 2</option>
                </select>
                {errors.catalogType && <div className="text-danger small">{errors.catalogType}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">No. of SKU's</label>
                <input
                  type="number"
                  className="form-control"
                  name="skuCount"
                  value={formData.catalogRows[0]?.skuCount || ''}
                  onChange={(e) => handleCatalogRowChange(0, e)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Per SKU Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="perSkuPrice"
                  value={formData.catalogRows[0]?.perSkuPrice || ''}
                  onChange={(e) => handleCatalogRowChange(0, e)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Offer Price</label>
                <input
                  type="number"
                  placeholder="467"
                  className="form-control"
                  name="offerPrice"
                  value={formData.catalogRows[0]?.offerPrice || ''}
                  onChange={(e) => handleCatalogRowChange(0, e)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Total Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="totalPrice"
                  value={formData.catalogRows[0]?.totalPrice || ''}
                  onChange={(e) => handleCatalogRowChange(0, e)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Billing Cycle</label>
                <select
                  className="form-select"
                  name="billingCycle"
                  value={formData.catalogRows[0]?.billingCycle || ''}
                  onChange={(e) => handleCatalogRowChange(0, e)}
                >
                  <option value="">Select Billing Cycle</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Task Completion Days</label>
                <input
                  type="number"
                  placeholder="No. of days"
                  className="form-control"
                  name="taskDays"
                  value={formData.catalogRows[0]?.taskDays || ''}
                  onChange={(e) => handleCatalogRowChange(0, e)}
                />
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
              <button type="button" className="btn btn-outline-secondary px-5 me-2">Reset</button>
              <button type="submit" className="btn btn-success px-5">Save</button>
            </div>
            <div className="table-responsive mb-3">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>S.no</th>
                    <th>Catalog Type</th>
                    <th>No. of SKU's</th>
                    <th>Per SKU Price</th>
                    <th>Offer Price</th>
                    <th>Total Price</th>
                    <th>Billing Cycle</th>
                    <th>Task Completion Days</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {formData.catalogRows.length > 0 ? (
                    formData.catalogRows.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.catalogType}</td>
                        <td>{row.skuCount}</td>
                        <td>{row.perSkuPrice}</td>
                        <td>{row.offerPrice}</td>
                        <td>{row.totalPrice}</td>
                        <td>{row.billingCycle}</td>
                        <td>{row.taskDays}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveCatalogRow(index)}
                            disabled={formData.catalogRows.length === 1}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">No data available</td>
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

export default CatalogListingSection;