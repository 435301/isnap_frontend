import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStates } from "../../redux/actions/stateActions";
import BASE_URL from "../../config/config";

const BusinessDetailsEdit = ({ formData, setFormData, errors, handleChange, handleSubmit }) => {
    const dispatch = useDispatch();
    const { states = [] } = useSelector((state) => state.state || {});

    useEffect(() => {
        if (states.length === 0) dispatch(fetchStates());
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
                        value={formData.lead || ""}
                        onChange={handleChange}
                    >
                        <option disabled value="">Select Lead</option>
                        <option value="1">Praveen Saaho</option>
                        <option value="2">Akhi</option>
                    </select>
                    {errors?.lead && <div className="text-danger small">{errors.lead}</div>}
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
                    {errors?.businessName && <div className="text-danger small">{errors.businessName}</div>}
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
                        value={formData?.sellerName || ""}
                        onChange={handleChange}
                    />
                    {errors?.sellerName && <div className="text-danger small">{errors.sellerName}</div>}
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
                        value={formData?.regdMobileNumber || ""}
                        onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.startsWith("0")) value = value.slice(1);
                            if (value.length > 10) value = value.slice(0, 10);
                            setFormData((prev) => ({ ...prev, regdMobileNumber: value }));
                        }}
                    />
                    {errors?.regdMobileNumber && <div className="text-danger small">{errors.regdMobileNumber}</div>}
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
                        value={formData?.emailId || ""}
                        onChange={handleChange}
                    />
                    {errors?.emailId && <div className="text-danger small">{errors.emailId}</div>}
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
                        value={formData?.spocName || ""}
                        onChange={handleChange}
                    />
                    {errors?.spocName && <div className="text-danger small">{errors.spocName}</div>}
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
                        value={formData?.spocMobileNumber || ""}
                        onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.startsWith("0")) value = value.slice(1);
                            if (value.length > 10) value = value.slice(0, 10);
                            setFormData((prev) => ({ ...prev, spocMobileNumber: value }));
                        }}
                    />
                    {errors?.spocMobileNumber && <div className="text-danger small">{errors.spocMobileNumber}</div>}
                </div>

                {/* State */}
                <div className="col-md-4 mb-3">
                    <label className="form-label">
                        State <span className="text-danger">*</span>
                    </label>
                    <select
                        className="form-select"
                        name="state"
                        value={formData?.state || ""}
                        onChange={handleChange}
                    >
                        <option disabled value="">Select State</option>
                        {states.map((st) => (
                            <option key={st.id} value={st.id}>{st.stateName}</option>
                        ))}
                    </select>
                    {errors?.state && <div className="text-danger small">{errors.state}</div>}
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
                        value={formData?.city || ""}
                        onChange={handleChange}
                    />
                    {errors?.city && <div className="text-danger small">{errors.city}</div>}
                </div>

                {/* GST Number */}
                <div className="col-md-4 mb-3">
                    <label className="form-label">GST Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="gstNumber"
                        placeholder="Enter GST Number (optional)"
                        value={formData?.gstNumber || ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Referred By */}
                <div className="col-md-4 mb-3">
                    <label className="form-label">Referred By</label>
                    <input
                        type="text"
                        className="form-control"
                        name="referredBy"
                        placeholder="Enter Referrer Name (optional)"
                        value={formData?.referredBy || ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Address */} 
                <div className="col-md-4 mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Enter Address (optional)"
                        value={formData?.address || ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Business Logo */}
                <div className="col-md-4 mb-3">
                    <label className="form-label">Business Logo</label>
                    {/* Existing logo preview */}
                    {formData.businessLogoPreview && (
                        <div className="mb-2">
                            <img
                                src={
                                    // If it's a blob URL (newly selected file), use it directly
                                    formData.businessLogoPreview.startsWith("blob:")
                                        ? formData.businessLogoPreview
                                        // Otherwise, it's an existing server image, build proper URL
                                        : `${BASE_URL.replace(/\/$/, "")}/${formData.businessLogoPreview.replace(/^\/|^undefined\//, "")}`
                                }
                                alt="Business Logo"
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                            />
                        </div>
                    )}

                    <input
                        type="file"
                        clasName="form-control"
                        name="businessLogo"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setFormData((prev) => ({
                                    ...prev,
                                    businessLogo: file,
                                    businessLogoPreview: URL.createObjectURL(file), // preview new file
                                }));
                            }
                        }}
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
                        value={formData?.status || ""}
                        onChange={handleChange}
                    >
                        <option disabled value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                    {errors?.status && <div className="text-danger small">{errors.status}</div>}
                </div>

                {/* Buttons */}
                <div className="col-md-12 d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-success px-5">Next</button>
                </div>
            </form>
        </div>
    );
};

export default BusinessDetailsEdit;
