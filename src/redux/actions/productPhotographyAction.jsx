import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

export const CREATE_PRODUCT_PHOTOGRAPHY_REQUEST = "CREATE_PRODUCT_PHOTOGRAPHY_REQUEST";
export const CREATE_PRODUCT_PHOTOGRAPHY_SUCCESS = "CREATE_PRODUCT_PHOTOGRAPHY_SUCCESS";
export const CREATE_PRODUCT_PHOTOGRAPHY_FAIL = "CREATE_PRODUCT_PHOTOGRAPHY_FAIL";

export const LIST_PRODUCT_PHOTOGRAPHY_REQUEST = "LIST_PRODUCT_PHOTOGRAPHY_REQUEST";
export const LIST_PRODUCT_PHOTOGRAPHY_SUCCESS = "LIST_PRODUCT_PHOTOGRAPHY_SUCCESS";
export const LIST_PRODUCT_PHOTOGRAPHY_FAIL = "LIST_PRODUCT_PHOTOGRAPHY_FAIL";

export const GET_PRODUCT_PHOTOGRAPHY_REQUEST = "GET_PRODUCT_PHOTOGRAPHY_REQUEST";
export const GET_PRODUCT_PHOTOGRAPHY_SUCCESS = "GET_PRODUCT_PHOTOGRAPHY_SUCCESS";
export const GET_PRODUCT_PHOTOGRAPHY_FAIL = "GET_PRODUCT_PHOTOGRAPHY_FAIL";

export const DELETE_PRODUCT_PHOTOGRAPHY_REQUEST = "DELETE_PRODUCT_PHOTOGRAPHY_REQUEST";
export const DELETE_PRODUCT_PHOTOGRAPHY_SUCCESS = "DELETE_PRODUCT_PHOTOGRAPHY_SUCCESS";
export const DELETE_PRODUCT_PHOTOGRAPHY_FAIL = "DELETE_PRODUCT_PHOTOGRAPHY_FAIL";


// CREATE
export const createProductPhotography = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCT_PHOTOGRAPHY_REQUEST });
        const response = await axios.post(`${BASE_URL}/productPhotography/create`, data);
        dispatch({ type: CREATE_PRODUCT_PHOTOGRAPHY_SUCCESS, payload: response.data.data });
        toast.success(response?.data?.message || "Product photography created successfully");
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
        toast.error(error.response?.data?.message || "Failed to create product photography");
    }
};

// LIST
export const listProductPhotography = (businessId) => async (dispatch) => {
    try {
        dispatch({ type: LIST_PRODUCT_PHOTOGRAPHY_REQUEST });
        const response = await axios.get(`${BASE_URL}/productPhotography/list/${businessId}`);
        dispatch({ type: LIST_PRODUCT_PHOTOGRAPHY_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: LIST_PRODUCT_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// GET BY ID
export const getProductPhotographyById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCT_PHOTOGRAPHY_REQUEST });
        const response = await axios.get(`${BASE_URL}/productPhotography/${id}`);
        dispatch({ type: GET_PRODUCT_PHOTOGRAPHY_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_PRODUCT_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// DELETE
export const deleteProductPhotography = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_PHOTOGRAPHY_REQUEST });
      const response =  await axios.delete(`${BASE_URL}/productPhotography/delete/${id}`);
        dispatch({ type: DELETE_PRODUCT_PHOTOGRAPHY_SUCCESS, payload: id });
         toast.success(response?.data?.message || "Product photography deleted successfully");
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_PHOTOGRAPHY_FAIL, payload: error.response?.data?.message || error.message });
        toast.error(error.response?.data?.message || "Failed to delete product photography");
    }
};