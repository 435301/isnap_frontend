import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

export const UPDATE_MOU_STATUS_REQUEST = "UPDATE_MOU_STATUS_REQUEST";
export const UPDATE_MOU_STATUS_SUCCESS = "UPDATE_MOU_STATUS_SUCCESS";
export const UPDATE_MOU_STATUS_FAILURE = "UPDATE_MOU_STATUS_FAILURE";

export const updateMouStatus = (id, mouStatus) => async (dispatch) => {
  dispatch({ type: UPDATE_MOU_STATUS_REQUEST });

  try {
    const response = await axios.post(`${BASE_URL}/mouStatus`, { id, mouStatus }, getAuthHeaders(false));
    
    if (response.data.status) {
      dispatch({
        type: UPDATE_MOU_STATUS_SUCCESS,
        payload: response.data.data, // { mouStatus: 1 }
      });
      toast.success(response?.message || "MOU Status updated successfully")
    } else {
      dispatch({
        type: UPDATE_MOU_STATUS_FAILURE,
        payload: response.data.message || "Failed to update MOU status",
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_MOU_STATUS_FAILURE,
      payload: error.message || "Something went wrong",
    });
    toast.error(error?.response.data.message || "Failed to update MOU status");
  }
};
