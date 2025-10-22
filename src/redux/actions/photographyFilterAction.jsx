// actions/activityActions.js
import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";

export const FETCH_LIFESTYLE_ACTIVITIES_REQUEST = "FETCH_LIFESTYLE_ACTIVITIES_REQUEST";
export const FETCH_LIFESTYLE_ACTIVITIES_SUCCESS = "FETCH_LIFESTYLE_ACTIVITIES_SUCCESS";
export const FETCH_LIFESTYLE_ACTIVITIES_FAILURE = "FETCH_LIFESTYLE_ACTIVITIES_FAILURE";

export const FETCH_MODEL_ACTIVITIES_REQUEST = "FETCH_MODEL_ACTIVITIES_REQUEST";
export const FETCH_MODEL_ACTIVITIES_SUCCESS = "FETCH_MODEL_ACTIVITIES_SUCCESS";
export const FETCH_MODEL_ACTIVITIES_FAILURE = "FETCH_MODEL_ACTIVITIES_FAILURE";

export const fetchLifestyleActivities = () => async (dispatch) => {
  dispatch({ type: FETCH_LIFESTYLE_ACTIVITIES_REQUEST });
  try {
    const body = {
      page: "",
      search: "",
      serviceCategoryId: "",
      subServiceId: "",
      showStatus: "",
    };

    const response = await axios.post(`${BASE_URL}/activity/list`, body, getAuthHeaders());

    dispatch({
      type: FETCH_LIFESTYLE_ACTIVITIES_SUCCESS,
      payload: response.data.data.activities || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_LIFESTYLE_ACTIVITIES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const fetchModelActivities = () => async (dispatch) => {
  dispatch({ type: FETCH_MODEL_ACTIVITIES_REQUEST });
  try {
    const body = {
      page: "",
      search: "",
      serviceCategoryId: "",
      subServiceId: "",
      showStatus: "",
    };

    const response = await axios.post(`${BASE_URL}/activity/list`, body, getAuthHeaders());

    dispatch({
      type: FETCH_MODEL_ACTIVITIES_SUCCESS,
      payload: response.data.data.activities || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_MODEL_ACTIVITIES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
