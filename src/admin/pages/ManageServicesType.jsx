import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditServiceTypeOffcanvas from "../components/Modal/EditServiceTypeOffcanvas";
import ViewServiceTypeModal from "../components/Modal/ViewServiceTypeModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    fetchServiceTypes,
    deleteServiceType,
    updateServiceType,
    clearServiceTypeSuccessMessage
} from "../../redux/actions/serviceTypeActions";

import { fetchMarketTypes } from "../../redux/actions/marketTypeActions";

const ManageServicesType = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const dispatch = useDispatch();
    const { serviceTypes, loading, error, totalPages, successMessage } = useSelector(state => state.serviceType);
    const { marketTypes } = useSelector(state => state.marketType);

    useEffect(() => {
        dispatch(fetchServiceTypes(currentPage, itemsPerPage, searchTerm, statusFilter));
    }, [dispatch, currentPage, searchTerm, statusFilter]);

    useEffect(() => {
        dispatch(fetchMarketTypes());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearServiceTypeSuccessMessage());
        }
        if (error) toast.error(error);
    }, [successMessage, error, dispatch]);

    const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

    const handleRefresh = () => {
        setSearchTerm("");
        setStatusFilter(null);
        setCurrentPage(1);
        dispatch(fetchServiceTypes(1, itemsPerPage, "", ""));
    };

    const handleStatusChange = e => setStatusFilter(e.target.value === "" ? null : Number(e.target.value));

    const handleConfirmDelete = async () => {
        await dispatch(deleteServiceType(deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
        dispatch(fetchServiceTypes(currentPage, itemsPerPage, searchTerm, statusFilter));
    };

    const handleSaveChanges = async updatedService => {
        await dispatch(updateServiceType(updatedService));
        setShowEditModal(false);
        setSelectedService(null);
        dispatch(fetchServiceTypes(currentPage, itemsPerPage, searchTerm, statusFilter));
    };

    return (
        <div className="container-fluid position-relative bg-white d-flex p-0">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="content flex-grow-1" style={{ marginLeft: isSidebarOpen ? 259 : 95, transition: "margin-left 0.3s" }}>
                <Navbar onToggleSidebar={handleToggleSidebar} />

                <div className="container-fluid px-4 pt-3">
                    {/* Header */}
                    <div className="row mb-2">
                        <div className="bg-white p-3 rounded shadow-sm card-header d-flex justify-content-between align-items-center">
                            <h5 className="form-title m-0">Manage Marketplaces</h5>
                            <Link to="/add-marketplacetype" className="btn btn-new-lead">
                                <i className="bi bi-plus-circle me-1"></i> Add Marketplace
                            </Link>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="row mb-2">
                        <div className="bg-white p-3 rounded shadow-sm card-header">
                            <div className="row g-2 align-items-center">
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control border-0"
                                        placeholder="Search by Marketplace"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === "Enter") {
                                                setCurrentPage(1);
                                                dispatch(fetchServiceTypes(1, itemsPerPage, searchTerm, statusFilter));
                                            }
                                        }}
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
                                <div className="col-md-2 d-flex">
                                    <button className="btn btn-success me-3" onClick={() => setCurrentPage(1)}>
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
                                {loading ? <p>Loading services...</p> : serviceTypes.length === 0 ? <p>No Marketplace Types found.</p> :
                                    <table className="table align-middle table-striped table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Marketplace</th>
                                                <th>Price</th>
                                                <th>Marketplace Type</th>

                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {serviceTypes.map((s, index) => {
                                                const status = Number(s.status); // fix status
                                                return (
                                                    <tr key={s.id}>
                                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                        <td>{s.serviceType}</td>
                                                        <td> ₹ {s.price}</td>
                                                        <td>{s.marketPlaceType}</td>

                                                        <td>
                                                            <span className={`badge ${status === 1 ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>
                                                                {status === 1 ? "Active" : "Inactive"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <button className="btn btn-icon btn-view" onClick={() => { setSelectedService(s); setShowViewModal(true); }}>
                                                                    <i className="bi bi-eye"></i>
                                                                </button>
                                                                <button className="btn btn-icon btn-edit" onClick={() => { setSelectedService(s); setShowEditModal(true); }}>
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </button>
                                                                <button className="btn btn-icon btn-delete" onClick={() => { setDeleteId(s.id); setShowDeleteModal(true); }}>
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-end mt-3">
                        <nav>
                            <ul className="pagination custom-pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
                                </li>
                                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(page => (
                                    <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Modals */}
                    {showViewModal && <ViewServiceTypeModal show={showViewModal} handleClose={() => setShowViewModal(false)} service={selectedService} />}
                    {showEditModal &&
                        <EditServiceTypeOffcanvas
                            show={showEditModal}
                            handleClose={() => setShowEditModal(false)}
                            service={selectedService}
                            onSave={handleSaveChanges}
                            marketTypes={marketTypes}
                        />
                    }
                    {showDeleteModal && <DeleteConfirmationModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} handleConfirm={handleConfirmDelete} />}
                </div>

                <ToastContainer />
            </div>
        </div>
    );
};

export default ManageServicesType;
