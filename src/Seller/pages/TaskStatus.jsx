import React, { useState, useEffect } from "react";
import Sidebar from "../components/SellerSidebar";
import Navbar from "../components/SellerNavbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom';
import useResponsiveSidebar from "../../components/useResponsiveSidebar";

const TaskStatus = () => {
     const { windowWidth, isSidebarOpen, setIsSidebarOpen } = useResponsiveSidebar(992);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [tasks] = useState([
        {
            id: 1,
            name: "Design Homepage",
            startDate: "2025-08-01",
            dueDate: "2025-08-05",
            status: "New",
        },
        {
            id: 2,
            name: "API Integration",
            startDate: "2025-08-02",
            dueDate: "2025-08-08",
            status: "In Progress",
        },
        {
            id: 3,
            name: "Testing",
            startDate: "2025-08-03",
            dueDate: "2025-08-10",
            status: "Completed",
        },
        {
            id: 4,
            name: "Client Review",
            startDate: "2025-08-04",
            dueDate: "2025-08-06",
            status: "Delay",
        },
    ]);

const getStatusBadge = (status) => {
    switch (status) {
        case "New":
            return (
                <span
                    className="badge"
                    style={{ backgroundColor: "rgba(20,146,230,0.15)", color: "#1492E6" }}
                >
                    {status}
                </span>
            );
        case "In Progress":
            return (
                <span
                    className="badge"
                    style={{ backgroundColor: "#FFF2ED", color: "#FF6C2F" }}
                >
                    {status}
                </span>
            );
        case "Completed":
            return (
                <span
                    className="badge"
                    style={{ backgroundColor: "#21C20826", color: "#3EA92D" }}
                >
                    {status}
                </span>
            );
        case "Delay":
            return (
                <span
                    className="badge"
                    style={{ backgroundColor: "#FDEFEF", color: "#E90808" }}
                >
                    {status}
                </span>
            );
        default:
            return status;
    }
};

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            searchTerm === "" ||
            task.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "" || task.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="container-fluid position-relative bg-white d-flex p-0">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="content flex-grow-1">
                <Navbar onToggleSidebar={handleToggleSidebar} />

                <div className="container-fluid px-4 pt-3">
                    {/* Header */}
                    <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
                        <h5 className="form-title m-0">Task Status</h5>
                    </div>

                    {/* Filter */}
                    <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
                        <div className="row g-2 align-items-center">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light"
                                    placeholder="Search by Task Name"
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
                                    <option value="">All Status</option>
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Delay">Delay</option>
                                </select>
                            </div>
                            <div className="col-md-2 d-flex">

                                <button
                                    className="btn btn-light border-1"
                                    onClick={() => {
                                        setSearchTerm("");
                                        setStatusFilter("");
                                    }}
                                >
                                    <i className="bi bi-arrow-clockwise"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
                        <div className="table-responsive">
                            <table className="table align-middle table-striped table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "60px" }}>S.no</th>
                                        <th>Task Name</th>
                                        <th>Start Date</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th style={{ width: "100px" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTasks.map((task, index) => (
                                        <tr key={task.id}>
                                            <td>{index + 1}</td>
                                            <td>{task.name}</td>
                                            <td>{task.startDate}</td>
                                            <td>{task.dueDate}</td>
                                            <td>{getStatusBadge(task.status)}</td>
                                            <td>
                                                <Link
                                                    to={`/seller/task-summary`}
                                                    className="btn btn-sm btn-outline-primary me-1"
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </Link>
                                            </td>

                                        </tr>
                                    ))}
                                    {filteredTasks.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No tasks found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskStatus;
