import {
  FETCH_BUSINESS_LAUNCH_REQUEST,
  FETCH_BUSINESS_LAUNCH_SUCCESS,
  FETCH_BUSINESS_LAUNCH_FAILURE,
  CREATE_BUSINESS_LAUNCH_SUCCESS,
  UPDATE_BUSINESS_LAUNCH_SUCCESS,
  DELETE_BUSINESS_LAUNCH_SUCCESS,
  BUSINESS_LAUNCH_ERROR,
  CLEAR_BUSINESS_LAUNCH_SUCCESS_MESSAGE,
  UPDATE_BUSINESS_LAUNCH_FAILURE
} from "../actions/businessLaunchActions";

const initialState = {
  launches: [],
  loading: false,
  error: null,
   total: 0,
};

export const businessLaunchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_LAUNCH_REQUEST:
      return { ...state, loading: true, error: null };
   case FETCH_BUSINESS_LAUNCH_SUCCESS:
      return {
        ...state,
        loading: false,
        launches: action.payload.businessLaunches  || [],
        total: action.payload.total || 0,
        error: null,
      };
    case FETCH_BUSINESS_LAUNCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // case CREATE_BUSINESS_LAUNCH_SUCCESS:
    //   return {
    //     ...state,
    //     launches: [...state.launches, action.payload],
    //   };
     case CREATE_BUSINESS_LAUNCH_SUCCESS:
      const existingIndex = state.launches.findIndex(
        (l) => l.id === action.payload.id
      );
      let updatedLaunches = [...state.launches];
      if (existingIndex >= 0) {
        // Update existing
        updatedLaunches[existingIndex] = action.payload;
      } else {
        // Add new
        updatedLaunches = [action.payload, ...updatedLaunches];
      }
      return { ...state, launches: updatedLaunches, total: updatedLaunches.length };
    case UPDATE_BUSINESS_LAUNCH_SUCCESS:
      return {
        ...state,
        launches: state.launches.map((l) => (l.id === action.payload.id ? action.payload : l)),
      };
      case UPDATE_BUSINESS_LAUNCH_FAILURE:
      return { ...state, error: action.payload };
    case DELETE_BUSINESS_LAUNCH_SUCCESS:
      return {
        ...state,
        launches: state.launches.filter((l) => l.id !== action.payload),
      };
    case BUSINESS_LAUNCH_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_BUSINESS_LAUNCH_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };
    default:
      return state;
  }
};
