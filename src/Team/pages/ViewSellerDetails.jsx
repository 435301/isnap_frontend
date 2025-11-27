import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSellersDetailsById } from "../../redux/actions/TeamSellerAction";

const ViewSellerDetails = () => {
    const { id } = useParams();
    console.log('id', id)
    const dispatch = useDispatch();
    const { sellerData, loading } = useSelector((state) => state.teamSeller || {});
    console.log('sellerData', sellerData)
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const subDeptName = storedUser.subDepartmentName
    const roleName = storedUser.roleName

    const showMarketplaceServices =
        roleName === "Marketplace Manager";
    const showBusinessLaunches =
        roleName === "Executive" && subDeptName === "Business Launch";

    const showCatalogListings =
        roleName === "Executive" && subDeptName === "Catalog Listing";

    const showKeyaccountManagement =
        roleName === "Executive" && subDeptName === "Key Account Management";

    const showDigitalMarketing =
        roleName === "Digital Marketing Manager" || roleName === "Digital Marketing Executive"
    const showPhotography =
        roleName === "Photography Manager" || roleName === "Photography Executive";


    useEffect(() => {
        dispatch(fetchAllSellersDetailsById(id));
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;

    const {
        businessName,
        sellerName,
        regdMobile,
        regdEmail,
        stateName,
        cityName,
        gstNumber,
        mouDetails,
        sellerProductInfo,
    } = sellerData;

    return (
        <div className="container-fluid p-4">
            <h3 className="mb-3">Seller Details</h3>

            {/* Seller Basic Info */}
            <div className="card mb-3 p-3">
                <h5>Basic Information</h5>
                <p><strong>Business Name:</strong> {businessName}</p>
                <p><strong>Seller Name:</strong> {sellerName}</p>
                <p><strong>Email:</strong> {regdEmail}</p>
                <p><strong>Mobile:</strong> {regdMobile}</p>
                <p><strong>Location:</strong> {cityName}, {stateName}</p>
                <p><strong>GST Number:</strong> {gstNumber}</p>
            </div>

            {/* MOU DETAILS */}
            <div className="card p-3 mb-3">
                <h5>MOU Details</h5>

                {showMarketplaceServices && (
                    <>
                        {mouDetails?.businessLaunches?.length > 0 && (
                            <>
                                <h6 className="mt-3">Business Launches</h6>
                                {mouDetails?.businessLaunches.map((item) => (
                                    <div key={item.id} className="border p-2 rounded mb-2">
                                        <strong>Service:</strong> {item.serviceTypeName} <br />
                                        <strong>Price:</strong> {item.actualPrice} <br />
                                        <strong>Offer:</strong> {item.offerPrice}
                                    </div>
                                ))}
                            </>
                        )}
                        {mouDetails?.catalogListings?.length > 0 && (
                            <>
                                <h6 className="mt-3">Catalog Listings</h6>
                                {mouDetails?.catalogListings.map((item) => (
                                    <div key={item.id} className="border p-2 rounded mb-2">
                                        <strong>Service:</strong> {item.serviceTypeName} <br />
                                        <strong>Total Price:</strong> {item.totalPrice}
                                    </div>
                                ))}
                            </>
                        )}
                        {mouDetails?.keyAccountSubscriptions?.length > 0 && (
                            <>
                                <h6 className="mt-3">Key Account Subscriptions</h6>
                                {mouDetails?.keyAccountSubscriptions.length > 0 && mouDetails?.keyAccountSubscriptions?.map((item) => (
                                    <div key={item.id} className="border p-2 rounded mb-2">
                                        <strong>Service:</strong> {item.serviceTypeName} <br />
                                        <strong>Price:</strong> {item.actualPrice}
                                    </div>
                                ))}
                            </>
                        )}

                        {mouDetails?.keyAccountCommissions?.length > 0 && (
                            <>
                                <h6 className="mt-3">Key Account Commissions</h6>
                                {mouDetails.keyAccountCommissions.map((item) => (
                                    <div key={item.id} className="border p-2 rounded mb-2">
                                        <strong>Service:</strong> {item.serviceTypeName} <br />
                                        <strong>Security Deposit:</strong> {item.security?.securityDeposit}
                                        <br />

                                        <h6 className="mt-2">Commission Slabs</h6>
                                        {item.commissions?.map((c) => (
                                            <div key={c.id} className="ms-3">
                                                <strong>{c.commissionTitle}</strong>: {c.offerPercentage}%
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}

                {/* Business Launches */}
                {showBusinessLaunches && (
                    <>
                        {mouDetails?.businessLaunches?.length > 0 && (
                            <>
                                <h6 className="mt-3">Business Launches</h6>
                                {mouDetails.businessLaunches.map((item) => (
                                    <div key={item.id} className="border p-2 rounded mb-2">
                                        <strong>Service:</strong> {item.serviceTypeName} <br />
                                        <strong>Price:</strong> {item.actualPrice} <br />
                                        <strong>Offer:</strong> {item.offerPrice}
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}

                {/* Catalog Listings */}
                {showCatalogListings && (
                    <>
                        {mouDetails?.catalogListings?.length > 0 && (
                            <>
                                <h6 className="mt-3">Catalog Listings</h6>
                                {mouDetails.catalogListings.map((item) => (
                                    <div key={item.id} className="border p-2 rounded mb-2">
                                        <strong>Service:</strong> {item.serviceTypeName} <br />
                                        <strong>Total Price:</strong> {item.totalPrice}
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}


                {/* Key Account Subscriptions */}
                {showKeyaccountManagement && (
                    <>
                        {mouDetails?.keyAccountSubscriptions?.length > 0 && (
                            <>
                                <h6 className="mt-3">Key Account Subscriptions</h6>
                                {mouDetails?.keyAccountSubscriptions.length > 0 && mouDetails?.keyAccountSubscriptions?.map((item) => (
                                    <div key={item.id} className="border p-2 rounded mb-2">
                                        <strong>Service:</strong> {item.serviceTypeName} <br />
                                        <strong>Price:</strong> {item.actualPrice}
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}


                {/* Key Account Commission */}
                {showKeyaccountManagement && (
                    <>
                        {mouDetails?.keyAccountCommissions?.length > 0 && (
                            <>
                                <h6 className="mt-3">Key Account Commissions</h6>
                                {mouDetails.keyAccountCommissions.map((item) => (
                                    <div key={item.id} className="border p-2 rounded mb-2">
                                        <strong>Service:</strong> {item.serviceTypeName} <br />
                                        <strong>Security Deposit:</strong> {item.security?.securityDeposit}
                                        <br />

                                        <h6 className="mt-2">Commission Slabs</h6>
                                        {item.commissions?.map((c) => (
                                            <div key={c.id} className="ms-3">
                                                <strong>{c.commissionTitle}</strong>: {c.offerPercentage}%
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}

                {/* DIGITAL MARKETING */}
                {showDigitalMarketing && mouDetails?.digitalMarketing && (
                    <>
                        <h6 className="mt-3">Digital Marketing</h6>
                        <div className="border p-2 rounded mb-2">
                            <strong>Service:</strong>{" "}
                            {mouDetails.digitalMarketing.digitalMarketingServiceNames
                                .map((dm) => dm.name)
                                .join(", ")}
                            <br />
                            <strong>Price:</strong> {mouDetails.digitalMarketing.actualPrice}
                            <br />
                            <strong>Offer:</strong> {mouDetails.digitalMarketing.offerPrice}
                        </div>
                    </>
                )}

                {/* PHOTOGRAPHY */}
                {showPhotography && (
                    <>
                        <h6 className="mt-3">Photography Services</h6>
                        {[
                            "productPhotographys",
                            "lifeStylePhotographys",
                            "modelPhotographys",
                            "aContentPhotographys",
                            "storePhotographys",
                            "socialMediaContentPhotographys",
                        ].map((key) => (
                            <div key={key}>
                                {mouDetails?.[key]?.length > 0 && (
                                    <>
                                        <h6 className="mt-2">{key}</h6>
                                        {mouDetails[key].map((item) => (
                                            <div key={item.id} className="border p-2 rounded mb-2">
                                                <strong>Service:</strong> {item.serviceTypeName} <br />
                                                <strong>Price:</strong> {item.actualPrice}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* SELLER PRODUCT INFO */}
            <div className="card p-3">
                <h5>Seller Product Info</h5>
                {sellerProductInfo?.length > 0 &&
                    sellerProductInfo?.map((item) => (
                        <div key={item.id} className="border p-2 rounded mb-2">

                            {item.fileType === 1 && (
                                <img
                                    src={item.file}
                                    alt="Product"
                                // style={{ width: "150px", height: "auto" }}
                                />
                            )}

                            {item.fileType === 2 && (
                                <video width="250" controls>
                                    <source src={item.file} />
                                </video>
                            )}

                            {item.fileType === 3 && (
                                <a
                                    href={item.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Document
                                </a>
                            )}
                        </div>
                    ))
                }
            </div>

            <div className="card p-3 mb-3">
                <h5>Seller Updates</h5>

                <p><strong>MOU Status:</strong> {sellerData?.mouStatus === 1 ? "Accepted" : "Pending"}</p>
                <p><strong>MOU Accepted On:</strong> {sellerData?.mouAcceptedOn || "Not Accepted Yet"}</p>

                <p><strong>Document Status:</strong>
                    {sellerData?.documentStatus === 1 ? "Approved" : sellerData?.documentStatus === 2 ? "Rejected" : "Pending"}
                </p>

                {sellerData?.documentRejectedReason && (
                    <p><strong>Rejection Reason:</strong> {sellerData?.documentRejectedReason}</p>
                )}

                <p><strong>Invoice Requested:</strong> {sellerData?.requestForInvoice ? "Yes" : "No"}</p>

                <p>
                    <strong>Sales Manager Approval:</strong>
                    {sellerData?.isSalesManagerApprove === 1 ? "Approved" : "Pending"}
                </p>

                <p><strong>Seller Created On:</strong> {new Date(sellerData?.createdAt).toLocaleString()}</p>
                <p><strong>Seller Updated On:</strong> {new Date(sellerData?.updatedAt).toLocaleString()}</p>
            </div>

        </div>
    );
};

export default ViewSellerDetails;
