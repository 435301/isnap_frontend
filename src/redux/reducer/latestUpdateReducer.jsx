import {
  FETCH_LATEST_UPDATES_REQUEST,
  FETCH_LATEST_UPDATES_SUCCESS,
  FETCH_LATEST_UPDATES_FAILURE,
  FETCH_LATEST_UPDATE_BY_ID_REQUEST,
  FETCH_LATEST_UPDATE_BY_ID_SUCCESS,
  FETCH_LATEST_UPDATE_BY_ID_FAILURE,
  CREATE_LATEST_UPDATE_REQUEST,
  CREATE_LATEST_UPDATE_SUCCESS,
  CREATE_LATEST_UPDATE_FAILURE,
  UPDATE_LATEST_UPDATE_REQUEST,
  UPDATE_LATEST_UPDATE_SUCCESS,
  UPDATE_LATEST_UPDATE_FAILURE,
  DELETE_LATEST_UPDATE_REQUEST,
  DELETE_LATEST_UPDATE_SUCCESS,
  DELETE_LATEST_UPDATE_FAILURE,
  DELETE_LATEST_UPDATE_FILE_REQUEST,
  DELETE_LATEST_UPDATE_FILE_SUCCESS,
  DELETE_LATEST_UPDATE_FILE_FAILURE,
} from "../actions/latestUpdatesAction";

const initialState = {
  latestUpdates: [],
  selectedUpdate: null,
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
    case FETCH_LATEST_UPDATE_BY_ID_REQUEST:
    case CREATE_LATEST_UPDATE_REQUEST:
    case UPDATE_LATEST_UPDATE_REQUEST:
    case DELETE_LATEST_UPDATE_REQUEST:
    case DELETE_LATEST_UPDATE_FILE_REQUEST:
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
    case FETCH_LATEST_UPDATE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedUpdate: action.payload,
      };
    case CREATE_LATEST_UPDATE_SUCCESS:
    case UPDATE_LATEST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_LATEST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        latestUpdates: state.latestUpdates.filter((item) => item.id !== action.payload.id),
      };
    case DELETE_LATEST_UPDATE_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedUpdate: {
          ...state.selectedUpdate,
          files: state.selectedUpdate?.files?.filter((f) => f.id !== action.payload.fileId),
        },
      };


    case FETCH_LATEST_UPDATES_FAILURE:
    case FETCH_LATEST_UPDATE_BY_ID_FAILURE:
    case CREATE_LATEST_UPDATE_FAILURE:
    case UPDATE_LATEST_UPDATE_FAILURE:
    case DELETE_LATEST_UPDATE_FAILURE:
    case DELETE_LATEST_UPDATE_FILE_FAILURE:
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
