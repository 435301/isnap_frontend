import React from "react";

const PhotographyAplusAccordion = ({
    expandedSections,
    toggleSection,
    formData,
    setFormData,
    errors,
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
                        className={`accordion-button ${!expandedSections?.photographyAplus ? "collapsed" : ""
                            }`}
                        type="button"
                        onClick={() => toggleSection("photographyAplus")}
                        aria-expanded={expandedSections?.photographyAplus}
                    >
                        A+ Content Photography
                    </button>
                </h2>
                <div
                    className={`accordion-collapse collapse ${expandedSections?.photographyAplus ? "show" : ""
                        }`}
                    aria-labelledby="photographyAplus"
                >
                    <div className="accordion-body">
                        <div className="row g-3 mb-3 align-items-center">
                            <div className="col-md-3">
                                <label className="form-label">
                                    MarketPlace <span className="text-danger">*</span>
                                </label>
                                <select
                                    className="form-select"
                                    name="marketPlace"
                                    value={formData?.marketPlace || ""}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, marketPlace: e.target.value }))
                                    }
                                >
                                    <option value="">Select MarketPlace</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors?.gender && (
                                    <div className="text-danger small">{errors?.gender}</div>
                                )}
                            </div>
                        </div>
                        {/* --- Form Row --- */}
                        <div className="row g-3 mb-3 align-items-center">
                            <div className="col-md-4">
                                <label className="form-label">
                                    Service Type <span className="text-danger">*</span>
                                </label>
                                <select
                                    className="form-select"
                                    name="serviceType"
                                    value={getServiceRow(3).serviceType}
                                    onChange={(e) => handleServiceRowChange(3, e)}
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
                                {errors?.[`serviceType${3}`] && (
                                    <div className="text-danger small">
                                        {errors?.[`serviceType${3}`]}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    placeholder="567"
                                    className="form-control"
                                    name="quantity"
                                    value={getServiceRow(0).quantity}
                                    onChange={(e) => handleServiceRowChange(0, e)}
                                />
                            </div>

                            <div className="col-md-2">
                                <label className="form-label">Actual Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="567"
                                    name="actualPrice"
                                    value={getServiceRow(3).actualPrice}
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
                                    value={getServiceRow(3).offerPrice}
                                    onChange={(e) => handleServiceRowChange(3, e)}
                                />
                            </div>

                            <div className="col-md-2">
                                <label className="form-label">Total Price</label>
                                <input
                                    type="number"
                                    placeholder="567"
                                    className="form-control"
                                    name="totalPrice"
                                    value={getServiceRow(0).totalPrice}
                                    onChange={(e) => handleServiceRowChange(0, e)}
                                />
                            </div>

                            <div className="col-md-2">
                                <label className="form-label">Billing Cycle</label>
                                <select
                                    className="form-select"
                                    name="billingCycle"
                                    value={getServiceRow(3).billingCycle}
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
                                    value={getServiceRow(3).taskDays}
                                    onChange={(e) => handleServiceRowChange(3, e)}
                                />
                            </div>
                        </div>

                        {/* --- Buttons --- */}
                        <div className="col-md-12 d-flex justify-content-end mt-3 mb-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-5 me-2"
                                onClick={() => resetSection(3)}
                            >
                                Reset
                            </button>
                            <button type="submit" className="btn btn-success px-5">
                                Save
                            </button>
                        </div>

                        {/* --- Table --- */}
                        <div className="table-responsive mb-3">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th>S.no</th>
                                        <th>Service Type</th>
                                        <th>Quantity</th>
                                        <th>Actual Price</th>
                                        <th>Offer Price</th>
                                        <th>Total Price</th>
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
                                                <td>{row.quantity}</td>
                                                <td>{row.actualPrice}</td>
                                                <td>{row.offerPrice}</td>
                                                <td>{row.totalPrice}</td>
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

export default PhotographyAplusAccordion;
