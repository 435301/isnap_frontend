import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditCommissionModal from "../components/Modal/EditCommissionModal";
import ViewCommissionModal from "../components/Modal/ViewCommissionModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import {
  fetchCommissions,
  updateCommission,
  deleteCommission,
  clearCommissionSuccessMessage,
} from "../../redux/actions/commissionActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCommissionPricing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedCommission, setSelectedCommission] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const {
    commissions = [], // Default to empty array
    loading = false,
    error = null,
    successMessage = null,
    totalPages = 1,
  } = useSelector((state) => state.commission || {});

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch commissions
  useEffect(() => {
    console.log("Fetching commissions with:", { currentPage, searchTerm, statusFilter });
    dispatch(fetchCommissions(currentPage, itemsPerPage, searchTerm, statusFilter));
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  // Toast success message
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearCommissionSuccessMessage());
    }
  }, [successMessage, dispatch]);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
    dispatch(fetchCommissions(1, itemsPerPage, "", ""));
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteCommission(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      dispatch(fetchCommissions(currentPage, itemsPerPage, searchTerm, statusFilter));
    } catch {
      toast.error("Failed to delete commission.");
    }
  };

  const handleSaveChanges = async (updatedCommission) => {
    try {
      await dispatch(updateCommission(updatedCommission));
      setShowEditModal(false);
      setSelectedCommission(null);
      dispatch(fetchCommissions(currentPage, itemsPerPage, searchTerm, statusFilter));
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update commission";
      toast.error(errorMessage);
    }
  };

  // Filter commissions with defensive checks
  const filteredCommissions = commissions
    .filter((commission) => commission && commission.title) // Ensure valid commission objects
    .filter((commission) => {
      const title = commission.title || "";
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "" || String(commission.status) === statusFilter;
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
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Manage Commission Pricing</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/create-commission" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Commission Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="row mb-3">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search by Commission Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <option value="">Select Status</option>
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
              <div className="table-responsive">
                <table className="table align-middle table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Commission Title</th>
                      <th>Percentage</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center git">
                          Loading commissions...
                        </td>
                      </tr>
                    ) : filteredCommissions.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No commissions found.
                        </td>
                      </tr>
                    ) : (
                      filteredCommissions.map((commission, index) => (
                        <tr key={commission.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{commission.title}</td>
                          <td>{commission.percentage}%</td>
                          <td>
                            <span
                              className={`badge ${commission.status === 1
                                  ? "bg-success-light text-success"
                                  : "bg-danger-light text-danger"
                                }`}
                            >
                              {commission.status === 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-icon btn-view"
                                onClick={() => {
                                  setSelectedCommission(commission);
                                  setShowViewModal(true);
                                }}
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-edit"
                                onClick={() => {
                                  setSelectedCommission(commission);
                                  setShowEditModal(true);
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-delete"
                                onClick={() => {
                                  setDeleteId(commission.id);
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
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-end align-items-center mt-3">
                <nav>
                  <ul className="pagination custom-pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        &lt;
                      </button>
                    </li>
                    {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                      <li
                        key={page}
                        className={`page-item ${currentPage === page ? "active" : ""}`}
                      >
                        <button className="page-link" onClick={() => setCurrentPage(page)}>
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        &gt;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Modals */}
              <EditCommissionModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                selectedCommission={selectedCommission}
                handleSaveChanges={handleSaveChanges}
              />
              <ViewCommissionModal
                show={showViewModal}
                handleClose={() => setShowViewModal(false)}
                commission={selectedCommission}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDelete}
      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ManageCommissionPricing;