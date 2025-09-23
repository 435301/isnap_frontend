import axios from "axios";
import BASE_URL from "../../config/config";

// Action Types
export const FETCH_DIGITAL_MARKET_REQUEST = "FETCH_DIGITAL_MARKET_REQUEST";
export const FETCH_DIGITAL_MARKET_SUCCESS = "FETCH_DIGITAL_MARKET_SUCCESS";
export const FETCH_DIGITAL_MARKET_FAILURE = "FETCH_DIGITAL_MARKET_FAILURE";
export const UPDATE_DIGITAL_MARKET_SUCCESS = "UPDATE_DIGITAL_MARKET_SUCCESS";
export const CLEAR_DIGITAL_MARKET_SUCCESS_MESSAGE = "CLEAR_DIGITAL_MARKET_SUCCESS_MESSAGE";

// Fetch Digital Market by ID
export const fetchDigitalMarketById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_DIGITAL_MARKET_REQUEST });

    const { auth } = getState();
    const token = auth?.token || localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/digitalMarketPricing/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const market = response.data?.data;

    dispatch({
      type: FETCH_DIGITAL_MARKET_SUCCESS,
      payload: { markets: market ? [market] : [] },
    });
  } catch (error) {
    dispatch({
      type: FETCH_DIGITAL_MARKET_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Digital Market
export const updateDigitalMarket = (marketData) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const token = auth?.token || localStorage.getItem("token");

    console.log("PUT URL:", `${BASE_URL}/digitalMarketPricing/update/${marketData.id}`);
    console.log("Payload:", marketData);

    const response = await axios.put(
      `${BASE_URL}/digitalMarketPricing/update/${marketData.id}`,
      marketData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updatedMarket = response.data?.data;

    dispatch({
      type: UPDATE_DIGITAL_MARKET_SUCCESS,
      payload: "Digital market pricing updated successfully",
    });

    return updatedMarket;
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Clear success message
export const clearDigitalMarketSuccessMessage = () => ({
  type: CLEAR_DIGITAL_MARKET_SUCCESS_MESSAGE,
});
