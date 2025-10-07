import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../redux/actions/roleActions";
import { deleteLatestUpdateFile, fetchLatestUpdateById, fetchLatestUpdates, updateLatestUpdate } from "../../redux/actions/latestUpdatesAction";
import "../assets/admin/css/style.css";


const EditTeamLatestUpdates = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const BASE_URL = "http://143.110.244.33:8080/"

    const { loading, selectedUpdate } = useSelector(
        (state) => state.latestUpdates
    );
    console.log("selectedUpdate from Redux:", selectedUpdate);
    const { roles = [] } = useSelector((state) => state.roles || {});

    const [formData, setFormData] = useState({
        team: "All",
        title: "",
        description: "",
        images: [],
        existingImages: [],
        files: [],
        existingFiles: [],
        urls: [{ url: "" }],
    });

    const imageRef = useRef(null);
    const fileRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Sidebar responsive toggle
    useEffect(() => {
        const handleResize = () => setIsSidebarOpen(window.innerWidth >= 992);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    // Fetch roles and existing update
    useEffect(() => {
        if (id) {
            console.log("Fetching latest update for ID:", id);
            dispatch(fetchLatestUpdateById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedUpdate) {
            const existingImages = selectedUpdate.files
                ?.filter(f => f.fileType === 1)
                ?.map(f => ({ id: f.id, url: BASE_URL + f.file })) || [];

            const existingFiles = selectedUpdate.files
                ?.filter(f => f.fileType === 2)
                ?.map(f => ({ id: f.id, url: BASE_URL + f.file, name: f.file.split("/").pop() })) || [];

            const urlFiles = selectedUpdate.files
                ?.filter(f => f.fileType === 3)
                ?.map(f => ({ id: f.id, url: f.file })) || [];

            setFormData({
                team: selectedUpdate.roleId === 0 ? "All" : selectedUpdate.roleId?.toString(),
                title: selectedUpdate.title || "",
                description: selectedUpdate.description || "",
                images: [],
                existingImages,
                files: [],
                existingFiles,
                urls: urlFiles.length > 0 ? urlFiles : [{ url: "" }],
            });
        }
    }, [selectedUpdate]);


    const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name.startsWith("url")) {
            const index = parseInt(name.split("-")[1], 10);
            const newUrls = [...formData.urls];
            newUrls[index] = { ...newUrls[index], url: value };
            setFormData(prev => ({ ...prev, urls: newUrls }));
            setErrors(prev => ({ ...prev, [`url-${index}`]: "" }));
        }
        else if (name === "images") {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...Array.from(files)], // append multiple
            }));
        }
        else if (name === "files") {
            setFormData(prev => ({
                ...prev,
                files: [...prev.files, ...Array.from(files)], // append multiple
            }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };


    // Add URL
    const addUrlField = () => {
        setFormData((prev) => ({
            ...prev,
            urls: [...prev.urls, ""],
        }));
    };

    // Remove URL
    const removeUrlField = (index) => {
        const urlToRemove = formData.urls[index];

        // Check if this URL exists in the backend
        const existingFile = selectedUpdate?.files?.find(
            (f) => f.fileType === 3 && f.file === urlToRemove
        );

        if (existingFile) {
            if (window.confirm("Are you sure you want to delete this URL?")) {
                handleDeleteFile(existingFile.id); // Call API
            }
        }

        // Remove from local state
        const newUrls = formData.urls.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            urls: newUrls.length ? newUrls : [""],
        }));

        // Remove any error for that field
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[`url-${index}`];
            return newErrors;
        });
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.description.trim())
            newErrors.description = "Description is required";
        if (!formData.images || formData.images.length === 0) newErrors.images = 'At least one image is required';
        if (!formData.files || formData.files.length === 0) newErrors.files = 'At least one file is required';
        formData.urls.forEach((url, idx) => {
            if (!url.trim()) {
                newErrors[`url-${idx}`] = 'URL is required';
            } else {
                try {
                    new URL(url);
                } catch {
                    newErrors[`url-${idx}`] = 'Invalid URL';
                }
            }
        });

        return newErrors;
    };

    // Submit update
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const apiData = new FormData();
            apiData.append("roleId", formData.team === "All" ? 0 : formData.team);
            apiData.append("title", formData.title);
            apiData.append("description", formData.description);
            formData.images.forEach(img => apiData.append("images", img));
            formData.files.forEach(file => apiData.append("pdfs", file));
            const urlsPayload = formData.urls.map(u => ({
                ...(u.id && { id: u.id }),
                url: /^(http|https):\/\//i.test(u.url.trim())
                    ? u.url.trim()
                    : `https://${u.url.trim()}`,
            }));
            apiData.append("urls", JSON.stringify(urlsPayload));
            apiData.append("status", 1);

            dispatch(updateLatestUpdate(id, apiData));
            navigate("/manage-updates");
        }
    };


    const handleDeleteFile = (fileId) => {
        dispatch(deleteLatestUpdateFile(fileId));
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
                                <div className="col-lg-4">
                                    <h5 className="form-title m-0">Edit Team Latest Update</h5>
                                </div>
                                <div className="col-lg-8 text-end">
                                    <Link to="/manage-updates" className="btn btn-new-lead">
                                        Manage Updates
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

                                    {/* Team */}
                                    <div className="col-md-4">
                                        <label className="form-label">Team <span className="text-danger">*</span></label>
                                        <select
                                            name="team"
                                            value={formData.team}
                                            onChange={handleChange}
                                            className={`form-select ${errors.team ? 'is-invalid' : ''}`}
                                        >
                                            <option value="All">All</option>
                                            {roles.map((role) => (
                                                <option keys={role?.id} value={role?.id}>
                                                    {role?.roleTitle}
                                                </option>
                                            ))}

                                        </select>
                                        {errors.team && <div className="invalid-feedback">{errors.team}</div>}
                                    </div>

                                    {/* Title */}
                                    <div className="col-md-4">
                                        <label className="form-label">Title <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                            placeholder="Title"
                                        />
                                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                    </div>

                                    {/* Description */}
                                    <div className="col-md-8">
                                        <label className="form-label">Description <span className="text-danger">*</span></label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                            placeholder="Description"
                                        />
                                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                    </div>

                                    <div className="col-md-4"></div>

                                    {/* Upload Image */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Upload Images <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            ref={imageRef}
                                            type="file"
                                            name="images"
                                            accept="image/*"
                                            multiple
                                            onChange={handleChange}
                                            className={`form-control ${errors.images ? 'is-invalid' : ''}`}
                                        />
                                        {errors.images && <div className="invalid-feedback">{errors.images}</div>}

                                        {/* Preview new images */}
                                        <div className="mt-2 d-flex flex-wrap gap-2">
                                            {formData.images.map((img, idx) => (
                                                <div key={idx} className="position-relative">
                                                    <img
                                                        src={URL.createObjectURL(img)}
                                                        alt={`Preview-${idx}`}
                                                        className="img-preview-edit"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Existing Images */}
                                        {formData.existingImages.length > 0 && (
                                            <div className="mt-3 d-flex flex-wrap gap-2">
                                                {formData.existingImages.map(img => (
                                                    <div key={img.id} className="position-relative">
                                                        <img
                                                            src={img.url}
                                                            alt="Existing"
                                                            className="img-preview-edit"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                            onClick={() => handleDeleteFile(img.id)}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Upload File */}
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Upload Files <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            name="files"
                                            multiple
                                            onChange={handleChange}
                                            className={`form-control ${errors.files ? 'is-invalid' : ''}`}
                                        />
                                        {errors.files && <div className="invalid-feedback">{errors.files}</div>}

                                        {/* New files */}
                                        <ul className="mt-2">
                                            {formData.files.map((file, idx) => (
                                                <li key={idx}>
                                                    {file.name}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Existing files */}
                                        <ul className="mt-2">
                                            {formData.existingFiles.map(file => (
                                                <li key={file.id}>
                                                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                                                        {file.name}
                                                    </a>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm ms-2 mb-2"
                                                        onClick={() => handleDeleteFile(file.id)}
                                                    >
                                                        x
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-md-8 d-flex flex-column gap-3">
                                        {formData.urls.map((url, index) => (
                                            <div key={index} className="d-flex align-items-end gap-2 url" >
                                                <div className="flex-grow-1">
                                                    <label className="form-label">
                                                        URL <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="url"
                                                        name={`url-${index}`}
                                                        value={url.url || ""}
                                                        onChange={handleChange}
                                                        className={`form-control ${errors[`url-${index}`] ? 'is-invalid' : ''}`}
                                                        placeholder="Enter URL"
                                                    />
                                                    {errors[`url-${index}`] && (
                                                        <div className="invalid-feedback d-block">{errors[`url-${index}`]}</div>
                                                    )}
                                                </div>

                                                {index !== 0 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger mb-2"
                                                        onClick={() => removeUrlField(index)}
                                                        title="Remove URL"
                                                    >
                                                        <i className="bi bi-x-lg"></i>
                                                    </button>
                                                )}

                                                {/* Add URL button only next to the last input */}
                                                {index === formData.urls.length - 1 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary mb-2"
                                                        onClick={addUrlField}
                                                    >
                                                        <i className="bi bi-plus-lg"></i> Add URL
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Buttons */}
                                    <div className="col-md-12 d-flex justify-content-end mt-4">
                                        <button type="submit" className="btn btn-success px-4 me-2" disabled={loading}>  {loading ? "Updating..." : "Update"}</button>
                                        <button type="button" className="btn btn-outline-secondary px-4" onClick={() =>
                                            setFormData({
                                                team: "All",
                                                title: "",
                                                description: "",
                                                image: null,
                                                file: null,
                                                urls: [""],
                                            })
                                        }>Cancel</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTeamLatestUpdates;
