import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createServiceActivity } from "../../redux/actions/serviceActivityActions";
import { fetchCategories } from "../../redux/actions/categoryActions";
import { fetchSubServices } from "../../redux/actions/subServiceActions";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

const CreateServicesActivities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const categoryList = useSelector((state) => state.category?.categories || []);
  const activities = useSelector((state) => state.subService?.subServices || []);

  // Local State
  const [subServices, setSubServices] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formHeader, setFormHeader] = useState({
    servicesCategory: "",
    serviceType: "",
  });
  const [rows, setRows] = useState([{ serviceActivity: "", activityCode: "", status: "" }]);

  // ---------------------- Window Resize ----------------------
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------------------- Fetch Categories ----------------------
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ---------------------- Fetch Sub-Services ----------------------
  useEffect(() => {
    if (formHeader.servicesCategory) {
      dispatch(fetchSubServices({ serviceCategoryId: formHeader.servicesCategory }));
      setFormHeader((prev) => ({ ...prev, serviceType: "" }));
    } else {
      setSubServices([]);
    }
  }, [formHeader.servicesCategory, dispatch]);

  // ---------------------- Extract Unique Sub-Services ----------------------
  useEffect(() => {
    if (activities && activities.length > 0) {
      const uniqueSubServices = activities
        .map((act) => ({ id: act.subServiceId, name: act.subServiceName }))
        .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
      setSubServices(uniqueSubServices);
    } else {
      setSubServices([]);
    }
  }, [activities]);

  // ---------------------- Handlers ----------------------
  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setFormHeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => setRows([...rows, { serviceActivity: "", activityCode: "", status: "" }]);
  const handleRemoveRow = (index) => setRows(rows.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formHeader.servicesCategory || !formHeader.serviceType) {
      toast.error("Please select category and service type.");
      return;
    }

    for (const row of rows) {
      if (!row.serviceActivity || !row.activityCode || !row.status) {
        toast.error("Please fill all required fields.");
        return;
      }
    }

    const payload = {
      serviceCategoryId: formHeader.servicesCategory,
      subServiceId: formHeader.serviceType,
      activities: rows.map((row) => ({
        activityName: row.serviceActivity,
        activityCode: row.activityCode,
        status: row.status === "Active" ? 1 : 0,
      })),
    };

    dispatch(createServiceActivity(payload))
      .then(() => {
        toast.success("Service activities created successfully!");
        navigate("/manage-service-activities", { state: { created: true } });
      })
      .catch(() => toast.error("Failed to create service activities."));
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
          <div className="row mb-2">
            <div className="bg-white p-3 rounded shadow-sm card-header">
              <div className="row g-2 align-items-center">
                <div className="col-lg-6">
                  <h5 className="form-title m-0">Create Service Activities</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/manage-service-activities" className="btn btn-new-lead">
                    Manage Service Activities
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="row g-3 mb-3">
                  <div className="col-md-3">
                    <label className="form-label">
                      Service Category <span className="text-danger">*</span>
                    </label>
                    <select
                      name="servicesCategory"
                      value={formHeader.servicesCategory}
                      onChange={handleHeaderChange}
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      {categoryList.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.serviceCategoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Service Type <span className="text-danger">*</span>
                    </label>
                    <select
                      name="serviceType"
                      value={formHeader.serviceType}
                      onChange={handleHeaderChange}
                      className="form-select"
                    >
                      <option value="">Select Service Type</option>
                      {subServices.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dynamic Rows */}
                {rows.map((row, index) => (
                  <div className="row g-3 mb-3 align-items-end" key={index}>
                    <div className="col-md-3">
                      <label className="form-label">
                        Service Activity <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="serviceActivity"
                        value={row.serviceActivity}
                        onChange={(e) => handleChange(index, e)}
                        className="form-control"
                        placeholder="Enter Activity Name"
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">
                        Activity Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="activityCode"
                        value={row.activityCode}
                        onChange={(e) => handleChange(index, e)}
                        className="form-control"
                        placeholder="Enter Code"
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">
                        Status <span className="text-danger">*</span>
                      </label>
                      <select
                        name="status"
                        value={row.status}
                        onChange={(e) => handleChange(index, e)}
                        className="form-select"
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    {index === rows.length - 1 && (
                      <div className="col-md-1 d-flex align-items-center mt-5 gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={handleAddRow}
                        >
                          <i className="bi bi-plus-circle"></i>
                        </button>
                        {rows.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveRow(index)}
                          >
                            <i className="bi bi-dash-circle"></i>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Submit */}
                <div className="col-md-12 d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-success me-2 px-4">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setRows([{ serviceActivity: "", activityCode: "", status: "" }])}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CreateServicesActivities;
