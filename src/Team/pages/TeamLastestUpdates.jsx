import React, { useState, useEffect } from 'react';
import Sidebar from '../components/TeamSidebar';
import Navbar from '../components/TeamNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import img1 from '../assets/images/img.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestUpdates } from '../../redux/actions/latestUpdatesAction';
import BASE_URL from '../../config/config';
import "../assets/team.css";

const TeamLastestUpdates = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { latestUpdates } = useSelector(
    (state) => state.latestUpdates
  );

  useEffect(() => {
    dispatch(fetchLatestUpdates());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderCard = (update) => (
    <div className="bg-white p-3 rounded shadow-sm mb-3" key={update.id}>
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex">
          <div
            className="d-flex align-items-center justify-content-center me-3 rounded icon-latest-updates"
          >
            <i className="bi bi-person-fill text-white"></i>
          </div>

          <div>
            <h6 className="mb-2 fw-semibold">{update.title}</h6>

            <p className="text-muted small mb-1">{update.description}</p>

            <p className="text-muted small mb-1"><strong>Update To: {update.roleName}</strong></p>

            {/* Render file previews */}
            {update.files && update.files.length > 0 && (
              <div className="d-flex mt-2 gap-2 flex-wrap">
                {update.files.map((file) => {
                  if (file.fileType === 1) {
                    // Image
                    return (
                      <img
                        key={file.id}
                        src={`${BASE_URL}${file.file}`}
                        alt="Update Img"
                        className="rounded"
                        width="70"
                        height="45"
                        style={{ objectFit: "cover" }}
                      />
                    );
                  } else if (file.fileType === 2) {
                    // PDF
                    return (
                      <a
                        key={file.id}
                        href={`${BASE_URL}${file.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary small"
                      >
                        View PDF
                      </a>
                    );
                  } else if (file.fileType === 3) {
                    // External link
                    return (
                      <a
                        key={file.id}
                        href={file.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-success small"
                      >
                        Open Link
                      </a>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
        <small className="text-muted">
          {new Date(update.createdAt).toLocaleString()}
        </small>
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
          {latestUpdates && latestUpdates.length > 0 ? (
            latestUpdates.map(renderCard)
          ) : (
            <p className="text-muted text-center">No updates found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamLastestUpdates;
