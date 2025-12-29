import React, { useState, useEffect } from 'react';
import Sidebar from '../components/TeamSidebar';
import Navbar from '../components/TeamNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPersonalTaskDocument, deletePersonalTaskDocument, fetchPersonalTaskById, fetchTaskHistory, sendTaskComments } from '../../redux/actions/taskAction';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import { getStatus } from '../../common/helper';
import BASE_URL from '../../config/config';
import { formattedDate } from '../../components/FormatDate';

const TaskSummaryPersonal = () => {
  const { id } = useParams();
  console.log('id', id)
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedFile, setSelectedFile] = useState(null);
  const personalSelectedTasks = useSelector((state) => state.tasks.personalSelectedTasks);
  console.log('personalTask', personalSelectedTasks);
  const status = getStatus(personalSelectedTasks?.workProgressStatus);

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
    if (id) {
      dispatch(fetchPersonalTaskById(id));
    }
  }, [dispatch, id]);

  const handleUpload = () => {
    dispatch(addPersonalTaskDocument(id, selectedFile));
    setSelectedFile(null);
  }

  const handleDelete = (docId) => {
    dispatch(deletePersonalTaskDocument(docId));
  }

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
                <h5 className="mb-0 fw-semibold">{personalSelectedTasks?.serviceTypeName}</h5>
              </div>
            </div>

            <div className="small border-bottom">

              <div className='pb-2'><strong className="text-dark">Manager Name:</strong> {personalSelectedTasks?.managerName || "-"}</div>
              <div className='pb-2'><strong className="text-dark">Executive Name:</strong> {personalSelectedTasks?.executiveName || "-"}</div>
              <div className='pb-2'><strong className="text-dark">Start Date:</strong> {formattedDate(personalSelectedTasks?.fromDate)}</div>
              <div className='pb-2'><strong className="text-dark">End Date:</strong> {formattedDate(personalSelectedTasks?.toDate)}</div>
              <div className='pb-2'><strong className="text-dark">Completed Date:</strong> {formattedDate(personalSelectedTasks?.completedDate) || "-"}</div>
              <div className='pb-2'><strong className="text-dark">Description:</strong> {personalSelectedTasks?.description || "-"}</div>
              <div className='pb-2'><strong className="text-dark">Status:</strong>  <span className={`badge ${status?.class}`}>{status?.label}</span></div>
            </div>

            <div className="bg-white pt-3 rounded mb-4">
              <h5 className="mb-3 fw-semibold">Upload Document</h5>
              <input
                type="file"
                className="form-control mb-2"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <div className='text-end'>
                <button className="btn btn-success mb-2 px-3" onClick={() => handleUpload(personalSelectedTasks?.id, selectedFile)} disabled={!selectedFile}>Upload</button>
              </div>
              {personalSelectedTasks?.documents.length > 0 && (
                <div>
                  <h5 className="mb-3 fw-semibold">Uploaded Documents</h5>
                  {personalSelectedTasks.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <a
                        href={`${BASE_URL}/${doc.document}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-decoration-underline small"
                      >
                        View Attachment
                      </a>
                      <div className="d-flex align-items-center gap-3">
                        <span className="text-muted small">
                          {formattedDate(doc.createdAt)}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {personalSelectedTasks?.documents?.length === 0 && (
                <p className="text-muted small">No documents uploaded yet.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskSummaryPersonal;
