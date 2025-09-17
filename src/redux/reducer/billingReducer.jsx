import {
  FETCH_BILLING_REQUEST,
  FETCH_BILLING_SUCCESS,
  FETCH_BILLING_FAILURE,
  CREATE_BILLING_SUCCESS,
  UPDATE_BILLING_SUCCESS,
  DELETE_BILLING_SUCCESS,
  BILLING_ERROR,
  CLEAR_BILLING_SUCCESS_MESSAGE,
} from "../actions/billingActions";

const initialState = {
  billingCycles: [],
  loading: false,
  error: null,
  successMessage: null,
  currentPage: 1,
  totalPages: 1,
};

const normalizeBilling = (billing) => billing ? ({
  id: billing.id,
  title: billing.title || billing.billCycleTitle || "",
  status: billing.status ?? 0,
}) : { id: 0, title: "", status: 0 };

const billingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BILLING_REQUEST: return { ...state, loading: true, error: null };
    case FETCH_BILLING_SUCCESS:
      return {
        ...state,
        loading: false,
        billingCycles: (action.payload.billingCycles || []).map(normalizeBilling),
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case FETCH_BILLING_FAILURE: return { ...state, loading: false, error: action.payload };
    case CREATE_BILLING_SUCCESS:
      return { ...state, billingCycles: [normalizeBilling(action.payload), ...state.billingCycles], successMessage: "Billing cycle created successfully" };
    case UPDATE_BILLING_SUCCESS:
      return {
        ...state,
        billingCycles: state.billingCycles.map((cycle) => cycle.id === action.payload.id ? normalizeBilling(action.payload) : cycle),
        successMessage: "Billing cycle updated successfully",
      };
    case DELETE_BILLING_SUCCESS:
      return { ...state, billingCycles: state.billingCycles.filter((cycle) => cycle.id !== action.payload), successMessage: "Billing cycle deleted successfully" };
    case BILLING_ERROR: return { ...state, loading: false, error: action.payload };
    case CLEAR_BILLING_SUCCESS_MESSAGE: return { ...state, successMessage: null };
    default: return state;
  }
};

export default billingReducer;
