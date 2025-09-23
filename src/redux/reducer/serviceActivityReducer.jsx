import {
  FETCH_SERVICE_ACTIVITIES_REQUEST,
  FETCH_SERVICE_ACTIVITIES_SUCCESS,
  FETCH_SERVICE_ACTIVITIES_FAILURE,
  DELETE_SERVICE_ACTIVITY_SUCCESS,
  UPDATE_SERVICE_ACTIVITY_SUCCESS,
  CLEAR_SERVICE_ACTIVITY_SUCCESS_MESSAGE,
} from "../actions/serviceActivityActions";

const initialState = {
  activities: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages: 1,
};

const serviceActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICE_ACTIVITIES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_SERVICE_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: action.payload.activities,
        totalPages: action.payload.totalPages,
      };

    case FETCH_SERVICE_ACTIVITIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_SERVICE_ACTIVITY_SUCCESS:
    case UPDATE_SERVICE_ACTIVITY_SUCCESS:
      return { ...state, successMessage: action.payload };

    case CLEAR_SERVICE_ACTIVITY_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };

    default:
      return state;
  }
};

export default serviceActivityReducer;
