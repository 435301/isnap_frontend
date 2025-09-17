import React, { useState, useEffect } from 'react';
import Sidebar from '../components/TeamSidebar';
import Navbar from '../components/TeamNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TeamNotifications = () => {
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

  // Today Notifications
  const todayUpdates = [
    {
      id: 1,
      iconBg: '#3B82F6',
      title: 'Lead Follow-up Reminder',
      description:
        'Reminder: Please call and follow up with Lead XYZ Enterprises today and update the lead status.',
      time: '14 Aug 2025, 09:00 am',
    },
    {
      id: 2,
      iconBg: '#10B981',
      title: 'Urgent Task Completion',
      description:
        'Urgent: Task Product Upload for Flipkart – DEF Bookstore needs to be completed by EOD today.',
      time: '14 Aug 2025, 10:15 am',
    },
    {
      id: 3,
      iconBg: '#F59E0B',
      title: 'SEO Optimization Pending',
      description:
        'Kindly prioritize and complete the pending SEO Optimization task for GHI Supermarket immediately.',
      time: '14 Aug 2025, 11:30 am',
    },
  ];

  // Yesterday Notifications
  const yesterdayUpdates = [
    {
      id: 1,
      iconBg: '#3B82F6',
      title: 'You were mentioned in a comment',
      description:
        "Jessica Chen mentioned you in a comment: 'Can @you review this by tomorrow?'",
      time: '13 Aug 2025, 10:00 am',
    },
    {
      id: 2,
      iconBg: '#10B981',
      title: 'You were mentioned in a comment',
      description:
        "Jessica Chen mentioned you in a comment: 'Can @you review this by tomorrow?'",
      time: '13 Aug 2025, 10:00 am',
    },
    {
      id: 3,
      iconBg: '#F59E0B',
      title: 'You were mentioned in a comment',
      description:
        "Jessica Chen mentioned you in a comment: 'Can @you review this by tomorrow?'",
      time: '13 Aug 2025, 10:00 am',
    },
  ];

  const renderNotificationCard = (update) => (
    <div
      key={update.id}
      className="bg-white p-3 border-bottom d-flex justify-content-between align-items-start"
    >
      <div className="d-flex">
        <div
          className="d-flex align-items-center justify-content-center me-3 rounded"
          style={{
            width: 40,
            height: 40,
            backgroundColor: update.iconBg,
          }}
        >
          <i className="bi bi-gear-fill text-white"></i>
        </div>
        <div>
          <h6 className="mb-1 fw-semibold">{update.title}</h6>
          <p className="text-muted small mb-0">{update.description}</p>
        </div>
      </div>
      <small className="text-muted">{update.time}</small>
    </div>
  );

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
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="container-fluid px-4 pt-4">
          <div className="bg-white p-3 rounded shadow-sm card-header mb-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0 fw-semibold">Notifications</h5>
          </div>

          {/* Today Section */}
          <div className="mb-4">
            <h6 className="text-uppercase text-dark small mb-3"><b>Today</b></h6>
            <div className="bg-white rounded shadow-sm">
              {todayUpdates.map(renderNotificationCard)}
            </div>
          </div>

          {/* Yesterday Section */}
          <div className="mb-4">
            <h6 className="text-uppercase text-dark small mb-3"><b>Yesterday</b></h6>
            <div className="bg-white rounded shadow-sm">
              {yesterdayUpdates.map(renderNotificationCard)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamNotifications;
