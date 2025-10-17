import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/logo.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchMouDetails, fetchRequiredDocuments, updateMouStatus, uploadDocument } from "../../redux/actions/mouAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DocumentUploadForm from "../components/DocumentUploadForm";
import DigitalMarketingAgreement from "../components/DigitalMarketingAgreement";
import LogisticsAgreement from "../components/LogisticsAgreement";
import MarketPlaceAgreement from "../components/MarketPlaceAgreement";
import { mailToSalesDepartment } from "../../redux/actions/emailAction";

const Agreement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState("mou"); // default active tab
  const { seller } = useSelector((state) => state.sellerAuth);
  const {
    mouList,
    serviceTypes,
    commissionPricings,
    digitalMarketing,
    productPhotographys,
    keyAccountSubscriptions,
    lifeStylePhotographys,
    modelPhotographys,
    aContentPhotographys,
    storePhotographys,
    socialMediaContentPhotographys,
  } = useSelector((state) => state.mou);

  const { loading, documents, total, documentsRejectedReason, error } = useSelector((state) => state.mou);
  console.log('documents',documents);
  const { uploadedDocument } = useSelector(state => state.mou);

  const padd = {
    padding: "10px 20px", // top/bottom 10px, left/right 20px
  };
  const getIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return "Unknown";
    }
  };

  useEffect(() => {
    dispatch(fetchMouDetails(seller?.id));
    dispatch(fetchRequiredDocuments(seller?.id));
  }, [dispatch, seller?.id]);

  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAccepted) {
      toast.warn("Please accept the terms and conditions");
    } else {
      const ipAddress = await getIpAddress();
      dispatch(updateMouStatus(seller.id, 1, ipAddress));
      setActiveTab("docs");
    }
  };

const handleUpload = async (formData, doc) => {
  await dispatch(uploadDocument(formData));
  // Optional: update the local documents state to show uploaded file immediately
  const uploadedFile = uploadedDocument?.file;
  if (uploadedFile) {
    const updatedDocs = documents.map((d) =>
      d.id === doc.id ? { ...d, file: uploadedFile, status: 1 } : d
    );
  }
};

const handleCreateDocuments=()=>{
   dispatch(mailToSalesDepartment(seller.id));
};


  return (
    <div>
      {/* Header with Logo */}
      <div className="container-fluid bg-white">
        <div className="row">
          <div className="col-lg-12 text-center py-3">
            <img src={logo} alt="Logo" width="150" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mt-4">
        <ul
          className="nav nav-tabs"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "mou" ? "active" : ""}`}
              onClick={() => setActiveTab("mou")}
              style={padd}
            >
              MOU
            </button>

          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "docs" ? "active" : ""}`}
              onClick={() => setActiveTab("docs")} style={padd}
            >
              Docs
            </button>
          </li>
        </ul>

        <div className="tab-content mt-3">
          {/* MOU Tab */}
          {activeTab === "mou" && (
            <div className="tab-pane active">
              <div className="container-fluid  mt-4">
                <div className="accordion" id="mouAccordion">
                  {/*    Digital Marketing */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingMOU">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseMOU"
                        aria-expanded="true"
                        aria-controls="collapseMOU"
                      >
                        Digital Marketing

                      </button>
                    </h2>
                    <div
                      id="collapseMOU"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingMOU"
                      data-bs-parent="#mouAccordion"
                    >
                      <div className="accordion-body">
                        {/* Agreement Content */}
                        <div className="container-fluid bg-white mt-3 py-3">
                          <div className="row px-4">
                            <DigitalMarketingAgreement />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logistics */}
                  <LogisticsAgreement />

                  {/* Market Place */}
                  <MarketPlaceAgreement
                    mouList={mouList}
                    serviceTypes={serviceTypes}
                    commissionPricings={commissionPricings}
                    digitalMarketing={digitalMarketing}
                    productPhotographys={productPhotographys}
                    keyAccountSubscriptions={keyAccountSubscriptions}
                    lifeStylePhotographys={lifeStylePhotographys}
                    modelPhotographys={modelPhotographys}
                    aContentPhotographys={aContentPhotographys}
                    storePhotographys={storePhotographys}
                    socialMediaContentPhotographys={socialMediaContentPhotographys}
                  />
                </div>
              </div>
              <div className="col-lg-12 text-center"> <div className="form-check form-check-inline mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="service1"
                  checked={isAccepted}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label text-dark" htmlFor="service1">
                  I Accept 3 MOU's
                </label>
              </div></div>
              <div className="col-lg-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-success px-5 me-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Docs Tab */}
          {activeTab === "docs" && (
            <div>
              <DocumentUploadForm  documents={documents} onUpload={handleUpload} onSubmit={handleCreateDocuments}/>
            </div>

          )}

        </div>
      </div>
    </div>
  );
};

export default Agreement;
