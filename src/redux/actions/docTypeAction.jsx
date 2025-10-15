import { toast } from "react-toastify";
import BASE_URL from "../../config/config";
import axios from "axios";
import getAuthHeaders from "../../utils/auth";

export const CREATE_DOCUMENT_REQUEST = "CREATE_DOCUMENT_REQUEST";
export const CREATE_DOCUMENT_SUCCESS = "CREATE_DOCUMENT_SUCCESS";
export const CREATE_DOCUMENT_FAILURE = "CREATE_DOCUMENT_FAILURE";

export const FETCH_DOCUMENTS_REQUEST = "FETCH_DOCUMENTS_REQUEST";
export const FETCH_DOCUMENTS_SUCCESS = "FETCH_DOCUMENTS_SUCCESS";
export const FETCH_DOCUMENTS_FAILURE = "FETCH_DOCUMENTS_FAILURE";

export const FETCH_DOCUMENT_BY_ID_REQUEST = "FETCH_DOCUMENT_BY_ID_REQUEST";
export const FETCH_DOCUMENT_BY_ID_SUCCESS = "FETCH_DOCUMENT_BY_ID_SUCCESS";
export const FETCH_DOCUMENT_BY_ID_FAILURE = "FETCH_DOCUMENT_BY_ID_FAILURE";

export const UPDATE_DOCUMENT_REQUEST = "UPDATE_DOCUMENT_REQUEST";
export const UPDATE_DOCUMENT_SUCCESS = "UPDATE_DOCUMENT_SUCCESS";
export const UPDATE_DOCUMENT_FAILURE = "UPDATE_DOCUMENT_FAILURE";

export const DELETE_DOCUMENT_REQUEST = "DELETE_DOCUMENT_REQUEST";
export const DELETE_DOCUMENT_SUCCESS = "DELETE_DOCUMENT_SUCCESS";
export const DELETE_DOCUMENT_FAILURE = "DELETE_DOCUMENT_FAILURE";


// Create Document
export const createDocument = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_DOCUMENT_REQUEST });
  try {
    const { data } = await axios.post(
      `${BASE_URL}/document/create`, payload, getAuthHeaders(false)
    );
    dispatch({
      type: CREATE_DOCUMENT_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
    dispatch(fetchDocuments());
    return data;
  } catch (error) {
    dispatch({
      type: CREATE_DOCUMENT_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};

//  Fetch all Documents
export const fetchDocuments = (filters = { search: "", page: "", showStatus: "", documentCategoryId:"" }) => async (dispatch) => {
  dispatch({ type: FETCH_DOCUMENTS_REQUEST });
  try {
    const { data } = await axios.post(`${BASE_URL}/document/list`, filters, getAuthHeaders() );
    dispatch({
      type: FETCH_DOCUMENTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DOCUMENTS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch documents",
    });
  }
};

//  Fetch Single Document by ID
export const fetchDocumentById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_DOCUMENT_BY_ID_REQUEST });
  try {
    const { data } = await axios.get(`${BASE_URL}/document/${id}`, getAuthHeaders());
    dispatch({
      type: FETCH_DOCUMENT_BY_ID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DOCUMENT_BY_ID_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch document",
    });
  }
};

//  Update Document
export const updateDocument = (id, payload) => async (dispatch) => {
  dispatch({ type: UPDATE_DOCUMENT_REQUEST });
  try {
    const { data } = await axios.put( `${BASE_URL}/document/update/${id}`, payload, getAuthHeaders(false) );
    dispatch({
      type: UPDATE_DOCUMENT_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
    dispatch(fetchDocuments());
    return data;
  } catch (error) {
    dispatch({
      type: UPDATE_DOCUMENT_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};

//  Delete Document
export const deleteDocument = (id) => async (dispatch) => {
  dispatch({ type: DELETE_DOCUMENT_REQUEST });
  try {
    const { data } = await axios.delete(`${BASE_URL}/document/delete/${id}`, getAuthHeaders());
    dispatch({
      type: DELETE_DOCUMENT_SUCCESS,
      payload: id,
    });
    toast.success(data.message || "Document deleted successfully");
    dispatch(fetchDocuments());
  } catch (error) {
    dispatch({
      type: DELETE_DOCUMENT_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};
