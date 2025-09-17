import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  fetchStates,
  deleteState,
  updateState,
  clearStateSuccessMessage,
} from "../../redux/actions/stateActions";
import EditStateModal from "../components/Modal/EditStateModal";
import ViewStateModal from "../components/Modal/ViewStateModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const dispatch = useDispatch();
  const {
    states = [],
    loading = false,
    error = null,
    successMessage = null,
  } = useSelector((state) => state.state || {});

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearStateSuccessMessage());
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("");
    dispatch(fetchStates());
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteState(deleteId));
    } catch {
      toast.error("Failed to delete state.");
    } finally {
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
    } catch {
      toast.error("Failed to update state.");
    }
  };
  // useEffect(() => {
  //   if (successMessage) {
  //     toast.success(successMessage); // ✅ show toast
  //     dispatch(clearStateSuccessMessage()); // ✅ clear message after showing
  //   }
  // }, );

  // Filter states by name and status
  const filteredStates = states.filter((state) => {
    const stateName = state.stateName || "";
    const matchesName = stateName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "active"
          ? state.stateStatus === 1
          : state.stateStatus === 0;

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
          <div className="row mb-4">
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
          <div className="row mb-4">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
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
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option> {/* 🔥 fixed value */}
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
                          <td>{st.stateName}</td>
                          <td>
                            <span
                              className={`badge ${st.stateStatus
                                ? "bg-success-light text-success"
                                : "bg-danger-light text-danger"
                                }`}
                            >
                              {st.stateStatus ? "Active" : "In Active"}
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

              {/* Modals */}
              <EditStateModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
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
