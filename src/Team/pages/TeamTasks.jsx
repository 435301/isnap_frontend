import React, { useState, useEffect } from 'react';
import Sidebar from '../components/TeamSidebar';
import Navbar from '../components/TeamNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AssignTaskModal from '../components/AssignTaskModal';
import MoveTaskModal from '../components/MoveTaskModal';
import RejectTaskModal from '../components/RejectTaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { acceptTask, assignTask, fetchExecutives, fetchTasks, rejectTask, updatePriority } from '../../redux/actions/taskAction';
import { toast } from 'react-toastify';

const TeamTasks = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedBucket, setSelectedBucket] = useState('To Do');
  const [rejectReasonType, setRejectReasonType] = useState('');
  const [rejectReasonText, setRejectReasonText] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignTo, setAssignTo] = useState("");
  const [assignComment, setAssignComment] = useState("");

  const { tasks = [], executives, updatedPriority, acceptedTask, loading, error } = useSelector((state) => state.tasks || {});
  console.log('executives', executives)
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
    dispatch(fetchTasks());
    dispatch(fetchExecutives());
  }, [dispatch]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const todoTasks = tasks.filter((t) =>[1, 4, 5].includes(t.workProgressStatus));  // to do //accept // reject
  const completedTasks = tasks.filter((t) => t.workProgressStatus === 3);   // completed 
  const inProgressTasks = tasks.filter((t) => t.workProgressStatus === 2);  // in progress

  // If API doesn’t have isPaid=2, you can derive inProgress by logic (optional)
  const taskData = {
    todo: todoTasks,
    inProgress: inProgressTasks,
    completed: completedTasks,
  };


  const TaskCard = ({ task, type }) => {
    console.log('task', task);
    const isDisabled = task.id === 0;

    const getCardClass = () => {
      if (task.title.includes('Amazon')) return 'bg-success-subtle text-success';
      if (task.title.includes('Flipkart')) return 'bg-warning-subtle text-warning';
      if (task.title.includes('Myntra')) return 'bg-danger-subtle text-danger';
      return 'bg-secondary-subtle text-secondary';
    };

    const getPriorityBtnClass = (priority) => {
      switch (priority?.toLowerCase()) {
        case 'high':
          return 'btn btn-sm bg-danger-subtles text-danger px-3 fw-semibold';   //  High = red
        case 'medium':
          return 'btn btn-sm bg-success-subtles text-success px-3 fw-semibold'; //  Medium = yellow
        case 'low':
          return 'btn btn-sm bg-warning-subtles text-warning px-3 fw-semibold'; //  Low = green
        default:
          return 'btn btn-sm bg-secondary-subtles text-secondary px-3 fw-semibold'; // fallback gray
      }
    };

    return (
      <div
        className={`card task-card shadow-sm rounded-4 p-2 mb-3 ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}
        style={isDisabled ? { cursor: "not-allowed" } : {}}
      >
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
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setSelectedTask(task);
                  setShowAssignModal(true);
                }}
              >
                Assign
              </button>
            </li>

          </ul>
        </div>
        <p className="text-muted small mb-3">{task.description}</p>
        <div className="row g-2 text-muted small mb-2">

          <div className="col-5">
            <strong className="border border-danger rounded px-2 py-1 small d-block mb-2">Task Completion Days</strong>
            <div className="text-dark mt-1">
              <p>{task.dueDate}</p>
            </div>
          </div>
          <div className="col-4">
            <strong className="border border-info rounded px-2 py-1 small d-block mb-2">Seller Name</strong>
            <div className="text-dark mt-1">
              <i className="bi bi-person"></i> {task.seller}
            </div>
          </div>
           <div className="col-4">
            <strong className="border border-info rounded px-2 py-1 small d-block mb-2">Manager Name</strong>
            <div className="text-dark mt-1">
              <i className="bi bi-person"></i> {task.manager}
            </div>
          </div>
           <div className="col-4">
            <strong className="border border-info rounded px-2 py-1 small d-block mb-2">Assignee</strong>
            <div className="text-dark mt-1">
              <i className="bi bi-person"></i> {task.executive}
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
  </button>
)}

            <select
              className="form-select form-select-sm"
              style={{ width: "auto" }}
              value={task.priority}
              onChange={(e) => {
                const newPriority = e.target.value;
                const priorityIdMap = { High: 1, Medium: 2, Low: 3 };
                dispatch(updatePriority(task.id, priorityIdMap[newPriority]));
              }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
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
              <button
                className="btn btn-sm bg-success-subtle text-success px-3"
                disabled={task.workProgressStatus === 2}
                onClick={() => {
                  if (task.workProgressStatus !== 2) dispatch(acceptTask(task.id));
                }}
              >
                {task.workProgressStatus === 4 ? "Accepted" : "Accept"}
              </button>
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

 const handleAssignSubmit = (selectedTask, assignee, comment) => {
  if (!selectedTask || !assignee || !comment) {
    toast.error("Please select a task and an assignee and mention the comments");
    return;
  }
  dispatch(assignTask(selectedTask.id, assignee, comment || "No comment provided"))
    .then(() => {
      setShowAssignModal(false);
      setAssignTo("");
      setAssignComment("");
    })
    .catch((err) => {
      console.error("Assign task failed:", err);
    });
};


  const handleMoveSave = (task, bucket) => {
    console.log("Moved Task:", task?.title, "➡️", bucket);
    setShowModal(false);
  };

const handleRejectSubmit = (selectedTask, reasonText) => {
  if ( !reasonText) {
    toast.error("Please select a reason and enter details");
    return;
  }
  const finalReason = ` ${reasonText}`;
  dispatch(rejectTask(selectedTask.id, finalReason));
  setShowRejectModal(false);
  setRejectReasonText("");
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
                  <h5 className="form-title m-0">Manage Tasks</h5>
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
          <div className="row g-2 pt-4">
            {/* To Do Column */}
            <div className="col-md-4 task-column">
              <div className="pb-2 mb-2 d-flex align-items-center">
                <h5 className="fw-bold d-inline me-2">To Do</h5>
                <span className="badge rounded-circle bg-warning text-dark">
                  {taskData.todo.length.toString().padStart(2, '0')}
                </span>
              </div>

              {loading && <p>Loading tasks...</p>}
              {error && <p className="text-danger">{error}</p>}
              {taskData.todo.map((task, idx) => (
                <TaskCard
                  key={idx}
                  task={{
                    id: task.taskId,
                    title: `${task.source}  ${task.serviceTypeName} ` || "Task",
                    description: `${task.source} | Bill Cycle: ${task.billCycleTitle || "N/A"}`,
                    startDate: task.createdAt
                      ? new Date(task.createdAt).toLocaleDateString()
                      : "-",
                    dueDate: task.taskCompletionDays
                      ? `${task.taskCompletionDays} days`
                      : "-",
                    seller: task.sellerName || "-",
                    manager: task.managerName || "-",
                    executive: task.executiveName || "-",
                    priority: task.priorityLabel || "Low", 
                  }}
                  type="todo"
                />
              ))}
            </div>

            {/* In Progress Column */}
            <div className="col-md-4 task-column">
              <div className="pb-2 mb-2 d-flex align-items-center">
                <h5 className="fw-bold d-inline me-2">In Progress</h5>
                <span className="badge rounded-circle bg-primary">
                  {taskData.inProgress.length.toString().padStart(2, '0')}
                </span>
              </div>
              {taskData.inProgress.map((task, idx) => (
                <TaskCard
                  key={idx}
                  task={{
                    id: task.taskId,
                    title: `${task.source}  ${task.serviceTypeName} ` || "Task",
                    description: `${task.source} | Bill Cycle: ${task.billCycleTitle || "N/A"}`,
                    startDate: task.createdAt
                      ? new Date(task.createdAt).toLocaleDateString()
                      : "-",
                    dueDate: task.taskCompletionDays
                      ? `${task.taskCompletionDays} days`
                      : "-",
                    seller: task.sellerName || "-",
                    manager: task.managerName || "-",
                    executive: task.executiveName || "-",

                  }}
                  type="inProgress"
                />
              ))}
            </div>

            {/* Completed Column */}
            <div className="col-md-4 task-column">
              <div className="pb-2 mb-2 d-flex align-items-center">
                <h5 className="fw-bold d-inline me-2">Done</h5>
                <span className="badge rounded-circle bg-success">
                  {taskData.completed.length.toString().padStart(2, '0')}
                </span>
              </div>
              {taskData.completed.map((task, idx) => (
                <TaskCard
                  key={idx}
                  task={{
                    id: task.taskId,
                    title: `${task.source}  ${task.serviceTypeName} ` || "Task",
                    description: `${task.source} | Bill Cycle: ${task.billCycleTitle || "N/A"}`,
                    startDate: task.createdAt
                      ? new Date(task.createdAt).toLocaleDateString()
                      : "-",
                    dueDate: task.taskCompletionDays
                      ? `${task.taskCompletionDays} days`
                      : "-",
                    seller: task.sellerName || "-",
                    manager: task.managerName || "-",
                    executive: task.executiveName || "-",
                    completedDate: task.updatedAt
                      ? new Date(task.updatedAt).toLocaleDateString()
                      : "-",
                  }}
                  type="completed"
                />
              ))}
            </div>
          </div>

        </div>


        <AssignTaskModal
          show={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          onSubmit={handleAssignSubmit}
          selectedTask={selectedTask}
          assignTo={assignTo}
          setAssignTo={setAssignTo}
          assignComment={assignComment}
          setAssignComment={setAssignComment}
          executives={executives}
        />

        <MoveTaskModal
          show={showModal}
          onClose={() => setShowModal(false)}
          selectedTask={selectedTask}
          selectedBucket={selectedBucket}
          setSelectedBucket={setSelectedBucket}
          onSave={handleMoveSave}
        />

        <RejectTaskModal
          show={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          selectedTask={selectedTask}
          rejectReasonType={rejectReasonType}
          setRejectReasonType={setRejectReasonType}
          rejectReasonText={rejectReasonText}
          setRejectReasonText={setRejectReasonText}
          onSubmit={handleRejectSubmit}
        />

      </div>
    </div>
  );
};

export default TeamTasks;