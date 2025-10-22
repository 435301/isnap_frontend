import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";
import getSellerAuthHeaders from "../../utils/sellerAuth";
import getAuthHeaders from "../../utils/auth";

export const UPDATE_MOU_STATUS_REQUEST = "UPDATE_MOU_STATUS_REQUEST";
export const UPDATE_MOU_STATUS_SUCCESS = "UPDATE_MOU_STATUS_SUCCESS";
export const UPDATE_MOU_STATUS_FAILURE = "UPDATE_MOU_STATUS_FAILURE";

export const FETCH_MOU_REQUEST = "FETCH_MOU_REQUEST";
export const FETCH_MOU_SUCCESS = "FETCH_MOU_SUCCESS";
export const FETCH_MOU_FAILURE = "FETCH_MOU_FAILURE";

// get required documents
export const FETCH_REQUIRED_DOCS_REQUEST = "FETCH_REQUIRED_DOCS_REQUEST";
export const FETCH_REQUIRED_DOCS_SUCCESS = "FETCH_REQUIRED_DOCS_SUCCESS";
export const FETCH_REQUIRED_DOCS_FAILURE = "FETCH_REQUIRED_DOCS_FAILURE";

// upload documents in seller page
export const UPLOAD_DOCUMENT_REQUEST = "UPLOAD_DOCUMENT_REQUEST";
export const UPLOAD_DOCUMENT_SUCCESS = "UPLOAD_DOCUMENT_SUCCESS";
export const UPLOAD_DOCUMENT_FAILURE = "UPLOAD_DOCUMENT_FAILURE";

// Document Approval Actions
export const ACCEPT_DOCUMENTS_REQUEST = "ACCEPT_DOCUMENTS_REQUEST";
export const ACCEPT_DOCUMENTS_SUCCESS = "ACCEPT_DOCUMENTS_SUCCESS";
export const ACCEPT_DOCUMENTS_FAIL = "ACCEPT_DOCUMENTS_FAIL";

export const REJECT_DOCUMENTS_REQUEST = "REJECT_DOCUMENTS_REQUEST";
export const REJECT_DOCUMENTS_SUCCESS = "REJECT_DOCUMENTS_SUCCESS";
export const REJECT_DOCUMENTS_FAIL = "REJECT_DOCUMENTS_FAIL";
// partial  Document Approval Actions
export const PARTIAL_DOCUMENTS_REQUEST = "PARTIAL_DOCUMENTS_REQUEST";
export const PARTIAL_DOCUMENTS_SUCCESS = "PARTIAL_DOCUMENTS_SUCCESS";
export const PARTIAL_DOCUMENTS_FAILURE = "PARTIAL_DOCUMENTS_FAILURE";


export const updateMouStatus = (id, mouStatus,ipAddress) => async (dispatch) => {
  dispatch({ type: UPDATE_MOU_STATUS_REQUEST });

  try {
    const response = await axios.post(`${BASE_URL}/mou/mouStatus`, { id, mouStatus ,ipAddress}, getSellerAuthHeaders(false));
    
    if (response.data.status) {
      dispatch({
        type: UPDATE_MOU_STATUS_SUCCESS,
        payload: response.data.data, // { mouStatus: 1 }
      });
      toast.success(response?.message || "MOU Status updated successfully")
    } else {
      dispatch({
        type: UPDATE_MOU_STATUS_FAILURE,
        payload: response.data.message || "Failed to update MOU status",
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_MOU_STATUS_FAILURE,
      payload: error.message || "Something went wrong",
    });
    toast.error(error?.response.data.message || "Failed to update MOU status");
  }
};


export const fetchMouDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MOU_REQUEST });

    try {
      const response = await axios.get(`${BASE_URL}/mou/${id}` , getSellerAuthHeaders()); 
      if (response.data.status) {
        dispatch({
          type: FETCH_MOU_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: FETCH_MOU_FAILURE,
          payload: response.data.message || "Failed to fetch MOU details",
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_MOU_FAILURE,
        payload: error.message || "Something went wrong",
      });
    }
  };
};

export const fetchRequiredDocuments = (businessId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_REQUIRED_DOCS_REQUEST });
    const response = await axios.get(`${BASE_URL}/mou/requiredDocuments/${businessId}`, getSellerAuthHeaders());
    if (response.data.status) {
      dispatch({
        type: FETCH_REQUIRED_DOCS_SUCCESS,
        payload: response.data.data, // contains documents, total, and documentsRejectedReason
      });
    } else {
      dispatch({
        type: FETCH_REQUIRED_DOCS_FAILURE,
        payload: response.data.message || "Failed to fetch required documents",
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_REQUIRED_DOCS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const uploadDocument = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_DOCUMENT_REQUEST });
    const response = await axios.patch(`${BASE_URL}/mou/uploadDocument`, formData, getSellerAuthHeaders(true));
    dispatch({
      type: UPLOAD_DOCUMENT_SUCCESS,
      payload: response.data.data,
    });
    toast.success(response.data.message || "Document uploaded successfully");
  } catch (error) {
    dispatch({
      type: UPLOAD_DOCUMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Failed to upload document");
  }
};


export const acceptDocuments = (businessId) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_DOCUMENTS_REQUEST });
    const response = await axios.patch(`${BASE_URL}/salesManager/acceptDocuments`, {
      businessId, 
    },getAuthHeaders(false));
    dispatch({
      type: ACCEPT_DOCUMENTS_SUCCESS,
      payload: response.data,
    });
    toast.success(response.data.message || "Documents accepted successfully");
    return response.data;
  } catch (error) {
    dispatch({
      type: ACCEPT_DOCUMENTS_FAIL,
      payload:
        error.response?.data?.message || error.message || "Failed to accept documents",
    });
    toast.error(error.response?.data?.message || "Failed to accept documents");
  }
};

//  Reject Documents
export const rejectDocuments = (businessId, reason) => async (dispatch) => {
  try {
    dispatch({ type: REJECT_DOCUMENTS_REQUEST });
    const response = await axios.patch(`${BASE_URL}/salesManager/rejectDocuments`, {
      businessId,
      reason,
    },getAuthHeaders(false));
    dispatch({
      type: REJECT_DOCUMENTS_SUCCESS,
      payload: response.data,
    });
    toast.success(response.data.message || "Documents accepted successfully");
    return response.data;
  } catch (error) {
    dispatch({
      type: REJECT_DOCUMENTS_FAIL,
      payload:
        error.response?.data?.message || error.message || "Failed to reject documents",
    });
    toast.error(error.response?.data?.message || "Failed to reject documents");
  }
};

export const partialDocumentsAction = (businessId, documentIds,reason) => async (dispatch) => {
  dispatch({ type: PARTIAL_DOCUMENTS_REQUEST });
  try {
    const response = await axios.patch(`${BASE_URL}/salesManager/partialDocuments`, { businessId, documentIds,reason}, getAuthHeaders(false)  );
    dispatch({
      type: PARTIAL_DOCUMENTS_SUCCESS,
      payload: response.data.data,
    });
    toast.success(response.data.message || "Documents partially approved successfully");
  } catch (error) {
    dispatch({
      type: PARTIAL_DOCUMENTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Failed to partially approve documents");
  }
};
