import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ManageLeads = () => {
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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const leads = [
    {
      id: 1,
      name: 'Akeeb Shaik',
      email: 'john@example.com',
      phone: '9876543210',
      LeadDetails: 'Need a Demo',
      team: 'KNS Reddy',
      status: 'New',
    },
    {
      id: 2,
      name: 'Praveen Saaho',
      email: 'john@example.com',
      phone: '9876543210',
      LeadDetails: 'Need a Demo',
      team: 'KNS Reddy',
      status: 'Contacted',
    },
    {
      id: 3,
      name: 'Madhavi',
      email: 'john@example.com',
      phone: '9876543210',
      LeadDetails: 'Need a Demo',
      team: 'KNS Reddy',
      status: 'Closed',
    },
  ];

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
                  <Link to="/create-lead" className="btn btn-new-lead">
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Lead
                  </Link>
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
                    placeholder="Search by Name or Email"
                  />
                </div>
                <div className="col-md-3">
                  <select className="form-select">
                    <option>Select Status</option>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
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
                        <td>{lead.name}</td>
                        <td>{lead.phone}</td>
                        <td>{lead.LeadDetails}</td>
                        <td>{lead.team}</td>
                        <td>
                          <span
                            className={
                              lead.status === 'New'
                                ? 'text-primary'
                                : lead.status === 'Contacted'
                                  ? 'text-warning'
                                  : lead.status === 'Closed'
                                    ? 'text-danger'
                                    : 'text-success'
                            }
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2 align-items-center">
                            <a href='/view-lead' className="btn btn-icon btn-view">
                              <i className="bi bi-eye"></i>
                            </a>
                            <button
                              className="btn btn-icon btn-edit"
                              data-bs-toggle="modal"
                              data-bs-target="#editLeadModal"
                            >
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
                                  <a className="dropdown-item" href="">
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
        </div>

        {/* Edit Modal */}
        <div
          className="modal modal-lg right fade"
          id="editLeadModal"
          tabIndex="-1"
          aria-labelledby="editLeadModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editLeadModalLabel">
                  Edit Lead
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body card-header">
                <form className="me-3">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Customer Name <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="Enter name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Customer Mobile Number <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="Enter mobile" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Business Type</label>
                      <select className="form-select">
                        <option>Person</option>
                        <option>Company</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email ID</label>
                      <input type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Lead Source</label>
                      <input type="text" className="form-control" placeholder="Source" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Follow up date & time</label>
                      <input type="datetime-local" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Team</label>
                      <input type="text" className="form-control" placeholder="Team" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Status <span className="text-danger">*</span>
                      </label>
                      <select className="form-select">
                        <option>TODO</option>
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Closed</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Lead Details (Description) <span className="text-danger">*</span>
                      </label>
                      <textarea className="form-control" placeholder="Lead details"></textarea>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageLeads;
