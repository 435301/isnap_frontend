import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const FETCH_SELLER_ORDERS_REQUEST = "FETCH_SELLER_ORDERS_REQUEST";
export const FETCH_SELLER_ORDERS_SUCCESS = "FETCH_SELLER_ORDERS_SUCCESS";
export const FETCH_SELLER_ORDERS_FAILURE = "FETCH_SELLER_ORDERS_FAILURE";

export const ADD_SELLER_ORDER_REQUEST = "ADD_SELLER_ORDER_REQUEST";
export const ADD_SELLER_ORDER_SUCCESS = "ADD_SELLER_ORDER_SUCCESS";
export const ADD_SELLER_ORDER_FAILURE = "ADD_SELLER_ORDER_FAILURE";

export const FETCH_SELLER_SUB_ORDERS_REQUEST = "FETCH_SELLER_SUB_ORDERS_REQUEST";
export const FETCH_SELLER_SUB_ORDERS_SUCCESS = "FETCH_SELLER_SUB_ORDERS_SUCCESS";
export const FETCH_SELLER_SUB_ORDERS_FAILURE = "FETCH_SELLER_SUB_ORDERS_FAILURE";

export const FETCH_SELLER_SUB_ORDERS_BY_ID_REQUEST = "FETCH_SELLER_SUB_ORDERS_BY_ID_REQUEST";
export const FETCH_SELLER_SUB_ORDERS_BY_ID_SUCCESS = "FETCH_SELLER_SUB_ORDERS_BY_ID_SUCCESS";
export const FETCH_SELLER_SUB_ORDERS_BY_ID_FAILURE = "FETCH_SELLER_SUB_ORDERS_BY_ID_FAILURE";

export const ADD_SELLER_SUB_ORDER_REQUEST = "ADD_SELLER_SUB_ORDER_REQUEST";
export const ADD_SELLER_SUB_ORDER_SUCCESS = "ADD_SELLER_SUB_ORDER_SUCCESS";
export const ADD_SELLER_SUB_ORDER_FAILURE = "ADD_SELLER_SUB_ORDER_FAILURE";

export const EDIT_SELLER_SUB_ORDER_REQUEST = "EDIT_SELLER_SUB_ORDER_REQUEST";
export const EDIT_SELLER_SUB_ORDER_SUCCESS = "EDIT_SELLER_SUB_ORDER_SUCCESS";
export const EDIT_SELLER_SUB_ORDER_FAILURE = "EDIT_SELLER_SUB_ORDER_FAILURE";

export const DELETE_SELLER_SUB_ORDER_REQUEST = "DELETE_SELLER_SUB_ORDER_REQUEST";
export const DELETE_SELLER_SUB_ORDER_SUCCESS = "DELETE_SELLER_SUB_ORDER_SUCCESS";
export const DELETE_SELLER_SUB_ORDER_FAILURE = "DELETE_SELLER_SUB_ORDER_FAILURE";

export const PRODUCT_SELLER_DATA_REQUEST = "PRODUCT_SELLER_DATA_REQUEST";
export const PRODUCT_SELLER_DATA_SUCCESS = "PRODUCT_SELLER_DATA_SUCCESS";
export const PRODUCT_SELLER_DATA_FAILURE = "PRODUCT_SELLER_DATA_FAILURE";

export const RESET_PRODUCT_DATA = "RESET_PRODUCT_DATA";
export const fetchSellerOrders = (filters) => async (dispatch) => {
  dispatch({ type: FETCH_SELLER_ORDERS_REQUEST });

  try {
    const res = await axios.post(`${BASE_URL}/sellerOrder/getOrders`, filters, getAuthHeaders());
    dispatch({
      type: FETCH_SELLER_ORDERS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SELLER_ORDERS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch orders",
    });
  }
};

/* ================= ADD ORDER ================= */
export const addSellerOrder = (payload) => async (dispatch) => {
  dispatch({ type: ADD_SELLER_ORDER_REQUEST });

  try {
    const res = await axios.post(`${BASE_URL}/sellerOrder/addOrder`, payload, getAuthHeaders(false));
    dispatch({
      type: ADD_SELLER_ORDER_SUCCESS,
      payload: res.data.message,
    });
    toast.success(res.data.message)
  } catch (error) {
    dispatch({
      type: ADD_SELLER_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to add order",
    });
    toast.error(error.response?.data?.message )
  }
};

