// pages/SellerInvoices.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoiceAccounts, fetchInvoiceSeller, generateInvoice } from "../../redux/actions/invoiceAction";
import BASE_URL from "../../config/config";
import AccountsSidebar from "../components/AccountsSidebar";
import SellerNavbar from "../components/AccountsNavbar";

const AccountsInvoices = ({ businessId }) => {
  const dispatch = useDispatch();
  const { invoiceAccounts, loading, error } = useSelector((state) => state.invoiceAccounts);
  console.log('invoiceAccounts', invoiceAccounts)

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(fetchInvoiceAccounts(businessId));
  }, [dispatch, businessId]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredInvoices = invoiceAccounts?.filter((inv) => {
    const matchesSearch =
      searchTerm === "" ||
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "" || (typeFilter === "Proforma" ? inv.invoiceType === 1 : inv.invoiceType !== 1);
    return matchesSearch && matchesType;
  });

  const getInvoiceBadge = (type) =>
    type === 1 ? (
      <span>Proforma</span>
    ) : (
      <span>Final</span>
    );

const handleClearInvoice = async ( businessId, invoiceNumber, invoiceType) => {
  try {
    // We are re-sending the same file and invoiceNumber with type 2 (Final)
    const res = await dispatch(generateInvoice(businessId, invoiceNumber, invoiceType));
    if (res?.invoiceFile) {
      dispatch(fetchInvoiceAccounts(businessId));
      const fileUrl = `${BASE_URL}${res.invoiceFile}`;
      window.open(fileUrl, "_blank"); // open final invoice PDF in new tab
    } 
  } catch (err) {
    console.error("Error clearing invoice:", err);
  }
};

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <AccountsSidebar isOpen={isSidebarOpen} />
      <div className="content flex-grow-1">
        <SellerNavbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
            <h5 className="m-0"> Accounts Invoices</h5>
          </div>

          {/* Filter */}
          <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
            <div className="row g-2 align-items-center">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control border-0 bg-light"
                  placeholder="Search by Invoice Number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Proforma">Proforma</option>
                  <option value="Final">Final</option>
                </select>
              </div>
              <div className="col-md-2 d-flex">
                <button className="btn btn-success text-white me-3">
                  <i className="bi bi-search"></i>
                </button>
                <button
                  className="btn btn-light border-1"
                  onClick={() => {
                    setSearchTerm("");
                    setTypeFilter("");
                  }}
                >
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
            {loading ? (
              <p>Loading invoices...</p>
            ) : filteredInvoices?.length > 0 ? (
              <div className="table-responsive">
                <table className="table align-middle table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "60px" }}>S.no</th>
                      <th>Invoice Number</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Seller Name</th>
                      <th>Business Name</th>
                      <th>Seller Email</th>
                      <th>File</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((inv, index) => (
                      <tr key={inv.id}>
                        <td>{index + 1}</td>
                        <td>{inv.invoiceNumber}</td>
                        <td>{getInvoiceBadge(inv.invoiceType)}</td>
                        <td>{new Date(inv.createdAt).toLocaleString()}</td>

                        <td>{inv.sellerName}</td>
                        <td>{inv.businessName}</td>
                        <td>{inv.email}</td>
                        <td>
                          {inv.invoiceFile ? (
                            <a
                              href={`${BASE_URL}${inv.invoiceFile}`}
                              target="_blank"
                              rel="noreferrer"
                            // className="btn btn-sm btn-success"
                            >
                              View PDF
                            </a>
                          ) : (
                            <span className="text-muted">No File</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() => handleClearInvoice( inv.businessId, inv.invoiceNumber, 2)}
                          >
                            {inv.invoiceType === 2 ? "Cleared" : "Clear"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center">No invoices found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsInvoices;
