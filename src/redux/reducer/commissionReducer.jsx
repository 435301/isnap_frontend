// src/redux/reducers/commissionReducer.js
import {
  FETCH_COMMISSIONS_REQUEST,
  FETCH_COMMISSIONS_SUCCESS,
  FETCH_COMMISSIONS_FAILURE,
  CREATE_COMMISSION_SUCCESS,
  UPDATE_COMMISSION_SUCCESS,
  DELETE_COMMISSION_SUCCESS,
  COMMISSION_ERROR,
  CLEAR_COMMISSION_SUCCESS_MESSAGE,
} from "../actions/commissionActions";

const initialState = {
  commissions: [],
  loading: false,
  error: null,
  successMessage: null,
  currentPage: 1,
  totalPages: 1,
};

const commissionReducer = (state = initialState, action) => {
  switch (action.type) {
    // ✅ Fetch
    case FETCH_COMMISSIONS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_COMMISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        commissions: action.payload.commissions,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case FETCH_COMMISSIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ✅ Create
    case CREATE_COMMISSION_SUCCESS:
      return {
        ...state,
        commissions: [...state.commissions, action.payload],
        successMessage: "Commission created successfully",
      };

    // ✅ Update
    case UPDATE_COMMISSION_SUCCESS:
      return {
        ...state,
        commissions: state.commissions.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        ),
        successMessage: "Commission updated successfully",
      };

    // ✅ Delete
    case DELETE_COMMISSION_SUCCESS:
      return {
        ...state,
        commissions: state.commissions.filter((c) => c.id !== action.payload),
        successMessage: "Commission deleted successfully",
      };

    // ✅ Error
    case COMMISSION_ERROR:
      return { ...state, error: action.payload };

    // ✅ Clear success
    case CLEAR_COMMISSION_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };

    default:
      return state;
  }
};

export default commissionReducer;
