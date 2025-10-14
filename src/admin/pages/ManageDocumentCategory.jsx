import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import PaginationComponent from "../../common/pagination";
import { deleteDocumentCategory, fetchDocumentCategories, updateDocumentCategory } from "../../redux/actions/docCategoryAction";
import EditDocCategoryOffcanvas from "../components/Modal/EditDocCategoryOffCanvas";
import ViewDocCategoryModal from "../components/Modal/ViewDocCategoryModal";

const ManageDocCategory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
  const [selectedDocCategory, setSelectedDocCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
 const { documentCategories, loading,totalPages } = useSelector(state => state.documentCategory);
 console.log('documentCategories',documentCategories)

  useEffect(() => {
    dispatch(fetchDocumentCategories({
      search: searchTerm,
      page: currentPage,
      showStatus: statusFilter === null ? "" : statusFilter
    }));
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter(null);
    setCurrentPage(1);
    dispatch(fetchDocumentCategories({ search: "", page: 1, showStatus: "" }));
  };
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value === "" ? null : Number(value));
    setCurrentPage(1);
  };

  const handleSaveChanges = async (updatedDocCategory) => {
    try {
      await dispatch(updateDocumentCategory(updatedDocCategory.id, updatedDocCategory));
      setShowEditOffcanvas(false);
      setSelectedDocCategory(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteDocumentCategory(deleteId));
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
              <h5 className="form-title m-0">Manage Document Category</h5>
              <Link to="/add-document-category" className="btn btn-new-lead">
                <i className="bi bi-plus-circle me-1"></i> Add Document Category
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
                    placeholder="Search by Document Category"
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
                  <p>Loading Document Categories...</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Document Category Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentCategories.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">No Document Category found.</td>
                        </tr>
                      ) : (
                        documentCategories.map((m, index) => (
                          <tr key={m.id}>
                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                            <td>{m.title}</td>
                            <td>
                              <span className={`badge ${m.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>
                                {m.status ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button className="btn btn-icon btn-view" onClick={() => { setSelectedDocCategory(m); setShowViewModal(true); }}>
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button className="btn btn-icon btn-edit" onClick={() => { setSelectedDocCategory(m); setShowEditOffcanvas(true); }}>
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
          {showViewModal && <ViewDocCategoryModal show={showViewModal} handleClose={() => setShowViewModal(false)} docCategory={selectedDocCategory} />}
          {showEditOffcanvas && <EditDocCategoryOffcanvas show={showEditOffcanvas} handleClose={() => setShowEditOffcanvas(false)} docCategory={selectedDocCategory} onSave={handleSaveChanges} />}
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

export default ManageDocCategory;
