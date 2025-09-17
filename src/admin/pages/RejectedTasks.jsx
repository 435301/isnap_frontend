import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const RejectedTasks = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const tasks = [
        {
            id: 1,
            teamMember: 'Akeeb Shaik',
            task: 'Products Listing on Amazon',
            company: 'DVG Fashions',
            reason: 'Due to other works priority',
            adminStatus: 'Approved',
            approvedBy: 'KNS Reddy',
        },
        {
            id: 2,
            teamMember: 'Praveen Saaho',
            task: 'Products Listing on Flipkart',
            company: 'DVG Fashions',
            reason: 'Due to other works priority',
            adminStatus: 'Pending',
            approvedBy: '.....',
        },
        {
            id: 3,
            teamMember: 'Akeeb Shaik',
            task: 'Products Listing on Myntra',
            company: 'DVG Fashions',
            reason: 'Due to other works priority',
            adminStatus: 'Rejected',
            approvedBy: 'KNS Reddy',
        },
    ];

    useEffect(() => {
        const handleResize = () => {
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
                            <h5 className="m-0">Rejected Tasks</h5>
                        </div>

                        {/* Search & Filter */}
                        <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
                            <div className="row g-2 align-items-center">
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control border-0 bg-light"
                                        placeholder="Search"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select">
                                        <option>Select Team</option>
                                        <option>Team A</option>
                                        <option>Team B</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select">
                                        <option>Select Status</option>
                                        <option>Approved</option>
                                        <option>Pending</option>
                                        <option>Rejected</option>
                                    </select>
                                </div>
                                <div className="col-md-2 d-flex">
                                    <button className="btn btn-success text-white me-2">
                                        <i className="bi bi-search"></i>
                                    </button>
                                    <button className="btn btn-light border">
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
                                <table className="table align-middle table-striped table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>S.no</th>
                                            <th>Team Member</th>
                                            <th>Task</th>
                                            <th>Reason</th>
                                            <th>Admin Status</th>
                                            <th>Approved by</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task, index) => (
                                            <tr key={task.id}>
                                                <td>{index + 1}</td>
                                                <td>{task.teamMember}</td>
                                                <td>
                                                    {task.task} <br />
                                                    <small className="text-muted fw-bold">{task.company}</small>
                                                </td>
                                                <td>{task.reason}</td>
                                                <td>
                                                    <span
                                                        className={`badge ${task.adminStatus === 'Approved'
                                                                ? 'bg-success'
                                                                : task.adminStatus === 'Pending'
                                                                    ? 'bg-warning text-dark'
                                                                    : 'bg-danger'
                                                            }`}
                                                    >
                                                        {task.adminStatus}
                                                    </span>
                                                </td>
                                                <td>{task.approvedBy}</td>
                                                <td>
                                                    <Link to={`/view-summary`} className="btn btn-icon btn-view">
                                                        <i className="bi bi-eye"></i>
                                                    </Link>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RejectedTasks;
