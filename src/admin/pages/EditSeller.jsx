import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BusinessDetailsEdit from "../components/BusinessDetailsEdit";
import MarketplaceBusiness from "../components/MarketplaceBusiness";
import DigitalMarketing from "../components/DigitalMarketing";
import Photography from "../components/Photography";
import { fetchBusinessDetailsById, updateBusiness } from "../../redux/actions/businessActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSeller = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { businessDetails } = useSelector((state) => state.business || {});

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
        businessLogoPreview: null,
        status: "",
        serviceRows: [{ serviceType: "", actualPrice: "", offerPrice: "", billingCycle: "", taskDays: "" }],
        catalogRows: [{ catalogType: "", skuCount: "", perSkuPrice: "", offerPrice: "", totalPrice: "", billingCycle: "", taskDays: "" }],
        keyAccountRows: [{ serviceType: "", actualPrice: "", offerPrice: "", securityDeposit: "", commissionTiers: [] }],
    });

    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState("Business Details");
    const [expandedSections, setExpandedSections] = useState({
        businessLaunch: true,
        catalogListing: false,
        keyAccountManagement: false,
    });

    // Fetch business details by ID
    useEffect(() => {
        dispatch(fetchBusinessDetailsById(id));
    }, [dispatch, id]);

    // Prefill form when businessDetails is available
    useEffect(() => {
        if (businessDetails && businessDetails.length > 0) {
            const biz = businessDetails[0];
            setFormData({
                businessLogoPreview: biz.businessLogo
                    ? `${process.env.REACT_APP_BASE_URL}${biz.businessLogo}`
                    : null,
                lead: biz.leadId?.toString() || "",
                businessName: biz.businessName || "",
                sellerName: biz.sellerName || "",
                regdMobileNumber: biz.regdMobile || "",
                emailId: biz.regdEmail || "",
                state: biz.stateId?.toString() || "",
                city: biz.cityName || "",
                gstNumber: biz.gstNumber || "",
                referredBy: biz.referredBy || "",
                address: biz.address || "",
                spocName: biz.spocName || "",
                spocMobileNumber: biz.spocMobile || "",
                businessLogo: null,
                status: biz.status?.toString() || "",
                serviceRows: biz.serviceRows || [{ serviceType: "", actualPrice: "", offerPrice: "", billingCycle: "", taskDays: "" }],
                catalogRows: biz.catalogRows || [{ catalogType: "", skuCount: "", perSkuPrice: "", offerPrice: "", totalPrice: "", billingCycle: "", taskDays: "" }],
                keyAccountRows: biz.keyAccountRows || [{ serviceType: "", actualPrice: "", offerPrice: "", securityDeposit: "", commissionTiers: [] }],
            });
        }
    }, [businessDetails]);

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
                businessLogoPreview: URL.createObjectURL(files[0]),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

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
            data.append("id", id);
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

            await dispatch(updateBusiness(data));
            toast.success("Business updated successfully!");
            navigate("/manage-sellers");
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
                    <div className="row">
                        <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
                            <h5>Edit Seller</h5>
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
                            <BusinessDetailsEdit
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

export default EditSeller;
