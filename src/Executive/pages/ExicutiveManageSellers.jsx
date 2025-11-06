import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/ExecutiveSidebar";
import Navbar from "../components/ExecutiveNavbar";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import EditBusinessModal from "../components/Modal/EditBusinessModal";
import {
  deleteBusiness,
  clearBusinessSuccessMessage,
  updateBusiness,
  fetchBusinessDetailsExecutive,
  approveByManager,
} from "../../redux/actions/businessActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import PaginationComponent from "../../common/pagination";
import { approveMailToSeller, mailToRequestInvoice, rejectMailToSeller, sendWelcomeEmail } from "../../redux/actions/emailAction";
import ManagerDocumentView from "./ManagerDocument";
import { requestInvoice } from "../../redux/actions/invoiceAction";

const ManageSellers = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [reason, setReason] = useState("");
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);


  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  console.log('storedUser', storedUser);
  const derivedRoleType =
    storedUser?.roleName === "Sales Executive"
      ? "salesexecutive"
      : storedUser?.roleName === "Sales Manager"
        ? "salesmanager"
        : "";
  const [roleType, setRoleType] = useState(derivedRoleType);
  const [showModal, setShowModal] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const dispatch = useDispatch();
  const {
    businessDetailsSales = [], loading = false, successMessage = null, totalPages = 1, } = useSelector((state) => state.business || {});

  console.log('businessDetailsSales', businessDetailsSales);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch business details
  useEffect(() => {
    const numericStatus = statusFilter === "" ? "" : parseInt(statusFilter);
    dispatch(fetchBusinessDetailsExecutive(currentPage, itemsPerPage, searchTerm, numericStatus, roleType));
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  // Show toast for success messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearBusinessSuccessMessage());
    }
  }, [successMessage, dispatch]);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
    dispatch(fetchBusinessDetailsExecutive(1, itemsPerPage, ""));
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteBusiness(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      dispatch(fetchBusinessDetailsExecutive(currentPage, itemsPerPage, searchTerm, statusFilter, roleType));
    } catch {
      toast.error("Failed to delete seller.");
    }
  };

  const handleEdit = (business) => {
    setSelectedBusiness(business);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (data) => {
    try {
      await dispatch(updateBusiness(data));
      toast.success("Seller updated successfully!");
      setShowEditModal(false);
      dispatch(fetchBusinessDetailsExecutive(currentPage, itemsPerPage, searchTerm, statusFilter, roleType));
    } catch (err) {
      toast.error("Failed to update seller.");
    }
  };

  // Filter sellers on frontend
  const filteredSellers = (Array.isArray(businessDetailsSales) ? businessDetailsSales : [])
    .filter((seller) => {
      const matchesSearch = seller.businessName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "" || String(seller.status) === statusFilter;
      return matchesSearch && matchesStatus;
    });

  const handleApprove = async (businessId, email, name) => {
    try {
      const res = await dispatch(approveByManager(businessId));
      if (res?.status) {
        await dispatch(sendWelcomeEmail(name, email));
      }
    } catch (error) {
      console.log('error', error);
    }
  };


     const handleOpenInvoicePrompt = (businessId) => {
    setSelectedBusinessId(businessId);
    setShowPrompt(true);
  };
  
  const handleInvoice = async (businessId, comments) => {
      if (!comments.trim()) {
          toast.warn("Please enter a reason");
          return;
        }
    try {
      const res = dispatch(requestInvoice(businessId, comments));
      // if (res?.status) {
      await dispatch(mailToRequestInvoice(businessId));
       setShowPrompt(false);
      setReason("");
      // }
    } catch (error) {
      console.log('error', error);
    }
  };



  const handleManagerDocuments = (id) => {
    setSelectedSellerId(id);
    setShowModal(true);
  };

  const handledocumentApprove = () => {
    dispatch(approveMailToSeller(selectedSellerId));
  };


  const rejectDocumentMail = () => {
    dispatch(rejectMailToSeller(selectedSellerId));
  };

  

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : isSidebarOpen ? 220 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Manage Sellers</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/executive/create-seller" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Seller
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search by Business Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex">
                  <button
                    className="btn btn-success text-white me-3"
                    onClick={() => setCurrentPage(1)}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border-1" onClick={handleRefresh}>
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="table">
                {loading ? (
                  <p>Loading sellers...</p>
                ) : filteredSellers.length === 0 ? (
                  <p>No sellers found.</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>S.no</th>
                        <th>Business Name</th>
                        <th>Seller Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSellers.map((seller, index) => (
                        <tr key={seller?.id || index}>
                          <td>{index + 1}</td>
                          <td>{seller?.businessName || "-"}</td>
                          <td>{seller?.sellerName || "-"}</td>
                          <td>{seller?.regdEmail || "-"}</td>
                          <td>{seller?.regdMobile || "-"}</td>
                          <td>
                            <span
                              className={`badge ${seller?.status === 1
                                ? "bg-success-light text-success"
                                : "bg-danger-light text-danger"
                                }`}
                            >
                              {seller?.status === 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2 align-items-center">
                              <Link
                                to={`/executive/view-seller/${seller?.id}`}
                                className="btn btn-icon btn-view"
                              >
                                <i className="bi bi-eye"></i>
                              </Link>

                              <Link
                                to={`/executive/edit-seller/${seller?.id}`}
                                className="btn btn-icon btn-edit"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <button
                                className="btn btn-icon btn-delete"
                                onClick={() => {
                                  setDeleteId(seller?.id);
                                  setShowDeleteModal(true);
                                }}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                              {storedUser?.roleName === "Sales Manager" && (
                                <div className="dropdown">
                                  <button
                                    className="btn btn-icon btn-outline-secondary"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="bi bi-three-dots-vertical"></i>
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      {seller.isSalesManagerApprove === 1 ? (
                                        <button className="dropdown-item text-success" disabled>
                                          Approved
                                        </button>
                                      ) : (
                                        <button
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleApprove(seller.id, seller.regdEmail, seller.sellerName)
                                          }
                                        >
                                          Approve
                                        </button>
                                      )}
                                    </li>
                                    {/* <li>
                                      <button className="dropdown-item" >
                                        Reject
                                      </button>
                                    </li> */}
                                    <li>
                                      {seller.requestForInvoice === 1 ? (
                                        <button className="dropdown-item text-success" disabled>
                                          Invoice Requested
                                        </button>
                                      ) : (
                                        <button className="dropdown-item" onClick={() =>handleOpenInvoicePrompt(seller.id)}>
                                          Request for Invoice
                                        </button>
                                      )
                                      }
                                    </li>
                                    <li>
                                      <button className="dropdown-item" onClick={() => handleManagerDocuments(seller.id)}>
                                        Documents
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </div>
              {showPrompt && (
                <div className="small-prompt-overlay">
                  <div className="small-prompt-box">
                    <h6 className="mb-2">Request for Invoice</h6>
                    <textarea
                      className="form-control form-control-sm"
                      placeholder="Enter reason..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={5}
                    ></textarea>
                    <div className="mt-3 text-end">
                      <button
                        className="btn btn-light btn-sm me-2"
                        onClick={() => setShowPrompt(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleInvoice(selectedBusinessId, reason)
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages || 1}
        onPageChange={setCurrentPage}
      />

      {/* Edit Modal */}
      <EditBusinessModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        business={selectedBusiness}
        handleSave={handleSaveEdit}
      />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDelete}
      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {showModal && (
        <ManagerDocumentView businessId={selectedSellerId} show={showModal} onApprove={handledocumentApprove} onReject={rejectDocumentMail} onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ManageSellers;
