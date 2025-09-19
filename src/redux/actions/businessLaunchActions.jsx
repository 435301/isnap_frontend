import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

// Action Types
export const FETCH_BUSINESS_LAUNCH_REQUEST = "FETCH_BUSINESS_LAUNCH_REQUEST";
export const FETCH_BUSINESS_LAUNCH_SUCCESS = "FETCH_BUSINESS_LAUNCH_SUCCESS";
export const FETCH_BUSINESS_LAUNCH_FAILURE = "FETCH_BUSINESS_LAUNCH_FAILURE";
export const CREATE_BUSINESS_LAUNCH_SUCCESS = "CREATE_BUSINESS_LAUNCH_SUCCESS";
export const UPDATE_BUSINESS_LAUNCH_SUCCESS = "UPDATE_BUSINESS_LAUNCH_SUCCESS";
export const UPDATE_BUSINESS_LAUNCH_FAILURE = "UPDATE_BUSINESS_LAUNCH_FAILURE";
export const DELETE_BUSINESS_LAUNCH_SUCCESS = "DELETE_BUSINESS_LAUNCH_SUCCESS";
export const DELETE_BUSINESS_LAUNCH_FAILURE = "DELETE_BUSINESS_LAUNCH_FAILURE";
export const BUSINESS_LAUNCH_ERROR = "BUSINESS_LAUNCH_ERROR";
export const CLEAR_BUSINESS_LAUNCH_SUCCESS_MESSAGE = "CLEAR_BUSINESS_LAUNCH_SUCCESS_MESSAGE";

// Auth Headers
const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem("authToken");
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
    },
  };
};

export const fetchBusinessLaunches = (businessId, page = 1, search = "", showStatus = "") => {
  return async (dispatch) => {
    dispatch({ type: FETCH_BUSINESS_LAUNCH_REQUEST });

    try {
      const response = await axios.post(`${BASE_URL}/businessLaunch/list/${businessId}`, {
        page,
        search,
        showStatus,
      });

      if (response.data.status) {
        dispatch({
          type: FETCH_BUSINESS_LAUNCH_SUCCESS,
          payload: response.data.data, 
        });
      } else {
        dispatch({
          type: FETCH_BUSINESS_LAUNCH_FAILURE,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_BUSINESS_LAUNCH_FAILURE,
        payload: error.message,
      });
    }
  };
};


// CREATE
export const createBusinessLaunch = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/businessLaunch/create`,
      payload,
      getAuthHeaders(false)
    );
     if (res.data.status) {
      dispatch({
        type: "CREATE_BUSINESS_LAUNCH_SUCCESS",
        payload: res?.data?.data, // saved record
      });
    toast.success(res?.data?.message || "Business launch created successfully");
      return res.data.data; // return for immediate use
    }
  } catch (error) {
    dispatch({ type: BUSINESS_LAUNCH_ERROR, payload: error.response?.data?.message || error.message });
    toast.error(error.response.data.message || "Failed to create business launch");
    throw error;
  }
};


export const deleteBusinessLaunch = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/businessLaunch/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_BUSINESS_LAUNCH_SUCCESS, payload: id });
    toast.success(res?.data?.message || "Business launch deleted successfully");
    return true;
  } catch (err) {
    dispatch({ type: DELETE_BUSINESS_LAUNCH_FAILURE, payload: err.message });
    toast.error(err?.response?.data?.message || "Failed to delete business launch");
    throw err;
  }
};

// CLEAR SUCCESS
export const clearBusinessLaunchSuccessMessage = () => ({ type: CLEAR_BUSINESS_LAUNCH_SUCCESS_MESSAGE });
