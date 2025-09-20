import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import { fetchBillingCycles } from "../../redux/actions/billingActions";
import { createCatalogListing, deleteCatalogListing, fetchCatalogListing, fetchPerSkuPrice, fetchTotalPrice } from "../../redux/actions/catalogListingAction";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";

const CatalogListingSection = ({ businessId, expandedSections, toggleSection }) => {
  console.log('businessIdcatalog123', businessId);
  const dispatch = useDispatch();

  const { catalogListing = [], loading, error } = useSelector(
    (state) => state.catalogListing || {}
  );
  console.log('catalogListing', catalogListing);
  const serviceType = useSelector((state) => state.serviceType.serviceTypes || []);
  const billing = useSelector((state) => state.billing.billingCycles || []);

  const [formData, setFormData] = useState({
    serviceType: "",
    skuCount: "",
    perSkuPrice: "",
    offerPrice: "",
    totalPrice: "",
    billingCycle: "",
    taskDays: "",
    id: 0,
  });
  const [errors, setErrors] = useState({});
  const [toDelete, setToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { perSkuPriceData, totalPriceData } = useSelector((state) => state.catalogListing);

  useEffect(() => {
    dispatch(fetchServiceTypes());
    dispatch(fetchBillingCycles());
  }, [dispatch]);

  useEffect(() => {
    if (formData.skuCount) {
      dispatch(fetchPerSkuPrice(Number(formData.skuCount)));
    }
    if (formData.skuCount && formData.offerPrice) {
      dispatch(fetchTotalPrice(Number(formData.skuCount), Number(formData.offerPrice)));
    }
  }, [formData.skuCount, formData.offerPrice, dispatch]);

  useEffect(() => {
    if (perSkuPriceData?.perSkuPrice) {
      setFormData((prev) => ({
        ...prev,
        perSkuPrice: perSkuPriceData.perSkuPrice,
      }));
    };
    if (totalPriceData?.totalPrice) {
      setFormData((prev) => ({
        ...prev,
        totalPrice: totalPriceData.totalPrice,
      }));
    }
  }, [perSkuPriceData, totalPriceData]);


  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.serviceType) newErrors.serviceType = "Service Type is required";
    if (!formData.skuCount) newErrors.skuCount = "SKU count is required";
    if (!formData.offerPrice) newErrors.offerPrice = "Offer Price is required";
    if (formData.offerPrice && formData.perSkuPrice && Number(formData.offerPrice) > Number(formData.perSkuPrice)) newErrors.offerPrice = "Offer Price should be less than Per SKU Price";
    if (!formData.billingCycle) newErrors.billingCycle = "Billing Cycle is required";
    if (!formData.taskDays) newErrors.taskDays = "Task Days is required";
    return newErrors;
  };

  // Save / Update
  const handleSubmitCatalog = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      id: formData.id ? Number(formData.id) : 0,
      businessId,
      serviceTypeId: Number(formData.serviceType),
      noOfSkus: Number(formData.skuCount),
      perSkuPrice: Number(formData.perSkuPrice),
      offerPrice: Number(formData.offerPrice),
      totalPrice: Number(formData.totalPrice),
      billCycleId: Number(formData.billingCycle),
      taskCompletionDays: Number(formData.taskDays),
      status: 1,
    };

    try {
      await dispatch(createCatalogListing(payload));
      setFormData({
        serviceType: "",
        skuCount: "",
        perSkuPrice: "",
        offerPrice: "",
        totalPrice: "",
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
      skuCount: row.noOfSkus,
      perSkuPrice: row.perSkuPrice,
      offerPrice: row.offerPrice,
      totalPrice: row.totalPrice,
      billingCycle: row.billCycleId,
      taskDays: row.taskCompletionDays,
      id: row.id,
    });
    if (!expandedSections.catalogListing) toggleSection("catalogListing");
  };

  // Delete row
  const handleDeleteClick = (id) => {
    setToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteCatalogListing(toDelete));
    setShowDeleteModal(false);
    setToDelete(null);
  };

  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${!expandedSections.catalogListing ? "collapsed" : ""}`}
            type="button"
            onClick={() => toggleSection("catalogListing")}
            aria-expanded={expandedSections.catalogListing}
          >
            Catalog Listing
          </button>
        </h2>

        <div
          className={`accordion-collapse collapse ${expandedSections.catalogListing ? "show" : ""}`}
        >
          <div className="accordion-body">
            {/* FORM */}
            <form onSubmit={handleSubmitCatalog}>
              <div className="row g-3 mb-3">
                <div className="col-md-4">
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

                <div className="col-md-2">
                  <label className="form-label">No. of SKU's<span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="skuCount"
                    value={formData.skuCount}
                    onChange={handleChange}
                  />
                  {errors.skuCount && <div className="text-danger small">{errors.skuCount}</div>}
                </div>

                <div className="col-md-2">
                  <label className="form-label">Per SKU Price<span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="perSkuPrice"
                    value={formData.perSkuPrice}
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
                    value={formData.offerPrice}
                    onChange={handleChange}
                  />
                  {errors.offerPrice && <div className="text-danger small">{errors.offerPrice}</div>}
                </div>

                <div className="col-md-2">
                  <label className="form-label">Total Price<span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="totalPrice"
                    value={formData.totalPrice}
                    onChange={handleChange}
                    disabled
                  />
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
                  {errors.billingCycle && <div className="text-danger small">{errors.billingCycle}</div>}
                </div>

                <div className="col-md-2">
                  <label className="form-label">Task Days<span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="taskDays"
                    value={formData.taskDays}
                    onChange={handleChange}
                  />
                  {errors.taskDays && <div className="text-danger small">{errors.taskDays}</div>}
                </div>
              </div>

              <div className="d-flex justify-content-end mb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={() =>
                    setFormData({
                      serviceType: "",
                      skuCount: "",
                      perSkuPrice: "",
                      offerPrice: "",
                      totalPrice: "",
                      billingCycle: "",
                      taskDays: "",
                      id: 0,
                    })
                  }
                >
                  Reset
                </button>
                <button type="button" className="btn btn-success" onClick={handleSubmitCatalog}>
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
                    <th>No. of SKU's</th>
                    <th>Per SKU Price</th>
                    <th>Offer Price</th>
                    <th>Total Price</th>
                    <th>Billing Cycle</th>
                    <th>Task Days</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="9">Loading...</td></tr>
                  ) : error ? (
                    <tr><td colSpan="9" className="text-danger">{error}</td></tr>
                  ) : catalogListing.length > 0 ? (
                    catalogListing.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>{row.serviceTypeName}</td>
                        <td>{row.noOfSkus}</td>
                        <td>{row.perSkuPrice}</td>
                        <td>{row.offerPrice}</td>
                        <td>{row.totalPrice}</td>
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
                    <tr><td colSpan="9">No data available</td></tr>
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

export default CatalogListingSection;
