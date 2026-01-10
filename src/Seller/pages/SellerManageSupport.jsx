import React, { useEffect, useState } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import useResponsiveSidebar from "../../components/useResponsiveSidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteSellerSupport, fetchSellerSupport, fetchSellerSupportById, fetchSellerSupportList } from "../../redux/actions/sellerSupportAction";
import { fetchIssueType } from "../../redux/actions/issueTypeAction";
import { fetchSupportStatus } from "../../redux/actions/supportStatusAction";
import BASE_URL from "../../config/config";
import PaginationComponent from "../../common/pagination";
import DeleteConfirmationModal from "../../admin/components/Modal/DeleteConfirmationModal";

const ManageSellerSupport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { windowWidth, isSidebarOpen, setIsSidebarOpen } = useResponsiveSidebar(992);
  const { supports, loading, pagination } = useSelector((state) => state.sellerSupport);
  const { supportStatusList } = useSelector((state) => state.supportStatus);
  const { issueTypes } = useSelector((state) => state.issueTypes);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [issueTypeId, setIssueTypeId] = useState("");
  const [supportStatusId, setSupportStatusId] = useState("");
  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchSellerSupport({ page: currentPage, search: searchTerm, issueTypeId: issueTypeId, supportStatusId: supportStatusId }));
    dispatch(fetchIssueType({ page: "", search: "", showStatus: "" }));
    dispatch(fetchSupportStatus({ page: "", search: "", showStatus: "" }));
  }, [dispatch, currentPage, searchTerm, issueTypeId, supportStatusId]);


  const handleRefresh = () => {
    setSearchTerm("");
    setIssueTypeId("");
    setSupportStatusId("");
    setCurrentPage(1);
  }

  const handleEdit = (id) => (
    navigate(`/seller/edit-support/${id}`)
  );


  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteSellerSupport(deleteId));
    dispatch(fetchSellerSupport({ page: currentPage, search: searchTerm, issueTypeId: issueTypeId, supportStatusId: supportStatusId })
    );
    setDeleteId(null);
    setShowDeleteModal(false);
  }
  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className="content flex-grow-1"
        style={{
          marginLeft:
            windowWidth >= 992
              ? isSidebarOpen
                ? 250
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
          <div className="row ">
            <div className="bg-white p-3 rounded shadow-sm ">
              <div className="row align-items-center">
                {/* Left: Title */}
                <div className="col-md-6">
                  <h5 className="m-0">Support </h5>
                </div>

                {/* Right: Add Support Button */}
                <div className="col-md-6 text-md-end mt-2 mt-md-0">
                  <Link to="/seller/add-support" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i> Add Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2 mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                {/* Search */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by subject..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                  />
                </div>

                {/* Issue Type */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select" value={issueTypeId} onChange={(e) => {
                    setIssueTypeId(e.target.value); setCurrentPage(1)
                  }}>
                    <option value="">Issue Type</option>
                    {issueTypes.map((issue) => (
                      <option key={issue.id} value={issue.id}>{issue.issueTypeTitle}</option>
                    ))}
                  </select>
                </div>

                {/* Issue Status */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select" value={supportStatusId} onChange={(e) => {
                    setSupportStatusId(e.target.value);
                    setCurrentPage(1);
                  }} >
                    <option value="">Support Status</option>
                    {supportStatusList.map((status) => (
                      <option key={status.id} value={status.id}>{status.supportStatusTitle}</option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="col-lg-2 col-md-6 col-sm-12 d-flex">

                  <button className="btn btn-light border" onClick={handleRefresh}>
                    <i className="bi bi-arrow-clockwise" ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Issue Type</th>
                      <th>Subject</th>
                      <th>Description</th>
                      <th>Attachments</th>
                      <th>Support Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <td colSpan="6" className="text-center text-muted">
                        loading...
                      </td>
                    ) : supports.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">
                          No support tickets found
                        </td>
                      </tr>
                    ) : (
                      supports.map((issue, index) => (
                        <tr key={issue.id}>
                          <td>{index + 1}</td>
                          <td>{issue.issueTypeTitle || "-"}</td>
                          <td>{issue.subject || "-"}</td>
                          <td>{issue.description || "-"}</td>

                          <td>
                            {issue.file ? (
                              <a
                                href={`${BASE_URL}/${issue.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary"
                              >
                                <i className="bi bi-paperclip me-1"></i> View
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            <span className={`badge ${issue.supportStatusTitle === "New"
                                ? "bg-primary"
                                : issue.supportStatusTitle === "Pending"
                                  ? "bg-danger"
                                  : issue.supportStatusTitle === "Closed"
                                    ? "bg-success"
                                    : "bg-warning"
                              }`}> {issue.supportStatusTitle || "-"} </span>
                          </td>
                          <td>
                            <button className="btn btn-icon btn-edit me-1"
                              onClick={() => handleEdit(issue?.id)}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-icon btn-delete"
                              onClick={() => handleDeleteClick(issue?.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      )))}
                  </tbody>
                </table>
              </div>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
            />
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
    </div>
  );
};

export default ManageSellerSupport;
