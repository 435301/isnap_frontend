import axios from "axios";
import BASE_URL from "../../config/config";

// Action Types
export const FETCH_MARKET_TYPES_REQUEST = "FETCH_MARKET_TYPES_REQUEST";
export const FETCH_MARKET_TYPES_SUCCESS = "FETCH_MARKET_TYPES_SUCCESS";
export const FETCH_MARKET_TYPES_FAILURE = "FETCH_MARKET_TYPES_FAILURE";
export const CREATE_MARKET_TYPE_SUCCESS = "CREATE_MARKET_TYPE_SUCCESS";
export const UPDATE_MARKET_TYPE_SUCCESS = "UPDATE_MARKET_TYPE_SUCCESS";
export const DELETE_MARKET_TYPE_SUCCESS = "DELETE_MARKET_TYPE_SUCCESS";
export const MARKET_TYPE_ERROR = "MARKET_TYPE_ERROR";
export const CLEAR_MARKET_TYPE_SUCCESS_MESSAGE = "CLEAR_MARKET_TYPE_SUCCESS_MESSAGE";

// Auth Headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token
    ? { headers: { Authorization: `Bearer ${token.trim()}`, "Content-Type": "application/json" } }
    : {};
};

// Fetch Market Types
export const fetchMarketTypes = (page = 1, limit = 10, search = "", showStatus = "") => async (dispatch) => {
  dispatch({ type: FETCH_MARKET_TYPES_REQUEST });
  try {
    const validShowStatus = showStatus === 0 || showStatus === 1 ? showStatus : "";
    const response = await axios.post(
      `${BASE_URL}/marketPlace/list`,
      { page, limit, search, showStatus: validShowStatus },
      getAuthHeaders()
    );

    if (response.data.status) {
      const { marketPlaceTypes, totalPages, currentPage } = response.data.data || {};
      const mappedMarketTypes = (marketPlaceTypes || []).map((m) => ({
        ...m,
        marketTypeName: m.marketPlaceType || "",
        status: Number(m.status) === 1,
      }));
      dispatch({
        type: FETCH_MARKET_TYPES_SUCCESS,
        payload: { marketTypes: mappedMarketTypes, currentPage, totalPages },
      });
    } else {
      dispatch({
        type: FETCH_MARKET_TYPES_FAILURE,
        payload: response.data.message || "Failed to fetch market types",
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_MARKET_TYPES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create Market Type
export const createMarketType = (marketTypeData) => async (dispatch) => {
  try {
    const payload = {
      marketPlaceType: marketTypeData.marketTypePlaceName || "",
      status: marketTypeData.marketTypeStatus === "Active" ? 1 : 0,
    };

    const response = await axios.post(`${BASE_URL}/marketPlace/create`, payload, getAuthHeaders());
    const { status, data, message } = response.data;

    if (status || message === "Market Place Type created successfully") {
      const mappedMarketType = {
        ...data,
        marketTypeName: data?.marketPlaceType || payload.marketPlaceType,
        status: Number(data?.status) === 1,
      };
      dispatch({ type: CREATE_MARKET_TYPE_SUCCESS, payload: mappedMarketType });
      return mappedMarketType;
    } else {
      dispatch({ type: MARKET_TYPE_ERROR, payload: message || "Failed to create market type" });
      throw new Error(message || "Failed to create market type");
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    dispatch({ type: MARKET_TYPE_ERROR, payload: msg });
    throw error;
  }
};

// Update Market Type
export const updateMarketType = (marketTypeData) => async (dispatch) => {
  try {
    if (!marketTypeData.id) throw new Error("Missing id for update");

    const payload = {
      marketPlaceType: marketTypeData.marketTypeName || "",
      status: marketTypeData.status ? 1 : 0,
    };

    const response = await axios.put(
      `${BASE_URL}/marketPlace/update/${marketTypeData.id}`,
      payload,
      getAuthHeaders()
    );
    const { status, data, message } = response.data;

    if (status || message === "Market Place Type updated successfully") {
      const mappedMarketType = {
        ...data,
        marketTypeName: data?.marketPlaceType || payload.marketPlaceType,
        status: Number(data?.status) === 1,
      };
      dispatch({ type: UPDATE_MARKET_TYPE_SUCCESS, payload: mappedMarketType });
      return mappedMarketType;
    } else {
      dispatch({
        type: MARKET_TYPE_ERROR,
        payload: message || "Failed to update market type",
      });
      return null; // ❌ don't throw
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    dispatch({ type: MARKET_TYPE_ERROR, payload: msg });
    return null; // ❌ don't throw
  }
};


// Delete Market Type
export const deleteMarketType = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/marketPlace/delete/${id}`, getAuthHeaders());
    dispatch({ type: DELETE_MARKET_TYPE_SUCCESS, payload: id });
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    dispatch({ type: MARKET_TYPE_ERROR, payload: msg });
    throw error;
  }
};

// Clear success message
export const clearMarketTypeSuccessMessage = () => ({
  type: CLEAR_MARKET_TYPE_SUCCESS_MESSAGE,
});
