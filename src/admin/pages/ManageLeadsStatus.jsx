import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLeadStatus, fetchLeadStatus, updateLeadStatus } from '../../redux/actions/leadStatusAction';
import EditLeadStatusOffcanvas from '../components/Modal/editLeadStatusOffCanvas';
import ViewLeadStatusModal from '../components/Modal/ViewLeadStatusModal';
import DeleteConfirmationModal from '../components/Modal/DeleteConfirmationModal';
import Pagination from '../../common/pagination';
import PaginationComponent from '../../common/pagination';

const ManageLeads = () => {
    const dispatch = useDispatch();
    const { leadStatus = [], loading, error ,totalPages} = useSelector((state) => state.leadStatus);
    console.log('leadStatus', leadStatus)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [selectedLeadStatus, setselectedLeadStatus] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showEditOffcanvas, setShowEditOffcanvas] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);

    useEffect(() => {
        dispatch(fetchLeadStatus({
            search: searchTerm,
            page: currentPage,
            showStatus: statusFilter === null ? "" : statusFilter
        }));
    }, [dispatch, currentPage, searchTerm, statusFilter]);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setIsSidebarOpen(window.innerWidth >= 992);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setStatusFilter(value === "" ? null : Number(value));
        setCurrentPage(1);
    };

    const handleSaveChanges = async (data) => {
        try {
            await dispatch(updateLeadStatus(data.id, data));
            setShowEditOffcanvas(false);
            setselectedLeadStatus(null);
            dispatch(fetchLeadStatus());
        } catch (err) {
            console.log('error')
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        await dispatch(deleteLeadStatus(deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    const handleRefresh = () => {
        setSearchTerm("");
        setStatusFilter(null);
        setCurrentPage(1);
        dispatch(fetchLeadStatus({ search: "", page: 1, showStatus: "" }));
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
                                    <h5 className="form-title m-0">Manage Leads</h5>
                                </div>
                                <div className="col-md-4"></div>
                                <div className="col-lg-6 text-end">
                                    <Link to="/leads-status" className="btn btn-new-lead">
                                        <i className="bi bi-plus-circle me-1"></i>
                                        Add Lead
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Search & Filter */}
                        <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
                            <div className="row g-2 align-items-center">
                                <div className="col-md-4">
                                    <div className="input-group">
                                        <input type="text" className="form-control border-0" placeholder="Search Lead" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                    </div>
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
                                <div className="col-md-2 d-flex">

                                    <button className="btn btn-light border-1" onClick={handleRefresh}>
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
                                    <p>Loading lead status...</p>
                                ) : (
                                    <table className="table align-middle table-striped table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>S.no</th>
                                                <th>Lead Name</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leadStatus.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center">No Lead status found.</td>
                                                </tr>
                                            ) : (
                                                leadStatus.map((lead, index) => (
                                                    <tr key={lead.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{lead.LeadStatusTitle}</td>
                                                        <td><span className={`badge ${lead.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>{lead.status ? "Active" : "Inactive"}</span></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <button className="btn btn-icon btn-view" onClick={() => {
                                                                    setselectedLeadStatus(lead);
                                                                    setShowViewModal(true);
                                                                }}>
                                                                    <i className="bi bi-eye"></i>
                                                                </button>
                                                                <button className="btn btn-icon btn-edit" onClick={() => {
                                                                    setselectedLeadStatus(lead);
                                                                    setShowEditOffcanvas(true);
                                                                }}>
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </button>
                                                                <button className="btn btn-icon btn-delete" onClick={() => handleDeleteClick(lead?.id)} >
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
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages || 1}
                            onPageChange={setCurrentPage}
                        />
                        {showViewModal && <ViewLeadStatusModal show={showViewModal} handleClose={() => setShowViewModal(false)} leadStatus={selectedLeadStatus} />}
                        {showEditOffcanvas && <EditLeadStatusOffcanvas show={showEditOffcanvas} handleClose={() => setShowEditOffcanvas(false)} leadStatus={selectedLeadStatus} onSave={handleSaveChanges} />}
                        {showDeleteModal && (
                            <DeleteConfirmationModal
                                show={showDeleteModal}
                                handleClose={() => setShowDeleteModal(false)}
                                handleConfirm={handleDelete}
                            />
                        )}
                    </div>
                </div> {/* container-fluid */}
            </div> {/* content */}
        </div>
    );
};

export default ManageLeads;
