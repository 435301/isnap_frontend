import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";

// Sellers
export const FETCH_SELLERS_REQUEST = "FETCH_SELLERS_REQUEST";
export const FETCH_SELLERS_SUCCESS = "FETCH_SELLERS_SUCCESS";
export const FETCH_SELLERS_FAILURE = "FETCH_SELLERS_FAILURE";

// Products
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

// Add Product
export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";

// Delete Product
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

// Bulk Upload
export const BULK_UPLOAD_REQUEST = "BULK_UPLOAD_REQUEST";
export const BULK_UPLOAD_SUCCESS = "BULK_UPLOAD_SUCCESS";
export const BULK_UPLOAD_FAILURE = "BULK_UPLOAD_FAILURE";


export const fetchMarketPlaceSellers = () => async (dispatch) => {
  dispatch({ type: FETCH_SELLERS_REQUEST });
  try {
    const res = await axios.get( `${BASE_URL}/product/getSellers`,  getAuthHeaders(false)
    );
    dispatch({
      type: FETCH_SELLERS_SUCCESS,
      payload: res.data.data.sellers,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SELLERS_FAILURE,
      payload: error.message,
    });
  }
};

/* ================= GET PRODUCTS ================= */
export const fetchAdminProducts =(filters) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      const res = await axios.post( `${BASE_URL}/product/getProducts`,  filters,  getAuthHeaders(false) );
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };

/* ================= ADD PRODUCT ================= */
export const addProduct = (payload) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
  try {
    await axios.post( `${BASE_URL}/product/addProduct`, payload, getAuthHeaders(true) );
    dispatch({ type: ADD_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAILURE,
      payload: error.message,
    });
  }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    await axios.delete( `${BASE_URL}/product/deleteProduct/${id}`,  getAuthHeaders(true) );
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: error.message,
    });
  }
};

/* ================= BULK UPLOAD ================= */
export const bulkUploadProducts =
  ({ sellerId, marketPlaceId, file }) =>
  async (dispatch) => {
    dispatch({ type: BULK_UPLOAD_REQUEST });
    try {
      const formData = new FormData();
      formData.append("sellerId", sellerId);
      formData.append("marketPlaceId", marketPlaceId);
      formData.append("file", file);

      const res = await axios.post( `${BASE_URL}/product/bulkUploadProducts`, formData, getAuthHeaders(true, "multipart/form-data"));
      dispatch({
        type: BULK_UPLOAD_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: BULK_UPLOAD_FAILURE,
        payload: error.message,
      });
    }
  };