import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditTeamModal from "../components/Modal/EditTeamModal";
import ViewTeamModal from "../components/Modal/ViewTeamModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import {
  fetchTeams,
  deleteTeam,
  updateTeam,
  clearSuccessMessage,
} from "../../redux/actions/teamActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageTeams = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const dispatch = useDispatch();
  const { teams = [], loading = false, error = null, successMessage = null } =
    useSelector((state) => state.teams || {});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Fetch teams on load
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  // Show success messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

  // Handle sidebar toggle based on screen width
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("");
    dispatch(fetchTeams());
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await dispatch(deleteTeam(deleteId));
    } catch (err) {
      toast.error("Failed to delete team. Please try again.");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  // Save updated team from modal
  const handleSaveChanges = async (updatedTeam) => {
    if (!updatedTeam) return;
    try {
      await dispatch(updateTeam(updatedTeam));
      setShowEditModal(false);
      setSelectedTeam(null);
    } catch (err) {
      toast.error("Failed to update team. Please try again.");
    }
  };

  // Filter teams by name and status
  const filteredTeams = teams.filter((team) => {
    const matchesName = team.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "active"
          ? team.status === true
          : team.status === false;
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
                  <h5 className="form-title m-0">Manage Teams</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/add-team" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Team
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="row mb-4">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search by Name"
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
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex">
                  <button
                    className="btn btn-success text-white me-3"
                    onClick={() => dispatch(fetchTeams())}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                  <button
                    className="btn btn-light border-1"
                    onClick={handleRefresh}
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
                  <p>Loading teams...</p>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : filteredTeams.length === 0 ? (
                  <p>No teams found.</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Password</th>

                        <th>Role</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTeams.map((team, index) => (
                        <tr key={team.id}>
                          <td>{index + 1}</td>
                          <td>{team.name}</td>
                          <td>{team.gender || "-"}</td>
                          <td>{team.email}</td>
                          <td>{team.password}</td>

                          <td>
                            {team.userRole === 1
                              ? "Admin"
                              : team.userRole === 0
                                ? "User"
                                : "Editor"}
                          </td>
                          <td>{team.address || "-"}</td>
                          <td>
                            <span
                              className={`badge ${team.status
                                ? "bg-success-light text-success"
                                : "bg-danger-light text-danger"
                                }`}
                            >
                              {team.status ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-icon btn-view"
                                onClick={() => {
                                  setSelectedTeam(team);
                                  setShowViewModal(true);
                                }}
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-edit"
                                onClick={() => {
                                  setSelectedTeam(team);
                                  setShowEditModal(true);
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-delete"
                                onClick={() => {
                                  setDeleteId(team.id);
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
              <EditTeamModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                selectedTeam={selectedTeam}
                handleSaveChanges={handleSaveChanges}
              />
              <ViewTeamModal
                showViewModal={showViewModal}
                setShowViewModal={setShowViewModal}
                selectedTeam={selectedTeam}
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

export default ManageTeams;
