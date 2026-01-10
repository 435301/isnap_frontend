import axios from "axios";
import getAuthHeaders from "../../utils/auth";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

export const SELLER_SUPPORT_REQUEST = "SELLER_SUPPORT_REQUEST";
export const SELLER_SUPPORT_FAILURE = "SELLER_SUPPORT_FAILURE";

export const SELLER_SUPPORT_LIST_SUCCESS = "SELLER_SUPPORT_LIST_SUCCESS";
export const SELLER_SUPPORT_VIEW_SUCCESS = "SELLER_SUPPORT_VIEW_SUCCESS";
export const SELLER_SUPPORT_CREATE_SUCCESS = "SELLER_SUPPORT_CREATE_SUCCESS";
export const SELLER_SUPPORT_UPDATE_SUCCESS = "SELLER_SUPPORT_UPDATE_SUCCESS";
export const SELLER_SUPPORT_DELETE_SUCCESS = "SELLER_SUPPORT_DELETE_SUCCESS";

/* COMMON */
const request = () => ({ type: SELLER_SUPPORT_REQUEST });
const failure = (error) => ({
    type: SELLER_SUPPORT_FAILURE,
    payload: error,
});

/* ================= LIST ================= */
export const fetchSellerSupport = (filters) => async (dispatch) => {
    try {
        dispatch(request());
        const res = await axios.post(`${BASE_URL}/sellerSupport/list`, filters, getAuthHeaders());
        dispatch({
            type: SELLER_SUPPORT_LIST_SUCCESS,
            payload: res.data.data,
        });
    } catch (err) {
        dispatch(failure(err.message));
        toast.error(err.message);
    }

};

/* ================= VIEW ================= */
export const fetchSellerSupportById = (id) => async (dispatch) => {
    try {
        dispatch(request());
        const res = await axios.get(`${BASE_URL}/sellerSupport/${id}`, getAuthHeaders());
        dispatch({
            type: SELLER_SUPPORT_VIEW_SUCCESS,
            payload: res.data.data,
        });
    } catch (err) {
        dispatch(failure(err.message));
        toast.error(err.message);
    }
};

/* ================= CREATE ================= */
export const createSellerSupport = (formData) => async (dispatch) => {
    try {
        dispatch(request());
        const res = await axios.post(`${BASE_URL}/sellerSupport/create`, formData, getAuthHeaders(true))
        dispatch({
            type: SELLER_SUPPORT_CREATE_SUCCESS,
            payload: res.data,
        });
        toast.success(res.data.message || "Support created successfully");
    } catch (err) {
        dispatch(failure(err.message));
        toast.error(err.message );
    }
};

/* ================= UPDATE ================= */
export const updateSellerSupport = (id, formData) => async (dispatch) => {
    try {
        dispatch(request());

        const res = await axios.put(`${BASE_URL}/sellerSupport/update/${id}`, formData, getAuthHeaders(true))

        dispatch({
            type: SELLER_SUPPORT_UPDATE_SUCCESS,
            payload: res.data,
        });
        toast.success(res.data.message || "Support updated successfully");
    } catch (err) {
        dispatch(failure(err.message));
        toast.error(err.message);
    }
};

/* ================= DELETE ================= */
export const deleteSellerSupport = (id) => async (dispatch) => {
    try {
        dispatch(request());

        const res = await axios.delete(`${BASE_URL}/sellerSupport/delete/${id}`, getAuthHeaders());

        dispatch({
            type: SELLER_SUPPORT_DELETE_SUCCESS,
            payload: id,
        });
        toast.success(res.data.message || "Support deleted successfully");
    } catch (err) {
        dispatch(failure(err.message));
        toast.error(err.message);
    }
};
