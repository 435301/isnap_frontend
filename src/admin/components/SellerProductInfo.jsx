import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { CLEAR_SELLER_PRODUCT_INFO, fetchBusinessDocumentsSellerInfo, uploadSellerProductInfo } from "../../redux/actions/businessActions";
import { toast } from "react-toastify";
import BASE_URL from "../../config/config";

const SellerProductUpload = ({ businessId, businessIdEdit}) => {
    console.log('businessId in SellerProductUpload:', businessId);
  const dispatch = useDispatch();
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
    // EDIT MODE: fetch existing uploaded files
    dispatch(fetchBusinessDocumentsSellerInfo(businessIdEdit));
  } else {
    // CREATE MODE: clear old files so we don't see leftover data
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
  const handleSubmit = (e) => {
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

        <div className="container-fluid px-4 pt-3">
          <div className="bg-white p-3 mb-3 d-flex justify-content-between align-items-center">
            <h5 className="m-0">Upload Product Info</h5>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            {!businessIdEdit && (
            <form onSubmit={handleSubmit}>
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
              <div className="text-start">
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
            <div className="mt-4">
              <h6 className="fw-bold mb-3">Uploaded Product Files</h6>
              {sellerProductInfo && sellerProductInfo.length > 0 ? (
                <div className="row g-3">
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
          </div>
        </div>
    
  );
};

export default SellerProductUpload;
