import React, { useState, useEffect } from "react";
import Sidebar from "../components/AccountsSidebar";
import Navbar from "../components/AccountsNavbar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMouDetails } from "../../redux/actions/mouAction";

const VoicePage = () => {
  const businessId = useParams().id;
  console.log('businessId', businessId)
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


  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
    dispatch(fetchMouDetails(businessId));
  },[dispatch]);

  // Flatten all services into separate rows
  const allServices = [
    ...(mouList || []).map((s) => ({
      id: `bl-${s.id}`,
      name: s.serviceTypeName,
      billCycle: s.billCycleTitle,
      price: s.offerPrice,
      source: "Business Launch",
    })),
    ...(serviceTypes || []).map((s) => ({
      id: `cl-${s.id}`,
      name: s.serviceTypeName,
      billCycle: s.billCycleTitle,
      price: s.offerPrice,
      source: "Catalog Listing",
    })),
    ...(keyAccountSubscriptions || []).map((s) => ({
      id: `ka-${s.id}`,
      name: s.serviceTypeName,
      billCycle: s.billCycleTitle,
      price: s.offerPrice,
      source: "Key Account Subscription",
    })),
    ...(keyAccountCommissions || []).flatMap((s) => [
      {
        id: `kac-security-${s.security.id}`,
        name: s.serviceTypeName,
        billCycle: "-",
        price: s.security.securityDeposit,
        source: "Key Account Commission",
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
      id: `ls-${s.id}`,
      name: s.activityName,
      billCycle: s.billCycleTitle,
      price: s.totalPrice,
      source: "Lifestyle Photography",
    })),
    ...(digitalMarketing
      ? [
          {
            id: `dm-${digitalMarketing.id}`,
            name: digitalMarketing.digitalMarketingServiceNames
              .map((d) => d.name)
              .join(", "),
            billCycle: digitalMarketing.billCycleTitle,
            price: digitalMarketing.offerPrice,
            source: "Digital Marketing",
          },
        ]
      : []),
    ...(productPhotographys || []).map((s) => ({
      id: `pp-${s.id}`,
      name: s.activityName,
      billCycle: s.billCycleTitle,
      price: s.totalPrice,
      source: "Product Photography",
    })),
    ...(modelPhotographys || []).map((s) => ({
      id: `mp-${s.id}`,
      name: s.activityName,
      billCycle: s.billCycleTitle,
      price: s.totalPrice,
      source: "Model Photography",
    })),
    ...(aContentPhotographys || []).map((s) => ({
      id: `acp-${s.id}`,
      name: s.activityName,
      billCycle: s.billCycleTitle,
      price: s.totalPrice,
      source: "A Content Photography",
    })),
    ...(storePhotographys || []).map((s) => ({
      id: `sp-${s.id}`,
      name: s.activityName,
      billCycle: s.billCycleTitle,
      price: s.totalPrice,
      source: "Store Photography",
    })),
    ...(socialMediaContentPhotographys || []).map((s) => ({
      id: `smc-${s.id}`,
      name: s.activityName,
      billCycle: s.billCycleTitle,
      price: s.totalPrice,
      source: "Social Media Content Photography",
    })),
  ];

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleCheckboxChange = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Services data

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content flex-grow-1" style={{ marginLeft: isSidebarOpen ? 259 : 95, transition: "margin-left 0.3s" }}>
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          <div className="bg-white p-3 rounded shadow-sm card-header mb-2 d-flex justify-content-between align-items-center">
            <h5 className="m-0">Create Invoice</h5>

            {/* Select Services Dropdown */}
            <div className="dropdown">
              {/* <button
                className="btn btn-primary btn-sm dropdown-toggle"
                type="button"
                id="servicesDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Service
              </button> */}
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                <li>
                  <a className="dropdown-item" href="#!">Service 1</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">Service 2</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">Service 3</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">Service 4</a>
                </li>
              </ul>
            </div>
          </div>


          <div className="bg-white p-3 rounded shadow-sm">
            <table className="table table-borderless">
              <thead>
                <tr>
                 <th className="fw-bold">Select</th>
                  <th className="fw-bold">Service Name</th>
                  <th className="fw-bold">Bill Cycle</th>
                  <th className="fw-bold">Price</th>
                  <th className="fw-bold">Source</th>
                </tr>
              </thead>
             <tbody>
                {allServices.length > 0 ? (
                  allServices.map((service) => (
                    <tr key={service.id}>
                      <td>
                        <input
                          type="checkbox"
                          className="me-2"
                          checked={selectedServices.includes(service.id)}
                          onChange={() => handleCheckboxChange(service.id)}
                        />
                      </td>
                      <td>{service.name}</td>
                      <td>{service.billCycle || "N/A"}</td>
                      <td>{service.price || "0.00"}</td>
                      <td>{service.source}</td>
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
            <div className="col-lg-12 text-left">
              <a href="/accounts/pages/invoice.html" className="btn btn-success">
                Create Invoice
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoicePage;