/* ================= FETCH SELLER SUB ORDERS ================= */

export const fetchSellerSubOrders = (filters) => async (dispatch) => {
  dispatch({ type: FETCH_SELLER_SUB_ORDERS_REQUEST });

  try {
    const res = await axios.post(
      `${BASE_URL}/sellerSuborder/getSuborders`,
      filters,
      getAuthHeaders()
    );

    dispatch({
      type: FETCH_SELLER_SUB_ORDERS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SELLER_SUB_ORDERS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch seller sub orders",
    });
  }
};

/* ================= FETCH SELLER SUB ORDER BY ID ================= */

export const fetchSellerSubOrderById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_SELLER_SUB_ORDERS_BY_ID_REQUEST });

  try {
    const res = await axios.get(
      `${BASE_URL}/sellerSuborder/getSubOrderById/${id}`,
      getAuthHeaders()
    );

    dispatch({
      type: FETCH_SELLER_SUB_ORDERS_BY_ID_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SELLER_SUB_ORDERS_BY_ID_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch seller sub order",
    });
  }
};

/* ================= ADD SELLER SUB ORDER ================= */

export const addSellerSubOrder = (payload) => async (dispatch) => {
  dispatch({ type: ADD_SELLER_SUB_ORDER_REQUEST });

  try {
    const res = await axios.post(
      `${BASE_URL}/sellerSuborder/addSuborder`,
      payload,
      getAuthHeaders(false)
    );

    dispatch({
      type: ADD_SELLER_SUB_ORDER_SUCCESS,
      payload: res.data.message,
    });

    toast.success(res.data.message || "Suborder added successfully");
  } catch (error) {
    dispatch({
      type: ADD_SELLER_SUB_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to add suborder",
    });

    toast.error(error.response?.data?.message || "Failed to add suborder");
  }
};

/* ================= EDIT SELLER SUB ORDER ================= */

export const editSellerSubOrder = (id, payload) => async (dispatch) => {
  dispatch({ type: EDIT_SELLER_SUB_ORDER_REQUEST });

  try {
    const res = await axios.put(
      `${BASE_URL}/sellerSuborder/editSuborder/${id}`,
      payload,
      getAuthHeaders(false)
    );

    dispatch({
      type: EDIT_SELLER_SUB_ORDER_SUCCESS,
      payload: res.data.message,
    });

    toast.success(res.data.message || "Suborder updated successfully");
  } catch (error) {
    dispatch({
      type: EDIT_SELLER_SUB_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to edit suborder",
    });

    toast.error(error.response?.data?.message || "Failed to edit suborder");
  }
};

/* ================= DELETE SELLER SUB ORDER ================= */

export const deleteSellerSubOrder = (id) => async (dispatch) => {
  dispatch({ type: DELETE_SELLER_SUB_ORDER_REQUEST });

  try {
    const res = await axios.delete(
      `${BASE_URL}/sellerSuborder/deleteSuborder/${id}`,
      getAuthHeaders()
    );

    dispatch({
      type: DELETE_SELLER_SUB_ORDER_SUCCESS,
      payload: id,
    });

    toast.success(res.data.message || "Suborder deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_SELLER_SUB_ORDER_FAILURE,
      payload: error.response?.data?.message || "Failed to delete suborder",
    });

    toast.error(error.response?.data?.message || "Failed to delete suborder");
  }
};

//product data 
export const fetchSellerProductData = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_SELLER_DATA_REQUEST });

  try {
    const res = await axios.get(`${BASE_URL}/sellerSuborder/productData/${productId}`, getAuthHeaders());
    dispatch({
      type: PRODUCT_SELLER_DATA_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SELLER_DATA_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch product data",
    });
    toast.error(error.response.data.message || "Product not found")
  }
};

export const resetSellerProductData = () => ({
  type: RESET_PRODUCT_DATA,
});