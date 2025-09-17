import axios from "axios";
import BASE_URL from "../../config/config";

// Action Types
export const FETCH_COMMISSIONS_REQUEST = "FETCH_COMMISSIONS_REQUEST";
export const FETCH_COMMISSIONS_SUCCESS = "FETCH_COMMISSIONS_SUCCESS";
export const FETCH_COMMISSIONS_FAILURE = "FETCH_COMMISSIONS_FAILURE";
export const CREATE_COMMISSION_SUCCESS = "CREATE_COMMISSION_SUCCESS";
export const UPDATE_COMMISSION_SUCCESS = "UPDATE_COMMISSION_SUCCESS";
export const DELETE_COMMISSION_SUCCESS = "DELETE_COMMISSION_SUCCESS";
export const COMMISSION_ERROR = "COMMISSION_ERROR";
export const CLEAR_COMMISSION_SUCCESS_MESSAGE = "CLEAR_COMMISSION_SUCCESS_MESSAGE";

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

// ✅ Fetch Commissions
export const fetchCommissions =
  (page = 1, limit = 10, search = "", showStatus = "") =>
    async (dispatch) => {
      dispatch({ type: FETCH_COMMISSIONS_REQUEST });

      try {
        let validShowStatus = "";
        if (showStatus === 0 || showStatus === 1) validShowStatus = showStatus;

        const response = await axios.post(
          `${BASE_URL}/commissionPricing/list`,
          { page, limit, search, showStatus: validShowStatus },
          getAuthHeaders()
        );

        if (response.data.status) {
          const { commissionPricings = [], currentPage = 1, totalPages = 1 } =
            response.data.data || {};

          const mappedCommissions = commissionPricings.map((c) => ({
            id: c.id,
            title: c.commission_title,
            percentage: c.percentage,
            status: Number(c.status),
          }));

          dispatch({
            type: FETCH_COMMISSIONS_SUCCESS,
            payload: { commissions: mappedCommissions, currentPage, totalPages },
          });
        } else {
          dispatch({
            type: FETCH_COMMISSIONS_FAILURE,
            payload: response.data.message || "Failed to fetch commissions",
          });
        }
      } catch (error) {
        dispatch({
          type: FETCH_COMMISSIONS_FAILURE,
          payload: error.response?.data?.message || error.message,
        });
      }
    };

// ✅ Create Commission
// ✅ Create Commission
export const createCommission = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/commissionPricing/create`,
      data,
      getAuthHeaders()
    );

    if (response.data.status && response.data.data) {
      dispatch({
        type: CREATE_COMMISSION_SUCCESS,
        payload: response.data.data,
      });
      return response.data.data;  // Return the object (has id)
    } else if (response.data.status) {
      // ✅ Handle success with null data: dispatch success, return dummy object with id (or just true)
      dispatch({
        type: CREATE_COMMISSION_SUCCESS,
        payload: { id: null, message: response.data.message },  // Adjust payload as needed
      });
      return { id: Date.now() };  // Dummy with 'id' to pass your check; or return true and update handleSubmit
    } else {
      // True failure
      dispatch({
        type: COMMISSION_ERROR,
        payload: response.data.message || "Failed to create commission",
      });
      return Promise.reject({
        message: response.data.message || "Failed to create commission",
      });
    }
  } catch (error) {
    dispatch({
      type: COMMISSION_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    return Promise.reject({
      message: error.response?.data?.message || error.message,
    });
  }
};
// ✅ Update Commission
export const updateCommission = (commissionData) => async (dispatch) => {
  try {
    const { id, title, percentage, status } = commissionData;

    const payload = {
      commissionTitle: title,
      percentage,
      status: Number(status),
    };

    const response = await axios.put(
      `${BASE_URL}/commissionPricing/update/${id}`,
      payload,
      getAuthHeaders()
    );

    if (response.data.status) {
      dispatch({
        type: UPDATE_COMMISSION_SUCCESS,
        payload: { id, ...payload },
      });
      return { id, ...payload };
    } else {
      throw new Error(response.data.message || "Failed to update commission");
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    dispatch({ type: COMMISSION_ERROR, payload: msg });
    throw new Error(msg); // ✅ always throw clean message
  }
};

// ✅ Delete Commission
export const deleteCommission = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/commissionPricing/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_COMMISSION_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: COMMISSION_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// ✅ Clear Success Message
export const clearCommissionSuccessMessage = () => ({
  type: CLEAR_COMMISSION_SUCCESS_MESSAGE,
});
