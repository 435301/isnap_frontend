import axios from "axios";
import getAuthHeaders from "../../utils/auth";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

export const FETCH_WINGS_REQUEST = "FETCH_WINGS_REQUEST";
export const FETCH_WINGS_SUCCESS = "FETCH_WINGS_SUCCESS";
export const FETCH_WINGS_FAILURE = "FETCH_WINGS_FAILURE";

export const CREATE_WING_SUCCESS = "CREATE_WING_SUCCESS";
export const UPDATE_WING_SUCCESS = "UPDATE_WING_SUCCESS";
export const DELETE_WING_SUCCESS = "DELETE_WING_SUCCESS";

export const FETCH_WING_BY_ID_SUCCESS = "FETCH_WING_BY_ID_SUCCESS";

export const fetchWings = (params = { page: 1, search: "", showStatus: "" }) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_WINGS_REQUEST });
        const response = await axios.post(`${BASE_URL}/wings/list`, params, getAuthHeaders());
        dispatch({
            type: FETCH_WINGS_SUCCESS,
            payload: response.data.data,
        });

    } catch (error) {
        dispatch({
            type: FETCH_WINGS_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

/**
 * Create a new wing
 */
export const createWing = (wingData) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/wings/create`, wingData, getAuthHeaders(false));
        dispatch({ type: CREATE_WING_SUCCESS, payload: response.data });
        toast.success(response?.data.message || "Wing created successfully");
        dispatch(fetchWings());
        return response.data;
    } catch (error) {
        console.error("Create Wing Error:", error);
        toast.error(error?.response.data.message)
        throw error;
    }
};

/**
 * Update an existing wing
 */
export const updateWing = (id, wingData) => async (dispatch) => {
    try {
        const response = await axios.put(`${BASE_URL}/wings/update/${id}`, wingData, getAuthHeaders(false));
        dispatch({ type: UPDATE_WING_SUCCESS, payload: response.data });
        dispatch(fetchWings());
        toast.success(response?.data.message || "Wing updated successfully");
        return response.data;
    } catch (error) {
        console.error("Update Wing Error:", error);
        toast.error(error?.response.data.message)
        throw error;
    }
};

/**
 * Fetch a single wing by ID
 */
export const fetchWingById = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/wings/${id}`, getAuthHeaders());
        dispatch({
            type: FETCH_WING_BY_ID_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        console.error("Fetch Wing by ID Error:", error);
    }
};

/**
 * Delete wing
 */
export const deleteWing = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`${BASE_URL}/wings/delete/${id}`, getAuthHeaders());
        dispatch({ type: DELETE_WING_SUCCESS, payload: id });
        dispatch(fetchWings());
        toast.success(response?.data.message || "Wing deleted successfully");
        return response.data;
    } catch (error) {
        console.error("Delete Wing Error:", error);
        toast.error(error?.response.data.message)
        throw error;
    }
};