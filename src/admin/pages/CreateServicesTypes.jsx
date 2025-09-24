import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createSubServices } from "../../redux/actions/subServiceActions";
import { fetchCategories } from "../../redux/actions/categoryActions";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

const CreateServicesTypes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { servicesCategory: "", serviceType: "", status: "", isGenderApplicable: 0 },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Redux categories state
  const { categories } = useSelector((state) => state.category); // Assuming your reducer has `category.categories`

  // Sidebar responsive
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch categories from backend
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      { servicesCategory: rows[0].servicesCategory, serviceType: "", status: "", isGenderApplicable: 0 },
    ]);
  };

  const handleRemoveRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    for (const row of rows) {
      if (!row.servicesCategory || !row.serviceType || !row.status) {
        toast.error("Please fill all required fields.");
        return;
      }
    }

    const payload = {
      serviceCategoryId: rows[0].servicesCategory,
      subServices: rows.map((row) => ({
        subServiceName: row.serviceType,
        subServiceCode: "",
        isGenderApplicable: row.isGenderApplicable || 0,
        status: row.status === "Active" ? 1 : 0,
      })),
    };

    dispatch(createSubServices(payload))
      .then(() => {
        toast.success("Sub-services created successfully!");
        navigate("/manage-service-types", { state: { subServiceCreated: true } });
      })
      .catch(() => toast.error("Failed to create sub-services."));
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
                  <h5 className="form-title m-0">Create Service Types</h5>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="/manage-service-types" className="btn btn-new-lead">
                    Manage Service Types
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="bg-white p-3 rounded shadow-sm card-header mb-4">
              <form onSubmit={handleSubmit}>
                {/* Service Category */}
                <div className="row g-3 mb-3">
                  <div className="col-md-3">
                    <label className="form-label">
                      Service Category <span className="text-danger">*</span>
                    </label>
                    <select
                      name="servicesCategory"
                      value={rows[0].servicesCategory}
                      onChange={(e) => handleChange(0, e)}
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      {categories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.categoryName || cat.serviceCategoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dynamic rows */}
                {rows.map((row, index) => (
                  <div className="row g-3 mb-3 align-items-end" key={index}>
                    <div className="col-md-3">
                      <label className="form-label">
                        Service Type <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="serviceType"
                        value={row.serviceType}
                        onChange={(e) => handleChange(index, e)}
                        className="form-control"
                        placeholder="Enter service type"
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

                    <div className="col-md-2 d-flex align-items-center">
                      <div className="form-check mt-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="isGenderApplicable"
                          checked={row.isGenderApplicable === 1}
                          onChange={(e) =>
                            handleChange(index, {
                              target: { name: "isGenderApplicable", value: e.target.checked ? 1 : 0 },
                            })
                          }
                        />
                        <label className="form-check-label">Gender Applicable</label>
                      </div>
                    </div>

                    {index === rows.length - 1 && (
                      <div className="col-md-2 d-flex align-items-end">
                        <button type="button" className="btn btn-outline-primary me-2" onClick={handleAddRow}>
                          <i className="bi bi-plus-circle"></i>
                        </button>
                        {rows.length > 1 && (
                          <button type="button" className="btn btn-outline-danger py-3" onClick={() => handleRemoveRow(index)}>
                            <i className="bi bi-dash-circle"></i>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Submit & Cancel */}
                <div className="col-md-12 d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-success me-2 px-4">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2 px-4"
                    onClick={() =>
                      setRows([{ servicesCategory: "", serviceType: "", status: "", isGenderApplicable: 0 }])
                    }
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

export default CreateServicesTypes;
