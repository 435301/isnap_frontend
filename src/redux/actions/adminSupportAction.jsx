import axios from "axios";
import getAuthHeaders from "../../utils/auth";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

export const ADMIN_SUPPORT_REQUEST = "ADMIN_SUPPORT_REQUEST";
export const ADMIN_SUPPORT_FAILURE = "ADMIN_SUPPORT_FAILURE";

export const ADMIN_SUPPORT_LIST_SUCCESS = "ADMIN_SUPPORT_LIST_SUCCESS";
export const ADMIN_SUPPORT_CREATE_SUCCESS = "ADMIN_SUPPORT_CREATE_SUCCESS";
export const ADMIN_SUPPORT_UPDATE_SUCCESS = "ADMIN_SUPPORT_UPDATE_SUCCESS";

/* COMMON */
const request = () => ({ type: ADMIN_SUPPORT_REQUEST });
const failure = (error) => ({
    type: ADMIN_SUPPORT_FAILURE,
    payload: error,
});

/* ================= LIST ================= */
export const fetchAdminSupport = (filters) => async (dispatch) => {
    try {
        dispatch(request());
        const res = await axios.post(`${BASE_URL}/support/list`, filters, getAuthHeaders());
        dispatch({
            type: ADMIN_SUPPORT_LIST_SUCCESS,
            payload: res.data.data,
        });
    } catch (err) {
        dispatch(failure(err.message));
        toast.error(err.message);
    }

};


/* ================= CREATE ================= */
export const createAdminSupport = (formData) => async (dispatch) => {
    try {
        dispatch(request());
        const res = await axios.post(`${BASE_URL}/support/create`, formData, getAuthHeaders(true))
        dispatch({
            type: ADMIN_SUPPORT_CREATE_SUCCESS,
            payload: res.data,
        });
        toast.success(res.data.message || "Support created successfully");
    } catch (err) {
        dispatch(failure(err.message));
        toast.error(err.message );
    }
};

/* ================= UPDATE ================= */
export const updateAdminSupport = (id, formData) => async (dispatch) => {
    try {
        dispatch(request());

        const res = await axios.put(`${BASE_URL}/support/update/${id}`, formData, getAuthHeaders(true))

        dispatch({
            type: ADMIN_SUPPORT_UPDATE_SUCCESS,
            payload: res.data,
        });
        toast.success(res.data.message || "Support updated successfully");
    } catch (err) {
        dispatch(failure(err.message));
        toast.error(err.message);
    }
};

//getbyId , delete api from seller support action
