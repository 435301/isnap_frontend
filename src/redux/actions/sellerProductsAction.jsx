import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";
import getSellerAuthHeaders from "../../utils/sellerAuth";

// Products
export const FETCH_SELLER_PRODUCTS_REQUEST = "FETCH_SELLER_PRODUCTS_REQUEST";
export const FETCH_SELLER_PRODUCTS_SUCCESS = "FETCH_SELLER_PRODUCTS_SUCCESS";
export const FETCH_SELLER_PRODUCTS_FAILURE = "FETCH_SELLER_PRODUCTS_FAILURE";

// Add Product
export const ADD_SELLER_PRODUCT_REQUEST = "ADD_SELLER_PRODUCT_REQUEST";
export const ADD_SELLER_PRODUCT_SUCCESS = "ADD_SELLER_PRODUCT_SUCCESS";
export const ADD_SELLER_PRODUCT_FAILURE = "ADD_SELLER_PRODUCT_FAILURE";

// Edit Product
export const EDIT_SELLER_PRODUCT_REQUEST = "EDIT_SELLER_PRODUCT_REQUEST";
export const EDIT_SELLER_PRODUCT_SUCCESS = "EDIT_SELLER_PRODUCT_SUCCESS";
export const EDIT_SELLER_PRODUCT_FAILURE = "EDIT_SELLER_PRODUCT_FAILURE";

// Delete Product
export const DELETE_SELLER_PRODUCT_REQUEST = "DELETE_SELLER_PRODUCT_REQUEST";
export const DELETE_SELLER_PRODUCT_SUCCESS = "DELETE_SELLER_PRODUCT_SUCCESS";
export const DELETE_SELLER_PRODUCT_FAILURE = "DELETE_SELLER_PRODUCT_FAILURE";

// Bulk Upload
export const BULK_SELLER_UPLOAD_REQUEST = "BULK_SELLER_UPLOAD_REQUEST";
export const BULK_SELLER_UPLOAD_SUCCESS = "BULK_SELLER_UPLOAD_SUCCESS";
export const BULK_SELLER_UPLOAD_FAILURE = "BULK_SELLER_UPLOAD_FAILURE";
//reports
export const FETCH_SELLER_REPORTS_REQUEST = "FETCH_SELLER_REPORTS_REQUEST";
export const FETCH_SELLER_REPORTS_SUCCESS = "FETCH_SELLER_REPORTS_SUCCESS";
export const FETCH_SELLER_REPORTS_FAILURE = "FETCH_SELLER_REPORTS_FAILURE";

//bulk status update 
export const BULK_SELLER_STATUS_UPDATE_REQUEST = "BULK_SELLER_STATUS_UPDATE_REQUEST";
export const BULK_SELLER_STATUS_UPDATE_SUCCESS = "BULK_SELLER_STATUS_UPDATE_SUCCESS";
export const BULK_SELLER_STATUS_UPDATE_FAILURE = "BULK_SELLER_STATUS_UPDATE_FAILURE";

//bulk delete 
export const BULK_SELLER_DELETE_REQUEST = "BULK_SELLER_DELETE_REQUEST";
export const BULK_SELLER_DELETE_SUCCESS = "BULK_SELLER_DELETE_SUCCESS";
export const BULK_SELLER_DELETE_FAILURE = "BULK_SELLER_DELETE_FAILURE";


/* ================= GET PRODUCTS ================= */
export const fetchSellerProducts = (filters) => async (dispatch) => {
    dispatch({ type: FETCH_SELLER_PRODUCTS_REQUEST });
    try {
        const res = await axios.post(`${BASE_URL}/productSeller/getProducts`, filters, getSellerAuthHeaders(false));
        dispatch({
            type: FETCH_SELLER_PRODUCTS_SUCCESS,
            payload: res.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_SELLER_PRODUCTS_FAILURE,
            payload: error.message,
        });
    }
};

/* ================= ADD PRODUCT ================= */
export const addSellerProduct = (payload) => async (dispatch) => {
    dispatch({ type: ADD_SELLER_PRODUCT_REQUEST });
    try {
        const res = await axios.post(`${BASE_URL}/productSeller/addProduct`, payload, getSellerAuthHeaders(false));
        dispatch({ type: ADD_SELLER_PRODUCT_SUCCESS });
        toast.success(res.data.message);
        dispatch(fetchSellerProducts());
    } catch (error) {
        dispatch({
            type: ADD_SELLER_PRODUCT_FAILURE,
            payload: error.message,
        });
        toast.error(error.response.data.message);
    }
};

