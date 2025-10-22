import axios from "axios";
import BASE_URL from "../../config/config";

export const FETCH_BILLING_REQUEST = "FETCH_BILLING_REQUEST";
export const FETCH_BILLING_SUCCESS = "FETCH_BILLING_SUCCESS";
export const FETCH_BILLING_FAILURE = "FETCH_BILLING_FAILURE";
export const CREATE_BILLING_SUCCESS = "CREATE_BILLING_SUCCESS";
export const UPDATE_BILLING_SUCCESS = "UPDATE_BILLING_SUCCESS";
export const DELETE_BILLING_SUCCESS = "DELETE_BILLING_SUCCESS";
export const BILLING_ERROR = "BILLING_ERROR";
export const CLEAR_BILLING_SUCCESS_MESSAGE = "CLEAR_BILLING_SUCCESS_MESSAGE";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { headers: { Authorization: `Bearer ${token.trim()}`, "Content-Type": "application/json" } } : {};
};

export const fetchBillingCycles = (page = 1, limit = 10, search = "", showStatus = "") => async (dispatch) => {
  dispatch({ type: FETCH_BILLING_REQUEST });
  try {
    const validShowStatus = showStatus === 0 || showStatus === 1 ? showStatus : "";
    const response = await axios.post(
      `${BASE_URL}/billCycle/list`,
      { page, limit, search, showStatus: validShowStatus },
      getAuthHeaders()
    );

    if (response.data.status) {
      const { billCycles = [], currentPage = 1, totalPages = 1 } = response.data.data || {};
      const mappedBillCycles = (billCycles || []).map((b) => ({
        id: b.id,
        title: b.billCycleTitle || "",
        status: Number(b.status),
        durationRequired: Number(b.durationRequired),
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
      }));
      dispatch({ type: FETCH_BILLING_SUCCESS, payload: { billingCycles: mappedBillCycles, currentPage, totalPages } });
    } else {
      dispatch({ type: FETCH_BILLING_FAILURE, payload: response.data.message || "Failed to fetch billing cycles" });
    }
  } catch (error) {
    dispatch({ type: FETCH_BILLING_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const createBillingCycle = (data) => async (dispatch) => {
  try {
    const payload = { title: data.title || data.billCycleTitle, status: Number(data.status), durationRequired: Number(data.durationRequired) };
    const response = await axios.post(`${BASE_URL}/billCycle/create`, payload, getAuthHeaders());
    if (response.data.status) {
      dispatch({ type: CREATE_BILLING_SUCCESS, payload: response.data.data });
    }
    return response.data;
  } catch (error) {
    dispatch({ type: BILLING_ERROR, payload: error.response?.data?.message || error.message });
    return Promise.reject(error);
  }
};

export const updateBillingCycle = (billingData) => async (dispatch) => {
  try {
    const payload = { title: billingData.title, status: Number(billingData.status), durationRequired: Number(billingData.durationRequired) };
    const response = await axios.put(`${BASE_URL}/billCycle/update/${billingData.id}`, payload, getAuthHeaders());

    if (response.data.status) {
      dispatch({ type: UPDATE_BILLING_SUCCESS, payload: { ...billingData, ...payload } });
      return response.data;
    } else {
      return Promise.reject({
        message: response.data.message || "Failed to update billing cycle",
      });
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message || "Something went wrong";
    dispatch({ type: BILLING_ERROR, payload: msg });
    return Promise.reject({ message: msg });
  }
};


export const deleteBillingCycle = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/billCycle/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_BILLING_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: BILLING_ERROR, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

export const clearBillingSuccessMessage = () => ({ type: CLEAR_BILLING_SUCCESS_MESSAGE });