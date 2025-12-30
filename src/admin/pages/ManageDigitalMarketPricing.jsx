import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditDigitalMarketModal from "../components/Modal/EditDigitalMarketModal";
import ViewDigitalMarketModal from "../components/Modal/ViewDigitalMarketModal";
import PaginationComponent from "../../common/pagination";

import {
  fetchDigitalMarketById,
  updateDigitalMarket,
  clearDigitalMarketSuccessMessage,
} from "../../redux/actions/digitalMarketActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageDigitalMarketPricing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(0);

  const {
    markets = [],
    loading = false,
    successMessage = null,
    error = null,
  } = useSelector((state) => state.digitalMarket || {});

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch digital market pricing by ID
  useEffect(() => {
    dispatch(fetchDigitalMarketById(1));
  }, [dispatch]);

  // Show success toast
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearDigitalMarketSuccessMessage());
    }
  }, [successMessage, dispatch]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSaveChanges = async (updatedMarket) => {
    try {
      const updated = await dispatch(updateDigitalMarket(updatedMarket));
      setShowEditModal(false);
      setSelectedMarket(updated);
      dispatch(fetchDigitalMarketById(1)); // optional refresh
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    }
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
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">
                    Manage Digital Market Pricing
                  </h5>
                </div>
                {/* <div className="col-lg-6 text-end">
                  <Link
                    to="/create-digital-marketing-price"
                    className="btn btn-new-lead"
                  >
                    <i className="bi bi-plus-circle me-1"></i> Add Digital Market Pricing
                  </Link>
                </div> */}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="table-responsive">
                <table className="table align-middle table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center text-primary">
                          Loading digital market pricing...
                        </td>
                      </tr>
                    ) : markets.length > 0 ? (
                      markets.map((m, index) => (
                        <tr key={m.id}>
                          <td>{index + 1}</td>
                          <td>₹{m.price}</td>
                          <td>
                            <span
                              className={`badge ${
                                m.status === 1
                                  ? "bg-success-light text-success"
                                  : "bg-danger-light text-danger"
                              }`}
                            >
                              {m.status === 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-icon btn-view"
                                onClick={() => {
                                  setSelectedMarket(m);
                                  setShowViewModal(true);
                                }}
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-edit"
                                onClick={() => {
                                  setSelectedMarket(m);
                                  setShowEditModal(true);
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-danger">
                          Digital market pricing not found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages || 1}
                onPageChange={setCurrentPage}
              />
              {/* Modals */}
              <EditDigitalMarketModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                selectedMarket={selectedMarket}
                handleSaveChanges={handleSaveChanges}
              />
              <ViewDigitalMarketModal
                show={showViewModal}
                handleClose={() => setShowViewModal(false)}
                market={selectedMarket}
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ManageDigitalMarketPricing;
