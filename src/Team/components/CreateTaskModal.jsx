import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createTask } from "../../redux/actions/taskAction";
import { fetchServiceTypes } from "../../redux/actions/serviceTypeActions";
import formatDate from "../../components/FormatDate";

const CreateTaskModal = ({ show, onClose }) => {
    const dispatch = useDispatch();
    const serviceType = useSelector((state) => state.serviceType.serviceTypes || []);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchServiceTypes());
    }, [dispatch]);

    const [createTaskForm, setCreateTaskForm] = useState({
        serviceTypeId: "",
        // sellerId: "",
        fromDate: "",
        toDate: "",
        priority: "",
        description: "",
    });

    if (!show) return null;

    const validate = () => {
        const newErrors = {};
        if (!createTaskForm.description.trim()) newErrors.description = "Description is required";
        if (!createTaskForm.fromDate) newErrors.fromDate = "From Date is required";
        if (!createTaskForm.toDate) newErrors.toDate = "To Date is required";
        if (!createTaskForm.serviceTypeId) newErrors.serviceTypeId = "Service Type is required";
        if (!createTaskForm.priority) newErrors.priority = "Priority is required";

        return newErrors;
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        const payload = {
            ...createTaskForm,
            serviceTypeId: Number(createTaskForm.serviceTypeId),
            sellerId: Number(createTaskForm.sellerId || 0),
            priority: Number(createTaskForm.priority),
            fromDate: formatDate(createTaskForm.fromDate),
            toDate: formatDate(createTaskForm.toDate)
        };

        dispatch(createTask(payload));
        onClose();
        setCreateTaskForm({
            serviceTypeId: "",
            fromDate: "",
            toDate: "",
            priority: "",
            description: "",
        })
        setErrors({});
    };

    const handleClose = () => {
        setErrors({});
        setCreateTaskForm({
            serviceTypeId: "",
            fromDate: "",
            toDate: "",
            priority: "",
            description: "",
        });
        onClose();
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreateTaskForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="md">
            <Modal.Header closeButton>
                <Modal.Title>Create Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Service */}
                <label className="form-label">Services<span className="text-danger"> *</span></label>
                <select
                    value={createTaskForm.serviceTypeId}
                    onChange={handleChange}
                    name="serviceTypeId"
                    className={`form-select mb-2 ${errors.serviceTypeId ? "is-invalid" : ""}`}
                >
                    <option value="">Select Service Type</option>
                    {serviceType.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.serviceType}
                        </option>
                    ))}
                </select>
                {errors.serviceTypeId && (
                    <div className="invalid-feedback">{errors.serviceTypeId}</div>
                )}

                {/* Seller */}
                {/* <select
                    className="form-select mb-2"
                    value={createTaskForm.sellerId}
                    onChange={(e) =>
                        setCreateTaskForm({ ...createTaskForm, sellerId: e.target.value })
                    }
                >
                    <option value="">Select Seller</option>
                   
                </select> */}

                {/* Description */}
                <label className="form-label">Description<span className="text-danger"> *</span></label>
                <textarea
                    className={`form-select mb-2 ${errors.description ? "is-invalid" : ""}`}
                    placeholder="Service details / description"
                    rows={3}
                    value={createTaskForm.description}
                    onChange={handleChange}
                    name="description"
                />
                {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                )}

                {/* Dates */}
                <label className="form-label">Date<span className="text-danger"> *</span></label>
                <div className="d-flex gap-2 mb-2">
                    <div className="col">
                        <input
                            type="date"
                            className={`form-select ${errors.fromDate ? "is-invalid" : ""}`}
                            value={createTaskForm.fromDate}
                            onChange={handleChange}
                            name="fromDate"
                        />
                        {errors.fromDate && (
                            <div className="invalid-feedback">{errors.fromDate}</div>
                        )}
                    </div>
                    <div className="col">
                        <input
                            type="date"
                            className={`form-select ${errors.toDate ? "is-invalid" : ""}`}
                            value={createTaskForm.toDate}
                            onChange={handleChange}
                            name="toDate"
                        />

                        {errors.toDate && (
                            <div className="invalid-feedback">{errors.toDate}</div>
                        )}
                    </div>
                </div>

                {/* Priority */}
                <label className="form-label">Priority<span className="text-danger"> *</span></label>
                <select
                    className={`form-select mb-2 ${errors.priority ? "is-invalid" : ""}`}
                    value={createTaskForm.priority}
                    onChange={handleChange}
                    name="priority"
                >
                    <option value="">Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
                {errors.priority && (
                    <div className="invalid-feedback">{errors.priority}</div>
                )}
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-light" onClick={handleClose}>
                    Cancel
                </button>
                <button className="btn btn-success" onClick={handleCreate}>
                    Create
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTaskModal;
