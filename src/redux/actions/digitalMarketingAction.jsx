import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const CREATE_DIGITAL_MARKETING_REQUEST = "CREATE_DIGITAL_MARKETING_REQUEST";
export const CREATE_DIGITAL_MARKETING_SUCCESS = "CREATE_DIGITAL_MARKETING_SUCCESS";
export const CREATE_DIGITAL_MARKETING_FAILURE = "CREATE_DIGITAL_MARKETING_FAILURE";

export const FETCH_DIGITAL_MARKETING_REQUEST = "FETCH_DIGITAL_MARKETING_REQUEST";
export const FETCH_DIGITAL_MARKETING_SUCCESS = "FETCH_DIGITAL_MARKETING_SUCCESS";
export const FETCH_DIGITAL_MARKETING_FAILURE = "FETCH_DIGITAL_MARKETING_FAILURE";

export const createDigitalMarketing = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_DIGITAL_MARKETING_REQUEST });

  try {
    const response = await axios.post(`${BASE_URL}/digitalMarketing/create`, payload, getAuthHeaders(false));

    dispatch({
      type: CREATE_DIGITAL_MARKETING_SUCCESS,
      payload: response.data.data,
    });
    toast.success(response?.data?.message || "Digital Marketing created successfully");
    return response.data.data;
  } catch (error) {
    dispatch({
      type: CREATE_DIGITAL_MARKETING_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Failed to create Digital Marketing");
    throw error;
  }
};

export const fetchDigitalMarketingByBusinessId = (businessId) => async (dispatch) => {
  dispatch({ type: FETCH_DIGITAL_MARKETING_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/digitalMarketing/list/${businessId}`, getAuthHeaders());
    dispatch({
      type: FETCH_DIGITAL_MARKETING_SUCCESS,
      payload: response.data.data, 
    });
    return response.data; 
  } catch (error) {
    if (error.response?.status === 404) {
    dispatch(resetDigitalMarketing());
    return null;
  }
    dispatch({
      type: FETCH_DIGITAL_MARKETING_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const resetDigitalMarketing = () => ({ type: "RESET_DIGITAL_MARKETING" });