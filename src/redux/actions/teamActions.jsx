import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";
import { toast } from "react-toastify";

// Fetch teams
export const fetchTeams = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "FETCH_TEAMS_REQUEST" });
    const response = await axios.get(`${BASE_URL}/users`, getAuthHeaders(true));
    const teamsArray = response.data.data.users || [];
    dispatch({
      type: "FETCH_TEAMS_SUCCESS",
      payload: teamsArray,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_TEAMS_FAILURE",
      payload: error.response?.data?.msg || error.message,
    });
  }
};

// Create team
export const createTeam = (formData) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const token = auth?.token || localStorage.getItem("token");

    const response = await axios.post(`${BASE_URL}/users/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({
      type: "SET_SUCCESS_MESSAGE",
      payload: response.data.msg || "Team member created!",
    });

    return response.data;
  } catch (error) {
    console.error("Create error:", error.response?.data || error.message);
    dispatch({
      type: "SET_ERROR_MESSAGE",
      payload: error.response?.data?.msg || "Create failed",
    });
    toast.error(error.response.data.message)
    throw error;
  }
};

// Update team
export const updateTeam = (team) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const token = auth?.token || localStorage.getItem("token");

    const { id, photo, idProof, ...rest } = team;
    const formData = new FormData();

    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, value);
    });

    if (photo && photo instanceof File) formData.append("photo", photo);
    if (idProof && idProof instanceof File) formData.append("idProof", idProof);

    const response = await axios.put(`${BASE_URL}/users/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(fetchTeams());
    dispatch({
      type: "SET_SUCCESS_MESSAGE",
      payload: "Team updated successfully!",
    });

    return response.data;
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    dispatch({
      type: "SET_ERROR_MESSAGE",
      payload: error.response?.data?.msg || "Update failed",
    });
    throw error;
  }
};

// Delete team
export const deleteTeam = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const token = auth?.token || localStorage.getItem("token");

    await axios.delete(`${BASE_URL}/users/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(fetchTeams());
    dispatch({
      type: "SET_SUCCESS_MESSAGE",
      payload: "Team deleted successfully!",
    });
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
    dispatch({
      type: "SET_ERROR_MESSAGE",
      payload: error.response?.data?.msg || "Delete failed",
    });
    throw error;
  }
};

// Success & error messages
export const setSuccessMessage = (message) => ({
  type: "SET_SUCCESS_MESSAGE",
  payload: message,
});

export const setErrorMessage = (message) => ({
  type: "SET_ERROR_MESSAGE",
  payload: message,
});

export const clearSuccessMessage = () => ({
  type: "CLEAR_SUCCESS_MESSAGE",
});
