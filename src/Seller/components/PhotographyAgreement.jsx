import React from "react";

const PhotographyAgreement = ({
    productPhotographys,
    lifeStylePhotographys,
    modelPhotographys,
    aContentPhotographys,
    storePhotographys,
    socialMediaContentPhotographys,
}) => {
    return (
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
                    Photography
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
                    <div className=" col-lg-12 bg-white p-4 rounded shadow-sm">
                        <h4 className="text-center fw-bold mb-4">
                            ISNAP PHOTOGRAPHY SERVICES MOU
                        </h4>

                        <p className="text-muted">
                            <strong>MEMORANDUM OF UNDERSTANDING (“MOU”)</strong> for Photography and
                            Related Creative Services
                        </p>

                        <p>
                            This MOU is made between <strong>ISNAP ONLINE PRIVATE LIMITED</strong>,
                            Plot No. 903, Guttala Begumpet, Phase 3, Kavuri Hills, Hyderabad,
                            Telangana, India – 500081 (hereinafter referred to as “ISNAP” or
                            “Service Provider”) and <strong>[Client Name & Address]</strong> (the
                            “Client”).
                        </p>

                        <h6 className="fw-bold mt-4">1. Purpose and Scope</h6>
                        <ul>
                            <li>Product Photography (Catalog, White Background)</li>
                            <li>Lifestyle/Creative Photography, Model Photography</li>
                            <li>Content Photography (Store, Showroom, Manufacturing Units)</li>
                            <li>Social Media Content</li>
                            <li>Add-On Services: Retouching, Creative Editing, etc.</li>
                        </ul>

                        <h6 className="fw-bold mt-4">2. Term & Validity</h6>
                        <ul>
                            <li>
                                The MOU remains valid for 12 months from the signing date, unless
                                renewed by mutual consent.
                            </li>
                            <li>
                                Each project or assignment during this term is governed by this MOU’s
                                terms.
                            </li>
                        </ul>

                        <h6 className="fw-bold mt-4">3. Payment Terms</h6>
                        <ul>
                            <li>
                                <strong>Fee:</strong> Project fees will be communicated and agreed via
                                quotation or proposal before every new engagement.
                            </li>
                            <li>
                                <strong>Payment Schedule:</strong> 50% advance before commencement,
                                and 50% upon final delivery.
                            </li>
                            <li>
                                <strong>Method:</strong> Payments must be made via bank transfer to
                                ISNAP’s designated account.
                            </li>
                            <li>
                                <strong>Taxes:</strong> GST and other applicable taxes will be
                                included in all invoices.
                            </li>
                        </ul>

                        <h6 className="fw-bold mt-4">4. Deliverables & Timelines</h6>
                        <ul>
                            <li>
                                Deliverables and turnaround times (“TAT”) will be agreed upon in
                                writing before each assignment.
                            </li>
                            <li>
                                Any client-caused delays will proportionally extend delivery timelines.
                            </li>
                        </ul>

                        <h6 className="fw-bold mt-4">5. Ownership & Intellectual Property</h6>
                        <ul>
                            <li>
                                All raw content (images, videos, source files) remains the exclusive
                                property of the client unless agreed otherwise in writing.
                            </li>
                            <li>
                                Client receives a non-exclusive, non-transferable license to use the
                                final deliverables for marketing, promotional, or internal use only.
                            </li>
                            <li>
                                Commercial resale, sublicensing, or third-party transfer is prohibited
                                without ISNAP’s written consent.
                            </li>
                        </ul>

                        <h6 className="fw-bold mt-4">6. Confidentiality</h6>
                        <ul>
                            <li>
                                Both parties shall treat all exchanged information as confidential.
                            </li>
                            <li>
                                No party shall disclose proprietary information to third parties
                                without written consent, unless required by law.
                            </li>
                        </ul>

                        <h6 className="fw-bold mt-4">7. Indemnity & Limitation of Liability</h6>
                        <ul>
                            <li>
                                Each party shall indemnify the other against all losses, claims, and
                                damages arising from breach, negligence, or misconduct.
                            </li>
                            <li>
                                ISNAP’s total liability shall not exceed the total amount paid by the
                                client for the relevant assignment.
                            </li>
                        </ul>

                        <h6 className="fw-bold mt-4">8. Termination</h6>
                        <ul>
                            <li>Either party may terminate with 30 days’ written notice.</li>
                            <li>All pending dues must be settled before termination.</li>
                            <li>
                                Proportional payment will be made for work completed up to the
                                termination date.
                            </li>
                        </ul>

                        <h6 className="fw-bold mt-4">9. Governing Law & Dispute Resolution</h6>
                        <p>
                            This MOU is governed by the laws of India. Disputes will be subject to
                            the exclusive jurisdiction of the courts at Hyderabad, Telangana.
                        </p>

                         <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>PHOTOGRAPHY SERVICES</th>
                                            <th>PRICE IN INR / ACCOUNT</th>
                                            <th>PAYMENT TERMS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* PRODUCT PHOTOGRAPHY */}
                                        {productPhotographys?.length > 0 && (
                                            <tr>
                                                <td>PRODUCT PHOTOGRAPHY</td>
                                                <td>
                                                    {productPhotographys.map((item) => (
                                                        <div key={item.id}>
                                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {productPhotographys.map((item) => (
                                                        <div key={item.id}>{item.billCycleTitle}</div>
                                                    ))}
                                                </td>
                                            </tr>
                                        )}

                                        {/* lifeStylePhotographys PHOTOGRAPHY */}
                                        {lifeStylePhotographys?.length > 0 && (
                                            <tr>
                                                <td>LIFESTYLE PHOTOGRAPHY</td>
                                                <td>
                                                    {lifeStylePhotographys.map((item) => (
                                                        <div key={item.id}>
                                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {lifeStylePhotographys.map((item) => (
                                                        <div key={item.id}>{item.billCycleTitle}</div>
                                                    ))}
                                                </td>
                                            </tr>
                                        )}
                                        {/* MODAL PHOTOGRAPHY */}
                                        {modelPhotographys?.length > 0 && (
                                            <tr>
                                                <td>MODEL PHOTOGRAPHY</td>
                                                <td>
                                                    {modelPhotographys.map((item) => (
                                                        <div key={item.id}>
                                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {modelPhotographys.map((item) => (
                                                        <div key={item.id}>{item.billCycleTitle}</div>
                                                    ))}
                                                </td>
                                            </tr>
                                        )}

                                        {/* A CONTENT PHOTOGRAPHY */}
                                        {aContentPhotographys?.length > 0 && (
                                            <tr>
                                                <td>A+ CONTENT PHOTOGRAPHY</td>
                                                <td>
                                                    {aContentPhotographys.map((item) => (
                                                        <div key={item.id}>
                                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {aContentPhotographys.map((item) => (
                                                        <div key={item.id}>{item.billCycleTitle}</div>
                                                    ))}
                                                </td>
                                            </tr>
                                        )}
                                        {/* STORE PHOTOGRAPHY */}
                                        {storePhotographys?.length > 0 && (
                                            <tr>
                                                <td>STORE PHOTOGRAPHY</td>
                                                <td>
                                                    {storePhotographys.map((item) => (
                                                        <div key={item.id}>
                                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {storePhotographys.map((item) => (
                                                        <div key={item.id}>{item.billCycleTitle}</div>
                                                    ))}
                                                </td>
                                            </tr>
                                        )}
                                        {/* SOCIAL MEDIA CONTENT PHOTOGRAPHY */}
                                        {socialMediaContentPhotographys?.length > 0 && (
                                            <tr>
                                                <td>SOCIAL MEDIA CONTENT PHOTOGRAPHY</td>
                                                <td>
                                                    {socialMediaContentPhotographys.map((item) => (
                                                        <div key={item.id}>
                                                            {item.activityName} – {item.qty} × ₹{item.offerPrice} = ₹{item.totalPrice}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {socialMediaContentPhotographys.map((item) => (
                                                        <div key={item.id}>{item.billCycleTitle}</div>
                                                    ))}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                        <h6 className="fw-bold mt-4">10. Acceptance & Signatures</h6>
                        <div className="mt-3">
                            <p>
                                <strong>For ISNAP ONLINE PRIVATE LIMITED</strong>
                            </p>
                            <p>Authorized Signatory: ___________________</p>
                            <p>Date: ________________</p>
                        </div>

                        <div className="mt-3">
                            <p>
                                <strong>For CLIENT</strong>
                            </p>
                            <p>Authorized Signatory: ___________________</p>
                            <p>Date: ________________</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PhotographyAgreement;
