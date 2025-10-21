import axios from "axios";
import BASE_URL from "../../config/config";
import getAuthHeaders from "../../utils/auth";

export const FETCH_SALES_MANAGER_DASHBOARD_REQUEST = "FETCH_SALES_MANAGER_DASHBOARD_REQUEST";
export const FETCH_SALES_MANAGER_DASHBOARD_SUCCESS = "FETCH_SALES_MANAGER_DASHBOARD_SUCCESS";
export const FETCH_SALES_MANAGER_DASHBOARD_FAILURE = "FETCH_SALES_MANAGER_DASHBOARD_FAILURE";

export const fetchSalesManagerDashboard = () => async (dispatch) => {
  dispatch({ type: FETCH_SALES_MANAGER_DASHBOARD_REQUEST });

  try {
    const response = await axios.get(`${BASE_URL}/salesManager/dashboardForSalesManager`,getAuthHeaders(false));
    dispatch({
      type: FETCH_SALES_MANAGER_DASHBOARD_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SALES_MANAGER_DASHBOARD_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};