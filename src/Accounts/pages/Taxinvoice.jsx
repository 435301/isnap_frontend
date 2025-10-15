import React, { useState, useEffect } from "react";
import Sidebar from "../components/AccountsSidebar";
import Navbar from "../components/AccountsNavbar";
import { Link } from "react-router-dom";

const VoicePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Services state
  const [services, setServices] = useState([
    { name: "Fkipcard", price: "Rs-350", checked: false },
    { name: "Amzon", price: "Rs-450", checked: false },
    { name: "Flipkart", price: "Rs-550", checked: false },
  ]);
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleCheckboxChange = (index) => {
    const updatedServices = [...services];
    updatedServices[index].checked = !updatedServices[index].checked;
    setServices(updatedServices);
  };

  // Services data

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content flex-grow-1" style={{ marginLeft: isSidebarOpen ? 259 : 95, transition: "margin-left 0.3s" }}>
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          <div className="bg-white p-3 rounded shadow-sm card-header mb-2 d-flex justify-content-between align-items-center">
            <h5 className="m-0">Voice Page Services</h5>

            {/* Select Services Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-primary btn-sm dropdown-toggle"
                type="button"
                id="servicesDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Service
              </button>
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
                  <th className="fw-bold">Services</th>
                  <th className="fw-bold">Price</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        id={`service-${index}`}
                        name={`service-${index}`}
                        className="me-2"
                        value={service.name}
                        checked={service.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <label htmlFor={`service-${index}`}>{service.name}</label>
                    </td>
                    <td>{service.price}</td>
                  </tr>
                ))}
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
