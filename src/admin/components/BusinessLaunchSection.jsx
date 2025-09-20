import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusinessLaunchList,
  createBusinessLaunch,
  updateBusinessLaunch,
  deleteBusinessLaunch,
} from "../../redux/actions/businessLaunchActions";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import { fetchBillingCycles } from "../../redux/actions/billingActions";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";

const BusinessLaunchSection = ({ businessId, expandedSections, toggleSection }) => {
  console.log('businessIdbusinesslaunch', businessId);
  const dispatch = useDispatch();

  const { launches = [], loading, error } = useSelector(
    (state) => state.businessLaunches || {}
  );
  console.log('launches', launches)
  const serviceType = useSelector((state) => state.serviceType.serviceTypes || []);
  const billing = useSelector((state) => state.billing.billingCycles || []);

  const [formData, setFormData] = useState({
    serviceType: "",
    actualPrice: "",
    offerPrice: "",
    billingCycle: "",
    taskDays: "",
    id: 0,
  });
  const [businessLaunchTodelete, setBusinessLaunchToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    dispatch(fetchServiceTypes());
    dispatch(fetchBillingCycles());
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    if (name === "serviceType") {
      const selectedService = serviceType.find((type) => type.id === parseInt(value));
      setFormData((prev) => ({
        ...prev,
        serviceType: value,
        actualPrice: selectedService ? selectedService.price : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!formData.serviceType) newErrors.serviceType = "Service Type is required";
    if (!formData.offerPrice) newErrors.offerPrice = "Offer Price is required";
    if(formData.offerPrice && formData.actualPrice && Number(formData.offerPrice) > Number(formData.actualPrice)) newErrors.offerPrice = "Offer Price should be than Actual Price";
    if (!formData.billingCycle) newErrors.billingCycle = "Billing Cycle is required";
    if (!formData.taskDays) newErrors.taskDays = "Task Days is required";
    return newErrors;
  };

  const handleSubmitBusinessLaunch = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      id: formData.id ? Number(formData.id) : 0,
      businessId,
      serviceTypeId: Number(formData.serviceType),
      actualPrice: Number(formData.actualPrice),
      offerPrice: Number(formData.offerPrice),
      billCycleId: Number(formData.billingCycle),
      taskCompletionDays: Number(formData.taskDays),
      status: 1,
    };


    try {
      await dispatch(createBusinessLaunch(payload));
      setFormData({
        serviceType: "",
        actualPrice: "",
        offerPrice: "",
        billingCycle: "",
        taskDays: "",
        id: 0,
      });
    } catch (err) {
      console.error("API error:", err);
    }
  };
  // Edit row
  const handleEdit = (row) => {
    setFormData({
      serviceType: row.serviceTypeId,
      actualPrice: row.actualPrice,
      offerPrice: row.offerPrice,
      billingCycle: row.billCycleId,
      taskDays: row.taskCompletionDays,
      id: row.id,
    });
    if (!expandedSections.businessLaunch) toggleSection("businessLaunch");
  };

  // Delete row
  const handleDeleteClick = (id) => {
    setBusinessLaunchToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteBusinessLaunch(businessLaunchTodelete));
    setShowDeleteModal(false);
    setBusinessLaunchToDelete(null);

  };

  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${!expandedSections.businessLaunch ? "collapsed" : ""
              }`}
            type="button"
            onClick={() => toggleSection("businessLaunch")}
            aria-expanded={expandedSections.businessLaunch}
          >
            Business Launch
          </button>
        </h2>

        <div
          className={`accordion-collapse collapse ${expandedSections.businessLaunch ? "show" : ""
            }`}
        >
          <div className="accordion-body">
            {/* FORM */}
            <form onSubmit={handleSubmitBusinessLaunch}>
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label className="form-label">
                    Marketplace <span className="text-danger">*</span>
                  </label>
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
                  {errors.serviceType && (
                    <div className="text-danger small">{errors.serviceType}</div>
                  )}
                </div>

                <div className="col-md-2">
                  <label className="form-label">Actual Price<span className="text-danger"> *</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="actualPrice"
                    placeholder="567"
                    value={formData.actualPrice}
                    onChange={handleChange}
                    disabled
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Offer Price<span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="offerPrice"
                    placeholder="467"
                    value={formData.offerPrice}
                    onChange={handleChange}
                  />
                  {errors.offerPrice && (
                    <div className="text-danger small">{errors.offerPrice}</div>
                  )}
                </div>

                <div className="col-md-2">
                  <label className="form-label">Billing Cycle<span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    name="billingCycle"
                    value={formData.billingCycle}
                    onChange={handleChange}
                  >
                    <option value="">Select Billing Cycle</option>
                    {billing.map((cycle) => (
                      <option key={cycle.id} value={cycle.id}>
                        {cycle.title}
                      </option>
                    ))}
                  </select>
                  {errors.billingCycle && (
                    <div className="text-danger small">{errors.billingCycle}</div>
                  )}
                </div>

                <div className="col-md-2">
                  <label className="form-label">Task Days<span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="taskDays"
                    placeholder="No. of days"
                    value={formData.taskDays}
                    onChange={handleChange}
                  />
                  {errors.taskDays && (
                    <div className="text-danger small">{errors.taskDays}</div>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-end mb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={() =>
                    setFormData({
                      serviceType: "",
                      actualPrice: "",
                      offerPrice: "",
                      billingCycle: "",
                      taskDays: "",
                      id: null,
                    })
                  }
                >
                  Reset
                </button>
                <button type="button" className="btn btn-success" onClick={handleSubmitBusinessLaunch}>
                  {formData.id ? "Update" : "Save"}
                </button>
              </div>
            </form>

            {/* TABLE */}
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead className="thead-light">
                  <tr>
                    <th>S.no</th>
                    <th>Marketplace</th>
                    <th>Actual Price</th>
                    <th>Offer Price</th>
                    <th>Billing Cycle</th>
                    <th>Task Days</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="7" className="text-danger">
                        {error}
                      </td>
                    </tr>
                  ) : launches.length > 0 ? (
                    launches.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.serviceTypeName}</td>
                        <td>{row.actualPrice}</td>
                        <td>{row.offerPrice}</td>
                        <td>{row.billCycleTitle}</td>
                        <td>{row.taskCompletionDays}</td>
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
                      <td colSpan="7">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <DeleteConfirmationModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} handleConfirm={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLaunchSection;
