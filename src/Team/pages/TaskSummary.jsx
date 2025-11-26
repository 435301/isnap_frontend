import React, { useState, useEffect } from 'react';
import Sidebar from '../components/TeamSidebar';
import Navbar from '../components/TeamNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskHistory, sendTaskComments } from '../../redux/actions/taskAction';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { getStatus } from '../../common/helper';
import BASE_URL from '../../config/config';

const TaskSummary = () => {
  const location = useLocation();
  const task = location.state?.task;
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [comments, setComments] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // const [status, setStatus] = useState(task?.workProgressStatus || 2);
  const status = getStatus(task.workProgressStatus);
  const { taskHistory = [] } = useSelector((state) => state.tasks || {});
  const discussions = taskHistory?.length ? taskHistory : [];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (task?.id) {
      dispatch(fetchTaskHistory(task?.id));
    }
  }, [dispatch, task?.id]);

  const handleSendComments = () => {
    if (!comments.trim()) {
      toast.error("Please enter a comment before sending");
      return;
    }
    dispatch(sendTaskComments(task.id, status.id, comments, selectedFile));
    setComments("");
    setSelectedFile(null);
  };

  const renderDiscussion = (item) => (
    <div className="bg-white p-3 rounded border mb-2" key={item.id}>
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex">
          <div
            className="d-flex align-items-center justify-content-center me-3 rounded"
            style={{ width: 40, height: 40, backgroundColor: item.iconBg }}
          >
            <i className="bi bi-person-fill text-white"></i>
          </div>
          <div>
            <p className="mb-1 small fw-semibold text-dark">{item.title}</p>
            <p className="small mb-0">{item.time}</p>
          </div>
        </div>
      </div>
    </div>
  );

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
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="container-fluid px-3 pt-4">
          {/* Task Details */}
          <div className="bg-white p-3 rounded shadow-sm card-header mb-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0 fw-semibold">Task Details</h5>
          </div>

          {/* Task Summary */}
          <div className="bg-white p-2 px-3 rounded shadow-sm mb-4 border">
            <div className='border-bottom'><h5 className='section-heading'>Task Summary</h5></div>
            <div className="d-flex justify-content-between align-items-center pb-2 mb-3 mt-3">
              <div className="d-flex align-items-center gap-2">
                <span className="bg-success rounded-circle" style={{ width: 10, height: 10 }}></span>
                <h5 className="mb-0 fw-semibold">{task.title}</h5>
              </div>

            </div>

            <div className='border p-3'>
              {/* <div className="mb-3">
                <h6 className="fw-semibold">Task Description:</h6>
                <p className="small mb-1">
                 {task.description}
                </p>
              </div> */}

              {/* <div className="mb-3 key-task">
                <h6 className="fw-semibold mb-3">Key tasks:</h6>
                <ol className="small ps-3">
                  <li>Conducting a comprehensive analysis of the existing website design.</li>
                  <li>Collaborating with the UI/UX team to develop wireframes and mockups.</li>
                  <li>Iteratively refining the design based on feedback.</li>
                  <li>Implementing the finalized design changes using HTML, CSS, and JavaScript.</li>
                  <li>Testing the website across different devices and browsers.</li>
                  <li>Conducting a final review to ensure all design elements are consistent and visually appealing.</li>
                </ol>
              </div> */}

              <div className="small">
                <div className='pb-2'><strong className="text-dark">Seller Name:</strong>{task.seller}</div>
                <div className='pb-2'><strong className="text-dark">Business Name:</strong> {task.businessName}</div>
                <div className='pb-2'><strong className="text-dark">Manager Name:</strong> {task.managerName}</div>
                <div className='pb-2'><strong className="text-dark">Executive Name:</strong> {task.executive}</div>
                <div className='pb-2'><strong className="text-dark">Start Date:</strong> {task.startDate}</div>
                <div className='pb-2'><strong className="text-dark">End Date:</strong> {task.completedDate || "-"}</div>
                <div className='pb-2'><strong className="text-dark">Task Completion Days:</strong> {task.dueDate}</div>
                <div className='pb-2'><strong className="text-dark">Status:</strong>  <span className={`badge ${status.class}`}>{status.label}</span></div>
              </div>
            </div>

            {/* Comment Section */}
            <div className="bg-white p-3 rounded mb-4">
              <h6 className="mb-2 fw-semibold">Comment</h6>
              <textarea className="form-control mb-2" rows="3" placeholder="Enter Message" value={comments}
                onChange={(e) => setComments(e.target.value)}></textarea >
              <input
                type="file"
                className="form-control mb-2"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <div className="text-end mt-3">
                <button className="btn btn-success px-4" onClick={handleSendComments}>Send</button>
              </div>
            </div>
          </div>

          {/* Discussions & Rejected Tasks */}
          <div className="bg-white p-3 rounded shadow-sm card-header mb-3">
            <div className="row">
              {/* Left - Discussions */}
              <div className="col-lg-6">
                <h5 className="mb-4 fw-semibold">Task Discussions ({discussions.length})</h5>

                {discussions.length === 0 ? (
                  <p className="text-muted">No discussions yet.</p>
                ) : (
                  discussions.map((item, index) => {
                    const iconBg = index % 2 === 0 ? "#3B82F6" : "#F59E0B"; // blue/orange
                    const status = getStatus(item.status);
                    return (
                      <div className="bg-white p-3 rounded border mb-2" key={item.id}>
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="d-flex">
                            <div
                              className="d-flex align-items-center justify-content-center me-3 rounded-circle"
                              style={{ width: 40, height: 40, backgroundColor: iconBg }}
                            >
                              <i className="bi bi-person-fill text-white fs-5"></i>
                            </div>
                            <div>
                              <p className="mb-1 small fw-semibold text-dark">
                                {item.teamMember}{" "}
                                <span className="text-secondary">({item.role})</span>
                              </p>
                              <p className="small mb-1 text-secondary">{item.comments}</p>
                              {item.file && (
                                <p className="small mb-1">
                                  <a
                                    href={`${BASE_URL}/${item.file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary text-decoration-underline"
                                  >
                                    View Attachment
                                  </a>
                                </p>
                              )}
                              <p className="small text-muted mb-0">
                                {new Date(item.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div>
                            <span className={`badge ${status.class}`}>{status.label}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>



            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
