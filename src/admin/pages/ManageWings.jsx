import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import EditWingModal from "../components/Modal/EditWingModal";
import ViewWingModal from "../components/Modal/ViewWingModal";
import { deleteWing, fetchWings, updateWing } from "../../redux/actions/wingAction";
import PaginationComponent from "../../common/pagination";

const ManageWings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedWing, setSelectedWing] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const {
        wings = [],
        loading = false,
        limit,
        totalPages = 1,
    } = useSelector((state) => state.wings || {});
    console.log('wings', wings)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setIsSidebarOpen(window.innerWidth >= 992);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        dispatch(fetchWings({ page: currentPage, search: searchTerm, showStatus: statusFilter }));
    }, [dispatch, currentPage, searchTerm, statusFilter]);


    const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setStatusFilter(value === "" ? "" : Number(value));
        setCurrentPage(1);
        dispatch(fetchWings({ page: 1, search: searchTerm, showStatus: statusFilter }));
    };

    const handleRefresh = () => {
        setSearchTerm("");
        setStatusFilter("");
        setCurrentPage(1);
        dispatch(fetchWings({ page: 1, search: "", showStatus: "" }));
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteWing(deleteId));
            setShowDeleteModal(false);
            setDeleteId(null);
        } catch {
        }
    };
    const handleSaveChanges = async (updatedWing) => {
        try {
            await dispatch(updateWing(updatedWing.id, updatedWing));
            setShowEditModal(false);
            setSelectedWing(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        dispatch(fetchWings({ page: 1, search: searchTerm, showStatus: statusFilter }));
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
                                    <h5 className="form-title m-0">Manage Wings</h5>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <Link to="/create-wing" className="btn btn-new-lead">
                                        <i className="bi bi-plus-circle me-1"></i> Add Wing
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
                                        placeholder="Search by wing"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select" value={statusFilter} onChange={handleStatusChange}>
                                        <option value="">Select Status</option>
                                        <option value="">All</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                                <div className="col-md-2 d-flex">
                                    <button className="btn btn-success text-white me-3" onClick={handleSearch}>
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
                        <div className="bg-white p-3 rounded shadow-sm card-header">
                            <div className="table-responsive">
                                {loading ? (
                                    <p>Loading wings...</p>

                                ) : wings.length === 0 ? (
                                    <p>No wing found.</p>
                                ) : (
                                    <table className="table align-middle table-striped table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>S.no</th>
                                                <th>Wing Name</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {wings.map((wing, index) => (
                                                <tr key={wing.id}>
                                                    <td>{(currentPage - 1) * limit + index + 1}</td>
                                                    <td>{wing.title}</td>
                                                    <td>
                                                        <span className={`badge ${wing.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>
                                                            {wing.status ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <button className="btn btn-icon btn-view" onClick={() => { setSelectedWing(wing); setShowViewModal(true); }}>
                                                                <i className="bi bi-eye"></i>
                                                            </button>
                                                            <button className="btn btn-icon btn-edit" onClick={() => { setSelectedWing(wing); setShowEditModal(true); }}>
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>
                                                            <button className="btn btn-icon btn-delete" onClick={() => { setDeleteId(wing.id); setShowDeleteModal(true); }}>
                                                                <i className="bi bi-trash"></i>
                                                            </button>
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
                            <EditWingModal
                                showEditModal={showEditModal}
                                setShowEditModal={setShowEditModal}
                                selectedWing={selectedWing}
                                handleSaveChanges={handleSaveChanges}
                            />
                            <ViewWingModal
                                show={showViewModal}
                                handleClose={() => setShowViewModal(false)}
                                selectedWing={selectedWing}
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
        </div>
    );
};

export default ManageWings;
