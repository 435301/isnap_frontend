import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import PaginationComponent from "../../common/pagination";
import { deleteSupportStatus, fetchSupportStatus, updateSupportStatus } from "../../redux/actions/supportStatusAction";
import EditSupportStatusOffcanvas from "../components/Modal/EditSupportStatusModal";
import ViewSupportStatus from "../components/Modal/ViewSupportStatusModal";

const ManageSupportStatus = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
  const [selectedSupportStatus, setSelectedSupportStatus] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { supportStatusList, loading, error, pagination, limit } = useSelector((state) => state.supportStatus);

  useEffect(() => {
    dispatch(fetchSupportStatus({
      search: searchTerm,
      page: currentPage,
      showStatus: statusFilter,
    }));
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  const handleSaveChanges = async (data) => {
    try {
      await dispatch(updateSupportStatus(data.id, data));
      setShowEditOffcanvas(false);
      setSelectedSupportStatus(null);
      dispatch(fetchSupportStatus({
      search: searchTerm,
      page: currentPage,
      showStatus: statusFilter,
    }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteSupportStatus(deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
    dispatch(fetchSupportStatus({
      search: searchTerm,
      page: currentPage,
      showStatus: statusFilter,
    }));
  };


  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content flex-grow-1" style={{ marginLeft: isSidebarOpen ? 259 : 95, transition: "margin-left 0.3s" }}>
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header d-flex justify-content-between align-items-center">
              <h5 className="form-title m-0">Manage Support Status</h5>
              <Link to="/add-support-status" className="btn btn-new-lead">
                <i className="bi bi-plus-circle me-1"></i> Add Support Status
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
                    placeholder="Search by support status"
                    value={searchTerm}
                    onChange={(e) =>{ setSearchTerm(e.target.value); setCurrentPage(1)}}
                  />
                </div>
                <div className="col-md-3">
                 <select className="form-select me-2"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(Number(e.target.value));
                      setCurrentPage(1);
                    }}>
                    <option value="">Select Status</option>
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
              
                <div className="col-md-2  d-flex">
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
                  <p>Loading support atatus...</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Support Status</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportStatusList.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">No Support Status found.</td>
                        </tr>
                      ) : (
                        supportStatusList.map((m, index) => (
                          <tr key={m.id}>
                            <td>{index + 1}</td>
                            <td>{m.supportStatusTitle}</td>

                            <td>
                              <span className={`badge ${m.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>
                                {m.status === 1 ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button className="btn btn-icon btn-view" onClick={() => { setSelectedSupportStatus(m); setShowViewModal(true); }}>
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button className="btn btn-icon btn-edit" onClick={() => { setSelectedSupportStatus(m); setShowEditOffcanvas(true); }}>
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

          {/* Modals */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={pagination.total}
            onPageChange={setCurrentPage}
          />
          {showViewModal && <ViewSupportStatus show={showViewModal} handleClose={() => setShowViewModal(false) }  supportStatus= {selectedSupportStatus} />}
          {showEditOffcanvas && <EditSupportStatusOffcanvas show={showEditOffcanvas} handleClose={() => setShowEditOffcanvas(false)} onSave={handleSaveChanges} supportStatus= {selectedSupportStatus}  />}
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

export default ManageSupportStatus;
