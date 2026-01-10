import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import PaginationComponent from "../../common/pagination";
import { deleteDocument, fetchDocuments, updateDocument } from "../../redux/actions/docTypeAction";
import EditDocTypeOffcanvas from "../components/Modal/EditDocTypeModal";
import { fetchDocumentCategories } from "../../redux/actions/docCategoryAction";
import ViewDocTypeModal from "../components/Modal/ViewDocTypeModal";
import { fetchDepartments } from "../../redux/actions/departmentActions";

const ManageDocType = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
  const [selectedDocType, setSelecteDocType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [doccatid, setDoccatid] = useState("");

  const dispatch = useDispatch();
  const { documents, loading, error, totalPages, limit } = useSelector((state) => state.documents);
  const { documentCategories } = useSelector(state => state.documentCategory);
  const { departments } = useSelector(state => state.department);
  console.log('departments', departments)
  useEffect(() => {
    dispatch(fetchDocuments({
      search: searchTerm,
      page: currentPage,
      showStatus: statusFilter === null ? "" : statusFilter,
      limit: limit,
      documentCategoryId: doccatid
    }));
    dispatch(fetchDocumentCategories())
    dispatch(fetchDepartments());
  }, [dispatch, currentPage, searchTerm, statusFilter, doccatid]);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter(null);
    setCurrentPage(1);
    setDoccatid("");
    dispatch(fetchDocuments({ search: "", page: "", showStatus: "", documentCategoryId: "", }));
  };
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value === "" ? null : Number(value));
    setCurrentPage(1);
  };

  const handleSaveChanges = async (updatedDocType) => {
    try {
      await dispatch(updateDocument(updatedDocType.id, updatedDocType));
      setShowEditOffcanvas(false);
      setSelecteDocType(null);
      dispatch(fetchDocuments());
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteDocument(deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };


  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content flex-grow-1" style={{ marginLeft: isSidebarOpen ? 259 : 95, transition: "margin-left 0.3s" }}>
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header d-flex justify-content-between align-items-center">
              <h5 className="form-title m-0">Manage Document Type</h5>
              <Link to="/add-document-type" className="btn btn-new-lead">
                <i className="bi bi-plus-circle me-1"></i> Add Document Type
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
                    placeholder="Search by Document Type"
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
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={doccatid}
                    onChange={(e) => setDoccatid(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {documentCategories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
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
                  <p>Loading Document Types...</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Document Category</th>
                        <th>Document Type</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">No Document Type found.</td>
                        </tr>
                      ) : (
                        documents.map((m, index) => (
                          <tr key={m.id}>
                            <td>{index + 1 + (currentPage - 1) * limit}</td>
                            <td>{m.documentCategoryTitle}</td>
                            <td>{m.documentType}</td>
                            <td>
                              {m.source?.length
                                ? m.source.map(dep => dep.name).join(", ")
                                : "-"}
                            </td>

                            <td>
                              <span className={`badge ${m.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>
                                {m.status ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button className="btn btn-icon btn-view" onClick={() => { setSelecteDocType(m); setShowViewModal(true); }}>
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button className="btn btn-icon btn-edit" onClick={() => { setSelecteDocType(m); setShowEditOffcanvas(true); }}>
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
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
          />
          {showViewModal && <ViewDocTypeModal show={showViewModal} handleClose={() => setShowViewModal(false)} docType={selectedDocType} />}
          {showEditOffcanvas && <EditDocTypeOffcanvas show={showEditOffcanvas} handleClose={() => setShowEditOffcanvas(false)} docType={selectedDocType} onSave={handleSaveChanges} documentCategories={documentCategories}  departments={departments} />}
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

export default ManageDocType;
