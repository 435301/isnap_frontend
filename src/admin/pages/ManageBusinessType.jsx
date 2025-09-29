import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditMarketTypeOffcanvas from "../components/Modal/EditMarketTypeOffcanvas";
import ViewMarketTypeModal from "../components/Modal/ViewMarketTypeModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import { fetchMarketTypes, deleteMarketType, updateMarketType, clearMarketTypeSuccessMessage } from "../../redux/actions/marketTypeActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageBusinessType = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
  const [selectedMarketType, setSelectedMarketType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { marketTypes, loading, error, totalPages, successMessage } = useSelector((state) => state.marketType);

  useEffect(() => {
    dispatch(fetchMarketTypes(currentPage, itemsPerPage, searchTerm, statusFilter));
  }, [dispatch, currentPage, searchTerm, statusFilter]);

useEffect(() => {
  if (successMessage) {
    toast.success(successMessage);
    dispatch(clearMarketTypeSuccessMessage());
  }
 
}, [successMessage, error, dispatch]);


  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleRefresh = () => {
    setSearchTerm(""); setStatusFilter(null); setCurrentPage(1);
    dispatch(fetchMarketTypes(1, itemsPerPage, "", ""));
  };
  const handleStatusChange = (e) => setStatusFilter(e.target.value === "" ? null : Number(e.target.value));

  const handleConfirmDelete = async () => {
    await dispatch(deleteMarketType(deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
    dispatch(fetchMarketTypes(currentPage, itemsPerPage, searchTerm, statusFilter));
  };

const handleSaveChanges = async (updatedMarketType) => {
  try {
    await dispatch(updateMarketType(updatedMarketType));
    setShowEditOffcanvas(false);
    setSelectedMarketType(null);
    dispatch(fetchMarketTypes(currentPage, itemsPerPage, searchTerm, statusFilter));
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content flex-grow-1" style={{ marginLeft: isSidebarOpen ? 259 : 95, transition: "margin-left 0.3s" }}>
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header d-flex justify-content-between align-items-center">
              <h5 className="form-title m-0">Manage Business Type</h5>
              <Link to="/add-business-type" className="btn btn-new-lead">
                <i className="bi bi-plus-circle me-1"></i> Add Business Type
              </Link>
            </div>
          </div>

          {/* Filter */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search by Business Type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={statusFilter === null ? "" : statusFilter}
                    onChange={handleStatusChange}
                  >
                    <option value="">All</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div className="col-md-2  d-flex">
                  <button
                    className="btn btn-success me-3"
                    onClick={() => setCurrentPage(1)}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light" onClick={handleRefresh}>
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
                {loading ? <p>Loading market types...</p> : marketTypes.length === 0 ? <p>No markettypes found.</p> :
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Business Type </th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketTypes.map((m, index) => (
                        <tr key={m.id}>
                          <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                          <td>{m.marketTypeName}</td>
                          <td><span className={`badge ${m.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>{m.status ? "Active" : "Inactive"}</span></td>
                          <td>
                            <div className="d-flex gap-2">
                              <button className="btn btn-icon btn-view" onClick={() => { setSelectedMarketType(m); setShowViewModal(true); }}>
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-icon btn-edit" onClick={() => { setSelectedMarketType(m); setShowEditOffcanvas(true); }}>
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button className="btn btn-icon btn-delete" onClick={() => { setDeleteId(m.id); setShowDeleteModal(true); }}>
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-end mt-3">
            <nav>
              <ul className="pagination custom-pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
                </li>
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                  <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Modals */}
          {showViewModal && <ViewMarketTypeModal show={showViewModal} handleClose={() => setShowViewModal(false)} marketType={selectedMarketType} />}
          {showEditOffcanvas && <EditMarketTypeOffcanvas show={showEditOffcanvas} handleClose={() => setShowEditOffcanvas(false)} marketType={selectedMarketType} onSave={handleSaveChanges} />}
          {showDeleteModal && (
            <DeleteConfirmationModal
              show={showDeleteModal}
              handleClose={() => setShowDeleteModal(false)}
              handleConfirm={handleConfirmDelete}
            />
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ManageBusinessType;
