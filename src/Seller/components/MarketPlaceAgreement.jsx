import React from "react";

const MarketPlaceAgreement = ({
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
}) => {
    console.log('commissionPricings', commissionPricings)
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
                                                            commissionPricings.flatMap((pricing) =>
                                                                pricing.commissions.map((commission) => (
                                                                    <tr key={commission.id}>
                                                                        <td>{commission.commissionTitle}</td>
                                                                        <td>{commission.offerPercentage}%</td>
                                                                    </tr>
                                                                ))
                                                            )
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="2" className="text-center">
                                                                    No Commissions Found
                                                                </td>
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

    )
};

export default MarketPlaceAgreement;