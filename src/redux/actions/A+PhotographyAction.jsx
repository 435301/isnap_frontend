
import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";
export const LIST_ACONTENT_REQUEST = "LIST_ACONTENT_REQUEST";
export const LIST_ACONTENT_SUCCESS = "LIST_ACONTENT_SUCCESS";
export const LIST_ACONTENT_FAIL = "LIST_ACONTENT_FAIL";

export const GET_ACONTENT_REQUEST = "GET_ACONTENT_REQUEST";
export const GET_ACONTENT_SUCCESS = "GET_ACONTENT_SUCCESS";
export const GET_ACONTENT_FAIL = "GET_ACONTENT_FAIL";

export const CREATE_ACONTENT_REQUEST = "CREATE_ACONTENT_REQUEST";
export const CREATE_ACONTENT_SUCCESS = "CREATE_ACONTENT_SUCCESS";
export const CREATE_ACONTENT_FAIL = "CREATE_ACONTENT_FAIL";

export const DELETE_ACONTENT_REQUEST = "DELETE_ACONTENT_REQUEST";
export const DELETE_ACONTENT_SUCCESS = "DELETE_ACONTENT_SUCCESS";
export const DELETE_ACONTENT_FAIL = "DELETE_ACONTENT_FAIL";



export const listAContentPhotography = (businessId) => async (dispatch) => {
  try {
    dispatch({ type: LIST_ACONTENT_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/aContentPhotography/list/${businessId}`, getAuthHeaders());

    dispatch({
      type: LIST_ACONTENT_SUCCESS,
      payload: data.data.aContentPhotography,
    });
  } catch (error) {
    dispatch({
      type: LIST_ACONTENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getAContentPhotographyById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ACONTENT_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/aContentPhotography/${id}`, getAuthHeaders());

    dispatch({
      type: GET_ACONTENT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACONTENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createAContentPhotography = (payload) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ACONTENT_REQUEST });

    const { data } = await axios.post(`${BASE_URL}/aContentPhotography/create`, payload, getAuthHeaders(false));

    dispatch({
      type: CREATE_ACONTENT_SUCCESS,
      payload: data.data,
    });
    toast.success(data?.data?.message || 'A+ Content Photography created successfully+ ')
  } catch (error) {
    dispatch({
      type: CREATE_ACONTENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    toast.error( error.response?.data?.message || 'Failed to create A+ photography"')
  }
};

export const deleteAContentPhotography = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ACONTENT_REQUEST });

  const res =   await axios.delete(`${BASE_URL}/aContentPhotography/delete/${id}`, getAuthHeaders());

    dispatch({
      type: DELETE_ACONTENT_SUCCESS,
      payload: id,
    });
    toast.success(res?.data?.message || "A+ Content Photography deleted successfully+ ")
  } catch (error) {
    dispatch({
      type: DELETE_ACONTENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    toast.error( error.response?.data?.message || 'Failed to delete A+ photography"')
  }
};
