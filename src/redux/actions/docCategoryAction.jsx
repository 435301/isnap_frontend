import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const FETCH_DOCUMENT_CATEGORY_REQUEST = "FETCH_DOCUMENT_CATEGORY_REQUEST";
export const FETCH_DOCUMENT_CATEGORY_SUCCESS = "FETCH_DOCUMENT_CATEGORY_SUCCESS";
export const FETCH_DOCUMENT_CATEGORY_FAILURE = "FETCH_DOCUMENT_CATEGORY_FAILURE";

export const FETCH_DOCUMENT_CATEGORY_SUCCESS_BY_ID = "FETCH_DOCUMENT_CATEGORY_SUCCESS_BY_ID";

export const CREATE_DOCUMENT_CATEGORY_REQUEST = "CREATE_DOCUMENT_CATEGORY_REQUEST";
export const CREATE_DOCUMENT_CATEGORY_SUCCESS = "CREATE_DOCUMENT_CATEGORY_SUCCESS";
export const CREATE_DOCUMENT_CATEGORY_FAILURE = "CREATE_DOCUMENT_CATEGORY_FAILURE";

export const UPDATE_DOCUMENT_CATEGORY_REQUEST = "UPDATE_DOCUMENT_CATEGORY_REQUEST";
export const UPDATE_DOCUMENT_CATEGORY_SUCCESS = "UPDATE_DOCUMENT_CATEGORY_SUCCESS";
export const UPDATE_DOCUMENT_CATEGORY_FAILURE = "UPDATE_DOCUMENT_CATEGORY_FAILURE";

export const DELETE_DOCUMENT_CATEGORY_REQUEST = "DELETE_DOCUMENT_CATEGORY_REQUEST";
export const DELETE_DOCUMENT_CATEGORY_SUCCESS = "DELETE_DOCUMENT_CATEGORY_SUCCESS";
export const DELETE_DOCUMENT_CATEGORY_FAILURE = "DELETE_DOCUMENT_CATEGORY_FAILURE";


// Fetch all document categories
export const fetchDocumentCategories = (filters = { search: "", page: "", showStatus: "" }) => async (dispatch) => {
    dispatch({ type: FETCH_DOCUMENT_CATEGORY_REQUEST });
    try {
        const { data } = await axios.post(`${BASE_URL}/documentCategory/list`, filters, getAuthHeaders());
        dispatch({
            type: FETCH_DOCUMENT_CATEGORY_SUCCESS,
            payload: data.data?.documentCategories || [],
        });
    } catch (error) {
        dispatch({
            type: FETCH_DOCUMENT_CATEGORY_FAILURE,
            payload: error.response?.data?.message || "Failed to fetch categories",
        });
    }
};

// Fetch single category by ID
export const fetchDocumentCategoryById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_DOCUMENT_CATEGORY_REQUEST });
    try {
        const { data } = await axios.get(`${BASE_URL}/documentCategory/${id}`, getAuthHeaders());
        dispatch({
            type: FETCH_DOCUMENT_CATEGORY_SUCCESS_BY_ID,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_DOCUMENT_CATEGORY_FAILURE,
            payload: error.response?.data?.message || "Failed to fetch category",
        });
    }
};

// Create new document category
export const createDocumentCategory = (payload) => async (dispatch) => {
    dispatch({ type: CREATE_DOCUMENT_CATEGORY_REQUEST });
    try {
        const { data } = await axios.post(`${BASE_URL}/documentCategory/create`, payload, getAuthHeaders(false));
        dispatch({
            type: CREATE_DOCUMENT_CATEGORY_SUCCESS,
            payload: data.message,
        });
        toast.success(data.message);
        return data;
    } catch (error) {
        dispatch({
            type: CREATE_DOCUMENT_CATEGORY_FAILURE,
            payload: error.response?.data?.message || "Failed to create category",
        });
        toast.error(error.response.data.message);
    }
};

// Update document category
export const updateDocumentCategory = (id, payload) => async (dispatch) => {
    dispatch({ type: UPDATE_DOCUMENT_CATEGORY_REQUEST });
    try {
        const { data } = await axios.put(`${BASE_URL}/documentCategory/update/${id}`, payload, getAuthHeaders(false));
        dispatch({
            type: UPDATE_DOCUMENT_CATEGORY_SUCCESS,
            payload: data.message,
        });
        dispatch(fetchDocumentCategories());
        toast.success(data.message);
    } catch (error) {
        dispatch({
            type: UPDATE_DOCUMENT_CATEGORY_FAILURE,
            payload: error.response?.data?.message || "Failed to update category",
        });
        toast.error(error.response.data.message);
    }
};

// Delete document category
export const deleteDocumentCategory = (id) => async (dispatch) => {
    dispatch({ type: DELETE_DOCUMENT_CATEGORY_REQUEST });
    try {
        const { data } = await axios.delete(`${BASE_URL}/documentCategory/delete/${id}`, getAuthHeaders());
        dispatch({
            type: DELETE_DOCUMENT_CATEGORY_SUCCESS,
            payload: data.message,
        });
        toast.success(data.message);
        dispatch(fetchDocumentCategories());
    } catch (error) {
        dispatch({
            type: DELETE_DOCUMENT_CATEGORY_FAILURE,
            payload: error.response?.data?.message || "Failed to delete category",
        });
        toast.error(error.response.data.message);
    }
};
