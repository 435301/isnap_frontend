import {
  FETCH_MARKET_TYPES_REQUEST,
  FETCH_MARKET_TYPES_SUCCESS,
  FETCH_MARKET_TYPES_FAILURE,
  CREATE_MARKET_TYPE_SUCCESS,
  UPDATE_MARKET_TYPE_SUCCESS,
  DELETE_MARKET_TYPE_SUCCESS,
  MARKET_TYPE_ERROR,
  CLEAR_MARKET_TYPE_SUCCESS_MESSAGE,
} from "../actions/marketTypeActions";

const initialState = {
  marketTypes: [],
  loading: false,
  error: null,
  successMessage: "",
  currentPage: 1,
  totalPages: 1,
};

export const marketTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_TYPES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MARKET_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        marketTypes: action.payload.marketTypes,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case FETCH_MARKET_TYPES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_MARKET_TYPE_SUCCESS:
      return {
        ...state,
        marketTypes: [action.payload, ...state.marketTypes],
        successMessage: "Market Place Type created successfully",
      };
    case UPDATE_MARKET_TYPE_SUCCESS:
      return {
        ...state,
        marketTypes: state.marketTypes.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
        successMessage: "Market Place Type updated successfully",
      };
    case DELETE_MARKET_TYPE_SUCCESS:
      return {
        ...state,
        marketTypes: state.marketTypes.filter((m) => m.id !== action.payload),
        successMessage: "Market Place Type deleted successfully",
      };
    case MARKET_TYPE_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_MARKET_TYPE_SUCCESS_MESSAGE:
      return { ...state, successMessage: "" };
    default:
      return state;
  }
};
