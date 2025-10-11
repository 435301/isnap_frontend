import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";
import getSellerAuthHeaders from "../../utils/sellerAuth";

export const UPDATE_MOU_STATUS_REQUEST = "UPDATE_MOU_STATUS_REQUEST";
export const UPDATE_MOU_STATUS_SUCCESS = "UPDATE_MOU_STATUS_SUCCESS";
export const UPDATE_MOU_STATUS_FAILURE = "UPDATE_MOU_STATUS_FAILURE";

// src/redux/mou/actionTypes.js
export const FETCH_MOU_REQUEST = "FETCH_MOU_REQUEST";
export const FETCH_MOU_SUCCESS = "FETCH_MOU_SUCCESS";
export const FETCH_MOU_FAILURE = "FETCH_MOU_FAILURE";


export const updateMouStatus = (id, mouStatus,ipAddress) => async (dispatch) => {
  dispatch({ type: UPDATE_MOU_STATUS_REQUEST });

  try {
    const response = await axios.post(`${BASE_URL}/mou/mouStatus`, { id, mouStatus ,ipAddress}, getSellerAuthHeaders(false));
    
    if (response.data.status) {
      dispatch({
        type: UPDATE_MOU_STATUS_SUCCESS,
        payload: response.data.data, // { mouStatus: 1 }
      });
      toast.success(response?.message || "MOU Status updated successfully")
    } else {
      dispatch({
        type: UPDATE_MOU_STATUS_FAILURE,
        payload: response.data.message || "Failed to update MOU status",
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_MOU_STATUS_FAILURE,
      payload: error.message || "Something went wrong",
    });
    toast.error(error?.response.data.message || "Failed to update MOU status");
  }
};


export const fetchMouDetails = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MOU_REQUEST });

    try {
      const response = await axios.get(`${BASE_URL}/mou` , getSellerAuthHeaders()); 
      if (response.data.status) {
        dispatch({
          type: FETCH_MOU_SUCCESS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: FETCH_MOU_FAILURE,
          payload: response.data.message || "Failed to fetch MOU details",
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_MOU_FAILURE,
        payload: error.message || "Something went wrong",
      });
    }
  };
};