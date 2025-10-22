import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceActivities } from "../../redux/actions/serviceActivityActions";
import { fetchBillingCycles } from "../../redux/actions/billingActions";
import { createModelPhotography, deleteModelPhotography, getModelPhotographyById, listModelPhotography } from "../../redux/actions/modelPhotographyAction";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";
import { fetchModelActivities } from "../../redux/actions/photographyFilterAction";

const ModelPhotographySection = ({
    expandedSections,
    toggleSection,
    businessId, businessIdEdit
}) => {
    const dispatch = useDispatch();
    const billing = useSelector((state) => state.billing.billingCycles || []);
    const { activities } = useSelector((state) => state.serviceActivity);
    const { modelActivities } = useSelector((state) => state.modelActivities);
    console.log('modelActivities', modelActivities)
    const { modelPhotographyList } = useSelector(
        (state) => state.modelPhotography
    );

    const [formData, setFormData] = useState({
        id: 0,
        gender: "",
        serviceActivities: "",
        quantity: 0,
        actualPrice: 0,
        offerPrice: 0,
        totalPrice: 0,
        billingCycle: "",
        taskDays: 0,
    });

    const [errors, setErrors] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDelete, setIsDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchServiceActivities());
        dispatch(fetchBillingCycles());
        dispatch(fetchModelActivities());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listModelPhotography(businessId));
    }, [dispatch]);

    useEffect(() => {
        if (businessIdEdit) {
            // Fetch the existing data for this business ID
            dispatch(getModelPhotographyById(businessIdEdit));
        } else {
            // Clear Redux state and reset form if no edit
            dispatch({ type: "CLEAR_MODEL_PHOTOGRAPHY" });
            setFormData({
                gender: "",
                serviceActivities: "",
                quantity: 0,
                actualPrice: 0,
                offerPrice: 0,
                totalPrice: 0,
                billingCycle: "",
                taskDays: 0,
                id: 0,
            });
        }
    }, [businessIdEdit, dispatch]);

    useEffect(() => {
        dispatch(listModelPhotography(businessIdEdit || businessId));
    }, [dispatch, businessIdEdit, businessId]);


    // const serviceOptions = lifestyleActivities
    //     .filter((act) => act.serviceCategoryId === 3 && act.subServiceId === 6)
    //     .map((act) => ({ value: act.id, label: act.activityName }));

    const serviceOptions = modelActivities.filter((act) => act.serviceCategoryId === 3 && act.subServiceId === 3).map((act) => ({
        value: act.id,
        label: act.activityName,
        malePrice: act.malePrice,
        femalePrice: act.femalePrice,
    }));

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
        if (name === "serviceActivities") {
            const selectedActivity = modelActivities.find(
                (act) => act.id === parseInt(value)
            );

            const gender = formData.gender?.toLowerCase();
            let activityPrice = 0;

            if (gender === "male") activityPrice = selectedActivity?.malePrice || 0;
            else if (gender === "female")
                activityPrice = selectedActivity?.femalePrice || 0;
            else activityPrice = selectedActivity?.price || 0;

            setFormData({
                ...formData,
                serviceActivities: value,
                actualPrice: activityPrice,
                offerPrice: activityPrice,
            });
        } else if (name === "gender") {
            const selectedActivity = activities.find(
                (act) => act.id === parseInt(formData.serviceActivities)
            );

            let activityPrice = formData.actualPrice;
            if (selectedActivity) {
                if (value.toLowerCase() === "male")
                    activityPrice = selectedActivity.malePrice;
                else if (value.toLowerCase() === "female")
                    activityPrice = selectedActivity.femalePrice;
                else activityPrice = selectedActivity.price;
            }

            setFormData({
                ...formData,
                gender: value,
                actualPrice: activityPrice,
                offerPrice: activityPrice,
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            id: 0,
            gender: "",
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

        if (!formData.gender) newErrors.gender = "Gender is required";
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

    // Submit form (create/update)
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        const payload = {
            id: Number(formData.id),
            businessId: businessIdEdit ? businessIdEdit : businessId,
            gender: formData.gender === "Male" ? 1 : formData.gender === "Female" ? 2 : 0,
            activityId: Number(formData.serviceActivities),
            qty: Number(formData.quantity),
            actualPrice: Number(formData.actualPrice),
            offerPrice: Number(formData.offerPrice),
            totalPrice: Number(formData.totalPrice),
            billCycleId: Number(formData.billingCycle),
            taskCompletionDays: Number(formData.taskDays),
            status: 1,
        };
        dispatch(createModelPhotography(payload))
            .then((res) => {
                resetForm();
            })
            .catch((err) => console.error(err));
    };

    // Edit row
    const handleEdit = (row) => {
        setFormData({
            id: row.id,
            gender: row.gender === 1 ? "Male" : row.gender === 2 ? "Female" : "",
            serviceActivities: String(row.activityId),
            quantity: row.qty || 0,
            actualPrice: row.actualPrice || 0,
            offerPrice: row.offerPrice || 0,
            totalPrice: row.totalPrice || 0,
            billingCycle: String(row.billCycleId),
            taskDays: row.taskCompletionDays || 0,
        });
    };

    const handleDeleteClick = (id) => {
        setIsDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        await dispatch(deleteModelPhotography(isDelete));
        setShowDeleteModal(false);
        setIsDelete(null);

    };

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
                        <form onSubmit={handleSubmit}>
                            {/* Gender */}
                            <div className="row g-3 mb-3 align-items-center">
                                <div className="col-md-3">
                                    <label className="form-label">
                                        Gender <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.gender && <div className="text-danger small">{errors.gender}</div>}
                                </div>
                            </div>

                            {/* Service Fields */}
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
                                    <label className="form-label">Actual Price<span className="text-danger">*</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="actualPrice"
                                        value={formData.actualPrice}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                actualPrice: e.target.value,
                                            })
                                        }
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
                                    {/* {errors.offerPrice && <div className="text-danger small">{errors.offerPrice}</div>} */}
                                </div>

                                <div className="col-md-2">
                                    <label className="form-label">
                                        Billing Cycle<span className="text-danger"> *</span>
                                    </label>
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
                                    <label className="form-label">Task Completion Days<span className="text-danger">*</span></label>
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

                            {/* Buttons */}
                            <div className="col-md-12 d-flex justify-content-end mt-3 mb-3">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary px-5 me-2"
                                    onClick={resetForm}
                                >
                                    Reset
                                </button>
                                <button type="button" onClick={handleSubmit} className="btn btn-success px-5">
                                    Save
                                </button>
                            </div>
                        </form>

                        {/* Table */}
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
                                    {modelPhotographyList.length > 0 ? (
                                        modelPhotographyList.map((row, index) => (
                                            <tr key={row.id}>
                                                <td>{index + 1}</td>
                                                <td>{row.activityName}</td>
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


export default ModelPhotographySection;
