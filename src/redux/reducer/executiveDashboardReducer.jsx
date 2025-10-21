import {
  FETCH_SALES_MANAGER_DASHBOARD_REQUEST,
  FETCH_SALES_MANAGER_DASHBOARD_SUCCESS,
  FETCH_SALES_MANAGER_DASHBOARD_FAILURE,
} from "../actions/executiceDashboardAction";

const initialState = {
  loading: false,
  dashboardData: null,
  error: null,
};

const ExecutiveDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SALES_MANAGER_DASHBOARD_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SALES_MANAGER_DASHBOARD_SUCCESS:
      return { ...state, loading: false, dashboardData: action.payload };
    case FETCH_SALES_MANAGER_DASHBOARD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ExecutiveDashboardReducer;
