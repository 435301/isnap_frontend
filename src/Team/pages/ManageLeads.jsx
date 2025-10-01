import React, { useState, useEffect } from 'react';
import Sidebar from '../components/TeamSidebar';
import Navbar from '../components/TeamNavbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeadHistory } from '../../redux/actions/leadTeamAction';
import moment from "moment";
import EditLeadOffCanvasModal from '../../admin/components/Modal/EditLeadOffCanvasModal';
import EditLeadOffCanvasTeamModal from '../components/EditLeadOffCanvasTeam';
import { fetchLeadStatus } from '../../redux/actions/leadStatusAction';
import PaginationComponent from '../../common/pagination';

const TeamManageLeads = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { leadHistory, loading, error, updateLoading, updateSuccess, limit, totalPages } = useSelector((state) => state.leadHistory);
  const { user = [] } = useSelector((state) => state.auth)
  const { leadStatus = [] } = useSelector((state) => state.leadStatus);
  console.log('leadHistory', user)
  const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
  const [selectedLead, setselectedLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);

    const fetchLeadHistoryData = () => {
    if (user?.id) {
      dispatch(
        fetchLeadHistory({
          search: searchTerm,
          page: currentPage,
          limit,
          leadStatusId: statusFilter || "",
          teamId: user?.id,
        })
      );
    }
  };

  useEffect(() => {
   fetchLeadHistoryData();
    dispatch(fetchLeadStatus());
  }, [dispatch, currentPage, limit, user?.id, searchTerm, statusFilter]);

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

   const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
    fetchLeadHistoryData();
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

                </div>
              </div>
            </div>

            {/* Filter/Search */}
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <div className="row g-2 align-items-center">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    placeholder="Search by Name "
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
                    {leadStatus.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status?.LeadStatusTitle}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2 d-flex">
                  <button className="btn btn-success text-white me-3" onClick={() => {
                      setCurrentPage(1);
                      fetchLeadHistoryData();
                    }} >
                    <i className="bi bi-search"></i>
                  </button>
                  <button className="btn btn-light border-1"  onClick={handleReset}>
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Leads Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <div className="table-responsive">
                {loading ? (
                  <p>Loading leadHistory...</p>
                ) : (
                  <table className="table align-middle table-striped table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>S.No</th>
                        <th>Customer Name</th>
                        <th>Mobile Number</th>
                        <th>Last Updated Date</th>
                        <th>Last Updated Time</th>
                        <th>Lead Details</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(!leadHistory || leadHistory.length === 0) ? (
                        <tr>
                          <td colSpan="8" className="text-center">No lead history found.</td>
                        </tr>
                      ) : (
                        leadHistory?.map((lead, index) => (
                          <tr key={lead.id}>
                            <td>{index + 1}</td>
                            <td>{lead?.customerName}</td>
                            <td>{lead?.customerMobile}</td>
                            <td>{lead?.followUpDate ? moment(lead.followUpDate).format("DD MMM YYYY") : "-"}</td>
                            <td>{lead?.followUpTime ? moment(lead?.followUpTime, "HH:mm:ss").format("hh:mm A") : "-"}</td>
                            <td>{lead.leadDetails}</td>
                            <td>
                              <span
                                className={
                                  lead?.leadStatusTitle === 'New'
                                    ? 'text-primary'
                                    : lead?.leadStatusTitle === 'Contacted'
                                      ? 'text-warning'
                                      : lead?.leadStatusTitle === 'Closed'
                                        ? 'text-danger'
                                        : 'text-success'
                                }
                              >
                                {lead.leadStatusTitle}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2 align-items-center">

                                <button
                                  className="btn btn-icon btn-edit"
                                  onClick={() => {
                                    setselectedLead(lead);
                                    setShowEditOffcanvas(true);
                                  }}
                                >
                                  <i className="bi bi-pencil-square"></i>
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
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages || 1}
              onPageChange={setCurrentPage}
            />
            {selectedLead && (
              <EditLeadOffCanvasTeamModal
                show={showEditOffcanvas}
                handleClose={() => setShowEditOffcanvas(false)}
                selectedLead={selectedLead}
              />
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default TeamManageLeads;
