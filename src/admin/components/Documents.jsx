import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequiredDocuments } from "../../redux/actions/businessActions";
import { fetchDocuments } from "../../redux/actions/docTypeAction";

const Documents = ({ businessId,businessIdEdit }) => {
  const dispatch = useDispatch();
  const { documents } = useSelector((state) => state.documents);
  console.log('businessIdEdit',businessIdEdit)
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

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
      businessId: businessId || 0,
      requiredDocumentCategoryIds: selectedCategories,
    };

    try {
      const res = await dispatch(addRequiredDocuments(payload));
      if (res?.status) {
        setSelectedCategories([]);
      } else {
        console.error("Failed to save required documents");
      }
    } catch (err) {
      console.error(err);
    }
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
                </tr>
              ));
            })}
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            Save Required Documents
          </button>
        </div>
      </form>
    </>
  );
};


export default Documents;
