import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  fetchRoles,
  deleteRole,
  updateRole,
  clearSuccessMessage,
} from "../../redux/actions/roleActions";
import EditRoleModal from "../components/Modal/EditRoleModal";
import ViewRoleModal from "../components/Modal/ViewRoleModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageRoles = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const { roles = [], loading = false, error = null, successMessage = null } =
    useSelector((state) => state.roles || {});
    console.log('roles', roles)

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, dispatch]);

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
    dispatch(fetchRoles());
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteRole(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      toast.error(
        typeof err === "string" ? err : "Failed to delete role. Please try again."
      );
    }
  };

  const handleSaveChanges = async (updatedRole) => {
    if (!updatedRole) return;
    try {
      await dispatch(updateRole(updatedRole));
      setShowEditModal(false);
      setSelectedRole(null);
    } catch (err) {
      toast.error("Role title must contain only alphabets and spaces.");
    }
  };

  const filteredRoles = roles.filter((role) => {
    const roleName = role.roleTitle || role.name || "";
    const matchesName = roleName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "active"
        ? role.status === true || role.status === "active"
        : role.status === false || role.status === "inactive";
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
          <div className="row mb-3">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Manage Roles</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/add-role" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Role
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
                    placeholder="Search by Role Name"
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
                  <p>Loading roles...</p>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : roles.length === 0 ? (
                  <p>No roles found in raw data.</p>
                ) : filteredRoles.length === 0 ? (
                  <p>No roles found after filtering.</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>S.no</th>
                        <th>Wing Name</th>
                        <th>Department Name</th>
                        <th>Role Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRoles.map((role, index) => {
                        const roleId = role.id ?? role._id; // support both id and _id
                        return (
                          <tr key={roleId}>
                            <td>{index + 1}</td>
                            <td>{role.wingTitle}</td>
                            <td>{role.departmentName}</td>
                            <td>{role.roleTitle}</td>
                            <td>
                              <span
                                className={`badge ${
                                  role.status === true ||
                                  role.status === "active"
                                    ? "bg-success-light text-success"
                                    : "bg-danger-light text-danger"
                                }`}
                              >
                                {role.status === true ||
                                role.status === "active"
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-icon btn-view"
                                  onClick={() => {
                                    setSelectedRole(role);
                                    setShowViewModal(true);
                                  }}
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button
                                  className="btn btn-icon btn-edit"
                                  onClick={() => {
                                    setSelectedRole(role);
                                    setShowEditModal(true);
                                  }}
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                <button
                                  className="btn btn-icon btn-delete"
                                  onClick={() => {
                                    console.log("Delete roleId:", roleId);
                                    setDeleteId(roleId);
                                    setShowDeleteModal(true);
                                  }}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Modals */}
              <EditRoleModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                selectedRole={selectedRole}
                handleSaveChanges={handleSaveChanges}
              />
              <ViewRoleModal
                showViewModal={showViewModal}
                setShowViewModal={setShowViewModal}
                selectedRole={selectedRole}
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

export default ManageRoles;
