import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

// Action Types
export const FETCH_CATALOG_LISTING_REQUEST = "FETCH_CATALOG_LISTING_REQUEST";
export const FETCH_CATALOG_LISTING_SUCCESS = "FETCH_CATALOG_LISTING_SUCCESS";
export const FETCH_CATALOG_LISTING_FAILURE = "FETCH_CATALOG_LISTING_FAILURE";
export const CREATE_CATALOG_LISTING_SUCCESS = "CREATE_CATALOG_LISTING_SUCCESS";
export const UPDATE_CATALOG_LISTING_SUCCESS = "UPDATE_CATALOG_LISTING_SUCCESS";
export const UPDATE_CATALOG_LISTING_FAILURE = "UPDATE_CATALOG_LISTING_FAILURE";
export const DELETE_CATALOG_LISTING_SUCCESS = "DELETE_CATALOG_LISTING_SUCCESS";
export const DELETE_CATALOG_LISTING_FAILURE = "DELETE_CATALOG_LISTING_FAILURE";
export const CATALOG_LISTING_ERROR = "CATALOG_LISTING_ERROR";
export const CLEAR_CATALOG_LISTING_SUCCESS_MESSAGE = "CLEAR_CATALOG_LISTING_SUCCESS_MESSAGE";
export const FETCH_PER_SKU_PRICE_REQUEST = "FETCH_PER_SKU_PRICE_REQUEST";
export const FETCH_PER_SKU_PRICE_SUCCESS = "FETCH_PER_SKU_PRICE_SUCCESS";
export const FETCH_PER_SKU_PRICE_FAILURE = "FETCH_PER_SKU_PRICE_FAILURE";
export const FETCH_TOTAL_PRICE_REQUEST = "FETCH_TOTAL_PRICE_REQUEST";
export const FETCH_TOTAL_PRICE_SUCCESS = "FETCH_TOTAL_PRICE_SUCCESS";
export const FETCH_TOTAL_PRICE_FAILURE = "FETCH_TOTAL_PRICE_FAILURE"

// Auth Headers
const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem("authToken");
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
    },
  };
};

export const fetchCatalogListing = (businessId, page = 1, search = "", showStatus = "") => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CATALOG_LISTING_REQUEST });

    try {
      const response = await axios.get(`${BASE_URL}/catalogListing/list/${businessId}`, getAuthHeaders());
console.log('responsecatalog', response);
      if (response.data.status) {
        dispatch({
          type: FETCH_CATALOG_LISTING_SUCCESS,
          payload: response.data.data, 
        });
      } else {
        dispatch({
          type: FETCH_CATALOG_LISTING_FAILURE,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_CATALOG_LISTING_FAILURE,
        payload: error.message,
      });
    }
  };
};


// CREATE
export const createCatalogListing = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/catalogListing/create`,
      payload,
      getAuthHeaders(false)
    );
     if (res.data.status) {
      dispatch({
        type: CREATE_CATALOG_LISTING_SUCCESS,
        payload: res.data.data,
      });
    toast.success(res.data.message || "Catalog Listing created successfully");
      return res.data.data; 
    }
  } catch (error) {
    dispatch({ type: CATALOG_LISTING_ERROR, payload: error.response?.data?.message || error.message });
    toast.error(error.response.data.message || "Failed to create catalog listing");
    throw error;
  }
};


export const deleteCatalogListing = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/catalogListing/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_CATALOG_LISTING_SUCCESS, payload: id });
    toast.success(res?.data?.message || "Catalog listing deleted successfully");
    return true;
  } catch (err) {
    dispatch({ type: DELETE_CATALOG_LISTING_FAILURE, payload: err.message });
    toast.error(err?.response?.data?.message || "Failed to delete catalog listing");
    throw err;
  }
};

export const fetchPerSkuPrice = (noOfSkus) => async (dispatch) => {
  dispatch({ type: FETCH_PER_SKU_PRICE_REQUEST });

  try {
    const res = await axios.post( `${BASE_URL}/catalogListing/getPerSkuPrice`,
      { noOfSkus },
      getAuthHeaders(false)
    );

    if (res.data.status) {
      dispatch({type: FETCH_PER_SKU_PRICE_SUCCESS, payload: res.data.data, });
    } else {
      dispatch({ type: FETCH_PER_SKU_PRICE_FAILURE, payload: res.data.message,
      });
      toast.error(res.data.message || "Failed to fetch per SKU price");
    }
  } catch (error) {
    dispatch({
      type: FETCH_PER_SKU_PRICE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Error fetching per SKU price");
  }
};

export const fetchTotalPrice = (noOfSkus, offerPrice) => async (dispatch) => {
  dispatch({ type: FETCH_TOTAL_PRICE_REQUEST });

  try {
    const res = await axios.post( `${BASE_URL}/catalogListing/getTotalPrice`,
      { noOfSkus ,offerPrice},
      getAuthHeaders(false)
    );
    if (res.data.status) {
      dispatch({type: FETCH_TOTAL_PRICE_SUCCESS, payload: res.data.data, });
    } else {
      dispatch({ type: FETCH_PER_SKU_PRICE_FAILURE, payload: res.data.message,
      });
      toast.error(res.data.message || "Failed to fetch total price");
    }
  } catch (error) {
    dispatch({
      type: FETCH_TOTAL_PRICE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || "Error fetching total price");
  }
};

// CLEAR SUCCESS
export const clearCatalogListingSuccessMessage = () => ({ type: CLEAR_CATALOG_LISTING_SUCCESS_MESSAGE });
