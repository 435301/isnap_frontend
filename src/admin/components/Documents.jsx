import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequiredDocuments, deleteRequiredDocuments, fetchBusinessDocuments, updateRequiredDocuments } from "../../redux/actions/businessActions";
import { fetchDocuments } from "../../redux/actions/docTypeAction";
import { approveMailToSeller, mailToSalesManager } from "../../redux/actions/emailAction";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";
import { CLEAR_SELLER_PRODUCT_INFO, fetchBusinessDocumentsSellerInfo, uploadSellerProductInfo } from "../../redux/actions/businessActions";
import { toast } from "react-toastify";
import BASE_URL from "../../config/config";

const Documents = ({ businessId, businessIdEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documents } = useSelector((state) => state.documents);
  const { categories } = useSelector((state) => state.categories);
  console.log('businessIdEdit', categories)
  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log('selectedCategories', selectedCategories)
  const [toDelete, setToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  useEffect(() => {
    if (businessIdEdit) {
      dispatch(fetchBusinessDocuments(businessIdEdit));
    }
  }, [dispatch, businessIdEdit]);

  //  Pre-fill checkboxes for edit mode
  useEffect(() => {
    if (categories?.length && businessIdEdit) {
      const checkedIds = categories
        .filter((c) => c.isChecked)
        .map((c) => c.documentCategoryId);
      setSelectedCategories(checkedIds);
    }
  }, [categories, businessIdEdit]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };


  const groupedDocs = documents.reduce((acc, doc) => {
    const catId = doc.documentCategoryId;
    if (!acc[catId]) {
      acc[catId] = {
        categoryTitle: doc.documentCategoryTitle,
        docs: [],
      };
    }
    acc[catId].docs.push(doc);
    return acc;
  }, {});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      businessId: businessIdEdit || businessId,
      requiredDocumentCategoryIds: selectedCategories,
    };

    try {
      if (businessIdEdit) {
        // EDIT MODE → Update existing required documents
        const res = await dispatch(
          updateRequiredDocuments(payload)
        );
      } else {
        // CREATE MODE → Add new required documents
        const res = await dispatch(addRequiredDocuments(payload));
        if (res?.status) {
          setSelectedCategories([]);
        }
      }
    } catch (err) {
      console.error("Error saving documents:", err);
    }

  };

  const handleCreateSeller = () => {
    const res = dispatch(mailToSalesManager(businessId));
    if (res.status === true) {
      navigate('/executive/manage-seller');
    };
  };

  const handleDeleteClick = (id) => {
    setToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async (categoryId) => {
    await dispatch(deleteRequiredDocuments(businessIdEdit, categoryId));
    setShowDeleteModal(false);
    setToDelete(null);
  };


  //seller product info section
  const { loading, sellerProductInfo } = useSelector(
    (state) => state.sellerProductInfo
  );
  console.log('sellerProductInfo in SellerProductUpload:', sellerProductInfo);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [link, setLink] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideo, setPreviewVideo] = useState(null);

  useEffect(() => {
    if (businessIdEdit) {
      dispatch(fetchBusinessDocumentsSellerInfo(businessIdEdit));
    } else {
      dispatch({ type: CLEAR_SELLER_PRODUCT_INFO });
    }
  }, [dispatch, businessIdEdit]);

  // Handle Image Change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle Video Change
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) setPreviewVideo(URL.createObjectURL(file));
  };

  // Handle Submit
  const handleSubmitSellerInfo = (e) => {
    e.preventDefault();
    if (images.length === 0 && !video && !link) {
      toast.warn("Please add at least one image, video, or link!");
      return;
    }

    const formData = new FormData();
    formData.append("businessId", businessId);
    images.forEach((img) => formData.append("images", img));
    if (video) formData.append("video", video);
    if (link) formData.append("link", link);

    dispatch(uploadSellerProductInfo(formData));
  };

  return (
    <>
      <h5>Documents<span className="text-danger"> *</span></h5>

      <form onSubmit={handleSubmit}>
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th className="fw-bold">Document Category</th>
              <th className="fw-bold">Document Type</th>
              {businessIdEdit && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedDocs).map(([categoryId, data]) => {
              const docs = data.docs;
              const rowSpan = docs.length;

              return docs.map((doc, index) => (
                <tr key={doc.id}>
                  {index === 0 && (
                    <td rowSpan={rowSpan} className="align-middle">
                      <input
                        id={`cat-${categoryId}`}
                        type="checkbox"
                        className="me-2"
                        checked={selectedCategories.includes(Number(categoryId))}
                        onChange={() => handleCategoryChange(Number(categoryId))}
                      />
                      <label
                        htmlFor={`cat-${categoryId}`}
                        className="fw-semibold"
                      >
                        {data.categoryTitle}
                      </label>
                    </td>
                  )}

                  <td>{doc.documentType}</td>
                  {businessIdEdit && index === 0 && (
                    <td rowSpan={rowSpan}>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteClick(Number(categoryId))}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  )}

                </tr>
              ));
            })}
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            {businessIdEdit ? "Update Required Documents" : "Save Required Documents"}
          </button>
        </div>
      </form>

      <h5 >Upload Product Info</h5>
      <div className="bg-white p-4 rounded shadow-sm mb-5">
        {!businessIdEdit && (
          <form onSubmit={handleSubmitSellerInfo}>
            {/* Images Upload */}
            <div className="mb-3">
              <label className="form-label fw-bold">Upload Images</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <div className="d-flex flex-wrap mt-3 gap-3">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="Preview"
                    className="rounded shadow-sm"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Video Upload */}
            <div className="mb-3">
              <label className="form-label fw-bold">Upload Video</label>
              <input
                type="file"
                className="form-control"
                accept="video/*"
                onChange={handleVideoChange}
              />
              {previewVideo && (
                <video
                  controls
                  src={previewVideo}
                  className="mt-3 rounded shadow-sm"
                  style={{ width: "300px", height: "200px" }}
                />
              )}
            </div>

            {/* Link Input */}
            <div className="mb-3">
              <label className="form-label fw-bold">Product Link</label>
              <input
                type="url"
                className="form-control"
                placeholder="https://example.com/product"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="text-end">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload Info"}
              </button>
            </div>
          </form>
        )}

        {/* Display Uploaded Info */}
        {businessIdEdit && (
            <div className="mt-4">
          <h6 className="fw-bold mb-3">Uploaded Product Files</h6>
          {businessIdEdit && sellerProductInfo && sellerProductInfo.length > 0 ? (
            <div className="row g-3 products">
              {sellerProductInfo.map((item) => (
                <div className="col-md-3" key={item.id}>
                  <div className="card shadow-sm p-2 text-center">
                    {item.fileType === 1 && (
                      <img
                        src={`${BASE_URL}${item.file}`}
                        alt="product"
                        className="img-fluid rounded"
                      />
                    )}
                    {item.fileType === 2 && (
                      <video
                        controls
                        src={`${BASE_URL}${item.file}`}
                        className="img-fluid rounded"
                      />
                    )}
                    {item.fileType === 3 && (
                      <a
                        href={item.file}
                        target="_blank"
                        rel="noreferrer"
                        className="text-success"
                      >
                        {item.file}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No product info uploaded yet.</p>
          )}
        </div>
        )}
      
      </div>
      {!businessIdEdit && (
        <div className=" text-center">
          <button type="submit" className="btn btn-success" onClick={handleCreateSeller}>
            Create Seller
          </button>
        </div>
      )}
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={() => handleDelete(toDelete)}
      />


    </>
  );
};


export default Documents;
