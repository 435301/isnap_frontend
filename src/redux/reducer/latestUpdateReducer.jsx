import {
  FETCH_LATEST_UPDATES_REQUEST,
  FETCH_LATEST_UPDATES_SUCCESS,
  FETCH_LATEST_UPDATES_FAILURE,
} from "../actions/latestUpdatesAction";

const initialState = {
  latestUpdates: [],
  total: 0,
  currentPage: 1,
  totalPages: 0,
  limit: 15,
  loading: false,
  error: null,
};

const latestUpdatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LATEST_UPDATES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_LATEST_UPDATES_SUCCESS:
      return {
        ...state,
        loading: false,
        latestUpdates: action.payload.latestUpdates || [],
        total: action.payload.total,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        limit: action.payload.limit,
      };

    case FETCH_LATEST_UPDATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        latestUpdates: [],
      };

    default:
      return state;
  }
};

export default latestUpdatesReducer;
