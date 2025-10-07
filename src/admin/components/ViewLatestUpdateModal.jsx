import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewUpdateModal = ({ show, handleClose, update }) => {
  if (!update) return null;
    const BASE_URL = "http://143.110.244.33:8080/"

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>View Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Title:</strong> {update.title}</p>
        <p><strong>Description:</strong> {update.description}</p>
        <p><strong>Send To:</strong> {update.roleName || "All"}</p>
        <p><strong>Files:</strong>  {update.files?.map((file) => (
          <div key={file.id} className="mb-2">
            {file.fileType === 1 && (
              <img
                src={BASE_URL + file.file}
                alt="update"
                style={{ width: "150px", borderRadius: "5px" }}
              />
            )}
            {file.fileType === 2 && (
              <a
                href={BASE_URL + file.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.file.split("/").pop()}
              </a>
            )}
            {file.fileType === 3 && (
              <p>
                URL:{" "}
                <a
                  href={file.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.file}
                </a>
              </p>
            )}
          </div>
        ))}</p>
      
      </Modal.Body>
      <Modal.Footer>
        <Button  className="btn btn-light" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewUpdateModal;
