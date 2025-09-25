import axios from "axios";
import getAuthHeaders from "../../utils/auth";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify"; 

export const CREATE_STORE_PHOTOGRAPHY_REQUEST = "CREATE_STORE_PHOTOGRAPHY_REQUEST";
export const CREATE_STORE_PHOTOGRAPHY_SUCCESS = "CREATE_STORE_PHOTOGRAPHY_SUCCESS";
export const CREATE_STORE_PHOTOGRAPHY_FAILURE = "CREATE_STORE_PHOTOGRAPHY_FAILURE";

export const LIST_STORE_PHOTOGRAPHY_REQUEST = "LIST_STORE_PHOTOGRAPHY_REQUEST";
export const LIST_STORE_PHOTOGRAPHY_SUCCESS = "LIST_STORE_PHOTOGRAPHY_SUCCESS";
export const LIST_STORE_PHOTOGRAPHY_FAILURE = "LIST_STORE_PHOTOGRAPHY_FAILURE";

export const GET_STORE_PHOTOGRAPHY_REQUEST = "GET_STORE_PHOTOGRAPHY_REQUEST";
export const GET_STORE_PHOTOGRAPHY_SUCCESS = "GET_STORE_PHOTOGRAPHY_SUCCESS";
export const GET_STORE_PHOTOGRAPHY_FAILURE = "GET_STORE_PHOTOGRAPHY_FAILURE";

export const DELETE_STORE_PHOTOGRAPHY_REQUEST = "DELETE_STORE_PHOTOGRAPHY_REQUEST";
export const DELETE_STORE_PHOTOGRAPHY_SUCCESS = "DELETE_STORE_PHOTOGRAPHY_SUCCESS";
export const DELETE_STORE_PHOTOGRAPHY_FAILURE = "DELETE_STORE_PHOTOGRAPHY_FAILURE";

export const CLEAR_STORE_PHOTOGRAPHY = "CLEAR_STORE_PHOTOGRAPHY";


export const createStorePhotography = (payload) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_STORE_PHOTOGRAPHY_REQUEST });
    const { data } = await axios.post(`${BASE_URL}/storePhotography/create`, payload, getAuthHeaders(false));
    dispatch({ type: CREATE_STORE_PHOTOGRAPHY_SUCCESS, payload: data.data });
    toast.success(data?.data.message || 'Store,Showroom & Manufacturing Unit Photography created successfully')
  } catch (error) {
    dispatch({
      type: CREATE_STORE_PHOTOGRAPHY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || ' Failed to create Store,Showroom & Manufacturing Unit Photography')
  }
};

//  List by businessId
export const listStorePhotography = (businessId) => async (dispatch) => {
  try {
    dispatch({ type: LIST_STORE_PHOTOGRAPHY_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/storePhotography/list/${businessId}`, getAuthHeaders());
    dispatch({ type: LIST_STORE_PHOTOGRAPHY_SUCCESS, payload: data.data.storePhotography });
  } catch (error) {
    dispatch({
      type: LIST_STORE_PHOTOGRAPHY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//  Get by Id
export const getStorePhotographyById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_STORE_PHOTOGRAPHY_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/storePhotography/${id}`, getAuthHeaders());
    dispatch({ type: GET_STORE_PHOTOGRAPHY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_STORE_PHOTOGRAPHY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//  Delete by Id
export const deleteStorePhotography = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STORE_PHOTOGRAPHY_REQUEST });
    const response = await axios.delete(`${BASE_URL}/storePhotography/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_STORE_PHOTOGRAPHY_SUCCESS, payload: id });
    toast.success(response?.data?.message || 'Store,Showroom & Manufacturing Unit Photography deleted successfully')
  } catch (error) {
    dispatch({
      type: DELETE_STORE_PHOTOGRAPHY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error( error.response?.data?.message || ' Failed to delete Store,Showroom & Manufacturing Unit Photography')
  }
};

// Clear
export const clearStorePhotography = () => ({ type: CLEAR_STORE_PHOTOGRAPHY });