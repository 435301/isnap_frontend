import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import { fetchBillingCycles } from "../../redux/actions/billingActions";
import { fetchServiceActivities } from "../../redux/actions/serviceActivityActions";
import { createAContentPhotography, deleteAContentPhotography, getAContentPhotographyById, listAContentPhotography } from "../../redux/actions/A+PhotographyAction";
import { getTotalPrice } from "../../redux/actions/productPhotographyAction";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";

const PhotographyAplusAccordion = ({
    expandedSections,
    toggleSection,
    getServiceRow,
    handleServiceRowChange,
    handleRemoveServiceRow,
    resetSection,
    businessId, businessIdEdit
}) => {
    const dispatch = useDispatch();
    const serviceType = useSelector((state) => state.serviceType.serviceTypes || []);
    const billing = useSelector((state) => state.billing.billingCycles || []);
    const { activities } = useSelector((state) => state.serviceActivity);
    const { aContentPhotographyList, loading, error } = useSelector(
        (state) => state.aContentPhotography
    );
    const { totalPriceData } = useSelector((state) => state.productPhotography);
    console.log('aContentPhotographyList', aContentPhotographyList)
    const serviceOptions = activities
        .filter((act) => act.serviceCategoryId === 3 && act.subServiceId === 4)
        .map((act) => ({ value: act.id, label: act.activityName }));
    const [errors, setErrors] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDelete, setIsDelete] = useState(null);


    const [formData, setFormData] = useState({
        id: 0,
        serviceTypeId: "",
        activityId: "",
        quantity: 0,
        actualPrice: 0,
        offerPrice: 0,
        totalPrice: 0,
        billingCycle: "",
        taskDays: 0,
        status: ""
    });


    useEffect(() => {
        dispatch(fetchServiceTypes());
        dispatch(fetchBillingCycles());
        dispatch(fetchServiceActivities());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listAContentPhotography(businessId));
    }, [dispatch]);

    useEffect(() => {
        if (businessIdEdit) {
            // Fetch the existing data for this business ID
            dispatch(getAContentPhotographyById(businessIdEdit));
        } else {
            // Clear Redux state and reset form if no edit
            dispatch({ type: "CLEAR_ACONTENT_PHOTOGRAPHY_LIST" });
            setFormData({
                id: 0,
                serviceTypeId: "",
                activityId: "",
                quantity: 0,
                actualPrice: 0,
                offerPrice: 0,
                totalPrice: 0,
                billingCycle: "",
                taskDays: 0,
            });
        }
    }, [businessIdEdit, dispatch]);

    useEffect(() => {
        dispatch(listAContentPhotography(businessIdEdit || businessId));
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

    useEffect(() => {
        if (formData.quantity && formData.offerPrice) {
            dispatch(getTotalPrice(Number(formData.quantity), Number(formData.offerPrice)));
        }
    }, [formData.quantity, formData.offerPrice, dispatch]);

    useEffect(() => {
        if (totalPriceData) {
            setFormData((prev) => ({
                ...prev,
                totalPrice: totalPriceData.totalPrice,
            }));
        }
    }, [totalPriceData]);

    const resetForm = () => {
        setFormData({
            id: 0,
            serviceTypeId: "",
            serviceActivities: "",
            quantity: 0,
            actualPrice: 0,
            offerPrice: 0,
            totalPrice: 0,
            billingCycle: "",
            taskDays: 0,
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.serviceTypeId) newErrors.serviceTypeId = "Marketplace is required";
        if (!formData.quantity) newErrors.quantity = "Quantity is required";
        if (!formData.serviceActivities) newErrors.serviceActivities = "Service Activity is required";
        if (!formData.actualPrice || formData.actualPrice <= 0)
            newErrors.actualPrice = "Actual Price must be greater than 0";
        // if (!formData.offerPrice)
            // newErrors.offerPrice = "Offer Price is required";
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
            serviceTypeId: Number(formData.serviceTypeId),
            activityId: Number(formData.serviceActivities),
            qty: Number(formData.quantity),
            actualPrice: Number(formData.actualPrice),
            offerPrice: Number(formData.offerPrice),
            totalPrice: Number(formData.totalPrice),
            billCycleId: Number(formData.billingCycle),
            taskCompletionDays: Number(formData.taskDays),
            status: 1,
        };

        dispatch(createAContentPhotography(payload)).then(() => {
            resetForm();
            dispatch({ type: "RESET_TOTAL_PRICE" });
            dispatch(listAContentPhotography(businessIdEdit || businessId));
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
        await dispatch(deleteAContentPhotography(isDelete));
        setShowDeleteModal(false);
        setIsDelete(null);
    };

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
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3 mb-3 align-items-center">
                                <div className="col-md-4">
                                    <label className="form-label">
                                        Marketplace <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        name="serviceTypeId"
                                        value={formData.serviceTypeId}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Marketplace</option>
                                        {serviceType.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.serviceType}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.serviceTypeId && (<div className="text-danger small">{errors.serviceTypeId}</div>)}
                                </div>
                            </div>
                            {/* --- Form Row --- */}
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
                                    <label className="form-label">Quantity<span className='text-danger'> *</span></label>
                                    <input
                                        type="number"
                                        placeholder="567"
                                        className="form-control"
                                        name="quantity"
                                        value={formData?.quantity}
                                        onChange={handleChange}
                                    />
                                    {errors.quantity && <div className="text-danger small">{errors.quantity}</div>}
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
                                    <label className="form-label">Total Price<span className='text-danger'> *</span></label>
                                    <input
                                        type="number"
                                        placeholder="567"
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

                            {/* --- Buttons --- */}
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
                        </form>

                        {/* --- Table --- */}
                        <div className="table-responsive mb-3">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th>S.no</th>
                                        <th>Marketplace</th>
                                        <th>Service Activity</th>
                                        <th>Quantity</th>
                                        <th>Actual Price</th>
                                        <th>Offer Price</th>
                                        <th>Total Price</th>
                                        <th>Billing Cycle</th>
                                        <th>Task Days</th>
                                        <th>Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {aContentPhotographyList?.length > 0 ? (
                                        aContentPhotographyList?.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.serviceTypeName}</td>
                                                <td>{row.activityName}</td>
                                                <td>{row.qty}</td>
                                                <td>{row.actualPrice}</td>
                                                <td>{row.offerPrice}</td>
                                                <td>{row.totalPrice}</td>
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
                                            <td colSpan="9" className="text-center">
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

export default PhotographyAplusAccordion;
