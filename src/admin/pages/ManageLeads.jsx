import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLead, fetchLeads, updateLead } from '../../redux/actions/leadAction';
import { fetchLeadStatus } from '../../redux/actions/leadStatusAction';
import EditLeadOffCanvasModal from '../components/Modal/EditLeadOffCanvasModal';
import { fetchLeadSources } from '../../redux/actions/leadSourceAction';
import { fetchBusinessTypes } from '../../redux/actions/businessTypeAction';
import { fetchTeams } from '../../redux/actions/teamActions';
import DeleteConfirmationModal from '../components/Modal/DeleteConfirmationModal';
import PaginationComponent from '../../common/pagination';

const ManageLeads = () => {
  const dispatch = useDispatch();
  const { leads = [], error, loading, totalPages, limit } = useSelector((state) => state.leads);
  const { businessTypes } = useSelector((state) => state.businessTypes);
  const { leadSources } = useSelector((state) => state.leadSources);
  const { leadStatus = [] } = useSelector((state) => state.leadStatus);
  console.log('leadStatus',leadStatus)
  const { teams = [] } = useSelector(state => state.teams || {});
  const { mobileCheck } = useSelector((state) => state.leads);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
  const [selectedLead, setselectedLead] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    dispatch(fetchLeads({
      search: searchTerm,
      page: currentPage,
      limit: limit,
      leadStatusId: statusFilter === null ? "" : statusFilter
    }));
    dispatch(fetchLeadSources());
    dispatch(fetchLeadStatus());
    dispatch(fetchBusinessTypes());
    dispatch(fetchTeams());
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 992) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter(null);
    setCurrentPage(1);
    dispatch(fetchLeads({ search: "", page: 1, showStatus: "" }));
  };


  const handleSaveLead = (updatedLead) => {
    dispatch(updateLead(updatedLead.id, updatedLead));
    setShowEditOffcanvas(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteLead(deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value === "" ? null : Number(value)); // store selected status ID
    setCurrentPage(1); // reset pagination
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
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />

        <div className="container-fluid px-4 pt-3">
          {/* Header */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-2">
                  <h5 className="form-title m-0">Manage Leads</h5>
                </div>
                <div className="col-md-4"></div>
                <div className="col-lg-6 text-end">
                  <a to="/create-lead" className="btn btn-new-lead"
                    >
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Lead
                  </a>
                </div>
              </div>
            </div>

            {/* Filter/Search */}
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search by Name or Email"
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
                    <option value="">Select Status</option>
                    {leadStatus.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status?.LeadStatusTitle}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2 d-flex">
                  <button className="btn btn-success text-white me-3" onClick={() => setCurrentPage(1)}>
                    <i className="bi bi-search" ></i>
                  </button>
                  <button className="btn btn-light border-1" onClick={handleRefresh}>
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
                <div className="col-md-3 text-end">
                  {/* Import (Upload) */}
                  <button
                    className="btn text-white me-2"
                    style={{ backgroundColor: "#1A73E8" }} // Bright blue
                  >
                    <i className="bi bi-upload"></i>
                  </button>

                  {/* Export (Download) */}
                  <button
                    className="btn text-white"
                    style={{ backgroundColor: "#0F9D58" }} // Google green
                  >
                    <i className="bi bi-download"></i>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Leads Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <div className="table-responsive">
                <table className="table align-middle table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Customer Name</th>
                      <th>Mobile Number</th>
                      <th>Lead Details</th>
                      <th>Team Member</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, index) => (
                      <tr key={lead.id}>
                        <td>{index + 1}</td>
                        <td>{lead.customerName}</td>
                        <td>{lead.customerMobile}</td>
                        <td>{lead.leadDetails}</td>
                        <td>{lead.teamName || "-"}</td>
                        <td>
                          <span
                            className={
                              lead.leadStatusTitle === 'New'
                                ? 'text-primary'
                                : lead.leadStatusTitle === 'Contacted'
                                  ? 'text-warning'
                                  : lead.leadStatusTitle === 'Closed'
                                    ? 'text-danger'
                                    : 'text-success'
                            }
                          >
                            {lead.leadStatusTitle}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2 align-items-center">
                            <Link to={`/view-lead/${lead.id}`} className="btn btn-icon btn-view">
                              <i className="bi bi-eye"></i>
                            </Link>
                            <button
                              className="btn btn-icon btn-edit"
                              onClick={() => {
                                setselectedLead(lead);
                                setShowEditOffcanvas(true);
                              }}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-icon btn-delete" onClick={() => handleDeleteClick(lead?.id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
             <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
          />
            {selectedLead && (
              <EditLeadOffCanvasModal
                show={showEditOffcanvas}
                handleClose={() => setShowEditOffcanvas(false)}
                selectedLead={selectedLead}
                onSave={handleSaveLead}
                businessTypes={businessTypes}
                leadSources={leadSources}
                leadStatus={leadStatus}
                teams={teams}
              />
            )}
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

export default ManageLeads;
