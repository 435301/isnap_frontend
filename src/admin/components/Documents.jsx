import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequiredDocuments, deleteRequiredDocuments, fetchBusinessDocuments, updateRequiredDocuments } from "../../redux/actions/businessActions";
import { fetchDocuments } from "../../redux/actions/docTypeAction";
import { approveMailToSeller, mailToSalesManager } from "../../redux/actions/emailAction";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";

const Documents = ({ businessId, businessIdEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documents } = useSelector((state) => state.documents);
  const {  categories} = useSelector((state) => state.categories);
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
      businessId: businessIdEdit || businessId ,
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

  return (
    <>
      <h5>Documents</h5>

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
