import axios from "axios";
import BASE_URL from "../../config/config";

export const CREATE_MODEL_PHOTOGRAPHY_REQUEST = "CREATE_MODEL_PHOTOGRAPHY_REQUEST";
export const CREATE_MODEL_PHOTOGRAPHY_SUCCESS = "CREATE_MODEL_PHOTOGRAPHY_SUCCESS";
export const CREATE_MODEL_PHOTOGRAPHY_FAIL = "CREATE_MODEL_PHOTOGRAPHY_FAIL";

export const LIST_MODEL_PHOTOGRAPHY_REQUEST = "LIST_MODEL_PHOTOGRAPHY_REQUEST";
export const LIST_MODEL_PHOTOGRAPHY_SUCCESS = "LIST_MODEL_PHOTOGRAPHY_SUCCESS";
export const LIST_MODEL_PHOTOGRAPHY_FAIL = "LIST_MODEL_PHOTOGRAPHY_FAIL";

export const GET_MODEL_PHOTOGRAPHY_REQUEST = "GET_MODEL_PHOTOGRAPHY_REQUEST";
export const GET_MODEL_PHOTOGRAPHY_SUCCESS = "GET_MODEL_PHOTOGRAPHY_SUCCESS";
export const GET_MODEL_PHOTOGRAPHY_FAIL = "GET_MODEL_PHOTOGRAPHY_FAIL";

export const DELETE_MODEL_PHOTOGRAPHY_REQUEST = "DELETE_MODEL_PHOTOGRAPHY_REQUEST";
export const DELETE_MODEL_PHOTOGRAPHY_SUCCESS = "DELETE_MODEL_PHOTOGRAPHY_SUCCESS";
export const DELETE_MODEL_PHOTOGRAPHY_FAIL = "DELETE_MODEL_PHOTOGRAPHY_FAIL";


export const createModelPhotography = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_MODEL_PHOTOGRAPHY_REQUEST });
        const response = await axios.post(`${BASE_URL}/modelPhotography/create`, data);
        dispatch({ type: CREATE_MODEL_PHOTOGRAPHY_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: CREATE_MODEL_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// List
export const listModelPhotography = (businessId) => async (dispatch) => {
    try {
        dispatch({ type: LIST_MODEL_PHOTOGRAPHY_REQUEST });
        const response = await axios.get(`${BASE_URL}/modelPhotography/list/${businessId}`);
        dispatch({ type: LIST_MODEL_PHOTOGRAPHY_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: LIST_MODEL_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// Get by ID
export const getModelPhotographyById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_MODEL_PHOTOGRAPHY_REQUEST });
        const response = await axios.get(`${BASE_URL}/modelPhotography/${id}`);
        dispatch({ type: GET_MODEL_PHOTOGRAPHY_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_MODEL_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// Delete
export const deleteModelPhotography = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_MODEL_PHOTOGRAPHY_REQUEST });
        await axios.delete(`${BASE_URL}/modelPhotography/delete/${id}`);
        dispatch({ type: DELETE_MODEL_PHOTOGRAPHY_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_MODEL_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
    }
};