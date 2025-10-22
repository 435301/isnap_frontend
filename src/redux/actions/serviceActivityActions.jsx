import axios from "axios";
import BASE_URL from "../../config/config";

// Action types
export const FETCH_SERVICE_ACTIVITIES_REQUEST = "FETCH_SERVICE_ACTIVITIES_REQUEST";
export const FETCH_SERVICE_ACTIVITIES_SUCCESS = "FETCH_SERVICE_ACTIVITIES_SUCCESS";
export const FETCH_SERVICE_ACTIVITIES_FAILURE = "FETCH_SERVICE_ACTIVITIES_FAILURE";

export const CREATE_SERVICE_ACTIVITY_SUCCESS = "CREATE_SERVICE_ACTIVITY_SUCCESS";
export const UPDATE_SERVICE_ACTIVITY_SUCCESS = "UPDATE_SERVICE_ACTIVITY_SUCCESS";
export const DELETE_SERVICE_ACTIVITY_SUCCESS = "DELETE_SERVICE_ACTIVITY_SUCCESS";
export const CREATE_SERVICE_ACTIVITIES_REQUEST = "CREATE_SERVICE_ACTIVITIES_REQUEST";
export const CREATE_SERVICE_ACTIVITIES_SUCCESS = "CREATE_SERVICE_ACTIVITIES_SUCCESS";
export const CREATE_SERVICE_ACTIVITIES_FAILURE = "CREATE_SERVICE_ACTIVITIES_FAILURE";
export const SERVICE_ACTIVITY_ERROR = "SERVICE_ACTIVITY_ERROR";
export const CLEAR_SERVICE_ACTIVITY_SUCCESS_MESSAGE = "CLEAR_SERVICE_ACTIVITY_SUCCESS_MESSAGE";

// Auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token
    ? { headers: { Authorization: `Bearer ${token.trim()}`, "Content-Type": "application/json" } }
    : {};
};

// Fetch service activities
export const fetchServiceActivities = (
  page = "",
  limit = "",
  search = "",
  showStatus = "",
  serviceCategoryId = "",
  subServiceId = ""
) => async (dispatch) => {
  dispatch({ type: FETCH_SERVICE_ACTIVITIES_REQUEST });
  try {
    const response = await axios.post(
      `${BASE_URL}/activity/list`,
      { page, limit, search, showStatus, serviceCategoryId, subServiceId },
      getAuthHeaders()
    );

    if (response.data.status) {
      dispatch({
        type: FETCH_SERVICE_ACTIVITIES_SUCCESS,
        payload: {
          activities: response.data.data.activities || [],
          totalPages: response.data.data.totalPages,
          currentPage: response.data.data.currentPage,
        },
      });
    } else {
      dispatch({ type: FETCH_SERVICE_ACTIVITIES_FAILURE, payload: response.data.message });
      throw new Error(response.data.message);
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: FETCH_SERVICE_ACTIVITIES_FAILURE, payload: message });
    throw new Error(message);
  }
};

// Create service activity with validation
export const createServiceActivities = (data) => async (dispatch) => {
  dispatch({ type: CREATE_SERVICE_ACTIVITIES_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/activity/create`, data, getAuthHeaders());

    if (response.data.status) {
      dispatch({ type: CREATE_SERVICE_ACTIVITIES_SUCCESS, payload: response.data.data });
      return response.data.data;
    } else {
      const errorMsg = response.data.message || "Something went wrong";
      dispatch({ type: CREATE_SERVICE_ACTIVITIES_FAILURE, payload: errorMsg });
      throw new Error(errorMsg);
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: CREATE_SERVICE_ACTIVITIES_FAILURE, payload: message });
    throw new Error(message);
  }
};

// Update service activity with validation
export const updateServiceActivity = (activityData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/activity/update/${activityData.id}`,
      activityData,
      getAuthHeaders()
    );

    if (response.data.status) {
      dispatch({
        type: UPDATE_SERVICE_ACTIVITY_SUCCESS,
        payload: response.data.data,
      });
      return response.data; // full response with message
    } else {
      const errorMsg = response.data.message || "Validation error";
      dispatch({ type: SERVICE_ACTIVITY_ERROR, payload: errorMsg });
      throw new Error(errorMsg);
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: SERVICE_ACTIVITY_ERROR, payload: message });
    throw new Error(message);
  }
};

// Delete service activity
export const deleteServiceActivity = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${BASE_URL}/activity/delete/${id}`, getAuthHeaders());

    if (response.data.status) {
      dispatch({ type: DELETE_SERVICE_ACTIVITY_SUCCESS, payload: id });
      return response.data.message || "Deleted successfully";
    } else {
      const errorMsg = response.data.message || "Delete failed";
      dispatch({ type: SERVICE_ACTIVITY_ERROR, payload: errorMsg });
      throw new Error(errorMsg);
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: SERVICE_ACTIVITY_ERROR, payload: message });
    throw new Error(message);
  }
};

// Clear success message
export const clearServiceActivitySuccessMessage = () => ({
  type: CLEAR_SERVICE_ACTIVITY_SUCCESS_MESSAGE,
});
