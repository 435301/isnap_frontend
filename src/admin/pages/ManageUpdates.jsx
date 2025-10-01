import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestUpdates } from '../../redux/actions/latestUpdatesAction';

const ManageUpdates = () => {
   const dispatch = useDispatch();
  const { latestUpdates, loading, error, totalPages } = useSelector(
    (state) => state.latestUpdates
  );
  console.log('latestUpdates',latestUpdates)

    useEffect(() => {
    dispatch(fetchLatestUpdates());
  }, [dispatch]);

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
                <div className="col-lg-2">
                  <h5 className="form-title m-0">Manage Updates</h5>
                </div>
                <div className="col-md-4"></div>
                <div className="col-lg-6 text-end">
                  <Link to="/latest-updates" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Updates
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
                      placeholder="Search"
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
                      <th>Title</th>
                      <th>Description</th>
                      <th>Send to whom</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestUpdates.map((update, index) => (
                      <tr key={update.id}>
                        <td>{index + 1}</td>
                        <td>{update.title}</td>
                        <td>{update.description}</td>
                        <td>{update.roleName}</td>
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
                            <div className="dropdown">
                              <button
                                className="btn btn-icon btn-outline-secondary"
                                type="button"
                                data-bs-toggle="dropdown"
                              >
                                <i className="bi bi-three-dots-vertical"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    View
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default ManageUpdates;