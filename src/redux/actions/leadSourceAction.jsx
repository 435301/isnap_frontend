import { toast } from "react-toastify";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import axios from "axios";

export const FETCH_LEAD_SOURCES_REQUEST = "FETCH_LEAD_SOURCES_REQUEST";
export const FETCH_LEAD_SOURCES_SUCCESS = "FETCH_LEAD_SOURCES_SUCCESS";
export const FETCH_LEAD_SOURCES_FAILURE = "FETCH_LEAD_SOURCES_FAILURE";

export const FETCH_LEAD_SOURCE_SUCCESS ="FETCH_LEAD_SOURCE_SUCCESS";

export const CREATE_LEAD_SOURCE_REQUEST = "CREATE_LEAD_SOURCE_REQUEST";
export const CREATE_LEAD_SOURCE_SUCCESS = "CREATE_LEAD_SOURCE_SUCCESS";
export const CREATE_LEAD_SOURCE_FAILURE = "CREATE_LEAD_SOURCE_FAILURE";

export const UPDATE_LEAD_SOURCE_REQUEST = "UPDATE_LEAD_SOURCE_REQUEST";
export const UPDATE_LEAD_SOURCE_SUCCESS = "UPDATE_LEAD_SOURCE_SUCCESS";
export const UPDATE_LEAD_SOURCE_FAILURE = "UPDATE_LEAD_SOURCE_FAILURE";

export const DELETE_LEAD_SOURCE_REQUEST = "DELETE_LEAD_SOURCE_REQUEST";
export const DELETE_LEAD_SOURCE_SUCCESS = "DELETE_LEAD_SOURCE_SUCCESS";
export const DELETE_LEAD_SOURCE_FAILURE = "DELETE_LEAD_SOURCE_FAILURE";

// Fetch Lead Sources
export const fetchLeadSources = (payload = { search: "", page: 1, showStatus: "" }) => async (dispatch) => {
  dispatch({ type: FETCH_LEAD_SOURCES_REQUEST });
  try {
    const { data } = await axios.post(`${BASE_URL}/leadSource/list`, payload, getAuthHeaders());
    dispatch({ type: FETCH_LEAD_SOURCES_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: FETCH_LEAD_SOURCES_FAILURE, payload: error.message });
    // toast.error(error.response?.data?.message || "Failed to fetch lead sources");
  }
};

// Create Lead Source
export const createLeadSource = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_LEAD_SOURCE_REQUEST });
  try {
    const { data } = await axios.post(`${BASE_URL}/leadSource/create`, payload, getAuthHeaders());
    dispatch({ type: CREATE_LEAD_SOURCE_SUCCESS, payload: data.message });
    toast.success(data.message || "Lead Source created successfully");
    dispatch(fetchLeadSources());
  } catch (error) {
    dispatch({ type: CREATE_LEAD_SOURCE_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to create lead source");
  }
};

// Update Lead Source
export const updateLeadSource = (id, payload) => async (dispatch) => {
  dispatch({ type: UPDATE_LEAD_SOURCE_REQUEST });
  try {
    const { data } = await axios.put(`${BASE_URL}/leadSource/update/${id}`, payload, getAuthHeaders());
    dispatch({ type: UPDATE_LEAD_SOURCE_SUCCESS, payload: id });
    toast.success(data.message || "Lead Source updated successfully");
    dispatch(fetchLeadSources());
  } catch (error) {
    dispatch({ type: UPDATE_LEAD_SOURCE_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to update lead source");
  }
};

// Delete Lead Source
export const deleteLeadSource = (id) => async (dispatch) => {
  dispatch({ type: DELETE_LEAD_SOURCE_REQUEST });
  try {
    const response = await axios.delete(`${BASE_URL}/leadSource/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_LEAD_SOURCE_SUCCESS, payload: id });
    toast.success(response?.message || "Lead Source deleted successfully");
    dispatch(fetchLeadSources());
  } catch (error) {
    dispatch({ type: DELETE_LEAD_SOURCE_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message || "Failed to delete lead source");
  }
};