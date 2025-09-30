import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditMarketTypeOffcanvas from "../components/Modal/EditMarketTypeOffcanvas";
import ViewMarketTypeModal from "../components/Modal/ViewMarketTypeModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import { fetchBusinessTypes, deleteBusinessType, updateBusinessType, } from "../../redux/actions/businessTypeAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditBusinessTypeOffcanvas from "../components/Modal/EditBusinessTypeOffcanvas";
import ViewBusinessTypeModal from "../components/Modal/ViewBusinessTypeModal";
import Pagination from "../../common/pagination";
import PaginationComponent from "../../common/pagination";

const ManageBusinessType = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const dispatch = useDispatch();
  const { businessTypes, loading, error, totalPages } = useSelector((state) => state.businessTypes);
  console.log('businessTypes', businessTypes)

  useEffect(() => {
    dispatch(fetchBusinessTypes({
      search: searchTerm,
      page: currentPage,
      limit:itemsPerPage,
      showStatus: statusFilter === null ? "" : statusFilter
    }));
  }, [dispatch, currentPage, searchTerm, statusFilter]);


  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleRefresh = () => {
    setSearchTerm(""); setStatusFilter(null); setCurrentPage(1);
    dispatch(fetchBusinessTypes({ search: "", page: 1, showStatus: "" }));
  };
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value === "" ? null : Number(value));
    setCurrentPage(1);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteBusinessType(deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleSaveChanges = async (updatedBusinessType) => {
    try {
      await dispatch(updateBusinessType(updatedBusinessType.id, updatedBusinessType));
      setShowEditOffcanvas(false);
      setSelectedBusinessType(null);
      dispatch(fetchBusinessTypes());
    } catch (err) {
      console.log('error')
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
                {loading ? (
                  <p>Loading business types...</p>
                ) : (
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
                      {businessTypes.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">No Business Type found.</td>
                        </tr>
                      ) : (
                        businessTypes.map((m, index) => (
                          <tr key={m.id}>
                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                            <td>{m.businessType}</td>
                            <td><span className={`badge ${m.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>{m.status ? "Active" : "Inactive"}</span></td>
                            <td>
                              <div className="d-flex gap-2">
                                <button className="btn btn-icon btn-view" onClick={() => {
                                  setSelectedBusinessType(m);
                                  setShowViewModal(true);
                                }}>
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button className="btn btn-icon btn-edit" onClick={() => {
                                  setSelectedBusinessType(m);
                                  setShowEditOffcanvas(true);
                                }}>
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-icon btn-delete" onClick={() => handleDeleteClick(m.id)}>
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
            </div>
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
          />
          {showViewModal && <ViewBusinessTypeModal show={showViewModal} handleClose={() => setShowViewModal(false)} businessType={selectedBusinessType} />}
          {showEditOffcanvas && <EditBusinessTypeOffcanvas show={showEditOffcanvas} handleClose={() => setShowEditOffcanvas(false)} businessType={selectedBusinessType} onSave={handleSaveChanges} />}
          {showDeleteModal && (
            <DeleteConfirmationModal
              show={showDeleteModal}
              handleClose={() => setShowDeleteModal(false)}
              handleConfirm={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBusinessType;
