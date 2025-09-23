import React from "react";

const ModelPhotographySection = ({
    expandedSections,
    toggleSection,
    formData,
    errors,
    setFormData,
    setErrors,
    getServiceRow,
    handleServiceRowChange,
    handleRemoveServiceRow,
    resetSection,
}) => {
    return (
        <div className="accordion mb-3">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className={`accordion-button ${!expandedSections?.modelPhotography ? "collapsed" : ""
                            }`}
                        type="button"
                        onClick={() => toggleSection("modelPhotography")}
                        aria-expanded={expandedSections?.modelPhotography}
                    >
                        Model Photography
                    </button>
                </h2>
                <div
                    className={`accordion-collapse collapse ${expandedSections?.modelPhotography ? "show" : ""
                        }`}
                    aria-labelledby="modelPhotography"
                >
                    <div className="accordion-body">
                        {/* Gender Selection */}
                        <div className="row g-3 mb-3 align-items-center">
                            <div className="col-md-3">
                                <label className="form-label">
                                    Gender <span className="text-danger">*</span>
                                </label>
                                <select
                                    className="form-select"
                                    name="gender"
                                    value={formData?.gender || ""}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, gender: e.target.value }))
                                    }
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors?.gender && (
                                    <div className="text-danger small">{errors?.gender}</div>
                                )}
                            </div>
                        </div>

                        {/* Service Fields */}
                        <div className="row g-3 mb-3 align-items-center">
                            <div className="col-md-4">
                                <label className="form-label">
                                    Service Type <span className="text-danger">*</span>
                                </label>
                                <select
                                    className="form-select"
                                    name="serviceType"
                                    value={getServiceRow(2).serviceType}
                                    onChange={(e) => handleServiceRowChange(2, e)}
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
                                {errors?.[`serviceType${2}`] && (
                                    <div className="text-danger small">
                                        {errors?.[`serviceType${2}`]}
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
                                    value={getServiceRow(2).actualPrice}
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
                                    value={getServiceRow(2).offerPrice}
                                    onChange={(e) => handleServiceRowChange(2, e)}
                                />
                            </div>

                            <div className="col-md-2">
                                <label className="form-label">Billing Cycle</label>
                                <select
                                    className="form-select"
                                    name="billingCycle"
                                    value={getServiceRow(2).billingCycle}
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
                                    value={getServiceRow(2).taskDays}
                                    onChange={(e) => handleServiceRowChange(2, e)}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="col-md-12 d-flex justify-content-end mt-3 mb-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-5 me-2"
                                onClick={() => {
                                    resetSection(2);
                                    setFormData((prev) => ({ ...prev, gender: "" }));
                                    setErrors((prevErrors) => {
                                        const newErrors = { ...prevErrors };
                                        delete newErrors.gender;
                                        return newErrors;
                                    });
                                }}
                            >
                                Reset
                            </button>
                            <button type="submit" className="btn btn-success px-5">
                                Save
                            </button>
                        </div>

                        {/* Table */}
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

export default ModelPhotographySection;
