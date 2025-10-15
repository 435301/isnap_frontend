import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/logo.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchMouDetails, updateMouStatus } from "../../redux/actions/mouAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    dispatch(fetchMouDetails(seller.id));
  }, [dispatch, seller.id]);

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
      navigate("/seller/dashboard");
    }
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
              onClick={() => setActiveTab("docs")}  style={padd}
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
                            <div className="col-lg-12">
                              <h3 className="text-dark mb-4 text-center">
                                DIGITAL MARKETING SERVICE AGREEMENT
                              </h3>

                              <p><strong>THIS GENERAL SERVICE AGREEMENT</strong> (the "Agreement"), dated this day of August 2025</p>

                              <p><strong>BETWEEN:</strong><br />
                                <strong>MORANDI COLORS PRIVATE LIMITED</strong> (GSTN: 36AAQCM6357H1ZX), H NO 20-3, H-81, Sri Nivas Height, ADARSH NAGAR, UPPAL, Hyderabad, Medchal Malkajgiri, Telangana, 500039. (the "Client")
                              </p>

                              <p><strong>- AND -</strong><br />
                                <strong>ISNAP ONLINE PRIVATE LIMITED</strong> (GSTN: 36AAHCI4640J1ZF), a company incorporated under the Companies Act, 2013, having its registered office at PLOT NO 90/3, PHASE 3, KAVURI HILLS, MADHAPUR, HYDERABAD, TELANGANA, INDIA – 500081. (the "Contractor")
                              </p>

                              <h5>BACKGROUND:</h5>
                              <p>
                                A. The Client thinks that the Contractor has the necessary qualifications, experience, and abilities to provide services to the Client.
                                <br />
                                B. The Contractor agrees to provide the Client with such services on the terms and conditions outlined in this Agreement.
                              </p>

                              <p>
                                <strong>IN CONSIDERATION OF</strong> the matters described above and of the mutual benefits and obligations outlined in this Agreement, the receipt and sufficiency of which consideration is hereby acknowledged, the Client and the Contractor (individually the "Party" and collectively the "Parties" to this Agreement) agree as follows:
                              </p>

                              <h5>Services Provided</h5>
                              <ol>
                                <li>
                                  The Client hereby agrees to engage the Contractor to provide the Client with the following services (the "Services"):
                                  <ul>
                                    <li>Google Ads & Campaigns</li>
                                    <li>End-to-End Content Management</li>
                                    <li>YouTube Marketing</li>
                                    <li>Search Engine Optimization (SEO)</li>
                                    <li>Social Media Marketing (SMM)</li>
                                    <li>Social Media Optimization (SMO)</li>
                                  </ul>
                                </li>
                                <li>
                                  The Services will also include any other tasks which the Parties may agree on. The Contractor hereby agrees to provide such Services to the Client.
                                </li>
                              </ol>

                              {/* Term of Agreement */}
                              <h5 className="mt-4">Term of Agreement</h5>
                              <ol start="3">
                                <li>
                                  The term of this Agreement (the "Term") will begin on the date of this Agreement and will remain in full force and effect until the completion of the Services, subject to earlier termination as provided in this Agreement. The Term of this Agreement may be extended with the written consent of the Parties.
                                </li>
                                <li>
                                  This agreement shall remain in effect for 12 months from the date of signing and may be renewed annually with the mutual consent of both parties. Either party may terminate the agreement with 30 days' prior written notice. Upon termination, all outstanding payments must be settled within 30 days.
                                </li>
                              </ol>

                              <h5 className="mt-4">Performance</h5>
                              <ol start="5">
                                <li>
                                  The Parties agree to do everything necessary to ensure that the terms of this Agreement take effect.
                                </li>
                              </ol>

                              <h5 className="mt-4">Currency</h5>
                              <ol start="6">
                                <li>
                                  Except as otherwise provided in this Agreement, all monetary amounts referred to in this Agreement are in INR (INDIAN RUPEE)
                                </li>
                              </ol>

                              <h5 className="mt-4">Compensation</h5>
                              <ol start="7">
                                <li>
                                  The Contractor will charge the Client for the Services at the rate of ₹140,000.00 per quarter (the "Compensation") (Monthly costing will be around ₹45000).
                                </li>
                                <li>
                                  The Client will be invoiced three months.
                                </li>
                                <li>
                                  Invoices submitted by the Contractor to the Client are due within 5 days of receipt.
                                </li>
                                <li>
                                  The compensation stated in this Agreement does not include GST or other applicable duties as may be required by law. Any duties required by law will be charged to the Client in addition to the Compensation.
                                </li>
                              </ol>

                              <h5 className="mt-4">Reimbursement of Expenses</h5>
                              <ol start="11">
                                <li>
                                  The client agrees to allocate the marketing budget across the specified digital marketing platforms, as mutually determined based on market insights and audience response. Pricing may fluctuate according to market conditions. Reasonable and necessary expenses related to the provision and completion of services will be communicated by the contractor on an ongoing basis.
                                </li>
                                <li>
                                  All expenses must be pre-approved by the Client.
                                </li>
                              </ol>

                              <h5 className="mt-4">Penalties for Late Payment</h5>
                              <ol start="13">
                                <li>
                                  Any late payments will trigger a fee of 1.00% per month on the amount still owing.
                                </li>
                              </ol>

                              <h5 className="mt-4">Confidentiality</h5>
                              <ol start="14">
                                <li>
                                  Confidential information (the "Confidential Information") refers to any data or information relating to the business of the Client which would reasonably be considered to be proprietary to the Client including, but not limited to, accounting records, business processes, and client records and that is not generally known in the industry of the Client and where the release of that Confidential Information could reasonably be expected to cause harm to the Client.
                                </li>
                                <li>
                                  The Contractor agrees that they will not disclose, divulge, reveal, report or use, for any purpose, any confidential information which the Contractor has obtained, except as authorized by the Client or as required by law. The obligations of confidentiality will apply during the term of this Agreement and will survive indefinitely upon termination of this Agreement.
                                </li>
                                <li>
                                  All written and oral information and material disclosed or provided by the Client to the Contractor under this Agreement is Confidential Information, regardless of whether it was provided before or after the date of this Agreement or how it was provided to the Contractor.
                                </li>
                              </ol>

                              <h5 className="mt-4">Ownership of Intellectual Property</h5>
                              <ol start="17">
                                <li>
                                  All intellectual property and related material, including any trade secrets, moral rights, goodwill, relevant registrations or registration applications, and rights in any patent, copyright, trademark, trade dress, industrial design and trade name (the "Intellectual Property") that is developed or produced under this Agreement, will be the sole property of the Client. The use of the Intellectual Property by the Client will not be restricted in any manner.
                                </li>
                                <li>
                                  The Contractor may not use the Intellectual Property for any purpose other than that contracted for in this Agreement except with the written consent of the Client. The Contractor will be responsible for all damages resulting from the unauthorized use of the Intellectual Property.
                                </li>
                              </ol>

                              <h5 className="mt-4">Client's Responsibilities</h5>
                              <ol start="19">
                                <li>
                                  The client agrees to provide the following: All necessary business information, including product descriptions, images, videos, and other relevant assets.
                                </li>
                                <li>
                                  Active cooperation throughout the campaign to facilitate the effective implementation of the agreed-upon strategy.
                                </li>
                              </ol>

                              <h5 className="mt-4">Return of Property</h5>
                              <ol start="21">
                                <li>
                                  Upon the expiry or termination of this Agreement, the Contractor will return to the Client any property, documentation, records, or Confidential Information which is the property of the Client.
                                </li>
                                <li>
                                  If this Agreement is terminated by the Client before completion of the Services, the Contractor will be entitled to recovery from the site or premises where the Services were carried out, of any materials or equipment which is the property of the Contractor or, where agreed between the Parties, to compensation instead of recovery.
                                </li>
                              </ol>

                              <h5 className="mt-4">Capacity/Independent Contractor</h5>
                              <ol start="23">
                                <li>
                                  In providing the Services under this Agreement, it is expressly agreed that the Contractor is acting as an independent contractor and not as an employee. The Contractor and the Client acknowledge that this Agreement does not create a partnership or joint venture between them, and is exclusively a contract for service.
                                </li>
                              </ol>

                              <h5 className="mt-4">Notice</h5>
                              <ol start="24">
                                <li>
                                  All notices, requests, demands, or other communications required or permitted by the terms of this Agreement will be given in writing and delivered to the Parties at the following addresses:
                                  <br />
                                  a. MORANDI COLORS PRIVATE LIMITED (GSTN: 36AAQCM6357H1ZX), H NO 20-3, H-81, Sri Nivas Height, ADARSH NAGAR, UPPAL, Hyderabad, Medchal Malkajgiri, Telangana, 500039.
                                  <br />
                                  b. ISNAP ONLINE PRIVATE LIMITED (GSTN: 36AAHCI4640J1ZF) PLOT NO 90/3, PHASE 3, KAVURI HILLS, MADHAPUR, HYDERABAD, TELANGANA, INDIA – 500081
                                  <br />
                                  or to such other addresses as either Party may from time to time notify the other.
                                </li>
                              </ol>

                              <h5 className="mt-4">Indemnification</h5>
                              <p>
                                Except to the extent paid in settlement from any applicable insurance policies, and to the extent permitted by applicable law, each Party agrees to indemnify and hold harmless the other Party, and its respective directors, shareholders, affiliates, officers, agents, employees, and permitted successors and assigns against any claims, losses, damages, liabilities, penalties, punitive damages, expenses, reasonable legal fees and costs of any kind or amount whatsoever, which result from or arise out of any act or omission of the indemnifying party, its respective directors, shareholders, affiliates, officers, agents, employees, and permitted successors and assigns that occurs in connection with this Agreement. This indemnification will survive the termination of this Agreement.
                              </p>

                              <h5 className="mt-4">Modification of Agreement</h5>
                              <ol start="25">
                                <li>
                                  Any amendment or modification of this Agreement or additional obligation assumed by either Party in connection with this Agreement will only be binding if evidenced in writing signed by each Party or an authorized representative of each Party.
                                </li>
                              </ol>

                              <h5 className="mt-4">Time of the Essence</h5>
                              <ol start="26">
                                <li>
                                  Time is of the essence in this Agreement. No extension or variation of this Agreement will operate as a waiver of this provision.
                                </li>
                              </ol>

                              <h5 className="mt-4">Assignment</h5>
                              <ol start="27">
                                <li>
                                  The Contractor will not voluntarily, or by operation of law, assign or otherwise transfer its obligations under this Agreement without the prior written consent of the Client.
                                </li>
                              </ol>

                              <h5 className="mt-4">Entire Agreement</h5>
                              <ol start="28">
                                <li>
                                  It is agreed that there is no representation, warranty, collateral agreement, or condition affecting this Agreement except as expressly provided in this Agreement.
                                </li>
                              </ol>

                              <h5 className="mt-4">Enurement</h5>
                              <ol start="29">
                                <li>
                                  This Agreement will enure to the benefit of and be binding on the Parties and their respective heirs, executors, administrators, and permitted successors and assigns.
                                </li>
                              </ol>

                              <h5 className="mt-4">Titles/Headings</h5>
                              <ol start="30">
                                <li>
                                  Headings are inserted for the convenience of the Parties only and are not to be considered when interpreting this Agreement.
                                </li>
                              </ol>

                              <h5 className="mt-4">Gender</h5>
                              <p>
                                Words in the singular mean and include the plural and vice versa. Words in the masculine mean and include the feminine and vice versa.
                              </p>

                              <h5 className="mt-4">Governing Law</h5>
                              <ol start="31">
                                <li>
                                  This Agreement will be governed by and construed under the laws of the State of Telangana.
                                </li>
                              </ol>

                              <h5 className="mt-4">Severability</h5>
                              <ol start="32">
                                <li>
                                  If any of the provisions of this Agreement are held to be invalid or unenforceable in whole or in part, all other provisions will nevertheless continue to be valid and enforceable with the invalid or unenforceable parts severed from the remainder of this Agreement.
                                </li>
                              </ol>

                              <h5 className="mt-4">Waiver</h5>
                              <ol start="33">
                                <li>
                                  The waiver by either Party of a breach, default, delay, or omission of any of the provisions of this Agreement by the other Party will not be construed as a waiver of any subsequent breach of the same or other provisions.
                                </li>
                              </ol>

                              <h5 className="mt-4">IN WITNESS WHEREOF</h5>
                              <p>
                                the Parties have duly affixed their signatures under hand and seal on this day of August, 2025.
                              </p>

                              <p>
                                <strong>WITNESS:</strong> ______________________________ <strong>MORANDI COLORS PRIVATE LIMITED</strong><br />
                                Per: ______________________________<br />
                                (Seal)
                              </p>

                              <p>
                                <strong>WITNESS:</strong> ______________________________ <strong>ISNAP ONLINE PRIVATE LIMITED</strong><br />
                                Per: ______________________________<br />
                                (Seal)
                              </p>

                              {/* Checkbox */}

                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  {/* Logistics */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingLogistics">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseLogistics"
                        aria-expanded="false"
                        aria-controls="collapseLogistics"
                      >
                        Logistics
                      </button>
                    </h2>
                    <div
                      id="collapseLogistics"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingLogistics"
                      data-bs-parent="#mouAccordion"
                    >
                      <div className="accordion-body">
                        {/* Logistics Agreement Content */}
                        <div className="container-fluid bg-white mt-3 py-3">
                          <div className="row px-4">
                            <div className="col-lg-12">
                              <h3 className="text-dark mb-4 text-center">
                                MERCHANT AGREEMENT
                              </h3>

                              <h5 className="mt-4">ISNAP LOGISTICS MANAGEMENT SOLUTION</h5>

                              <p>This Merchant Agreement (“Agreement”) is executed on the 6th of October 2024 between:</p>

                              <p>
                                ISnap Logistics, a company is registered office at LIG 430, 7th Phase, KPHB, HYDERABAD, Telangana, 500072, offering ‘Logistics Management Services’, under the name ‘ISnap Logistics’ (hereinafter referred to as “ISnap” or “we” or “ISnap Logistics” or “Company or First Party”, represented by its Managing Director MALLESHAM CHIRRA resident of Hyderabad .
                              </p>

                              <p>And</p>

                              <p>
                                HELIORA HEALTH PRIVATE LIMITED which is registered office at 12-7-127/2, Plot No 30 Road/Street: Shaktinagar, Balaji Nagar, Hyderabad District: Medchal Malkajgiri, State: Telangana PIN Code: 500072 represented by KOMMOJU VAMSHI KRISHNA with any company or other business entity it is representing, if any (hereinafter collectively referred as “Merchant” or “you” or “Your” “User or Second Party”);
                              </p>

                              <p>and together with the First Party and the Second Party shall be referred jointly as the “Parties” and individually as a “Party”).</p>

                              <h5>ANDWHEREAS</h5>

                              <p>This Agreement comes into effect when User signs the said Agreement herein and registers to use the Services of the First Party (as defined below) by signing the said Agreement herein and accept the terms and conditions provided herein.</p>

                              <p>The Second Party signifies its absolute, irrevocable, and unconditional consent to all the provisions of this Agreement in its entirety. This Agreement constitutes a legally binding agreement between the User and ISnap. This Agreement defines the terms and conditions under which the User is allowed to use ISnap's Web Application.</p>

                              <p>The User has read this Agreement carefully and has agreed to Abide by the Terms and Conditions of this Agreement.</p>

                              <p>The Web/ Mobile App and the online/ offline services of ISnap or its affiliates provide access to a platform that facilitates a more comfortable form of e-commerce where the User can use the logistics services according to its requirements within India and in countries designated by ISnap from time to time.</p>

                              <p>This Agreement, among other things, provides the terms and conditions for using the Services, primarily through a web-based practice management software hosted and managed remotely through the Web/Mobile App.</p>

                              <p>Any additional terms and conditions, standard operating procedures (SOPs), service-level agreements (SLAs), terms of use, disclaimers, and other policies applicable to general and specific areas of this Agreement, Web Application, Mobile App and/or Service shall be construed to form an integral part of this Agreement and any breach thereof will be construed as a breach of this Agreement.</p>

                              <p>The User shall have access to use the Services will be solely at the discretion of ISnap.</p>

                              <h5>1. USER ACCOUNT USAGE</h5>

                              <ol>
                                <li>This Agreement is a master agreement that governs the relationship between the Parties concerning one or more business (B2B) services that are offered by ISnap to the User, which shall inter-alia be subject to the terms and conditions specified in Annexure-A (ISnap Service Specifications). ISnap hereby authorizes the User to view and access the content available on the Web/Mobile App solely for ordering, receiving, delivering, and communicating as per this Agreement. The contents of the Services, information, text, graphics, images, logos, button icons, software code, design, and the collection, arrangement, and assembly of content on the Web/Mobile App (collectively, "ISnap Content"), are the property of ISnap and are protected under copyright, trademark, and other laws. User shall not modify the ISnap Content or reproduce, display, publicly perform, distribute, or otherwise use the ISnap Content in any manner without the consent of ISnap.</li>
                                <li>Users shall not transfer or share (including by way of sublicense, lease, assignment, or other transfer, including by operation of law) their log-in or right to use the service to any third party. The User shall be solely responsible for the way anyone you have authorized to use the Services and for ensuring that all such users comply with all of the terms and conditions of this Agreement. Any violation of the terms or conditions of this Agreement by any such user shall be deemed a violation thereof by you, towards which ISnap shall have no liability or responsibility.</li>
                                <li>Multiple users are not permitted to share the same/single log-in. You agree and understand that you are responsible for maintaining the confidentiality of passwords associated with any log-in you use to access the Services.</li>
                                <li>User agrees that any information you give to ISnap will always be true, accurate, correct, complete, and up to date, to the best of your knowledge. Any phone number used to register with the service be registered in your name, and you might be asked to provide supporting documents to prove the same.</li>
                                <li>User agrees that it is will not use the Services provided by ISnap for any unauthorized and unlawful purpose. You will not impersonate another person to any of those mentioned above.</li>
                                <li>User agrees to use the Services only for purposes that are permitted by: (a) the terms of usage as outlined in this Agreement; and (b) any applicable law, regulation, and generally accepted practices or guidelines in the relevant jurisdictions (including any laws regarding the export of goods, data or software to and from India or other relevant countries).</li>
                                <li>User agrees not to access (or attempt to access) any of the Services by any means other than through the interface that is provided by ISnap unless you have been specifically allowed to do so in a separate agreement with ISnap.</li>
                                <li>User agrees that it will not engage in any activity that interferes with or disrupts the Services (or the servers and networks which are connected to the Services).</li>
                                <li>User agrees that it is solely responsible for (and that ISnap has no responsibility to you or to any third party for) any breach of its obligations under this Agreement and for the consequences (including any loss or damage which ISnap may suffer) of any such breach.</li>
                                <li>User expressly acknowledges and agrees that use of the Services is at its own sole risk and that the Services are provided "as is" and "as available", and ISnap at its discretion, will provide any customization or modification.</li>
                                <li>User agrees that this Agreement and the Services of ISnap form a part subject to any modification or removal by ISnap with change in government regulations, policies and local laws as applicable.</li>
                              </ol>

                              <h5 className="mt-4">2. FEES AND PAYMENT</h5>

                              <ol>
                                <li>Subject to the provisions of this Agreement, the User will pay ISnap the fees and other amounts outlined in this Agreement or as otherwise agreed by the Parties.</li>
                                <li>ISnap may add new services on its Web/Mobile Application for additional charges or proactively amend charges for existing services at any time in its sole discretion. Fees stated prior to the services being provided shall apply as amended at ISnap's sole discretion from time to time.</li>
                                <li>If the User purchases any subscription-based paid service, User authorizes ISnap to charge the User applicable fees at the beginning of every subscription period or at such intervals as applicable to the said service, and the User authorizes ISnap to make such modification to the fee structure as required and also agree to abide by such modified fee structure.</li>
                                <li>User agrees that the billing credentials provided by it for any purchases from ISnap will be accurate, and it shall not use billing credentials that it does not Lawfully own.</li>
                                <li>The User agrees to pay all subscription fees, service fees, and other fees applicable to the User's use of Services or any other services which are beyond the scope of the Services and this Agreement, and the User shall not (directly or indirectly) circumvent the fee structure.</li>
                                <li>The User is solely responsible for payment of all taxes, legal compliances, and statutory registrations and reporting under applicable law. ISnap is in no way responsible for any of the User's taxes or legal or statutory compliances.</li>
                                <li>Unless otherwise specified, all fees shall be exclusive of taxes, and Goods and Service tax and other statutory taxes, as applicable, shall be levied on every purchase/Service.</li>
                                <li>The payment process would be complete only on receipt of all charges payable to ISnap.</li>
                                <li>If applicable, ISnap shall raise an invoice for the Services and the freight amount (if payable) twice in a calendar month (preferably in mid-month and end of the month). The invoice shall be available on the billing/payments section of the User's dashboard on the ISnap platform.</li>
                                <li>The User shall be required to clear the invoice within 7 (seven) days from the date of the invoice. Payment terms for the pre-paid accounts have been specified in Clause 4 of Annexure-A.</li>
                                <li>If the User fails to pay the full invoice amount in accordance with the time period mentioned above or any other amounts/charges payable under this Agreement by the due date. In that case, ISnap will have the right to: (i) retain (and subsequently adjust the outstanding amounts/charges within 15 days of retention from) the amounts received from the end customer of the User through the cash on delivery method ("COD Amount"), and/or (ii) retain the custody of (and subsequently dispose within 21 days of retention) the shipments of the User which are owned by ISnap logistics partner(s), and/or (iii) levy interest of 18 % per annum from the due date of payment, till such time that the User makes an entire payment towards the invoice, and/or (iv) forfeit the any deposit amounts of the User (if any) lying with ISnap. Furthermore, without prejudice to the above, the User now agrees that it shall become liable to pay the freight charges (both forward and RTO (Return to Origin Charges) as soon as a shipment is picked up or is RTO initiated by the ISnap courier partner. That ISnap shall have a right to recover such freight charges from the User (for all the shipments which have been picked- up/shipped/RTO however which have not been invoiced) as per the various modes agreed under this Agreement, including but not limited to retaining/adjusting the COD Amounts for the shipments of the User.</li>
                                <li>If the User closes its account with ISnap, or this Agreement expires or is terminated, ISnap will deduct the Fees and the freight amount due to it from the User from the COD Amount. ISnap shall, after that, remit the remaining COD Amount after such deduction, within 10 (ten) days from the date of such closure/expiration/termination, subject to reconciliation and completion of all the shipments and transactions pertaining to the User/his account. If the COD Amount falls short of the outstanding amount payable by the User, the User shall, within 5 (five) days from the date of such closure/expiration/termination, pay the outstanding amount to ISnap. Until the payment of the entire dues, ISnap shall retain the custody of (and subsequently dispose of within 30 days of retention) the shipments of the User which are in possession of ISnap partner(s). In the event of any delay in payment of the outstanding amount by the User (as required under this clause), ISnap shall have a right to levy interest of 18 % per annum on the outstanding amount from the due date of payment till the date of actual payment and/or to forfeit the security deposit amount of the User (if any) lying with ISnap.</li>
                                <li>Save as otherwise stated in this Agreement, for any claims by the User regarding non- connectivity of the shipment (i.e. where the User is claiming that the shipment has been picked up but not connected) - the signed copy of the manifest sheet of the pick up against the disputed shipment has to be submitted along with the claim request by the User within 3 (three) days from the pick-up date. Without the signed manifest, any such request shall not be considered valid.</li>
                                <li>The User agrees that in case of shipments booked under Cash on Delivery ("COD"), ISnap logistics’ Third Party Courier partner shall deliver the shipment and collect cash from the customer, as per the details mentioned on the shipping label and remit/reimburse the amount to ISnap which then would be remitted/reimbursed to the User as per Clause 3.7 of Annexure-A. In relation to the same, it is hereby clarified that: (i) the User engages ISnap as an agent of the User for the purpose of collection of the COD amount; (ii) ISnap may receive certain consideration (as mutually agreed) in lieu of such services as an agent, and (iii) ISnap shall not have any title to the goods for which the COD amount will be collected. In this regard, the User agrees that ISnap shall have the right to deduct the freight charges from the COD Amounts received by ISnap and then remit/reimburse the balance amount to the User. ISnap shall not be responsible for any loss of “COD” amount when it is in possession of the Third Party Carrier Partner and if the said amount is lost in the possession of the Third Party Carrier Partner ISnap and the User will be bound by the Terms and Conditions of the Third party Carrier Partner.</li>
                                <li>ISnap may, from time to time, in its sole discretion, provide/allocate a credit limit to the User for the Services, which can be used by the User within a specified time period.</li>
                                <li>ISnap reserves the right to modify the fee structure by providing notice on your dashboard or through email to the authorized User, which shall be considered valid and agreed upon communication. Upon the User not communicating any negative response/objection to ISnap to such notice, ISnap shall apply the modified Fee structure.</li>
                                <li>To process the fee payments, ISnap might require details of the User's bank account, credit card number, and other financial information. Users shall be responsible for maintaining the confidentiality of such information provided by Users.</li>
                                <li>As needed, ISnap can enable a postpaid payment plan to the User/client who provide necessary reason why that mode of payment would be suitable compared to the wallet payment system currently enforced in the application. ISnap shall generate an invoice for all transactions for a period of 1 month on the 1st of the next month and the same shall be paid in full within 5 days of invoice generation by the User/Client. When unpaid, ISnap has the right to suspend account operations for the said postpaid account and hold the shipments that are in transit. A simple interest rate of 15% Per annum shall be charged by ISnap on the Unpaid amount of the Client/User/Seller after expiry of fifteen days of the due date until the same is cleared and the same shall recoverable from the Client/User.</li>
                              </ol>

                              <h5 className="mt-4">3. LIABILITY</h5>

                              <ol>
                                <li>ISnap shall not be responsible or liable to the User for any losses, damage, injuries, or expenses incurred by the User as a result of any action taken by ISnap, where the User has consented for the same.</li>
                                <li>ISnap does not provide or make any representation, warranty, or guarantee, express or implied, about the Services. ISnap does not verify any content or information provided by User and, to the fullest extent permitted by law, disclaims all liability arising out of the User's use or reliance upon the Services.</li>
                                <li>Notwithstanding anything contrary provided in this Agreement, in no event, including but not limited to negligence, shall ISnap or any of its directors, officers, employees, agents or content or service providers (collectively, the "Protected Entities") be liable for any direct, indirect, special, incidental, consequential, exemplary or punitive damages arising from, or directly or indirectly related to, the use of, or the inability to use, the Services or the content, materials and functions related thereto, User's provision of information via the Services, lost business or lost sales, even if such Protected Entity has been advised of the possibility of such damages.</li>
                                <li>In no event shall the Protected Entities be liable for failure on the part of the User to provide agreed Services. In no event shall the Protected Entities be liable for any activity in relation to the Services provided to a User.</li>
                                <li>The Protected Entities shall not be liable for any act or omission of any other person/ entity furnishing a portion of the service, or from any act or omission of a third party, including those vendors participating in the Services, or for any unauthorized interception of your communications or other breaches of privacy attributable in part to the acts or omissions of the User or third parties, or for damages associated with the service, or equipment that it does not furnish, or for damages that result from the operation of the User provided systems, equipment, facilities or services that are interconnected with the service.</li>
                                <li>ISnap shall not be responsible for any loss (including loss of COD amounts) in case of forcible snatching by the buyer/customer of the User. Such incidents/cases shall be the sole responsibility of the User and the User is liable to initiate actions to resolve such incidents, if any, on its own, including but not limited to legal processes as well as to reimburse the losses (if any) to the concerned logistic partner/its personnel.</li>
                                <li>The User undertakes to resolve the disputes raised by the buyer(s) of the User within 72 hours from the raising of such dispute(s). Failure to do so shall enable/authorize ISnap to hold the COD remittance until the User rectifies such dispute(s).</li>
                                <li>ISnap shall not liable for any misunderstandings with respect to any special offers and Coupons which are displayed on the Web Application and Mobile Application.</li>
                              </ol>

                              <h5 className="mt-4">4. GENERAL REPRESENTATIONS AND WARRANTIES</h5>

                              <p>Each Party represents and warrants to the other Party that:</p>
                              <p>(a) It has all necessary rights, powers, and authority to enter into and perform this Agreement; and</p>
                              <p>(b) The entrance and performance of this Agreement by it shall not violate any applicable law and shall not breach any agreement, covenant, court order, judgment, or decree to which such Party or by which it is bound.</p>

                              <h5 className="mt-4">5. INDEMNITY</h5>

                              <ol>
                                <li>The User ("Indemnifying Party") hereby agrees to indemnify, defend and hold ISnap, its affiliates, officers, directors, employees, contractors, sub-contractors, consultants, licensors, other third party service providers, agents and representatives ("Indemnified Party") harmless from and against claims, demands, actions, liabilities, costs, interest, damages and expenses of any nature whatsoever (including all legal and other costs, charges and expenses) incurred or suffered (directly or indirectly) by the Indemnified Party, on account of: (a) Indemnifying Party's access to or use of Services; (b) violation of this Agreement or any terms of use of the Services by the Indemnifying Party (and/or its officers, directors and employees); (c) violation of applicable law by the Indemnifying Party (and/or its officers, directors and employees); (d) wrongful or negligent act or omission of the Indemnifying Party (and/or its officers, directors and employees); (e) any third party action or claim made against the Indemnified Party, by reason of any actions undertaken by the Indemnifying Party (and/or its officers, directors and employees); and (f) any duties, taxes, octroi, cess, clearance charges and any other charge/levy by whatsoever name called, levied on the shipments.</li>
                                <li>ISnap will notify the User promptly of any such claim, loss, liability, or demand, and in addition to the User foregoing obligations, the User agrees to provide ISNAP with all reasonable assistance, at the User's expense, in defending any such claim, loss, liability, damage, or cost.</li>
                              </ol>

                              <h5 className="mt-4">6. COMPLIANCE WITH LAWS</h5>

                              <p>Each Party shall at all times and at its/his/her own expense: (a) strictly comply with all applicable laws (including state, central, and custom/international laws/statutes), now or hereafter in effect, relating to its/his/her performance of this Agreement; (b) pay all fees and other charges required by such applicable law; and (c) maintain in full force and effect all licenses, permits, authorizations, registrations, and qualification from any authority to the extent necessary to perform its obligations hereunder.</p>

                              <h5 className="mt-4">7. USE OF CONFIDENTIAL INFORMATION</h5>

                              <ol>
                                <li>Each Party may be given access to Confidential Information from the other Party in order to perform its obligations under this Agreement. The Party that receives Confidential Information shall be known as the "Receiving Party." The Party that discloses Confidential Information shall be known as the "Disclosing Party."</li>
                                <li>The Receiving Party acknowledges that the Confidential Information is received on a confidential basis and that the Disclosing Party shall remain the exclusive owner of its Confidential Information and of Intellectual Property rights contained therein. No license or conveyance of any such rights to the Receiving Party is granted or implied under this Agreement.</li>
                                <li>The Receiving Party shall: (a) Use the Confidential Information of the Disclosing Party only for purposes of complying with its obligations under this Agreement and, without limiting the generality of the foregoing, shall not, directly or indirectly, deal with, use, exploit or disclose such Confidential Information or any part thereof to any person or entity or for any purpose whatsoever (or in any manner which would benefit any competitor of the Disclosing Party) except as expressly permitted hereunder or unless and until expressly authorized to do so by the Disclosing Party; (b) Use reasonable efforts to treat, and cause all its officers, agents, servants, employees, professional advisors, contractors or prospective contractors to treat confidential all Confidential Information. In no event shall such efforts be less than the degree of care and discretion the Receiving Party exercises to protect its own valuable confidential information. Any contractors engaged by or prospective contractors to be engaged by the Receiving Party in connection with the performance of the Services shall be required to assume obligations of secrecy equal to or greater than the obligations that the Receiving Party has assumed in this Agreement with respect to the Confidential Information; (c) not, without the prior written consent of the Disclosing Party, disclose or otherwise make available the Disclosing Party's Confidential Information or any part thereof to any party other than those of its directors, officers, agents, servants, employees, professional advisors, contractors or prospective contractors who need to know the Confidential Information for the purposes set forth herein; (d) Not copy or reproduce in any manner whatsoever the Confidential Information of the Disclosing Party or any part thereof without the prior written consent of the Disclosing Party, except where required for its internal use following this Agreement; and (e) Promptly, upon termination or expiration of this Agreement, to the extent possible, return and confirm the return of all originals, copies, reproductions, and summaries of Confidential Information or, or at the option of the Disclosing Party, destroy and confirm the destruction of the Confidential Information (this sub-clause being applicable only on the User).</li>
                                <li>Provided, however, that nothing herein shall restrict in any manner the ability of either Party to use or disclose Confidential Information owned by it in any manner whatsoever, and the obligations of confidentiality herein shall apply to each Party only to the extent that that Party does not own the Confidential Information or portion thereof.</li>
                              </ol>

                              <h5 className="mt-4">8. INTELLECTUAL PROPERTY RIGHTS</h5>

                              <ol>
                                <li>The User acknowledges that the Intellectual Property rights in all the materials that have been developed by ISnap and provided to the User shall vest with ISnap.</li>
                                <li>The User hereby agrees and acknowledges that the Intellectual Property rights in all the material created and developed by the User, including any material created and developed by the User for the performance of Services under the terms of this Agreement, shall vest with ISnap.</li>
                                <li>All the Intellectual Property already developed and/or owned by each Party shall continue to vest with the concerned Party.</li>
                                <li>The Parties recognize that all third-party Intellectual Property rights are the exclusive property of their respective owners.</li>
                              </ol>

                              <h5 className="mt-4">9. NON-SOLICITATION</h5>

                              <p>The User agrees and undertakes that, during the term of this Agreement and for 36 (thirty-six) months after that, it shall not directly or indirectly attempt in any manner to solicit any client/customer or to persuade any person, firm, or entity which is a client/customer/supplier/vendor/partner of ISnap to cease doing business or to reduce the amount of business which any such client/customer/supplier/vendor/partner has customarily done or might propose doing with ISnap</p>

                              <h5 className="mt-4">10. TERM AND TERMINATION</h5>

                              <ol>
                                <li>This Agreement shall come into force on the date of signing of this agreement and shall remain in existence while the User is a user of any of the Services in any form or capacity, until terminated by either Party in accordance with the provisions of this Agreement.</li>
                                <li>The User can request for termination of the Agreement at any time with a 30 (thirty) day prior written notice subject to the provisions in the Annexure A for the Services undertaken. During this notice period, ISnap will investigate and ascertain the fulfillment of any ongoing Services and pending dues related to fees or any other amount payable by the User. The User shall be obligated to clear any dues with ISnap for any of its Services which the User has availed following this Agreement. ISnap shall not be liable to the User or any third party for any termination of the User's access to the Services.</li>
                                <li>ISnap reserves the right to immediately terminate this Agreement in cases where: (a) The User breaches any terms and conditions of this Agreement; (b) ISnap believes in its sole discretion that the User's actions may cause legal liability for such User or for ISnap or are contrary to the terms of use of the Services, or terms of this Agreement; and (c) ISnap deems fit for its convenience without providing any reason.</li>
                                <li>Once temporarily suspended, indefinitely suspended or terminated, the User shall not continue to use the Services under the same account, a different account or re-register under a new account, unless explicitly permitted by ISNAP.</li>
                              </ol>

                              <h5 className="mt-4">11. MISUSE OF THE SERVICES</h5>

                              <p>ISnap may restrict, suspend, or terminate the account of the User who abuses or misuses the Services. Misuse includes creating multiple or false profiles, infringing any Intellectual Property rights, violating any of the terms and conditions of this Agreement, or any other behavior that ISnap, in its sole discretion, deems contrary to its purpose. In addition, and without limiting the preceding, ISnap has adopted a policy of terminating accounts of Users who, in ISnap's sole discretion, are deemed to be repeat infringers of any terms of use even after being warned by it. In addition, ISnap may also restrict, deactivate, suspend, or terminate the account of the User upon the request/instructions of the ISnap courier partner.</p>

                              <h5 className="mt-4">12. GOVERNING LAW AND DISPUTE RESOLUTION</h5>

                              <ol>
                                <li>This Agreement shall be governed by the laws of India and subject to the clause below, the courts of Hyderabad shall have exclusive jurisdiction to determine any disputes arising out of, under, or in relation, to the provisions of this Agreement.</li>
                                <li>Any dispute arising under this Agreement shall be settled by arbitration to be held in Hyderabad following the procedure under the (Indian) Arbitration and Conciliation Act, 1996, in the English language, and shall be heard and determined by a sole arbitrator to be chosen as per applicable Law with respect to Arbitration in India.</li>
                              </ol>

                              <h5 className="mt-4">13. SEVERABILITY</h5>

                              <p>The invalidity or unenforceability of any provision in this Agreement shall in no way affect the validity or enforceability of any other provision herein. In the event of the invalidity or unenforceability of any provision of this Agreement, the Parties will immediately negotiate in good faith to replace such a provision with another, which is not prohibited or unenforceable and has, as far as possible, the same legal and commercial effect as that which it replaces.</p>

                              <h5 className="mt-4">14. FORCE MAJEURE</h5>

                              <ol>
                                <li>Neither Party shall be liable for any failure or delay in performance of any obligation, under this Agreement to the extent that such failure or delay is due to a Force Majeure Event. The Party having any such cause shall promptly notify the other Party about the nature of such cause and the expected delay.</li>
                                <li>If, however, it is not feasible for a Party to prevent the occurrence of the Force Majeure Event as a result of which that Party is prevented from performing its obligation for more than 30 (thirty) days due to such Force Majeure Event ("Aggrieved Party"), the other Party may decide to release the Aggrieved Party from performing its obligation hereunder or may modify the relevant provisions of this Agreement affected by the Force Majeure Event so long as the Force Majeure Event continues, in order to enable the Aggrieved Party to perform its other obligations hereunder as so modified. However, in the event, Force Majeure Event continues for a period of more than 60 (sixty) days, the Aggrieved Party may terminate this Agreement with a notice to the other Party.</li>
                              </ol>

                              <h5 className="mt-4">15. ENTIRE AGREEMENT, ASSIGNMENT AND SURVIVAL</h5>

                              <ol>
                                <li>This Agreement, the annexures and any other documents entered into or delivered as contemplated in this Agreement herein sets out the entire Agreement and understanding between the Parties with respect to the subject matter hereof. Unless otherwise decided by ISnap, the annexures containing specific terms of use supersedes all general terms of the Agreement, previous letters of intent, heads of terms, prior discussions, and correspondence between the Parties in connection with the Agreement referred to herein. Similarly, unless otherwise decided by ISnap, the SOPs/SLAs issued in furtherance of this Agreement shall supersede this Agreement's provisions and the annexures.</li>
                                <li>This Agreement and the rights and obligations herein shall not be assigned by the User, without the consent of ISnap.</li>
                                <li>The provisions which are, by their nature, intended to survive the termination of this Agreement shall survive the termination of this Agreement.</li>
                              </ol>

                              <h5 className="mt-4">16. NO PARTNERSHIP OR AGENCY</h5>

                              <p>Nothing in this Agreement (or any of the arrangements contemplated herein) shall be deemed to constitute a partnership between the Parties hereto, nor, except as may be expressly provided herein, constitute any Party as the agent of another Party for any purpose, or entitle any Party to commit or bind another Party in any manner.</p>

                              <h5 className="mt-4">17. WAIVERS AND REMEDIES</h5>

                              <p>No failure or delay by the Parties in exercising any right or remedy provided by law under or under this Agreement shall impair such right or remedy or operate or be construed as a waiver or variation of it or preclude its exercise at any subsequent time. No single or partial exercise of any such right or remedy shall preclude any other or further exercise of it or the exercise of any other right or remedy. The rights and remedies of the Parties under or pursuant to this Agreement are cumulative, may be exercised as often as such Party considers appropriate and are in addition to its rights and remedies under the general laws of India.</p>

                              <h5 className="mt-4">18. SPECIFIC PERFORMANCE</h5>

                              <p>The Parties shall be entitled to seek and enforce specific performance of this Agreement, in addition to any other legal rights and remedies, without the necessity of demonstrating the inadequacy of monetary damages.</p>

                              <h5 className="mt-4">19. INDIRECT AND CONSEQUENTIAL LOSSES</h5>

                              <p>Save as expressly provided otherwise in this Agreement, neither Party shall be liable under or in connection with this Agreement for any loss of income, loss of profits or loss of contracts, or for any indirect or consequential loss or damage of any kind, in each case howsoever arising and whether caused by tort (including negligence), breach of contract or otherwise.</p>

                              <h5 className="mt-4">20. CONTACT INFORMATION</h5>

                              <ol>
                                <li>If the User has any question, issue, complaint regarding any of the services of ISnap it shall contact its customer service at support@isnap.online The Email I.D. for communication of the User shall be the one registered by the User on the ISnap platform.</li>
                                <li>The User hereby agrees and provides its consent to receive communications, correspondences, updates, notifications, etc. from ISnap through Email, SMS, and any other mode as agreed by the Parties from time to time. The Parties agree that the said communications, correspondences, updates, notifications, etc., will be legally binding on them.</li>
                                <li>Notwithstanding anything provided contrary in this Agreement, the User hereby: (i) agrees that the User has voluntarily submitted the various KYC information and documents (including but not limited to Aadhaar card/OTP, PAN card, voter id, passport, driving license, GST certificate, income tax returns, entity details, etc.) and requisite information as required by ISNAP from time to time; (ii) provides his consent for verification of the information and documents submitted to ISnap in order to establish its genuineness in the manner permitted by applicable laws; and (iii) provides his consent and further authorizes ISnap to share his relevant details and documents (including but not limited to business/registered name(s), phone number(s), address(es), email-id(s), PAN card, bank account details, KYC documents, etc.) with the concerned entity for processing of insurance claims and with the concerned judicial authority, court, police, complainant, etc. (as the case may be) in the event of a complaint been filed against the User or dispute been raised in relation to the shipment(s) made by the User.</li>
                              </ol>

                              <h5 className="mt-4">21. DEFINITIONS AND INTERPRETATION</h5>

                              <h6>21.1 Definitions: In this Agreement, including in the recitals hereof, the following words, expressions, and abbreviations shall have the following meanings unless the context otherwise requires:</h6>

                              <p>"Confidential Information" means, with respect to each Party, any information or trade secrets, schedules, business plans including, without limitation, commercial information, financial projections, client information, administrative and/or organizational matters of a confidential/secret nature in whatever form which is acquired by, or disclosed to, the other Party pursuant to this Agreement, and includes any tangible or intangible non-public information that is marked or otherwise designated as 'confidential', 'proprietary', 'restricted', or with a similar designation by the disclosing Party at the time of its disclosure to the other Party, or is otherwise reasonably understood to be confidential by the circumstances surrounding its disclosure, but excludes information which: (i) is required to be disclosed in a judicial or administrative proceeding, or is otherwise requested or required to be disclosed pursuant to applicable law or regulation, and (ii) which at the time it is so acquired or disclosed, is already in the public domain or becomes so other than by reason of any breach or non-performance by the other Party of any of the provisions of this Agreement;</p>

                              <p>"Force Majeure Event" includes act of God, war, civil disturbance, act of terrorism, flood, fire, explosion, epidemic/pandemic or legislation or restriction by any government or other authority, or any other similar circumstance beyond the control of any Party, which has the effect of wholly or partially suspending the obligations hereunder of the Party concerned; and</p>

                              <p>"Intellectual Property" means any patent, copyright, trademark, trade name, service mark, service name, brand mark, brand name, logo, corporate name, domain name, industrial design, any registrations and pending applications thereof, any other intellectual property right (including without limitation any know-how, trade secret, trade right, formula, computer program, software, database and data right) and any goodwill associated with the business.</p>

                              <p>“Third-Party Carrier Partners”/ Third Party Courier Partner/ Third Party Delivery Partner: They are independent Third-Party Companies/firms/entities providing logistical delivery services for delivery of Products of the User to their End Customers. The Products to be delivered to the End Customers of the User will be handed over to the Third-Party Carrier Partners by the User.</p>

                              <p>“Manifest”: A Sheet created by ISnap in the Web Application from the details provided by User when creating an order. The Manifest can be downloaded by the User and kept with the User which contains the details of the Order which also serves as proof of order pickup which is signed by the delivery representative of the “Third Party Carrier Partner”/ Third Party Courier Partner/ Third Party Delivery Partner at the time of picking the Goods/Products from User.</p>

                              <p>End Customer: Are the Customers of the User for whom the User is Delivering the Goods/Products through the Third-Party Carrier Partners. ISnap Connects the Third-Party Carrier Partners and the Users with respect to Delivery of Goods to the End Customers of the Users through its Web Applications and performs various functions for the Users as defined in this agreement through the said Web Application.</p>

                              <h6>21.2 Interpretation: Unless the context of this Agreement otherwise requires:</h6>

                              <p>(a) Heading and bold typeface are only for convenience and shall be ignored for interpretation.</p>

                              <p>(b) Other terms may be defined elsewhere in the text of this Agreement and, unless otherwise indicated, shall have such meaning throughout this Agreement.</p>

                              <p>(c) References to this Agreement shall be deemed to include any amendments or modifications to this Agreement, as the case may be.</p>

                              <p>(d) The terms "hereof," "herein," "hereby," "hereto," and derivative or similar words refer to this entire Agreement or specified Clauses of this Agreement, as the case may be.</p>

                              <p>(e) References to a particular section, clause, paragraph, sub-paragraph or schedule, exhibit, or annexure shall be a reference to that section, clause, paragraph, sub-paragraph or schedule, exhibit, or annexure in or to this Agreement.</p>

                              <p>(f) Reference to any legislation or law or to any provision thereof shall include references to any such law as it may, after the date hereof, from time to time, be amended, supplemented, or re-enacted, and any relation to a statutory provision shall include any subordinate legislation made from time to time under that provision.</p>

                              <p>(g) A provision of this Agreement must not be interpreted against any Party solely on the ground that the Party was responsible for the preparation of this Agreement or that provision, and the doctrine of contra proferentem does not apply vis-à-vis this Agreement.</p>

                              <p>(h) References in the singular shall include references in the plural and vice versa; and</p>

                              <p>(i) References to the word "include" shall be construed without limitation.</p>

                              <h5 className="mt-4">22. B2B ORDER PROCESSING</h5>

                              <p>ISnap is currently processing B2B orders on a manual level ie; directly contacting the carrier partner and negotiating with them to deliver the sellers’ shipment when needed. ISnap responsibility and liability is only limited to its efforts in shipment allocation to a recognized shipping partner and enable tracking to the seller for the same shipment and is in no way responsible for damages or delays so caused by the shipping partner. ISnap will, to the best of its efforts, try to provide a transparent communication channel for both parties to settle any dispute but will not take ownership/responsibility of any issues regarding the shipment or goods being shipped.</p>

                              <p>As and who the offline B2B order booking is moved to the application, the liabilities remain the same although ISnap plans to increase communication and easier tracking process for the benefit of the seller. Regular updates shall be notified to the seller in application whenever needed. All other terms and conditions in the agreement to whatever extent applicable to B2B orders shall be applied to B2B orders.</p>

                              <h5 className="mt-4">ANNEXURE-A</h5>

                              <h6>ISnap Logistics’ Service Specifications</h6>

                              <h6>1. Scope of Services</h6>

                              <ol>
                                <li>ISnap is the author and owner of its logistics software and platform (ISnap Platform), providing its Users with an automated shipping panel integrated with the courier partners. The User agrees that ISnap provides logistic services (for both domestic and international (cross-national border) shipments), and it is the subcontracted logistic partners of ISnap who perform the actual pick-up and delivery of the freight.</li>
                                <li>The User agrees that the shipments shall be picked up by ISnap's logistics partner from the User's locations as communicated to ISnap at the time of your sign-up.</li>
                                <li>The User will be given a list of logistics partners (Third Party Carrier Partners) to choose from in the Application based on availability in different regions where the services under this Agreement are provided. The User may choose any one of the Third-Party Carrier Partners from the List so provided by ISnap Logistics.</li>
                                <li>After the picking/choosing of the Third-Party Carrier Partner/ Logistic Partner by the User a the tracking number would be assigned by an automated process based on the pick-up and delivery pin code and type of shipment.</li>
                                <li>User shall provide/display prominently on the package the shipping label having full details of the order number, consignee details, product details, return address, i.e., the shipping address, and the gross value and collectible value (net value) to be collected in case of COD (Cash on Delivery) shipments. The ISnap backend panel platform from ISnap shall enable the User to take a print of the shipping label with all the details, and the same shall be pasted on the package before the handover to the logistics partner happens.</li>
                                <li>The User shall agree that the shipment to be handed over to the logistic partner on behalf of ISnap is in a tamper-proof packing of their brand.</li>
                                <li>The User will be solely responsible for complying with all statutory requirements (State and Central Laws/Statutes) applicable concerning the booking and sale of the shipments carried and delivered by the logistics partners of ISnap in pursuance of this Agreement.</li>
                                <li>It is expressly understood by the Parties that ISnap is a mere service provider to the User and not in any other capacity whatsoever it may be called. It is further agreed by the Parties that ISnap is not performing any activity or job or providing service on behalf of the User, which is tantamount to the seller or retailer and or stockiest/distributor. The complete activity performed by ISnap under this Agreement is based on specific instructions given by the User as part of the scope defined and from time to time.</li>
                                <li>ISnap reserves the right to provide web-based (online) tracking solutions for all shipments through its logistics partners/Third Partner Delivery Partners.</li>
                                <li>User agrees that ISnap 's logistics partner, when receiving the shipments from the User, will use 'Air Waybill' provided to them through its logistics management software ISnap. It is always agreed between the Parties hereto that for ISnap and its logistics partner, the 'Consignor/ Shipper' in the 'Air Waybill' shall be the User who is shipping the goods. It is clearly understood that ISnap 's liability, if any, and to the extent agreed herein, shall extend only to the User. The User shall be fully liable to its customers, and neither ISnap nor their logistics partners shall have any direct or indirect connection/ relationship or responsibility/obligation to the User's customers in any manner whatsoever.</li>
                                <li>The User hereby agrees that it shall: (a) Not (directly or indirectly) use ISnap's Services/ ISnap platform while being in the capacity of a reseller, OTC (over the counter), or franchisee of any courier/logistics company, including and not limited to that of Bluedart, Delhivery, Ecom Express, Xpressbees, Shadowfax, DTDC, Amazon Shipping, etc. (b) Use the courier company account/services through ISnap platform only for e-commerce sales- related transactions; and (c) The user understands that ISnap is not authorized to solicit existing active customers of the service provider.</li>
                                <li>The User confirms that the User is fully aware of the items prohibited on ISnap or ISnap 's logistics partner network for carriage and undertakes that no such prohibited items of shipment shall be handed over to ISnap 's logistics partners for carriage by its customers.</li>
                                <li>In the event, ISnap believes that the User has breached any of the above provisions. In that case, ISnap would inter-alia have the right to deactivate the ISnap account, retain the custody of (and subsequently dispose within 30 days of retention) the shipments and to levy damages/charges (along with the applicable GST amount and freight charges) of ₹ 100000/- per incident/shipment or of such other amount as decided by ISnap in its sole discretion.</li>
                              </ol>

                              <h6 className="mt-4">2. The obligation of the User</h6>

                              <ol>
                                <li>It is agreed that the User shall be responsible for proper tamper proof and damage-proof packing of the products.</li>
                                <li>It is agreed that the User shall use good quality tapes, duly engraved with your trademark/name, etc., and not generic tapes (i.e., brown/plain/transparent tape) for the packaging/sealing of the goods/shipments. In case generic tapes are used in the packaging/sealing of the goods/shipments, ISnap shall have no responsibility of any kind in case of pilferage/damage/alteration/tapering/leakage, etc. of the goods/shipments. In such a scenario, the entire responsibility shall be of the User.</li>
                                <li>User shall be ready with the packed order when the courier person comes to receive the shipment, all pick-ups should be logged before the cut-off time as directed by the customer support team of ISnap, and no pick-up beyond the cut-off time of the logistics partner shall be possible. The User agrees that they shall contact the Courier Company personnel for the pick-up arrangements.</li>
                                <li>The User shall collect receipt(s) of the signed copy of the manifest; it is the proof of shipment handover to the courier companies. If the user does not have a signed copy of the Manifest he shall not be entitled to make any claim against the Third Party Carrier Partner.</li>
                                <li>The User shall strictly only use the automated system for generating the pick-up and move the shipment only on the Airway Bill number generated from the ISnap administration panel provided during sign-up by the User for shipping services. If the User moves the freight through the physical shipping docket or airway bill number – then damages of ₹ 1500 (Indian Rupees one thousand five hundred) shall be charged per airway bill number issued.</li>
                                <li>In addition, the User shall not book/ship two or more shipments against a single AWB number or send multi-packet shipments. Any breach of this condition by the User (whether intentional breach or not) shall give the right to ISnap to claim the concerned expenses (including the freight amount of all the shipments) and liquidated damages of up to ₹10000 (Indian Rupees ten thousand) per incident/shipment (and applicable GST amount) from the User. However, this restriction shall not be applicable if the User has activated MPS (multi packet shipments) services with ISnap.</li>
                                <li>The User should insert the invoice in the package/shipment before handing over the cargo to the logistic partner. The said invoice shall comply with all the applicable laws (including GST-related rules and regulations).</li>
                                <li>The User agrees that Delivery Partners/Third Party Carrier Partners are available for only locations which are accessible to the said Delivery Partners/Third Party Carrier Partners and that ISnap Logistics has always right to refuse booking in case the said location requested for booking is not available or inaccessible.</li>
                                <li>User shall agree that in case of a reverse pick up of orders, it shall be your responsibility, in case a reverse pick up is requested by the User, the same shall be charged additionally as per the then prevailing rates.</li>
                                <li>User hereby agrees that it will not book / handover any good/shipment which is banned, restricted, illegal, prohibited, stolen, or infringing of any third party rights, or which contains any cash, jewelry (excluding artificial jewelry), gold, silver, diamond, platinum, precious metals, precious stones, currency, bullion, financial and security instruments, or any reactive, hazardous or dangerous items/goods which are in breach of any applicable law or of any packaging/transportation guidelines of the concerned courier partner; in which cases ISnap shall not be liable for the delivery of any such products. Without prejudice to the generality of the aforesaid, an indicative list of the dangerous and restrictive goods is given in Annexure-B.</li>
                                <li>In the event User hands over or provides the aforesaid goods/shipments to ISnap/its courier partner, then ISnap/its courier partner shall not be responsible and liable for any loss, damage, theft, or misappropriation of such products even if the service provider or delivery personnel knows the same and even if such loss, damage, theft or misappropriation is caused due to any reason attributable to the service provider or delivery personnel. The User undertakes that in the event any article/good/shipment booked/handed over by it falls within the category of the banned/illegal items or those described above (including reactive, hazardous, and dangerous goods which are in breach of any applicable law or of any packaging/transportation guidelines of the concerned courier partner), then the User agrees to indemnify ISnap and its courier partner for any and all issues, losses, and damages arising pursuant thereto. In addition, ISnap would inter-alia have the right to retain the custody of (and subsequently dispose within 30 days of retention) such shipments (including opening, inspecting and subsequently disposing of shipments within 30 days of retention) and to levy damages/charges (along with the applicable GST amount and freight charges) of ₹ 1,50,000 (Indian Rupees one lakh fifty thousand) per incident/shipment or of such other amount as decided by ISnap in its sole discretion.</li>
                                <li>User understands, agrees, and acknowledges that the Logistic Partners/Third Party Carriers of ISnap will only be delivering the goods as per instructions of the User based on location given in the Application. ISnap shall not be liable for any damages caused to the goods when they are in the possession of the Third Party Carrier Partners/Logistic Partners. ISnap is not an insurer of the goods. The User hereby expressly and specifically waives all its rights and claims against ISnap and its logistics partners arising out of or in relation to the principles of insurance.</li>
                                <li>User shall be ready with the packed order when the courier person comes to receive the shipment, all pick-ups should be logged before the cut-off time as directed by the customer support team of ISnap, and no pick-up beyond the cut-off time of the logistics partner shall be possible. The User agrees that they shall contact the Courier Company personnel for the pick-up arrangements.</li>
                                <li>In case of damaged/pilferage/tempered/pressed/leaked shipment, the receiver shall mention negative remarks on the POD (Proof of Delivery) copy to get a claim for the shipment. However, in the absence of any negative remarks on the POD (Proof of Delivery) copy clearly stating such damage/pilferage/tampering/pressing/leakage, no claim shall be entertained by ISnap at any time.</li>
                                <li>Claims for any kind of damage/pilferage/tampering/leakage of the booked articles/goods/shipment shall be entertained only if the outer packaging done by the shipper/Third Party Courier Partner is damaged/altered/tampered. However, if the outer packaging done by the shipper is intact and not tampered with, in such a case, no claim(s) for any damage/pilferage/tampering/leakage shall be entertained by ISnap.</li>
                                <li>ISnap shall not entertain any dispute(s) regarding damage/pilferage/tampering/leakage/non-receipt of delivery/fake delivery shall be considered by ISnap after 48 hours from the receipt/delivery of the said article/goods/shipment. Further, ISnap shall not entertain any request for providing the POD of a load after 72 hours from the delivery/RTO of the shipment.</li>
                                <li>The User shall ensure that the correct and complete description of the destination/address, as well as all the relevant information/details and documents (including but not limited to the e-way bill number and valid GST invoice), are mentioned/provided by the User while booking/handing over a shipment. In case any incomplete/incorrect information or documents are provided by the User, the load may be returned from the origin, and the shipping charges (both forward and RTO charges) shall be levied, in addition to any damages/taxes imposed by the statutory authorities, if any, in the transit of such shipment. Such charges shall be irreversible, and no claim for the return of such costs shall be entertained by ISNAP. Further, in case of breach of this clause, ISnap would inter-alia have the right to levy damages/charges (along with the applicable GST amount) on the User of ₹ 1,00,000 (Indian Rupees One Lakh only) per shipment or of such other amount as decided by ISnap in its sole discretion.</li>
                                <li>For orders having a monetary value of Rs.50,000/- and above, the Government of India mandates sellers/User to maintain an eWay Bill corresponding to the order and is to be created in the government website as per given guidelines. This eWay Bill must contain essential details like seller and recipient addresses, Invoice ID, product category, and more. In the ISnap application, an e-way bill is mandatory for shipments valued at Rs.50,000/- and above. Once uploaded and entered into the application by the seller/User/Client it will be transmitted to the respective carrier partners managing the shipment. ISnap bears no responsibility for the e-Way bill, including any complications arising from incorrect data or transportation issues related to it. While ISnap will provide support in case of complications and offer necessary details, it remains the sole responsibility of the seller/User to resolve any issues regarding the eWay Bill as it is the Sellers/User responsibility to upload the E-way Bill.</li>
                              </ol>

                              <h6 className="mt-4">3. Fees</h6>

                              <ol>
                                <li>The User hereby agrees that the applicable shipping rate will be charged as per the current prevailing rate mentioned on the live calculator link in the User’s admin panel.</li>
                                <li>ISnap reserves the right to apply other applicable charges over and above the shipping base rates, and ISnap service charges like COD charges and other fees are as on the live calculator link in the User’s admin panel.</li>
                                <li>ISnap has the right to change the rate mentioned on the live calculator link in the User’s admin panel and prevailing.</li>
                                <li>Goods and Service tax and other taxes are applicable as per taxation law.</li>
                                <li>Volumetric weight is calculated at LxBxH/5000 for all courier companies except for Ecom express EGS(LxBxH/4500) and DTDC 7G cargo (LxBxH/4750). Length, breadth, height must be taken in Centimeters and divided by denominator, this will give the value in Kilograms. For B2B orders, volumetric weight is calculated as L*B*H (in cms)/ 27000 or L*B*H (in inches) /1728. The value so obtained is to be multiplied with the maximum weight allotted for 1 Cubic Feet as per the courier partner. If applicable, other charges like address correction charges shall be charged extra. Dead/Dry weight or volumetric weight, whichever is higher, should be taken while calculating the rates.</li>
                                <li>In case the declared weight differs and is less than the actual weight, then shipping charges will be revised to the actual weight. You will be notified regarding such discrepancy in the weight (on the dashboard or through email) and will be given 7 (seven) working days' notice to either accept or reject the updated weight. In the event you accept the updated weight, the same will get billed, and if you reject the updated weight, the same will not get billed until the matter is rectified/resolved. Further, if you do not accept or reject the updated weight, the same will be auto accepted in 7 (seven) working days. 'Working Days' in this clause shall mean days on which ISnap is open for business, other than Saturday, Sunday, and days declared by ISnap as holidays.</li>
                                <li>Save as otherwise agreed by the Parties, remittance of the COD amounts to the User shall be done within 7 (Seven Days) days from the delivery date of the concerned shipment, subject to the remittance cycle being followed by ISnap, which at present is remittance on every Thursday.</li>
                                <li>In case the COD amount is already remitted to the User due to the wrong status (delivered) updated by the courier partner, the same amount shall be deducted from future COD payments. Further, in the event ISnap cannot remit the COD amount to the User within 365 days from the due date due to any reason not attributable to ISnap (including incorrect bank details provided by the User). The User hereby agrees to waive all its rights and claims against ISnap and its logistics partners arising out of or concerning non-payment of the COD amount, and ISnap shall have an unconditional right to forfeit such unclaimed COD amount after the expiry of said 365 days.</li>
                                <li>Any queries in relation to COD remittance should be raised as a ticket on support@isnap.online</li>
                                <li>For any claims by the User, the signed copy of the manifest sheet of the pick-up against which the courier company has received the shipment has to be submitted along with the claim request. Without the signed manifest, the request shall not be considered valid.</li>
                                <li>Said To Contain Basis & Inspection: It is expressly understood by and between the Parties that all products agreed to be delivered by ISnap or its logistics partners are on "SAID TO CONTAIN BASIS," i.e., ISnap or its logistics partners shall be under no obligation and is not expected to verify the description and contents of the products declared by the User on the docket, and as such, the User shall undertake and ensure to make a proper, true, fair, correct and factual declaration on the docket regarding description and value of products/shipments (including the value of the shipments which are pre-paid/replacement/gift shipment). Further, ISNAP is not responsible in any way whatsoever for the merchantability of the products.</li>
                                <li>That the User shall indemnify ISnap against all claims of End Customers with respect wrong description of products delivered or missing products in the packages delivered by the Third Party Carrier Delivery Partner.</li>
                                <li>ISnap is now enabling sellers without a GST to register and place orders in the carrier aggregator application. For safety and security purposes, the seller is required to provide a scanned copy of their Aadhar card and PAN card and a photo recording (will be done in application) of the same person as provided in the IDs. Seller/User isrequired to adhere to all the guidelines as mentioned in the document except the ones pertaining to GST and DO NOT SELL any prohibited and restricted items as mentioned in the appendix. Since the seller is selling without GST, some delivery partners may not be committed to receiving your orders so it is to be noted that these sellers will not be able to access the complete ISnap services and features. However, if GST is applicable to the seller/User, they are obligated to register with GST and ISnap shall not be responsible if the seller does not register with the GST.</li>
                              </ol>

                              <h6 className="mt-4">4. Terms of Payment for Pre-paid Accounts</h6>

                              <ol>
                                <li>The User shall agree to deposit an amount in their respective account/Wallet to use our Services as per the pre-paid model. Clause 4 shall be applicable only in the case of pre-paid accounts. User agrees to recharge their account/Wallet by clicking on "Recharge Wallet" and choosing the amount according to their business needs; you can use this amount to ship products/orders/goods through air and surface.</li>
                                <li>ISnap reserves the right to activate User’s account once the User has topped up its recharge wallet with an initial Recharge Amount.</li>
                                <li>The User shall agree that the shipment weight will automatically get deducted from your credit weight. As per the norms of ISnap Logistics, you will be charged a minimum of 0.5 kgs (or in multiples) for your air shipping. Please note that the weight charges applied by the courier companies may differ, but such payments shall be adjusted in/from your ISnap wallet limit on your ISnap account after picking up the shipment.</li>
                                <li>ISnap shall issue an invoice which will get auto adjusted (if applicable) against the credit in User’s account/Wallet as the following conditions:</li>
                              </ol>

                              <p>(i) If the invoice amount is more than the credit in your account</p>

                              <p>The User shall agree that if the invoice amount is more than the credit in your account/Wallet, the freight invoice will be marked as unpaid. User fails to pay the invoice, the shipping will be suspended. To continue using ISnap Services, you need to recharge your account for the unpaid invoice as well as the new shipping limit.</p>

                              <p>(ii) If the invoice amount is less than the credit in your account</p>

                              <p>The User shall agree that if the invoice amount raised is less than the credit in your account/Wallet, the freight invoice amount will automatically be adjusted from your credit Wallet Balance (if not already adjusted) and marked as paid. The User shall then continue using ISnap Services from the remaining credit amount. If, as on the date of issuance of the invoice, the freight invoice amount has already been adjusted from the credit in your account, the invoice shall be generated with marked as paid.</p>

                              <ol start="5">
                                <li>The User shall agree that it will be your responsibility to verify the invoices and inform the ISnap within 5 (five) working days in case of any disputes regarding the contents of the invoice.</li>
                                <li>For any claims by the User like wrong freight being applied, Cash on Delivery missing, pilferage, in- transit damage - the signed copy of the manifest sheet of the pickup against which the courier company has received the shipment has to be submitted along with the claim request. Without the signed manifest, the request shall not be considered valid.</li>
                                <li>If for any reason (including but not limited to the reason of weight discrepancy), the balance amount of the User in the ISnap wallet becomes negative, then ISNAP shall inter-alia have the right to hold/retain/adjust the COD Amounts for the shipments of the User.</li>
                                <li>The credit balance amount in the ISnap wallet shall be available for booking shipments only 2 years from the last shipment date. However, if the User does not book any shipment for a continuous period of 2 years. ISNAP shall have an unconditional right to forfeit such credit balance in the ISnap wallet after the expiry of 2 years from the last shipment date.</li>
                                <li>The User can request ISnap to refund the credit balance of the wallet. Any such refund request shall be subject to a refund being made to the source/mode of payment, standard time taken to process such a refund, and mandatorily providing of necessary KYC documents by the User to process the refund. Further, ISnap reserves a right to (i) deny any request to refund the credit balance to a source that is different from the source/mode of payment; (ii) levy a surcharge (as per its sole discretion) to refund the credit balance to a source being different from the source/mode of payment; and/or (iii) levy appropriate damages/charges (as per its sole discretion) in case ISnap believes that the wallet is being/has been used by the User for any unscrupulous/illegal activities or for purposes other than for payment to ISnap.</li>
                              </ol>

                              <h6 className="mt-4">5. Returns/RTO of the Products</h6>

                              <ol>
                                <li>ISnap reserves the right to return to the User the products/shipments that the customer does not accept for any reason whatsoever.</li>
                                <li>ISnap reserves the right to apply the RTO (return to origin) charges per the prevailing rate mentioned on the live calculator link in the User admin panel.</li>
                                <li>You will ensure that such products are accepted at the location(s) specified by you and share the Airway bill number against which the shipment is returned to the User.</li>
                                <li>In case of non-acceptance of the RTO shipment by the User or in case the User is not reachable for RTO shipment, ISnap reserves the right to levy reasonable demurrage/incidental charges for extended storage of such products for any period exceeding 10 business days from initiation of the returns and up to 60 days from such date. Furthermore, in case of non-acceptance of the products beyond 14 (fourteen) days from the first RTO undelivered date/first RTO delivery attempt date, ISnap has the right to dispose of such products. Accordingly, the User will forfeit all claims in this regard towards ISnap. The User will be required to pay charges for disposing of the product and all other charges (including demurrage/incidental charges). Further, in such a case, ISnap shall inter-alia have the right to: (a) retain (and subsequently adjust the outstanding amounts/charges within 60 days of retention from) the COD Amounts of the defaulting User; and/or (b) retain the custody of (and subsequently dispose within 60 days of retention) the shipments of the defaulting the User which have ISnap Logistics partner(s); and/or (c) forfeit the security deposit amount of the defaulting User (if any) lying with ISnap.</li>
                              </ol>

                              <h6 className="mt-4">6. Reverse Pick-ups</h6>

                              <ol>
                                <li>"Reverse Pick-up" means a collection of the products by ISnap from the customer's address as specified by the User and the delivery of such products at a location mutually agreed between the Parties.</li>
                                <li>User shall agree that in case of a reverse pick up of orders, it shall be your responsibility, in case a reverse pick up is requested by the User, the same shall be charged additionally as per the then prevailing rates.</li>
                                <li>ISnap and ISnap's logistics partners shall not be responsible for verifying the contents of the products handed over by the customer to it delivery personnel (i.e. (i) RTO (Return to Origin) shipment (viz. The shipment which is returned in the same condition as originally dispatched by the User) and; (ii) closed box reverse pick-up shipment (viz. shipment which is opened and subsequently packed by the customer)) handed over by the customer, except in the case of open box reverse pick-up shipments. The packaging of such products shall also be the customer's sole responsibility. The packaging should be good enough to ensure no damage in transit. The sole responsibility of the contents of the packed consignment shall lie with the end customer. ISnap and ISnap's logistics partners shall be, in no way, responsible for any shortage or damage of such consignments unless the same is caused solely due to the gross negligence of ISnap.</li>
                              </ol>

                              <h6 className="mt-4">7. Liability for "Forward Delivery"</h6>

                              <ol>
                                <li>The Delivery and handling of goods as mentioned in this Agreement shall be done by independent Reputed Third Party Carrier/Courier Partners. ISnap only connects the User to the said Third Party Carrier Partners through the. ISnap shall not be liable for any Claims by the User under this Agreement for reasons which include but not limited to damage, loss, theft, etc, of the products/Goods. The Third Party Carrier/Courier Partners shall have their own terms and conditions which such claims and they shall liable subject to their terms and conditions and ISnap shall assist in escalating and assisting the Users in communicating any such claims against Third Party Carrier Partners and refunds or damages given to the Users by the Third Party Carrier Partners shall be transferred to the User by ISnap. However ISnap shall not fund any litigation against the Third Delivery Carrier/Courier Partners if the User chooses to do so it shall do it at its own cost and convenience.</li>
                                <li>Any Claim made by the User against the Third Party Carrier/Courier Partner shall be raised within the timelines specified under this Agreement and, in any event, not later than 21 days from the shipment pick up date - failing which the User forfeits and waves its rights for such claim. Any claims by the User should be submitted within the specified time period along with a copy of the signed shipping manifest.</li>
                                <li>In relation to the above, it is clarified that: An refund amount to be transferred to the End Customer by the User shall be done directly from the Account of the User by the User and ISnap or its Web Application shall have no role in refund of the said price paid for the products or any refund amount to be paid by the User to the End Customer.</li>
                                <li>The User agrees that all claims relating to: (i) damage/pilferage/tampering/leakage/fake delivery of the shipment must be notified to ISnap in writing within 48 hours of the delivery of shipment; and (ii) loss/theft of the shipment must be notified to ISnap in writing within 2 days of the shipment pick-up date.</li>
                                <li>It is hereby informed and agreed that ISnap and/or its courier partner(s) shall not be responsible for any damage to the shipments which include liquid or fragile items/products (including but not limited to liquid cosmetic, beauty products, perishable and glass items).</li>
                              </ol>

                              <h6 className="mt-4">8. Termination</h6>

                              <p>ISnap services stay active till 15 (Fifteen) days from the date of the last unpaid invoice. The User shall be charged for the period for which the invoice has been raised. The User must request termination before the next billing cycle starts and/or the next invoice is generated, or the cancelation request does not count. There is no pro-rated refund for the remaining service period in the current billing cycle.</p>

                              <p>The customer can request the termination by email to support@isnap.online with the following information:</p>

                              <p>o name of the User;</p>
                              <p>o name of the store & Company ID; and</p>
                              <p>o reason for termination.</p>

                              <h6 className="mt-4">9. Logistic Companies:</h6>

                              <p>Other Logistic Companies which specifically deal in the delivery of goods to end customers may use the ISnap Application for Delivery, it may be noted that the same terms and conditions apply to the Logistics Companies and they shall be treated as a User under the this Agreement and their respective End Customers shall not have special contractual relationship or special privileges with ISnap and shall be bound by the same terms and conditions as given in this Agreement herein.</p>

                              <h5 className="mt-4">ANNEXURE-B</h5>

                              <p>You shall not, directly or indirectly, offer or attempt to offer or trade or attempt to trade in any item, the dealing of which is prohibited or restricted in any manner under the provisions of any applicable law, rule, regulation or guideline for the time being in force.</p>

                              <p>Without prejudice to the generality of the above, ISnap does not permit hosting / selling / shipping of following items:</p>

                              <ol>
                                <li>“Securities” within the meaning of the Securities Contract Regulation Act, 1956, including shares, bonds, debentures, etc. and / or any other financial instruments / assets of any description.</li>
                                <li>Living, dead creatures and / or the whole or any part of any animal which has been kept or preserved by any means whether artificial or natural including rugs, skins, specimens of animals, antlers, horns, hair, feathers, nails, teeth, musk, eggs, nests, other animal products of any description the sale and purchase of which is prevented or restricted in any manner by applicable laws (including those prohibited under The Wildlife Protection Act, 1972).</li>
                                <li>Weapons of any description.</li>
                                <li>Liquor, tobacco products, drugs, psychotropic substances, narcotics, intoxicants of any description, medicines, palliative / curative substances.</li>
                                <li>Religious items, including books, artifacts, etc. of any description or any other such item which is likely to affect the religious sentiments of any person.</li>
                                <li>“Antiquities” and “Art Treasures” in violation of the provisions of the Antiquities and Art Treasures Act, 1972(“the Act”).</li>
                                <li>Used cellular phone SIM Cards.</li>
                                <li>Furthermore, you agree to display and adhere to a term of use or other user-type agreement, as well as a privacy policy, governing Your operation of your Store and your conduct with your Store’s customers.</li>
                              </ol>

                              <h6>Dangerous Goods:</h6>

                              <ol>
                                <li>Oil-based paint and thinners (flammable liquids)</li>
                                <li>Industrial solvents</li>
                                <li>Insecticides, garden chemicals (fertilizers, poisons)</li>
                                <li>Lithium batteries</li>
                                <li>Magnetized materials</li>
                                <li>Machinery (chain saws, outboard engines containing fuel or that have contained fuel)</li>
                                <li>Fuel for camp stoves, lanterns, torches or heating elements</li>
                                <li>Automobile batteries</li>
                                <li>Infectious substances</li>
                                <li>Any compound, liquid or gas that has toxic characteristics</li>
                                <li>Bleach</li>
                                <li>Flammable adhesives</li>
                                <li>Arms and ammunitions (including air guns)</li>
                                <li>Dry ice (Carbon Dioxide, Solid)</li>
                                <li>Any Aerosols, liquids and/or powders or any other flammable substances classified as Dangerous Goods for transport by Air</li>
                              </ol>

                              <h6>Restricted Items:</h6>

                              <ol>
                                <li>Precious stones, gems and jewelry</li>
                                <li>Uncrossed (bearer) drafts / cheque, currency and coins</li>
                                <li>Poison</li>
                                <li>Firearms, explosives and military equipment.</li>
                                <li>Hazardous and radioactive material</li>
                                <li>Foodstuff and liquor</li>
                              </ol>

                              <h6>Counterfeit or Fraud Products/Shipments:</h6>

                              <p>It is the policy of ISnap to conduct all business activities in compliance with the rules and regulations applicable to the industry and laws of India, with the highest ethical standards. In this regard, ISnap has a zero-tolerance policy concerning counterfeit or fraudulent products/shipments (including products/shipments which are misrepresented in their origin or quality, or which are fake, cloned, duplicate or likewise products/shipments).</p>

                              <p>Accordingly, in the event ISnap believes that you or any of your customers are shipping/selling (or have shipped) counterfeit or fraud product/shipment (including any fake electronic product, not limited to mobile phones, smartwatches, and likewise products), ISnap would inter-alia have the right:</p>

                              <p>a) to seize such product/shipment,</p>
                              <p>b) to report the incident to the appropriate government authority/police station,</p>
                              <p>c) to blacklist, you/your customer from trading/doing business with ISnap,</p>
                              <p>d) to sue for damages and loss caused to ISnap due to the Shipping of the said counterfeit/fraud shipment (counterfeit/fraud shipment to be decided by ISnap at its sole discretion).</p>
                              <p>e) to levy liquidated damages of up to ₹ 50,000/- (and applicable GST amount on said damages) on you/your customer (amount to be decided by ISnap at its sole discretion) on account of causing reputational and goodwill loss to ISnap,</p>
                              <p>f) to block/retain/adjust the entire COD amount of yours/your customer lying with ISnap/its courier partner,</p>
                              <p>g) to seize all the products of yours/your customer lying with ISnap/its courier partner and also to dispose such products (without any intimation to you) after a period of 21 days from the date of seizure: and/or</p>
                              <p>h) to forfeit the entire security deposit amount lying with ISnap.</p>

                              <h6>Disputed Shipments/Cases:</h6>

                              <p>ISnap, in its sole discretion, shall have the right to levy damages/charges (along with the applicable GST amount) on you in relation to shipments/cases which have been disputed by the courier companies, your customers or by any third party (including any governmental authority/department). The amount of said damages/charges shall be decided by ISnap in its sole discretion and may vary from case to case.</p>

                              <h6>Shipping Non-Essential Items in Government Prohibited Areas</h6>

                              <p>In the event ISnap believes that you are shipping (or have shipped) non-essential items/products in the restricted/prohibited area (such as red and containment zone/area, as declared by the Central or the relevant State Governments of India), then ISnap would inter-alia have the right to levy penalty or liquidated damages on you of ₹ 5000/- per shipment (along with applicable GST amount) on account of estimated legal expenses which will be spent by ISnap and for causing of reputational and goodwill loss to ISnap, or the actual damages/losses/expenses in case the actual amount exceeds the above minimum threshold of ₹ 5000/-, as may be determined at the sole discretion of ISnap.</p>

                              <h5 className="mt-4">ANNEXURE-C</h5>

                              <h6>Terms & Conditions of International Shipments</h6>

                              <p>A. Proof of Delivery: No proof of delivery will be provided in case of international shipments. The final status shared by ISnap will be considered as the terminal status. No investigation based on proof of delivery will be entertained.</p>

                              <p>B. Returns: There is no provision for Returns in international shipments. Undelivered shipments will be disposed of after a certain cut-off time, as decided by ISnap.</p>

                              <p>C. Delivery: In some cases, there will be chances that physical delivery to the buyer won't be possible, shipment will be delivered in an open porch/mailbox, or the buyer has to do self-collection from the access pick-up point of the carrier, and these cases will be closed as delivered on the system.</p>

                              <p>D. Cash on Delivery: The cash Delivery facility is unavailable for international shipments. The seller has to provide an alternate on case-to-case basis in aid of clearing the shipment in a manner to close them. In the absence of a revert and hold limit, cross shipment will be destroyed, and all charges will be billed to the seller's account if applicable.</p>

                              <p>E. Liability: ISnap will not be liable for any loss or damage to any shipment as the same is being handled by Third Party Courier Partners and said Shipping will be governed by the Rules and Regulations as set forth by the Third-Party Courier Partners.</p>

                              <p>F. Packaging: The packaging of the User documents of goods for transportation is the User's sole responsibility, including placing the goods or documents in any container which the User may supply to ISnap. ISnap accepts no responsibility for loss or damage to the papers or goods due to improper packaging.</p>

                              <p>G. Negligence: The User will be responsible for all losses to the shipments due to failure to comply with its obligations.</p>

                              <p>H. Charges: The User will be liable to pay all charges – customs, airport fees, and surcharges that is incurred by ISnap in the process of enabling the movement of the User's shipment.</p>

                              <p>I. Miscellaneous: In addition to the above, ISnap shall have a right to add/modify the SOPs and SLAs as per its courier/logistic partner's requirements to the User (from time to time), which the User shall strictly follow. To avoid doubt, it is clarified that the referred SOPs and SLAs shall form an integral part of this Agreement, and any breach thereof will be construed as a breach of this Agreement.</p>

                              <h5 className="mt-4">In Witness whereof both the parties have signed on this Agreement on this the 6th day, of October 2024 without any force, coercion or undue influence and out of their own free will and consent in the presence of the following witnesses:</h5>

                              <p>FIRST PARTY</p>

                              <p>SECOND PARTY</p>

                              <h5>WITNESSES:</h5>

                              <p>1. Name s/o, Age, Occ, Residence Adhaar No.</p>

                              <p>2. Name s/o, Age, Occ, Residence Adhaar No.</p>


                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Market Place */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingMarket">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseMarket"
                        aria-expanded="false"
                        aria-controls="collapseMarket"
                      >
                        Market Place
                      </button>
                    </h2>
                    <div
                      id="collapseMarket"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingMarket"
                      data-bs-parent="#mouAccordion"
                    >
                      <div className="accordion-body">
                        {/*Market Place Agreement Content */}
                        <div className="container-fluid bg-white mt-3 py-3">
                          <div className="row px-4">
                            <div className="col-lg-12">
                              <h3 className="text-dark mb-4 text-center">
                                MARKETPLACE TECHNICAL SUPPORT AND SERVICE AGREEMENT
                              </h3>

                              <p><strong>THIS TECHNICAL SUPPORT AND SERVICE AGREEMENT</strong> (“Agreement”) is made and entered into on this day of August, 2025 (“Effective Date”);</p>

                              <p><strong>BY AND BETWEEN</strong></p>

                              <p>
                                <strong>MORANDI COLORS PRIVATE LIMITED</strong> (GSTN: 36AAQCM6357H1ZX), H NO 20-3, H-81, Sri Nivas Height, ADARSH NAGAR, UPPAL, Hyderabad, Medchal Malkajgiri, Telangana, 500039 India. (hereinafter referred to as, “Seller” which expression shall, unless repugnant to the context or meaning thereof, be deemed to include its successors and permitted assigns) of the First Part;
                              </p>

                              <p><strong>AND</strong></p>

                              <p>
                                <strong>ISNAP ONLINE PRIVATE LIMITED</strong> (36AAHCI4640J1ZF), a company incorporated under the Companies Act, 2013 having its registered office at PLOT NO 90/3, GUTTALA BEGUMPET, PHASE 3, KAVURI HILLS, HYDERABAD, TELANGANA, INDIA – 500081. (hereinafter referred to as, “Technical Supporter/Service Provider'' which expression shall, unless repugnant to the context or meaning thereof, be deemed to include its successors and assigns) of the Second Part;
                              </p>

                              <p>(Technical Supporter and Seller are collectively referred to as the Parties and individually as the Party wherever the context so requires.)</p>

                              <h5>WHEREAS:</h5>
                              <p>
                                A. Seller is in the business of exhibiting, advertising, marketing, trading and selling of several products to its customers (Buyers) and it is now desirous of exhibiting, advertising, marketing, selling and distribution of its products through the online ecommerce website/marketplace such as Amazon, Flipkart, Etc. which acts as an online platform/marketplace for different sellers to sell their products and for different buyers to access a variety of products.
                              </p>
                              <p>
                                B. Technical Supporter has the capability of providing technical support to various sellers in managing their portfolio on the e-commerce marketplace on the behalf of the seller. Technical Supporter is also having a good knowledge of e-commerce business, computer, internet and Seller onboarding process and post onboarding process;
                              </p>
                              <p>
                                C. In view of the above background, Seller has approached the Technical Supporter to provide it the technical support as mentioned herein below in “Services”.
                              </p>
                              <p>
                                D. Technical Supporter has accepted the request of the Seller and is ready to provide the Services to the Seller.
                              </p>

                              <p>
                                <strong>IT IS HEREBY AGREED BY AND BETWEEN THE PARTIES HERETO AND THIS AGREEMENT WITNESSETH AS UNDER:</strong>
                              </p>

                              <h5>1. SERVICES</h5>
                              <p>The Technical Supporter shall provide the following services (collectively referred to as “Services”) to the Seller:</p>
                              <ol>
                                <li>Assist the Seller to launch the business on the Marketplace wherever needed</li>
                                <li>Assist the Seller end-to-end in listing/uploading the products on the marketplace (images and content to be provided by the Seller);</li>
                                <li>Inventory updates and pricing updates are to be done by the Seller, if the Technical Supporter team is expected to do the same, the Seller has to give inputs in writing or via email from the registered email address or such other communication mode based on which the updates will be done.</li>
                                <li>Promotions participation in close coordination with the category teams for all those categories dealing with currently or in the future</li>
                                <li>Assist the Seller to deliver the goods/ products to Buyer/ customer through the mode and means accepted/ adopted by the seller which is acceptable mode and means of delivery for the transaction done on the marketplace.</li>
                                <li>Support in planning and executing paid promotions in close coordination with the category team – choice of banners, analysis of performance, ROI etc</li>
                                <li>Give inputs for assortment planning, portfolio analysis etc.</li>
                                <li>Payment reconciliation report Monthly basis.</li>
                                <li>Return reconciliation report Monthly basis.</li>
                              </ol>

                              <p>Seller agrees that the role of Technical Supporter is limited to provide Technical and IT support to enable Seller to exhibit, advertise, make available, offer and / or sell or distribute products to the users of the marketplace/website and processing of orders received by the seller. Seller acknowledges that the Technical Supporter is completely relying on the information, content, data and other details provided by the Seller to enable Technical Support to complete the Services as agreed above.</p>

                              <h5 className="mt-4">2. TERM</h5>
                              <p>This Agreement shall enter into force from the Effective Date and shall remain in force for a period of 36 months from Effective Date unless terminated earlier.</p>

                              <h5 className="mt-4">3. REPRESENTATION & WARRANTIES:</h5>
                              <ol>
                                <li>Technical Supporter represents that it is a legally existing entity under the laws of India and is competent to sign this Agreement.</li>
                                <li>Seller represents that it owns the title of the products which he is willing to sell on the Website/Marketplace and has not procured the same with any illegal and unlawful means;</li>
                                <li>Seller represents that the tools or any equipment used in delivering the Services shall be exclusive property of the Technical Supporter.</li>
                                <li>Seller represents that it does not violate any applicable laws in India by selling the product on the Website/Marketplace and has all the documentary proofs for substantiating his/her title in the products as well as his/her possession of the products. Seller also warrants that it will ensure that Technical Supporter does not face any problem in respect to any issue pertaining to any violation of any applicable laws by the Seller.<br />Seller represents that it shall be responsible for the packaging of the product as per the applicable laws and the Technical Supporter shall not be responsible for the same in any manner whatsoever.</li>
                                <li>Seller has not withheld any information which is required for effective performance of the contractual obligations under this Agreement and that information provided by the Seller under this Agreement is complete, true and accurate.</li>
                                <li>Seller recognizes and confirms that the Technical Supporter has no expertise to check product related compliance and hence Technical Supporter shall not be liable for the contents, MRP, images shared, uploaded or displayed on the Website including all other relevant details for listing of the Seller regarding the Seller’s products and all consequent liability will be borne by the Seller only.</li>
                                <li>Seller agrees to fully comply with all the terms and conditions of all e-commerce companies where Seller is exhibiting and selling the products and shall notify Technical Supporter of any such conditions which Technical Supporter need to comply with. Seller represents and warrants that it has read and understood all the terms and conditions of the Website, Seller Panel, Website/Marketplace Policies, Seller Agreement with the Website including but not limited to Banned Policy of the Website, Website terms of use, sale, privacy policy, seller panel related all the policies etc. and agrees to fully comply with all of them and all such compliance will be the sole responsibility of the Seller.</li>
                                <li>Seller agrees to provide required assistance and cooperation to the Technical Supporter in delivering Services under this Agreement.</li>
                              </ol>

                              <p>Except as provided in this Agreement, Technical Supporter disclaims all other warranties, express or implied, statutory or otherwise, as to the condition, quality, performance, durability, including any warranties of merchantability or fitness for a particular purpose and all such warranties, conditions, undertakings and terms are hereby excluded, to the fullest extent permitted by law.</p>

                              <h5 className="mt-4">4. COMMERCIALS</h5>
                              <ol>
                                <li>Technical Supporter shall charge a service fee on the total Shipped Invoice Value (the product of number of units sold and the Selling Price) invoiced by the seller against its technical support provided to it on a fortnightly basis. Selling Price shall mean the price in Indian Rupees (INR) at which such product is exhibited, advertised, made available or offered for sale by the Seller on the Website.</li>
                                <li>Service fee will be as follows: Variable fee is on monthly fixed Charges is Each Marketplace (Per Portal) PFB,</li>
                              </ol>

                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>MARKETPLACE SERVICES</th>
                                    <th>PRICE IN INR / ACCOUNT</th>
                                    <th>PAYMENT TERMS</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* BUSINESS LAUNCH */}
                                  <tr>
                                    <td>BUSINESS LAUNCH</td>
                                    <td>
                                      {serviceTypes.length > 0 ? (
                                        serviceTypes.map((item) => (
                                          <div key={item.id}>
                                            {item.serviceTypeName} – ₹{item.offerPrice}
                                            <br />
                                            <small>Bill Cycle: {item.billCycleTitle}</small>
                                          </div>
                                        ))
                                      ) : (
                                        <div>—</div>
                                      )}
                                    </td>
                                    <td>{serviceTypes[0]?.billCycleTitle || "—"}</td>

                                  </tr>

                                  {/* PRODUCT LISTINGS */}
                                  <tr>
                                    <td>PRODUCT LISTINGS</td>
                                    <td>
                                      {mouList.length > 0 ? (
                                        mouList.map((item) => (
                                          <div key={item.id}>
                                            ₹{item.offerPrice}/SKU ({item.noOfSkus} SKUs) – {item.serviceTypeName}
                                            <br />
                                            Total: ₹{item.totalPrice}
                                          </div>
                                        ))
                                      ) : (
                                        <div>—</div>
                                      )}
                                    </td>
                                    <td>{mouList[0]?.billCycleTitle || "—"}</td>
                                  </tr>

                                  {/* KEY ACCOUNT MANAGEMENT */}
                                  <tr>
                                    <td>KEY ACCOUNT MANAGEMENT</td>
                                    <td colSpan="2">
                                      WE PROVIDE TWO PRICING OPTIONS
                                      <br />
                                      1. PERCENTAGE (%) OF THE MERCHANDISE VALUE (ON MARKETPLACE TRANSACTIONS),
                                      ALONG WITH A CAUTION DEPOSIT OF ₹29000 EACH ACCOUNT (REFUNDABLE).
                                      <br />
                                      <table className="table table-bordered mt-2">
                                        <thead>
                                          <tr>
                                            <th>COMMISSION TITLE</th>
                                            <th>PERCENTAGE (%)</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {commissionPricings.length > 0 ? (
                                            commissionPricings.map((commission) => (
                                              <tr key={commission.id}>
                                                <td>{commission.commissionTitle}</td>
                                                <td>{commission.percentage}%</td>
                                              </tr>
                                            ))
                                          ) : (
                                            <tr>
                                              <td colSpan="2" className="text-center">No Commissions Found</td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>

                                  {/* KEY ACCOUNT MANAGEMENT */}
                                  <tr>
                                    <td>KEY ACCOUNT SUBSCRIPTION</td>
                                    <td>
                                      {keyAccountSubscriptions?.length > 0 ? (
                                        keyAccountSubscriptions?.map((item) => (
                                          <div key={item.id}>
                                            {item.serviceTypeName} – ₹{item.offerPrice}
                                          </div>
                                        ))
                                      ) : (
                                        <div>—</div>
                                      )}
                                    </td>

                                  </tr>

                                  {/* DIGITAL MARKETING */}
                                  {digitalMarketing && digitalMarketing.offerPrice && (
                                    <tr>
                                      <td>DIGITAL MARKETING</td>
                                      <td>
                                        {digitalMarketing.digitalMarketingServiceNames
                                          ?.map((s) => s.name)
                                          .join(", ")}
                                        <br />
                                        ₹{digitalMarketing.offerPrice}
                                      </td>
                                      <td>{digitalMarketing.billCycleTitle || "—"}</td>
                                    </tr>
                                  )}

                                  {/* PRODUCT PHOTOGRAPHY */}
                                  <tr>
                                    <td>PRODUCT PHOTOGRAPHY</td>
                                    <td>
                                      {productPhotographys?.length > 0 ? (
                                        productPhotographys.map((item) => (
                                          <div key={item.id}>
                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                          </div>
                                        ))
                                      ) : (
                                        <div>—</div>
                                      )}
                                    </td>
                                    <td>{productPhotographys?.length > 0 ? (
                                      productPhotographys.map((item) => (
                                        <div key={item.id}>
                                          {item.billCycleTitle}
                                        </div>
                                      ))
                                    ) : (
                                      <div>—</div>
                                    )}</td>
                                  </tr>

                                  {/* lifeStylePhotographys PHOTOGRAPHY */}
                                  <tr>
                                    <td>LIFESTYLE PHOTOGRAPHY PHOTOGRAPHY</td>
                                    <td>
                                      {lifeStylePhotographys?.length > 0 ? (
                                        lifeStylePhotographys.map((item) => (
                                          <div key={item.id}>
                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                          </div>
                                        ))
                                      ) : (
                                        <div>—</div>
                                      )}
                                    </td>
                                    <td>{lifeStylePhotographys?.length > 0 ? (
                                      lifeStylePhotographys.map((item) => (
                                        <div key={item.id}>
                                          {item.billCycleTitle}
                                        </div>
                                      ))
                                    ) : (
                                      <div>—</div>
                                    )}</td>
                                  </tr>
                                  {/* MODAL PHOTOGRAPHY */}
                                  <tr>
                                    <td>MODAL PHOTOGRAPHY</td>
                                    <td>
                                      {modelPhotographys?.length > 0 ? (
                                        modelPhotographys.map((item) => (
                                          <div key={item.id}>
                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                          </div>
                                        ))
                                      ) : (
                                        <div>—</div>
                                      )}
                                    </td>
                                    <td>{modelPhotographys?.length > 0 ? (
                                      modelPhotographys.map((item) => (
                                        <div key={item.id}>
                                          {item.billCycleTitle}
                                        </div>
                                      ))
                                    ) : (
                                      <div>—</div>
                                    )}</td>
                                  </tr>
                                  {/* A CONTENT PHOTOGRAPHY */}
                                  <tr>
                                    <td>A+ CONTENT PHOTOGRAPHY</td>
                                    <td>
                                      {aContentPhotographys?.length > 0 ? (
                                        aContentPhotographys.map((item) => (
                                          <div key={item.id}>
                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                          </div>
                                        ))
                                      ) : (
                                        <div>—</div>
                                      )}
                                    </td>
                                    <td>{aContentPhotographys?.length > 0 ? (
                                      aContentPhotographys.map((item) => (
                                        <div key={item.id}>
                                          {item.billCycleTitle}
                                        </div>
                                      ))
                                    ) : (
                                      <div>—</div>
                                    )}</td>
                                  </tr>
                                  {/* STORE PHOTOGRAPHY */}
                                  <tr>
                                    <td>STORE PHOTOGRAPHY</td>
                                    <td>
                                      {storePhotographys?.length > 0 ? (
                                        storePhotographys.map((item) => (
                                          <div key={item.id}>
                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                          </div>
                                        ))
                                      ) : (
                                        <div>—</div>
                                      )}
                                    </td>
                                    <td>{storePhotographys?.length > 0 ? (
                                      storePhotographys.map((item) => (
                                        <div key={item.id}>
                                          {item.billCycleTitle}
                                        </div>
                                      ))
                                    ) : (
                                      <div>—</div>
                                    )}</td>
                                  </tr>

                                  <tr>
                                    <td>SOCIAL MEDIA CONTENT PHOTOGRAPHY</td>
                                    <td>
                                      {socialMediaContentPhotographys?.length > 0 ? (
                                        socialMediaContentPhotographys.map((item) => (
                                          <div key={item.id}>
                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                          </div>
                                        ))
                                      ) : (
                                        <div>—</div>
                                      )}
                                    </td>
                                    <td>{socialMediaContentPhotographys?.length > 0 ? (
                                      socialMediaContentPhotographys.map((item) => (
                                        <div key={item.id}>
                                          {item.billCycleTitle}
                                        </div>
                                      ))
                                    ) : (
                                      <div>—</div>
                                    )}</td>
                                  </tr>
                                </tbody>
                              </table>


                              <p>Note: Exclusive launching charges are Rs. 25,000 for Myntra, Tira Beauty and Nykaa.</p>

                              <ol start="3">
                                <li>Invoicing will be done on a fortnightly basis. Service Tax will be charged as per applicable laws. Note: This fee is independent of all charges levied or to be levied by all e-commerce companies based on the policy at the time of invoicing.</li>
                                <li>Seller gives an express consent that the said service fee shall be debited by the all e companies from the Seller’s proceeds with the Marketplace and shall be paid to the Technical Supporter within the agreed timeframe herein. Furthermore, Seller agrees to provide specific instructions to all e-commerce companies for such debit of the invoice raised by the Technical Supporter every month. Seller acknowledges that no such instruction shall be modified with the e-commerce companies unless there is an express consent of the Technical Support in this connection. Seller also agrees to waive all the rights in relation to such payment and settlement by e-commerce companies to the Technical Supporter.</li>
                                <li>The Technical Supporter shall not be responsible for any taxes pertaining to the products like GST &, Octroi charges, freight charges etc. and it will be borne by the Seller himself. For avoidance of doubt, it is clarified that all the charges of third parties in relation to the Services shall be borne by the Seller.</li>
                              </ol>

                              <h5 className="mt-4">5. INTELLECTUAL PROPERTY RIGHTS:</h5>
                              <ol>
                                <li>Technical Supporter agrees that Seller’s brands/logos, trademarks, etc., are the exclusive property of Seller and Technical Supporter shall not in any circumstances use, copy, or alter it in any manner other than for the purpose of this Agreement. . .</li>
                                <li>Seller shall never use the brands/logos, trademarks, etc. of the Technical Supporter and that are same/similar to those of Technical Supporter and shall keep the Technical Supporter all times indemnify against any third-party claim for any act, omission, IPR infringement, fraud, and misrepresentation;</li>
                              </ol>

                              <h5 className="mt-4">6. TERMINATION:</h5>
                              <ol>
                                <li>This Agreement shall automatically terminate upon expiry of the Term.</li>
                                <li>Either Party shall be entitled to terminate this agreement by giving 30 (Thirty) days written notice to the other Party; however, if either Party commits a material breach of the terms of this Agreement which is a breach incapable of being remedied then the Agreement may be terminated forthwith else other Party agrees to rectify such material breach within 15 days. Upon termination, Seller shall be liable to pay the Technical Supporter till the effective date of the termination.</li>
                              </ol>

                              <h5 className="mt-4">7. CONFIDENTIALITY</h5>
                              <ol>
                                <li>The Parties acknowledge that during the existence of this Agreement, both Parties will have access to confidential information of the other Party. The party who is receiving the Confidential Information (“Receiving Party”) undertakes to keep confidential all data and other confidential information supplied to the Receiving Party by the party who discloses the Confidential Information (“Disclosing Party”) under this Agreement and shall not sell or otherwise make that information available to any third parties except any such disclosure is required to be made by the Technical Supporter to any third party to fulfill its obligations under this Agreement. This Agreement, and the terms thereof, shall be considered to be confidential.</li>
                                <li>Except as agreed to by the Parties, the Receiving Party will not use the confidential information for its own purpose or distribute such data in any form or means and shall keep it confidential at all times. Confidential information would include but not be limited to Product details, Buyer details, Seller details, Seller Panel details and its policies, Price and contents of the product, market information, all work products and documents related thereto, information relating to company’s policies, trade secrets or any other information whether oral or in writing, received or to be received by it which is agreed to be treated under the same terms.</li>
                                <li>The obligations under this Clause shall be valid till the termination of this Agreement and the Receiving Party shall keep the other Party indemnified against the breach of this clause. It also understands and declares that breach of this clause will cause an irreparable loss and damage to the Disclosing Party and the Disclosing Party reserves the right to take any preventive action, claim for damages.</li>
                              </ol>

                              <h5 className="mt-4">8. INDEMNITY</h5>
                              <p>Technical Supporter aggregate and collective liability arising out of or in connection with this Agreement (whether in contract, tort, negligence, under an indemnity or by statute or otherwise) entered into subject to its terms, will, to the extent permissible by law, be limited to the amount of three (3) months average fee paid under this Agreement. However, Technical Supporter shall not be liable in connection with this Agreement for any indirect, consequential, incidental, losses, business interruption, loss of data, loss of profits or revenue, loss of contracts, irrespective of whether any of such losses is direct or indirect; and even if the loss or damages was reasonably foreseeable.</p>

                              <ol>
                                <li>Seller hereby indemnifies and undertakes to always hold harmless and keep indemnified and defend Technical Supporter, associate and their respective employees, officers, representatives and agents at its cost against all actions, demands, claims, losses, damages, penalty, costs, punishments, consequences and other liabilities arising out of or as a consequence of:-<br />
                                  (a) breach of any of the terms and conditions, representation and warranties of the agreement by the Seller;<br />
                                  (b) any acts, commissions, omissions, negligence or contribution of the Seller, its officers, representatives, employees, agents, contractors or subcontractors in any manner under any provision of this Agreement;<br />
                                  (c) Infringement of any Technical Supporter or third party’s intellectual property rights on account of any activity carried out by the Seller;<br />
                                  (d) any claim , action, suit, liabilities, loss or any other legal proceeding filed by Technical Supporter or any other third party against Technical Supporter due to the negligence, acts, misconduct, commissions, omissions of Seller under this Agreement;<br />
                                  (e) any penalty or damages is levied or recovered from Technical Supporter due to any fault or omission on part of Seller;<br />
                                  (f) breach or contravention of any applicable law by the Seller including Seller’s obligations in relation to compliance and payment under applicable tax laws as mentioned in clause 4.2 above.</li>
                              </ol>

                              <h5 className="mt-4">9. FORCE MAJEURE</h5>
                              <p>Neither party shall be liable to other party for any delay or non-performance of its obligations under this Agreement arising from any cause or causes beyond its reasonable control including, without limitation, any of the following: act of God, governmental act, war, fire, flood, explosion, civil commotion or industrial dispute of a third party, armed hostilities, act of terrorism, revolution, blockade, embargo, strike, lock-out, sit-in, industrial or trade dispute, adverse weather, disease, accident to (or breakdown of) plant or machinery, shortage of any material, labor, transport, electricity or other supply, or regulatory intervention.</p>

                              <h5 className="mt-4">10. ASSIGNMENT</h5>
                              <p>Both Parties shall not assign or transfer any of its rights and/or obligations under this agreement to any third party. However, Technical Supporter shall be entitled to sub contract or engage third parties for the part performance of the terms of this Agreement.</p>

                              <h5 className="mt-4">11. AMENDMENT</h5>
                              <p>a. Technical Supporter may amend the terms and conditions of this Agreement at any time by intimating the Seller through suitable notification or other mode of electronic communication. After such notification or communication, it will be the responsibility of the Seller to review the same from time to time and ensure due compliance. Seller’s continuous use of the Services shall always be deemed acceptance to such amendment or modifications.</p>

                              <h5 className="mt-4">12. DISPUTE RESOLUTION, GOVERNING LAW AND JURISDICTION</h5>
                              <p>Any dispute between the Parties, in connection with, or arising out of, this Agreement, shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, including any amendments or re-enactments thereto to be adjudicated by a sole arbitrator to be appointed by Technical Supporter. Arbitration shall be held at h, India. The arbitrator’s award shall be final and binding on the Parties. The proceedings of arbitration shall be confidential and in the English language.</p>

                              <p>This agreement shall be governed and construed in accordance with the laws of India without reference to rules governing choice of laws. If any dispute arising in respect of the understanding/obligations/rights specified herein shall be subject to the exclusive jurisdiction of the Courts in Hyderabad only.</p>

                              <h5 className="mt-4">13. MISCELLANEOUS</h5>
                              <p>b. That it is understood and has been agreed between the Parties that this Agreement is entered into by and between the Parties to this Agreement on ‘principal-to-principal’ basis and nothing in this Agreement shall create, or be deemed to create, a partnership, joint venture or the relationship of principal and agent, between the Parties or any of them.</p>
                              <p>c. That failure of either Party to this Agreement to enforce at any time or for any period, all or any provision(s) of this Agreement shall not be construed to be waiver of such provision(s) or of the right thereafter, to enforce all or any such provision(s) of this Agreement.</p>
                              <p>d. That if any provision(s) of this Agreement shall be determined to be void or unenforceable under any law, such provision(s) shall be deemed amended or deleted to the extent necessary to conform to Applicable Law(s) and the remaining provision(s) of this Agreement shall remain valid and enforceable.</p>
                              <p>e. Subject to clause 11, this Agreement constitutes the entire Agreement between the Parties and revokes/supersedes all previous discussions/ correspondence/ memorandum of understanding or Agreements between the Parties, whether written, oral or implied, if any, concerning the matters covered herein in this Agreement.</p>

                              <h5 className="mt-4">IN WITNESS WHEREOF</h5>
                              <p>authorized officers of the Parties hereto have duly executed this agreement as of the date first above written.</p>

                              <p>
                                For Sellers: <br />
                                Sign: <br />
                                Name: <br />
                                Title:
                              </p>

                              <p>
                                For Technical Supporter: <br />
                                Sign: <br />
                                Name: <br />
                                Title:
                              </p>

                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
            <div className="tab-pane active">
              <h5>Documents</h5>
              <form action="" method="post" >
                <div className="col-lg-5"> <label>Choose a file:</label>
                  <input type="file" id="fileUpload" name="fileUpload" className="form-control" />
                </div>
                <button type="submit" className="btn btn-success mt-4">Upload</button>
              </form>
            </div>

          )}

        </div>
      </div>
    </div>
  );
};

export default Agreement;
