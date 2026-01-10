import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditDepartmentModal from "../components/Modal/EditDepartmentModal";
import ViewDepartmentModal from "../components/Modal/ViewDepartmentModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";
import {
    fetchDepartments,
    updateDepartment,
    deleteDepartment,
    clearDepartmentSuccessMessage,
} from "../../redux/actions/departmentActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditSubDepartmentModal from "../components/Modal/EditsubDepartmentModal";
import ViewSubDepartmentModal from "../components/Modal/ViewSubDepartmentModal";
import PaginationComponent from "../../common/pagination";
import { fetchWings } from "../../redux/actions/wingAction";
import { deleteSubDepartment, fetchSubDepartments, updateSubDepartment } from "../../redux/actions/subDepartmentAction";
import useResponsiveSidebar from "../../components/useResponsiveSidebar";

const ManageSubDepartments = () => {
     const { windowWidth, isSidebarOpen, setIsSidebarOpen } = useResponsiveSidebar(992);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedSubDepartment, setSelectedSubDepartment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {
        subDepartments = [],
        loading = false,
        error = null,
        successMessage = null,
        totalPages = 1,
    } = useSelector((state) => state.subDepartments || {});
    const { departments = [] } = useSelector((state) => state.department);
    const { wings = [] } = useSelector((state) => state.wings || {});

    useEffect(() => {
        dispatch(fetchSubDepartments({
            search: searchTerm,
            page: currentPage,
            showStatus: statusFilter,
            departmentId: "",
        }));
        dispatch(fetchDepartments());
        dispatch(fetchWings());
    }, [dispatch, currentPage, searchTerm, statusFilter]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearDepartmentSuccessMessage());
        }
    }, [successMessage, dispatch]);

    const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setStatusFilter(value === "" ? "" : Number(value));
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        setSearchTerm("");
        setStatusFilter("");
        setCurrentPage(1);
        dispatch(fetchDepartments(1, "", ""));
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteSubDepartment(deleteId));
            setShowDeleteModal(false);
            setDeleteId(null);
            dispatch(fetchSubDepartments(currentPage, searchTerm, statusFilter));
        } catch {
            console.log('err')
        }
    };
    const handleSaveChanges = async (updatedDepartment) => {
        try {
            await dispatch(updateSubDepartment(updatedDepartment.id, updatedDepartment));
            await dispatch(fetchSubDepartments({
                search: searchTerm,
                page: currentPage,
                showStatus: statusFilter,
                departmentId: ""
            }));
            setShowEditModal(false);
            setSelectedSubDepartment(null);
        } catch (err) {
            console.log(err);
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
                                    <h5 className="form-title m-0">Manage Sub Departments</h5>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <Link to="/create-sub-department" className="btn btn-new-lead">
                                        <i className="bi bi-plus-circle me-1"></i> Add Sub Department
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
                                        placeholder="Search by Sub Department Name"
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
                                    <p>Loading sub departments...</p>

                                ) : subDepartments.length === 0 ? (
                                    <p>No sub departments found.</p>
                                ) : (
                                    <table className="table align-middle table-striped table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>S.no</th>
                                                <th>Wing</th>
                                                <th>Department Name</th>
                                                <th>Sub Department Name</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subDepartments.map((dept, index) => (
                                                <tr key={dept.id}>
                                                    <td>{(currentPage - 1) + index + 1}</td>
                                                    <td>{dept.wingName}</td>
                                                    <td>{dept.departmentName}</td>
                                                    <td>{dept.name}</td>
                                                    <td>
                                                        <span className={`badge ${dept.status ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>
                                                            {dept.status === 1 ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <button className="btn btn-icon btn-view" onClick={() => { setSelectedSubDepartment(dept); setShowViewModal(true); }}>
                                                                <i className="bi bi-eye"></i>
                                                            </button>
                                                            <button className="btn btn-icon btn-edit" onClick={() => { setSelectedSubDepartment(dept); setShowEditModal(true); }}>
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>
                                                            <button className="btn btn-icon btn-delete" onClick={() => { setDeleteId(dept.id); setShowDeleteModal(true); }}>
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
                            <EditSubDepartmentModal
                                showEditModal={showEditModal}
                                setShowEditModal={setShowEditModal}
                                selectedSubDepartment={selectedSubDepartment}
                                handleSaveChanges={handleSaveChanges}
                                departments={departments}
                                wings={wings}
                            />
                            <ViewSubDepartmentModal
                                show={showViewModal}
                                handleClose={() => setShowViewModal(false)}
                                subDepartment={selectedSubDepartment}
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

export default ManageSubDepartments;
