import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

export const ADD_ORDER_REQUEST = "ADD_ORDER_REQUEST";
export const ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS";
export const ADD_ORDER_FAILURE = "ADD_ORDER_FAILURE";

export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_FAILURE = "UPDATE_ORDER_FAILURE";

export const DELETE_ORDER_REQUEST = "DELETE_ORDER_REQUEST";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const DELETE_ORDER_FAILURE = "DELETE_ORDER_FAILURE";


/* ================= FETCH ORDERS ================= */
export const fetchOrders = (filters) => async (dispatch) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  try {
    const res = await axios.post(`${BASE_URL}/order/getOrders`, filters, getAuthHeaders());
    dispatch({
      type: FETCH_ORDERS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch orders",
    });
  }
};

/* ================= ADD ORDER ================= */
export const addOrder = (payload) => async (dispatch) => {
  dispatch({ type: ADD_ORDER_REQUEST });

  try {
    const res = await axios.post(`${BASE_URL}/order/addOrder`, payload, getAuthHeaders(false));
    dispatch({
      type: ADD_ORDER_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: ADD_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to add order",
    });
  }
};

/* ================= UPDATE ORDER ================= */
export const updateOrder = (id, payload) => async (dispatch) => {
  dispatch({ type: UPDATE_ORDER_REQUEST });

  try {
    const res = await axios.put(`${BASE_URL}/order/editOrder/${id}`, payload, getAuthHeaders(false));
    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to update order",
    });
  }
};

/* ================= DELETE ORDER ================= */
export const deleteOrder = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });

  try {
    const res = await axios.delete(`${BASE_URL}/order/deleteOrder/${id}`, getAuthHeaders());
    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to delete order",
    });
  }
};