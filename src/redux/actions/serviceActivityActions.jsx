import axios from "axios";
import BASE_URL from "../../config/config";

// ------------------------ ACTION TYPES ------------------------
export const FETCH_SERVICE_ACTIVITIES_REQUEST = "FETCH_SERVICE_ACTIVITIES_REQUEST";
export const FETCH_SERVICE_ACTIVITIES_SUCCESS = "FETCH_SERVICE_ACTIVITIES_SUCCESS";
export const FETCH_SERVICE_ACTIVITIES_FAILURE = "FETCH_SERVICE_ACTIVITIES_FAILURE";

export const CREATE_SERVICE_ACTIVITY_SUCCESS = "CREATE_SERVICE_ACTIVITY_SUCCESS";
export const UPDATE_SERVICE_ACTIVITY_SUCCESS = "UPDATE_SERVICE_ACTIVITY_SUCCESS";
export const DELETE_SERVICE_ACTIVITY_SUCCESS = "DELETE_SERVICE_ACTIVITY_SUCCESS";

export const SERVICE_ACTIVITY_ERROR = "SERVICE_ACTIVITY_ERROR";
export const CLEAR_SERVICE_ACTIVITY_SUCCESS_MESSAGE = "CLEAR_SERVICE_ACTIVITY_SUCCESS_MESSAGE";

// ------------------------ AUTH HEADERS ------------------------
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token
    ? { headers: { Authorization: `Bearer ${token.trim()}`, "Content-Type": "application/json" } }
    : {};
};

// ------------------------ FETCH SERVICE ACTIVITIES ------------------------
export const fetchServiceActivities = (page = 1, limit = 10, search = "", status = "") => async (dispatch) => {
  dispatch({ type: FETCH_SERVICE_ACTIVITIES_REQUEST });
  try {
    const validStatus = status === 0 || status === 1 ? status : "";

    const response = await axios.post(
      `${BASE_URL}/activity/list`,
      { page, limit, search, showStatus: validStatus },
      getAuthHeaders()
    );

    if (response.data.status) {
      const { activities, totalPages, currentPage } = response.data.data || {};
      const mappedActivities = (activities || []).map((a) => ({
        ...a,
        status: Number(a.status), // ensure 0 or 1
      }));

      dispatch({
        type: FETCH_SERVICE_ACTIVITIES_SUCCESS,
        payload: { activities: mappedActivities, totalPages, currentPage },
      });
    } else {
      dispatch({ type: FETCH_SERVICE_ACTIVITIES_FAILURE, payload: response.data.message || "Failed to fetch activities" });
    }
  } catch (error) {
    dispatch({ type: FETCH_SERVICE_ACTIVITIES_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// ------------------------ CREATE SERVICE ACTIVITY ------------------------
export const createServiceActivity = (activityData) => async (dispatch) => {
  try {
    const payload = {
      serviceCategoryId: activityData.serviceCategoryId,
      serviceTypeId: activityData.serviceTypeId,
      activityName: activityData.activityName,
      status: Number(activityData.status),
    };

    const response = await axios.post(`${BASE_URL}/activity/create`, payload, getAuthHeaders());

    if (response.data.status) {
      const mappedActivity = { ...response.data.data, status: Number(response.data.data?.status) };
      dispatch({ type: CREATE_SERVICE_ACTIVITY_SUCCESS, payload: mappedActivity });
      return mappedActivity;
    } else {
      throw new Error(response.data.message || "Failed to create activity");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ------------------------ UPDATE SERVICE ACTIVITY ------------------------
export const updateServiceActivity = (activityData) => async (dispatch) => {
  try {
    if (!activityData.id) throw new Error("Missing ID for update");

    const payload = {
      serviceCategoryId: activityData.serviceCategoryId,
      serviceTypeId: activityData.serviceTypeId,
      activityName: activityData.activityName,
      status: Number(activityData.status),
    };

    const response = await axios.put(`${BASE_URL}/activity/update/${activityData.id}`, payload, getAuthHeaders());

    if (response.data.status || response.data.message === "Activity updated successfully") {
      const mappedActivity = { ...response.data.data, status: Number(response.data.data?.status) };
      dispatch({ type: UPDATE_SERVICE_ACTIVITY_SUCCESS, payload: mappedActivity });
      return mappedActivity;
    } else {
      dispatch({ type: SERVICE_ACTIVITY_ERROR, payload: response.data.message || "Failed to update activity" });
      throw new Error(response.data.message || "Failed to update activity");
    }
  } catch (error) {
    dispatch({ type: SERVICE_ACTIVITY_ERROR, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

// ------------------------ DELETE SERVICE ACTIVITY ------------------------
export const deleteServiceActivity = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/activity/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_SERVICE_ACTIVITY_SUCCESS, payload: id });
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    dispatch({ type: SERVICE_ACTIVITY_ERROR, payload: msg });
    throw error;
  }
};

// ------------------------ CLEAR SUCCESS MESSAGE ------------------------
export const clearServiceActivitySuccessMessage = () => ({
  type: CLEAR_SERVICE_ACTIVITY_SUCCESS_MESSAGE,
});