/* ================= EDIT PRODUCT ================= */
// export const editProduct = (id) => async (dispatch) => {
//     dispatch({ type: EDIT_PRODUCT_REQUEST });
//     try {
//         const res = await axios.post(`${BASE_URL}/productSeller/updateProduct/${id}`, getSellerAuthHeaders(true));
//         dispatch({ type: EDIT_PRODUCT_SUCCESS });
//         toast.success(res.data.message);

//     } catch (error) {
//         dispatch({
//             type: EDIT_PRODUCT_FAILURE,
//             payload: error.message,
//         });
//         toast.error(error.response.data.message);
//     }
// };

/* ================= DELETE PRODUCT ================= */
export const deleteSellerProduct = (id) => async (dispatch) => {
    dispatch({ type: DELETE_SELLER_PRODUCT_REQUEST });
    try {
        const res = await axios.delete(`${BASE_URL}/productSeller/deleteProduct/${id}`, getSellerAuthHeaders(false));
        dispatch({
            type: DELETE_SELLER_PRODUCT_SUCCESS,
            payload: id,
        });
        toast.success(res?.data?.message);
    } catch (error) {
        dispatch({
            type: DELETE_SELLER_PRODUCT_FAILURE,
            payload: error.message,
        });
        toast.error(error?.response?.data?.message);
    }
};

/* ================= BULK UPLOAD ================= */
export const bulkSellerUploadProducts =
    ({ marketPlaceId, file }) =>
        async (dispatch) => {
            dispatch({ type: BULK_SELLER_UPLOAD_REQUEST });
            try {
                const formData = new FormData();
                formData.append("marketPlaceId", marketPlaceId);
                formData.append("file", file);

                const res = await axios.post(`${BASE_URL}/productSeller/bulkUploadProducts`, formData, getSellerAuthHeaders(true));
                dispatch({
                    type: BULK_SELLER_UPLOAD_SUCCESS,
                    payload: res.data.data,
                });
                toast.success(res.data.message);
            } catch (error) {
                dispatch({
                    type: BULK_SELLER_UPLOAD_FAILURE,
                    payload: error.message,
                });
                toast.error(error.response.data.message);
            }
        };


export const fetchSellerReports = (payload) => async (dispatch) => {
    dispatch({ type: FETCH_SELLER_REPORTS_FAILURE });
    try {
        const res = await axios.post(`${BASE_URL}/productSeller/getProductReports`, payload, getSellerAuthHeaders(false));
        dispatch({
            type: FETCH_SELLER_REPORTS_SUCCESS,
            payload: res.data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_SELLER_REPORTS_FAILURE,
            payload: error.message
        });
    }
}


export const bulkSellerStatusUpdate = (payload) => async (dispatch) => {
    dispatch({ type: BULK_SELLER_STATUS_UPDATE_REQUEST });
    try {
        const res = await axios.patch(`${BASE_URL}/product/bulkUpdateProductStatus`, payload, getSellerAuthHeaders(false));
        dispatch({
            type: BULK_SELLER_STATUS_UPDATE_SUCCESS,
            payload: res.data.data,
        });
        toast.success(res.data.message)
    } catch (error) {
        dispatch({
            type: BULK_SELLER_STATUS_UPDATE_FAILURE,
            payload: error.message
        });

    }
}


export const bulkSellerDelete = (ids) => async (dispatch) => {
    dispatch({ type: BULK_SELLER_DELETE_REQUEST });
    try {
        const res = await axios.patch(`${BASE_URL}/product/bulkDeleteProducts`, ids, getSellerAuthHeaders(false));
        dispatch({
            type: BULK_SELLER_DELETE_SUCCESS,
            payload: res.data.data,
        });
        toast.success(res.data.message);
    } catch (error) {
        dispatch({
            type: BULK_SELLER_DELETE_FAILURE,
            payload: error.message
        });
        //  toast.error(error.response.data.message);
    }
}