import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";

export const CREATE_SUBSCRIPTION_REQUEST = "CREATE_SUBSCRIPTION_REQUEST";
export const CREATE_SUBSCRIPTION_SUCCESS = "CREATE_SUBSCRIPTION_SUCCESS";
export const CREATE_SUBSCRIPTION_FAILURE = "CREATE_SUBSCRIPTION_FAILURE";

export const DELETE_SUBSCRIPTION_REQUEST = "DELETE_SUBSCRIPTION_REQUEST";
export const DELETE_SUBSCRIPTION_SUCCESS = "DELETE_SUBSCRIPTION_SUCCESS";
export const DELETE_SUBSCRIPTION_FAILURE = "DELETE_SUBSCRIPTION_FAILURE";

export const CREATE_KEYACCOUNT_COMMISSION_REQUEST = "CREATE_KEYACCOUNT_COMMISSION_REQUEST";
export const CREATE_KEYACCOUNT_COMMISSION_SUCCESS = "CREATE_KEYACCOUNT_COMMISSION_SUCCESS";
export const CREATE_KEYACCOUNT_COMMISSION_FAILURE = "CREATE_KEYACCOUNT_COMMISSION_FAILURE";

export const FETCH_KEY_ACCOUNT_COMMISSION_REQUEST = "FETCH_KEY_ACCOUNT_COMMISSION_REQUEST";
export const FETCH_KEY_ACCOUNT_COMMISSION_SUCCESS = "FETCH_KEY_ACCOUNT_COMMISSION_SUCCESS";
export const FETCH_KEY_ACCOUNT_COMMISSION_FAILURE = "FETCH_KEY_ACCOUNT_COMMISSION_FAILURE";

export const FETCH_KEYACCOUNT_SUBSCRIPTION_REQUEST = "FETCH_KEYACCOUNT_SUBSCRIPTION_REQUEST";
export const FETCH_KEYACCOUNT_SUBSCRIPTION_SUCCESS = "FETCH_KEYACCOUNT_SUBSCRIPTION_SUCCESS";
export const FETCH_KEYACCOUNT_SUBSCRIPTION_FAILURE = "FETCH_KEYACCOUNT_SUBSCRIPTION_FAILURE";


export const createSubscription = (subscriptionData) => async (dispatch) => {
  dispatch({ type: CREATE_SUBSCRIPTION_REQUEST });
  try {
    const res = await axios.post(
      `${BASE_URL}/keyAccountSubscription/create`,
      subscriptionData,
      getAuthHeaders(false)
    );

    if (res.data.status) {
      dispatch({
        type: CREATE_SUBSCRIPTION_SUCCESS,
        payload: res?.data?.data,
      });
      toast.success(res?.data?.message || "Subscription created successfully");
    } else {
      dispatch({
        type: CREATE_SUBSCRIPTION_FAILURE,
        payload: res.data.message,
      });
      toast.error(res?.data?.message || "Failed to create subscription");
    }
  } catch (error) {
    dispatch({
      type: CREATE_SUBSCRIPTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Error creating subscription");
  }
};


export const deleteSubscription = (id) => async (dispatch) => {
  dispatch({ type: DELETE_SUBSCRIPTION_REQUEST });
  try {
    const res = await axios.delete(
      `${BASE_URL}/keyAccountSubscription/delete/${id}`,
      getAuthHeaders()
    );

    if (res.data.status) {
      dispatch({
        type: DELETE_SUBSCRIPTION_SUCCESS,
        payload: id,
      });
      toast.success(res?.data?.message || "Subscription deleted successfully");
    } else {
      dispatch({
        type: DELETE_SUBSCRIPTION_FAILURE,
        payload: res?.data?.message,
      });
      toast.error(res?.data?.message || "Failed to delete subscription");
    }
  } catch (error) {
    dispatch({
      type: DELETE_SUBSCRIPTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Error deleting subscription");
  }
};


export const createKeyAccountCommission = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_KEYACCOUNT_COMMISSION_REQUEST });

  try {
    const response = await axios.post(
      `${BASE_URL}/keyAccountCommission/create`,
      payload,
      getAuthHeaders(false)
    );

    dispatch({
      type: CREATE_KEYACCOUNT_COMMISSION_SUCCESS,
      payload: response.data.data, // contains commissions[], security{}, total
    });
   toast.success(response?.data.message || "Commissions saved successfully");
    return response.data.data;
  } catch (error) {
    dispatch({
      type: CREATE_KEYACCOUNT_COMMISSION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Error saving commissions");
    throw error;
  }
};

export const fetchKeyAccountCommission = (businessId, serviceTypeId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_KEY_ACCOUNT_COMMISSION_REQUEST });

    const response = await axios.get(
      `${BASE_URL}/keyAccountCommission/list/${businessId}/${serviceTypeId}`,getAuthHeaders(false)
    );
    if (response.data.status) {
      dispatch({
        type: FETCH_KEY_ACCOUNT_COMMISSION_SUCCESS,
        payload: response.data.data, // contains commissions[] + security{}
      });
    } else {
      dispatch({
        type: FETCH_KEY_ACCOUNT_COMMISSION_FAILURE,
        payload: response.data.message || "Failed to fetch commissions",
      });
      toast.error(response.data.message || "Failed to fetch commissions");
    }
  } catch (error) {
    dispatch({
      type: FETCH_KEY_ACCOUNT_COMMISSION_FAILURE,
      payload: error.message || "Something went wrong",
    });
  }
};

export const fetchKeyAccountSubscription = (businessId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_KEYACCOUNT_SUBSCRIPTION_REQUEST });
    try {
      const response = await axios.get(`${BASE_URL}/keyAccountSubscription/list/${businessId}`,getAuthHeaders());
      if (response.data.status) {
        dispatch({
          type: FETCH_KEYACCOUNT_SUBSCRIPTION_SUCCESS,
          payload: response.data.data, 
        });
      } else {
        dispatch({
          type: FETCH_KEYACCOUNT_SUBSCRIPTION_FAILURE,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_KEYACCOUNT_SUBSCRIPTION_FAILURE,
        payload: error.message,
      });
    }
  };
};