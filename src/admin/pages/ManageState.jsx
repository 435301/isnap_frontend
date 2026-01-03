import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  fetchStates,
  deleteState,
  updateState,
} from "../../redux/actions/stateActions";
import EditStateModalBootstrap from "../components/Modal/EditStateModalBootstrap";
import ViewStateModal from "../components/Modal/ViewStateModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaginationComponent from "../../common/pagination";

const ManageState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

  const dispatch = useDispatch();
  const location = useLocation();
  const { states = [], loading = false, error = null , totalPages} = useSelector(
    (state) => state.state || {}
  );

  // Fetch states on mount
  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsSidebarOpen(width >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show toast if redirected from AddState
  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage, { toastId: "add-state-success" });
      window.history.replaceState({}, document.title); // Clear location state
    }
  }, [location.state]);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("");
    dispatch(fetchStates());
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteState(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      toast.success("State deleted successfully!", { toastId: "delete-success" });
    } catch (err) {
      toast.error(err?.message || "Failed to delete state.", { toastId: "delete-error" });
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleSaveChanges = async (updatedState) => {
    if (!updatedState) return;
    try {
      await dispatch(updateState(updatedState));
      setShowEditModal(false);
      setSelectedState(null);
      toast.success("State updated successfully!", { toastId: "update-success" });
    } catch (err) {
      toast.error(err?.message || "Failed to update state.", { toastId: "update-error" });
    }
  };

  // Filter states by name and status
  const filteredStates = states.filter((st) => {
    const stateName = st.stateName?.toLowerCase() || "";
    const matchesName = stateName.includes(searchTerm.toLowerCase());

    // Handle status filter: "" = All, active = true/1, inactive = false/0
    let matchesStatus = true;
    if (statusFilter === "active") matchesStatus = st.stateStatus === 1 || st.stateStatus === true;
    if (statusFilter === "inactive") matchesStatus = st.stateStatus === 0 || st.stateStatus === false;

    return matchesName && matchesStatus;
  });

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft:
            windowWidth >= 992
              ? isSidebarOpen
                ? 259
                : 95
              : isSidebarOpen
                ? 220
                : 0,
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
                  <h5 className="form-title m-0">Manage States</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/add-state" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add State
                  </Link>
                </div>
              </div>
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
                    placeholder="Search by State Name"
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex">
                  <button
                    className="btn btn-success text-white me-3"
                    onClick={() => dispatch(fetchStates())}
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
                  <p>Loading states...</p>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : filteredStates.length === 0 ? (
                  <p>No states found.</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>S.no</th>
                        <th>State Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStates.map((st, index) => (
                        <tr key={st.id}>
                          <td>{index + 1}</td>
                          <td>{st.stateName || "-"}</td>
                          <td>
                            <span
                              className={`badge ${st.stateStatus
                                ? "bg-success-light text-success"
                                : "bg-danger-light text-danger"
                                }`}
                            >
                              {st.stateStatus ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-icon btn-view"
                                onClick={() => {
                                  setSelectedState(st);
                                  setShowViewModal(true);
                                }}
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-edit"
                                onClick={() => {
                                  setSelectedState(st);
                                  setShowEditModal(true);
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-delete"
                                onClick={() => {
                                  setDeleteId(st.id);
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

              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages || 1}
                onPageChange={setCurrentPage}
              />

              {/* Modals */}
              <EditStateModalBootstrap
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                selectedState={selectedState}
                handleSaveChanges={handleSaveChanges}
              />
              <ViewStateModal
                showViewModal={showViewModal}
                setShowViewModal={setShowViewModal}
                selectedState={selectedState}
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

export default ManageState;
