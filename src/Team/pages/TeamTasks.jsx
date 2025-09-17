import React, { useState, useEffect } from 'react';
import Sidebar from '../components/TeamSidebar';
import Navbar from '../components/TeamNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TeamTasks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedBucket, setSelectedBucket] = useState('To Do');
  const [rejectReasonType, setRejectReasonType] = useState('');
  const [rejectReasonText, setRejectReasonText] = useState('');

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

  const taskData = {
    todo: [
      {
        title: 'Product listing on Amazon',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
        startDate: 'Jun 10, 2025',
        dueDate: 'June 20, 2025',
        seller: 'GVK Fashions',
        priority: 'High',
      },
      {
        title: 'Product listing on Flipkart',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
        startDate: 'Jun 10, 2025',
        dueDate: 'June 20, 2025',
        seller: 'GVK Fashions',
        priority: 'Medium',
      },
      {
        title: 'Product listing on Myntra',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
        startDate: 'Jun 10, 2025',
        dueDate: 'June 20, 2025',
        seller: 'GVK Fashions',
        priority: 'Low',
      },
    ],
    inProgress: [
      {
        title: 'Product listing on Flipkart',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
        startDate: 'Jun 10, 2025',
        dueDate: 'June 20, 2025',
        seller: 'GVK Fashions',
      },
      {
        title: 'Product listing on Myntra',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
        startDate: 'Jun 10, 2025',
        dueDate: 'June 20, 2025',
        seller: 'GVK Fashions',
      },
      {
        title: 'Product listing on Amazon',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
        startDate: 'Jun 10, 2025',
        dueDate: 'June 20, 2025',
        seller: 'GVK Fashions',
      },
    ],
    completed: [
      {
        title: 'Product listing on Myntra',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
        startDate: 'Jun 10, 2025',
        dueDate: 'June 20, 2025',
        seller: 'GVK Fashions',
        completedDate: '25-06-2025',
      },
      {
        title: 'Product listing on Amazon',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
        startDate: 'Jun 10, 2025',
        dueDate: 'June 20, 2025',
        seller: 'GVK Fashions',
        completedDate: '25-06-2025',
      },
      {
        title: 'Product listing on Flipkart',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
        startDate: 'Jun 10, 2025',
        dueDate: 'June 20, 2025',
        seller: 'GVK Fashions',
        completedDate: '25-06-2025',
      },
    ],
  };

  const TaskCard = ({ task, type }) => {
    const getCardClass = () => {
      if (task.title.includes('Amazon')) return 'bg-success-subtle text-success';
      if (task.title.includes('Flipkart')) return 'bg-warning-subtle text-warning';
      if (task.title.includes('Myntra')) return 'bg-danger-subtle text-danger';
      return 'bg-secondary-subtle text-secondary';
    };

    const getPriorityBtnClass = (priority) => {
      switch (priority?.toLowerCase()) {
        case 'high':
          return 'btn btn-sm bg-danger-subtles text-danger px-3 fw-semibold';   // 🔴 High = red
        case 'medium':
          return 'btn btn-sm bg-success-subtles text-success px-3 fw-semibold'; // 🟡 Medium = yellow
        case 'low':
          return 'btn btn-sm bg-warning-subtles text-warning px-3 fw-semibold'; // 🟢 Low = green
        default:
          return 'btn btn-sm bg-secondary-subtles text-secondary px-3 fw-semibold'; // fallback gray
      }
    };


    return (
      <div className="card task-card shadow-sm rounded-4 p-2 mb-3">
        <div className="d-flex justify-content-between align-items-start">
          <span className={`px-2 py-1 mb-2 rounded fw-semibold ${getCardClass()}`}>
            {task.title}
          </span>
          <i
            className="bi bi-three-dots-vertical"
            id={`dropdownMenuButton-${task.title}`}
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ cursor: 'pointer' }}
          ></i>
          <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${task.title}`}>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setSelectedTask(task);
                  setShowModal(true);
                }}
              >
                Move Task
              </button>
            </li>
            <li>
              <a className="dropdown-item" href={`/team/task-summary`}>
                View Details
              </a>
            </li>
          </ul>
        </div>
        <p className="text-muted small mb-3">{task.description}</p>
        <div className="row g-2 text-muted small mb-2">
          <div className="col-4">
            <strong className="border border-info rounded px-2 py-1 small d-block mb-2">Start Date</strong>
            <div className="text-dark mt-1">
              <i className="bi bi-calendar"></i> {task.startDate}
            </div>
          </div>
          <div className="col-4">
            <strong className="border border-danger rounded px-2 py-1 small d-block mb-2">Due Date</strong>
            <div className="text-dark mt-1">
              <i className="bi bi-calendar"></i> {task.dueDate}
            </div>
          </div>
          <div className="col-4">
            <strong className="border border-info rounded px-2 py-1 small d-block mb-2">Seller Name</strong>
            <div className="text-dark mt-1">
              <i className="bi bi-person"></i> {task.seller}
            </div>
          </div>
        </div>
        {type === 'completed' && (
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="text-dark small">
              <i className="bi bi-calendar-check"></i> Completed Date
            </span>
            <span className="btn btn-sm text-white px-3" style={{ backgroundColor: "#5CB17A" }}>{task.completedDate}</span>
          </div>
        )}
        {type === 'todo' && (
          <div className="d-flex gap-2 mt-2 justify-content-between align-items-center">
            {task.priority && (
              <button className={getPriorityBtnClass(task.priority)}>
                {task.priority}
              </button>)}
            <div>
              <button
                className="btn btn-sm bg-danger-subtle text-danger px-3 me-2"
                onClick={() => {
                  setSelectedTask(task);
                  setShowRejectModal(true);
                }}
              >
                Reject
              </button>
              <button className="btn btn-sm bg-success-subtle text-success px-3">Accept</button>
            </div>
          </div>
        )}
        {type === 'inProgress' && (
          <div className="text-end mt-2">
            <button className="btn btn-sm  text-white px-3" style={{ backgroundColor: "#5CB17A" }}>Mark as Done</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : isSidebarOpen ? 220 : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className='container-fluid px-4 pt-3'>
          {/* Header */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-8">
                  <h5 className="form-title m-0">Manage Leads</h5>
                </div>
                <div className="col-md-4">
                  <select className="form-select">
                    <option>Select Seller</option>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                  </select>
                </div>
              </div>
            </div>


          </div>
          <div className="row  g-2 pt-4">
            <div className="col-md-4 task-column">
              <div className="pb-2 mb-2 d-flex align-items-center">
                <h5 className="fw-bold d-inline me-2">To Do</h5>
                <span className="badge rounded-circle bg-warning text-dark">
                  {taskData.todo.length.toString().padStart(2, '0')}
                </span>
              </div>
              {taskData.todo.map((task, idx) => (
                <TaskCard key={idx} task={task} type="todo" />
              ))}
            </div>
            <div className="col-md-4 task-column">
              <div className="pb-2 mb-2 d-flex align-items-center">
                <h5 className="fw-bold d-inline me-2">In Progress</h5>
                <span className="badge rounded-circle bg-primary">
                  {taskData.inProgress.length.toString().padStart(2, '0')}
                </span>
              </div>
              {taskData.inProgress.map((task, idx) => (
                <TaskCard key={idx} task={task} type="inProgress" />
              ))}
            </div>
            <div className="col-md-4 task-column">
              <div className="pb-2 mb-2 d-flex align-items-center">
                <h5 className="fw-bold d-inline me-2">Done</h5>
                <span className="badge rounded-circle bg-success">
                  {taskData.completed.length.toString().padStart(2, '0')}
                </span>

                <select className="form-select form-select-sm bg-white w-auto ms-auto">
                  <option value="">Select Month</option>
                  <option value="jan">January</option>
                  <option value="feb">February</option>
                  <option value="mar">March</option>
                  <option value="apr">April</option>
                  <option value="may">May</option>
                  <option value="jun">June</option>
                  <option value="jul">July</option>
                  <option value="aug">August</option>
                  <option value="sep">September</option>
                  <option value="oct">October</option>
                  <option value="nov">November</option>
                  <option value="dec">December</option>
                </select>
              </div>

              {taskData.completed.map((task, idx) => (
                <TaskCard key={idx} task={task} type="completed" />
              ))}
            </div>
          </div></div>
        {showModal && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Move Task</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Task Name</label>
                      <input type="text" className="form-control" value={selectedTask?.title || ''} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Bucket Name</label>
                      <select className="form-select" value={selectedBucket} onChange={(e) => setSelectedBucket(e.target.value)}>
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-success">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showRejectModal && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Reject Task</h5>
                  <button type="button" className="btn-close" onClick={() => setShowRejectModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Task Name</label>
                      <input type="text" className="form-control" value={selectedTask?.title || ''} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Select Reason Type</label>
                      <select className="form-select" value={rejectReasonType} onChange={(e) => setRejectReasonType(e.target.value)}>
                        <option value="">Select Reason</option>
                        <option value="Workload">Workload</option>
                        <option value="Unclear">Not Clear</option>
                        <option value="Out of Scope">Out of Scope</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Enter Reason</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Conflict with current high priority tasks"
                        value={rejectReasonText}
                        onChange={(e) => setRejectReasonText(e.target.value)}
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" onClick={() => setShowRejectModal(false)}>Cancel</button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      console.log('Rejected Task:', selectedTask?.title);
                      console.log('Reason Type:', rejectReasonType);
                      console.log('Reason:', rejectReasonText);
                      setShowRejectModal(false);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamTasks;