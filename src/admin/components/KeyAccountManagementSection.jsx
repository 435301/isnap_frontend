import React, { useState } from 'react';

const KeyAccountManagementSection = ({
  formData,
  setFormData,
  errors,
  handleKeyAccountRowChange,
  handleRemoveKeyAccountRow,
  expandedSections,
  toggleSection,
}) => {
  const [activeKeyAccountSection, setActiveKeyAccountSection] = useState('Subscription');

  const handleCommissionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...formData.keyAccountRows];
    const commissionTiers = updatedRows[0]?.commissionTiers || [
      { actualCommission: '', offerCommission: '' },
      { actualCommission: '', offerCommission: '' },
      { actualCommission: '', offerCommission: '' },
      { actualCommission: '', offerCommission: '' },
    ];
    commissionTiers[index] = {
      ...commissionTiers[index],
      [name]: value,
    };
    updatedRows[0] = { ...updatedRows[0], commissionTiers };
    setFormData((prev) => ({ ...prev, keyAccountRows: updatedRows }));
  };

  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${!expandedSections.keyAccountManagement ? 'collapsed' : ''}`}
            type="button"
            onClick={() => toggleSection('keyAccountManagement')}
            aria-expanded={expandedSections.keyAccountManagement}
          >
            Key Account Management
          </button>
        </h2>
        <div
          className={`accordion-collapse collapse ${expandedSections.keyAccountManagement ? 'show' : ''}`}
          aria-labelledby="keyAccountManagement"
        >
          <div className="accordion-body">
            <div className="row g-3 mb-3">
              <div className="col-md-3">
                <label className="form-label">Marketplace <span className="text-danger">*</span></label>
                <select
                  className="form-select"
                  name="serviceType"
                  value={formData.keyAccountRows[0]?.serviceType || ''}
                  onChange={(e) => handleKeyAccountRowChange(0, e)}
                >
                  <option value="">Select Marketplace</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Flipkart">Flipkart</option>
                </select>
                {errors.serviceType && <div className="text-danger small">{errors.serviceType}</div>}
              </div>
            </div>
            <div className="row g-3 mb-3 my-3">
              <div className="col-md-12">
                <div className="row g-3 align-items-center mb-3">
                  <div
                    className={`col-md-2 text-white text-center p-2 ${activeKeyAccountSection === 'Subscription' ? 'bg-success' : 'bg-light'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveKeyAccountSection('Subscription')}
                  >
                    Subscription
                  </div>
                  <div
                    className={`col-md-2 text-center p-2 ${activeKeyAccountSection === 'Commission' ? 'bg-success text-white' : 'bg-light'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveKeyAccountSection('Commission')}
                  >
                    Commission
                  </div>
                </div>
                {activeKeyAccountSection === 'Subscription' && (
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label">Actual Price</label>
                      <input
                        type="number"
                        placeholder="567"
                        className="form-control"
                        name="actualPrice"
                        value={formData.keyAccountRows[0]?.actualPrice || ''}
                        onChange={(e) => handleKeyAccountRowChange(0, e)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Offer Price</label>
                      <input
                        type="number"
                        placeholder="467"
                        className="form-control"
                        name="offerPrice"
                        value={formData.keyAccountRows[0]?.offerPrice || ''}
                        onChange={(e) => handleKeyAccountRowChange(0, e)}
                      />
                    </div>
                  </div>
                )}
                {activeKeyAccountSection === 'Commission' && (
                  <div className="row g-3">
                    <div className="col-md-7">
                      <table className="table table-borderless ms-3">
                        <thead>
                          <tr>
                            <th>Amount</th>
                            <th>Actual Commission %</th>
                            <th>Offer Commission %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { amount: 'Below 10 Lakhs', actual: 10, offer: 9 },
                            { amount: '10 Lakhs to 50 Lakhs', actual: 20, offer: 18 },
                            { amount: '50 Lakhs to 300 Lakhs', actual: 30, offer: 28 },
                            { amount: 'Above 300 Lakhs', actual: 40, offer: 35 },
                          ].map((row, index) => (
                            <tr key={index}>
                              <td>{row.amount}</td>
                              <td className="text-center">
                                <input
                                  className="form-control w-50 mx-auto text-center"
                                  type="number"
                                  name="actualCommission"
                                  value={
                                    formData.keyAccountRows[0]?.commissionTiers?.[index]?.actualCommission ||
                                    row.actual
                                  }
                                  onChange={(e) => handleCommissionChange(index, e)}
                                />
                              </td>
                              <td className="text-center">
                                <input
                                  className="form-control w-50 mx-auto text-center"
                                  type="number"
                                  name="offerCommission"
                                  value={
                                    formData.keyAccountRows[0]?.commissionTiers?.[index]?.offerCommission ||
                                    row.offer
                                  }
                                  onChange={(e) => handleCommissionChange(index, e)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Security Deposit</label>
                      <input
                        type="number"
                        className="form-control w-25"
                        placeholder="Amount"
                        name="securityDeposit"
                        value={formData.keyAccountRows[0]?.securityDeposit || ''}
                        onChange={(e) => handleKeyAccountRowChange(0, e)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                <button type="button" className="btn btn-outline-secondary px-5 me-2">Reset</button>
                <button type="submit" className="btn btn-success px-5">Save</button>
              </div>
            </div>
            <div className="table-responsive mb-3">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>S.no</th>
                    <th>Service Type</th>
                    <th>Subscription (Actual Price)</th>
                    <th>Subscription (Offer Price)</th>
                    <th>Security Deposit</th>
                    <th>Commission</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.keyAccountRows.length > 0 ? (
                    formData.keyAccountRows.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.serviceType}</td>
                        <td>{row.actualPrice}</td>
                        <td>{row.offerPrice}</td>
                        <td>{row.securityDeposit || 'N/A'}</td>
                        <td>
                          {row.commissionTiers
                            ?.map(
                              (tier) =>
                                `${tier.amount || 'N/A'}: ${tier.actualCommission}% / ${tier.offerCommission}%`,
                            )
                            .join(', ')}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveKeyAccountRow(index)}
                            disabled={formData.keyAccountRows.length === 1}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No data available</td>
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

export default KeyAccountManagementSection;