import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ViewServiceActivityModal from "../components/Modal/ViewServiceActivityModal";
import EditServiceActivityOffcanvas from "../components/Modal/EditServiceActivityOffcanvas";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import {
  fetchServiceActivities,
  deleteServiceActivity,
  updateServiceActivity,
  clearServiceActivitySuccessMessage,
} from "../../redux/actions/serviceActivityActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageServiceActivities = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const {
    activities,
    loading,
    error,
    totalPages,
    successMessage,
  } = useSelector((state) => state.serviceActivity);

  // Fetch activities
  useEffect(() => {
    dispatch(fetchServiceActivities(currentPage, itemsPerPage, searchTerm, statusFilter));
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  // Toast on success
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearServiceActivitySuccessMessage());
    }
    if (error) {
      toast.error(error);
    }
  }, [successMessage, error, dispatch]);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter(null);
    setCurrentPage(1);
    dispatch(fetchServiceActivities(1, itemsPerPage, "", ""));
  };

  const handleStatusChange = (e) =>
    setStatusFilter(e.target.value === "" ? null : e.target.value);

  const handleConfirmDelete = async () => {
    await dispatch(deleteServiceActivity(deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
    dispatch(fetchServiceActivities(currentPage, itemsPerPage, searchTerm, statusFilter));
  };

  const handleSaveChanges = async (updatedActivity) => {
    try {
      await dispatch(updateServiceActivity(updatedActivity));
      setShowEditOffcanvas(false);
      setSelectedActivity(null);
      dispatch(fetchServiceActivities(currentPage, itemsPerPage, searchTerm, statusFilter));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: isSidebarOpen ? 259 : 95,
          transition: "margin-left 0.3s",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header d-flex justify-content-between align-items-center">
              <h5 className="form-title m-0">Manage Service Activities</h5>
              <Link to="/create-service-activities" className="btn btn-new-lead">
                <i className="bi bi-plus-circle me-1"></i> Add Service Activity
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
                    placeholder="Search by Service Category"
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex">
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
                  <p>Loading service activities...</p>
                ) : activities.length === 0 ? (
                  <p>No activities found.</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Service Category</th>
                        <th>Service Type</th>
                        <th>Service Activity</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((a, index) => (
                        <tr key={a.id}>
                          <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                          <td>{a.serviceCategoryName}</td>
                          <td>{a.serviceTypeName || "-"}</td>
                          <td>{a.activityName}</td>
                          <td>
                            <span
                              className={`badge ${
                                a.status === "Active"
                                  ? "bg-success-light text-success"
                                  : "bg-danger-light text-danger"
                              }`}
                            >
                              {a.status}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-icon btn-view"
                                onClick={() => {
                                  setSelectedActivity(a);
                                  setShowViewModal(true);
                                }}
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-edit"
                                onClick={() => {
                                  setSelectedActivity(a);
                                  setShowEditOffcanvas(true);
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-delete"
                                onClick={() => {
                                  setDeleteId(a.id);
                                  setShowDeleteModal(true);
                                }}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-end mt-3">
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
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
                  (page) => (
                    <li
                      key={page}
                      className={`page-item ${currentPage === page ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
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
          {showViewModal && (
            <ViewServiceActivityModal
              show={showViewModal}
              handleClose={() => setShowViewModal(false)}
              activity={selectedActivity}
            />
          )}
          {showEditOffcanvas && (
            <EditServiceActivityOffcanvas
              show={showEditOffcanvas}
              handleClose={() => setShowEditOffcanvas(false)}
              activity={selectedActivity}
              onSave={handleSaveChanges}
            />
          )}
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

export default ManageServiceActivities;
