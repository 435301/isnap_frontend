import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubServices } from '../../redux/actions/subServiceActions';

const ManageServiceActivities = () => {
    const dispatch = useDispatch();
    const { subServices, loading, error } = useSelector((state) => state.subServices);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth >= 992) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        handleResize(); // Run on load
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchSubServices({ page: 1, search: "", serviceCategoryId: "", showStatus: "" }));
    }, [dispatch]);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                                <div className="col-lg-6">
                                    <h5 className="form-ServicesCategory m-0">Manage Service Types
                                    </h5>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <Link to="/create-service-type" className="btn btn-new-lead">
                                        <i className="bi bi-plus-circle me-1"></i>
                                        Add Service Types

                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Search & Filter */}
                        <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
                            <div className="row g-2 align-items-center">
                                <div className="col-md-4">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control border-0"
                                            placeholder="Search By Service Category"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select">
                                        <option selected>Select Status</option>
                                        <option>Active</option>
                                        <option>In Active</option>
                                    </select>
                                </div>
                                <div className="col-md-2 d-flex">
                                    <button className="btn btn-success text-white me-3">
                                        <i className="bi bi-search"></i>
                                    </button>
                                    <button className="btn btn-light border-1">
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
                                            <th>Service Categories</th>
                                            <th>Service Types</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="5" className="text-center">Loading...</td>
                                            </tr>
                                        ) : error ? (
                                            <tr>
                                                <td colSpan="5" className="text-center text-danger">{error}</td>
                                            </tr>
                                        ) : subServices.length > 0 ? (
                                            subServices.map((service, index) => (
                                                <tr key={service.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{service.serviceCategoryName}</td>
                                                    <td>{service.subServiceName}</td>
                                                    <td>
                                                        <span
                                                            className={`badge px-3 py-2 ${service.status === 1
                                                                ? "bg-success-light text-success"
                                                                : "bg-danger-light text-danger"
                                                                }`}
                                                        >
                                                            {service.status === 1 ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2 align-items-center">
                                                            <button className="btn btn-icon btn-view">
                                                                <i className="bi bi-eye"></i>
                                                            </button>
                                                            <button className="btn btn-icon btn-edit">
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>
                                                            <button className="btn btn-icon btn-delete">
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No services found</td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div> {/* container-fluid */}
            </div> {/* content */}
        </div>
    );
};

export default ManageServiceActivities;