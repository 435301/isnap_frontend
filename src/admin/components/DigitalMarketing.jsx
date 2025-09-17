import React from 'react';
import Select from 'react-select';

const DigitalMarketing = ({ formData, setFormData, handleChange, handleSubmit }) => {
    // Options for the multi-select dropdown
    const serviceOptions = [
        { value: 'SEO', label: 'SEO' },
        { value: 'Social Media Marketing', label: 'Social Media Marketing' },
        { value: 'Content Marketing', label: 'Content Marketing' },
        { value: 'Email Marketing', label: 'Email Marketing' },
        { value: 'PPC Advertising', label: 'PPC Advertising' },
    ];

    // Handle multi-select change
    const handleMultiSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData({ ...formData, scopeOfServices: selectedValues });
    };

    return (
        <div className="tab-content">
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Scope of Services</label>
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
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Actual Price</label>
                        <input
                            className="form-control"
                            placeholder="345"
                            type="text"
                            name="actualPrice"
                            value={formData.actualPrice || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Offer Price</label>
                        <input
                            className="form-control"
                            placeholder="345"
                            type="text"
                            name="offerPrice"
                            value={formData.offerPrice || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Billing Cycle</label>
                        <select
                            className="form-select"
                            name="billingCycle"
                            value={formData.billingCycle || ''}
                            onChange={handleChange}
                        >
                            <option value="">Select a price</option>
                            <option value="10">$10</option>
                            <option value="20">$20</option>
                            <option value="50">$50</option>
                            <option value="100">$100</option>
                        </select>
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