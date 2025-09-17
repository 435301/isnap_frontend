import React, { useState, useEffect } from 'react';
import Sidebar from "../components/SellerNavbar";
import Navbar from "../components/SellerSidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// ✅ Import images
import img1 from '../assets/images/img.png';

const LastestUpdates = () => {
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

  const updates = [
    {
      id: 1,
      iconBg: '#3B82F6',
      title: 'Lead Follow-up Reminder',
      lines: [
        'Reminder: Please call and follow up with Lead XYZ Enterprises today and update the lead status.',
        'Lead ABC Textiles is pending confirmation. Kindly conclude the discussion and update the lead status.',
      ],
      time: '10 Jan 2025, 10:00 am',
    },
    {
      id: 2,
      iconBg: '#10B981',
      title: 'Urgent Task Completion',
      lines: [
        'Urgent: Task Product Upload for Flipkart – DEF Bookstore needs to be completed by EOD today.',
        'Kindly prioritize and complete the pending SEO Optimization task for GHI Supermarket immediately.',
      ],
      time: '10 Jan 2025, 10:00 am',
    },
    {
      id: 3,
      iconBg: '#F59E0B',
      title: 'Task Assignment Notification',
      lines: [
        'New Task Assigned: Listing Products for JKL Apparel. Please start and update the status in the system.',
        'You have been assigned a new service task: Inventory Management for MNO Bookshop. Kindly acknowledge.',
      ],
      images: [img1, img1, img1, img1], // ✅ Using imported image
      time: '10 Jan 2025, 10:00 am',
    },
    {
      id: 4,
      iconBg: '#EF4444',
      title: 'New Skill Guide Available',
      lines: [
        'New Resource: Product Listing Best Practices – Access the guide here:',
        '[https://example.com/listing-guide]',
      ],
      time: '10 Jan 2025, 10:00 am',
    },
  ];

  const renderCard = (update) => (
    <div className="bg-white p-3 rounded shadow-sm mb-3" key={update.id}>
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex">
          <div
            className="d-flex align-items-center justify-content-center me-3 rounded"
            style={{width: 40,height: 40,backgroundColor: update.iconBg,}}>
            <i className="bi bi-person-fill text-white"></i>
          </div>
          <div>
            <h6 className="mb-2 fw-semibold">{update.title}</h6>
            {update.lines.map((line, i) => (
              <p key={i} className="text-muted small mb-1">
                {line}
              </p>
            ))}
            {update.images && (
              <div className="d-flex mt-2 gap-2 flex-wrap">
                {update.images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Update Img ${idx}`}
                    className="rounded"
                    width="70"
                    height="45"
                    style={{ objectFit: 'cover' }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <small className="text-muted">{update.time}</small>
      </div>
    </div>
  );

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft:
            windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : isSidebarOpen ? 220 : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="container-fluid px-4 pt-4">
          <div className="bg-white p-3 rounded shadow-sm card-header mb-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0 fw-semibold">Lastest Updates</h5>
            <div className="d-flex gap-2">
              <select className="form-select form-select-sm w-auto">
                <option>Sort by date</option>
                <option>Sort by title</option>
              </select>
              <select className="form-select form-select-sm w-auto">
                <option>January</option>
                <option>February</option>
              </select>
            </div>
          </div>

          {/* Render update cards */}
          {updates.map(renderCard)}
        </div>
      </div>
    </div>
  );
};

export default LastestUpdates;
