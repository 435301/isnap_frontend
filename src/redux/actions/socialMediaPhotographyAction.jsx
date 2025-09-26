import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_REQUEST = "FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_REQUEST";
export const FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS = "FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS";
export const FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_FAILURE = "FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_FAILURE";

export const CREATE_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS = "CREATE_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS";
export const DELETE_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS = "DELETE_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS";

export const FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_BY_ID_SUCCESS = "FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_BY_ID_SUCCESS";

export const RESET_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY = "RESET_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY";


export const fetchSocialMediaContentPhotography = (businessId) => async (dispatch) => {
  dispatch({ type: FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/socialMediaContentPhotography/list/${businessId}`, getAuthHeaders());
    dispatch({
      type: FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS,
      payload: response.data.data.SocialMediaContentPhotography || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch by Id
export const fetchSocialMediaContentPhotographyById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/socialMediaContentPhotography/${id}`, getAuthHeaders());
    dispatch({
      type: FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_BY_ID_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create
export const createSocialMediaContentPhotography = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/socialMediaContentPhotography/create`, payload, getAuthHeaders());
    dispatch({
      type: CREATE_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS,
      payload: response.data.data,
    });
    toast.success(response?.data?.message || "Social Media Content Photography created successfully");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message ||"Failed to Create Social Media Content Photography ")
    throw error;
  }
};

//  Delete
export const deleteSocialMediaContentPhotography = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${BASE_URL}/socialMediaContentPhotography/delete/${id}`, getAuthHeaders());
    dispatch({
      type: DELETE_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY_SUCCESS,
      payload: id,
    });
    toast.success(response?.data?.message || "Social Media Content Photography deleted successfully");
  } catch (error) {
    toast.error(error.response?.data?.message ||"Failed to delete Social Media Content Photography ")
    throw error;
  }
};

//  Reset
export const resetSocialMediaContentPhotography = () => ({
  type: RESET_SOCIAL_MEDIA_CONTENT_PHOTOGRAPHY,
});