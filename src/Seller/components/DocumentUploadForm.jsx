import React, { useState } from "react";
import { toast } from "react-toastify";


const DocumentUploadForm = ({ documents = [], onUpload }) => {
    // Group documents by their category
    const groupedDocs = documents.reduce((acc, doc) => {
        const category = doc.documentCategoryTitle;
        if (!acc[category]) acc[category] = [];
        acc[category].push(doc);
        return acc;
    }, {});

    const [selectedFiles, setSelectedFiles] = useState({});

    const handleFileChange = (e, docTypeId) => {
        const file = e.target.files[0];
        setSelectedFiles((prev) => ({ ...prev, [docTypeId]: file }));
    };

    const handleSubmit = (e, doc) => {
        e.preventDefault();
        const file = selectedFiles[doc.documentTypeId];
        if (!file) {
            toast.warn("Please select a file to upload");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", doc.id); // append document id
        onUpload(formData, doc);
    };

    return (
        <div className="tab-pane active">
            <h5>Documents</h5>
            {Object.entries(groupedDocs).map(([category, docs]) => (
                <div key={category} className="mt-4">
                    <h6 className="text-success">{category}</h6>
                    <div className="ms-3">
                        {docs.map((doc) => (
                            <form
                                key={doc.id}
                                onSubmit={(e) => handleSubmit(e, doc)}
                                className="border rounded p-3 mb-3"
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="flex-grow-1">
                                        <label htmlFor={`file-${doc.id}`} className="fw-semibold">
                                            {doc.documentType}
                                        </label>

                                        {doc.file ? (
                                            <p className="text-success mt-2">
                                                Uploaded:{" "}
                                                <a href={doc.file} target="_blank" rel="noopener noreferrer">
                                                    View File
                                                </a>
                                            </p>
                                        ) : (
                                            <input
                                                type="file"
                                                id={`file-${doc.id}`}
                                                className="form-control mt-2"
                                                onChange={(e) => handleFileChange(e, doc.documentTypeId)}
                                            />
                                        )}
                                    </div>

                                    {!doc.file && (
                                        <div className="ms-3">
                                            <button type="submit" className="btn btn-success">
                                                Upload
                                            </button>
                                        </div>
                                    )}


                                </div>
                            </form>
                        ))}

                    </div>
                </div>
            ))}
            <div className="col-lg-12 text-center mt-4">
                <button
                    type="submit"
                    className="btn btn-success px-5 me-2"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};


export default DocumentUploadForm;
