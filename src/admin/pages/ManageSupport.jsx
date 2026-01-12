import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useResponsiveSidebar from "../../components/useResponsiveSidebar";
import { fetchAdminSupport } from "../../redux/actions/adminSupportAction";
import { fetchIssueType } from "../../redux/actions/issueTypeAction";
import { fetchSupportStatus } from "../../redux/actions/supportStatusAction";
import { deleteSellerSupport } from "../../redux/actions/sellerSupportAction";
import PaginationComponent from "../../common/pagination";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import BASE_URL from "../../config/config";
import { fetchTeams } from "../../redux/actions/teamActions";
import { fetchBusinessDetails } from "../../redux/actions/businessActions";

const ManageSupport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { windowWidth, isSidebarOpen, setIsSidebarOpen } = useResponsiveSidebar(992);
  const { supports, loading, pagination } = useSelector((state) => state.adminSupport);
  const { supportStatusList } = useSelector((state) => state.supportStatus);
  const { issueTypes } = useSelector((state) => state.issueTypes);
  const { teams } = useSelector((state) => state.teams);
  const { businessDetails } = useSelector((state) => state.business);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [issueTypeId, setIssueTypeId] = useState("");
  const [supportStatusId, setSupportStatusId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [teamId, setTeamId] = useState("");
  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminSupport({ page: currentPage, search: searchTerm, issueTypeId: issueTypeId, supportStatusId: supportStatusId, sellerId: sellerId, teamId: teamId }));
    dispatch(fetchIssueType({ page: "", search: "", showStatus: "" }));
    dispatch(fetchSupportStatus({ page: "", search: "", showStatus: "" }));
    dispatch(fetchTeams());
    dispatch(fetchBusinessDetails());
  }, [dispatch, currentPage, searchTerm, issueTypeId, supportStatusId, sellerId, teamId]);


  const handleRefresh = () => {
    setSearchTerm("");
    setIssueTypeId("");
    setSupportStatusId("");
    setCurrentPage(1);
    setSellerId("");
    setTeamId("");
  }

  const handleEdit = (id) => (
    navigate(`/edit-support/${id}`)
  );


  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteSellerSupport(deleteId));
    dispatch(fetchAdminSupport({ page: currentPage, search: searchTerm, issueTypeId: issueTypeId, supportStatusId: supportStatusId })
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
                  <Link to="/add-support" className="btn btn-new-lead">
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

                {/* Seller */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select" value={sellerId} onChange={(e) => {
                    setSellerId(e.target.value);
                    setCurrentPage(1);
                  }} >
                    <option value="">Select Seller</option>
                    {businessDetails.map((seller) => (
                      <option key={seller.id} value={seller.id}>{seller.businessName}</option>
                    ))}
                  </select>
                </div>

                {/* Team */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <select className="form-select" value={teamId} onChange={(e) => {
                    setTeamId(e.target.value);
                    setCurrentPage(1);
                  }} >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>{team.name}</option>
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

                      <th>Seller</th>
                      <th>Team</th>
                      <th>Attachments</th>
                      <th>Support Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <td colSpan="9" className="text-center text-muted">
                        loading...
                      </td>
                    ) : supports.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center text-muted">
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
                          <td>{issue.businessName || "-"}</td>
                          <td>{issue.teamName || "-"}</td>

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

export default ManageSupport;
