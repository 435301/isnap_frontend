// reducers/businessTypeReducer.js
import {
  FETCH_BUSINESS_TYPES_REQUEST,
  FETCH_BUSINESS_TYPES_SUCCESS,
  FETCH_BUSINESS_TYPES_FAILURE,
  FETCH_BUSINESS_TYPE_REQUEST,
  FETCH_BUSINESS_TYPE_SUCCESS,
  FETCH_BUSINESS_TYPE_FAILURE,
  CREATE_BUSINESS_TYPE_REQUEST,
  CREATE_BUSINESS_TYPE_SUCCESS,
  CREATE_BUSINESS_TYPE_FAILURE,
  UPDATE_BUSINESS_TYPE_REQUEST,
  UPDATE_BUSINESS_TYPE_SUCCESS,
  UPDATE_BUSINESS_TYPE_FAILURE,
  DELETE_BUSINESS_TYPE_REQUEST,
  DELETE_BUSINESS_TYPE_SUCCESS,
  DELETE_BUSINESS_TYPE_FAILURE,
} from "../actions/businessTypeAction";

const initialState = {
  loading: false,
  businessTypes: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  selectedBusinessType: null,
  successMessage: null,
  error: null,
};

export const businessTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_TYPES_REQUEST:
    case FETCH_BUSINESS_TYPE_REQUEST:
    case CREATE_BUSINESS_TYPE_REQUEST:
    case UPDATE_BUSINESS_TYPE_REQUEST:
    case DELETE_BUSINESS_TYPE_REQUEST:
      return { ...state, loading: true, error: null, successMessage: null };

    case FETCH_BUSINESS_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        businessTypes: action.payload.businessTypes,
        total: action.payload.total,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case FETCH_BUSINESS_TYPE_SUCCESS:
      return { ...state, loading: false, selectedBusinessType: action.payload };

    case CREATE_BUSINESS_TYPE_SUCCESS:
    case UPDATE_BUSINESS_TYPE_SUCCESS:
    case DELETE_BUSINESS_TYPE_SUCCESS:
      return {
        ...state,
        businessTypes: state.businessTypes.filter((l) => l.id !== action.payload),
      };

    case FETCH_BUSINESS_TYPES_FAILURE:
    case FETCH_BUSINESS_TYPE_FAILURE:
    case CREATE_BUSINESS_TYPE_FAILURE:
    case UPDATE_BUSINESS_TYPE_FAILURE:
    case DELETE_BUSINESS_TYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
