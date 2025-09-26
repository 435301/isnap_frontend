import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import { fetchBillingCycles } from "../../redux/actions/billingActions";
import { fetchServiceActivities } from "../../redux/actions/serviceActivityActions";
import { createSocialMediaContentPhotography, deleteSocialMediaContentPhotography, fetchSocialMediaContentPhotographyById, fetchSocialMediaContentPhotography, resetSocialMediaContentPhotography } from "../../redux/actions/socialMediaPhotographyAction";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";


const PhotographySocialSection = ({
    expandedSections,
    toggleSection,
    getServiceRow,
    handleServiceRowChange,
    handleRemoveServiceRow,
    resetSection,
    businessId,
    businessIdEdit
}) => {

    const dispatch = useDispatch();
    const billing = useSelector((state) => state.billing.billingCycles || []);
    const { activities } = useSelector((state) => state.serviceActivity);
    const { socialMediaPhotographyList, loading, error } = useSelector(
        (state) => state.socialMediaPhotography
    );
    console.log('socialMediaPhotographyList', socialMediaPhotographyList)
    const serviceOptions = activities
        .filter((act) => act.serviceCategoryId === 3 && act.subServiceId === 9)  //soacial media content subservice id = 9 , serviceCategory = 3
        .map((act) => ({ value: act.id, label: act.activityName }));
    const [errors, setErrors] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDelete, setIsDelete] = useState(null);

    const [formData, setFormData] = useState({
        id: 0,
        serviceTypeId: "",
        activityId: "",
        actualPrice: 0,
        offerPrice: 0,
        billingCycle: "",
        taskDays: 0,
        status: ""
    });


    useEffect(() => {
        dispatch(fetchBillingCycles());
        dispatch(fetchServiceActivities());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSocialMediaContentPhotography(businessId));
    }, [dispatch]);

    useEffect(() => {
        if (businessIdEdit) {
            // Fetch the existing data for this business ID
            dispatch(fetchSocialMediaContentPhotographyById(businessIdEdit));
        } else {
            // Clear Redux state and reset form if no edit
            dispatch(resetSocialMediaContentPhotography());
            setFormData({
                id: 0,
                serviceTypeId: "",
                activityId: "",
                actualPrice: 0,
                offerPrice: 0,
                billingCycle: "",
                taskDays: 0,
            });
        }
    }, [businessIdEdit, dispatch]);

    useEffect(() => {
        dispatch(fetchSocialMediaContentPhotography(businessIdEdit || businessId));
    }, [dispatch, businessIdEdit, businessId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors((prev) => ({
            ...prev,
            [name]: "",
            actualPrice: "",
            offerPrice: "",
            totalPriceData: ""
        }));
        if (name === "serviceActivities") {
            const selectedActivity = activities.find((act) => act.id === parseInt(value));
            setFormData({
                ...formData,
                serviceActivities: value,
                actualPrice: selectedActivity ? selectedActivity.price : 0,
                offerPrice: selectedActivity ? selectedActivity.price : 0
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const resetForm = () => {
        setFormData({
            id: 0,
            serviceActivities: "",
            actualPrice: 0,
            offerPrice: 0,
            billingCycle: "",
            taskDays: 0,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.serviceActivities) newErrors.serviceActivities = "Service Activity is required";
        // if (!formData.offerPrice)
        //     newErrors.offerPrice = "Offer Price is required";
        if (formData.offerPrice && formData.actualPrice && Number(formData.offerPrice) > Number(formData.actualPrice)) { newErrors.offerPrice = "Offer Price should not exceed Actual Price"; }
        if (!formData.billingCycle) newErrors.billingCycle = "Billing Cycle is required";
        if (!formData.taskDays || formData.taskDays <= 0)
            newErrors.taskDays = "Task days is required";
        return newErrors;
    };

    // --- Submit Form ---
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        const payload = {
            id: formData.id || 0, // id=0 → create, id>0 → update
            businessId: businessIdEdit || businessId,
            activityId: Number(formData.serviceActivities),
            actualPrice: Number(formData.actualPrice),
            offerPrice: Number(formData.offerPrice),
            billCycleId: Number(formData.billingCycle),
            taskCompletionDays: Number(formData.taskDays),
            status: 1,
        };

        dispatch(createSocialMediaContentPhotography(payload)).then(() => {
            resetForm();
            dispatch(fetchSocialMediaContentPhotography(businessIdEdit || businessId));
        });
    };

    // --- Edit Row ---
    const handleEdit = (row) => {
        setFormData({
            id: row.id, // important for update
            serviceTypeId: row.serviceTypeId,
            serviceActivities: row.activityId,
            quantity: row.qty,
            actualPrice: row.actualPrice,
            offerPrice: row.offerPrice,
            totalPrice: row.totalPrice,
            billingCycle: row.billCycleId,
            taskDays: row.taskCompletionDays,
            serviceRows: formData.serviceRows || [], // keep rows intact
        });
    };

    const handleDeleteClick = (id) => {
        setIsDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        await dispatch(deleteSocialMediaContentPhotography(isDelete));
        setShowDeleteModal(false);
        setIsDelete(null);
    };


    return (
        <div className="accordion mb-3">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className={`accordion-button ${!expandedSections?.photographySocial ? "collapsed" : ""
                            }`}
                        type="button"
                        onClick={() => toggleSection("photographySocial")}
                        aria-expanded={expandedSections?.photographySocial}
                    >
                        Social Media Ready Content
                    </button>
                </h2>

                <div
                    className={`accordion-collapse collapse ${expandedSections?.photographySocial ? "show" : ""
                        }`}
                    aria-labelledby="photographySocial"
                >
                    <div className="accordion-body">
                        {/* Form Fields */}
                        <div className="row g-3 mb-3 align-items-center">
                            <div className="col-md-4">
                                <label className="form-label">
                                    Service Activities <span className="text-danger">*</span>
                                </label>
                                <select
                                    className="form-select"
                                    name="serviceActivities"
                                    value={formData.serviceActivities}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Service Activity</option>
                                    {serviceOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.serviceActivities && <div className="text-danger small">{errors.serviceActivities}</div>}
                            </div>

                            <div className="col-md-2">
                                <label className="form-label">Actual Price<span className='text-danger'> *</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="567"
                                    name="actualPrice"
                                    value={formData?.actualPrice}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>

                            <div className="col-md-2">
                                <label className="form-label">Offer Price<span className='text-danger'> *</span></label>
                                <input
                                    type="number"
                                    placeholder="467"
                                    className="form-control"
                                    name="offerPrice"
                                    value={formData.offerPrice}
                                    onChange={handleChange}
                                />
                                {errors.offerPrice && <div className="text-danger small">{errors.offerPrice}</div>}
                            </div>

                            <div className="col-md-2">
                                <label className="form-label">Billing Cycle<span className='text-danger'> *</span></label>
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
                                {errors.billingCycle && (<div className="text-danger small">{errors.billingCycle}</div>)}
                            </div>

                            <div className="col-md-2">
                                <label className="form-label">Task Completion Days<span className='text-danger'> *</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="No. of days"
                                    name="taskDays"
                                    value={formData?.taskDays}
                                    onChange={handleChange}
                                />
                                {errors.taskDays && <div className="text-danger small">{errors.taskDays}</div>}
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="col-md-12 d-flex justify-content-end mt-3 mb-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-5 me-2"
                                onClick={resetForm}
                            >
                                Reset
                            </button>
                            <button type="submit" onClick={handleSubmit} className="btn btn-success px-5">
                                Save
                            </button>
                        </div>

                        {/* Service Table */}
                        <div className="table-responsive mb-3">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th>S.no</th>
                                        <th>Service Activity</th>
                                        <th>Actual Price</th>
                                        <th>Offer Price</th>
                                        <th>Billing Cycle</th>
                                        <th>Task Days</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {socialMediaPhotographyList?.length > 0 ? (
                                        socialMediaPhotographyList?.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.activityName}</td>
                                                <td>{row.actualPrice}</td>
                                                <td>{row.offerPrice}</td>
                                                <td>{row.billCycleTitle}</td>
                                                <td>{row.taskCompletionDays}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary me-2" type="button" onClick={() => handleEdit(row)}>
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDeleteClick(row?.id)}
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
                        <DeleteConfirmationModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} handleConfirm={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotographySocialSection;
