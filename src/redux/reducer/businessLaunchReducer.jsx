import {
  FETCH_BUSINESS_LAUNCH_REQUEST,
  FETCH_BUSINESS_LAUNCH_SUCCESS,
  FETCH_BUSINESS_LAUNCH_FAILURE,
  CREATE_BUSINESS_LAUNCH_SUCCESS,
  UPDATE_BUSINESS_LAUNCH_SUCCESS,
  DELETE_BUSINESS_LAUNCH_SUCCESS,
  BUSINESS_LAUNCH_ERROR,
  CLEAR_BUSINESS_LAUNCH_SUCCESS_MESSAGE,
} from "../actions/businessLaunchActions";

const initialState = {
  launches: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const businessLaunchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_LAUNCH_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BUSINESS_LAUNCH_SUCCESS:
      return { ...state, loading: false, launches: action.payload, error: null };
    case FETCH_BUSINESS_LAUNCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_BUSINESS_LAUNCH_SUCCESS:
      return {
        ...state,
        launches: [...state.launches, action.payload],
        successMessage: "Business launch created successfully",
      };
    case UPDATE_BUSINESS_LAUNCH_SUCCESS:
      return {
        ...state,
        launches: state.launches.map((l) => (l.id === action.payload.id ? action.payload : l)),
        successMessage: "Business launch updated successfully",
      };
    case DELETE_BUSINESS_LAUNCH_SUCCESS:
      return {
        ...state,
        launches: state.launches.filter((l) => l.id !== action.payload),
        successMessage: "Business launch deleted successfully",
      };
    case BUSINESS_LAUNCH_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_BUSINESS_LAUNCH_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };
    default:
      return state;
  }
};
