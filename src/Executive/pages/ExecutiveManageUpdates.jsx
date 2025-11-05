import React, { useState, useEffect } from 'react';
import Sidebar from '../components/ExecutiveSidebar';
import Navbar from '../components/ExecutiveNavbar';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLatestUpdate, fetchLatestUpdates } from '../../redux/actions/latestUpdatesAction';
import ViewUpdateModal from '../components/ViewLatestUpdateModal';
import DeleteConfirmationModal from '../components/Modal/DeleteConfirmationModal';
import PaginationComponent from '../../common/pagination';

const ManageUpdates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { latestUpdates, loading, error, totalPages, limit } = useSelector(
    (state) => state.latestUpdates
  );
  console.log('latestUpdates', latestUpdates)

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    dispatch(fetchLatestUpdates({
      search: searchTerm,
      page: currentPage,
      limit: limit,
      totalPages: totalPages,
      showStatus:""
    }));
  }, [dispatch, currentPage, searchTerm, totalPages]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEdit = (id) => {
    navigate(`/edit-latest-updates/${id}`);
  };

  const handleView = (update) => {
    setSelectedUpdate(update);
    setShowViewModal(true);
  };

  const handleCloseModal = () => {
    setShowViewModal(false);
    setSelectedUpdate(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteLatestUpdate(deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setCurrentPage(1);
    dispatch(fetchLatestUpdates({ search: "", page: 1 }));
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
          {/* Page Header */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-2">
                  <h5 className="form-title m-0">Manage Updates</h5>
                </div>
                <div className="col-md-4"></div>
                <div className="col-lg-6 text-end">
                  <Link to="/executive/latest-updates" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Updates
                  </Link>
                </div>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Search by Latest updates"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
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
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <div className="table-responsive">
                {loading ? (
                  <p>Loading latest Updates...</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>S.no</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Send to whom</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestUpdates.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">No latest Updates  found.</td>
                        </tr>
                      ) : (
                        latestUpdates.map((update, index) => (
                          <tr key={update.id}>
                            <td>{index + 1}</td>
                            <td>{update.title}</td>
                            <td>{update.description}</td>
                            <td>{update?.roleName || "All"}</td>
                            <td>
                              <div className="d-flex gap-2 align-items-center">
                                <button className="btn btn-icon btn-view" onClick={() => handleView(update)}>
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button className="btn btn-icon btn-edit" onClick={() => handleEdit(update.id)}>
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-icon btn-delete" onClick={() => handleDeleteClick(update.id)}>
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
            <ViewUpdateModal
              show={showViewModal}
              handleClose={handleCloseModal}
              update={selectedUpdate}
            />
            {showDeleteModal && (
              <DeleteConfirmationModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirm={handleDelete}
              />
            )}
            <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUpdates;