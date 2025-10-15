import React, { useState } from "react";

const Documents = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("fileUpload", selectedFile);

    try {
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setUploadMessage("File uploaded successfully!");
        setSelectedFile(null);
      } else {
        setUploadMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setUploadMessage("An error occurred during upload.");
    }
  };

  return (
    <>
      <h5>Documents</h5>

      <div className="">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th className="fw-bold">Document Category</th>
              <th className="fw-bold">Document Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input id="service-0" className="me-2" type="checkbox" value="Fkipcard" name="service-0" />
                <label htmlFor="service-0">Flipkart</label>
              </td>
              <td>Flipkart</td>
            </tr>
            <tr>
              <td>
                <input id="service-1" className="me-2" type="checkbox" value="Amzon" name="service-1" />
                <label htmlFor="service-1">Amzon</label>
              </td>
              <td>Flipkart</td>
            </tr>
            <tr>
              <td>
                <input id="service-2" className="me-2" type="checkbox" value="Flipkart" name="service-2" />
                <label htmlFor="service-2">Flipkart</label>
              </td>
              <td>Flipkart</td>
            </tr>
          </tbody>
        </table>

       
      </div>

      {uploadMessage && <p className="mt-2">{uploadMessage}</p>}
    </>
  );
};

export default Documents;
