import {
  FETCH_WINGS_REQUEST,
  FETCH_WINGS_SUCCESS,
  FETCH_WINGS_FAILURE,
  CREATE_WING_SUCCESS,
  UPDATE_WING_SUCCESS,
  DELETE_WING_SUCCESS,
  FETCH_WING_BY_ID_SUCCESS,
} from "../actions/wingAction";

const initialState = {
  loading: false,
  wings: [],
  total: 0,
  currentPage: 1,
  totalPages: 0,
  wingDetails: null,
  error: null,
};

export const wingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WINGS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_WINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        wings: action.payload.wings || [],
        total: action.payload.total || 0,
        currentPage: action.payload.currentPage || 1,
        totalPages: action.payload.totalPages || 1,
        limit: action.payload.limit || 15,
      };

    case FETCH_WINGS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_WING_SUCCESS:
    case UPDATE_WING_SUCCESS:
    case DELETE_WING_SUCCESS:
      return { ...state, loading: false };

    case FETCH_WING_BY_ID_SUCCESS:
      return { ...state, wingDetails: action.payload };

    default:
      return state;
  }
};
