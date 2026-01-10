import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditBillingOffcanvas from "../components/Modal/EditBillingOffcanvas";
import ViewBillingModal from "../components/Modal/ViewBillingModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import {
  fetchBillingCycles,
  updateBillingCycle,
  deleteBillingCycle,
  clearBillingSuccessMessage,
} from "../../redux/actions/billingActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaginationComponent from "../../common/pagination";

const ManageBilling = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedBilling, setSelectedBilling] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const location = useLocation();
  const {
    billingCycles = [],
    loading = false,
    error = null,
    successMessage = null,
    totalPages = 1,
  } = useSelector((state) => state.billing || {});

  // Handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch billing cycles
  useEffect(() => {
    dispatch(fetchBillingCycles(currentPage, itemsPerPage, searchTerm, statusFilter));
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  // Show toast for success messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearBillingSuccessMessage());
    }
  }, [successMessage, dispatch]);

  // Delete confirmation
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteBillingCycle(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      dispatch(fetchBillingCycles(currentPage, itemsPerPage, searchTerm, statusFilter));
    } catch {
      toast.error("Failed to delete billing cycle.");
    }
  };

  // Save changes from edit modal
  const handleSaveChanges = async (updatedBilling) => {
    try {
      await dispatch(updateBillingCycle(updatedBilling));
      setShowEditModal(false);
      setSelectedBilling({});
      dispatch(fetchBillingCycles(currentPage, itemsPerPage, searchTerm, statusFilter));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to update billing cycle");
    }
  };

  // Filter billing cycles on frontend (optional)
  const filteredBillingCycles = billingCycles.filter((billing) => {
    const matchesSearch = billing.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "" || String(billing.status) === statusFilter;
    return matchesSearch && matchesStatus;
  });


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
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Manage Billing Cycles</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/create-billing" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Billing Cycle
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search by Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >  <option value="">Select Status</option>
                    <option value="">All</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex">
                  <button
                    className="btn btn-light border-1"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("");
                      setCurrentPage(1);
                      dispatch(fetchBillingCycles(1, itemsPerPage, "", ""));
                    }}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="table-responsive">

                {loading ? (
                  <p>Loading billing cycles...</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Duration</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBillingCycles.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No billing cycles found.
                          </td>
                        </tr>
                      ) : (
                        filteredBillingCycles.map((billing, index) => (
                          <tr key={billing?.id || index}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{billing?.title || "-"}</td>
                            <td>
                              <span
                                className={`badge ${billing?.status
                                  ? "bg-success-light text-success"
                                  : "bg-danger-light text-danger"
                                  }`}
                              >
                                {billing?.status ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td>{Number(billing?.durationRequired) === 1 ? "Required" : "Not Required"}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-icon btn-view"
                                  onClick={() => {
                                    setSelectedBilling(billing);
                                    setShowViewModal(true);
                                  }}
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button
                                  className="btn btn-icon btn-edit"
                                  onClick={() => {
                                    setSelectedBilling(billing);
                                    setShowEditModal(true);
                                  }}
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                <button
                                  className="btn btn-icon btn-delete"
                                  onClick={() => {
                                    setDeleteId(billing.id);
                                    setShowDeleteModal(true);
                                  }}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages || 1}
                onPageChange={setCurrentPage}
              />

              {/* Modals */}
              <EditBillingOffcanvas
                showEditOffcanvas={showEditModal}
                setShowEditOffcanvas={setShowEditModal}
                selectedBilling={selectedBilling || {}}
                handleSaveChanges={handleSaveChanges}
              />
              <ViewBillingModal
                show={showViewModal}
                handleClose={() => setShowViewModal(false)}
                billing={selectedBilling || {}}
              />
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDelete}
      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ManageBilling;