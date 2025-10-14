import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductPhotography, deleteProductPhotography, getProductPhotographyById, getTotalPrice, listProductPhotography } from "../../redux/actions/productPhotographyAction";
import { fetchBillingCycles } from "../../redux/actions/billingActions";
import { fetchServiceActivities } from "../../redux/actions/serviceActivityActions";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";

const ProductPhotographySection = ({
    expandedSections,
    toggleSection,
    businessId,
    businessIdEdit,
}) => {
    const dispatch = useDispatch();
    console.log('businessIdproduct', businessId);
    console.log('editId', businessIdEdit)
    const billing = useSelector((state) => state.billing.billingCycles || []);
    const { activities } = useSelector((state) => state.serviceActivity);
    const { productPhotographyList } = useSelector((state) => state.productPhotography);
    console.log('productPhotographyList', productPhotographyList)
    const [toDelete, setToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const [formData, setFormData] = useState({
        id: 0,
        serviceActivities: "",
        quantity: 0,
        actualPrice: 0,
        offerPrice: 0,
        totalPrice: 0,
        billingCycle: "",
        taskDays: 0,
    });
    const [errors, setErrors] = useState({});
    const serviceOptions = activities.filter((act) => act.serviceCategoryId === 3 && act.subServiceId === 10).map((act) => ({ value: act.id, label: act.activityName, }));
    const { totalPriceData } = useSelector((state) => state.productPhotography);

    useEffect(() => {
        dispatch(fetchServiceActivities());
        dispatch(fetchBillingCycles());
    }, [dispatch]);

    useEffect(() => {
        if (businessId && !businessIdEdit) {
            setFormData({
                id: 0,
                serviceActivities: "",
                quantity: 0,
                actualPrice: 0,
                offerPrice: 0,
                totalPrice: 0,
                billingCycle: "",
                taskDays: 0,
            });
        }
    }, [businessId, businessIdEdit]);


    useEffect(() => {
        if (businessIdEdit) {
            dispatch(getProductPhotographyById(businessIdEdit));
        }
        else {
            dispatch({ type: "CLEAR_PRODUCT_PHOTOGRPAHY_LISTING" });
            setFormData({
                id: 0,
                serviceActivities: "",
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

    useEffect(() => {
        if (businessId) {
            dispatch(listProductPhotography(businessId));
        }
    }, [dispatch, businessId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors((prev) => ({
            ...prev,
            [name]: "",
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

    // Validation function
    const validate = () => {
        const newErrors = {};
        if (!formData.serviceActivities) { newErrors.serviceActivities = "Service Activity is required"; }
        if (!formData.quantity || formData.quantity <= 0) { newErrors.quantity = "Quantity is required"; }
        // if (!formData.offerPrice || formData.offerPrice <= 0) { newErrors.offerPrice = "Offer Price is required"; }
        if (formData.offerPrice && formData.actualPrice && Number(formData.offerPrice) > Number(formData.actualPrice)) { newErrors.offerPrice = "Offer Price should not exceed Actual Price"; }
        if (!formData.billingCycle) { newErrors.billingCycle = "Billing Cycle is required"; }
        if (!formData.taskDays || formData.taskDays <= 0) { newErrors.taskDays = "Task days is required"; }
        return newErrors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        const payload = {
            id: Number(formData.id),
            businessId: businessIdEdit ? businessIdEdit : businessId,
            activityId: Number(formData.serviceActivities),
            qty: Number(formData.quantity),
            actualPrice: Number(formData.actualPrice),
            offerPrice: Number(formData.offerPrice),
            totalPrice: Number(formData.totalPrice),
            billCycleId: Number(formData.billingCycle),
            taskCompletionDays: Number(formData.taskDays),
            status: 1,
        };
        try {
            dispatch(createProductPhotography(payload));
            setFormData({
                id: 0,
                serviceActivities: "",
                quantity: 0,
                actualPrice: 0,
                offerPrice: 0,
                totalPrice: 0,
                billingCycle: "",
                taskDays: 0,
            });
        } catch (err) {
            console.error("API error:", err);
        }
    };

    const handleEdit = (row) => {
        setFormData({
            id: Number(row.id),
            serviceActivities: Number(row.activityId),
            quantity: Number(row.qty),
            actualPrice: Number(row.actualPrice),
            offerPrice: Number(row.offerPrice),
            totalPrice: Number(row.totalPrice),
            billingCycle: Number(row.billCycleId),
            taskDays: Number(row.taskCompletionDays),
        });
        if (!expandedSections.photographyProduct) toggleSection("photographyProduct");
    };

    // Delete row
    const handleDeleteClick = (id) => {
        setToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        await dispatch(deleteProductPhotography(toDelete));
        setShowDeleteModal(false);
        setToDelete(null);
    };

    return (
        <div className="accordion mb-3">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className={`accordion-button ${!expandedSections ? "collapsed" : ""}`}
                        type="button"
                        onClick={() => toggleSection ? toggleSection("photographyProduct") : null}
                        aria-expanded={expandedSections?.photographyProduct}
                    >
                        Product Photography
                    </button>
                </h2>
                <div
                    className={`accordion-collapse collapse ${expandedSections?.photographyProduct ? "show" : ""}`}
                    aria-labelledby="photographyProduct"
                >
                    <div className="accordion-body">
                        {/* Form Row */}
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
                                <label className="form-label">Quantity<span className="text-danger"> *</span></label>
                                <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleChange} />
                                {errors.quantity && <div className="text-danger small">{errors.quantity}</div>}
                            </div>

                            <div className="col-md-2">
                                <label className="form-label">Actual Price<span className='text-danger'> *</span></label>
                                <input
                                    type="number"
                                    placeholder="567"
                                    className="form-control"
                                    name="actualPrice"
                                    value={formData.actualPrice}
                                    onChange={handleChange}
                                    disabled
                                />

                            </div>

                            <div className="col-md-2">
                                <label className="form-label">Offer Price<span className="text-danger"> *</span></label>
                                <input type="number" className="form-control" name="offerPrice" value={formData.offerPrice} onChange={handleChange} />
                                {errors.offerPrice && <div className="text-danger small">{errors.offerPrice}</div>}
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Total Price<span className="text-danger"> *</span></label>
                                <input type="number" className="form-control" name="totalPrice" value={formData.totalPrice} onChange={handleChange} disabled />

                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Billing Cycle<span className="text-danger"> *</span></label>
                                <select className="form-select" name="billingCycle" value={formData.billingCycle} onChange={handleChange}>
                                    <option value="">Select Billing Cycle</option>
                                    {billing.map((cycle) => (
                                        <option key={cycle.id} value={cycle.id}>{cycle.title}</option>
                                    ))}
                                </select>
                                {errors.billingCycle && <div className="text-danger small">{errors.billingCycle}</div>}
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Task Completion Days<span className="text-danger"> *</span></label>
                                <input type="number" className="form-control" name="taskDays" value={formData.taskDays} onChange={handleChange} />
                                {errors.taskDays && <div className="text-danger small">{errors.taskDays}</div>}
                            </div>
                        </div>

                        <div className="col-md-12 d-flex justify-content-end mt-3 mb-3">
                            <button type="button" className="btn btn-outline-secondary px-5 me-2" onClick={() =>
                                setFormData({
                                    id: 0,
                                    serviceActivities: "",
                                    quantity: 0,
                                    actualPrice: 0,
                                    offerPrice: 0,
                                    totalPrice: 0,
                                    billingCycle: "",
                                    taskDays: 0,
                                })
                            }>Reset</button>
                            <button type="submit" onClick={handleSubmit} className="btn btn-success px-5">{formData.id > 0 ? "Update" : "Save"} </button>
                        </div>


                        {/* Table */}
                        <div className="table-responsive mb-3">
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th>S.no</th>
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
                                    {productPhotographyList?.length > 0 ? (
                                        productPhotographyList?.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.activityName}</td>
                                                <td>{row.qty}</td>
                                                <td>{row.actualPrice}</td>
                                                <td>{row.offerPrice}</td>
                                                <td>{row.totalPrice}</td>
                                                <td>{row.billCycleTitle}</td>
                                                <td>{row.taskCompletionDays}</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(row)}>
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
                                            <td colSpan="6" className="text-center">
                                                No data available
                                            </td>
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

export default ProductPhotographySection;
