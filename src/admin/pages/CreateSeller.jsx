import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBusiness, fetchBusinessDetailsById } from "../../redux/actions/businessActions";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BusinessDetails from "../components/BusinessDetails";
import MarketplaceBusiness from "../components/MarketplaceBusiness";
import DigitalMarketing from "../components/DigitalMarketing";
import Photography from "../components/Photography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSeller = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // for edit mode

  const [formData, setFormData] = useState({
    lead: "",
    businessName: "",
    sellerName: "",
    regdMobileNumber: "",
    emailId: "",
    state: "",
    city: "",
    gstNumber: "",
    referredBy: "",
    address: "",
    spocName: "",
    spocMobileNumber: "",
    businessLogo: null,
    status: "",
    serviceRows: [
      { serviceType: "", actualPrice: "", offerPrice: "", billingCycle: "", taskDays: "" },
    ],
    catalogRows: [
      { catalogType: "", skuCount: "", perSkuPrice: "", offerPrice: "", totalPrice: "", billingCycle: "", taskDays: "" },
    ],
    keyAccountRows: [
      { serviceType: "", actualPrice: "", offerPrice: "", securityDeposit: "", commissionTiers: [] },
    ],
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("Business Details");
  const [expandedSections, setExpandedSections] = useState({
    businessLaunch: true,
    catalogListing: false,
    keyAccountManagement: false,
  });

  // Toggle accordion sections
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Row handlers
  const handleServiceRowChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...formData.serviceRows];
    updatedRows[index][name] = value;
    setFormData((prev) => ({ ...prev, serviceRows: updatedRows }));
  };
  const handleCatalogRowChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...formData.catalogRows];
    updatedRows[index][name] = value;
    setFormData((prev) => ({ ...prev, catalogRows: updatedRows }));
  };
  const handleKeyAccountRowChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...formData.keyAccountRows];
    updatedRows[index][name] = value;
    setFormData((prev) => ({ ...prev, keyAccountRows: updatedRows }));
  };

  const handleRemoveServiceRow = (index) => {
    const updatedRows = [...formData.serviceRows];
    if (updatedRows.length > 1) {
      updatedRows.splice(index, 1);
      setFormData((prev) => ({ ...prev, serviceRows: updatedRows }));
    }
  };
  const handleRemoveCatalogRow = (index) => {
    const updatedRows = [...formData.catalogRows];
    if (updatedRows.length > 1) {
      updatedRows.splice(index, 1);
      setFormData((prev) => ({ ...prev, catalogRows: updatedRows }));
    }
  };
  const handleRemoveKeyAccountRow = (index) => {
    const updatedRows = [...formData.keyAccountRows];
    if (updatedRows.length > 1) {
      updatedRows.splice(index, 1);
      setFormData((prev) => ({ ...prev, keyAccountRows: updatedRows }));
    }
  };

  // Populate form when editing
  const populateFormData = (businessData) => {
    setFormData((prev) => ({
      ...prev,
      ...businessData,
      serviceRows: businessData.businessLaunches?.map((launch) => ({
        serviceType: launch.serviceTypeName,
        actualPrice: launch.actualPrice,
        offerPrice: launch.offerPrice,
        billingCycle: launch.billCycleTitle,
        taskDays: launch.taskCompletionDays,
      })) || prev.serviceRows,
      catalogRows: businessData.catalogRows || prev.catalogRows,
      keyAccountRows: businessData.keyAccountRows || prev.keyAccountRows,
    }));
  };

  // Fetch business if ID exists (edit mode)
  useEffect(() => {
    if (id) {
      dispatch(fetchBusinessDetailsById(id))
        .then((res) => {
          if (res?.data) populateFormData(res.data);
        })
        .catch((err) => toast.error("Failed to load business details"));
    }
  }, [id, dispatch]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.lead) newErrors.lead = "Lead is required";
    if (!formData.businessName) newErrors.businessName = "Business Name is required";
    if (!formData.sellerName) newErrors.sellerName = "Seller Name is required";
    if (!formData.regdMobileNumber || formData.regdMobileNumber.length !== 10)
      newErrors.regdMobileNumber = "Valid 10-digit mobile number is required";
    if (!formData.emailId) newErrors.emailId = "Email is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.spocName) newErrors.spocName = "SPOC Name is required";
    if (!formData.spocMobileNumber || formData.spocMobileNumber.length !== 10)
      newErrors.spocMobileNumber = "Valid SPOC mobile number is required";
    if (!formData.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const data = new FormData();
      data.append("leadId", parseInt(formData.lead));
      data.append("businessName", formData.businessName);
      data.append("sellerName", formData.sellerName);
      data.append("regdMobile", formData.regdMobileNumber);
      data.append("regdEmail", formData.emailId);
      data.append("stateId", parseInt(formData.state));
      data.append("cityName", formData.city);
      data.append("gstNumber", formData.gstNumber);
      data.append("address", formData.address);
      data.append("spocName", formData.spocName);
      data.append("spocMobile", formData.spocMobileNumber);
      data.append("status", formData.status);
      data.append("referredBy", formData.referredBy);
      if (formData.businessLogo) data.append("businessLogo", formData.businessLogo);
      data.append("serviceRows", JSON.stringify(formData.serviceRows));
      data.append("catalogRows", JSON.stringify(formData.catalogRows));
      data.append("keyAccountRows", JSON.stringify(formData.keyAccountRows));

      await dispatch(createBusiness(data));
      toast.success("Business saved successfully!");
      setErrors({});
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={true} />
      <div className="content flex-grow-1">
        <Navbar />
        <div className="container-fluid px-4 pt-3">
          <div className="row mb-3">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-2">
                  <h5 className="form-title m-0">{id ? "Edit Seller" : "Create Seller"}</h5>
                </div>
                <div className="col-lg-10 d-flex justify-content-end text-end">
                  <Link to="/manage-sellers" className="btn btn-new-lead">Manage Sellers</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded shadow-sm mb-3">
            <ul className="nav nav-tabs">
              {["Business Details", "Marketplace Business", "Digital Marketing", "Photography"].map(
                (tab) => (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link ${activeTab === tab ? "active" : ""}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-white p-3 rounded shadow-sm card-header">
            {activeTab === "Business Details" && (
              <BusinessDetails
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
            {activeTab === "Marketplace Business" && (
              <MarketplaceBusiness
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                handleServiceRowChange={handleServiceRowChange}
                handleCatalogRowChange={handleCatalogRowChange}
                handleKeyAccountRowChange={handleKeyAccountRowChange}
                handleRemoveServiceRow={handleRemoveServiceRow}
                handleRemoveCatalogRow={handleRemoveCatalogRow}
                handleRemoveKeyAccountRow={handleRemoveKeyAccountRow}
                handleSubmit={handleSubmit}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              />
            )}
            {activeTab === "Digital Marketing" && (
              <DigitalMarketing formData={formData} setFormData={setFormData} />
            )}
            {activeTab === "Photography" && (
              <Photography formData={formData} setFormData={setFormData} />
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreateSeller;
