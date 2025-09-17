import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createState, clearStateSuccessMessage } from "../../redux/actions/stateActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AddState = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stateName: "",
    stateStatus: "Active",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsSidebarOpen(width >= 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      stateName: formData.stateName.trim(),
      stateStatus: formData.stateStatus === "Active",
    };

    try {
      const res = await dispatch(createState(payload));
      // ✅ Show success toast
      toast.success(res.message || "State created successfully");

      // Redirect after showing toast
      setTimeout(() => {
        dispatch(clearStateSuccessMessage());
        navigate("/manage-state");
      }, 1000);
    } catch (err) {
      // Show API error message
      const msg = err?.message || "Something went wrong";
      toast.error(msg);
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
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-2">
              <div className="row g-2 align-items-center">
                <div className="col-lg-3">
                  <h5 className="form-title m-0">Add State</h5>
                </div>
                <div className="col-lg-9 text-end">
                  <Link to="/manage-state" className="btn btn-new-lead">
                    Manage States
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* State Name */}
                  <div className="col-md-3">
                    <label className="form-label">
                      State Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="stateName"
                      value={formData.stateName}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter State Name"
                      required
                    />
                  </div>

                  {/* Status */}
                  <div className="col-md-3">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="stateStatus"
                      value={formData.stateStatus}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="In Active">In Active</option>
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="col-md-12 d-flex justify-content-end mt-5 mb-4">
                    <button type="submit" className="btn btn-success px-4 me-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate("/manage-state")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddState;
