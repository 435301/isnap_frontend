import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";

// src/redux/constants/subServiceConstants.js
export const FETCH_SUBSERVICES_REQUEST = "FETCH_SUBSERVICES_REQUEST";
export const FETCH_SUBSERVICES_SUCCESS = "FETCH_SUBSERVICES_SUCCESS";
export const FETCH_SUBSERVICES_FAILURE = "FETCH_SUBSERVICES_FAILURE";

export const CREATE_SUBSERVICES_REQUEST = "CREATE_SUBSERVICES_REQUEST";
export const CREATE_SUBSERVICES_SUCCESS = "CREATE_SUBSERVICES_SUCCESS";
export const CREATE_SUBSERVICES_FAILURE = "CREATE_SUBSERVICES_FAILURE";


//  Create SubService
export const createSubServices = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_SUBSERVICES_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/subService/create`, payload, getAuthHeaders(false));
    if (response.data.status) {
      dispatch({ type: CREATE_SUBSERVICES_SUCCESS, payload: response.data.data });
    } else {
      dispatch({ type: CREATE_SUBSERVICES_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({
      type: CREATE_SUBSERVICES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// Fetch SubServices
export const fetchSubServices = (payload = { page: 1, search: "", serviceCategoryId: "", showStatus: "" }) => async (dispatch) => {
  dispatch({ type: FETCH_SUBSERVICES_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/subService/list`, payload, getAuthHeaders());
    if (response.data.status) {
      dispatch({ type: FETCH_SUBSERVICES_SUCCESS, payload: response.data.data });
    } else {
      dispatch({ type: FETCH_SUBSERVICES_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({
      type: FETCH_SUBSERVICES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
