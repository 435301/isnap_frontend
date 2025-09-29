import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditTeamOffcanvas from "../components/Modal/EditTeamModal";
import ViewTeamModal from "../components/Modal/ViewTeamModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import { fetchTeams, deleteTeam, updateTeam, clearSuccessMessage } from "../../redux/actions/teamActions";
import { fetchRoles } from "../../redux/actions/roleActions";
import { ToastContainer, toast } from "react-toastify";
import BASE_URL from "../../config/config";

const ManageTeams = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const dispatch = useDispatch();
  const { teams = [], loading, error, successMessage, errorMessage } = useSelector(state => state.teams || {});
  const { roles = [] } = useSelector(state => state.roles || {});

  // Fetch teams and roles on mount
  useEffect(() => {
    dispatch(fetchTeams());
    if (!roles.length) {
      dispatch(fetchRoles());
    }
  }, [dispatch]);

  // Toast messages
  useEffect(() => {
    if (successMessage) { toast.success(successMessage); dispatch(clearSuccessMessage()); }
    if (errorMessage) { toast.error(errorMessage); }
  }, [successMessage, errorMessage, dispatch]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar toggle
  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const handleRefresh = () => { setSearchTerm(""); setStatusFilter(""); dispatch(fetchTeams()); };

  // Delete team
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteTeam(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete team.");
    }
  };

  // Save edited team
  const handleSaveChanges = async updatedTeam => {
    try {
      await dispatch(updateTeam(updatedTeam));
      dispatch(fetchTeams()); // ensure refresh
      setShowEditModal(false);
      setSelectedTeam(null);
    } catch {
      toast.error("Failed to update team.");
    }
  };

  // Filter teams
  const filteredTeams = teams.filter(team => {
    const matchesName = team.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === ""
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
          marginLeft: windowWidth >= 992
            ? (isSidebarOpen ? 259 : 95)
            : (isSidebarOpen ? 220 : 0),
          transition: "margin-left 0.3s"
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid px-4 pt-3">

          {/* Header */}
          <div className="row mb-4">
            <div className="bg-white p-3 rounded shadow-sm card-header d-flex justify-content-between align-items-center">
              <h5 className="m-0">Manage Teams</h5>
              <Link to="/add-team" className="btn btn-new-lead">
                <i className="bi bi-plus-circle me-1"></i> Add Team
              </Link>
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
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <select className="form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex">
                  <button className="btn btn-success me-2" onClick={() => dispatch(fetchTeams())}><i className="bi bi-search"></i></button>
                  <button className="btn btn-light" onClick={handleRefresh}><i className="bi bi-arrow-clockwise"></i></button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="table-responsive">
                {loading || !roles.length ? <p>Loading teams and roles...</p> :
                  error ? <div className="alert alert-danger">{error}</div> :
                    filteredTeams.length === 0 ? <p>No teams found.</p> :
                      <table className="table align-middle table-striped table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Email</th>
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
                              <td>{roles?.find(r => r.id === team.userRole)?.roleTitle || "-"}</td>
                              <td>{team.address || "-"}</td>
                              <td>
                                <span className={`badge ${team.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>
                                  {team.status ? "Active" : "Inactive"}
                                </span>

                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button className="btn btn-icon btn-view" onClick={() => { setSelectedTeam(team); setShowViewModal(true); }}><i className="bi bi-eye"></i></button>
                                  <button className="btn btn-icon btn-edit" onClick={() => { setSelectedTeam(team); setShowEditModal(true); }}><i className="bi bi-pencil-square"></i></button>
                                  <button className="btn btn-icon btn-delete" onClick={() => { setDeleteId(team.id); setShowDeleteModal(true); }}><i className="bi bi-trash"></i></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>}
              </div>
            </div>
          </div>

          {/* Modals */}
          <EditTeamOffcanvas
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            selectedTeam={selectedTeam}
            handleSaveChanges={handleSaveChanges}
            baseUrl={BASE_URL}
          />
          <ViewTeamModal
            showViewModal={showViewModal}
            setShowViewModal={setShowViewModal}
            selectedTeam={selectedTeam}
            baseUrl={BASE_URL}
          />
          <DeleteConfirmationModal
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            handleConfirm={confirmDelete}
          />

        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default ManageTeams;
