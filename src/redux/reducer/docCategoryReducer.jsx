import {
  FETCH_DOCUMENT_CATEGORY_REQUEST,
  FETCH_DOCUMENT_CATEGORY_SUCCESS,
  FETCH_DOCUMENT_CATEGORY_FAILURE,
  FETCH_DOCUMENT_CATEGORY_SUCCESS_BY_ID,
  CREATE_DOCUMENT_CATEGORY_REQUEST,
  CREATE_DOCUMENT_CATEGORY_SUCCESS,
  CREATE_DOCUMENT_CATEGORY_FAILURE,
  UPDATE_DOCUMENT_CATEGORY_REQUEST,
  UPDATE_DOCUMENT_CATEGORY_SUCCESS,
  UPDATE_DOCUMENT_CATEGORY_FAILURE,
  DELETE_DOCUMENT_CATEGORY_REQUEST,
  DELETE_DOCUMENT_CATEGORY_SUCCESS,
  DELETE_DOCUMENT_CATEGORY_FAILURE,
} from "../actions/docCategoryAction";

const initialState = {
  loading: false,
  documentCategories: [],
  selectedCategory: null,
  message: null,
  error: null,
};

const documentCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENT_CATEGORY_REQUEST:
    case CREATE_DOCUMENT_CATEGORY_REQUEST:
    case UPDATE_DOCUMENT_CATEGORY_REQUEST:
    case DELETE_DOCUMENT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
        error: null,
      };

    case FETCH_DOCUMENT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        documentCategories: action.payload,
        error: null,
      };

    case FETCH_DOCUMENT_CATEGORY_SUCCESS_BY_ID:
      return {
        ...state,
        loading: false,
        selectedCategory: action.payload,
        error: null,
      };

    case CREATE_DOCUMENT_CATEGORY_SUCCESS:
      return {
        documentCategories: [...state.documentCategories, action.payload],
      };
    case UPDATE_DOCUMENT_CATEGORY_SUCCESS:
    case DELETE_DOCUMENT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: null,
      };

    case FETCH_DOCUMENT_CATEGORY_FAILURE:
    case CREATE_DOCUMENT_CATEGORY_FAILURE:
    case UPDATE_DOCUMENT_CATEGORY_FAILURE:
    case DELETE_DOCUMENT_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default documentCategoryReducer;
