import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const LEAD_HISTORY_REQUEST = "LEAD_HISTORY_REQUEST";
export const LEAD_HISTORY_SUCCESS = "LEAD_HISTORY_SUCCESS";
export const LEAD_HISTORY_FAIL = "LEAD_HISTORY_FAIL";
export const UPDATE_LEAD_HISTORY_REQUEST = "UPDATE_LEAD_HISTORY_REQUEST";
export const UPDATE_LEAD_HISTORY_SUCCESS = "UPDATE_LEAD_HISTORY_SUCCESS";
export const UPDATE_LEAD_HISTORY_FAIL = "UPDATE_LEAD_HISTORY_FAIL";
export const RESET_UPDATE_LEAD_HISTORY = "RESET_UPDATE_LEAD_HISTORY";
export const FETCH_LEAD_HISTORY_REQUEST = "FETCH_LEAD_HISTORY_REQUEST";
export const FETCH_LEAD_HISTORY_SUCCESS = "FETCH_LEAD_HISTORY_SUCCESS";
export const FETCH_LEAD_HISTORY_FAILURE = "FETCH_LEAD_HISTORY_FAILURE";


// -------- LIST LEAD HISTORY --------
export const fetchLeadHistory = (filters) => async (dispatch) => {
  dispatch({ type: LEAD_HISTORY_REQUEST });
  try {
    const res = await axios.post(`${BASE_URL}/leadHistory/list`, filters, getAuthHeaders());
    if (res.data.status) {
      dispatch({
        type: LEAD_HISTORY_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: LEAD_HISTORY_FAIL,
        payload: res.data.message || "Failed to fetch lead history",
      });
    }
  } catch (err) {
    dispatch({
      type: LEAD_HISTORY_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// -------- UPDATE LEAD HISTORY --------
export const updateLeadHistory = (id, leadData) => async (dispatch) => {
  dispatch({ type: UPDATE_LEAD_HISTORY_REQUEST });
  try {
    const res = await axios.patch(`${BASE_URL}/leadHistory/update/${id}`, leadData, getAuthHeaders(false));
    if (res.data.status) {
      dispatch({
        type: UPDATE_LEAD_HISTORY_SUCCESS,
        payload: res.data.message,
      });
      toast.success(res?.data.message);
    } else {
      dispatch({
        type: UPDATE_LEAD_HISTORY_FAIL,
        payload: res.data.message || "Failed to update lead history",
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_LEAD_HISTORY_FAIL,
      payload: err.response?.data?.message || err.message,
    });
    toast.error(err.response.data.message);
  }
};

// -------- RESET --------
export const resetUpdateLeadHistory = () => ({
  type: RESET_UPDATE_LEAD_HISTORY,
});

export const fetchLeadHistoryAll = (leadId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LEAD_HISTORY_REQUEST });
    const response = await axios.post( `${BASE_URL}/leadHistory/history`, { leadId }, getAuthHeaders());
    dispatch({
      type: FETCH_LEAD_HISTORY_SUCCESS,
      payload: response.data.data.leadHistories || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_LEAD_HISTORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};