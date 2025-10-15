import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubServicesByCategory } from "../../../redux/actions/subServiceActions";
import { fetchCategories } from "../../../redux/actions/categoryActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditServiceActivityOffcanvas = ({ show, handleClose, activity, onSave }) => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories || []);
  const subServices = useSelector((state) => state.subServices.subServices || []);
  const serviceActivityState = useSelector((state) => state.serviceActivity || {});

  const [formData, setFormData] = useState({
    serviceCategoryId: 0, // default 0
    subServiceId: 0,      // default 0
    activities: [{ id: null, activityName: "", status: 1 }],
    price: 0,
    malePrice: 0,
    femalePrice: 0,
  });

  const [genderApplicable, setGenderApplicable] = useState("no");

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Load form data when activity changes
  useEffect(() => {
    if (activity && show) {
      setFormData({
        serviceCategoryId: activity.serviceCategoryId || 0,
        subServiceId: activity.subServiceId || 0,
        activities: activity.activities?.length
          ? activity.activities.map((a) => ({
              id: a.id || null,
              activityName: a.activityName,
              status: a.status ?? 1,
            }))
          : [
              {
                id: activity.id || null,
                activityName: activity.activityName || "",
                status: activity.status ?? 1,
              },
            ],
        price: activity.price || 0,
        malePrice: activity.malePrice || 0,
        femalePrice: activity.femalePrice || 0,
      });

      if (activity.serviceCategoryId) {
        dispatch(fetchSubServicesByCategory(activity.serviceCategoryId));
      }
    }
  }, [activity, show, dispatch]);

  // Set gender applicable after sub-services loaded
  useEffect(() => {
    if (formData.subServiceId && subServices.length) {
      const selectedSubService = subServices.find(
        (s) => s.id === formData.subServiceId
      );
      setGenderApplicable(selectedSubService?.isGenderApplicable ? "yes" : "no");
    }
  }, [formData.subServiceId, subServices]);

  // Watch Redux state for success/error messages
  useEffect(() => {
    if (serviceActivityState.success) {
      toast.success("Changes saved successfully!");
      handleClose();
      dispatch({ type: "RESET_SERVICE_ACTIVITY_STATE" });
    }
    if (serviceActivityState.error) {
      toast.error(serviceActivityState.error);
      dispatch({ type: "RESET_SERVICE_ACTIVITY_STATE" });
    }
  }, [serviceActivityState.success, serviceActivityState.error, handleClose, dispatch]);

  // Category change
  const handleCategoryChange = async (e) => {
    const value = e.target.value ? parseInt(e.target.value) : 0;
    setFormData({
      ...formData,
      serviceCategoryId: value,
      subServiceId: 0, // reset to 0
    });
    setGenderApplicable("no");

    if (value) {
      await dispatch(fetchSubServicesByCategory(value));
    }
  };

  // Sub-service change
  const handleSubServiceChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : 0;
    setFormData({ ...formData, subServiceId: value });

    const selectedSubService = subServices.find((s) => s.id === value);
    setGenderApplicable(selectedSubService?.isGenderApplicable ? "yes" : "no");
  };

  // Activity change
  const handleActivityChange = (index, e) => {
    const { name, value } = e.target;
    const updatedActivities = [...formData.activities];
    if (updatedActivities[index]) {
      updatedActivities[index][name] = name === "status" ? parseInt(value) : value;
    }
    setFormData({ ...formData, activities: updatedActivities });
  };

  // Add/Remove activities
  const handleAddActivity = () => {
    setFormData({
      ...formData,
      activities: [...formData.activities, { id: null, activityName: "", status: 1 }],
    });
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = formData.activities.filter((_, i) => i !== index);
    setFormData({ ...formData, activities: updatedActivities });
  };

  // Price change
  const handlePriceChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value === "" ? 0 : parseInt(value),
    });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.serviceCategoryId === 0) {
      toast.error("Please select a service category!");
      return;
    }

   
    if (!formData.activities.length || !formData.activities[0].activityName.trim()) {
      toast.error("Please provide at least one activity name!");
      return;
    }

    const firstActivity = formData.activities[0];
    const payload = {
      id: activity.id,
      serviceCategoryId: formData.serviceCategoryId,
      subServiceId: formData.subServiceId,
      activityName: firstActivity.activityName,
      status: firstActivity.status,
      price: formData.price || 0,
      malePrice: formData.malePrice || 0,
      femalePrice: formData.femalePrice || 0,
    };

    try {
      const saveToastId = toast.info("Saving changes...", { autoClose: false });
      await onSave(payload);
      toast.dismiss(saveToastId);
      toast.success("Changes saved successfully!");
      handleClose();
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to save changes: " + (error.message || "Unknown error"));
    }
  };

  if (!activity) return null;

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Service Activity</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            {/* Service Category */}
            <Form.Group className="mb-3">
              <Form.Label>Service Category</Form.Label>
              <Form.Select
                value={formData.serviceCategoryId.toString()}
                onChange={handleCategoryChange}
              >
                <option value="0">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Sub Service */}
            <Form.Group className="mb-3">
              <Form.Label>Service Type</Form.Label>
              <Form.Select
                value={formData.subServiceId.toString()}
                onChange={handleSubServiceChange}
                disabled={!subServices.length}
              >
                <option value="0">Select Sub Service</option>
                {subServices.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.subServiceName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Price Fields */}
            {genderApplicable === "yes" ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Male Price</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    value={formData.malePrice}
                    onChange={(e) => handlePriceChange("malePrice", e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Female Price</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    value={formData.femalePrice}
                    onChange={(e) => handlePriceChange("femalePrice", e.target.value)}
                    required
                  />
                </Form.Group>
              </>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={formData.price}
                  onChange={(e) => handlePriceChange("price", e.target.value)}
                  required
                />
              </Form.Group>
            )}

            {/* Dynamic Activities */}
            {formData.activities.map((act, index) => (
              <div className="row g-3 mb-3" key={index}>
                <div className="col-md-7">
                  <Form.Label>Activity Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="activityName"
                    value={act.activityName}
                    onChange={(e) => handleActivityChange(index, e)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={act.status}
                    onChange={(e) => handleActivityChange(index, e)}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </Form.Select>
                </div>
                <div className="col-md-2 d-flex align-items-end gap-2">
                  <Button size="sm" variant="outline-primary" onClick={handleAddActivity}>
                    <i className="bi bi-plus-circle"></i>
                  </Button>
                  {formData.activities.length > 1 && (
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleRemoveActivity(index)}
                    >
                      <i className="bi bi-dash-circle"></i>
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" variant="success" className="me-2">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{ zIndex: 1060 }}
      />
    </>
  );
};

export default EditServiceActivityOffcanvas;
