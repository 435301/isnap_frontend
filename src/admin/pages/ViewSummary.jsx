import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TaskSummary = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const discussions = [
    {
      id: 1,
      iconBg: '#3B82F6',
      title: 'You sent 1 Message to the contact.',
      time: '10 Jan 2024, 10:00 am',
    },
    {
      id: 2,
      iconBg: '#F59E0B',
      title: 'iSnap responded to your appointment schedule question by call at 09:30pm.',
      time: '10 Jan 2024, 10:00 am',
    },
    {
      id: 3,
      iconBg: '#3B82F6',
      title: `Please accept my apologies for the inconvenience caused. `,
      time: '25 Jul 2025, 05:00 pm',
    },
    {
      id: 4,
      iconBg: '#F59E0B',
      title: 'iSnap sent 1 Message to the contact.',
      time: '10 Jan 2024, 10:00 am',
    },
    {
      id: 5,
      iconBg: '#3B82F6',
      title: 'You responded to your appointment schedule question by call at 09:30pm.',
      time: '10 Jan 2024, 10:00 am',
    },
  ];

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

        <div className="container-fluid px-4 pt-4">
          <div className="bg-white p-3 rounded shadow-sm card-header mb-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0 fw-semibold">Task Details</h5>
          </div>

          {/* Task Summary Card */}
          <div className="bg-white p-2 px-3 rounded shadow-sm mb-4 border">
            <div className='border-bottom '><h5 className='section-heading'>Task Summary</h5></div>
            <div className="d-flex justify-content-between align-items-center  pb-2 mb-3 mt-3">
              <div className="d-flex align-items-center gap-2">
                <span className="bg-success rounded-circle" style={{ width: 10, height: 10 }}></span>
                <h5 className="mb-0 fw-semibold">Update iSNAP new project design</h5>
              </div>
              <div>
                <select className="form-select form-select-sm" style={{ width: 120 }}>
                  <option>To Do</option>
                  <option selected>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            <div className='border p-3'>
              <div className="mb-3">
                <h6 className="fw-semibold">Task Description:</h6>
                <p className="small mb-1">
                  The current website design needs a refresh to improve user experience and enhance visual appeal.
                  The goal is to create a modern and responsive design that aligns with the latest web design trends.
                  The updated design should ensure seamless navigation, easy readability, and a cohesive visual identity.
                </p>
              </div>

              <div className="mb-3 key-task">
                <h6 className="fw-semibold mb-3">Key tasks:</h6>
                <ol className="small ps-3">
                  <li>Conducting a comprehensive analysis of the existing website design.</li>
                  <li>Collaborating with the UI/UX team to develop wireframes and mockups.</li>
                  <li>Iteratively refining the design based on feedback.</li>
                  <li>Implementing the finalized design changes using HTML, CSS, and JavaScript.</li>
                  <li>Testing the website across different devices and browsers.</li>
                  <li>Conducting a final review to ensure all design elements are consistent and visually appealing.</li>
                </ol>
              </div>
              <div className="border-top pt-3 mt-3 d-flex justify-content-start sellar small gap-4 flex-wrap">
                <div><strong className="text-dark">Seller Name:</strong> GVK Fashions</div>
                <div><strong className="text-dark">Start Date:</strong> June 10, 2025</div>
                <div><strong className="text-dark">Due Date:</strong> June 20, 2025</div>
                <div><strong className="text-dark">Status:</strong> <span className="badge bg-warning text-dark">In Progress</span></div>
              </div>
            </div>

            {/* Comment Section */}
            <div className="bg-white p-3 rounded  mb-4">
              <h6 className="mb-2 fw-semibold">Comment</h6>
              <textarea className="form-control mb-2" rows="3" placeholder="Enter Message"></textarea>
              <div className="text-end mt-3">
                <button className="btn btn-success px-4">Send</button>
              </div>
            </div>
          </div>

    
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
