import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  CATEGORY_ERROR,
  CLEAR_CATEGORY_SUCCESS_MESSAGE,
} from "../actions/categoryActions";

const initialState = {
  categories: [],
  loading: false,
  error: null,
  successMessage: null,
  currentPage: 1,
  totalPages: 1,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [action.payload.data, ...state.categories],
        successMessage: action.payload.message || "Category created successfully!",
      };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        ),
        successMessage: action.payload.message || "Category updated successfully!",
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.payload.id),
        successMessage: action.payload.message || "Category deleted successfully!",
      };

    case CLEAR_CATEGORY_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };

    case CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
