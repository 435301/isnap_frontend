import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubServicesByCategory } from "../../../redux/actions/subServiceActions";
import { fetchCategories } from "../../../redux/actions/categoryActions";

const EditServiceActivityOffcanvas = ({ show, handleClose, activity, onSave }) => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories || []);
  const subServices = useSelector((state) => state.subServices.subServices || []);

  const [formData, setFormData] = useState({
    serviceCategoryId: "",
    subServiceId: "",
    activities: [{ id: null, activityName: "", status: 1 }],
    price: 0,
    malePrice: 0,
    femalePrice: 0,
  });

  const [genderApplicable, setGenderApplicable] = useState("no");
  const [errors, setErrors] = useState({});

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Load form data when activity changes
  useEffect(() => {
    if (activity && show) {
      setFormData({
        serviceCategoryId: activity.serviceCategoryId || "",
        subServiceId: activity.subServiceId || "",
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
        (s) => s.id === parseInt(formData.subServiceId)
      );
      setGenderApplicable(selectedSubService?.isGenderApplicable ? "yes" : "no");
    }
  }, [formData.subServiceId, subServices]);

  // Category change
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData({
      ...formData,
      serviceCategoryId: categoryId,
      subServiceId: "",
    });
    setGenderApplicable("no");
    setErrors((prev) => ({ ...prev, serviceCategoryId: "", subServiceId: "" }));

    if (categoryId) {
      await dispatch(fetchSubServicesByCategory(categoryId));
    }
  };

  // Sub-service change
  const handleSubServiceChange = (e) => {
    const subServiceId = e.target.value;
    setFormData({ ...formData, subServiceId });
    setErrors((prev) => ({ ...prev, subServiceId: "" }));

    const selectedSubService = subServices.find(
      (s) => s.id === parseInt(subServiceId)
    );
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
    setErrors((prev) => ({ ...prev, [`activityName${index}`]: "" }));
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
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`activityName${index}`];
      return newErrors;
    });
  };

  // Price change
  const handlePriceChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value === "" ? 0 : parseInt(value),
    });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.serviceCategoryId) {
      validationErrors.serviceCategoryId = "Service category is required";
    }
    if (!formData.subServiceId) {
      validationErrors.subServiceId = "Sub-service is required";
    }
    if (!formData.activities.length || !formData.activities[0].activityName.trim()) {
      validationErrors.activityName0 = "At least one activity name is required";
    }
    if (genderApplicable === "yes") {
      if (!formData.malePrice || Number(formData.malePrice) <= 0) {
        validationErrors.malePrice = "Male price must be a positive number";
      }
      if (!formData.femalePrice || Number(formData.femalePrice) <= 0) {
        validationErrors.femalePrice = "Female price must be a positive number";
      }
    } else {
      if (!formData.price || Number(formData.price) <= 0) {
        validationErrors.price = "Price must be a positive number";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
      await onSave(payload);
      handleClose(); // Close only on success
    } catch (error) {
      setErrors({ server: error.message || "Failed to save changes" });
    }
  };

  if (!activity) return null;

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" backdrop={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Service Activity</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          {/* Server Error */}
          {errors.server && (
            <div className="alert alert-danger" role="alert">
              {errors.server}
            </div>
          )}

          {/* Service Category */}
          <Form.Group className="mb-3">
            <Form.Label>
              Service Category <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={formData.serviceCategoryId || ""}
              onChange={handleCategoryChange}
              isInvalid={!!errors.serviceCategoryId}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.serviceCategoryId}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Sub Service */}
          <Form.Group className="mb-3">
            <Form.Label>
              Service Type <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={formData.subServiceId}
              onChange={handleSubServiceChange}
              disabled={!subServices.length}
              isInvalid={!!errors.subServiceId}
              required
            >
              <option value="">Select Sub Service</option>
              {subServices.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.subServiceName}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.subServiceId}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Price Fields */}
          {genderApplicable === "yes" ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>
                  Male Price <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={formData.malePrice}
                  onChange={(e) => handlePriceChange("malePrice", e.target.value)}
                  isInvalid={!!errors.malePrice}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.malePrice}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  Female Price <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={formData.femalePrice}
                  onChange={(e) => handlePriceChange("femalePrice", e.target.value)}
                  isInvalid={!!errors.femalePrice}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.femalePrice}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          ) : (
            <Form.Group className="mb-3">
              <Form.Label>
                Price <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={formData.price}
                onChange={(e) => handlePriceChange("price", e.target.value)}
                isInvalid={!!errors.price}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          {/* Dynamic Activities */}
          {formData.activities.map((act, index) => (
            <div className="row g-3 mb-3" key={index}>
              <div className="col-md-7">
                <Form.Label>
                  Activity Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="activityName"
                  value={act.activityName}
                  onChange={(e) => handleActivityChange(index, e)}
                  isInvalid={!!errors[`activityName${index}`]}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors[`activityName${index}`]}
                </Form.Control.Feedback>
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
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={handleAddActivity}
                >
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

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <Button variant="light" className="me-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditServiceActivityOffcanvas;