import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStates } from "../../redux/actions/stateActions";
import { useNavigate } from "react-router-dom";
import { fetchLeads } from "../../redux/actions/leadAction";

const BusinessDetails = ({ formData, setFormData, errors, handleChange, handleSubmit,handleMobileChange,handleSpocMobileChange }) => {
  const dispatch = useDispatch();
  const { states = [] } = useSelector((state) => state.state || {});
      const {leads} = useSelector((state)=> state.leads);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (states.length === 0) dispatch(fetchStates());
      dispatch(fetchLeads());
  }, [dispatch, states.length]);

  return (
    <div className="tab-content">
      <form className="row" onSubmit={handleSubmit}>
        {/* Lead */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            Lead
          </label>
          <select
            className="form-select"
            name="lead"
            value={formData.lead}
            onChange={handleChange}
          >
            <option disabled value="">Select Lead</option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>{lead.customerName}</option>
            ))}
          </select>

        </div>

        {/* Business Name */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            Business Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="businessName"
            placeholder="Enter Business Name"
            value={formData?.businessName || ""}
            onChange={handleChange}
          />
          {errors.businessName && <div className="text-danger small">{errors.businessName}</div>}
        </div>

        {/* Seller Name */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            Seller Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="sellerName"
            placeholder="Enter Seller Name"
            value={formData.sellerName}
            onChange={handleChange}
          />
          {errors.sellerName && <div className="text-danger small">{errors.sellerName}</div>}
        </div>

        {/* Regd Mobile */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            Regd Mobile <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            className="form-control"
            name="regdMobileNumber"
            placeholder="Enter Registered Mobile"
            value={formData.regdMobileNumber}
            onChange={handleMobileChange}
          />
          {errors.regdMobileNumber && <div className="text-danger small">{errors.regdMobileNumber}</div>}
        </div>

        {/* Regd Email */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            Regd Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            name="emailId"
            placeholder="Enter Registered Email"
            value={formData.emailId}
            onChange={handleChange}
          />
          {errors.emailId && <div className="text-danger small">{errors.emailId}</div>}
        </div>

        {/* SPOC Name */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            SPOC Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="spocName"
            placeholder="Enter SPOC Name"
            value={formData.spocName}
            onChange={handleChange}
          />
          {errors.spocName && <div className="text-danger small">{errors.spocName}</div>}
        </div>

        {/* SPOC Mobile */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            SPOC Mobile <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            className="form-control"
            name="spocMobileNumber"
            placeholder="Enter SPOC Mobile"
            value={formData.spocMobileNumber}
            onChange={handleSpocMobileChange}
          />
          {errors.spocMobileNumber && <div className="text-danger small">{errors.spocMobileNumber}</div>}
        </div>

        {/* State */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            State <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option disabled value="">Select State</option>
            {states.map((st) => (
              <option key={st.id} value={st.id}>{st.stateName}</option>
            ))}
          </select>
          {errors.state && <div className="text-danger small">{errors.state}</div>}
        </div>

        {/* City */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            City <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="city"
            placeholder="Enter City"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <div className="text-danger small">{errors.city}</div>}
        </div>

        {/* GST Number */}
        <div className="col-md-4 mb-3">
          <label className="form-label">GST Number<span className="text-danger"> *</span></label>
          <input
            type="text"
            className="form-control"
            name="gstNumber"
            placeholder="Enter GST Number"
            value={formData.gstNumber}
            onChange={handleChange}
          />
           {errors.gstNumber && <div className="text-danger small">{errors.gstNumber}</div>}
        </div>
        {/* Referred By */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            Referred By
          </label>
          <input
            type="text"
            className="form-control"
            name="referredBy"
            placeholder="Enter Referrer Name (optional)"
            value={formData.referredBy || ""}
            onChange={handleChange}
          />
          {errors.referredBy && <div className="text-danger small">{errors.referredBy}</div>}
        </div>

        {/* Address */}
        <div className="col-md-4 mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Enter Address (optional)"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Business Logo */}
        <div className="col-md-4 mb-3">
          <label className="form-label">Business Logo</label>
          <input
            type="file"
            className="form-control"
            name="businessLogo"
            onChange={handleChange}   // ✅ Add this
          />
        </div>


        {/* Status */}
        <div className="col-md-4 mb-3">
          <label className="form-label">
            Status <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option disabled value="">Select Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          {errors.status && <div className="text-danger small">{errors.status}</div>}
        </div>

        {/* Buttons */}
        <div className="col-md-12 d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-outline-secondary px-4 me-2"
            onClick={() => navigate("/manage-sellers")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success px-5">Next</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDetails;
