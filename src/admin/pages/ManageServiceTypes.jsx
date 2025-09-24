import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubServices, deleteSubService, updateSubService } from "../../redux/actions/subServiceActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Modals
import ViewSubServiceModal from "../components/Modal/ViewSubServiceModal";
import EditSubServiceModal from "../components/Modal/EditSubServiceModal";
import DeleteConfirmationModal from "../components/Modal/DeleteConfirmationModal";

const ManageServiceActivities = () => {
  const dispatch = useDispatch();
  const { subServices, loading, error } = useSelector((state) => state.subServices);
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedService, setSelectedService] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Sidebar resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch services
  useEffect(() => {
    dispatch(fetchSubServices({ page: 1, search: "", serviceCategoryId: "", showStatus: "" }));
  }, [dispatch]);

  // Show success toast if coming from create page
  useEffect(() => {
    if (location.state?.subServiceCreated) {
      toast.success("Sub-service created successfully!");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleConfirmDelete = () => {
    if (deleteId) {
      dispatch(deleteSubService(deleteId)).then(() => {
        toast.success("Sub-service deleted successfully!");
        dispatch(fetchSubServices({ page: 1, search: "", serviceCategoryId: "", showStatus: "" }));
        setShowDeleteModal(false);
        setDeleteId(null);
      });
    }
  };

  const handleSaveChanges = async (updatedService) => {
    try {
      await dispatch(updateSubService(updatedService.id, updatedService));
      toast.success("Sub-service updated successfully!");
      dispatch(fetchSubServices({ page: 1, search: "", serviceCategoryId: "", showStatus: "" }));
      setShowEdit(false);
    } catch {
      toast.error("Failed to update sub-service");
    }
  };

  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="content flex-grow-1"
        style={{
          marginLeft: windowWidth >= 992 ? (isSidebarOpen ? 259 : 95) : isSidebarOpen ? 220 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <div className="container-fluid px-4 pt-3">
          <div className="row mb-3">
            <div className="bg-white p-3 rounded shadow-sm card-header d-flex justify-content-between align-items-center">
              <h5 className="m-0">Manage Service Types</h5>
              <Link to="/create-service-type" className="btn btn-new-lead">
                <i className="bi bi-plus-circle me-1"></i> Add Service Types
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="table-responsive">
                <table className="table align-middle table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>S.no</th>
                      <th>Service Categories</th>
                      <th>Service Types</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center">Loading...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="5" className="text-center text-danger">{error}</td>
                      </tr>
                    ) : subServices.length > 0 ? (
                      subServices.map((service, index) => (
                        <tr key={service.id}>
                          <td>{index + 1}</td>
                          <td>{service.serviceCategoryName}</td>
                          <td>{service.subServiceName}</td>
                          <td>
                            <span className={`badge px-3 py-2 ${service.status === 1 ? "bg-success-light text-success" : "bg-danger-light text-danger"}`}>
                              {service.status === 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button className="btn btn-icon btn-view" onClick={() => { setSelectedService(service); setShowView(true); }}>
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-icon btn-edit" onClick={() => { setSelectedService(service); setShowEdit(true); }}>
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button className="btn btn-icon btn-delete" onClick={() => { setDeleteId(service.id); setShowDeleteModal(true); }}>
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No services found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showView && <ViewSubServiceModal show={showView} handleClose={() => setShowView(false)} subService={selectedService} />}
        {showEdit && <EditSubServiceModal show={showEdit} handleClose={() => setShowEdit(false)} subService={selectedService} onSave={handleSaveChanges} />}
        {showDeleteModal && <DeleteConfirmationModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} handleConfirm={handleConfirmDelete} />}

        <ToastContainer />
      </div>
    </div>
  );
};

export default ManageServiceActivities;
