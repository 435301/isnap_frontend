import React from 'react';
import BusinessLaunchSection from './BusinessLaunchSection';
import CatalogListingSection from './CatalogListingSection';
import KeyAccountManagementSection from './KeyAccountManagementSection';

const MarketplaceBusiness = ({
  formData,
  setFormData,
  errors,
  handleServiceRowChange,
  handleCatalogRowChange,
  handleKeyAccountRowChange,
  handleRemoveServiceRow,
  handleRemoveCatalogRow,
  handleRemoveKeyAccountRow,
  handleSubmit,
  expandedSections,
  toggleSection,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <BusinessLaunchSection
        formData={formData}
        errors={errors}
        handleServiceRowChange={handleServiceRowChange}
        handleRemoveServiceRow={handleRemoveServiceRow}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />
      <CatalogListingSection
        formData={formData}
        errors={errors}
        handleCatalogRowChange={handleCatalogRowChange}
        handleRemoveCatalogRow={handleRemoveCatalogRow}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />
      <KeyAccountManagementSection
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        handleKeyAccountRowChange={handleKeyAccountRowChange}
        handleRemoveKeyAccountRow={handleRemoveKeyAccountRow}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />
      <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
        <button type="button" className="btn btn-outline-secondary px-5 me-2">Cancel</button>
        <button type="submit" className="btn btn-success px-5">Save</button>
      </div>
    </form>
  );
};

export default MarketplaceBusiness;