import axios from "axios";
import BASE_URL from "../../config/config";

// ✅ Action Types
export const FETCH_STATES_REQUEST = "FETCH_STATES_REQUEST";
export const FETCH_STATES_SUCCESS = "FETCH_STATES_SUCCESS";
export const FETCH_STATES_FAILURE = "FETCH_STATES_FAILURE";
export const CREATE_STATE_SUCCESS = "CREATE_STATE_SUCCESS";
export const UPDATE_STATE_SUCCESS = "UPDATE_STATE_SUCCESS";
export const DELETE_STATE_SUCCESS = "DELETE_STATE_SUCCESS";
export const STATE_ERROR = "STATE_ERROR";
export const CLEAR_STATE_SUCCESS_MESSAGE = "CLEAR_STATE_SUCCESS_MESSAGE";

// ✅ Auth Headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      }
    : {};
};

// ✅ Fetch States (supports search + filter + pagination if needed)
// Fetch States (supports search + filter + pagination if needed)
export const fetchStates = (page = 1, limit = 10, search = "", showStatus = "") => {
  return async (dispatch) => {
    dispatch({ type: FETCH_STATES_REQUEST });

    try {
      let validShowStatus = "";
      if (showStatus === 0 || showStatus === 1) validShowStatus = showStatus;

      const response = await axios.post(
        `${BASE_URL}/states/list`,
        { page, limit, search, showStatus: validShowStatus },
        getAuthHeaders()
      );

      if (response.data.status) {
        // ✅ Use lowercase "states" because backend sends `data.states`
        const { states = [], totalPages = 1, currentPage = 1 } = response.data.data || {};

        const mappedStates = (states || []).map((st) => ({
          ...st,
          stateName: st?.stateName || st?.name || "",
          stateStatus: st?.stateStatus ?? st?.status ?? 0,
        }));

        dispatch({
          type: FETCH_STATES_SUCCESS,
          payload: { states: mappedStates, currentPage, totalPages },
        });
      } else {
        dispatch({ type: FETCH_STATES_FAILURE, payload: response.data.message });
      }
    } catch (error) {
      dispatch({
        type: FETCH_STATES_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};


// ✅ Create State
export const createState = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/states/create`,
      data,
      getAuthHeaders()
    );

    if (response.data.status) {
      const state = {
        ...response.data.data,
        stateName: response.data.data?.stateName || response.data.data?.name || "",
        stateStatus: response.data.data?.stateStatus ?? response.data.data?.status ?? false,
      };

      dispatch({ type: CREATE_STATE_SUCCESS, payload: state });
      return response.data;
    } else {
      return Promise.reject({
        message: response.data.message,
        data: response.data.data || null,
      });
    }
  } catch (error) {
    dispatch({
      type: STATE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    return Promise.reject({
      message: error.response?.data?.message || error.message,
    });
  }
};


export const updateState = (stateData) => async (dispatch) => {
  try {
    const { id, stateName, stateStatus } = stateData;

    const response = await axios.put(
      `${BASE_URL}/states/update/${id}`,
      { stateName, stateStatus },
      getAuthHeaders()
    );

    if (response.data.status) {
      dispatch({ type: UPDATE_STATE_SUCCESS, payload: stateData });
      return response.data;
    } else {
      return Promise.reject({
        response: { data: { message: response.data.message } },
      });
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    dispatch({ type: STATE_ERROR, payload: msg });
    return Promise.reject(error);
  }
};

// ✅ Delete State
export const deleteState = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/states/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_STATE_SUCCESS, payload: id }); // reducer handles toast msg
  } catch (error) {
    dispatch({ type: STATE_ERROR, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

// ✅ Clear success message
export const clearStateSuccessMessage = () => ({ type: CLEAR_STATE_SUCCESS_MESSAGE });
