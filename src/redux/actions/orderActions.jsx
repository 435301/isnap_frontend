import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST } from "./productActions";
import { FETCH_REPORTS_SUCCESS } from "./adminProductsAction";
import { toast } from "react-toastify";

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

export const PRODUCT_DATA_REQUEST = "PRODUCT_DATA_REQUEST";
export const PRODUCT_DATA_SUCCESS = "PRODUCT_DATA_SUCCESS";
export const PRODUCT_DATA_FAILURE = "PRODUCT_DATA_FAILURE";

export const FETCH_SUB_ORDERS_REQUEST = "FETCH_SUB_ORDERS_REQUEST";
export const FETCH_SUB_ORDERS_SUCCESS = "FETCH_SUB_ORDERS_SUCCESS";
export const FETCH_SUB_ORDERS_FAILURE = "FETCH_SUB_ORDERS_FAILURE";

export const ADD_SUB_ORDER_REQUEST = "ADD_SUB_ORDER_REQUEST";
export const ADD_SUB_ORDER_SUCCESS = "ADD_SUB_ORDER_SUCCESS";
export const ADD_SUB_ORDER_FAILURE = "ADD_SUB_ORDER_FAILURE";

export const EDIT_SUB_ORDER_REQUEST = "EDIT_SUB_ORDER_REQUEST";
export const EDIT_SUB_ORDER_SUCCESS = "EDIT_SUB_ORDER_SUCCESS";
export const EDIT_SUB_ORDER_FAILURE = "EDIT_SUB_ORDER_FAILURE";

export const DELETE_SUB_ORDER_REQUEST = "DELETE_SUB_ORDER_REQUEST";
export const DELETE_SUB_ORDER_SUCCESS = "DELETE_SUB_ORDER_SUCCESS";
export const DELETE_SUB_ORDER_FAILURE = "DELETE_SUB_ORDER_FAILURE";

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
    toast.success(res.data.message)
  } catch (error) {
    dispatch({
      type: ADD_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to add order",
    });
    toast.error(error.response?.data?.message )
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
    toast.success(res.data.message || "Order updated succesfully")
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to update order",
    });
    toast.error(error.response.data.message);
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
       toast.success(res.data.message || "Order deleted succesfully")
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to delete order",
    });
     toast.error(error.response.data.message);
  }
};

//product data 
export const fetchProductData = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DATA_REQUEST });

  try {
    const res = await axios.get(`${BASE_URL}/suborder/productData/${productId}`, getAuthHeaders());
    dispatch({
      type: PRODUCT_DATA_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DATA_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch product data",
    });
    toast.error(error.response.data.message || "Product not found")
  }
};

//get sub orders 
export const fetchSubOrders= (filters) => async (dispatch) => {
  dispatch({ type: FETCH_SUB_ORDERS_REQUEST });
  try {
    const res = await axios.post(`${BASE_URL}/suborder/getSuborders`,filters, getAuthHeaders());
    dispatch({
      type: FETCH_SUB_ORDERS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SUB_ORDERS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch sub orders",
    });
  }
};

export const addSubOrder = (payload) => async (dispatch) => {
  dispatch({ type: ADD_SUB_ORDER_REQUEST });

  try {
    const res = await axios.post(`${BASE_URL}/suborder/addSuborder`, payload, getAuthHeaders(false));
    dispatch({
      type: ADD_SUB_ORDER_SUCCESS,
      payload: res.data.message,
    });
    toast.success(res.data.message|| "Suborder added successfully")
  } catch (error) {
    dispatch({
      type: ADD_SUB_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to add sub order",
    });
    toast.error(error.response.data.message || "Failed to add sub order")
  }
};


export const editSubOrder = (payload, id) => async (dispatch) => {
  dispatch({ type: EDIT_SUB_ORDER_REQUEST });

  try {
    const res = await axios.put(`${BASE_URL}/suborder/editSuborder/${id}`, payload, getAuthHeaders(false));
    dispatch({
      type: EDIT_SUB_ORDER_SUCCESS,
      payload: res.data.message,
    });
    toast.success(res.data.message|| "Suborder edited successfully")
  } catch (error) {
    dispatch({
      type: EDIT_SUB_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to edit sub order",
    });
    toast.error(error.response.data.message || "Failed to edit sub order")
  }
};

export const deleteSubOrder = ( id) => async (dispatch) => {
  dispatch({ type: DELETE_SUB_ORDER_REQUEST });
  try {
    const res = await axios.delete(`${BASE_URL}/suborder/deleteSuborder/${id}`, getAuthHeaders());
    dispatch({
      type: DELETE_SUB_ORDER_SUCCESS,
      payload: res.data.message,
    });
    toast.success(res.data.message|| "Suborder deleted successfully")
  } catch (error) {
    dispatch({
      type: DELETE_SUB_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to delete sub order",
    });
    toast.error(error.response.data.message || "Failed to delete sub order")
  }
};
