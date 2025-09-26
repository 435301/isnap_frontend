import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceTypes } from '../../redux/actions/serviceTypeActions';
import { createKeyAccountCommission, createSubscription, deleteSubscription, fetchKeyAccountAllCommissions, fetchKeyAccountCommission, fetchKeyAccountSubscription } from '../../redux/actions/keyAccountSubscriptionAction';
import DeleteConfirmationModal from './Modal/DeleteConfirmationModal';
import { fetchCommissions } from '../../redux/actions/commissionActions';
import { fetchBusinessLaunches } from '../../redux/actions/businessLaunchActions';

const KeyAccountManagementSection = ({
  handleKeyAccountRowChange,
  handleRemoveKeyAccountRow,
  expandedSections,
  toggleSection,
  businessId,
  businessIdEdit
}) => {
  console.log('businessIdkeyaccount', businessId);
  console.log('businessIdkeyaccountEdit', businessIdEdit);
  const dispatch = useDispatch();

  const { subscriptions = [], loading, error } = useSelector((state) => state.subscriptions || {});
  const { commissions = [], security } = useSelector((state) => state.subscriptions || {});
  const { serviceTypes = [], total } = useSelector((state) => state.keyAccountAllCommissions || {});

  const serviceType = useSelector((state) => state.serviceType.serviceTypes || []);
  const [formData, setFormData] = useState({
    serviceType: "",
    actualPrice: "",
    offerPrice: "",
    id: 0,
    keyAccountRows: [
      {
        securityDeposit: "",
        commissionTiers: [
          { actualCommission: "", offerCommission: "" },
          { actualCommission: "", offerCommission: "" },
          { actualCommission: "", offerCommission: "" },
          { actualCommission: "", offerCommission: "" },
        ],
      },
    ],
  });
  const [errors, setErrors] = useState({});
  const [toDelete, setToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeKeyAccountSection, setActiveKeyAccountSection] = useState('Subscription');

  useEffect(() => {
    dispatch(fetchServiceTypes());
  }, [dispatch]);

  useEffect(() => {
    if (businessIdEdit) {
      dispatch(fetchKeyAccountSubscription(businessIdEdit));
      dispatch(fetchKeyAccountAllCommissions(businessIdEdit || businessId));
    }
    else {
      dispatch({ type: "CLEAR_KEYACCOUNT_SUBSCRIPTIONS" });
      setFormData({
        serviceType: "",
        actualPrice: "",
        offerPrice: "",
        id: 0,
        keyAccountRows: [
          {
            securityDeposit: "",
            commissionTiers: [
              { actualCommission: "", offerCommission: "" },
              { actualCommission: "", offerCommission: "" },
              { actualCommission: "", offerCommission: "" },
              { actualCommission: "", offerCommission: "" },
            ],
          },
        ],
      });
    }
  }, [businessIdEdit, dispatch]);

  useEffect(() => {
    if (commissions.length > 0 || security) {
      setFormData((prev) => ({
        ...prev,
        keyAccountRows: [
          {
            securityDeposit: security?.securityDeposit || "",
            commissionTiers: commissions.map((c) => ({
              id: c.id || 0,
              commissionId: c.commissionId,
              commissionTitle: c.commissionTitle,
              actualCommission: c.actualPercentage || "",
              offerCommission: c.offerPercentage || "",
            })),
          },
        ],
      }));
    }
  }, [commissions, security]);


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

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "serviceType") {
      const selectedService = serviceType.find((type) => type.id === parseInt(value));
      setFormData((prev) => ({
        ...prev,
        serviceType: value,
        actualPrice: selectedService ? selectedService.price : "",
        offerPrice: selectedService ? selectedService.price : "",
        keyAccountRows: [
          {
            securityDeposit: "",
            commissionTiers: [],
          },
        ],
      }));
      if (value) {
        await dispatch(fetchKeyAccountSubscription(businessIdEdit || businessId, value));
        // Fetch commissions + security for this businessId + serviceType
        await dispatch(fetchKeyAccountCommission(businessId, value));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateSubscription = () => {
    const newErrors = {};
    if (!formData.serviceType) newErrors.serviceType = "Service Type is required";
    // if (!formData.offerPrice) newErrors.offerPrice = "Offer Price is required";
    return newErrors;
  };

  const validateCommission = () => {
    const newErrors = {};
    if (!formData.keyAccountRows[0]?.securityDeposit) {
      newErrors.securityDeposit = "Security Deposit is required";
    }
    return newErrors;
  };

  const handleSubmitSubscription = async (e) => {
    console.log('clicked')
    e.preventDefault();
    const newErrors = validateSubscription();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      id: formData.id ? Number(formData.id) : 0,
      businessId: businessIdEdit ? businessIdEdit : businessId,
      serviceTypeId: Number(formData.serviceType),
      offerPrice: Number(formData.offerPrice),
      actualPrice: Number(formData.actualPrice),
      status: 1,
    };

    try {
      await dispatch(createSubscription(payload));
      setFormData({
        serviceType: "",
        offerPrice: "",
        actualPrice: "",
        id: 0,
        keyAccountRows: [
          {
            securityDeposit: "",
            commissionTiers: [
              { actualCommission: "", offerCommission: "" },
              { actualCommission: "", offerCommission: "" },
              { actualCommission: "", offerCommission: "" },
              { actualCommission: "", offerCommission: "" },
            ],
          },
        ],
      });
    } catch (err) {
      console.error("API error:", err);
    }
  };


  const handleSubmitCommission = async (e) => {
    e.preventDefault();
    const newErrors = validateCommission();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const payload = {
      businessId: businessIdEdit ? businessIdEdit : businessId,
      serviceTypeId: Number(formData.serviceType),
      securityDeposit: Number(formData.keyAccountRows[0]?.securityDeposit || 0),
      commissions: formData.keyAccountRows[0]?.commissionTiers.map((tier, index) => ({
        id: tier.id || 0, // update if >0, create if 0
        commissionId: tier.commissionId,
        actualPercentage: Number(tier.actualCommission || 0),
        offerPercentage: Number(tier.offerCommission || 0),
        status: 1,
      })),
    };

    try {
      const res = await dispatch(createKeyAccountCommission(payload));
      await dispatch(fetchKeyAccountAllCommissions(businessIdEdit || businessId, formData.serviceType));
      console.log('res', res.data.commissions.serviceTypeId);
      setFormData({
        serviceType: "",
        actualPrice: "",
        offerPrice: "",
        id: 0,
        keyAccountRows: [
          {
            securityDeposit: "",
            commissionTiers: [
              { actualCommission: "", offerCommission: "" },
              { actualCommission: "", offerCommission: "" },
              { actualCommission: "", offerCommission: "" },
              { actualCommission: "", offerCommission: "" },
            ],
          },
        ],
      });
      await dispatch(fetchKeyAccountCommission(businessIdEdit || businessId, formData.serviceType));
    } catch (err) {
      console.error("Commission API error:", err);
    }
  };

  const handleSecurityDepositChange = (e) => {
    const { value } = e.target;
    const updatedRows = [...formData.keyAccountRows];
    updatedRows[0] = {
      ...updatedRows[0],
      securityDeposit: value
    };
    setFormData((prev) => ({ ...prev, keyAccountRows: updatedRows }));
  };


  // Edit row
  const handleEdit = (row) => {
    setFormData({
      serviceType: row.serviceTypeId,
      offerPrice: row.offerPrice,
      actualPrice: row.actualPrice,
      id: row.id,
    });
    if (!expandedSections.subscriptions) toggleSection("subscriptions");
  };

  const handleEditCommission = (row, serviceTypeId) => {
    // find the serviceType object from the API response
    const marketplace = serviceTypes.find(s => s.serviceTypeId === serviceTypeId);

    if (!marketplace) return; // safety check

    setFormData((prev) => ({
      ...prev,
      serviceType: serviceTypeId,
      keyAccountRows: [
        {
          securityDeposit: marketplace.security?.securityDeposit || "",
          commissionTiers: (marketplace.commissions || []).map((c) => ({
            id: c.id,
            commissionId: c.commissionId,
            commissionTitle: c.commissionTitle,
            actualCommission: c.actualPercentage,
            offerCommission: c.offerPercentage,
          })),
        },
      ],
    }));

    setActiveKeyAccountSection("Commission");
    if (!expandedSections.keyAccountManagement) toggleSection("keyAccountManagement");
  };

  // Delete row
  const handleDeleteClick = (id) => {
    setToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteSubscription(toDelete));
    setShowDeleteModal(false);
    setToDelete(null);
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
                  value={formData.serviceType}
                  onChange={handleChange}
                >
                  <option value="">Select Marketplace</option>
                  {serviceType.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.serviceType}
                    </option>
                  ))}
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
                      <label className="form-label">Actual Price<span className='text-danger'> *</span></label>
                      <input
                        type="number"
                        className="form-control"
                        name="actualPrice"
                        value={formData.actualPrice}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Offer Price<span className='text-danger'> *</span></label>
                      <input
                        type="number"
                        className="form-control"
                        name="offerPrice"
                        value={formData.offerPrice}
                        onChange={handleChange}
                      />
                      {errors.offerPrice && <div className="text-danger small">{errors.offerPrice}</div>}
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
                          {formData.keyAccountRows[0]?.commissionTiers?.map((row, index) => (
                            <tr key={index}>
                              <td>{row?.commissionTitle}</td>
                              <td className="text-center">
                                <input
                                  className="form-control w-50 mx-auto text-center"
                                  type="number"
                                  name="actualCommission"
                                  value={row.actualCommission}
                                  onChange={(e) => handleCommissionChange(index, e)}
                                  disabled
                                />
                              </td>
                              <td className="text-center">
                                <input
                                  className="form-control w-50 mx-auto text-center"
                                  type="number"
                                  name="offerCommission"
                                  value={row.offerCommission}
                                  onChange={(e) => handleCommissionChange(index, e)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Security Deposit<span className='text-danger'> *</span></label>
                      <input
                        type="number"
                        className="form-control w-25"
                        placeholder="Amount"
                        name="securityDeposit"
                        value={formData.keyAccountRows[0]?.securityDeposit || ''}
                        onChange={handleSecurityDepositChange}
                      />
                      {errors.securityDeposit && <div className="text-danger small">{errors.securityDeposit}</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                <button type="button" className="btn btn-outline-secondary px-5 me-2" onClick={() => setFormData({
                  serviceType: "", actualPrice: "", offerPrice: "", id: 0, keyAccountRows: [
                    {
                      securityDeposit: "",
                      commissionTiers: [
                        { actualCommission: "", offerCommission: "" },
                        { actualCommission: "", offerCommission: "" },
                        { actualCommission: "", offerCommission: "" },
                        { actualCommission: "", offerCommission: "" },
                      ],
                    },
                  ],
                })}>Reset</button>
                {activeKeyAccountSection === "Subscription" ? (
                  <button type="button" className="btn btn-success px-5" onClick={handleSubmitSubscription}>
                    Save
                  </button>
                ) : (
                  <button type="button" className="btn btn-success px-5" onClick={handleSubmitCommission}>
                    Save
                  </button>
                )}
              </div>
            </div>
            <div className="table-responsive mb-3">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>S.no</th>
                    <th>Service Type</th>

                    {activeKeyAccountSection === "Subscription" ? (
                      <>
                        <th>Subscription (Actual Price)</th>
                        <th>Subscription (Offer Price)</th>
                      </>
                    ) : (
                      <>
                        <th>Commission Tiers</th>
                        <th>Security Deposit</th>
                      </>
                    )}

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {loading ? (
                    <tr>
                      <td colSpan={activeKeyAccountSection === "Subscription" ? 5 : 7}>
                        Loading...
                      </td>
                    </tr>
                  ) : activeKeyAccountSection === "Subscription" ? (
                    subscriptions.length > 0 ? (
                      subscriptions.map((row, index) => (
                        <tr key={row.id}>
                          <td>{index + 1}</td>
                          <td>{row.serviceTypeName}</td>
                          <td>{row.actualPrice}</td>
                          <td>{row.offerPrice}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEdit(row)}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteClick(row.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No subscription data available</td>
                      </tr>
                    )
                  ) : serviceTypes.length > 0 ? (
                    serviceTypes.map((service, idx) => (
                      <tr key={service.serviceTypeId}>
                        <td>{idx + 1}</td>
                        <td>{service.serviceTypeName}</td>
                        <td>
                          {service.commissions?.map(c => (
                            <div key={c.commissionId}>
                              {c.commissionTitle} - Actual: {c.actualPercentage}% | Offer: {c.offerPercentage}%
                            </div>
                          )) || '-'}
                        </td>
                        <td>{service.security?.securityDeposit || '-'}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEditCommission(null, service.serviceTypeId)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                        </td>
                      </tr>
                    ))

                  ) : (
                    <tr>
                      <td colSpan="7">No commission data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>



            <DeleteConfirmationModal
              show={showDeleteModal}
              handleClose={() => setShowDeleteModal(false)}
              handleConfirm={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyAccountManagementSection;