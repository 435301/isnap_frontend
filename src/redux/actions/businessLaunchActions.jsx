import axios from "axios";
import BASE_URL from "../../config/config";

// Action Types
export const FETCH_BUSINESS_LAUNCH_REQUEST = "FETCH_BUSINESS_LAUNCH_REQUEST";
export const FETCH_BUSINESS_LAUNCH_SUCCESS = "FETCH_BUSINESS_LAUNCH_SUCCESS";
export const FETCH_BUSINESS_LAUNCH_FAILURE = "FETCH_BUSINESS_LAUNCH_FAILURE";
export const CREATE_BUSINESS_LAUNCH_SUCCESS = "CREATE_BUSINESS_LAUNCH_SUCCESS";
export const UPDATE_BUSINESS_LAUNCH_SUCCESS = "UPDATE_BUSINESS_LAUNCH_SUCCESS";
export const DELETE_BUSINESS_LAUNCH_SUCCESS = "DELETE_BUSINESS_LAUNCH_SUCCESS";
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

// FETCH
export const fetchBusinessLaunchList = (businessId) => async (dispatch) => {
  dispatch({ type: FETCH_BUSINESS_LAUNCH_REQUEST });
  try {
    const url = businessId 
      ? `${BASE_URL}/businessLaunch/list/${businessId}` 
      : `${BASE_URL}/businessLaunch/list`; // fetch all launches if no id

    const response = await axios.get(url, getAuthHeaders());

    if (response.data.status) {
      const launches = response.data.data.businessLaunches.map((item) => ({
        id: item.id,
        businessId: item.businessId,
        serviceType: item.serviceTypeName,
        actualPrice: item.actualPrice,
        offerPrice: item.offerPrice,
        billingCycle: item.billCycleTitle,
        taskDays: item.taskCompletionDays,
      }));
      dispatch({ type: FETCH_BUSINESS_LAUNCH_SUCCESS, payload: launches });
    } else {
      dispatch({
        type: FETCH_BUSINESS_LAUNCH_FAILURE,
        payload: response.data.message || "Failed to fetch launches",
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_BUSINESS_LAUNCH_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// CREATE
export const createBusinessLaunch = (launchData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/businessLaunch/create`,
      launchData,
      getAuthHeaders(true)
    );

    if (response.data.status) {
      dispatch({ type: CREATE_BUSINESS_LAUNCH_SUCCESS, payload: response.data.data });
      return response.data;
    } else {
      dispatch({ type: BUSINESS_LAUNCH_ERROR, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: BUSINESS_LAUNCH_ERROR, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

// UPDATE
export const updateBusinessLaunch = (launchData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/businessLaunch/update/${launchData.get("id")}`,
      launchData,
      getAuthHeaders(true)
    );

    if (response.data.status) {
      dispatch({ type: UPDATE_BUSINESS_LAUNCH_SUCCESS, payload: response.data.data });
      return response.data;
    } else {
      dispatch({ type: BUSINESS_LAUNCH_ERROR, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: BUSINESS_LAUNCH_ERROR, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

// DELETE
export const deleteBusinessLaunch = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/businessLaunch/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_BUSINESS_LAUNCH_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: BUSINESS_LAUNCH_ERROR, payload: error.response?.data?.message || error.message });
  }
};

// CLEAR SUCCESS
export const clearBusinessLaunchSuccessMessage = () => ({ type: CLEAR_BUSINESS_LAUNCH_SUCCESS_MESSAGE });
