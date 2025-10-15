import React, { useState, useEffect } from "react";
import { fetchWings } from "../../../redux/actions/wingAction";
import { fetchDepartments } from "../../../redux/actions/departmentActions";
import { useDispatch, useSelector } from "react-redux";

const EditRoleModal = ({
  
  showEditModal,
  setShowEditModal,
  selectedRole,
  handleSaveChanges,
}) => {
   const dispatch = useDispatch();
  const [roleTitle, setRoleTitle] = useState("");
  const [wingId, setWingId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [status, setStatus] = useState(true);
  console.log('selectedRole',selectedRole)

   const { wings = [] } = useSelector((state) => state.wings || {});
  const { departments = [] } = useSelector((state) => state.department || {});

    useEffect(() => {
    dispatch(fetchWings());
    dispatch(fetchDepartments());
  }, [dispatch]);


  useEffect(() => {
    if (selectedRole) {
      setRoleTitle(selectedRole.roleTitle || "");
      setWingId(selectedRole.wingId || "");
      setDepartmentId(selectedRole.departmentId || "");
      setStatus(selectedRole.status !== undefined ? selectedRole.status : true);
    }
  }, [selectedRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      handleSaveChanges({
        ...selectedRole,
        roleTitle,
        wingId,
        departmentId,
        status,
      });
    }
  };

  if (!showEditModal) return null;

  return (
    <div
      className="modal right fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-slide">
        <div className="modal-content">
          <div className="modal-header bg-light text-dark">
            <h5 className="modal-title">Edit Role</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowEditModal(false)}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
               <div className="mb-3">
                <label className="form-label">
                  Wing <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={wingId}
                  onChange={(e) => setWingId(e.target.value)}
                >
                  <option value="">Select Wing</option>
                  {wings.map((wing) => (
                    <option key={wing.id} value={wing.id}>
                      {wing.title}
                    </option>
                  ))}
                </select>
              </div>
               <div className="mb-3">
                <label className="form-label">
                  Department <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Role Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status ? "active" : "inactive"}
                  onChange={(e) => setStatus(e.target.value === "active")}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoleModal;
