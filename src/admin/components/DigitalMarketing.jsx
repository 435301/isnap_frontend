import React, { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchServiceActivities } from '../../redux/actions/serviceActivityActions';
import { createDigitalMarketing, fetchDigitalMarketingByBusinessId, resetDigitalMarketing } from '../../redux/actions/digitalMarketingAction';
import { fetchBillingCycles } from '../../redux/actions/billingActions';
import { fetchDigitalMarketById } from '../../redux/actions/digitalMarketActions';

const DigitalMarketing = ({ businessId, setActiveTab, businessIdEdit }) => {
    const dispatch = useDispatch();

    const { activities } = useSelector((state) => state.serviceActivity);
    const billing = useSelector((state) => state.billing.billingCycles || []);
    const { markets } = useSelector((state) => state.digitalMarket || {});
    const { digitalMarketing } = useSelector((state) => state.digitalMarketing);
    console.log(businessId, "businessId");
    console.log(businessIdEdit, "businessIdEdit");

    const [formData, setFormData] = useState({
        id: 0,
        businessId: "",
        scopeOfServices: [],
        actualPrice: "",
        offerPrice: "",
        billingCycle: "",
        status: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchServiceActivities());
        dispatch(fetchBillingCycles());
        dispatch(fetchDigitalMarketById(1));
    }, [dispatch]);

    useEffect(() => {
        if (businessIdEdit) {
            dispatch(fetchDigitalMarketingByBusinessId(businessIdEdit));
        } else {
            dispatch(resetDigitalMarketing());
        }
    }, [businessId, dispatch]);

    useEffect(() => {
        if (markets && markets.length > 0 && !formData.actualPrice) {
            setFormData((prev) => ({
                ...prev,
                id: markets[0].id || 0,
                actualPrice: markets[0].price || '',
                offerPrice: markets[0].price || '',
            }));
        }
    }, [markets, formData.actualPrice, setFormData]);

    useEffect(() => {
        if (digitalMarketing && digitalMarketing.id) {
            setFormData({
                id: digitalMarketing.id,
                businessId: digitalMarketing.businessId,
                scopeOfServices: digitalMarketing.digitalMarketingServiceIds || [],
                actualPrice: digitalMarketing.actualPrice,
                offerPrice: digitalMarketing.offerPrice,
                billingCycle: digitalMarketing.billCycleId,
                status: digitalMarketing.status,
            });
        } else {
            setFormData({
                id: 0,
                businessId: "",
                scopeOfServices: [],
                actualPrice: "",
                offerPrice: "",
                billingCycle: "",
                status: "",
            });
        }
    }, [digitalMarketing]);

    const serviceOptions = activities
        .filter((act) => act.serviceCategoryId === 2)
        .map((act) => ({
            value: act.id,
            label: act.activityName,
        }));

    const handleMultiSelectChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setErrors((prev) => ({
            ...prev,
            scopeOfServices: "",
        }));
        setFormData({ ...formData, scopeOfServices: selectedIds });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const validate = () => {
        const newErrors = {};
        if (!formData.scopeOfServices || formData.scopeOfServices.length === 0) { newErrors.scopeOfServices = "Digital Marketing ServiceIds are required"; }
        if (!formData.offerPrice) newErrors.offerPrice = "Offer Price is required";
        if (formData.offerPrice && formData.actualPrice && Number(formData.offerPrice) > Number(formData.actualPrice)) newErrors.offerPrice = "Offer Price should be than Actual Price";
        if (!formData.billingCycle) newErrors.billingCycle = "Billing Cycle is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const payload = {
            id: formData.id || 0,
            businessId: businessIdEdit ? businessIdEdit : businessId,
            digitalMarketingServiceIds: formData.scopeOfServices || [],
            actualPrice: Number(formData.actualPrice || 0),
            offerPrice: Number(formData.offerPrice || 0),
            billCycleId: Number(formData.billingCycle || 0),
            status: 1,
        };

        try {
            const res = await dispatch(createDigitalMarketing(payload));
            setFormData({
                id: 0,
                businessId: "",
                scopeOfServices: [],
                actualPrice: "",
                offerPrice: "",
                billingCycle: "",
            });
            // }
            setActiveTab("Photography");
        } catch (err) {
            console.error("Failed to create digital marketing:", err);
        }
    };

    return (
        <div className="tab-content">
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Scope of Services<span className='text-danger'> *</span></label>
                        <Select
                            isMulti
                            name="scopeOfServices"
                            options={serviceOptions}
                            value={serviceOptions.filter(option =>
                                formData.scopeOfServices?.includes(option.value)
                            )}
                            onChange={handleMultiSelectChange}
                            placeholder="Search and select services..."
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                        {errors.scopeOfServices && (<div className="text-danger small">{errors.scopeOfServices}</div>)}
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Actual Price<span className='text-danger'> *</span></label>
                        <input
                            className="form-control"
                            placeholder="345"
                            type="text"
                            name="actualPrice"
                            value={formData.actualPrice || ''}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Offer Price<span className='text-danger'> *</span></label>
                        <input
                            className="form-control"
                            placeholder="345"
                            type="text"
                            name="offerPrice"
                            value={formData.offerPrice || ''}
                            onChange={handleChange}
                        />
                        {errors.offerPrice && (<div className="text-danger small">{errors.offerPrice}</div>)}
                    </div>
                    <div className="col-md-4">
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
                </div>
                <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                    <button type="submit" className="btn btn-success px-5 me-2">Submit</button>
                    <button type="button" className="btn btn-outline-secondary px-4">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default DigitalMarketing;