import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";

// ------------------------ CONSTANTS ------------------------
export const FETCH_SUBSERVICES_REQUEST = "FETCH_SUBSERVICES_REQUEST";
export const FETCH_SUBSERVICES_SUCCESS = "FETCH_SUBSERVICES_SUCCESS";
export const FETCH_SUBSERVICES_FAILURE = "FETCH_SUBSERVICES_FAILURE";

export const CREATE_SUBSERVICES_REQUEST = "CREATE_SUBSERVICES_REQUEST";
export const CREATE_SUBSERVICES_SUCCESS = "CREATE_SUBSERVICES_SUCCESS";
export const CREATE_SUBSERVICES_FAILURE = "CREATE_SUBSERVICES_FAILURE";

export const UPDATE_SUBSERVICES_REQUEST = "UPDATE_SUBSERVICES_REQUEST";
export const UPDATE_SUBSERVICES_SUCCESS = "UPDATE_SUBSERVICES_SUCCESS";
export const UPDATE_SUBSERVICES_FAILURE = "UPDATE_SUBSERVICES_FAILURE";

export const DELETE_SUBSERVICES_REQUEST = "DELETE_SUBSERVICES_REQUEST";
export const DELETE_SUBSERVICES_SUCCESS = "DELETE_SUBSERVICES_SUCCESS";
export const DELETE_SUBSERVICES_FAILURE = "DELETE_SUBSERVICES_FAILURE";

// ------------------------ CREATE ------------------------
export const createSubServices = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_SUBSERVICES_REQUEST });
  try {
    const response = await axios.post(
      `${BASE_URL}/subService/create`,
      payload,
      getAuthHeaders(false)
    );

    if (response.data.status) {
      dispatch({
        type: CREATE_SUBSERVICES_SUCCESS,
        payload: response.data.data,
      });
      return response.data; // allow chaining in component
    } else {
      dispatch({
        type: CREATE_SUBSERVICES_FAILURE,
        payload: response.data.message,
      });
      throw new Error(response.data.message); // important: throw to trigger .catch()
    }
  } catch (error) {
    dispatch({
      type: CREATE_SUBSERVICES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error; // re-throw to handle in component
  }
};
// ------------------------ FETCH ------------------------
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
    dispatch({ type: FETCH_SUBSERVICES_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// ------------------------ FETCH BY CATEGORY ------------------------
export const fetchSubServicesByCategory = (serviceCategoryId) => async (dispatch) => {
  dispatch({ type: FETCH_SUBSERVICES_REQUEST });
  try {
    const payload = { page: 1, search: "", serviceCategoryId, showStatus: "" };
    const response = await axios.post(`${BASE_URL}/subService/list`, payload, getAuthHeaders());
    if (response.data.status) {
      dispatch({ type: FETCH_SUBSERVICES_SUCCESS, payload: response.data.data });
      return response.data.data; // return for component usage
    } else {
      dispatch({ type: FETCH_SUBSERVICES_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({ type: FETCH_SUBSERVICES_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// ------------------------ UPDATE ------------------------
export const updateSubService = (id, payload) => async (dispatch) => {
  dispatch({ type: UPDATE_SUBSERVICES_REQUEST });
  try {
    const response = await axios.put(`${BASE_URL}/subService/update/${id}`, payload, getAuthHeaders(false));
    if (response.data.status) {
      dispatch({ type: UPDATE_SUBSERVICES_SUCCESS, payload: response.data.data });
    } else {
      dispatch({ type: UPDATE_SUBSERVICES_FAILURE, payload: response.data.msg });
    }
  } catch (error) {
    dispatch({ type: UPDATE_SUBSERVICES_FAILURE, payload: error.message });
  }
};

// ------------------------ DELETE ------------------------
export const deleteSubService = (id) => async (dispatch) => {
  dispatch({ type: DELETE_SUBSERVICES_REQUEST });
  try {
    const response = await axios.delete(`${BASE_URL}/subService/delete/${id}`, getAuthHeaders());
    if (response.data.status) {
      dispatch({ type: DELETE_SUBSERVICES_SUCCESS, payload: id });
    } else {
      dispatch({ type: DELETE_SUBSERVICES_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({ type: DELETE_SUBSERVICES_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// ------------------------ EXPORT ------------------------
