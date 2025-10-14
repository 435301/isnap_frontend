import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import EditBusinessModal from "../components/Modal/EditBusinessModal";
import {
  fetchBusinessDetails,
  deleteBusiness,
  clearBusinessSuccessMessage,
  updateBusiness,
} from "../../redux/actions/businessActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ManageSellers = () => {
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

  const dispatch = useDispatch();
  const {
    businessDetails = [],
    loading = false,
    successMessage = null,
    totalPages = 1,
  } = useSelector((state) => state.business || {});

  // Handle window resize
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
    dispatch(fetchBusinessDetails(currentPage, itemsPerPage, searchTerm, numericStatus));
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
    dispatch(fetchBusinessDetails(1, itemsPerPage, ""));
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteBusiness(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      dispatch(fetchBusinessDetails(currentPage, itemsPerPage, searchTerm, statusFilter));
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
      dispatch(fetchBusinessDetails(currentPage, itemsPerPage, searchTerm, statusFilter));
    } catch (err) {
      toast.error("Failed to update seller.");
    }
  };

  // Filter sellers on frontend
  const filteredSellers = (Array.isArray(businessDetails) ? businessDetails : [])
    .filter((seller) => {
      const matchesSearch = seller.businessName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "" || String(seller.status) === statusFilter;
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
              <div className="table-responsive">
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
                                to={`/view-seller/${seller?.id}`}
                                className="btn btn-icon btn-view"
                              >
                                <i className="bi bi-eye"></i>
                              </Link>

                              <Link
                                to={`/edit-seller/${seller?.id}`}
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
                              {/* Voice Button */}
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
                                  <a className="dropdown-item" href="#">
                                    Aprove
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Rejected
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Invoice
                                  </a>
                                </li>
                              </ul>
                            </div>

                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

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
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default ManageSellers;
