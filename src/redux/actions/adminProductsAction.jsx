import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

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

// Edit Product
export const EDIT_PRODUCT_REQUEST = "EDIT_PRODUCT_REQUEST";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_FAILURE = "EDIT_PRODUCT_FAILURE";

// Delete Product
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

// Bulk Upload
export const BULK_UPLOAD_REQUEST = "BULK_UPLOAD_REQUEST";
export const BULK_UPLOAD_SUCCESS = "BULK_UPLOAD_SUCCESS";
export const BULK_UPLOAD_FAILURE = "BULK_UPLOAD_FAILURE";
//reports
export const FETCH_REPORTS_REQUEST = "FETCH_REPORTS_REQUEST";
export const FETCH_REPORTS_SUCCESS = "FETCH_REPORTS_SUCCESS";
export const FETCH_REPORTS_FAILURE = "FETCH_REPORTS_FAILURE";

//bulk status update 
export const BULK_STATUS_UPDATE_REQUEST = "BULK_STATUS_UPDATE_REQUEST";
export const BULK_STATUS_UPDATE_SUCCESS = "BULK_STATUS_UPDATE_SUCCESS";
export const BULK_STATUS_UPDATE_FAILURE = "BULK_STATUS_UPDATE_FAILURE";

//bulk delete 
export const BULK_DELETE_REQUEST = "BULK_DELETE_REQUEST";
export const BULK_DELETE_SUCCESS = "BULK_DELETE_SUCCESS";
export const BULK_DELETE_FAILURE = "BULK_DELETE_FAILURE";

//getServices
export const GET_SELLER_SERVICES_REQUEST = "GET_SELLER_SERVICES_REQUEST";
export const GET_SELLER_SERVICES_SUCCESS = "GET_SELLER_SERVICES_SUCCESS";
export const GET_SELLER_SERVICES_FAILURE = "GET_SELLER_SERVICES_FAILURE";


export const fetchMarketPlaceSellers = () => async (dispatch) => {
    dispatch({ type: FETCH_SELLERS_REQUEST });
    try {
        const res = await axios.get(`${BASE_URL}/product/getSellers`, getAuthHeaders(false)
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
export const fetchAdminProducts = (filters) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const res = await axios.post(`${BASE_URL}/product/getProducts`, filters, getAuthHeaders(false));
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
        const res = await axios.post(`${BASE_URL}/product/addProduct`, payload, getAuthHeaders(false));
        dispatch({ type: ADD_PRODUCT_SUCCESS });
        toast.success(res.data.message || "Product added successfully");

    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAILURE,
            payload: error.message,
        });
        toast.error(error.response.data.message);
    }
};

/* ================= EDIT PRODUCT ================= */
export const editProduct = (id) => async (dispatch) => {
    dispatch({ type: EDIT_PRODUCT_REQUEST });
    try {
        const res = await axios.post(`${BASE_URL}/product/updateProduct/${id}`, getAuthHeaders(false));
        dispatch({ type: EDIT_PRODUCT_SUCCESS });
        toast.success(res.data.message || "Product edited successfully");

    } catch (error) {
        dispatch({
            type: EDIT_PRODUCT_FAILURE,
            payload: error.message,
        });
        toast.error(error.response.data.message);
    }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        const res = await axios.delete(`${BASE_URL}/product/deleteProduct/${id}`, getAuthHeaders(false));
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: id,
        });
        toast.success(res.data.message || "Product deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: error.message,
        });
        toast.error(error.response.data.message);
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

                const res = await axios.post(`${BASE_URL}/product/bulkUploadProducts`, formData, getAuthHeaders(true));
                dispatch({
                    type: BULK_UPLOAD_SUCCESS,
                    payload: res.data.data,
                });
                toast.success(res.data.message || "Bulk upload completed");
            } catch (error) {
                dispatch({
                    type: BULK_UPLOAD_FAILURE,
                    payload: error.message,
                });
                toast.error(error.response.data.message);
            }
        };


export const fetchReports = (payload) => async (dispatch) => {
    dispatch({ type: FETCH_REPORTS_FAILURE });
    try {
        const res = await axios.post(`${BASE_URL}/product/getProductReports`, payload, getAuthHeaders(false));
        dispatch({
            type: FETCH_REPORTS_SUCCESS,
            payload: res.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_REPORTS_FAILURE,
            payload: error.message
        });
    }
}


export const bulkStatusUpdate = (payload) => async (dispatch) => {
    dispatch({ type: BULK_STATUS_UPDATE_REQUEST });
    try {
        const res = await axios.patch(`${BASE_URL}/product/bulkUpdateProductStatus`, payload, getAuthHeaders(false));
        dispatch({
            type: BULK_STATUS_UPDATE_SUCCESS,
            payload: res.data.data,
        });
        toast.success(res.data.message || "Product status updated successfully")
    } catch (error) {
        dispatch({
            type: BULK_STATUS_UPDATE_FAILURE,
            payload: error.message
        });

    }
}


export const bulkDelete = (ids) => async (dispatch) => {
    dispatch({ type: BULK_DELETE_REQUEST });
    try {
        const res = await axios.patch(`${BASE_URL}/product/bulkDeleteProducts`, ids, getAuthHeaders(false));
        dispatch({
            type: BULK_DELETE_SUCCESS,
            payload: res.data.data,
        });
        toast.success(res.data.message);
    } catch (error) {
        dispatch({
            type: BULK_DELETE_FAILURE,
            payload: error.message
        });
        toast.error(error.response.data.message);
    }
}

export const fetchSellerServices = () => async (dispatch) => {
    dispatch({ type: GET_SELLER_SERVICES_REQUEST });
    try {
        const res = await axios.get(`${BASE_URL}/getServices`, getAuthHeaders(false)
        );
        dispatch({
            type: GET_SELLER_SERVICES_SUCCESS,
            payload: res.data.data.services,
        });
    } catch (error) {
        dispatch({
            type: GET_SELLER_SERVICES_FAILURE,
            payload: error.message,
        });
    }
};
