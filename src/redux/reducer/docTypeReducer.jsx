import {
  CREATE_DOCUMENT_REQUEST,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAILURE,
  FETCH_DOCUMENTS_REQUEST,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILURE,
  FETCH_DOCUMENT_BY_ID_REQUEST,
  FETCH_DOCUMENT_BY_ID_SUCCESS,
  FETCH_DOCUMENT_BY_ID_FAILURE,
  UPDATE_DOCUMENT_REQUEST,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAILURE,
  DELETE_DOCUMENT_REQUEST,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAILURE,
} from "../actions/docTypeAction";

const initialState = {
  loading: false,
  documents: [],
  document: null,
  totalPages: 0,
  error: null,
};

export const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOCUMENT_REQUEST:
    case FETCH_DOCUMENTS_REQUEST:
    case FETCH_DOCUMENT_BY_ID_REQUEST:
    case UPDATE_DOCUMENT_REQUEST:
    case DELETE_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_DOCUMENT_SUCCESS:
       return {
        documents: [...state.documents, action.payload],
      };

    case FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: action.payload.documents || [],
        totalPages: action.payload.totalPages || 1,
        limit:action.payload.limit || 0
      };

    case FETCH_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        document: action.payload,
      };

    case UPDATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: state.documents.filter((doc) => doc.id !== action.payload),
      };

    case CREATE_DOCUMENT_FAILURE:
    case FETCH_DOCUMENTS_FAILURE:
    case FETCH_DOCUMENT_BY_ID_FAILURE:
    case UPDATE_DOCUMENT_FAILURE:
    case DELETE_DOCUMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
