import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { fetchCategories } from "../../redux/actions/categoryActions";
import { fetchSubServicesByCategory } from "../../redux/actions/subServiceActions";
import { createServiceActivities } from "../../redux/actions/serviceActivityActions";

const CreateServicesActivities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.category.categories || []);
  const subServices = useSelector((state) => state.subServices.subServices || []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [formData, setFormData] = useState({
    serviceCategoryId: "",
    subServiceId: "",
    activities: [
      { activityName: "", price: "", malePrice: "", femalePrice: "", status: 1 },
    ],
  });

  const [genderApplicable, setGenderApplicable] = useState("no");

  const [errors, setErrors] = useState({}); // Store inline error messages

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // ---------- VALIDATION ----------
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.serviceCategoryId) {
      tempErrors.serviceCategoryId = "Please select a service category!";
      isValid = false;
    }

    formData.activities.forEach((activity, index) => {
      if (!activity.activityName.trim()) {
        tempErrors[`activityName${index}`] = "Activity name is required";
        isValid = false;
      }

      if (genderApplicable === "yes") {
        if (activity.malePrice === "" || isNaN(Number(activity.malePrice)) || Number(activity.malePrice) < 0) {
          tempErrors[`malePrice${index}`] = "Male price must be 0 or greater";
          isValid = false;
        }
        if (activity.femalePrice === "" || isNaN(Number(activity.femalePrice)) || Number(activity.femalePrice) < 0) {
          tempErrors[`femalePrice${index}`] = "Female price must be 0 or greater";
          isValid = false;
        }
      } else {
        if (activity.price === "" || isNaN(Number(activity.price)) || Number(activity.price) < 0) {
          tempErrors[`price${index}`] = "Price must be 0 or greater";
          isValid = false;
        }
      }
    });

    setErrors(tempErrors);
    return isValid;
  };

  // ---------- CATEGORY & SUB SERVICE ----------
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, serviceCategoryId: categoryId, subServiceId: "" });
    setGenderApplicable("no");
    if (categoryId) {
      await dispatch(fetchSubServicesByCategory(categoryId));
    }
    setErrors({ ...errors, serviceCategoryId: "" });
  };

  const handleSubServiceChange = (e) => {
    const subServiceId = e.target.value;
    setFormData({ ...formData, subServiceId });

    const selectedSubService = subServices.find(
      (sub) => sub.id === parseInt(subServiceId)
    );
    setGenderApplicable(selectedSubService?.isGenderApplicable ? "yes" : "no");
  };

  // ---------- DYNAMIC ACTIVITIES ----------
  const handleActivityChange = (index, e) => {
    const { name, value } = e.target;
    const updatedActivities = [...formData.activities];
    updatedActivities[index][name] = value;
    setFormData({ ...formData, activities: updatedActivities });

    // Clear error for this field
    setErrors({ ...errors, [`${name}${index}`]: "" });
  };

  const handleAddActivity = () => {
    setFormData({
      ...formData,
      activities: [
        ...formData.activities,
        { activityName: "", price: "", malePrice: "", femalePrice: "", status: 1 },
      ],
    });
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = formData.activities.filter((_, i) => i !== index);
    setFormData({ ...formData, activities: updatedActivities });

    // Remove corresponding errors
    const tempErrors = { ...errors };
    Object.keys(tempErrors).forEach((key) => {
      if (key.includes(`${index}`)) delete tempErrors[key];
    });
    setErrors(tempErrors);
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      ...formData,
      activities: formData.activities.map((a) => ({
        ...a,
        price: Number(a.price),
        malePrice: Number(a.malePrice),
        femalePrice: Number(a.femalePrice),
      })),
      subServiceId: formData.subServiceId || 0,
    };

    try {
      await dispatch(createServiceActivities(payload));
      navigate("/manage-service-activities");
    } catch (error) {
      console.error(error);
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
              <form onSubmit={handleSubmit} noValidate>
                {/* Category */}
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Service Category <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={formData.serviceCategoryId}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                      ))}
                    </select>
                    {errors.serviceCategoryId && <small className="text-danger">{errors.serviceCategoryId}</small>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label"> Service Type </label>
                    <select
                      className="form-select"
                      value={formData.subServiceId}
                      onChange={handleSubServiceChange}
                      disabled={!subServices.length}
                    >
                      <option value="">Select Sub Service (Optional)</option>
                      {subServices.map((sub) => (
                        <option key={sub.id} value={sub.id}>{sub.subServiceName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dynamic Activities */}
                {formData.activities.map((activity, index) => (
                  <div className="row g-3 mb-3 align-items-center" key={index}>
                    <div className="col-md-4">
                      <label className="form-label">Activity Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="activityName"
                        value={activity.activityName}
                        onChange={(e) => handleActivityChange(index, e)}
                        className={`form-control ${errors[`activityName${index}`] ? "is-invalid" : ""}`}
                        placeholder="Enter Activity Name"
                      />
                      {errors[`activityName${index}`] && <small className="text-danger">{errors[`activityName${index}`]}</small>}
                    </div>

                    {genderApplicable === "yes" ? (
                      <>
                        <div className="col-md-2">
                          <label className="form-label">Male Price</label>
                          <input
                            type="number"
                            placeholder="Price"
                            min={0}
                            name="malePrice"
                            value={activity.malePrice}
                            onChange={(e) => handleActivityChange(index, e)}
                            className={`form-control ${errors[`malePrice${index}`] ? "is-invalid" : ""}`}
                          />
                          {errors[`malePrice${index}`] && <small className="text-danger">{errors[`malePrice${index}`]}</small>}
                        </div>

                        <div className="col-md-2">
                          <label className="form-label">Female Price</label>
                          <input
                            type="number"
                            placeholder="Price"
                            min={0}
                            name="femalePrice"
                            value={activity.femalePrice}
                            onChange={(e) => handleActivityChange(index, e)}
                            className={`form-control ${errors[`femalePrice${index}`] ? "is-invalid" : ""}`}
                          />
                          {errors[`femalePrice${index}`] && <small className="text-danger">{errors[`femalePrice${index}`]}</small>}
                        </div>
                      </>
                    ) : (
                      <div className="col-md-2">
                        <label className="form-label">Price</label>
                        <input
                          type="number"
                          placeholder="Price"
                          min={0}
                          name="price"
                          value={activity.price}
                          onChange={(e) => handleActivityChange(index, e)}
                          className={`form-control ${errors[`price${index}`] ? "is-invalid" : ""}`}
                        />
                        {errors[`price${index}`] && <small className="text-danger">{errors[`price${index}`]}</small>}
                      </div>
                    )}

                    <div className="col-md-2">
                      <label className="form-label">Status<span className="text-danger"> *</span></label>
                      <select
                        name="status"
                        value={activity.status}
                        onChange={(e) => handleActivityChange(index, e)}
                        className="form-select"
                      >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </select>
                    </div>

                    <div className="col-md-2 d-flex align-items-center mt-4 gap-2">
                      {index === formData.activities.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary py-2 mt-3"
                          onClick={handleAddActivity}
                        >
                          <i className="bi bi-plus-circle"></i>
                        </button>
                      )}
                      {formData.activities.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger py-2 mt-3"
                          onClick={() => handleRemoveActivity(index)}
                        >
                          <i className="bi bi-dash-circle"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="col-md-12 d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-success me-2 px-4">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => navigate("/manage-service-activities")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateServicesActivities;
