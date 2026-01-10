import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditServiceCategory from "../components/Modal/EditServiceCategory";
import ViewServiceCategoryModal from "../components/Modal/ViewServiceCategoryModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import PaginationComponent from "../../common/pagination";

import {
  fetchCategories,
  deleteCategory,
  updateCategory,
  clearCategorySuccessMessage,
} from "../../redux/actions/categoryActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageServicesCategory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 992) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Run on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dispatch = useDispatch();
  const {
    categories = [],
    loading = false,
    error = null,
    successMessage = null,
    totalPages = 1,
  } = useSelector((state) => state.category || {});

  // Fetch categories whenever filters or page change
  useEffect(() => {
    dispatch(
      fetchCategories(currentPage, itemsPerPage, searchTerm, statusFilter)
    );
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  // Toast notifications
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearCategorySuccessMessage());
    }
  }, [successMessage, dispatch]);

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
    dispatch(fetchCategories(1, itemsPerPage, "", "")); // ensure "" is passed
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value === "" ? "" : Number(value)); // convert "0"/"1" to number
    setCurrentPage(1); // reset to page 1 when filter changes
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteCategory(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      dispatch(
        fetchCategories(currentPage, itemsPerPage, searchTerm, statusFilter)
      );
    } catch {
      toast.error("Failed to delete category.");
    }
  };

  const handleSaveChanges = async (updatedCategory) => {
    if (!updatedCategory) return;
    try {
      await dispatch(updateCategory(updatedCategory));
      setShowEditModal(false);
      setSelectedCategory(null);
      dispatch(
        fetchCategories(currentPage, itemsPerPage, searchTerm, statusFilter)
      );
    } catch (err) {
      toast.error(err.message); //
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
                  <h5 className="form-title m-0">Manage Service Categories</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/add-service" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Services
                    Category
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
                    placeholder="Search by Category Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <option value="">All</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
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
                  <p>Loading categories...</p>
                ) : categories.length === 0 ? (
                  <p>No categories found.</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>S.no</th>
                        <th>Service Category Name</th>
                        <th>Service Category Code</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((cat, index) => (
                        <tr key={cat.id}>
                          <td>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td>{cat.serviceCategoryName}</td>
                          <td>{cat.serviceCategoryCode}</td>
                          <td>
                            <span
                              className={`badge ${
                                cat.status
                                  ? "bg-success-light text-success"
                                  : "bg-danger-light text-danger"
                              }`}
                            >
                              {cat.status ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-icon btn-view"
                                onClick={() => {
                                  setSelectedCategory(cat);
                                  setShowViewModal(true);
                                }}
                              >
                                <i className="bi bi-eye"></i>
                              </button>

                              <button
                                className="btn btn-icon btn-edit"
                                onClick={() => {
                                  setSelectedCategory(cat);
                                  setShowEditModal(true);
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              {/* <button
                                className="btn btn-icon btn-delete"
                                onClick={() => {
                                  setDeleteId(cat.id);
                                  setShowDeleteModal(true);
                                }}
                              >
                                <i className="bi bi-trash"></i>
                              </button> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages || 1}
                onPageChange={setCurrentPage}
              />

              {/* Modals */}
              <EditServiceCategory
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                selectedCategory={selectedCategory}
                handleSaveChanges={handleSaveChanges}
              />

              <ViewServiceCategoryModal
                show={showViewModal}
                handleClose={() => setShowViewModal(false)}
                services={selectedCategory}
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

export default ManageServicesCategory;
