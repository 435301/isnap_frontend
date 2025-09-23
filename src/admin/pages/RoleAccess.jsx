import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const RoleAccess = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [role, setRole] = useState("Manager");

    // Marketplace Business checkboxes
    const [marketplaceOpen, setMarketplaceOpen] = useState(true);
    const [marketplaceItems, setMarketplaceItems] = useState({
        "Business Launch": false,
    });

    // Business Launch sub-items
    const [businessLaunchOpen, setBusinessLaunchOpen] = useState(true);
    const [businessLaunchItems, setBusinessLaunchItems] = useState({
        "Account Registration": false,
        "Product Audit Marketplace": false,
        "Optimization & Brand Scaling": false,
        "Brand Store Front": false,
    });
    // Digital Marketing sub-items state
    const [digitalMarketingOpen, setDigitalMarketingOpen] = useState(true);
    const [digitalMarketingItems, setDigitalMarketingItems] = useState({
        "SEO (Search Engine Optimization)": false,
        "Social Media Marketing (SMM)": false,
        "Social Media Optimization (SMO)": false,
        "Pay-Per-Click (PPC) Management": false,
        "Online Reputation Management (ORM)": false,
        "Content Strategy & Management": false,
        "Ad Campaigns (Performance & Branding)": false,
    });
    // Product Photography sub-items state
    const [productPhotographyOpen, setProductPhotographyOpen] = useState(true);
    const [productPhotographyItems, setProductPhotographyItems] = useState({
        "Single Product Shot ": false,
        "360° Product Photography": false,
        "Bulk Package (100+ SKUs) ": false,
    });

    useEffect(() => {
        const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    // Marketplace Business main checkbox
    const allMarketplaceSelected = Object.values(marketplaceItems).every(Boolean);
    const someMarketplaceSelected =
        Object.values(marketplaceItems).some(Boolean) && !allMarketplaceSelected;

    const handleMarketplaceMainCheckboxChange = () => {
        const newValue = !allMarketplaceSelected;
        const updatedItems = Object.keys(marketplaceItems).reduce((acc, key) => {
            acc[key] = newValue;
            return acc;
        }, {});
        setMarketplaceItems(updatedItems);
    };

    // Business Launch sub-items checkbox logic
    const allBusinessSelected = Object.values(businessLaunchItems).every(Boolean);
    const someBusinessSelected =
        Object.values(businessLaunchItems).some(Boolean) && !allBusinessSelected;

    const handleBusinessMainCheckboxChange = () => {
        const newValue = !allBusinessSelected;
        const updatedItems = Object.keys(businessLaunchItems).reduce((acc, key) => {
            acc[key] = newValue;
            return acc;
        }, {});
        setBusinessLaunchItems(updatedItems);
    };

    const handleBusinessCheckboxChange = (item) => {
        setBusinessLaunchItems((prev) => ({
            ...prev,
            [item]: !prev[item],
        }));
    };

    return (
        <div className="container-fluid position-relative bg-white d-flex p-0">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="content flex-grow-1">
                <Navbar onToggleSidebar={handleToggleSidebar} />
                <div className="container-fluid px-4 pt-3">
                    <div className="bg-white p-3 rounded shadow-sm row">
                        {/* Marketplace Business */}
                        <div className="col-lg-4">
                            <div
                                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                onClick={() => setMarketplaceOpen((prev) => !prev)}
                            >
                                <input
                                    type="checkbox"
                                    checked={allMarketplaceSelected}
                                    ref={(el) => {
                                        if (el) el.indeterminate = someMarketplaceSelected;
                                    }}
                                    onChange={handleMarketplaceMainCheckboxChange}
                                    style={{ accentColor: "purple" }}
                                />
                                <span className="ms-2 fw-bold">Marketplace Business</span>
                            </div>

                            {marketplaceOpen && (
                                <div className="ms-4 mt-2">
                                    {/* Business Launch Section */}
                                    <div>
                                        <div
                                            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                            onClick={() => setBusinessLaunchOpen((prev) => !prev)}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={allBusinessSelected}
                                                ref={(el) => {
                                                    if (el) el.indeterminate = someBusinessSelected;
                                                }}
                                                onChange={handleBusinessMainCheckboxChange}
                                                style={{ accentColor: "purple" }}
                                            />
                                            <span className="ms-2 fw-bold">Business Launch</span>
                                        </div>

                                        {businessLaunchOpen && (
                                            <div className="ms-4 mt-2">
                                                {Object.keys(businessLaunchItems).map((item) => (
                                                    <div key={item}>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={businessLaunchItems[item]}
                                                                onChange={() => handleBusinessCheckboxChange(item)}
                                                                style={{ accentColor: "purple" }}
                                                            />
                                                            <span className="ms-2">{item}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-4">
                            <div
                                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                onClick={() => setDigitalMarketingOpen((prev) => !prev)}
                            >
                                <input
                                    type="checkbox"
                                    checked={Object.values(digitalMarketingItems).every(Boolean)}
                                    ref={(el) => {
                                        if (el)
                                            el.indeterminate =
                                                Object.values(digitalMarketingItems).some(Boolean) &&
                                                !Object.values(digitalMarketingItems).every(Boolean);
                                    }}
                                    onChange={() => {
                                        const newValue = !Object.values(digitalMarketingItems).every(Boolean);
                                        const updatedItems = Object.keys(digitalMarketingItems).reduce((acc, key) => {
                                            acc[key] = newValue;
                                            return acc;
                                        }, {});
                                        setDigitalMarketingItems(updatedItems);
                                    }}
                                    style={{ accentColor: "purple" }}
                                />
                                <span className="ms-2 fw-bold">Digital Marketing Services</span>
                            </div>

                            {digitalMarketingOpen && (
                                <div className="ms-4 mt-2">
                                    <div className="row">
                                        {Object.keys(digitalMarketingItems).map((item) => (
                                            <div key={item} className="col-md-12 mb-2">
                                                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={digitalMarketingItems[item]}
                                                        onChange={() =>
                                                            setDigitalMarketingItems((prev) => ({
                                                                ...prev,
                                                                [item]: !prev[item],
                                                            }))
                                                        }
                                                        style={{ accentColor: "purple" }}
                                                    />
                                                    <span className="ms-2">{item}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-4">
                            {/* Photography Services Heading */}
                            <div
                                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                onClick={() => setMarketplaceOpen((prev) => !prev)}
                            >
                                <input
                                    type="checkbox"
                                    checked={Object.values(productPhotographyItems).every(Boolean)}
                                    ref={(el) => {
                                        if (el)
                                            el.indeterminate =
                                                Object.values(productPhotographyItems).some(Boolean) &&
                                                !Object.values(productPhotographyItems).every(Boolean);
                                    }}
                                    onChange={() => {
                                        const newValue = !Object.values(productPhotographyItems).every(Boolean);
                                        const updatedItems = Object.keys(productPhotographyItems).reduce((acc, key) => {
                                            acc[key] = newValue;
                                            return acc;
                                        }, {});
                                        setProductPhotographyItems(updatedItems);
                                    }}
                                    style={{ accentColor: "purple" }}
                                />
                                <span className="ms-2 fw-bold">Photography Services</span>
                            </div>

                            {/* Product Photography Sub-items */}
                            {productPhotographyOpen && (
                                <div className="ms-4 mt-2">
                                    <div className="row">
                                        {Object.keys(productPhotographyItems).map((item) => (
                                            <div key={item} className="col-md-12 mb-2">
                                                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={productPhotographyItems[item]}
                                                        onChange={() =>
                                                            setProductPhotographyItems((prev) => ({
                                                                ...prev,
                                                                [item]: !prev[item],
                                                            }))
                                                        }
                                                        style={{ accentColor: "purple" }}
                                                    />
                                                    <span className="ms-2">{item}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleAccess;
