// src/redux/reducer/serviceActivityReducer.jsx

const initialState = {
  activities: [],
  loading: false,
  error: null,
  successMessage: null,
  totalPages: 1,
  currentPage: 1,
};

export const serviceActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SERVICE_ACTIVITIES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_SERVICE_ACTIVITIES_SUCCESS":
      return {
        ...state,
        loading: false,
        activities: action.payload.activities,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case "FETCH_SERVICE_ACTIVITIES_FAILURE":
    case "SERVICE_ACTIVITY_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_SERVICE_ACTIVITY_SUCCESS":
    case "UPDATE_SERVICE_ACTIVITY_SUCCESS":
      return { ...state, successMessage: "Action completed successfully", error: null };
    case "DELETE_SERVICE_ACTIVITY_SUCCESS":
      return { 
        ...state, 
        successMessage: "Deleted successfully", 
        activities: state.activities.filter(a => a.id !== action.payload) 
      };
    case "CLEAR_SERVICE_ACTIVITY_SUCCESS_MESSAGE":
      return { ...state, successMessage: null };
    default:
      return state;
  }
};
