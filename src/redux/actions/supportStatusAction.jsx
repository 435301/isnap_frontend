import { toast } from "react-toastify";
import BASE_URL from "../../config/config";
import axios from "axios";
import getAuthHeaders from "../../utils/auth";

export const CREATE_SUPPORT_STATUS_REQUEST = "CREATE_SUPPORT_STATUS_REQUEST";
export const CREATE_SUPPORT_STATUS_SUCCESS = "CREATE_SUPPORT_STATUS_SUCCESS";
export const CREATE_SUPPORT_STATUS_FAILURE = "CREATE_SUPPORT_STATUS_FAILURE";

export const FETCH_SUPPORT_STATUSS_REQUEST = "FETCH_SUPPORT_STATUSS_REQUEST";
export const FETCH_SUPPORT_STATUSS_SUCCESS = "FETCH_SUPPORT_STATUSS_SUCCESS";
export const FETCH_SUPPORT_STATUSS_FAILURE = "FETCH_SUPPORT_STATUSS_FAILURE";

export const FETCH_SUPPORT_STATUS_BY_ID_REQUEST = "FETCH_SUPPORT_STATUS_BY_ID_REQUEST";
export const FETCH_SUPPORT_STATUS_BY_ID_SUCCESS = "FETCH_SUPPORT_STATUS_BY_ID_SUCCESS";
export const FETCH_SUPPORT_STATUS_BY_ID_FAILURE = "FETCH_SUPPORT_STATUS_BY_ID_FAILURE";

export const UPDATE_SUPPORT_STATUS_REQUEST = "UPDATE_SUPPORT_STATUS_REQUEST";
export const UPDATE_SUPPORT_STATUS_SUCCESS = "UPDATE_SUPPORT_STATUS_SUCCESS";
export const UPDATE_SUPPORT_STATUS_FAILURE = "UPDATE_SUPPORT_STATUS_FAILURE";

export const DELETE_SUPPORT_STATUS_REQUEST = "DELETE_SUPPORT_STATUS_REQUEST";
export const DELETE_SUPPORT_STATUS_SUCCESS = "DELETE_SUPPORT_STATUS_SUCCESS";
export const DELETE_SUPPORT_STATUS_FAILURE = "DELETE_SUPPORT_STATUS_FAILURE";


// Create SUPPORT_STATUS
export const createSupportStatus = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_SUPPORT_STATUS_REQUEST });
  try {
    const  res  = await axios.post(
      `${BASE_URL}/supportStatus/create`, payload, getAuthHeaders(false)
    );
    dispatch({
      type: CREATE_SUPPORT_STATUS_SUCCESS,
      payload: res.data.message,
    });
    toast.success(res.data.message);
    return res;
  } catch (error) {
    dispatch({
      type: CREATE_SUPPORT_STATUS_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};

//  Fetch all SUPPORT_STATUSs
export const fetchSupportStatus = (filters) => async (dispatch) => {
  dispatch({ type: FETCH_SUPPORT_STATUSS_REQUEST });
  try {
    const  res  = await axios.post(`${BASE_URL}/supportStatus/list`, filters, getAuthHeaders() );
    dispatch({
      type: FETCH_SUPPORT_STATUSS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SUPPORT_STATUSS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch support status",
    });
  }
};

//  Fetch Single SUPPORT_STATUS by ID
export const fetchSupportStatusById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_SUPPORT_STATUS_BY_ID_REQUEST });
  try {
    const res  = await axios.get(`${BASE_URL}/supportStatus/${id}`, getAuthHeaders());
    dispatch({
      type: FETCH_SUPPORT_STATUS_BY_ID_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SUPPORT_STATUS_BY_ID_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch issue types",
    });
  }
};

//  Update SUPPORT_STATUS
export const updateSupportStatus = (id, payload) => async (dispatch) => {
  dispatch({ type: UPDATE_SUPPORT_STATUS_REQUEST });
  try {
    const res  = await axios.put( `${BASE_URL}/supportStatus/update/${id}`, payload, getAuthHeaders(false) );
    dispatch({
      type: UPDATE_SUPPORT_STATUS_SUCCESS,
      payload: res.data.message,
    });
    toast.success(res.data.message);
    return res;
  } catch (error) {
    dispatch({
      type: UPDATE_SUPPORT_STATUS_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};

//  Delete SUPPORT_STATUS
export const deleteSupportStatus = (id) => async (dispatch) => {
  dispatch({ type: DELETE_SUPPORT_STATUS_REQUEST });
  try {
    const res = await axios.delete(`${BASE_URL}/supportStatus/delete/${id}`, getAuthHeaders());
    dispatch({
      type: DELETE_SUPPORT_STATUS_SUCCESS,
      payload: id,
    });
    toast.success(res.message || "support status deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_SUPPORT_STATUS_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};
