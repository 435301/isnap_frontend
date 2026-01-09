import { toast } from "react-toastify";
import BASE_URL from "../../config/config";
import axios from "axios";
import getAuthHeaders from "../../utils/auth";

export const CREATE_ISSUE_TYPE_REQUEST = "CREATE_ISSUE_TYPE_REQUEST";
export const CREATE_ISSUE_TYPE_SUCCESS = "CREATE_ISSUE_TYPE_SUCCESS";
export const CREATE_ISSUE_TYPE_FAILURE = "CREATE_ISSUE_TYPE_FAILURE";

export const FETCH_ISSUE_TYPES_REQUEST = "FETCH_ISSUE_TYPES_REQUEST";
export const FETCH_ISSUE_TYPES_SUCCESS = "FETCH_ISSUE_TYPES_SUCCESS";
export const FETCH_ISSUE_TYPES_FAILURE = "FETCH_ISSUE_TYPES_FAILURE";

export const FETCH_ISSUE_TYPE_BY_ID_REQUEST = "FETCH_ISSUE_TYPE_BY_ID_REQUEST";
export const FETCH_ISSUE_TYPE_BY_ID_SUCCESS = "FETCH_ISSUE_TYPE_BY_ID_SUCCESS";
export const FETCH_ISSUE_TYPE_BY_ID_FAILURE = "FETCH_ISSUE_TYPE_BY_ID_FAILURE";

export const UPDATE_ISSUE_TYPE_REQUEST = "UPDATE_ISSUE_TYPE_REQUEST";
export const UPDATE_ISSUE_TYPE_SUCCESS = "UPDATE_ISSUE_TYPE_SUCCESS";
export const UPDATE_ISSUE_TYPE_FAILURE = "UPDATE_ISSUE_TYPE_FAILURE";

export const DELETE_ISSUE_TYPE_REQUEST = "DELETE_ISSUE_TYPE_REQUEST";
export const DELETE_ISSUE_TYPE_SUCCESS = "DELETE_ISSUE_TYPE_SUCCESS";
export const DELETE_ISSUE_TYPE_FAILURE = "DELETE_ISSUE_TYPE_FAILURE";


// Create ISSUE_TYPE
export const createIssueType = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_ISSUE_TYPE_REQUEST });
  try {
    const { data } = await axios.post(
      `${BASE_URL}/issueType/create`, payload, getAuthHeaders(false)
    );
    dispatch({
      type: CREATE_ISSUE_TYPE_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
    return data;
  } catch (error) {
    dispatch({
      type: CREATE_ISSUE_TYPE_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};

//  Fetch all ISSUE_TYPEs
export const fetchIssueType = (filters) => async (dispatch) => {
  dispatch({ type: FETCH_ISSUE_TYPES_REQUEST });
  try {
    const  data  = await axios.post(`${BASE_URL}/issueType/list`, filters, getAuthHeaders() );
    dispatch({
      type: FETCH_ISSUE_TYPES_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ISSUE_TYPES_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch issue types",
    });
  }
};

//  Fetch Single ISSUE_TYPE by ID
export const fetchIssueTypeById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ISSUE_TYPE_BY_ID_REQUEST });
  try {
    const { data } = await axios.get(`${BASE_URL}/issueType/${id}`, getAuthHeaders());
    dispatch({
      type: FETCH_ISSUE_TYPE_BY_ID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ISSUE_TYPE_BY_ID_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch issue types",
    });
  }
};

//  Update ISSUE_TYPE
export const updateIssueType = (id, payload) => async (dispatch) => {
  dispatch({ type: UPDATE_ISSUE_TYPE_REQUEST });
  try {
    const { data } = await axios.put( `${BASE_URL}/issueType/update/${id}`, payload, getAuthHeaders(false) );
    dispatch({
      type: UPDATE_ISSUE_TYPE_SUCCESS,
      payload: data.message,
    });
    toast.success(data.message);
    return data;
  } catch (error) {
    dispatch({
      type: UPDATE_ISSUE_TYPE_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};

//  Delete ISSUE_TYPE
export const deleteIssueType = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ISSUE_TYPE_REQUEST });
  try {
    const { data } = await axios.delete(`${BASE_URL}/issueType/delete/${id}`, getAuthHeaders());
    dispatch({
      type: DELETE_ISSUE_TYPE_SUCCESS,
      payload: id,
    });
    toast.success(data.message || "issue type deleted successfully");
    dispatch(fetchIssueType());
  } catch (error) {
    dispatch({
      type: DELETE_ISSUE_TYPE_FAILURE,
      payload: error.response?.data?.message,
    });
    toast.error(error.response?.data?.message);
  }
};
