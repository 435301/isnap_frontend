import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";
import getAuthHeaders from "../../utils/auth";

export const CREATE_LIFESTYLE_PHOTOGRAPHY_REQUEST = "CREATE_LIFESTYLE_PHOTOGRAPHY_REQUEST";
export const CREATE_LIFESTYLE_PHOTOGRAPHY_SUCCESS = "CREATE_LIFESTYLE_PHOTOGRAPHY_SUCCESS";
export const CREATE_LIFESTYLE_PHOTOGRAPHY_FAIL = "CREATE_LIFESTYLE_PHOTOGRAPHY_FAIL";

export const LIST_LIFESTYLE_PHOTOGRAPHY_REQUEST = "LIST_LIFESTYLE_PHOTOGRAPHY_REQUEST";
export const LIST_LIFESTYLE_PHOTOGRAPHY_SUCCESS = "LIST_LIFESTYLE_PHOTOGRAPHY_SUCCESS";
export const LIST_LIFESTYLE_PHOTOGRAPHY_FAIL = "LIST_LIFESTYLE_PHOTOGRAPHY_FAIL";

export const GET_LIFESTYLE_PHOTOGRAPHY_REQUEST = "GET_LIFESTYLE_PHOTOGRAPHY_REQUEST";
export const GET_LIFESTYLE_PHOTOGRAPHY_SUCCESS = "GET_LIFESTYLE_PHOTOGRAPHY_SUCCESS";
export const GET_LIFESTYLE_PHOTOGRAPHY_FAIL = "GET_LIFESTYLE_PHOTOGRAPHY_FAIL";

export const DELETE_LIFESTYLE_PHOTOGRAPHY_REQUEST = "DELETE_LIFESTYLE_PHOTOGRAPHY_REQUEST";
export const DELETE_LIFESTYLE_PHOTOGRAPHY_SUCCESS = "DELETE_LIFESTYLE_PHOTOGRAPHY_SUCCESS";
export const DELETE_LIFESTYLE_PHOTOGRAPHY_FAIL = "DELETE_LIFESTYLE_PHOTOGRAPHY_FAIL";

export const RESET_LIFESTYLE_PHOTOGRAPHY = "RESET_LIFESTYLE_PHOTOGRAPHY";

// CREATE
export const createLifeStylePhotography = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_LIFESTYLE_PHOTOGRAPHY_REQUEST });
        const response = await axios.post(`${BASE_URL}/lifeStylePhotography/create`, data, getAuthHeaders(false));
        dispatch({ type: CREATE_LIFESTYLE_PHOTOGRAPHY_SUCCESS, payload: response.data.data });
        toast.success(response?.data?.message || "Lifestyle photography created successfully");
    } catch (error) {
        dispatch({ type: CREATE_LIFESTYLE_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
        toast.error(error.response?.data?.message || "Failed to create lifestyle photography");
    }
};

// LIST
export const listLifeStyletPhotography = (businessId) => async (dispatch) => {
    try {
        dispatch({ type: LIST_LIFESTYLE_PHOTOGRAPHY_REQUEST });
        const response = await axios.get(`${BASE_URL}/lifeStylePhotography/list/${businessId}`, getAuthHeaders());
        dispatch({ type: LIST_LIFESTYLE_PHOTOGRAPHY_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: LIST_LIFESTYLE_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// GET BY ID
export const getLifeStylePhotographyById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_LIFESTYLE_PHOTOGRAPHY_REQUEST });
        const response = await axios.get(`${BASE_URL}/lifeStylePhotography/${id}`, getAuthHeaders());
        dispatch({ type: GET_LIFESTYLE_PHOTOGRAPHY_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_LIFESTYLE_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// DELETE
export const deleteLifeStylePhotography = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_LIFESTYLE_PHOTOGRAPHY_REQUEST });
      const response =  await axios.delete(`${BASE_URL}/lifeStylePhotography/delete/${id}`, getAuthHeaders());
        dispatch({ type: DELETE_LIFESTYLE_PHOTOGRAPHY_SUCCESS, payload: id });
         toast.success(response?.data?.message || "Lifestyle photography deleted successfully");
    } catch (error) {
        dispatch({ type: DELETE_LIFESTYLE_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
        toast.error(error.response?.data?.message || "Failed to delete lifestyle photography");
    }
};

export const resetLifestylePhotography = () => ({
  type: RESET_LIFESTYLE_PHOTOGRAPHY,
});