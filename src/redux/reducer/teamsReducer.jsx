const initialState = {
  teams: [],
  loading: false,
  error: null,
  successMessage: null,
  errorMessage: null, // Add errorMessage
  totalPages:1
};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TEAMS_REQUEST":
      return { ...state, loading: true, error: null, errorMessage: null };
    case "FETCH_TEAMS_SUCCESS":
      return { ...state, loading: false, teams: action.payload.teams, error: null , totalPages: action.payload.totalPages};
    case "FETCH_TEAMS_FAILURE":
      return { ...state, loading: false, error: action.payload, errorMessage: action.payload };
    case "SET_SUCCESS_MESSAGE":
      return { ...state, successMessage: action.payload, errorMessage: null };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload, successMessage: null };
    case "CLEAR_SUCCESS_MESSAGE":
      return { ...state, successMessage: null };
    default:
      return state;
  }
};

export default teamsReducer;