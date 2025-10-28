import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMouDetails } from "../../redux/actions/mouAction";
import { toast } from "react-toastify";
import { createInvoice, generateInvoice } from "../../redux/actions/invoiceAction";
import BASE_URL from "../../config/config";
import SellerSidebar from "../components/SellerSidebar";
import SellerNavbar from "../components/SellerNavbar";

const SellerServicesList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {
        mouList,
        serviceTypes,
        commissionPricings,
        digitalMarketing,
        productPhotographys,
        keyAccountSubscriptions,
        keyAccountCommissions,
        lifeStylePhotographys,
        modelPhotographys,
        aContentPhotographys,
        storePhotographys,
        socialMediaContentPhotographys,
    } = useSelector((state) => state.mou);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [serviceDates, setServiceDates] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    const { loading, invoiceData } = useSelector((state) => state.invoices);
    const seller = JSON.parse(localStorage.getItem("seller"));
    const businessId = seller?.id
    console.log('businessId', businessId)

    useEffect(() => {
        const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchMouDetails(businessId));
    }, [dispatch]);



    // Flatten all services into separate rows
    const allServices = [
        ...(serviceTypes || []).map((s) => ({
            checkboxId: `bl-${s.id}`,
            mainServiceId: s.id,
            name: s.serviceTypeName,
            billCycle: s.billCycleTitle,
            price: s.offerPrice,
            durationRequired: s.durationRequired,
            source: "Business Launch",
            isInvoiceChecked: s.isInvoiceChecked,
            invoiceType: s.invoiceType,
        })),
        ...(mouList || []).map((s) => ({
            checkboxId: `cl-${s.id}`,
            mainServiceId: s.id,
            name: s.serviceTypeName,
            billCycle: s.billCycleTitle,
            price: s.offerPrice,
            durationRequired: s.durationRequired,
            source: "Catalog Listing",
            isInvoiceChecked: s.isInvoiceChecked,
            invoiceType: s.invoiceType,

        })),
        ...(keyAccountSubscriptions || []).map((s) => ({
            checkboxId: `ka-${s.id}`,
            mainServiceId: s.id,
            name: s.serviceTypeName,
            billCycle: s.billCycleTitle,
            price: s.offerPrice,
            durationRequired: s.durationRequired,
            source: "Key Account Subscription",
            isInvoiceChecked: s.isInvoiceChecked,
            invoiceType: s.invoiceType,

        })),
        ...(keyAccountCommissions || []).flatMap((s) => [
            {
                checkboxId: `kac-security-${s.security.id}`,
                mainServiceId: s.security.id,
                name: s.serviceTypeName,
                billCycle: "-",
                price: s.security.securityDeposit,
                durationRequired: s.durationRequired,
                source: "Key Account Commission",
                isInvoiceChecked: s.isInvoiceChecked,
                invoiceType: s.invoiceType,

            },
            // ...(s.commissions || []).map((c) => ({
            //   id: `kac-commission-${c.id}`,
            //   name: c.commissionTitle,
            //   billCycle: "-",
            //   price: c.offerPercentage,
            //   source: "Key Account Commission",
            // })),
        ]),
        ...(lifeStylePhotographys || []).map((s) => ({
            checkboxId: `ls-${s.id}`,
            mainServiceId: s.id,
            name: s.activityName,
            billCycle: s.billCycleTitle,
            price: s.totalPrice,
            durationRequired: s.durationRequired,
            source: "LifeStyle Photography",
            isInvoiceChecked: s.isInvoiceChecked,
            invoiceType: s.invoiceType,

        })),
        ...(digitalMarketing && digitalMarketing?.id
            ? [
                {
                    checkboxId: `dm-${digitalMarketing?.id}`,
                    mainServiceId: digitalMarketing?.id,
                    name: Array.isArray(digitalMarketing?.digitalMarketingServiceNames)
                        ? digitalMarketing.digitalMarketingServiceNames.map((d) => d.name).join(", ")
                        : "",
                    billCycle: digitalMarketing?.billCycleTitle,
                    price: digitalMarketing?.offerPrice,
                    durationRequired: digitalMarketing?.durationRequired,
                    source: "Digital Marketing",
                    isInvoiceChecked: digitalMarketing?.isInvoiceChecked,
                    invoiceType: digitalMarketing?.invoiceType,
                },
            ]
            : []),
        ...(productPhotographys || []).map((s) => ({
            checkboxId: `pp-${s.id}`,
            mainServiceId: s.id,
            name: s.activityName,
            billCycle: s.billCycleTitle,
            price: s.totalPrice,
            durationRequired: s.durationRequired,
            source: "Product Photography",
            isInvoiceChecked: s.isInvoiceChecked,
            invoiceType: s.invoiceType,

        })),
        ...(modelPhotographys || []).map((s) => ({
            checkboxId: `mp-${s.id}`,
            mainServiceId: s.id,
            name: s.activityName,
            billCycle: s.billCycleTitle,
            price: s.totalPrice,
            durationRequired: s.durationRequired,
            source: "Model Photography",
            isInvoiceChecked: s.isInvoiceChecked,
            invoiceType: s.invoiceType,

        })),
        ...(aContentPhotographys || []).map((s) => ({
            checkboxId: `acp-${s.id}`,
            mainServiceId: s.id,
            name: s.activityName,
            billCycle: s.billCycleTitle,
            price: s.totalPrice,
            durationRequired: s.durationRequired,
            source: "A Content Photography",
            isInvoiceChecked: s.isInvoiceChecked,
            invoiceType: s.invoiceType,

        })),
        ...(storePhotographys || []).map((s) => ({
            checkboxId: `sp-${s.id}`,
            mainServiceId: s.id,
            name: s.activityName,
            billCycle: s.billCycleTitle,
            price: s.totalPrice,
            durationRequired: s.durationRequired,
            source: "Store Photography",
            isInvoiceChecked: s.isInvoiceChecked,
            invoiceType: s.invoiceType,

        })),
        ...(socialMediaContentPhotographys || []).map((s) => ({
            checkboxId: `smc-${s.id}`,
            mainServiceId: s.id,
            name: s.activityName,
            billCycle: s.billCycleTitle,
            price: s.totalPrice,
            durationRequired: s.durationRequired,
            source: "Social Media Content Photography",
            isInvoiceChecked: s.isInvoiceChecked,
            invoiceType: s.invoiceType,

        })),
    ];

    const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    const filteredServices = allServices?.filter((service) => {
        const name = service?.name?.toLowerCase() || "";
        return name.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="container-fluid position-relative bg-white d-flex p-0">
            <SellerSidebar isOpen={isSidebarOpen} />
            <div className="content flex-grow-1" style={{ marginLeft: isSidebarOpen ? 259 : 95, transition: "margin-left 0.3s" }}>
                <SellerNavbar onToggleSidebar={handleToggleSidebar} />

                <div className="container-fluid px-4 pt-3">
                    <div className="bg-white p-3 rounded shadow-sm card-header mb-2 d-flex justify-content-between align-items-center">
                        <h5 className="m-0">Services List</h5>
                    </div>

                    {/* filter */}
                    <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
                        <div className="row g-2 align-items-center">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light"
                                    placeholder="Search by Services"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="col-md-2 d-flex">
                                <button className="btn btn-success text-white me-3">
                                    <i className="bi bi-search"></i>
                                </button>
                                <button
                                    className="btn btn-light border-1"
                                    onClick={() => {
                                        setSearchTerm("");
                                    }}
                                >
                                    <i className="bi bi-arrow-clockwise"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* table */}
                    <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
                        {loading ? (
                            <p>Loading services...</p>
                        ) : filteredServices?.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table align-middle table-striped table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>S.no</th>
                                            <th>Service Name</th>
                                            <th>Bill Cycle</th>
                                            <th>Price</th>
                                            <th>Source</th>
                                            <th>Invoice Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredServices.length > 0 ? (
                                            filteredServices.map((service, index) => (
                                                console.log('service', service),
                                                <tr key={service.checkboxId}>
                                                    <td>{index + 1}</td>
                                                    <td>{service.name}</td>
                                                    <td>{service.billCycle || "N/A"}</td>
                                                    <td>{service.price || "0.00"}</td>
                                                    <td>{service.source}</td>
                                                    <td>
                                                        <button
                
                                                            className={`btn ${service.invoiceType === 1
                                                                ? "btn-warning"
                                                                : service.invoiceType === 2
                                                                    ? "btn-success"
                                                                    : "btn-secondary"
                                                                }`}
                                                        >
                                                            {service.invoiceType === 1
                                                                ? "Proforma"
                                                                : service.invoiceType === 2
                                                                    ? "Tax Invoice"
                                                                    : "In progress"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center text-muted">
                                                    No services found for this business.
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center">No services found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerServicesList;
