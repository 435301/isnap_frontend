import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";

export const FETCH_LEAD_STATUS_REQUEST = "FETCH_LEAD_STATUS_REQUEST";
export const FETCH_LEAD_STATUS_SUCCESS = "FETCH_LEAD_STATUS_SUCCESS";
export const FETCH_LEAD_STATUS_FAILURE = "FETCH_LEAD_STATUS_FAILURE";

export const CREATE_LEAD_STATUS_REQUEST = "CREATE_LEAD_STATUS_REQUEST";
export const CREATE_LEAD_STATUS_SUCCESS = "CREATE_LEAD_STATUS_SUCCESS";
export const CREATE_LEAD_STATUS_FAILURE = "CREATE_LEAD_STATUS_FAILURE";

export const UPDATE_LEAD_STATUS_REQUEST = "UPDATE_LEAD_STATUS_REQUEST";
export const UPDATE_LEAD_STATUS_SUCCESS = "UPDATE_LEAD_STATUS_SUCCESS";
export const UPDATE_LEAD_STATUS_FAILURE = "UPDATE_LEAD_STATUS_FAILURE";

export const DELETE_LEAD_STATUS_REQUEST = "DELETE_LEAD_STATUS_REQUEST";
export const DELETE_LEAD_STATUS_SUCCESS = "DELETE_LEAD_STATUS_SUCCESS";
export const DELETE_LEAD_STATUS_FAILURE = "DELETE_LEAD_STATUS_FAILURE";

// Fetch Lead Statuses
export const fetchLeadStatus = (filters = { search: "", page: 1, showStatus: "" }) => async (dispatch) => {
  dispatch({ type: FETCH_LEAD_STATUS_REQUEST });
  try {
    const { data } = await axios.post(`${BASE_URL}/leadStatus/list`, filters, getAuthHeaders(false));
    dispatch({
      type: FETCH_LEAD_STATUS_SUCCESS,
      payload: {
        leadStatus: data.data.leadStatus || [],
        totalPages: data.data.totalPages,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_LEAD_STATUS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create Lead Status
export const createLeadStatus = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_LEAD_STATUS_REQUEST });
  try {
    const response  = await axios.post(`${BASE_URL}/leadStatus/create`, payload, getAuthHeaders(false));
    dispatch({ type: CREATE_LEAD_STATUS_SUCCESS, payload: response.data.data });
    toast.success(response.data.message || "Lead Status created successfully");
    dispatch(fetchLeadStatus());
    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_LEAD_STATUS_FAILURE,
      payload: error.response?.data?.message || error.message || "Failed to create lead status",
    });
    toast.error(error.response?.data?.message || "Failed to create lead status");
  }
};

// Update Lead Status
export const updateLeadStatus = (id, payload) => async (dispatch) => {
  dispatch({ type: UPDATE_LEAD_STATUS_REQUEST });
  try {
    const { data } = await axios.put(`${BASE_URL}/leadStatus/update/${id}`, payload, getAuthHeaders(false));
    dispatch({ type: UPDATE_LEAD_STATUS_SUCCESS, payload: { id, ...payload } });
    toast.success(data.message || "Lead Status updated successfully");
    dispatch(fetchLeadStatus());
  } catch (error) {
    dispatch({
      type: UPDATE_LEAD_STATUS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Failed to update lead status");
  }
};

// Delete Lead Status
export const deleteLeadStatus = (id) => async (dispatch) => {
  dispatch({ type: DELETE_LEAD_STATUS_REQUEST });
  try {
    const { data } = await axios.delete(`${BASE_URL}/leadStatus/delete/${id}`, getAuthHeaders(false));
    dispatch({ type: DELETE_LEAD_STATUS_SUCCESS, payload: id });
    toast.success(data.message || "Lead Status deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_LEAD_STATUS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Failed to delete lead status");
  }
};