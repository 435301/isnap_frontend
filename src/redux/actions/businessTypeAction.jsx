
import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const FETCH_BUSINESS_TYPES_REQUEST = "FETCH_BUSINESS_TYPES_REQUEST";
export const FETCH_BUSINESS_TYPES_SUCCESS = "FETCH_BUSINESS_TYPES_SUCCESS";
export const FETCH_BUSINESS_TYPES_FAILURE = "FETCH_BUSINESS_TYPES_FAILURE";

export const FETCH_BUSINESS_TYPE_REQUEST = "FETCH_BUSINESS_TYPE_REQUEST";
export const FETCH_BUSINESS_TYPE_SUCCESS = "FETCH_BUSINESS_TYPE_SUCCESS";
export const FETCH_BUSINESS_TYPE_FAILURE = "FETCH_BUSINESS_TYPE_FAILURE";

export const CREATE_BUSINESS_TYPE_REQUEST = "CREATE_BUSINESS_TYPE_REQUEST";
export const CREATE_BUSINESS_TYPE_SUCCESS = "CREATE_BUSINESS_TYPE_SUCCESS";
export const CREATE_BUSINESS_TYPE_FAILURE = "CREATE_BUSINESS_TYPE_FAILURE";

export const UPDATE_BUSINESS_TYPE_REQUEST = "UPDATE_BUSINESS_TYPE_REQUEST";
export const UPDATE_BUSINESS_TYPE_SUCCESS = "UPDATE_BUSINESS_TYPE_SUCCESS";
export const UPDATE_BUSINESS_TYPE_FAILURE = "UPDATE_BUSINESS_TYPE_FAILURE";

export const DELETE_BUSINESS_TYPE_REQUEST = "DELETE_BUSINESS_TYPE_REQUEST";
export const DELETE_BUSINESS_TYPE_SUCCESS = "DELETE_BUSINESS_TYPE_SUCCESS";
export const DELETE_BUSINESS_TYPE_FAILURE = "DELETE_BUSINESS_TYPE_FAILURE";

// List Business Types
export const fetchBusinessTypes = (payload = { search: "", page: 1, showStatus: "" }) => async (dispatch) => {
    dispatch({ type: FETCH_BUSINESS_TYPES_REQUEST });
    try {
        const { data } = await axios.post(`${BASE_URL}/businessType/list`, payload, getAuthHeaders());
        dispatch({ type: FETCH_BUSINESS_TYPES_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: FETCH_BUSINESS_TYPES_FAILURE, payload: error.message });
    }
};

// Get Business Type by ID
export const fetchBusinessTypeById = (id, payload = { page: 1, search: "", showStatus: "", marketPlaceId: "" }) => async (dispatch) => {
    dispatch({ type: FETCH_BUSINESS_TYPE_REQUEST });
    try {
        const { data } = await axios.post(`${BASE_URL}/businessType/${id}`, payload, getAuthHeaders());
        dispatch({ type: FETCH_BUSINESS_TYPE_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: FETCH_BUSINESS_TYPE_FAILURE, payload: error.message });
    }
};

// Create Business Type
export const createBusinessType = (payload) => async (dispatch) => {
    dispatch({ type: CREATE_BUSINESS_TYPE_REQUEST });
    try {
        const { data } = await axios.post(`${BASE_URL}/businessType/create`, payload, getAuthHeaders(false));
        dispatch({ type: CREATE_BUSINESS_TYPE_SUCCESS, payload: data.message });
        toast.success(data.message || 'Business Type created successfully');
        dispatch(fetchBusinessTypes());
    } catch (error) {
        dispatch({ type: CREATE_BUSINESS_TYPE_FAILURE, payload: error.message });
        toast.error(error.response.data.message || 'Failed to add business type');
    }
};

// Update Business Type
export const updateBusinessType = (id, payload) => async (dispatch) => {
    dispatch({ type: UPDATE_BUSINESS_TYPE_REQUEST });
    try {
        const { data } = await axios.put(`${BASE_URL}/businessType/update/${id}`, payload, getAuthHeaders(false));
        dispatch({ type: UPDATE_BUSINESS_TYPE_SUCCESS, payload: data.message });
        dispatch(fetchBusinessTypes()); // refresh list
        toast.success(data.message || 'Business Type updated successfully');
    } catch (error) {
        dispatch({ type: UPDATE_BUSINESS_TYPE_FAILURE, payload: error.message });
        toast.error(error.response.data.message || 'Failed to update business type');
    }
};

// Delete Business Type
export const deleteBusinessType = (id) => async (dispatch) => {
    dispatch({ type: DELETE_BUSINESS_TYPE_REQUEST });
    try {
        const { data } = await axios.delete(`${BASE_URL}/businessType/delete/${id}`, getAuthHeaders(false));
        dispatch({ type: DELETE_BUSINESS_TYPE_SUCCESS, payload: id });
        dispatch(fetchBusinessTypes());
        toast.success(data?.message || 'Business Type deleted successfully');
    } catch (error) {
        dispatch({ type: DELETE_BUSINESS_TYPE_FAILURE, payload: error.message });
        toast.error(error.response.data.message || 'Failed to delete business type');
    }
};
