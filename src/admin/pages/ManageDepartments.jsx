import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditDepartmentModal from "../components/Modal/EditDepartmentModal";
import ViewDepartmentModal from "../components/Modal/ViewDepartmentModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import {
  fetchDepartments,
  updateDepartment,
  deleteDepartment,
  clearDepartmentSuccessMessage,
} from "../../redux/actions/departmentActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageDepartments = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const {
    departments = [],
    loading = false,
    error = null,
    successMessage = null,
    totalPages = 1,
  } = useSelector((state) => state.department || {});

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    dispatch(fetchDepartments(currentPage, itemsPerPage, searchTerm, statusFilter));
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearDepartmentSuccessMessage());
    }
  }, [successMessage, dispatch]);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value === "" ? "" : Number(value));
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
    dispatch(fetchDepartments(1, itemsPerPage, "", ""));
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteDepartment(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      dispatch(fetchDepartments(currentPage, itemsPerPage, searchTerm, statusFilter));
    } catch {
      toast.error("Failed to delete department.");
    }
  };
  const handleSaveChanges = async (updatedDepartment) => {
    try {
      await dispatch(updateDepartment(updatedDepartment));
      // toast.success("Department updated successfully");
      setShowEditModal(false);
      setSelectedDepartment(null);
    } catch (err) {
      // Check if server provided a message
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update department";
      toast.error(errorMessage); // show toast instead of modal error
    }
  };

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
                  <h5 className="form-title m-0">Manage Departments</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/create-department" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Department
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
                    placeholder="Search by Department Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <select className="form-select" value={statusFilter} onChange={handleStatusChange}>
                    <option value="">Select Status</option>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                    <option value="">All</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex">
                  <button className="btn btn-success text-white me-3" onClick={() => setCurrentPage(1)}>
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
                  <p>Loading departments...</p>

                ) : departments.length === 0 ? (
                  <p>No departments found.</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>S.no</th>
                        <th>Department Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((dept, index) => (
                        <tr key={dept.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{dept.departmentName}</td>
                          <td>
                            <span className={`badge ${dept.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>
                              {dept.status ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button className="btn btn-icon btn-view" onClick={() => { setSelectedDepartment(dept); setShowViewModal(true); }}>
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-icon btn-edit" onClick={() => { setSelectedDepartment(dept); setShowEditModal(true); }}>
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button className="btn btn-icon btn-delete" onClick={() => { setDeleteId(dept.id); setShowDeleteModal(true); }}>
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
              {/* Pagination */}
              <div className="d-flex justify-content-end align-items-center mt-3">
                <nav>
                  <ul className="pagination custom-pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                        &lt;
                      </button>
                    </li>
                    {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                      <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                        &gt;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* Modals */}
              <EditDepartmentModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                selectedDepartment={selectedDepartment}
                handleSaveChanges={handleSaveChanges}
              />
              <ViewDepartmentModal
                show={showViewModal}
                handleClose={() => setShowViewModal(false)}
                department={selectedDepartment}
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

export default ManageDepartments;
