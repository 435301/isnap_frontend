import React, { useState } from "react";
import ProductPhotographySection from "./productPhotographySection";
import LifestylePhotographySection from "./LifeStylePhotographySection";
import ModelPhotographySection from "./ModalPhotoGraphySection";
import PhotographyAplusAccordion from "./ContentPhotographySection";
import PhotographyStoreSection from "./storeSection";
import PhotographySocialSection from "./socialMediaContentSection";

const Photography = ({
  formData,  setFormData, errors,  setErrors,   expandedSections,toggleSection,handleServiceRowChange,  handleRemoveServiceRow,  handleSubmit,businessId,businessIdEdit
}) => {

  const getServiceRow = (index) => {
    return (
      formData.serviceRows[index] || {
        serviceType: "",
        actualPrice: "",
        offerPrice: "",
        billingCycle: "",
        taskDays: "",
      }
    );
  };

  const resetSection = (index) => {
    const updatedRows = [...formData.serviceRows];
    while (updatedRows.length <= index) {
      updatedRows.push({ serviceType: "", actualPrice: "", offerPrice: "", billingCycle: "", taskDays: "" });
    }
    updatedRows[index] = { serviceType: "", actualPrice: "", offerPrice: "", billingCycle: "", taskDays: "" };
    setFormData((prev) => ({ ...prev, serviceRows: updatedRows }));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`serviceType${index}`];
      return newErrors;
    });
  };

  return (
    <div className="tab-content">
      <form onSubmit={handleSubmit}>

        {/* Product Photography Section */}
        <ProductPhotographySection
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          formData={formData}
          errors={errors}
          getServiceRow={getServiceRow}
          handleServiceRowChange={handleServiceRowChange}
          handleRemoveServiceRow={handleRemoveServiceRow}
          resetSection={resetSection}
          businessId={businessId}
          businessIdEdit={businessIdEdit}
        />


        {/* Lifestyle & Creative Photography Section */}
        <LifestylePhotographySection
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          formData={formData}
          errors={errors}
          getServiceRow={getServiceRow}
          handleServiceRowChange={handleServiceRowChange}
          handleRemoveServiceRow={handleRemoveServiceRow}
          resetSection={resetSection}
          businessId={businessId}
          businessIdEdit={businessIdEdit}

        />
        {/* Model Photography Section */}
        <ModelPhotographySection
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          formData={formData}
          errors={errors}
          getServiceRow={getServiceRow}
          handleServiceRowChange={handleServiceRowChange}
          handleRemoveServiceRow={handleRemoveServiceRow}
          resetSection={resetSection}
          businessId={businessId}
          businessIdEdit={businessIdEdit}
        />

        {/* A+ Content Photography Section */}
        <PhotographyAplusAccordion
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          formData={formData}
          errors={errors}
          getServiceRow={getServiceRow}
          handleServiceRowChange={handleServiceRowChange}
          handleRemoveServiceRow={handleRemoveServiceRow}
          resetSection={resetSection}
        />
        {/* Store, Showroom & Manufacturing Unit Shoots Section */}
        < PhotographyStoreSection
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          formData={formData}
          errors={errors}
          getServiceRow={getServiceRow}
          handleServiceRowChange={handleServiceRowChange}
          handleRemoveServiceRow={handleRemoveServiceRow}
          resetSection={resetSection}
        />

        {/* Social Media Ready Content Section */}
        <PhotographySocialSection
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          formData={formData}
          errors={errors}
          getServiceRow={getServiceRow}
          handleServiceRowChange={handleServiceRowChange}
          handleRemoveServiceRow={handleRemoveServiceRow}
          resetSection={resetSection}
        />

        <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
          <button
            type="button"
            className="btn btn-outline-secondary px-5 me-2"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                serviceRows: Array(6).fill({
                  serviceType: "",
                  actualPrice: "",
                  offerPrice: "",
                  billingCycle: "",
                  taskDays: "",
                }),
                gender: "",
              }));
              setErrors({});
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success px-5">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Photography;