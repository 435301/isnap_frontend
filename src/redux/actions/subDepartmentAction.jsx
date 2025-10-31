import axios from "axios";
import { toast } from "react-toastify";
import getAuthHeaders from "../../utils/auth";
import BASE_URL from "../../config/config";

export const CREATE_SUBDEPARTMENT_REQUEST = "CREATE_SUBDEPARTMENT_REQUEST";
export const CREATE_SUBDEPARTMENT_SUCCESS = "CREATE_SUBDEPARTMENT_SUCCESS";
export const CREATE_SUBDEPARTMENT_FAILURE = "CREATE_SUBDEPARTMENT_FAILURE";

export const FETCH_SUBDEPARTMENTS_REQUEST = "FETCH_SUBDEPARTMENTS_REQUEST";
export const FETCH_SUBDEPARTMENTS_SUCCESS = "FETCH_SUBDEPARTMENTS_SUCCESS";
export const FETCH_SUBDEPARTMENTS_FAILURE = "FETCH_SUBDEPARTMENTS_FAILURE";

export const FETCH_SUBDEPARTMENT_BY_ID_REQUEST = "FETCH_SUBDEPARTMENT_BY_ID_REQUEST";
export const FETCH_SUBDEPARTMENT_BY_ID_SUCCESS = "FETCH_SUBDEPARTMENT_BY_ID_SUCCESS";
export const FETCH_SUBDEPARTMENT_BY_ID_FAILURE = "FETCH_SUBDEPARTMENT_BY_ID_FAILURE";

export const UPDATE_SUBDEPARTMENT_REQUEST = "UPDATE_SUBDEPARTMENT_REQUEST";
export const UPDATE_SUBDEPARTMENT_SUCCESS = "UPDATE_SUBDEPARTMENT_SUCCESS";
export const UPDATE_SUBDEPARTMENT_FAILURE = "UPDATE_SUBDEPARTMENT_FAILURE";

export const DELETE_SUBDEPARTMENT_REQUEST = "DELETE_SUBDEPARTMENT_REQUEST";
export const DELETE_SUBDEPARTMENT_SUCCESS = "DELETE_SUBDEPARTMENT_SUCCESS";
export const DELETE_SUBDEPARTMENT_FAILURE = "DELETE_SUBDEPARTMENT_FAILURE";

export const createSubDepartment = (subDepartmentData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_SUBDEPARTMENT_REQUEST });
        const response = await axios.post(`${BASE_URL}/subDepartment/create`, subDepartmentData, getAuthHeaders());
        dispatch({
            type: CREATE_SUBDEPARTMENT_SUCCESS,
            payload: response.data,
        });
        toast.success(response.data.message)
    } catch (error) {
        dispatch({
            type: CREATE_SUBDEPARTMENT_FAILURE,
            payload:
                error.response?.data?.message || "Failed to create sub-department",
        });
        toast.error(error.response?.data?.message)
    }
};

// Fetch All Sub-Departments (with filters)
export const fetchSubDepartments = (payload = { page: "", search: "", serviceCategoryId: "", showStatus: "" }) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_SUBDEPARTMENTS_REQUEST });
        const response = await axios.post(`${BASE_URL}/subDepartment/list`, payload, getAuthHeaders());
        dispatch({ type: FETCH_SUBDEPARTMENTS_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({
            type: FETCH_SUBDEPARTMENTS_FAILURE,
            payload: error.response?.data?.message || "Failed to fetch sub-departments",
        });
    }
};


//  Fetch Single Sub-Department by ID
export const fetchSubDepartmentById = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_SUBDEPARTMENT_BY_ID_REQUEST });
        const response = await axios.get(`${BASE_URL}/subDepartment/${id}`, getAuthHeaders());
        dispatch({ type: FETCH_SUBDEPARTMENT_BY_ID_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({
            type: FETCH_SUBDEPARTMENT_BY_ID_FAILURE,
            payload: error.response?.data?.message || "Failed to fetch sub-department",
        });
    }
};


//  Update Sub-Department
export const updateSubDepartment = (id, subDepartmentData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUBDEPARTMENT_REQUEST });
        const response = await axios.put(`${BASE_URL}/subDepartment/update/${id}`, subDepartmentData, getAuthHeaders());
        dispatch({ type: UPDATE_SUBDEPARTMENT_SUCCESS, payload: response.data });
       dispatch(fetchSubDepartments());
        toast.success(response.data.message);
    } catch (error) {
        dispatch({
            type: UPDATE_SUBDEPARTMENT_FAILURE,
            payload: error.response?.data?.message || "Failed to update sub-department",
        });
        toast.error(error.response?.data?.message)
    }
};


//  Delete Sub-Department
export const deleteSubDepartment = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SUBDEPARTMENT_REQUEST });
        const response = await axios.delete(`${BASE_URL}/subDepartment/delete/${id}`, getAuthHeaders());
        dispatch({ type: DELETE_SUBDEPARTMENT_SUCCESS, payload: response.data });
        dispatch(fetchSubDepartments());
        toast.success(response.data.message);
    } catch (error) {
        dispatch({
            type: DELETE_SUBDEPARTMENT_FAILURE,
            payload: error.response?.data?.message || "Failed to delete sub-department",
        });
        toast.error(error.response?.data?.message)
    }
};