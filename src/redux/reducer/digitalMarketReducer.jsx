import {
  FETCH_DIGITAL_MARKET_REQUEST,
  FETCH_DIGITAL_MARKET_SUCCESS,
  FETCH_DIGITAL_MARKET_FAILURE,
  UPDATE_DIGITAL_MARKET_SUCCESS,
  CLEAR_DIGITAL_MARKET_SUCCESS_MESSAGE,
} from "../actions/digitalMarketActions";

const initialState = {
  markets: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const digitalMarketReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIGITAL_MARKET_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DIGITAL_MARKET_SUCCESS:
      return { ...state, loading: false, markets: action.payload.markets || [] };
    case FETCH_DIGITAL_MARKET_FAILURE:
      return { ...state, loading: false, error: action.payload, markets: [] };
    case UPDATE_DIGITAL_MARKET_SUCCESS:
      return { ...state, successMessage: action.payload };
    case CLEAR_DIGITAL_MARKET_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };
    default:
      return state;
  }
};
