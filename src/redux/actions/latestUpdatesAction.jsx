import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const FETCH_LATEST_UPDATES_REQUEST = "FETCH_LATEST_UPDATES_REQUEST";
export const FETCH_LATEST_UPDATES_SUCCESS = "FETCH_LATEST_UPDATES_SUCCESS";
export const FETCH_LATEST_UPDATES_FAILURE = "FETCH_LATEST_UPDATES_FAILURE";

export const FETCH_LATEST_UPDATE_BY_ID_REQUEST = "FETCH_LATEST_UPDATE_BY_ID_REQUEST";
export const FETCH_LATEST_UPDATE_BY_ID_SUCCESS = "FETCH_LATEST_UPDATE_BY_ID_SUCCESS";
export const FETCH_LATEST_UPDATE_BY_ID_FAILURE = "FETCH_LATEST_UPDATE_BY_ID_FAILURE";

export const CREATE_LATEST_UPDATE_REQUEST = "CREATE_LATEST_UPDATE_REQUEST";
export const CREATE_LATEST_UPDATE_SUCCESS = "CREATE_LATEST_UPDATE_SUCCESS";
export const CREATE_LATEST_UPDATE_FAILURE = "CREATE_LATEST_UPDATE_FAILURE";

export const UPDATE_LATEST_UPDATE_REQUEST = "UPDATE_LATEST_UPDATE_REQUEST";
export const UPDATE_LATEST_UPDATE_SUCCESS = "UPDATE_LATEST_UPDATE_SUCCESS";
export const UPDATE_LATEST_UPDATE_FAILURE = "UPDATE_LATEST_UPDATE_FAILURE";

export const DELETE_LATEST_UPDATE_REQUEST = "DELETE_LATEST_UPDATE_REQUEST";
export const DELETE_LATEST_UPDATE_SUCCESS = "DELETE_LATEST_UPDATE_SUCCESS";
export const DELETE_LATEST_UPDATE_FAILURE = "DELETE_LATEST_UPDATE_FAILURE";

export const DELETE_LATEST_UPDATE_FILE_REQUEST = "DELETE_LATEST_UPDATE_FILE_REQUEST";
export const DELETE_LATEST_UPDATE_FILE_SUCCESS = "DELETE_LATEST_UPDATE_FILE_SUCCESS";
export const DELETE_LATEST_UPDATE_FILE_FAILURE = "DELETE_LATEST_UPDATE_FILE_FAILURE";

export const fetchLatestUpdates = (payload = { search: "", page: 1, showStatus: "" }) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_LATEST_UPDATES_REQUEST });
        try {
            const response = await axios.post(`${BASE_URL}/latestUpdates/list`,payload, getAuthHeaders());

            if (response.data.status) {
                dispatch({ type: FETCH_LATEST_UPDATES_SUCCESS, payload: response.data.data });
            } else {
                dispatch({ type: FETCH_LATEST_UPDATES_FAILURE, payload: response.data.message || "No data found" });
            }
        } catch (error) {
            dispatch({ type: FETCH_LATEST_UPDATES_FAILURE, payload: error.message || "Something went wrong" });
        }
    };
};

export const fetchLatestUpdateById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LATEST_UPDATE_BY_ID_REQUEST });
    const response = await axios.get(`${BASE_URL}/latestUpdates/${id}`, getAuthHeaders());
    dispatch({
      type: FETCH_LATEST_UPDATE_BY_ID_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_LATEST_UPDATE_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createLatestUpdate = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_LATEST_UPDATE_REQUEST });
    const response = await axios.post(`${BASE_URL}/latestUpdates/create`, formData, getAuthHeaders(true));
    dispatch({
      type: CREATE_LATEST_UPDATE_SUCCESS,
      payload: response.data,
    });
    dispatch(fetchLatestUpdates());
    toast.success(response?.message || "Latest Update created successfully");
  } catch (error) {
    dispatch({
      type: CREATE_LATEST_UPDATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error?.response.data.message || "Latest Update failed to create");
  }
};


export const updateLatestUpdate = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LATEST_UPDATE_REQUEST });
    const response = await axios.put(`${BASE_URL}/latestUpdates/update/${id}`, formData, getAuthHeaders(true));
    dispatch({
      type: UPDATE_LATEST_UPDATE_SUCCESS,
      payload: response.data,
    });
    toast.success(response?.message || "Latest Update updated successfully");
  } catch (error) {
    dispatch({
      type: UPDATE_LATEST_UPDATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response.data.message);
  }
};


export const deleteLatestUpdate = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LATEST_UPDATE_REQUEST });
    const response = await axios.delete(`${BASE_URL}/latestUpdates/delete/${id}`, getAuthHeaders());
    dispatch({
      type: DELETE_LATEST_UPDATE_SUCCESS,
      payload: { id, message: response.data.message },
    });
    toast.success(response?.data.message);
  } catch (error) {
    dispatch({
      type: DELETE_LATEST_UPDATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteLatestUpdateFile = (fileId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LATEST_UPDATE_FILE_REQUEST });
    const response = await axios.delete(`${BASE_URL}/latestUpdates/deleteFile/${fileId}`, getAuthHeaders());
    dispatch({
      type: DELETE_LATEST_UPDATE_FILE_SUCCESS,
      payload: { fileId, message: response.data.message },
    });
    toast.success(response?.data.message);
  } catch (error) {
    dispatch({
      type: DELETE_LATEST_UPDATE_FILE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
