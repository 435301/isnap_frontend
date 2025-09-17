import {
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FAILURE,
  CREATE_STATE_SUCCESS,
  UPDATE_STATE_SUCCESS,
  DELETE_STATE_SUCCESS,
  STATE_ERROR,
  CLEAR_STATE_SUCCESS_MESSAGE,
} from "../actions/stateActions";

const initialState = {
  states: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  successMessage: null,
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_STATES_SUCCESS:
      return {
        ...state,
        loading: false,
        states: Array.isArray(action.payload.states) ? action.payload.states : [],
        currentPage: action.payload.currentPage || 1,
        totalPages: action.payload.totalPages || 1,
      };

    case FETCH_STATES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_STATE_SUCCESS:
      return {
        ...state,
        states: action.payload ? [...state.states, action.payload] : state.states,
        successMessage: action.message || "State created successfully!",
      };

    case UPDATE_STATE_SUCCESS:
      return {
        ...state,
        states: state.states.map((st) =>
          st.id === action.payload.id ? action.payload : st
        ),
        successMessage: action.message || "State updated successfully!",
      };

    case DELETE_STATE_SUCCESS:
      return {
        ...state,
        states: state.states.filter((st) => st.id !== action.payload),
        successMessage: action.message || "State deleted successfully!",
      };

    case STATE_ERROR:
      return { ...state, error: action.payload };

    case CLEAR_STATE_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };

    default:
      return state;
  }
};

export default stateReducer;
