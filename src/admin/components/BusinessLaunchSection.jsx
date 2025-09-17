import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusinessLaunchList,
  createBusinessLaunch,
  updateBusinessLaunch,
  deleteBusinessLaunch,
} from "../../redux/actions/businessLaunchActions";

const BusinessLaunchSection = ({ businessId = 5, expandedSections, toggleSection }) => {
  const dispatch = useDispatch();

  const { launches = [], loading, error } = useSelector(
    (state) => state.businessLaunches || {}
  );

  const [formData, setFormData] = useState({
    serviceType: "",
    actualPrice: "",
    offerPrice: "",
    billingCycle: "",
    taskDays: "",
    id: null, // used for editing
  });

  const [errors, setErrors] = useState({});

  // Fetch data on mount
  useEffect(() => {
    if (businessId) dispatch(fetchBusinessLaunchList(businessId));
  }, [dispatch, businessId]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!formData.serviceType) newErrors.serviceType = "Service Type is required";
    return newErrors;
  };

  // Handle form submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = new FormData();
    payload.append("businessId", businessId);
    payload.append("serviceType", formData.serviceType);
    payload.append("actualPrice", formData.actualPrice);
    payload.append("offerPrice", formData.offerPrice);
    payload.append("billingCycle", formData.billingCycle);
    payload.append("taskDays", formData.taskDays);
    if (formData.id) payload.append("id", formData.id);

    try {
      if (formData.id) {
        await dispatch(updateBusinessLaunch(payload));
      } else {
        await dispatch(createBusinessLaunch(payload));
      }
      // Reset form
      setFormData({
        serviceType: "",
        actualPrice: "",
        offerPrice: "",
        billingCycle: "",
        taskDays: "",
        id: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Edit row
  const handleEdit = (row) => {
    setFormData({
      serviceType: row.serviceType,
      actualPrice: row.actualPrice,
      offerPrice: row.offerPrice,
      billingCycle: row.billingCycle,
      taskDays: row.taskDays,
      id: row.id,
    });
    if (!expandedSections.businessLaunch) toggleSection("businessLaunch");
  };

  // Delete row
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      dispatch(deleteBusinessLaunch(id));
    }
  };

  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${
              !expandedSections.businessLaunch ? "collapsed" : ""
            }`}
            type="button"
            onClick={() => toggleSection("businessLaunch")}
            aria-expanded={expandedSections.businessLaunch}
          >
            Business Launch
          </button>
        </h2>

        <div
          className={`accordion-collapse collapse ${
            expandedSections.businessLaunch ? "show" : ""
          }`}
        >
          <div className="accordion-body">
            {/* FORM */}
            <form onSubmit={handleSubmit}>
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
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                  </select>
                  {errors.serviceType && (
                    <div className="text-danger small">{errors.serviceType}</div>
                  )}
                </div>

                <div className="col-md-2">
                  <label className="form-label">Actual Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="actualPrice"
                    placeholder="567"
                    value={formData.actualPrice}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Offer Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="offerPrice"
                    placeholder="467"
                    value={formData.offerPrice}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Billing Cycle</label>
                  <select
                    className="form-select"
                    name="billingCycle"
                    value={formData.billingCycle}
                    onChange={handleChange}
                  >
                    <option value="">Select Billing Cycle</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <label className="form-label">Task Days</label>
                  <input
                    type="number"
                    className="form-control"
                    name="taskDays"
                    placeholder="No. of days"
                    value={formData.taskDays}
                    onChange={handleChange}
                  />
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
                <button type="submit" className="btn btn-success">
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
                        <td>{row.serviceType}</td>
                        <td>{row.actualPrice}</td>
                        <td>{row.offerPrice}</td>
                        <td>{row.billingCycle}</td>
                        <td>{row.taskDays}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(row)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(row.id)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLaunchSection;
