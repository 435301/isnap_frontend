import {
  CREATE_ISSUE_TYPE_REQUEST,
  CREATE_ISSUE_TYPE_SUCCESS,
  CREATE_ISSUE_TYPE_FAILURE,
  FETCH_ISSUE_TYPES_REQUEST,
  FETCH_ISSUE_TYPES_SUCCESS,
  FETCH_ISSUE_TYPES_FAILURE,
  FETCH_ISSUE_TYPE_BY_ID_REQUEST,
  FETCH_ISSUE_TYPE_BY_ID_SUCCESS,
  FETCH_ISSUE_TYPE_BY_ID_FAILURE,
  UPDATE_ISSUE_TYPE_REQUEST,
  UPDATE_ISSUE_TYPE_SUCCESS,
  UPDATE_ISSUE_TYPE_FAILURE,
  DELETE_ISSUE_TYPE_REQUEST,
  DELETE_ISSUE_TYPE_SUCCESS,
  DELETE_ISSUE_TYPE_FAILURE,
} from "../actions/issueTypeAction";

const initialState = {
  loading: false,
  issueTypes: [],
  issueType: null,
  totalPages: 0,
  error: null,
};

export const issueTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ISSUE_TYPE_REQUEST:
    case FETCH_ISSUE_TYPES_REQUEST:
    case FETCH_ISSUE_TYPE_BY_ID_REQUEST:
    case UPDATE_ISSUE_TYPE_REQUEST:
    case DELETE_ISSUE_TYPE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_ISSUE_TYPE_SUCCESS:
       return {
        issueTypes: [...state.issueTypes, action.payload],
      };

    case FETCH_ISSUE_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        issueTypes: action.payload.issueTypes || [],
        totalPages: action.payload.totalPages || 1,
        limit:action.payload.limit || 0
      };

    case FETCH_ISSUE_TYPE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        issueType: action.payload,
      };

    case UPDATE_ISSUE_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case DELETE_ISSUE_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        issueTypes: state.issueTypes.filter((doc) => doc.id !== action.payload),
      };

    case CREATE_ISSUE_TYPE_FAILURE:
    case FETCH_ISSUE_TYPES_FAILURE:
    case FETCH_ISSUE_TYPE_BY_ID_FAILURE:
    case UPDATE_ISSUE_TYPE_FAILURE:
    case DELETE_ISSUE_TYPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
